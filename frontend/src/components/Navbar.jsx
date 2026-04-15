import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.scss';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__brand">
          <h2>AmazonClone</h2>
        </Link>
      </div>

      <div className="navbar__search">
        <input type="text" className="navbar__searchInput" placeholder="Search..." />
        <button className="navbar__searchIcon">
          <FiSearch />
        </button>
      </div>

      <div className="navbar__right">
        {user ? (
          <div className="navbar__option" onClick={logout}>
            <span className="navbar__optionLineOne">Hello, {user.name}</span>
            <span className="navbar__optionLineTwo">Sign Out</span>
          </div>
        ) : (
          <Link to="/login" className="navbar__option">
            <span className="navbar__optionLineOne">Hello, Guest</span>
            <span className="navbar__optionLineTwo">Sign In</span>
          </Link>
        )}

        <Link to="/orders" className="navbar__option">
          <span className="navbar__optionLineOne">Returns</span>
          <span className="navbar__optionLineTwo">& Orders</span>
        </Link>

        <Link to="/cart" className="navbar__optionBasket">
          <FiShoppingCart />
          <span className="navbar__optionLineTwo navbar__basketCount">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
