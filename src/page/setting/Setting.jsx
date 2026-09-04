import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hook/useTheme'

const defaultPreferences = {
  orderUpdates: true,
  productNews: false,
  recommendations: true,
}

function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6m-6 6h11" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

export default function Setting() {
  const { theme, setTheme } = useTheme()
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [currency, setCurrency] = useState('USD')
  const [saved, setSaved] = useState(false)

  const updatePreference = (name) => {
    setPreferences((current) => ({
      ...current,
      [name]: !current[name],
    }))
    setSaved(false)
  }

  const selectTheme = (nextTheme) => {
    setTheme(nextTheme)
    setSaved(false)
  }

  const saveSettings = (event) => {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <div className="site-shell settings-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Sonder home">
          <span className="brand__mark">S</span>
          <span>sonder.</span>
        </Link>

        <Link className="detail-back" to="/">
          <ArrowLeftIcon />
          Back to shop
        </Link>
      </header>

      <main className="settings-page">
        <header className="settings-hero">
          <div>
            <span className="eyebrow">Your space</span>
            <h1>Settings that feel<br /><em>like yours.</em></h1>
          </div>
          <p>Choose how Sonder looks, what updates reach you, and how prices appear while you shop.</p>
        </header>

      
      </main>

      <footer>
        <Link className="brand brand--footer" to="/" aria-label="Sonder home">
          <span className="brand__mark">S</span>
          <span>sonder.</span>
        </Link>
        <p>Beautiful things for everyday living.</p>
        <span>© 2026 Sonder</span>
      </footer>
    </div>
  )
}
