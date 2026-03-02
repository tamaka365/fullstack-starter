import type React from 'react'

/** 单个菜单条目的数据结构 */
export interface MenuItemData {
  /** 条目唯一标识，用于激活态比对和展开状态追踪 */
  key: string
  /** 条目显示文本 */
  label: string
  /** 条目图标，由调用方传入任意 ReactNode */
  icon?: React.ReactNode
  /** 子条目列表，有值时该条目可展开/收起 */
  children?: MenuItemData[]
  /** 是否禁用，禁用时不可交互且从键盘导航中排除 */
  disabled?: boolean
}

/** 分组容器，将若干条目归为一组并可选显示分组标题 */
export interface MenuGroupData {
  /** 分组标题，不传时仅做视觉分组，不渲染标题文本 */
  groupLabel?: string
  /** 该分组下的条目列表 */
  items: MenuItemData[]
}

/** MenuList items 数组的元素类型，可混用普通条目与分组 */
export type MenuListItem = MenuItemData | MenuGroupData

/** 判断 item 是否为分组（MenuGroupData） */
export function isMenuGroup(item: MenuListItem): item is MenuGroupData {
  return 'items' in item && !('key' in item)
}

/** 传给 renderItem 的上下文信息 */
export interface RenderItemMeta {
  /** 是否为当前激活条目 */
  isActive: boolean
  /** 嵌套深度，0 = 顶层 */
  level: number
}

export interface MenuListProps {
  /** 菜单数据，可混用 MenuItemData 和 MenuGroupData */
  items: MenuListItem[]
  /** 当前激活条目的 key */
  activeKey?: string
  /**
   * 条目内容的多态渲染函数，由调用方决定元素类型（`<a>`、`<button>` 等）和内容布局。
   * MenuList 负责列表结构、激活态、展开/收起和键盘导航；
   * 条目内部的图标、文字排布等完全由���函数控制。
   *
   * @example
   * ```tsx
   * renderItem={(item, { isActive }) => (
   *   <a href={item.key} style={{ fontWeight: isActive ? 'bold' : 'normal' }}>
   *     {item.icon} {item.label}
   *   </a>
   * )}
   * ```
   */
  renderItem: (item: MenuItemData, meta: RenderItemMeta) => React.ReactNode
  /** 非受控：初始展开的条目 key 列表 */
  defaultExpandedKeys?: string[]
  /** 受控：当前展开的条目 key 列表，与 onExpandedKeysChange 配合使用 */
  expandedKeys?: string[]
  /** 受控：展开状态变化回调 */
  onExpandedKeysChange?: (keys: string[]) => void
}

