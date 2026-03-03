import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import type { NextConfig } from 'next'

const withVanillaExtract = createVanillaExtractPlugin()
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
}

export default withVanillaExtract(withMDX(nextConfig))
