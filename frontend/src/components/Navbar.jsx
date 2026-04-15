import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiChevronDown, FiMapPin, FiPackage, FiHeart, FiHelpCircle, FiLogOut, FiBookOpen, FiUser } from 'react-icons/fi';
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
  const [location, setLocation] = useState({ city: '', pincode: '' });
  const menuRef = useRef(null);

  const cartCount = cartItems.reduce((a, i) => a + i.quantity, 0);

  // Auto-detect location on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`);
          const data = await res.json();
          setLocation({ city: data.city || data.locality || 'India', pincode: data.postcode || '' });
        } catch { setLocation({ city: 'India', pincode: '' }); }
      }, () => setLocation({ city: 'India', pincode: '' }));
    }
  }, []);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (category) params.append('category', category);
    navigate(`/?${params.toString()}`);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="navbar__brand">
          <svg viewBox="0 0 602 182" className="navbar__logo" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M373.642 141.938c-34.999 26.862-85.763 41.152-129.476 41.152-61.294 0-116.499-22.686-158.243-60.401-3.278-2.965-.341-7.005 3.594-4.702 45.071 26.229 100.795 42.008 158.369 42.008 38.833 0 81.544-8.045 120.871-24.706 5.932-2.521 10.905 3.896 5.885 6.649z"/>
            <path d="M387.865 125.937c-4.474-5.728-29.58-2.714-40.835-1.367-3.43.417-3.957-2.573-.864-4.729 20.003-14.065 52.822-10.001 56.63-5.291 3.81 4.729-.998 37.544-19.788 53.197-2.886 2.403-5.64 1.123-4.361-2.062 4.229-10.573 13.693-34.013 9.218-39.748z"/>
            <path d="M348.084 23.134V7.157c0-2.425 1.843-4.04 4.056-4.04h71.775c2.306 0 4.15 1.652 4.15 4.04v13.678c-.038 2.3-1.957 5.31-5.387 9.999l-37.206 53.117c13.826-.339 28.428 1.723 40.949 8.808 2.822 1.6 3.588 3.95 3.803 6.267v17.067c0 2.349-2.59 5.092-5.31 3.671-22.177-11.623-51.629-12.888-76.14.133-2.5 1.345-5.12-1.356-5.12-3.706V99.45c0-2.634.038-7.127 2.67-11.128l43.117-61.82h-37.49c-2.307 0-4.15-1.614-4.15-4.003l-.717.635z"/>
          </svg>
          <span className="navbar__brandIn">.in</span>
        </Link>

        {/* Location */}
        <div className="navbar__location" onClick={() => navigate('/addresses')}>
          <FiMapPin className="navbar__locIcon" />
          <div>
            <span className="navbar__locLine1">Deliver to {user?.name?.split(' ')[0] || ''}</span>
            <span className="navbar__locLine2">{location.city || 'Update location'} {location.pincode}</span>
          </div>
        </div>

        {/* Search */}
        <form className="navbar__search" onSubmit={handleSearch}>
          <select className="navbar__searchCategory" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </select>
          <input type="text" className="navbar__searchInput" placeholder="Search products, brands and more..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button type="submit" className="navbar__searchIcon"><FiSearch /></button>
        </form>

        {/* Right */}
        <div className="navbar__right">
          <div className="navbar__userMenu" ref={menuRef}>
            <button className="navbar__option" onClick={() => setUserMenuOpen(v => !v)}>
              <span className="navbar__optionLineOne">Hello, {user?.name?.split(' ')[0] || 'Sign in'}</span>
              <span className="navbar__optionLineTwo">Account & Lists <FiChevronDown size={11} /></span>
            </button>
            {userMenuOpen && (
              <div className="navbar__dropdown">
                {user ? (<>
                  <div className="navbar__dropdownHeader"><strong>{user.name}</strong><span>{user.email}</span></div>
                  <Link to="/orders" className="navbar__dropdownItem" onClick={() => setUserMenuOpen(false)}><FiPackage /> Your Orders</Link>
                  <Link to="/addresses" className="navbar__dropdownItem" onClick={() => setUserMenuOpen(false)}><FiMapPin /> Address Book</Link>
                  <Link to="/wishlist" className="navbar__dropdownItem" onClick={() => setUserMenuOpen(false)}><FiHeart /> Wishlist {wishlistItems.length > 0 && <span className="navbar__dropdownBadge">{wishlistItems.length}</span>}</Link>
                  <Link to="/support" className="navbar__dropdownItem" onClick={() => setUserMenuOpen(false)}><FiHelpCircle /> Help & Support</Link>
                  <button className="navbar__dropdownItem navbar__dropdownSignout" onClick={() => { logout(); setUserMenuOpen(false); }}><FiLogOut /> Sign Out</button>
                </>) : (<>
                  <Link to="/login" className="navbar__dropdownSignin" onClick={() => setUserMenuOpen(false)}>Sign In</Link>
                  <p className="navbar__dropdownNew">New customer? <Link to="/login">Start here.</Link></p>
                </>)}
              </div>
            )}
          </div>

          <Link to="/orders" className="navbar__option navbar__hideSmall">
            <span className="navbar__optionLineOne">Returns</span>
            <span className="navbar__optionLineTwo">& Orders</span>
          </Link>

          <Link to="/cart" className="navbar__optionBasket">
            <FiShoppingCart />
            {cartCount > 0 && <span className="navbar__basketCount">{cartCount}</span>}
            <span className="navbar__cartText">Cart</span>
          </Link>
        </div>
      </nav>

      {/* Sub Navbar */}
      <div className="subNavbar">
        <div className="subNavbar__items">
          <Link to="/" className="subNavbar__item">All</Link>
          <Link to="/?category=Electronics" className="subNavbar__item">Electronics</Link>
          <Link to="/?category=Fashion" className="subNavbar__item">Fashion</Link>
          <Link to="/?category=Books" className="subNavbar__item">Books</Link>
          <Link to="/?category=Home%20%26%20Kitchen" className="subNavbar__item">Home & Kitchen</Link>
          <span className="subNavbar__item">Amazon Pay</span>
          <span className="subNavbar__item">Gift Ideas</span>
          <span className="subNavbar__item">Amazon Basics</span>
          <span className="subNavbar__item">Prime</span>
          <span className="subNavbar__item">Today's Deals</span>
          <span className="subNavbar__item">New Releases</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
