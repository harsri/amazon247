import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import './Navbar.scss';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (category) params.append('category', category);
    navigate(`/?${params.toString()}`);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="navbar">
      {/* Brand */}
      <Link to="/" className="navbar__brand">
        <span className="navbar__brandIcon">🛒</span>
        <span>AmazonClone</span>
      </Link>

      {/* Search */}
      <form className="navbar__search" onSubmit={handleSearch}>
        <select className="navbar__searchCategory" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Books">Books</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
        </select>
        <input
          type="text"
          className="navbar__searchInput"
          placeholder="Search products, brands and more..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="navbar__searchIcon">
          <FiSearch />
        </button>
      </form>

      {/* Right */}
      <div className="navbar__right">
        {/* User menu */}
        <div className="navbar__userMenu" ref={menuRef}>
          <button className="navbar__option" onClick={() => setUserMenuOpen(v => !v)}>
            <span className="navbar__optionLineOne">Hello, {user?.name?.split(' ')[0] || 'Guest'}</span>
            <span className="navbar__optionLineTwo">Account <FiChevronDown style={{ fontSize: 12 }} /></span>
          </button>

          {userMenuOpen && (
            <div className="navbar__dropdown">
              {user ? (
                <>
                  <div className="navbar__dropdownHeader">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <Link to="/orders" className="navbar__dropdownItem" onClick={() => setUserMenuOpen(false)}>📦 Your Orders</Link>
                  <Link to="/addresses" className="navbar__dropdownItem" onClick={() => setUserMenuOpen(false)}>📍 Address Book</Link>
                  <Link to="/wishlist" className="navbar__dropdownItem" onClick={() => setUserMenuOpen(false)}>
                    ❤️ Wishlist {wishlistCount > 0 && <span className="navbar__dropdownBadge">{wishlistCount}</span>}
                  </Link>
                  <Link to="/support" className="navbar__dropdownItem" onClick={() => setUserMenuOpen(false)}>🎫 Help & Support</Link>
                  <button className="navbar__dropdownItem navbar__dropdownSignout" onClick={() => { logout(); setUserMenuOpen(false); }}>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="navbar__dropdownSignin" onClick={() => setUserMenuOpen(false)}>Sign In</Link>
                  <p className="navbar__dropdownNew">New customer? <Link to="/login">Start here.</Link></p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <Link to="/orders" className="navbar__option navbar__optionHideSmall">
          <span className="navbar__optionLineOne">Returns</span>
          <span className="navbar__optionLineTwo">& Orders</span>
        </Link>

        {/* Support */}
        <Link to="/support" className="navbar__option navbar__optionHideSmall">
          <span className="navbar__optionLineOne">Support</span>
          <span className="navbar__optionLineTwo">& Help</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="navbar__optionBasket">
          <FiShoppingCart />
          {cartCount > 0 && <span className="navbar__basketCount">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
