# Backlog

未规划的需求池，按来源归类整理，可以新增类型。

---

## 项目模板

- 模板支持多个，存放于 `templates/<name>/`，create 命令动态扫描可用模板
- 初始模板：`templates/nextjs-basic`（Next.js 15 App Router，集成 vanilla-extract，引用 @starter/* 包，独立 tsconfig）
- 初始模板：`templates/nestjs-basic`（NestJS 11，包含 health 端点，独立 tsconfig）

---

## create 命令

- 实现 `scripts/create.mjs`：动态扫描 `templates/` 目录列出可用模板，@inquirer/prompts 交互选择模板和目标目录名（默认 frontend / backend），从模板复制并执行 pnpm install，输出 next steps 提示

---

## templatize 命令

- 实现 `scripts/templatize.mjs`：将 `frontend/` 或 `backend/` 开发测试完的项目转换为模板
- 交互式询问目标模板名称
- 复制项目到 `templates/<name>/`，排除 `node_modules`、`dist`、`.next`、`.env*`、`.DS_Store` 等产物
- 更新模板 `package.json` 的 `name` 字段为模板名
- 双向工作���：`create` 从模板生成项目，`templatize` 将项目保存回模板
