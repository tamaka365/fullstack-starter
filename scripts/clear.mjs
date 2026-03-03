import { checkbox, confirm } from '@inquirer/prompts'
import fs from 'node:fs'
import path from 'node:path'
import { listUserProjects, removeFromWorkspace, removeFromGitignore, ROOT } from './workspace.mjs'

const projects = listUserProjects()

if (projects.length === 0) {
  console.error('错误：当前 workspace 没有用户创建的项目')
  process.exit(1)
}

const ALL = '__all__'
const selected_raw = await checkbox({
  message: '选择要删除的项目',
  choices: [
    { name: '全部', value: ALL },
    ...projects.map(v => ({ value: v })),
  ],
})

if (selected_raw.length === 0) process.exit(0)

const selected = selected_raw.includes(ALL) ? projects : selected_raw

if (selected.length === 0) process.exit(0)

const ok = await confirm({
  message: `确认删除以下项目？${selected.join(', ')}`,
  default: true,
})

if (!ok) process.exit(0)

for (const name of selected) {
  fs.rmSync(path.join(ROOT, name), { recursive: true })
  console.log(`✓ 已删除 ${name}/`)
  removeFromWorkspace(name)
  removeFromGitignore(name)
}

console.log('✓ 已更新 pnpm-workspace.yaml')
