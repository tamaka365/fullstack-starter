'use client'

import { MenuList } from '@starter/ui'
import type { MenuItemData, MenuListItem } from '@starter/ui'
import { useState } from 'react'

const items: MenuListItem[] = [
  {
    groupLabel: '概览',
    items: [
      { key: '/dashboard', label: 'Dashboard', icon: '📊' },
      { key: '/analytics', label: 'Analytics', icon: '📈' },
    ],
  },
  {
    groupLabel: '管理',
    items: [
      {
        key: '/users',
        label: 'Users',
        icon: '👥',
        children: [
          { key: '/users/list', label: 'All Users' },
          { key: '/users/roles', label: 'Roles' },
          { key: '/users/invite', label: 'Invite', disabled: true },
        ],
      },
      { key: '/settings', label: 'Settings', icon: '⚙️' },
    ],
  },
]

export function Demo() {
  const [activeKey, setActiveKey] = useState('/dashboard')

  return (
    <div style={{ display: 'flex', gap: 32, fontFamily: 'sans-serif' }}>
      <div style={{ width: 220, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
        <MenuList
          items={items}
          activeKey={activeKey}
          defaultExpandedKeys={['/users']}
          renderAs="button"
          getItemProps={(item: MenuItemData) => ({ onClick: () => setActiveKey(item.key) })}
        />
      </div>
      <div style={{ fontSize: 13, color: '#888', alignSelf: 'flex-start', paddingTop: 8 }}>
        activeKey: <code style={{ color: '#2563eb' }}>{activeKey}</code>
      </div>
    </div>
  )
}
