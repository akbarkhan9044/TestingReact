import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../../redux/slice/cartSlice'

function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6m-6 6h11" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6.5 8.5h11l1 12h-13l1-12ZM9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" />
    </svg>
  )
}

export default function Cart() {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.cart)

  const subtotal = cart.reduce((total, item) => total + item.price, 0)
  const shipping = cart.length === 0 || subtotal >= 75 ? 0 : 8
  const estimatedTax = subtotal * 0.08
  const total = subtotal + shipping + estimatedTax

  const removeItem = (item) => dispatch(addToCart(item))

  return (
    <div className="site-shell cart-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Sonder home">
          <span className="brand__mark">S</span>
          <span>sonder.</span>
        </Link>
        <Link className="detail-back" to="/">
          <ArrowLeftIcon />
          Continue shopping
        </Link>
      </header>

      <main className="cart-page">
        <div className="cart-heading">
          <div>
            <span className="eyebrow">Your selection</span>
            <h1>Shopping bag</h1>
          </div>
          <p>{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
        </div>

        {cart.length === 0 ? (
          <section className="cart-empty">
            <span className="cart-empty__icon"><BagIcon /></span>
            <h2>Your bag is waiting.</h2>
            <p>Explore our collection and add something you love.</p>
            <Link to="/">Browse the collection</Link>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-label="Items in your bag">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <Link className="cart-item__image" to={`/detail/${item.id}`}>
                    <img src={item.image} alt={item.title} />
                  </Link>

                  <div className="cart-item__content">
                    <div>
                      <p className="cart-item__category">{item.category}</p>
                      <Link to={`/detail/${item.id}`}><h2>{item.title}</h2></Link>
                    </div>
                    <div className="cart-item__footer">
                      <button type="button" onClick={() => removeItem(item)} aria-label={`Remove ${item.title} from bag`}>
                        <TrashIcon />
                        Remove
                      </button>
                      <strong>${item.price.toFixed(2)}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="cart-summary">
              <span className="eyebrow">Order details</span>
              <h2>Summary</h2>
              <dl>
                <div><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
                <div><dt>Shipping</dt><dd>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</dd></div>
                <div><dt>Estimated tax</dt><dd>${estimatedTax.toFixed(2)}</dd></div>
                <div className="cart-summary__total"><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
              </dl>
              <button type="button">Proceed to checkout <span aria-hidden="true">→</span></button>
              <p>Secure checkout · Easy 30-day returns</p>
            </aside>
          </div>
        )}
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
