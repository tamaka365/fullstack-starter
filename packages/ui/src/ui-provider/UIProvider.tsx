'use client'

import { createContext, useContext, useState } from 'react'
import type React from 'react'
import * as styles from './UIProvider.css'

const PortalContext = createContext<HTMLElement | null>(null)

/**
 * usePortalRoot — 获取全局 portal 挂载点
 *
 * 供 Popover 等浮层组件内部使用。
 * 若组件未包裹在 UIProvider 中，返回 null，浮层退回挂载到 document.body。
 */
export function usePortalRoot(): HTMLElement | null {
  return useContext(PortalContext)
}

/**
 * UIProvider — 全局 UI 根容器
 *
 * 渲染两个相邻 div：
 * - 第一个（appRoot）：包含所有应用内容，position relative
 * - 第二个（portalRoot）：全局浮层挂载点，position relative，无视觉尺寸
 *
 * 建议放置在应用根节点，包裹所有内容。
 *
 * @example
 * ```tsx
 * // layout.tsx
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <UIProvider>{children}</UIProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function UIProvider({ children }: { children: React.ReactNode }) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

  return (
    <PortalContext.Provider value={portalRoot}>
      <div className={styles.appRoot}>{children}</div>
      <div ref={setPortalRoot} className={styles.portalRoot} />
    </PortalContext.Provider>
  )
}
