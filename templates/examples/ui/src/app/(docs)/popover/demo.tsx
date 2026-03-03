'use client'

import { Popover } from '@starter/ui'
import type { TriggerProps } from '@starter/ui'
import { useState } from 'react'

const btn: React.CSSProperties = {
  padding: '8px 16px', borderRadius: 6, border: '1px solid #e5e7eb',
  background: '#f9fafb', cursor: 'pointer', fontSize: 14,
}
const panel: React.CSSProperties = {
  padding: '12px 16px', background: '#fff', border: '1px solid #e5e7eb',
  borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 14,
}

export function Demo() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <Popover
          trigger={(p: TriggerProps) => <button style={btn} {...p}>Hover</button>}
          content={<div style={panel}>hover 触发，离开后淡出</div>}
        />
        <Popover
          triggers="click"
          trigger={(p: TriggerProps) => <button style={btn} {...p}>Click</button>}
          content={<div style={panel}>点击外部或 Escape 关闭</div>}
        />
        <Popover
          triggers="focus"
          trigger={(p: TriggerProps) => <button style={btn} {...p}>Focus</button>}
          content={<div style={panel}>Tab 聚焦触发</div>}
        />
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <button style={btn} onClick={() => setOpen(v => !v)}>
          受控：{open ? '关闭' : '打开'}
        </button>
        <Popover
          placement="right-start"
          open={open}
          onOpenChange={setOpen}
          triggers="hover"
          trigger={(p: TriggerProps) => <span style={{ ...btn, background: open ? '#dbeafe' : '#f3f4f6' }} {...p}>anchor</span>}
          content={<div style={panel}>受控浮层</div>}
        />
      </div>
    </div>
  )
}
