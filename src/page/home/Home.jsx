import { useEffect } from 'react'
import Products from '../../component/Products'
import { fetchProducts } from '../../redux/action/fetchProduct'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Home() {
  const dispatch = useDispatch()
  const { products, pending, error } = useSelector((state) => state.products)
  const cartCount = useSelector((state) => state.cart.cart.length)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Sonder home">
          <span className="brand__mark">S</span>
          <span>sonder.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#products">Shop</a>
          <a href="#products">New arrivals</a>
          <a href="#products">Collections</a>
        </nav>
        <div className="header-actions">
          <a className="header-action header-action--secondary" href="#products">Browse shop</a>
          <Link className="cart-nav" to="/cart">
            Cart
            <span aria-label={`${cartCount} items in cart`}>{cartCount}</span>
          </Link>
        </div>
      </header>

      <Products result={products} isLoading={pending} error={error} />

      <footer>
        <a className="brand brand--footer" href="/" aria-label="Sonder home">
          <span className="brand__mark">S</span>
          <span>sonder.</span>
        </a>
        <p>Beautiful things for everyday living.</p>
        <span>© 2026 Sonder</span>
      </footer>
    </div>
  )
}
