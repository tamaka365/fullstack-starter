import { Layout, UIProvider } from '@starter/ui'
import { DocsSidebar } from './docs-sidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <Layout sidebarFull sidebar={<DocsSidebar />}>
        <div style={{ padding: 40, maxWidth: 860, fontFamily: 'sans-serif' }}>
          {children}
        </div>
      </Layout>
    </UIProvider>
  )
}
