import { createRoot } from 'react-dom/client'
import App, { paintThemeColor, readAccent } from './App'
import '@fontsource/archivo-black'
import './styles.css'

// The survey canvas draws with fillStyle, which takes a string, so it cannot
// say var(--accent). readAccent hands it the numbers from the stylesheet --
// once, because getComputedStyle in a draw loop is a forced style read.
// The saved ground goes on BEFORE the first read and the first paint, or a
// paper visitor sees one dark frame and the canvases cache the dark inks.
try {
  if (localStorage.getItem('scope-theme-v1') === 'paper') document.documentElement.dataset.theme = 'paper'
} catch {
  /* private mode: the default ground */
}
readAccent()
// and the browser's own bar, which index.html can only say one colour for
paintThemeColor()

// No StrictMode: the app owns one AudioContext and one rAF loop in a
// mount-once effect; double-invoked effects would build two audio graphs.
createRoot(document.getElementById('root')!).render(<App />)
