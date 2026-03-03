'use client'

import { Layout } from '@starter/ui'

export function LayoutDemo() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', height: 200, fontSize: 13 }}>
      <Layout
        stickyHeader
        header={<div style={{ padding: '8px 16px', background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>Header</div>}
        sidebar={<div style={{ width: 120, padding: 12, background: '#f1f5f9', height: '100%' }}>Sidebar</div>}
        footer={<div style={{ padding: '8px 16px', background: '#f8fafc', borderTop: '1px solid #e5e7eb' }}>Footer</div>}
      >
        <div style={{ padding: 16, color: '#64748b' }}>Content（可滚动区域）</div>
      </Layout>
    </div>
  )
}
