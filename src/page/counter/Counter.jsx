import { Link } from 'react-router-dom'
import { useCounter } from '../../hook/useCounter'

function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6m-6 6h11" />
    </svg>
  )
}

export default function Counter() {
  const { count, increment, decrement, reset } = useCounter()

  return (
    <main className="counter-page">
      <Link className="counter-back" to="/">
        <ArrowLeftIcon />
        Back to shop
      </Link>

      <section className="counter-card">
        <span className="eyebrow">Custom hook demo</span>
        <h1>Simple counter</h1>
        <p>Use the controls to change the value, then reset whenever you want to start over.</p>

        <output className="counter-value" aria-live="polite" aria-label={`Current count: ${count}`}>
          {count}
        </output>

        <div className="counter-controls">
          <button className="counter-button counter-button--round" type="button" onClick={decrement} aria-label="Decrease count">
            <span aria-hidden="true">−</span>
          </button>
          <button className="counter-button counter-button--reset" type="button" onClick={reset} disabled={count === 0}>
            Reset
          </button>
          <button className="counter-button counter-button--round counter-button--primary" type="button" onClick={increment} aria-label="Increase count">
            <span aria-hidden="true">+</span>
          </button>
        </div>

        <p className="counter-hint">Powered by <code>useCounter()</code></p>
      </section>
    </main>
  )
}
