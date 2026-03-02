import { select, input } from '@inquirer/prompts'
import fs from 'node:fs'
import path from 'node:path'
import { listUserProjects, ROOT } from './workspace.mjs'

const EXCLUDE_DIRS = new Set([
  'node_modules', 'dist', '.next', 'build', 'coverage', '.turbo',
])
const EXCLUDE_NAMES = new Set(['.DS_Store'])
const EXCLUDE_ENV = /^\.env(\..+)?$/

function shouldExclude(name) {
  return EXCLUDE_DIRS.has(name) || EXCLUDE_NAMES.has(name) || EXCLUDE_ENV.test(name)
}

function listTypes() {
  const dir = path.join(ROOT, 'templates')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
}

function listTemplates(type) {
  const dir = path.join(ROOT, 'templates', type)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
}

const NEW_ITEM = '+ 新建'

// --- 选择来源项目 ---
const projects = listUserProjects()
if (projects.length === 0) {
  console.error('错误：当前 workspace 没有用户创建的项目')
  process.exit(1)
}

const sourceProject = projects.length === 1
  ? projects[0]
  : await select({
      message: '选择要模板化的项目',
      choices: projects.map(v => ({ value: v })),
    })

// --- 选择模板类型 ---
const types = listTypes()
let templateType

if (types.length === 0) {
  templateType = await input({ message: '类型名称' })
} else {
  const choice = await select({
      message: '选择模板类型',
      choices: [...types.map(v => ({ value: v })), { name: '+ 新建类型', value: NEW_ITEM }],
    })
  templateType = choice === NEW_ITEM
    ? await input({ message: '类型名称' })
    : choice
}

// --- 选择模板名称 ---
const existing = listTemplates(templateType)
const NEW_TEMPLATE = '+ 新建模板'
let templateName

if (existing.length === 0) {
  templateName = await input({ message: '模板名称' })
} else {
  const choice = await select({
      message: '选择模板',
      choices: [
        ...existing.map(name => ({ name: `${name}  （更新）`, value: name })),
        { name: NEW_TEMPLATE, value: NEW_TEMPLATE },
      ],
    })
  templateName = choice === NEW_TEMPLATE
    ? await input({ message: '模板名称' })
    : choice
}

// --- 复制 ---
const src = path.join(ROOT, sourceProject)
const dest = path.join(ROOT, 'templates', templateType, templateName)

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true })
}

fs.cpSync(src, dest, {
  recursive: true,
  filter: srcPath => !shouldExclude(path.basename(srcPath)),
})

const pkgPath = path.join(dest, 'package.json')
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.name = templateName
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

console.log(`✓ 已保存为 templates/${templateType}/${templateName}`)
