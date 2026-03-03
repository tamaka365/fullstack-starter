'use client'

import { Tooltip } from '@starter/ui'

const btn: React.CSSProperties = {
  padding: '8px 16px', borderRadius: 6, border: '1px solid #e5e7eb',
  background: '#f9fafb', cursor: 'pointer', fontSize: 14,
}

export function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'sans-serif' }}>

      <div>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: '#6b7280' }}>方位</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['top', 'right', 'bottom', 'left'] as const).map((p) => (
            <Tooltip key={p} content={p} placement={p}>
              <button style={btn}>{p}</button>
            </Tooltip>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: '#6b7280' }}>禁用</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Tooltip content="不会出现" disabled>
            <button style={btn}>disabled</button>
          </Tooltip>
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: '#6b7280' }}>图标按钮</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Tooltip content="删除" placement="right">
            <button style={{ ...btn, padding: '8px', lineHeight: 1 }}>🗑</button>
          </Tooltip>
          <Tooltip content="编辑" placement="right">
            <button style={{ ...btn, padding: '8px', lineHeight: 1 }}>✏️</button>
          </Tooltip>
          <Tooltip content="分享" placement="right">
            <button style={{ ...btn, padding: '8px', lineHeight: 1 }}>🔗</button>
          </Tooltip>
        </div>
      </div>

    </div>
  )
}
