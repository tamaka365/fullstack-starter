import { select, input } from '@inquirer/prompts'
import fs from 'node:fs'
import path from 'node:path'
import { listUserProjects, renameInWorkspace, renameInGitignore, ROOT } from './workspace.mjs'

const projects = listUserProjects()

if (projects.length === 0) {
  console.error('错误：当前 workspace 没有用户创建的项目')
  process.exit(1)
}

const oldName = projects.length === 1
  ? projects[0]
  : await select({
      message: '选择要重命名的项目',
      choices: projects.map(v => ({ value: v })),
    })

const newName = await input({
  message: '新名称',
  default: oldName,
})

if (newName === oldName) {
  console.error('错误：新名称与当前名称相同')
  process.exit(1)
}

const destPath = path.join(ROOT, newName)
if (fs.existsSync(destPath)) {
  console.error(`错误：${newName}/ 已存在`)
  process.exit(1)
}

fs.renameSync(path.join(ROOT, oldName), destPath)
console.log(`✓ 已重命名目录 ${oldName}/ → ${newName}/`)

const pkgPath = path.join(destPath, 'package.json')
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.name = newName
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  console.log('✓ 已更新 package.json name 字段')
}

renameInWorkspace(oldName, newName)
console.log('✓ 已更新 pnpm-workspace.yaml')

renameInGitignore(oldName, newName)
console.log('✓ 已更新 .gitignore')
