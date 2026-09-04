import { createRoot } from 'react-dom/client'
import App, { readAccent } from './App'
import '@fontsource/archivo-black'
import '@fontsource-variable/jetbrains-mono'
import './styles.css'

// The survey canvas draws with fillStyle, which takes a string, so it cannot
// say var(--accent). readAccent hands it the numbers from the stylesheet --
// once, because getComputedStyle in a draw loop is a forced style read.
readAccent()

// No StrictMode: the app owns one AudioContext and one rAF loop in a
// mount-once effect; double-invoked effects would build two audio graphs.
createRoot(document.getElementById('root')!).render(<App />)
