# fullstack-starter

一个基于 pnpm monorepo 的 Node.js 全栈 starter，内置 React 组件库、常用 hooks、工具函数，以及 Next.js 前端和 NestJS 后端项目模板，通过 `pnpm run create` 一键生成项目。

## 快速开始

**1. clone 并激活 git hooks**

```bash
git clone <repo-url>
cd fullstack-starter
pnpm install
```

**2. 生成项目**

```bash
pnpm run create
```

按提示选择要创建的项目（frontend / backend），脚本会自动从模板复制并安装依赖。

**3. 启动开发**

```bash
pnpm dev        # 同时启动前后端
pnpm dev fe     # 仅启动前端（Next.js on :3000）
pnpm dev be     # 仅启动后端（NestJS on :3001）
```

## 目录结构

```
.
├── packages/
│   ├── ui/        # @starter/ui — React 组件库（vanilla-extract）
│   ├── hooks/     # @starter/hooks — 常用 React hooks
│   └── utils/     # @starter/utils — 工具函数
├── templates/
│   ├── nextjs/    # Next.js 15 App Router 模板
│   └── backend/   # NestJS 11 模板
├── frontend/      # 由 create 命令生成
└── backend/       # 由 create 命令生成
```

## 共享包

| 包 | 说明 |
|----|------|
| `@starter/ui` | Button 等基础组件，基于 vanilla-extract，通过 `transpilePackages` 消费 |
| `@starter/hooks` | `useLocalStorage`、`useDebounce` |
| `@starter/utils` | `cn`（classname 合并） |

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
