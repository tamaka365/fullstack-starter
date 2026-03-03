import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

function readWorkspacePackages() {
  const wsPath = path.join(ROOT, 'pnpm-workspace.yaml')
  if (!fs.existsSync(wsPath)) return []
  return fs.readFileSync(wsPath, 'utf-8')
    .split('\n')
    .filter(line => /^\s+- ['"]/.test(line))
    .map(line => line.trim().replace(/^- ['"]|['"]$/g, ''))
}

const EXCLUDED_GLOBS = new Set(['packages/*', 'templates/*'])

export function listUserProjects() {
  return readWorkspacePackages()
    .filter(entry => !EXCLUDED_GLOBS.has(entry) && !entry.includes('*'))
    .filter(entry => {
      const full = path.join(ROOT, entry)
      return fs.existsSync(full) && fs.statSync(full).isDirectory()
    })
}

export function removeFromWorkspace(name) {
  const wsPath = path.join(ROOT, 'pnpm-workspace.yaml')
  const lines = fs.readFileSync(wsPath, 'utf-8').split('\n')
  const filtered = lines.filter(line => line.trim() !== `- '${name}'`)
  fs.writeFileSync(wsPath, filtered.join('\n'))
}

export function renameInWorkspace(oldName, newName) {
  const wsPath = path.join(ROOT, 'pnpm-workspace.yaml')
  const content = fs.readFileSync(wsPath, 'utf-8')
  fs.writeFileSync(wsPath, content.replace(`  - '${oldName}'\n`, `  - '${newName}'\n`))
}

const GITIGNORE = path.join(ROOT, '.gitignore')

export function addToGitignore(name) {
  if (!fs.existsSync(GITIGNORE)) return
  const content = fs.readFileSync(GITIGNORE, 'utf-8')
  const entry = `${name}/`
  if (content.split('\n').some(l => l.trim() === entry)) return
  fs.writeFileSync(GITIGNORE, content.trimEnd() + '\n' + entry + '\n')
}

export function removeFromGitignore(name) {
  if (!fs.existsSync(GITIGNORE)) return
  const lines = fs.readFileSync(GITIGNORE, 'utf-8').split('\n')
  fs.writeFileSync(GITIGNORE, lines.filter(l => l.trim() !== `${name}/`).join('\n'))
}

export function renameInGitignore(oldName, newName) {
  if (!fs.existsSync(GITIGNORE)) return
  const content = fs.readFileSync(GITIGNORE, 'utf-8')
  fs.writeFileSync(GITIGNORE, content.replace(`${oldName}/\n`, `${newName}/\n`))
}

export { ROOT }
