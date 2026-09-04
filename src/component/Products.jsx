import { useState } from 'react'
import { Link } from 'react-router-dom'

const categories = ['all', "men's clothing", "women's clothing", 'jewelery', 'electronics']

const categoryLabels = {
  all: 'All products',
  "men's clothing": 'Men',
  "women's clothing": 'Women',
  jewelery: 'Jewelry',
  electronics: 'Electronics',
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m12 2.8 2.7 5.47 6.03.88-4.36 4.25 1.03 6-5.4-2.84-5.4 2.84 1.03-6-4.36-4.25 6.03-.88L12 2.8Z" />
    </svg>
  )
}

function ArrowIcon() {

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  )
}

function ProductSkeleton() {
  return (
    <article className="product-card product-card--skeleton" aria-hidden="true">
      <div className="skeleton product-card__image" />
      <div className="product-card__body">
        <div className="skeleton skeleton--small" />
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--title-short" />
        <div className="skeleton skeleton--price" />
      </div>
    </article>
  )
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-card__link" state={{product}} to={`/detail/${product.id}?price=${product.price}&category=${product.category}`} aria-label={`View ${product.title}`}>
        <div className="product-card__image">
          <span className="product-card__badge">New</span>
          <img src={product.image} alt={product.title} loading="lazy" />
        </div>

        <div className="product-card__body">
          <p className="product-card__category">{categoryLabels[product.category] || product.category}</p>
          <h3>{product.title}</h3>

          <div className="product-card__meta">
            <div className="product-card__rating" aria-label={`${product.rating?.rate || 0} out of 5 stars`}>
              <StarIcon />
              <span>{product.rating?.rate?.toFixed(1) || 'New'}</span>
              {product.rating?.count ? <span className="product-card__reviews">({product.rating.count})</span> : null}
            </div>
            <strong>${product.price.toFixed(2)}</strong>
          </div>

          <span className="product-card__button">
            View product
            <ArrowIcon />
          </span>
        </div>
      </Link>
    </article>
  )
}

export default function Products({ result, isLoading, error }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const normalizedSearch = search.trim().toLowerCase()
  const visibleProducts = result.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory
    const matchesSearch = !normalizedSearch || product.title.toLowerCase().includes(normalizedSearch)
    return matchesCategory && matchesSearch
  })

  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <span className="eyebrow">Curated for everyday life</span>
          <h1>Find your next<br /><em>favorite thing.</em></h1>
          <p>Thoughtful essentials, statement pieces, and clever tech—all selected to make every day feel a little better.</p>
          <a className="hero__cta" href="#products">Explore collection <ArrowIcon /></a>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__orb hero__orb--one" />
          <div className="hero__orb hero__orb--two" />
          <span>New<br />Edit</span>
          <p>20 handpicked pieces</p>
        </div>
      </section>

      <section className="catalog" id="products">
        <div className="catalog__heading">
          <div>
            <span className="eyebrow">The collection</span>
            <h2>Shop all products</h2>
          </div>
          <label className="search-field">
            <span className="sr-only">Search products</span>
            <SearchIcon />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
            />
          </label>
        </div>

        <div
         className="catalog__filters" aria-label="Product categories">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? 'filter-chip filter-chip--active' : 'filter-chip'}
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {categoryLabels[category]}
            </button>
          ))}
          {!isLoading && !error ? <span className="catalog__count">{visibleProducts.length} items</span> : null}
        </div>

        {error ? (
          <div className="catalog__message" role="alert">
            <h3>We couldn’t load the collection.</h3>
            <p>{error}</p>
          </div>
        ) : (
          <div className="product-grid" aria-live="polite" aria-busy={isLoading}>
            {isLoading
              ? Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)
              : visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}

        {!isLoading && !error && visibleProducts.length === 0 ? (
          <div className="catalog__message">
            <h3>No products found</h3>
            <p>Try a different search or category.</p>
          </div>
        ) : null}
      </section>
    </main>
  )
}
