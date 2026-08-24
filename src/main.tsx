import { createRoot } from 'react-dom/client'
import App from './App'
import '@fontsource/archivo-black'
import '@fontsource-variable/jetbrains-mono'
import './styles.css'

// No StrictMode: the app owns one AudioContext and one rAF loop in a
// mount-once effect; double-invoked effects would build two audio graphs.
createRoot(document.getElementById('root')!).render(<App />)
