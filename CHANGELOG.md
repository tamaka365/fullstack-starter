# Changelog

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
