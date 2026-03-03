'use client'

import React from 'react'
import { clsx } from 'clsx'
import { ChevronRight } from 'lucide-react'
import type { MenuItemData } from '../menu-list/types'
import * as menuStyles from '../menu-list/MenuList.css'
import * as styles from './CascadeMenu.css'

export interface CascadeMenuProps {
  items: MenuItemData[]
  activeKey?: string
  renderAs?: React.ElementType
  getItemProps?: (item: MenuItemData) => Record<string, unknown>
  onSelect?: () => void
}

function renderItem(item: MenuItemData, props: CascadeMenuProps): React.ReactNode {
  const { activeKey, renderAs = 'a', getItemProps, onSelect } = props
  const isActive = item.key === activeKey
  const hasChildren = Boolean(item.children?.length)
  const itemClassName = clsx(
    menuStyles.item,
    isActive && menuStyles.itemActive,
    item.disabled && menuStyles.itemDisabled,
  )

  if (hasChildren) {
    return (
      <li key={item.key} role="none" className={styles.parentItem}>
        <div
          role="menuitem"
          aria-haspopup="true"
          style={{ ['--menu-level' as string]: 0 }}
          className={itemClassName}
        >
          {item.icon && <span className={menuStyles.icon}>{item.icon}</span>}
          <span>{item.label}</span>
          <span className={styles.chevron}><ChevronRight size="1em" /></span>
        </div>
        <div className={styles.submenu}>
          <CascadeMenu
            items={item.children!}
            activeKey={activeKey}
            renderAs={renderAs}
            getItemProps={getItemProps}
            onSelect={onSelect}
          />
        </div>
      </li>
    )
  }

  const Comp = renderAs as React.ElementType
  return (
    <li key={item.key} role="none">
      <div
        role="menuitem"
        style={{ ['--menu-level' as string]: 0 }}
        className={itemClassName}
      >
        <Comp {...getItemProps?.(item)} className={menuStyles.itemLink} onClick={onSelect}>
          {item.icon && <span className={menuStyles.icon}>{item.icon}</span>}
          <span>{item.label}</span>
        </Comp>
      </div>
    </li>
  )
}

export function CascadeMenu(props: CascadeMenuProps) {
  return (
    <div className={styles.menu}>
      <ul role="menu" className={menuStyles.list}>
        {props.items.map((item) => renderItem(item, props))}
      </ul>
    </div>
  )
}
