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
  const { addToWishlist, wishlistItems } = useContext(WishlistContext);

  const isWishlisted = wishlistItems.some(w => w.productId === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id, 1);
    toast.success(`Added to cart!`, { autoClose: 1500 });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="productCard">
      <button className={`productCard__heart ${isWishlisted ? 'wishlisted' : ''}`} onClick={handleWishlist} title={isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}>
        {isWishlisted ? <FaHeart /> : <FiHeart />}
      </button>

      <div className="productCard__imgWrap">
        <img
          src={product.images?.[0]?.url || 'https://via.placeholder.com/280x280?text=Product'}
          alt={product.title}
        />
      </div>

      <div className="productCard__info">
        {product.brand && <p className="productCard__brand">{product.brand}</p>}
        <p className="productCard__title">{product.title}</p>
        <div className="productCard__rating">
          <FaStar className="productCard__ratingStar" />
          <span>{product.ratings?.toFixed(1)}</span>
          <span className="productCard__ratingCount">({product.ratingCount?.toLocaleString()})</span>
        </div>
        <p className="productCard__price">₹<strong>{product.price?.toFixed(2)}</strong></p>
      </div>

      <button className="productCard__cartBtn btn-primary" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;
