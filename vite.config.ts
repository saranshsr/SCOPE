import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Bakes the deploy origin into the social-card meta tags. Scrapers require
 * absolute URLs; build with:
 *
 *     VITE_SITE_URL=https://your-domain npm run build
 *
 * Unset, the placeholder is stripped (relative fallback) instead of shipping
 * a literal %VITE_SITE_URL% string. Runs before Vite's own %ENV% pass, which
 * would otherwise substitute first and leave double slashes.
 */
function siteUrl(mode: string): Plugin {
  const raw = loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL ?? ''
  const origin = raw.replace(/\/+$/, '')
  return {
    name: 'scope-site-url',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replaceAll('%VITE_SITE_URL%', origin)
      },
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), siteUrl(mode)],
}))
