'use client'

import { clsx } from 'clsx'
import { Popover } from '../popover/Popover'
import type { TriggerProps } from '../popover/types'
import { Tooltip } from '../tooltip/Tooltip'
import { MenuList } from '../menu-list/MenuList'
import type { MenuItemData, MenuListItem } from '../menu-list/types'
import { useSidebar } from './Sidebar'
import * as styles from './SidebarNav.css'
import type { SidebarNavGroupData, SidebarNavItemData, SidebarNavProps } from './types'

function isSidebarNavGroup(item: SidebarNavItemData | SidebarNavGroupData): item is SidebarNavGroupData {
  return 'items' in item
}

function toMenuListItem(item: SidebarNavItemData | SidebarNavGroupData): MenuListItem {
  if (isSidebarNavGroup(item)) {
    return { groupLabel: item.groupLabel, items: item.items.map(toMenuItemData) }
  }
  return toMenuItemData(item)
}

function toMenuItemData(item: SidebarNavItemData): MenuItemData {
  return {
    key: item.key,
    label: item.label,
    icon: item.icon,
    disabled: item.disabled,
    children: item.children?.map(toMenuItemData),
  }
}

function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://')
}

function findNavItem(
  navItems: (SidebarNavItemData | SidebarNavGroupData)[],
  key: string,
): SidebarNavItemData | undefined {
  for (const it of navItems) {
    if (isSidebarNavGroup(it)) {
      const found = findNavItem(it.items, key)
      if (found) return found
    } else {
      if (it.key === key) return it
      if (it.children) {
        const found = findNavItem(it.children, key)
        if (found) return found
      }
    }
  }
}

function flattenNavItems(items: (SidebarNavItemData | SidebarNavGroupData)[]): SidebarNavItemData[] {
  return items.flatMap((it) => isSidebarNavGroup(it) ? it.items : [it])
}

/** 返回 activeKey 所有祖先的 key 列表，找不到返回 null */
function collectAncestorKeys(
  items: (SidebarNavItemData | SidebarNavGroupData)[],
  activeKey: string,
): string[] | null {
  for (const item of items) {
    if (isSidebarNavGroup(item)) {
      const result = collectAncestorKeys(item.items, activeKey)
      if (result) return result
    } else {
      if (item.key === activeKey) return []
      if (item.children) {
        const result = collectAncestorKeys(item.children, activeKey)
        if (result !== null) return [item.key, ...result]
      }
    }
  }
  return null
}

export function SidebarNav({
  items,
  linkComponent = 'a',
  activeKey,
}: SidebarNavProps) {
  const { collapsed } = useSidebar()
  const defaultExpandedKeys = activeKey ? (collectAncestorKeys(items, activeKey) ?? []) : []

  function getItemProps(menuItem: MenuItemData) {
    const navItem = findNavItem(items, menuItem.key)
    if (!navItem?.href) return {}
    const isExternal = isExternalHref(navItem.href)
    return {
      href: navItem.href,
      ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
    }
  }

  if (!collapsed) {
    return (
      <nav className={styles.nav}>
        <MenuList
          items={items.map(toMenuListItem)}
          activeKey={activeKey}
          renderAs={linkComponent}
          getItemProps={getItemProps}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </nav>
    )
  }

  return (
    <nav className={styles.collapsedNav}>
      {flattenNavItems(items).map((item) => {
        const isActive = activeKey === item.key ||
          item.children?.some((c) => c.key === activeKey)
        const iconContent = item.icon ?? item.label[0]

        if (!item.children?.length) {
          const isExternal = item.href ? isExternalHref(item.href) : false
          const Comp = isExternal ? 'a' : (linkComponent as React.ElementType<React.AnchorHTMLAttributes<HTMLAnchorElement>>)
          const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}
          return (
            <Tooltip key={item.key} content={item.label} placement="right">
              <Comp
                href={item.href}
                {...extraProps}
                className={clsx(styles.iconButton, isActive && styles.iconButtonActive)}
              >
                {iconContent}
              </Comp>
            </Tooltip>
          )
        }

        return (
          <Popover
            key={item.key}
            placement="right-start"
            triggers="hover"
            content={
              <div className={styles.popoverMenu}>
                <MenuList
                  items={item.children!.map(toMenuItemData)}
                  activeKey={activeKey}
                  renderAs={linkComponent}
                  getItemProps={getItemProps}
                />
              </div>
            }
            trigger={(props: TriggerProps) => (
              <button
                {...props}
                className={clsx(styles.iconButton, isActive && styles.iconButtonActive)}
              >
                {iconContent}
              </button>
            )}
          />
        )
      })}
    </nav>
  )
}
