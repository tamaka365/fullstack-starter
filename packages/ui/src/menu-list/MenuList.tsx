'use client'

import { clsx } from 'clsx'
import { ChevronRight } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import type React from 'react'
import * as styles from './MenuList.css'
import { isMenuGroup } from './types'
import type { MenuGroupData, MenuItemData, MenuListItem, MenuListProps } from './types'

/**
 * MenuList — 菜单列表原始组件
 *
 * 负责列表结构、激活态高亮、嵌套展开/收起和基础键盘导航（↑↓ 切换焦点、Enter/Space 激活）。
 * 条目内部内容由 `renderItem` 完全控制，调用方可自由选择元素类型（`<a>`、`<button>` 等）。
 *
 * 支持受控与非受控两种展开状态管理：
 * - 非受控：传 `defaultExpandedKeys`，组件内部维护状态
 * - 受控：同时传 `expandedKeys` 和 `onExpandedKeysChange`
 *
 * @example
 * ```tsx
 * <MenuList
 *   items={navItems}
 *   activeKey={currentPath}
 *   renderItem={(item, { isActive }) => (
 *     <a href={item.key} style={{ fontWeight: isActive ? 'bold' : 'normal' }}>
 *       {item.icon} {item.label}
 *     </a>
 *   )}
 * />
 * ```
 */
export function MenuList({
  items,
  activeKey,
  renderAs,
  getItemProps,
  defaultExpandedKeys,
  expandedKeys: controlledExpandedKeys,
  onExpandedKeysChange,
}: MenuListProps) {
  const isControlled = controlledExpandedKeys !== undefined

  const [internalExpandedKeys, setInternalExpandedKeys] = useState<Set<string>>(
    () => new Set(defaultExpandedKeys),
  )

  const expandedKeys = useMemo(
    () => (isControlled ? new Set(controlledExpandedKeys ?? []) : internalExpandedKeys),
    [isControlled, controlledExpandedKeys, internalExpandedKeys],
  )

  const containerRef = useRef<HTMLUListElement>(null)

  const toggleExpand = useCallback(
    (key: string) => {
      const next = new Set(expandedKeys)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      if (isControlled) {
        onExpandedKeysChange?.(Array.from(next))
      } else {
        setInternalExpandedKeys(next)
      }
    },
    [expandedKeys, isControlled, onExpandedKeysChange],
  )

  const focusAdjacentItem = useCallback((current: HTMLElement, direction: 1 | -1) => {
    const container = containerRef.current
    if (!container) return
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'),
    )
    const index = focusable.indexOf(current)
    const next = focusable[index + direction]
    next?.focus()
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const el = e.currentTarget
      const key = el.dataset.itemKey!
      const hasChildren = el.dataset.hasChildren === 'true'
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        focusAdjacentItem(el, 1)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        focusAdjacentItem(el, -1)
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (hasChildren) {
          toggleExpand(key)
        } else {
          el.querySelector<HTMLElement>('a, button')?.click()
        }
      }
    },
    [focusAdjacentItem, toggleExpand],
  )

  const handleItemClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const key = e.currentTarget.dataset.itemKey!
      toggleExpand(key)
    },
    [toggleExpand],
  )

  function renderItemNode(item: MenuItemData, level: number) {
    const isActive = item.key === activeKey
    const isExpanded = expandedKeys.has(item.key)
    const hasChildren = Boolean(item.children?.length)

    return (
      <li key={item.key} role="none">
        <div
          role="menuitem"
          aria-disabled={item.disabled || undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
          tabIndex={item.disabled ? -1 : 0}
          data-item-key={item.key}
          data-has-children={hasChildren}
          style={{ ['--menu-level' as string]: level }}
          className={clsx(
            styles.item,
            isActive && styles.itemActive,
            item.disabled && styles.itemDisabled,
          )}
          onClick={hasChildren ? handleItemClick : undefined}
          onKeyDown={handleKeyDown}
        >
          {renderAs && !hasChildren ? (() => {
            const Comp = renderAs
            return (
              <Comp {...getItemProps?.(item)} className={styles.itemLink}>
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                <span>{item.label}</span>
              </Comp>
            )
          })() : (
            <>
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span>{item.label}</span>
            </>
          )}
          {hasChildren && (
            <span
              aria-hidden="true"
              className={clsx(styles.expandIcon, isExpanded && styles.expandIconOpen)}
            >
              <ChevronRight size="1em" />
            </span>
          )}
        </div>
        {hasChildren && isExpanded && (
          <ul role="group" className={styles.group}>
            {item.children!.map((child) => renderItemNode(child, level + 1))}
          </ul>
        )}
      </li>
    )
  }

  function renderGroupNode(group: MenuGroupData, level: number, key: React.Key) {
    return (
      <li key={key} role="none">
        {group.groupLabel && (
          <div className={styles.groupLabel} aria-hidden="true">
            {group.groupLabel}
          </div>
        )}
        <ul role="group" aria-label={group.groupLabel} className={styles.group}>
          {group.items.map((item) => renderItemNode(item, level))}
        </ul>
      </li>
    )
  }

  function renderNodes(nodes: MenuListItem[], level: number) {
    return nodes.map((node, i) =>
      isMenuGroup(node)
        ? renderGroupNode(node, level, `${node.groupLabel ?? 'group'}-${i}`)
        : renderItemNode(node, level),
    )
  }

  return (
    <ul ref={containerRef} role="menu" className={styles.list}>
      {renderNodes(items, 0)}
    </ul>
  )
}
