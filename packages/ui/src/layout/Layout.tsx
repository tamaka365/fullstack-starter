import { clsx } from 'clsx'
import React from 'react'
import * as styles from './Layout.css'

/**
 * 页面布局组件，基于 flexbox 实现，支持 header、sidebar、footer 的固定与滚动控制。
 *
 * ## 滚动模型
 *
 * 由 `stickyHeader` 和 `stickySidebar` 共同决定滚动容器：
 *
 * | stickyHeader | stickySidebar | 滚动区域 |
 * |---|---|---|
 * | false | false | 文档自然滚动 |
 * | true | false | header 下方整体 |
 * | false | true + sidebarFull | sidebar 以外区域 |
 * | false | true + !sidebarFull | root 为滚动容器，sidebar 用 CSS sticky |
 * | true | true | content + footer |
 *
 * ## sidebar 位置
 *
 * - `sidebarFull=false`（默认）：sidebar 在 header 下方，与 content 并排
 * - `sidebarFull=true`：sidebar 在 header 外侧，与整个内容列并排
 */
export interface LayoutProps {
  /**
   * sidebar 是否撑满整体高度（与 header/footer 外侧并排）。
   * - `false`（默认）：sidebar 在 header 下方
   * - `true`：sidebar 与 header 同级，占据页面完整高度
   */
  sidebarFull?: boolean
  /** 顶部导航区域 */
  header?: React.ReactNode
  /** 底部区域 */
  footer?: React.ReactNode
  /** 侧边栏 */
  sidebar?: React.ReactNode
  /**
   * header 是否固定（不随页面滚动）。
   * 默认 `true`。
   */
  stickyHeader?: boolean
  /**
   * sidebar 是否固定（不随页面滚动）。
   * 默认与 `stickyHeader` 同步，手动传值时独立控制。
   */
  stickySidebar?: boolean
  /** 页面主内容 */
  children?: React.ReactNode
}

/**
 * @see {@link LayoutProps} 查看完整 props 说明
 */
export function Layout({
  sidebarFull = false,
  header,
  footer,
  sidebar,
  stickyHeader = true,
  stickySidebar,
  children,
}: LayoutProps) {
  const effectiveStickySidebar = stickySidebar ?? stickyHeader

  const headerEl = header && (
    <header className={styles.header}>{header}</header>
  )

  const footerEl = footer && (
    <footer className={styles.footer}>{footer}</footer>
  )

  // CSS sticky 仅在 !stickyHeader + effectiveStickySidebar + !sidebarFull 时启用
  const sidebarClassName =
    !stickyHeader && effectiveStickySidebar && !sidebarFull
      ? styles.stickySidebarCSS
      : styles.sidebar

  const sidebarEl = sidebar && (
    <aside className={sidebarClassName}>{sidebar}</aside>
  )

  const contentEl = <main className={styles.content}>{children}</main>

  if (sidebarFull) {
    if (stickyHeader) {
      // sidebar 固定（由 bounded row 约束），header 固定，content+footer 滚动
      // row rootFixed bounded > sidebar + bounded-column(header + scrollArea(content+footer))
      return (
        <div className={clsx(styles.root, styles.row, styles.rootFixed, styles.bounded)}>
          {sidebarEl}
          <div className={clsx(styles.body, styles.column, styles.bounded)}>
            {headerEl}
            <div className={styles.scrollArea}>
              {contentEl}
              {footerEl}
            </div>
          </div>
        </div>
      )
    }

    if (effectiveStickySidebar) {
      // sidebar 固定，header/content/footer 整体滚动
      // row rootFixed bounded > sidebar + scrollArea(header+content+footer)
      return (
        <div className={clsx(styles.root, styles.row, styles.rootFixed, styles.bounded)}>
          {sidebarEl}
          <div className={styles.scrollArea}>
            {headerEl}
            {contentEl}
            {footerEl}
          </div>
        </div>
      )
    }

    // 都不固定，文档自然滚动
    // row rootNatural > sidebar + column(header+content+footer)
    return (
      <div className={clsx(styles.root, styles.row, styles.rootNatural)}>
        {sidebarEl}
        <div className={clsx(styles.body, styles.column)}>
          {headerEl}
          {contentEl}
          {footerEl}
        </div>
      </div>
    )
  }

  // sidebarFull=false

  if (stickyHeader && effectiveStickySidebar) {
    // header、sidebar 均固定，content+footer 滚动
    // column rootFixed bounded > header + bounded-row(sidebar + scrollArea(content+footer))
    return (
      <div className={clsx(styles.root, styles.column, styles.rootFixed, styles.bounded)}>
        {headerEl}
        <div className={clsx(styles.body, styles.row, styles.bounded)}>
          {sidebarEl}
          <div className={styles.scrollArea}>
            {contentEl}
            {footerEl}
          </div>
        </div>
      </div>
    )
  }

  if (stickyHeader) {
    // header 固定，header 下方整体滚动（含 sidebar、content、footer）
    // column rootFixed bounded > header + scrollArea(body-row(sidebar+content)+footer)
    return (
      <div className={clsx(styles.root, styles.column, styles.rootFixed, styles.bounded)}>
        {headerEl}
        <div className={styles.scrollArea}>
          <div className={clsx(styles.body, styles.row)}>
            {sidebarEl}
            {contentEl}
          </div>
          {footerEl}
        </div>
      </div>
    )
  }

  if (effectiveStickySidebar) {
    // sidebar 随 header 滚出后固定（CSS sticky），root 为滚动容器
    // column rootScrollable > header + body-row(sidebar+content) + footer
    return (
      <div className={clsx(styles.root, styles.column, styles.rootScrollable)}>
        {headerEl}
        <div className={clsx(styles.body, styles.row)}>
          {sidebarEl}
          {contentEl}
        </div>
        {footerEl}
      </div>
    )
  }

  // 都不固定，文档自然滚动
  // column rootNatural > header + body-row(sidebar+content) + footer
  return (
    <div className={clsx(styles.root, styles.column, styles.rootNatural)}>
      {headerEl}
      <div className={clsx(styles.body, styles.row)}>
        {sidebarEl}
        {contentEl}
      </div>
      {footerEl}
    </div>
  )
}
