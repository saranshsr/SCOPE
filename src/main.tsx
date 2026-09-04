import { createRoot } from 'react-dom/client'
import App, { readAccent } from './App'
import '@fontsource/archivo-black'
import '@fontsource-variable/jetbrains-mono'
import './styles.css'

// ?accent=noon repaints the one accent in noon's yellow, before React
// renders so there is no flash of vermillion. A test harness for a question
// that only real eyes can answer -- it REPLACES the accent rather than
// adding one, so §6 holds either way. readAccent then hands the numbers to
// the survey canvas, which cannot say var(--red).
// THIS BRANCH DEFAULTS TO YELLOW. On main the accent is vermillion and
// ?accent=noon opts in; here it is the other way round, so the Vercel
// preview for this branch IS the yellow build with no parameter to
// remember and nothing to explain to whoever you show it to.
// ?accent=red goes back to the shipped accent for a side-by-side on one
// screen. Everything else about this branch matches main.
const accent = new URLSearchParams(location.search).get('accent') ?? 'noon'
document.documentElement.dataset.accent = accent === 'red' ? '' : accent
readAccent()

// No StrictMode: the app owns one AudioContext and one rAF loop in a
// mount-once effect; double-invoked effects would build two audio graphs.
createRoot(document.getElementById('root')!).render(<App />)
