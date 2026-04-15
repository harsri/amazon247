import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FiHeart } from 'react-icons/fi';
import { FaHeart, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './ProductDetails.scss';

const StarRating = ({ value, max = 5, onRate, interactive = false }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="starRating">
      {Array.from({ length: max }, (_, i) => {
        const filled = interactive ? (hovered || value) >= i + 1 : value >= i + 1;
        const half = !interactive && value >= i + 0.5 && value < i + 1;
        return interactive ? (
          <FaStar
            key={i}
            className={`starRating__star ${filled ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
            onMouseEnter={() => setHovered(i + 1)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onRate && onRate(i + 1)}
          />
        ) : half ? (
          <FaStarHalfAlt key={i} className="starRating__star filled" />
        ) : filled ? (
          <FaStar key={i} className="starRating__star filled" />
        ) : (
          <FaRegStar key={i} className="starRating__star" />
        );
      })}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [pincode, setPincode] = useState('');
  const [deliveryMsg, setDeliveryMsg] = useState('');
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [features, setFeatures] = useState([]);

  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistItems } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);

  const isWishlisted = wishlistItems.some(w => w.productId === parseInt(id));

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        const prod = res.data.product;
        setProduct(prod);
        setActiveImg(0);

        // Parse features
        try { setFeatures(JSON.parse(prod.features || '[]')); } catch { setFeatures([]); }

        // Fetch similar products from same category
        const similarRes = await api.get(`/products?category=${encodeURIComponent(prod.category?.name || '')}`);
        setSimilarProducts((similarRes.data.products || []).filter(p => p.id !== prod.id).slice(0, 4));

        // Fetch reviews
        const revRes = await api.get(`/reviews/${id}`);
        setReviews(revRes.data.reviews || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handlePincodeCheck = async () => {
    if (!pincode) { toast.warn('Enter a pincode'); return; }
    try {
      const res = await api.post('/products/pincode', { pincode });
      setDeliveryMsg(res.data.message);
    } catch { setDeliveryMsg('Unable to check pincode.'); }
  };

  const handleBuyNow = () => { addToCart(product.id, 1); navigate('/checkout'); };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) { toast.warn('Please login to submit a review.'); return; }
    setSubmittingReview(true);
    try {
      await api.post(`/reviews/${id}`, { rating: userRating, comment: userComment });
      const revRes = await api.get(`/reviews/${id}`);
      setReviews(revRes.data.reviews || []);
      setUserComment('');
      setUserRating(5);
      toast.success('Review submitted!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <div className="productDetails__loading"><div className="productDetails__spinner" /></div>;
  if (!product) return <div className="productDetails__loading">Product not found.</div>;

  const images = product.images?.length ? product.images : [{ url: 'https://via.placeholder.com/400?text=No+Image' }];

  return (
    <div className="productDetails">
      {/* MAIN DETAIL SECTION */}
      <div className="productDetails__main">
        {/* Image Gallery */}
        <div className="productDetails__gallery">
          <div className="productDetails__thumbnails">
            {images.map((img, i) => (
              <img key={i} src={img.url} alt={`view ${i + 1}`}
                className={`productDetails__thumb ${activeImg === i ? 'active' : ''}`}
                onClick={() => setActiveImg(i)} />
            ))}
          </div>
          <div className="productDetails__mainImg">
            <img src={images[activeImg]?.url} alt={product.title} />
            <button
              className={`productDetails__heart ${isWishlisted ? 'wishlisted' : ''}`}
              onClick={() => addToWishlist(product.id)}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              {isWishlisted ? <FaHeart /> : <FiHeart />}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="productDetails__info">
          {product.brand && <p className="productDetails__brand">Brand: <Link to={`/?search=${product.brand}`}><strong>{product.brand}</strong></Link></p>}
          <h1 className="productDetails__title">{product.title}</h1>

          <div className="productDetails__ratingRow">
            <StarRating value={product.ratings} />
            <span className="productDetails__ratingVal">{product.ratings.toFixed(1)}</span>
            <span className="productDetails__ratingCount">({product.ratingCount?.toLocaleString()} ratings)</span>
          </div>

          <div className="productDetails__category">
            Category: <Link to={`/?category=${product.category?.name}`}>{product.category?.name}</Link>
          </div>

          <hr />

          <div className="productDetails__priceBox">
            <span className="productDetails__label">Price:</span>
            <span className="productDetails__priceOld">₹{(product.price * 1.2).toFixed(0)}</span>
            <span className="productDetails__price">₹{product.price.toFixed(2)}</span>
            <span className="productDetails__discount">17% off</span>
          </div>
          <p className="productDetails__taxNote">Inclusive of all taxes. Free delivery on orders above ₹999.</p>

          <p className="productDetails__description">{product.description}</p>

          {features.length > 0 && (
            <div className="productDetails__features">
              <h3>Key Features</h3>
              <ul>
                {features.map((f, i) => <li key={i}>✓ {f}</li>)}
              </ul>
            </div>
          )}

          {/* Pincode */}
          <div className="productDetails__pincode">
            <h4>Check Delivery</h4>
            <div className="productDetails__pincodeRow">
              <input type="text" placeholder="Enter 6-digit PIN" value={pincode} onChange={e => setPincode(e.target.value)} maxLength={6} />
              <button onClick={handlePincodeCheck} className="btn-secondary">Check</button>
            </div>
            {deliveryMsg && <p className={`productDetails__deliveryMsg ${deliveryMsg.includes('not available') ? 'unavail' : ''}`}>{deliveryMsg}</p>}
          </div>
        </div>

        {/* Buy Box */}
        <div className="productDetails__buyBox">
          <p className="productDetails__buyPrice">₹{product.price.toFixed(2)}</p>
          <p className={`productDetails__buyStock ${product.stock > 0 ? 'inStock' : 'outStock'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
          </p>
          <p className="productDetails__buyDelivery">🚚 Delivery by tomorrow</p>
          <button className="btn-primary productDetails__addCart" onClick={() => { addToCart(product.id, 1); toast.success('Added to cart!'); }} disabled={product.stock <= 0}>
            Add to Cart
          </button>
          <button className="btn-primary productDetails__buyNow" onClick={handleBuyNow} disabled={product.stock <= 0}>
            Buy Now
          </button>
          <div className="productDetails__secure">🔒 Secure transaction</div>
          <div className="productDetails__misc">
            <p>Sold by: <strong>AmazonClone Store</strong></p>
            <p>Gift wrapping available</p>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="productDetails__reviewSection">
        <div className="productDetails__reviewLeft">
          <h2>Customer Reviews</h2>
          <div className="productDetails__avgRating">
            <span className="productDetails__avgNum">{product.ratings.toFixed(1)}</span>
            <StarRating value={product.ratings} />
            <span>{product.ratingCount?.toLocaleString()} global ratings</span>
          </div>

          {/* Rating Bars */}
          {[5, 4, 3, 2, 1].map(star => {
            const count = reviews.filter(r => r.rating === star).length;
            const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
            return (
              <div className="productDetails__ratingBar" key={star}>
                <span>{star} star</span>
                <div className="productDetails__ratingBarTrack"><div className="productDetails__ratingBarFill" style={{ width: `${pct}%` }} /></div>
                <span>{pct}%</span>
              </div>
            );
          })}
        </div>

        <div className="productDetails__reviewRight">
          {/* Write Review Form */}
          {user && (
            <div className="productDetails__reviewForm">
              <h3>Write a Review</h3>
              <form onSubmit={handleSubmitReview}>
                <p>Your Rating:</p>
                <StarRating value={userRating} interactive onRate={setUserRating} />
                <textarea required placeholder="Share your experience with this product..." value={userComment} onChange={e => setUserComment(e.target.value)} rows={4} />
                <button type="submit" className="btn-primary" disabled={submittingReview}>
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}

          {/* Review List */}
          <div className="productDetails__reviewList">
            {reviews.length === 0 ? (
              <p className="productDetails__noReviews">No reviews yet. Be the first to review!</p>
            ) : reviews.map(r => (
              <div className="reviewCard" key={r.id}>
                <div className="reviewCard__header">
                  <span className="reviewCard__avatar">{r.user.name[0].toUpperCase()}</span>
                  <div>
                    <strong>{r.user.name}</strong>
                    <StarRating value={r.rating} />
                  </div>
                  <span className="reviewCard__date">{new Date(r.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
                <p className="reviewCard__comment">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <div className="productDetails__similar">
          <h2>Similar Products</h2>
          <div className="productDetails__similarGrid">
            {similarProducts.map(p => (
              <Link to={`/product/${p.id}`} className="similarCard" key={p.id}>
                <img src={p.images?.[0]?.url || 'https://via.placeholder.com/200'} alt={p.title} />
                <p className="similarCard__title">{p.title}</p>
                <div className="similarCard__rating">
                  <StarRating value={p.ratings} />
                  <span>({p.ratingCount})</span>
                </div>
                <p className="similarCard__price">₹{p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
