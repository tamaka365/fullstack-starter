import { clsx } from 'clsx'
import { Popover } from '../popover/Popover'
import type { TriggerProps } from '../popover/types'
import { MenuList } from '../menu-list/MenuList'
import type { MenuItemData, RenderItemMeta } from '../menu-list/types'
import { useSidebar } from './Sidebar'
import * as styles from './SidebarNav.css'
import type { SidebarNavItemData, SidebarNavProps } from './types'

// ─── 工具函数 ─────────────────────────────────────────────────────────────────

/** 将 SidebarNavItemData 转换为 MenuList 接受的 MenuItemData */
function toMenuItemData(item: SidebarNavItemData): MenuItemData {
  return {
    key: item.key,
    label: item.label,
    icon: item.icon,
    disabled: item.disabled,
    children: item.children?.map(toMenuItemData),
  }
}

/** 判断是否为外部链接 */
function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://')
}

// ─── NavLink ─────────────────────────────────────────────────────────────────

interface NavLinkProps {
  item: SidebarNavItemData
  linkComponent: React.ElementType
  isActive: boolean
  level: number
}

/** 单条导航链接，处理内链/外链逻辑 */
function NavLink({ item, linkComponent: LinkComp, isActive, level }: NavLinkProps) {
  const isExternal = isExternalHref(item.href)
  const Comp = isExternal ? 'a' : LinkComp
  const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Comp
      href={item.href}
      {...extraProps}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: `6px ${8 + level * 12}px`,
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: isActive ? 600 : 400,
        color: isActive ? 'var(--sidebar-nav-active-color, #2563eb)' : 'inherit',
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        opacity: item.disabled ? 0.5 : 1,
      }}
    >
      {item.icon && <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>}
      <span>{item.label}</span>
    </Comp>
  )
}

// ─── SidebarNav ──────────────────────────────────────────────────────────────

/**
 * SidebarNav — 侧边栏导航组件
 *
 * 消费 SidebarContext 感知折叠状态：
 * - 展开态：渲染完整 MenuList，含图标 + 文字，子菜单可内联展开
 * - 折叠态：每个顶层条目渲染图标按钮，hover 时通过 Popover 弹出完整子菜单
 *
 * @example
 * ```tsx
 * <SidebarNav
 *   items={navItems}
 *   linkComponent={Link}
 *   activeKey={pathname}
 * />
 * ```
 */
export function SidebarNav({
  items,
  linkComponent = 'a',
  activeKey,
}: SidebarNavProps) {
  const { collapsed } = useSidebar()

  // 查找顶层条目对应的完整数据（用于折叠态 Popover content）
  function findItem(key: string): SidebarNavItemData | undefined {
    return items.find((it) => it.key === key)
  }

  // 展开态：完整 MenuList
  if (!collapsed) {
    const menuItems = items.map(toMenuItemData)

    const renderItem = (item: MenuItemData, meta: RenderItemMeta) => {
      // 找到对应的原始数据以获取 href
      function findNavItem(
        navItems: SidebarNavItemData[],
        key: string,
      ): SidebarNavItemData | undefined {
        for (const it of navItems) {
          if (it.key === key) return it
          if (it.children) {
            const found = findNavItem(it.children, key)
            if (found) return found
          }
        }
      }

      const navItem = findNavItem(items, item.key)
      if (!navItem) return null

      return (
        <NavLink
          item={navItem}
          linkComponent={linkComponent}
          isActive={meta.isActive}
          level={meta.level}
        />
      )
    }

    return (
      <nav className={styles.nav}>
        <MenuList
          items={menuItems}
          activeKey={activeKey}
          renderItem={renderItem}
        />
      </nav>
    )
  }

  // 折叠态：icon 列 + Popover
  return (
    <nav className={styles.collapsedNav}>
      {items.map((item) => {
        const isActive = activeKey === item.key ||
          item.children?.some((c) => c.key === activeKey)

        const iconContent = item.icon ?? item.label[0]

        // 无子项：直接渲染链接按钮
        if (!item.children?.length) {
          const isExternal = isExternalHref(item.href)
          const Comp = isExternal ? 'a' : (linkComponent as React.ElementType<React.AnchorHTMLAttributes<HTMLAnchorElement>>)
          const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

          return (
            <Comp
              key={item.key}
              href={item.href}
              {...extraProps}
              title={item.label}
              className={clsx(styles.iconButton, isActive && styles.iconButtonActive)}
            >
              {iconContent}
            </Comp>
          )
        }

        // 有子项：Popover 弹出完整 MenuList
        const fullItem = findItem(item.key)
        const popoverItems = fullItem ? [toMenuItemData(fullItem)] : []

        return (
          <Popover
            key={item.key}
            placement="right-start"
            triggers="hover"
            content={
              <MenuList
                items={popoverItems}
                activeKey={activeKey}
                renderItem={(menuItem, meta) => {
                  function findNavItem(
                    navItems: SidebarNavItemData[],
                    key: string,
                  ): SidebarNavItemData | undefined {
                    for (const it of navItems) {
                      if (it.key === key) return it
                      if (it.children) {
                        const found = findNavItem(it.children, key)
                        if (found) return found
                      }
                    }
                  }

                  const navItem = findNavItem(items, menuItem.key)
                  if (!navItem) return null

                  return (
                    <NavLink
                      item={navItem}
                      linkComponent={linkComponent}
                      isActive={meta.isActive}
                      level={meta.level}
                    />
                  )
                }}
              />
            }
            trigger={(props: TriggerProps) => (
              <button
                {...props}
                title={item.label}
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
