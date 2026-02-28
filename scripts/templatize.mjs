import { select, input } from '@inquirer/prompts'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SOURCES = ['frontend', 'backend']

const EXCLUDE_DIRS = new Set([
  'node_modules', 'dist', '.next', 'build', 'coverage', '.turbo',
])
const EXCLUDE_NAMES = new Set(['.DS_Store'])
const EXCLUDE_ENV = /^\.env(\..+)?$/

function shouldExclude(name) {
  return EXCLUDE_DIRS.has(name) || EXCLUDE_NAMES.has(name) || EXCLUDE_ENV.test(name)
}

function copyDir(src, dest) {
  fs.cpSync(src, dest, {
    recursive: true,
    filter: (srcPath) => {
      const name = path.basename(srcPath)
      return !shouldExclude(name)
    },
  })
}

function listTemplates(type) {
  const dir = path.join(ROOT, 'templates', type)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
}

const available = SOURCES.filter(s => fs.existsSync(path.join(ROOT, s)))

if (available.length === 0) {
  console.error('错误：frontend/ 和 backend/ 均不存在')
  process.exit(1)
}

const sourceType = available.length === 1
  ? available[0]
  : await select({
      message: '选择要模板化的目录',
      choices: available.map(v => ({ value: v })),
    })

const existing = listTemplates(sourceType)
const NEW_TEMPLATE = '+ 新建模板'

let templateName
if (existing.length === 0) {
  templateName = await input({
    message: '模板名称',
    default: sourceType === 'frontend' ? 'nextjs-basic' : 'nestjs-basic',
  })
} else {
  const choices = [
    ...existing.map(name => ({ name: `${name}  （更新）`, value: name })),
    { name: NEW_TEMPLATE, value: NEW_TEMPLATE },
  ]
  const selected = await select({ message: '选择模板', choices })
  if (selected === NEW_TEMPLATE) {
    templateName = await input({
      message: '模板名称',
      default: sourceType === 'frontend' ? 'nextjs-basic' : 'nestjs-basic',
    })
  } else {
    templateName = selected
  }
}

const src = path.join(ROOT, sourceType)
const dest = path.join(ROOT, 'templates', sourceType, templateName)

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true })
}

copyDir(src, dest)

const pkgPath = path.join(dest, 'package.json')
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.name = templateName
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

console.log(`✓ 已保存为 templates/${sourceType}/${templateName}`)
