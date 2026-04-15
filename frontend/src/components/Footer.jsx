import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__backToTop" onClick={() => window.scrollTo(0, 0)}>
        Back to top
      </div>
      <div className="footer__links">
        <div className="footer__linkCol">
          <h3>Get to Know Us</h3>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Us</li>
          </ul>
        </div>
        <div className="footer__linkCol">
          <h3>Make Money with Us</h3>
          <ul>
            <li>Sell products on AmazonClone</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
          </ul>
        </div>
        <div className="footer__linkCol">
          <h3>Let Us Help You</h3>
          <ul>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2026 AmazonClone. Educational purposes only.</p>
      </div>
    </footer>
  );
};

export default Footer;
