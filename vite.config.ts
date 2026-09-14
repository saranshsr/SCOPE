import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Bakes the deploy origin into the social-card meta tags.
 *
 * Scrapers require ABSOLUTE urls. Unset, this stripped the placeholder and
 * left `og:image="/og.png"` and `og:url="/"` — which is not a degraded card,
 * it is NO card: every scraper drops a relative image. The production deploy
 * shipped that way for its whole life, because the only thing standing
 * between a rich unfurl and nothing was one environment variable that
 * nobody had set.
 *
 * So it is derived now, and the manual value is only an override:
 *
 *   1. VITE_SITE_URL          an explicit answer, e.g. a custom domain
 *   2. VERCEL_PROJECT_PRODUCTION_URL   the project's stable production host
 *   3. VERCEL_URL             this specific deployment, so PREVIEWS unfurl too
 *   4. ''                     local dev, where relative is correct
 *
 * 2 and 3 are Vercel build-time vars and carry no VITE_ prefix, so loadEnv
 * cannot see them by design — they are read from process.env directly. They
 * are also build-only and never reach the client; only the resolved origin
 * is baked into the html.
 */
function resolveOrigin(mode: string): string {
  const explicit = loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL
  if (explicit) return explicit.replace(/\/+$/, '')
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  return host ? `https://${host.replace(/^https?:\/\//, '').replace(/\/+$/, '')}` : ''
}

function siteUrl(mode: string): Plugin {
  const origin = resolveOrigin(mode)
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

/**
 * Serves `/api/yt-search` in DEV from the very same handler Vercel runs in
 * production, so there is one implementation and dev cannot drift from it.
 *
 * The key is read from the server environment. `loadEnv` with an empty prefix
 * is deliberate — it reads UNPREFIXED vars out of .env.local, which is the
 * whole point: YT_API_KEY must not be VITE_ prefixed, because Vite embeds
 * anything VITE_ verbatim into the client bundle and this repository is
 * public. It is pushed onto process.env for the handler and never enters
 * `define`, so it cannot reach the browser.
 */
function devApi(mode: string): Plugin {
  return {
    name: 'scope-dev-api',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), '')
      if (env.YT_API_KEY && !process.env.YT_API_KEY) process.env.YT_API_KEY = env.YT_API_KEY
      server.middlewares.use('/api/yt-search', async (req, res, next) => {
        try {
          const { default: handler } = await import('./api/yt-search.js')
          await handler(req, res)
        } catch (e) {
          // A broken handler must read as a broken handler, not as a 404 that
          // sends the client down a fallback path looking for a missing route.
          server.config.logger.error(`scope-dev-api: ${(e as Error).message}`)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({ error: 'the dev search handler threw' }))
          } else next()
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), siteUrl(mode), localMedia(), devApi(mode)],
}))
