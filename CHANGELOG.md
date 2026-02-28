# Changelog

## v0.1.0 — Monorepo 基础搭建（2026-02-28）

- `package.json`：添加 workspace 脚本、devDependencies、engines、packageManager
- `pnpm-workspace.yaml`：声明 packages/*、templates/*、frontend、backend
- `tsconfig.base.json`：公共 TypeScript 配置，供 packages/ 各包继承
- `packages/utils`：@starter/utils 骨架（source-only）
- `packages/hooks`：@starter/hooks 骨架（source-only）
- `packages/ui`：@starter/ui 骨架（source-only，含 @vanilla-extract/css）
