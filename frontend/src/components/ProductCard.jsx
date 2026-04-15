import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    toast.success('Added to cart!', { autoClose: 1500 });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="productCard">
      <button className={`productCard__heart ${wishlisted ? 'wishlisted' : ''}`} onClick={handleWishlist} title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}>
        {wishlisted ? <FaHeart /> : <FiHeart />}
      </button>
      <div className="productCard__imgWrap">
        <img src={product.images?.[0]?.url || 'https://picsum.photos/seed/placeholder/280/280'} alt={product.title} />
      </div>
      <div className="productCard__info">
        {product.brand && <p className="productCard__brand">{product.brand}</p>}
        <p className="productCard__title">{product.title}</p>
        <div className="productCard__rating">
          <FaStar className="productCard__ratingStar" />
          <span>{product.ratings?.toFixed(1)}</span>
          <span className="productCard__ratingCount">({product.ratingCount?.toLocaleString()})</span>
        </div>
        <p className="productCard__price">₹<strong>{product.price?.toLocaleString('en-IN')}</strong></p>
      </div>
      <button className="productCard__cartBtn" onClick={handleAddToCart}>Add to Cart</button>
    </Link>
  );
};

export default ProductCard;
