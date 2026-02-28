# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指引。

## 这是 Starter 的开发分支

这是 fullstack-starter 项目的开发分支。架构说明、常用命令和 monorepo 结构请参阅
`CLAUDE.main.md` —— 该文件在 `main` 分支及从其 clone 的项目中会成为 `CLAUDE.md`。

## 工具链

- 包管理器：**pnpm**
- package.json 文件禁止直接写入依赖，必须使用 `pnpm add` 命令添加依赖，若非必要请勿手动指定依赖版本
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

| 路径                 | 说明                                              |
| -------------------- | ------------------------------------------------- |
| `.claude/docs/`      | 内部开发文档（todo、版本日志）                    |
| `CLAUDE.md`          | 本文件 —— dev 专用指引                            |
| `.gitignore.main`    | main 的 .gitignore 模板（同时作为 hook 哨兵文件） |
| `CLAUDE.main.md`     | main 的 CLAUDE.md 模板（merge 后替换本文件）      |
| `.claude/docs.main/` | main 的 .claude/docs/ 模板                        |

## 项目描述

项目描述和使用方式以 `README.md` 为准：

- 如果 `README.md` 不存在，主动创建它
- 如果 `README.md` 存在但缺少项目描述，向用户确认后写入

## 开发流程

维护 `.claude/docs/backlog.md` 作为需求池，按以下流程执行：

1. **收集需求**：用户提出新需求时立即写入 `backlog.md`，循环提问直到用户明确表示没有新需求为止
2. **规划版本**：分析需求池，与用户逐条确认优先级与可行性，挑选适合下一版本的内容写入 `todo.md` 并从 `backlog.md` 中移除，只设计往后的一个版本
3. **todo 格式**：每个版本条目包含版本简介、详细文档链接，并标注状态「进行中 / 已完成」，开发中实时更新
4. **编写文档**：分析 todo 版本需求，与用户交互确认细节，编写对应的详细版本文档
5. **开发节奏**：每完成详细文档中的一个步骤，立即更新 `CHANGELOG.md`并提交 git

### 版本开发中出现新需求

| 情况              | 处理方式                                         |
| ----------------- | ------------------------------------------------ |
| 与当前版本无关    | 写入 `backlog.md`，当前版本完成后再规划          |
| 影响当前版本范围  | 与用户讨论，决定是否调整当前版本文档；不新开版本 |
| 紧急 bug 或阻塞项 | 立即修复提交，不走版本规划流程                   |

**原则：backlog 随时可写，但不打断正在进行的版本步骤；等当前步骤完成提交后再决定是否调整后续计划。**
