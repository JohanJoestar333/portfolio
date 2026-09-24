// This is the entry point of the whole app — it's the first JS file that
// runs. index.html has a <div id="root"></div>, and the three lines below
// find that div and tell React to render <App /> (and everything App
// renders) inside it.
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css' // Global design tokens + base styles — loaded once, here, for the whole app.

// A little Easter egg (see the brief's "Console message" idea): anyone
// who opens DevTools sees this instead of nothing.
console.log(
  '%c👀 You opened DevTools.\n\nGood.\n\nA QA engineer would.',
  'font-family: monospace; color: #84cc16;'
)

// React.StrictMode doesn't render anything itself — it's a development-only
// helper that intentionally double-invokes some functions to help catch
// bugs (like side effects in the wrong place). It has no effect in
// production builds.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
