# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指引。

## 项目描述

项目描述和使用方式以 `README.md` 为准：

- 如果 `README.md` 不存在，主动创建它
- 如果 `README.md` 存在但缺少项目描述，向用户确认后写入

## 开发流程

维护 `.claude/docs/backlog.md` 作为需求池，按以下流程执行：

1. **收集需求**：用户提出新需求时立即写入 `backlog.md`，循环提问直到用户明确表示没有为止
2. **规划版本**：分析需求池，与用户逐条确认优先级与可行性，挑选适合下一版本的内容写入 `todo.md`
3. **todo 格式**：每个版本条目包含版本简介、详细文档链接，并标注状态「进行中 / 已完成」，开发中实时更新
4. **编写文档**：分析 todo 版本需求，与用户交互确认细节，编写对应的详细版本文档
5. **开发节奏**：每完成详细文档中的一个步骤，立即提交 git 并更新 `.claude/docs/changelog.md`

### 版本开发中出现新需求

| 情况 | 处理方式 |
|------|---------|
| 与当前版本无关 | 写入 `backlog.md`，当前版本完成后再规划 |
| 影响当前版本范围 | 与用户讨论，决定是否调整当前版本文档；不新开版本 |
| 紧急 bug 或阻塞项 | 立即修复提交，不走版本规划流程 |

**原则：backlog 随时可写，但不打断正在进行的版本步骤；等当前步骤完成提交后再决定是否调整后续计划。**

## 工具链

- 包管理器：**pnpm**（必须）
- 样式方案：**vanilla-extract**（`@vanilla-extract/css`）
- Node.js ≥ 20，pnpm ≥ 9

## 常用命令

```bash
pnpm create     # 从模板生成 frontend / backend
pnpm dev        # 同时启动前后端（watch 模式）
pnpm dev fe     # 仅启动前端
pnpm dev be     # 仅启动后端
pnpm start      # 同时启动前后端（生产模式）
pnpm start fe   # 仅启动前端
pnpm start be   # 仅启动后端
pnpm typecheck  # 对所有工作空间进行类型检查
```

## 架构

pnpm monorepo：

### `packages/` —— 共享库

- **`@starter/ui`** —— 基于 vanilla-extract 的 React 组件库。直接导出 TypeScript 源码，通过 Next.js 的 `transpilePackages` 消费（无需预编译）。
- **`@starter/hooks`** —— React 自定义 hooks（`useLocalStorage`、`useDebounce`）。
- **`@starter/utils`** —— 工具函数（`cn`）。

所有包的 tsconfig 均继承 `../../tsconfig.base.json`。

### `templates/` —— 项目模板

- **`templates/nextjs`** —— Next.js 15 App Router，独立 tsconfig，通过 `workspace:*` 引用 `@starter/*`。
- **`templates/backend`** —— NestJS 11，独立 tsconfig。

各模板有自己独立的 tsconfig，不继承根目录配置。

### `frontend/` + `backend/`

由 `pnpm run create` 生成，已在 `pnpm-workspace.yaml` 中预先注册。

## 添加新包

1. 在 `packages/<name>/` 下创建 `package.json`（`name: @starter/<name>`）和继承 `../../tsconfig.base.json` 的 `tsconfig.json`
2. 设置 `"exports": { ".": "./src/index.ts" }`
3. 将包名添加到 `templates/nextjs/next.config.ts` 的 `transpilePackages`
