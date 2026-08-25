import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

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

/**
 * Serves the owner's private library in DEV ONLY, from outside public/.
 *
 * It used to live in public/tracks-local, which Vite copies wholesale into
 * dist — so 583MB of unlicensed music sat in every build output and rode
 * along on any deploy from this machine. Living outside public/ makes that
 * structurally impossible rather than a rule someone has to remember.
 */
function localMedia(): Plugin {
  const TYPES: Record<string, string> = {
    '.mp3': 'audio/mpeg',
    '.m4a': 'audio/mp4',
    '.wav': 'audio/wav',
    '.json': 'application/json',
  }
  return {
    name: 'scope-local-media',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent((req.url ?? '').split('?')[0])
        const m = url.match(/^\/(tracks-local|peaks-local)\/(.+)$/)
        if (!m) return next()
        // No traversal out of the media root, ever.
        const rel = path.normalize(m[2]).replace(/^(\.\.[/\\])+/, '')
        const dir = m[1] === 'tracks-local' ? 'tracks' : 'peaks'
        const file = path.join(process.cwd(), 'local-media', dir, rel)
        if (!file.startsWith(path.join(process.cwd(), 'local-media')) || !fs.existsSync(file)) return next()
        const stat = fs.statSync(file)
        const type = TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream'
        // Range support: the audio element seeks, and peaks scrubbing needs it.
        const range = req.headers.range
        if (range) {
          const [s, e] = range.replace(/bytes=/, '').split('-')
          const start = parseInt(s, 10)
          const end = e ? parseInt(e, 10) : stat.size - 1
          res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${stat.size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': end - start + 1,
            'Content-Type': type,
          })
          fs.createReadStream(file, { start, end }).pipe(res)
          return
        }
        res.writeHead(200, { 'Content-Length': stat.size, 'Content-Type': type, 'Accept-Ranges': 'bytes' })
        fs.createReadStream(file).pipe(res)
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), siteUrl(mode), localMedia()],
}))
