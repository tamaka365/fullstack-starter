'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Info, Layers } from 'lucide-react'
import { Sidebar, SidebarNav, useSidebar } from '@starter/ui'
import type { SidebarNavItemData } from '@starter/ui'

const navItems: SidebarNavItemData[] = [
  { key: '/about', label: '关于', icon: <Info size="1em" />, href: '/about' },
  {
    key: '/components',
    label: 'Components',
    icon: <Layers size="1em" />,
    children: [
      {
        key: '/layouts',
        label: 'Layouts',
        children: [
          { key: '/layout', label: 'Layout', href: '/layout' },
          { key: '/sidebar', label: 'Sidebar', href: '/sidebar' },
        ],
      },
      { key: '/menu-list', label: 'MenuList', href: '/menu-list' },
      { key: '/popover', label: 'Popover', href: '/popover' },
      { key: '/tooltip', label: 'Tooltip', href: '/tooltip' },
    ],
  },
]

function ToggleBtn() {
  const { collapsed, toggle } = useSidebar()
  return (
    <button
      onClick={toggle}
      style={{
        width: '100%', padding: '8px 12px', border: 'none',
        background: 'none', cursor: 'pointer', textAlign: 'left',
        fontSize: 13, color: 'inherit', whiteSpace: 'nowrap',
      }}
    >
      {collapsed ? '→' : '← @starter/ui'}
    </button>
  )
}

function firstHref(items: SidebarNavItemData[]): string | undefined {
  for (const item of items) {
    if (item.href) return item.href
    if (item.children) {
      const found = firstHref(item.children)
      if (found) return found
    }
  }
}

export function DocsSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pathname === '/') {
      const href = firstHref(navItems)
      if (href) router.replace(href)
    }
  }, [pathname, router])

  return (
    <Sidebar header={<ToggleBtn />}>
      <SidebarNav items={navItems} linkComponent={Link} activeKey={pathname} />
    </Sidebar>
  )
}
