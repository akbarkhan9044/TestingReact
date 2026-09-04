import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams,useSearchParams } from 'react-router-dom'
import { fetchSingleProduct } from '../../redux/action/fetchSingleProduct'
import { addToCart } from '../../redux/slice/cartSlice';
import {useLocation} from "react-router-dom";
function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6m-6 6h11" />
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

function DetailSkeleton() {
  return (
    <main className="detail-page" aria-busy="true" aria-label="Loading product">
      <div className="detail-layout detail-layout--loading">
        <div className="skeleton detail-skeleton__image" />
        <div className="detail-skeleton__content">
          <div className="skeleton skeleton--small" />
          <div className="skeleton detail-skeleton__title" />
          <div className="skeleton detail-skeleton__title detail-skeleton__title--short" />
          <div className="skeleton detail-skeleton__text" />
          <div className="skeleton detail-skeleton__text" />
        </div>
      </div>
    </main>
  )
}

export default function Detail() {
  const { id } = useParams();
  const {state}=useLocation();
  console.log("Data from location",state);
  const [searchParams]=useSearchParams();
  const price=searchParams.get("price");
  const category=searchParams.get("category");
  console.log(category);
  console.log(price);
  const dispatch = useDispatch()
  const { product, error, pending } = useSelector((state) => state.detail)
  const { cart } = useSelector((state) => state.cart)
  const itemExistsInCart = cart.some((item) => item.id === Number(id))
  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [dispatch, id])

  const retry = () => dispatch(fetchSingleProduct(id));
  

  return (
    <div className="site-shell detail-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Sonder home">
          <span className="brand__mark">S</span>
          <span>sonder.</span>
        </Link>
        <div className="header-actions">
          <Link className="detail-back" to="/">
            <ArrowLeftIcon />
            Back to collection
          </Link>
          <Link className="cart-nav" to="/cart">
            Cart
            <span aria-label={`${cart.length} items in cart`}>{cart.length}</span>
          </Link>
        </div>
      </header>

      {pending ? <DetailSkeleton /> : null}

      {!pending && error ? (
        <main className="detail-page">
          <div className="detail-message" role="alert">
            <span className="eyebrow">Something went wrong</span>
            <h1>We couldn’t find that product.</h1>
            <p>{error}</p>
            <div className="detail-message__actions">
              <button type="button" onClick={retry}>Try again</button>
              <Link to="/">Browse products</Link>
            </div>
          </div>
        </main>
      ) : null}

      {!pending && !error && product?.id ? (
        <main className="detail-page">
          <nav className="detail-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{product.category}</span>
          </nav>

          <section className="detail-layout">
            <div className="detail-image">
              <span className="detail-image__label">Sonder selection</span>
              <img src={product.image} alt={product.title} />
            </div>

            <div className="detail-content">
              <span className="eyebrow">{product.category}</span>
              <h1>{product.title}</h1>

              <div className="detail-rating" aria-label={`${product.rating?.rate || 0} out of 5 stars`}>
                <StarIcon />
                <strong>{product.rating?.rate?.toFixed(1) || 'New'}</strong>
                {product.rating?.count ? <span>{product.rating.count} reviews</span> : null}
              </div>

              <p className="detail-price">${product.price?.toFixed(2)}</p>
              <p className="detail-description">{product.description}</p>
        {itemExistsInCart?
            <button className="detail-add" type="button"
              onClick={()=>{
                dispatch(addToCart(product))
              }}
              >
                Remove from bag
                <span aria-hidden="true">+</span>
              </button>
        :
            <button className="detail-add" type="button"
              onClick={()=>{
                dispatch(addToCart(product))
              }}
              >
                Add to bag
                <span aria-hidden="true">+</span>
              </button>
        }
          

              <div className="detail-perks">
                <div><strong>Free shipping</strong><span>On orders over $75</span></div>
                <div><strong>Easy returns</strong><span>30-day return window</span></div>
                <div><strong>Secure checkout</strong><span>Protected payment</span></div>
              </div>
            </div>
          </section>
        </main>
      ) : null}

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
