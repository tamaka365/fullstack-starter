# Backlog

未规划的需求池，按来源归类整理，可以新增类型。

## CLI 命令

### 新增命令

- **remove 命令**：列出 workspace 用户创建的项目（pnpm-workspace.yaml 中排除 `packages/*` 和 `templates/*` 的条目），交互选择后二次确认，删除目录并从 pnpm-workspace.yaml 移除对应条目
- **rename 命令**：列出 workspace 用户创建的项目，输入新名称，同步重命名目录、更新项目 package.json 的 name 字段、更新 pnpm-workspace.yaml 中的路径

### 优化现有命令

- **templatize 优化**：来源改为从 workspace 用户创建的项目中选择（而非固定的 frontend/backend 目录）；存储位置改为列出 `templates/` 下已有类型目录供选择，同时提供「新建类型」选项可手动输入名称（如 `electron`），再在选定类型下选择已有模板或新建
- **dev/build/start 重设计**：三个命令改为交互式，提示用户选择具体项目或"全部"；选"全部"时并行执行所有用户创建的项目（排除 packages/templates）；移除 `dev:fe`、`dev:be`、`build:fe`、`build:be`、`start:fe`、`start:be` 快捷命令
