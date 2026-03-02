# Backlog

未规划的需求池，按来源归类整理，可以新增类型。

## UI 组件

### SidebarNav

`packages/ui` 中的侧边栏导航组件，基于 MenuList 封装，与 Sidebar 配对使用。

- 条目数据结构含 `href`、`icon`、`label`、可选子项
- 激活态由当前路由决定（调用方传入 `activeKey`）
- 折叠模式：仅显示 icon，hover 时弹出子菜单（复用 MenuList）
- 通过 SidebarContext 消费 `collapsed` 状态

### Sidebar

`packages/ui` 中的侧边栏布局组件，持有折叠状态并通过 Context 向下透传。

- `header`、`footer` slot
- 中间区域可滚动
- 持有 `collapsed` 状态（可受控/非受控）
- 通过 SidebarContext 向子组件暴露 `collapsed`
- 支持展开/折叠切换（toggle）
