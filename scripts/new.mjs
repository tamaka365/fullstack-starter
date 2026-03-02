import { select, input } from '@inquirer/prompts'
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { addToGitignore } from './workspace.mjs'

const ROOT = process.cwd()

const EXCLUDE = new Set([
  'node_modules', 'dist', '.next', 'build', 'coverage', '.turbo',
  '.DS_Store', 'pnpm-workspace.yaml', 'pnpm-lock.yaml',
])
const EXCLUDE_ENV = /^\.env(\..+)?$/

function shouldExclude(name) {
  return EXCLUDE.has(name) || EXCLUDE_ENV.test(name)
}

function listTypes() {
  const templatesDir = path.join(ROOT, 'templates')
  if (!fs.existsSync(templatesDir)) return []
  return fs.readdirSync(templatesDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
}

function listTemplates(type) {
  const dir = path.join(ROOT, 'templates', type)
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
}

function addToWorkspace(name) {
  const wsPath = path.join(ROOT, 'pnpm-workspace.yaml')
  const content = fs.readFileSync(wsPath, 'utf-8')
  const entry = `  - '${name}'`
  if (content.includes(entry)) return
  fs.writeFileSync(wsPath, content.trimEnd() + '\n' + entry + '\n')
}

// --- 选择类型 ---
const types = listTypes()
if (types.length === 0) {
  console.error('错误：templates/ 目录下没有可用模板')
  process.exit(1)
}

const projectType = types.length === 1
  ? types[0]
  : await select({
      message: '选择项目类型',
      choices: types.map(v => ({ value: v })),
    })

// --- 选择模板 ---
const templates = listTemplates(projectType)
const templateName = templates.length === 1
  ? templates[0]
  : await select({
      message: '选择模板',
      choices: templates.map(v => ({ value: v })),
    })

// --- 输入项目名称 ---
const projectName = await input({
  message: '项目名称',
  default: projectType,
})

const dest = path.join(ROOT, projectName)
if (fs.existsSync(dest)) {
  console.error(`错误：${projectName}/ 已存在`)
  process.exit(1)
}

// --- 复制模板 ---
const src = path.join(ROOT, 'templates', projectType, templateName)
fs.cpSync(src, dest, {
  recursive: true,
  filter: srcPath => !shouldExclude(path.basename(srcPath)),
})

// 替换 package.json name
const projectPkgPath = path.join(dest, 'package.json')
if (fs.existsSync(projectPkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(projectPkgPath, 'utf-8'))
  pkg.name = projectName
  fs.writeFileSync(projectPkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

console.log(`✓ 已创建 ${projectName}/`)
addToWorkspace(projectName)
console.log('✓ 已更新 pnpm-workspace.yaml')

// --- 更新 .gitignore ---
addToGitignore(projectName)
console.log('✓ 已更新 .gitignore')

// --- 安装 ---
console.log('正在安装依赖...')
execSync('pnpm install', { cwd: ROOT, stdio: 'inherit' })
console.log('✓ 依赖安装完成')

console.log(`
下一步：
  cd ${projectName}
  pnpm dev`)
