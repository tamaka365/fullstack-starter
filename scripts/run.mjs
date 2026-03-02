import { select } from '@inquirer/prompts'
import { spawn } from 'node:child_process'
import { listUserProjects, ROOT } from './workspace.mjs'

const cmd = process.argv[2]
if (!['dev', 'build', 'start'].includes(cmd)) {
  console.error(`错误：未知命令 ${cmd}`)
  process.exit(1)
}

const projects = listUserProjects()

if (projects.length === 0) {
  console.error('错误：当前 workspace 没有用户创建的项目')
  process.exit(1)
}

const ALL = '全部（并行）'

const target = projects.length === 1
  ? projects[0]
  : await select({
      message: '选择要运行的项目',
      choices: [{ value: ALL }, ...projects.map(v => ({ value: v }))],
    })

const targets = target === ALL ? projects : [target]

const procs = targets.map(name =>
  spawn('pnpm', ['--filter', name, 'run', cmd], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: true,
  })
)

await Promise.all(procs.map(p => new Promise((resolve, reject) => {
  p.on('close', code => code === 0 ? resolve() : reject(new Error(`${cmd} 失败，退出码 ${code}`)))
})))
