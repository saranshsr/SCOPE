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
const accent = new URLSearchParams(location.search).get('accent')
if (accent) document.documentElement.dataset.accent = accent
readAccent()

// No StrictMode: the app owns one AudioContext and one rAF loop in a
// mount-once effect; double-invoked effects would build two audio graphs.
createRoot(document.getElementById('root')!).render(<App />)
