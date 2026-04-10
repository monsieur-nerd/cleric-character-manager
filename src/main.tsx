import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Fonction pour révéler la page une fois React chargé
const revealPage = () => {
  document.documentElement.classList.add('react-loaded')
}

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Révéler la page après le premier rendu
requestAnimationFrame(() => {
  setTimeout(revealPage, 50) // Petit délai pour s'assurer que tout est rendu
})
