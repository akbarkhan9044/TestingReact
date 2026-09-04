import { Link } from 'react-router-dom'
import { useFetch } from '../../hook/useFetch'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6m-6 6h11" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 6.5h18v12H3zM3 7l9 7 9-7" />
    </svg>
  )
}

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function UserCard({ user, index }) {
  return (
    <article className="user-card">
      <div className="user-card__topline">
        <span className="user-avatar" aria-hidden="true">{getInitials(user.name)}</span>
        <span className="user-card__number">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="user-card__content">
        <p>{user.company?.name || 'Independent'}</p>
        <h2>{user.name}</h2>
        <span>@{user.username}</span>
      </div>

      <a className="user-card__email" href={`mailto:${user.email}`}>
        <MailIcon />
        <span>{user.email}</span>
      </a>
    </article>
  )
}

function UserSkeletons() {
  return (
    <div className="user-grid" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <div className="user-card user-card--skeleton" key={index}>
          <span className="skeleton user-skeleton__avatar" />
          <span className="skeleton user-skeleton__line" />
          <span className="skeleton user-skeleton__line user-skeleton__line--short" />
        </div>
      ))}
    </div>
  )
}

export default function User() {
  const { data, error, loading } = useFetch(USERS_URL)
  const users = Array.isArray(data) ? data : []

  return (
    <div className="site-shell users-shell">
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

      <main className="users-page">
        <header className="users-hero">
          <div>
            <span className="eyebrow">Community directory</span>
            <h1>Meet the people<br /><em>behind the names.</em></h1>
          </div>
          <p>A small directory powered by JSONPlaceholder, designed to make every name and email easy to discover and test.</p>
        </header>

        {loading ? (
          <section className="users-state" role="status" aria-label="Loading users">
            <span className="sr-only">Loading users</span>
            <UserSkeletons />
          </section>
        ) : null}

        {!loading && error ? (
          <section className="users-message" role="alert">
            <span className="eyebrow">Connection interrupted</span>
            <h2>We couldn’t load the directory.</h2>
            <p>{error.message}</p>
          </section>
        ) : null}

        {!loading && !error && users.length > 0 ? (
          <section className="user-grid" aria-label="User directory">
            {users.map((user, index) => (
              <UserCard key={user.id} user={user} index={index} />
            ))}
          </section>
        ) : null}

        {!loading && !error && users.length === 0 ? (
          <section className="users-message">
            <h2>No users found.</h2>
            <p>The directory is currently empty.</p>
          </section>
        ) : null}
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
