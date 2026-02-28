# Changelog

## v0.3.0 — new 命令（2026-02-28）

- `scripts/new.mjs`：从 `templates/` 选择模板，在根目录创建新项目
  - 交互选择类型（frontend / backend）和模板，单项时自动跳过
  - 项目名称默认为类型名（`frontend` / `backend`），可自定义
  - 同名目录已存在时报错退出（exit code 1）
  - 排除 `node_modules`、`.next`、`dist`、`build`、`coverage`、`.turbo`、`.env*`、`.DS_Store`、`pnpm-workspace.yaml`、`pnpm-lock.yaml`
  - 自动更新项目 `package.json` 的 `name` 字段
  - 依赖去重：按包名移除项目 `package.json` 中根目录已有的包
  - 自动将新项目追加到 `pnpm-workspace.yaml`
  - 在根目录执行 `pnpm install`
- `pnpm-workspace.yaml`：移除默认 `frontend` / `backend` 条目，改由 `pnpm new` 动态添加

## v0.2.0 — templatize 命令（2026-02-28）

- `scripts/templatize.mjs`：将 `frontend/` 或 `backend/` 保存为 `templates/<type>/<name>/` 模板
  - 自动检测可用源目录，单目录时跳过选择步骤
  - 扫描已有模板供更新，或新建；更新时直接覆盖无需确认
  - 排除 `node_modules`、`.next`、`dist`、`build`、`coverage`、`.turbo`、`.env*`、`.DS_Store`
  - 自动更新模板 `package.json` 的 `name` 字段

## v0.1.0 — Monorepo 基础搭建（2026-02-28）

- `package.json`：添加 workspace 脚本、devDependencies、engines、packageManager
- `pnpm-workspace.yaml`：声明 packages/*、templates/*、frontend、backend
- `tsconfig.base.json`：公共 TypeScript 配置，供 packages/ 各包继承
- `packages/utils`：@starter/utils 骨架（source-only）
- `packages/hooks`：@starter/hooks 骨架（source-only）
- `packages/ui`：@starter/ui 骨架（source-only，含 @vanilla-extract/css）
