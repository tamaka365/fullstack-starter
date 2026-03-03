'use client'

import { Sidebar, SidebarNav } from '@starter/ui'
import type { SidebarNavItemData } from '@starter/ui'
import { useState } from 'react'

const items: SidebarNavItemData[] = [{ key: '/dashboard', label: 'Dashboard', icon: '🏠', href: '/dashboard' },
  {
    key: '/products', label: 'Products', icon: '📦', href: '/products',
    children: [
      { key: '/products/list', label: 'All Products', icon: '📋', href: '/products/list' },
      { key: '/products/new', label: 'New Product', icon: '➕', href: '/products/new' },
    ],
  },
  { key: '/settings', label: 'Settings', icon: '⚙️', href: '/settings' },
  { key: '/logout', label: 'Logout', icon: '🚪', href: '/logout', disabled: true },
]

export function Demo() {
  const [activeKey, setActiveKey] = useState('/dashboard')
  const [controlled, setControlled] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'sans-serif' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#888' }}>非受控模式</p>
        <div style={{ height: 280, display: 'flex', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
          <Sidebar>
            <SidebarNav items={items} activeKey={activeKey} />
          </Sidebar>
          <main style={{ flex: 1, padding: 16, fontSize: 13, color: '#64748b' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['/dashboard', '/products/list', '/settings'].map(k => (
                <button key={k} onClick={() => setActiveKey(k)}
                  style={{ padding: '4px 10px', borderRadius: 4, border: '1px solid #e5e7eb',
                    background: activeKey === k ? '#dbeafe' : '#f9fafb', cursor: 'pointer', fontSize: 12 }}>
                  {k}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#888' }}>
          受控模式&nbsp;
          <button onClick={() => setControlled(v => !v)}
            style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid #e5e7eb', cursor: 'pointer', fontSize: 12 }}>
            collapsed: {String(controlled)}
          </button>
        </p>
        <div style={{ height: 200, display: 'flex', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
          <Sidebar collapsed={controlled} onCollapsedChange={setControlled}>
            <SidebarNav items={items} activeKey={activeKey} />
          </Sidebar>
          <main style={{ flex: 1, padding: 16, fontSize: 13, color: '#64748b' }}>受控折叠</main>
        </div>
      </div>
    </div>
  )
}
