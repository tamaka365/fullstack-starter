import { input, checkbox } from '@inquirer/prompts'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const ROOT = process.cwd()
const REMOTE_FILE = path.join(ROOT, '.starter-remote')
const EXCLUDE = new Set(['node_modules', '.next', 'dist', 'build', 'coverage', '.turbo', '.DS_Store'])

function run(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf-8', cwd: ROOT, ...opts }).trim()
}

// 1. 读取 starter 地址（优先级：.starter-remote > package.json starterRepo > prompt）
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'))
let upstreamUrl
if (fs.existsSync(REMOTE_FILE)) {
  upstreamUrl = fs.readFileSync(REMOTE_FILE, 'utf-8').trim()
  console.log(`使用已记录的 starter 地址：${upstreamUrl}`)
} else if (pkg.starterRepo) {
  upstreamUrl = pkg.starterRepo
  console.log(`使用 starter 地址：${upstreamUrl}`)
} else {
  upstreamUrl = await input({ message: 'Starter 仓库地址（git remote URL）' })
  if (!upstreamUrl) process.exit(1)
  fs.writeFileSync(REMOTE_FILE, upstreamUrl + '\n')
  console.log('✓ 已记录到 .starter-remote')
}

// 2. 配置 upstream remote（幂等）
const remotes = run('git remote').split('\n').filter(Boolean)
if (remotes.includes('upstream')) {
  const current = run('git remote get-url upstream')
  if (current !== upstreamUrl) {
    run(`git remote set-url upstream "${upstreamUrl}"`)
    console.log('✓ 已更新 upstream remote')
  }
} else {
  run(`git remote add upstream "${upstreamUrl}"`)
  console.log('✓ 已添加 upstream remote')
}

// 3. fetch upstream
execSync('git fetch upstream cli-release', { stdio: 'inherit' })

// 4. 构建候选列表
const choices = []
const packagesDir = path.join(ROOT, 'packages')
if (fs.existsSync(packagesDir)) {
  for (const d of fs.readdirSync(packagesDir)) {
    if (fs.statSync(path.join(packagesDir, d)).isDirectory()) {
      choices.push({ name: `packages/${d}`, value: `packages/${d}` })
    }
  }
}
const templatesDir = path.join(ROOT, 'templates')
if (fs.existsSync(templatesDir)) {
  for (const type of fs.readdirSync(templatesDir)) {
    const typePath = path.join(templatesDir, type)
    if (!fs.statSync(typePath).isDirectory()) continue
    for (const tmpl of fs.readdirSync(typePath)) {
      if (fs.statSync(path.join(typePath, tmpl)).isDirectory()) {
        choices.push({ name: `templates/${type}/${tmpl}`, value: `templates/${type}/${tmpl}` })
      }
    }
  }
}
if (choices.length === 0) {
  console.error('错误：没有可贡献的 packages 或 templates')
  process.exit(1)
}

// 5. 多选要贡献的目录
const selected = await checkbox({ message: '选择要贡献的内容', choices })
if (selected.length === 0) process.exit(0)

// 6. 询问分支名称
const defaultBranch = `contrib/${selected[0].replaceAll('/', '-')}`
const branchName = await input({ message: '贡献分支名称', default: defaultBranch })

// 7. 创建临时 worktree
const worktreePath = path.join(os.tmpdir(), `starter-contrib-${Date.now()}`)
try {
  execSync(`git worktree add -b "${branchName}" "${worktreePath}" upstream/cli-release`, { stdio: 'inherit' })
} catch {
  console.error(`错误：创建 worktree 失败，分支 ${branchName} 可能已存在`)
  process.exit(1)
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src)) {
    if (EXCLUDE.has(entry) || entry.startsWith('.env')) continue
    const srcPath = path.join(src, entry)
    const destPath = path.join(dest, entry)
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function extractGitHubRepo(url) {
  const match = url.match(/github\.com[:/](.+?)(\.git)?$/)
  return match ? match[1] : null
}

try {
  // 8. 复制选中目录到 worktree
  for (const dir of selected) {
    copyDir(path.join(ROOT, dir), path.join(worktreePath, dir))
    console.log(`✓ 已复制 ${dir}`)
  }

  // 9. 检测变更并提交
  execSync('git add -A', { cwd: worktreePath })
  const status = execSync('git status --porcelain', { cwd: worktreePath, encoding: 'utf-8' }).trim()
  if (!status) {
    console.log('没有变更（内容与 upstream/cli-release 相同）')
    process.exit(0)
  }
  const commitMsg = await input({
    message: 'Commit 信息',
    default: `contrib: ${selected.join(', ')}`,
  })
  execSync(`git commit -m "${commitMsg}"`, { cwd: worktreePath, stdio: 'inherit' })

  // 10. 推送并创建 PR
  execSync(`git push upstream "${branchName}"`, { cwd: worktreePath, stdio: 'inherit' })
  console.log(`✓ 已推送到 upstream/${branchName}`)

  const githubRepo = extractGitHubRepo(upstreamUrl)
  if (githubRepo) {
    const prTitle = await input({ message: 'PR 标题', default: commitMsg })
    try {
      execSync(
        `gh pr create --repo "${githubRepo}" --base cli-release --head "${branchName}" --title "${prTitle}" --body ""`,
        { stdio: 'inherit' }
      )
    } catch {
      console.log(`请手动创建 PR：https://github.com/${githubRepo}/compare/cli-release...${branchName}`)
    }
  } else {
    console.log('请手动创建 PR（无法解析 GitHub 仓库地址）')
  }
} finally {
  // 11. 清理 worktree
  execSync(`git worktree remove "${worktreePath}" --force`)
  try { run(`git branch -D "${branchName}"`) } catch {}
}
