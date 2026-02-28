# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指引。

## 项目描述

项目描述和使用方式以 `README.md` 为准：

- 如果 `README.md` 不存在，主动创建它
- 如果 `README.md` 存在但缺少项目描述，向用户提问确认后再写入

## 需求池

维护 `.claude/docs/backlog.md` 作为需求池：

- 每当用户提出新需求，立即写入该文档
- 写入后循环向用户提问是否还有需求要添加，直到用户明确表示没有为止

## 这是 Starter 的开发分支

这是 fullstack-starter 项目的开发分支。架构说明、常用命令和 monorepo 结构请参阅
`CLAUDE.main.md` —— 该文件在 `main` 分支及从其 clone 的项目中会成为 `CLAUDE.md`。

## 工具链

- 包管理器：**pnpm**
- 样式方案：**vanilla-extract**

## 分支策略

- `dev` —— 日常开发，包含所有内容（含 `.claude/docs/`）
- `main` —— 干净的模板分支，将来的新项目从此 clone

在 `dev` 上开发，发布时切到 `main` 执行 `git merge dev` ——
`pre-merge-commit` hook 会自动过滤 dev 专用内容。

## 重要：clone 后必做

运行 `pnpm install` 以通过 `prepare` 脚本激活 git hooks：

```bash
pnpm install
```

这会将 `core.hooksPath` 指向 `.githooks`，并配置 `branch.main.mergeoptions = --no-ff`，
确保合并到 `main` 时始终产生 merge commit（hooks 依赖此行为触发）。

## Dev 专用内容（不会出现在 main）

| 路径 | 说明 |
|------|------|
| `.claude/docs/` | 内部开发文档（todo、版本日志） |
| `CLAUDE.md` | 本文件 —— dev 专用指引 |
| `.gitignore.main` | main 的 .gitignore 模板（同时作为 hook 哨兵文件） |
| `CLAUDE.main.md` | main 的 CLAUDE.md 模板（merge 后替换本文件） |
| `.claude/docs.main/` | main 的 .claude/docs/ 模板 |
