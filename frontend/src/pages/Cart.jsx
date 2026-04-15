import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.scss';

const DELIVERY_CHARGE = 49;
const FREE_DELIVERY_THRESHOLD = 999;

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const deliveryCharge = cartTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;

  return (
    <div className="cart">
      <div className="cart__left">
        <div>
          <h2 className="cart__title">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <div className="cart__empty">
              <p>Your cart is empty.</p>
              <Link to="/" className="btn-primary">Continue Shopping</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cartItem" key={item.id}>
                <Link to={`/product/${item.productId}`}>
                  <img className="cartItem__image" src={item.product.images?.[0]?.url || 'https://via.placeholder.com/180'} alt={item.product.title} />
                </Link>
                <div className="cartItem__info">
                  <Link to={`/product/${item.productId}`} className="cartItem__titleLink">
                    <p className="cartItem__title">{item.product.title}</p>
                  </Link>
                  <p className="cartItem__brand">{item.product.brand}</p>
                  <p className="cartItem__price">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                    {item.quantity > 1 && <span className="cartItem__unitPrice"> (₹{item.product.price} each)</span>}
                  </p>
                  <p className={`cartItem__stock ${item.product.stock > 0 ? 'inStock' : 'outOfStock'}`}>
                    {item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                  <div className="cartItem__actions">
                    <label>Qty:
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      >
                        {[...Array(Math.min(10, item.product.stock)).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                      </select>
                    </label>
                    <span className="cartItem__divider">|</span>
                    <button className="cartItem__removeBtn" onClick={() => removeFromCart(item.id)}>Delete</button>
                    <span className="cartItem__divider">|</span>
                    <button className="cartItem__saveBtn">Save for later</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="cart__right">
          <div className="subtotal">
            <div className="subtotal__rows">
              <div className="subtotal__row">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="subtotal__row">
                <span>Delivery</span>
                <span className={deliveryCharge === 0 ? 'subtotal__free' : ''}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
            </div>
            {deliveryCharge > 0 && (
              <p className="subtotal__hint">Add ₹{(FREE_DELIVERY_THRESHOLD - cartTotal).toFixed(0)} more for FREE delivery</p>
            )}
            <div className="subtotal__total">
              <strong>Estimated Total: ₹{(cartTotal + deliveryCharge).toFixed(2)}</strong>
              <small>(+ 18% GST at checkout)</small>
            </div>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
            <button
              className="btn-primary"
              disabled={cartItems.length === 0}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
