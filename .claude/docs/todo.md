# Todo

按版本迭代记录需求，每个版本包含简介和详细文档链接。

---

## v0.0.1 — 仓库管理配置

初始化 git 仓库，配置分支策略与 git hook，确保合并到 `main` 时自动过滤开发专用内容。

详细文档：[v0.0.1-repo-setup.md](./v0.0.1-repo-setup.md)

---

## v0.1.0 — CLAUDE.md 设计

设计并更新 `CLAUDE.md` 与 `CLAUDE.main.md`，明确 Claude Code 在本项目中的工作上下文与约束。

详细文档：[v0.1.0-claude-md.md](./v0.1.0-claude-md.md)

---

## v0.2.0 — Monorepo 基础搭建

初始化 pnpm monorepo，配置工作空间，创建 `packages/` 下的共享库（ui、hooks、utils）。

详细文档：[v0.2.0-monorepo-base.md](./v0.2.0-monorepo-base.md)

---

## v0.3.0 — 项目模板

创建 `templates/` 目录，包含 Next.js 前端模板和 NestJS 后端模板。

详细文档：[v0.3.0-templates.md](./v0.3.0-templates.md)

---

## v0.4.0 — create 命令

实现交互式 `pnpm run create` 命令，从模板生成 `frontend/` 和 `backend/` 项目并自动安装依赖。

详细文档：[v0.4.0-create-command.md](./v0.4.0-create-command.md)
