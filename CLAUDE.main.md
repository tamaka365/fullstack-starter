# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指引。

## 项目描述

项目描述和使用方式以 `README.md` 为准：

- 如果 `README.md` 不存在，主动创建它
- 如果 `README.md` 存在但缺少项目描述，向用户提问确认后再写入

## 需求池与版本规划

维护 `.claude/docs/backlog.md` 作为需求池：

1. 每当用户提出新需求，立即写入该文档
2. 循环向用户提问是否还有需求要添加，直到用户明确表示没有为止
3. 收集完毕后，分析需求池，与用户逐条交互确认优先级与可行性，从中挑选适合下一个版本的内容，写入 `.claude/docs/todo.md` 作为该版本目标
4. 分析 todo 中的版本需求，与用户交互确认细节，编写对应的详细版本文档

## 工具链

- 包管理器：**pnpm**（必须）
- 样式方案：**vanilla-extract**（`@vanilla-extract/css`）
- Node.js ≥ 20，pnpm ≥ 9

## 常用命令

```bash
# 从模板生成 frontend 和 backend 项目
pnpm run create

# 以 watch 模式运行所有包
pnpm dev

# 对所有工作空间进行类型检查
pnpm typecheck
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
