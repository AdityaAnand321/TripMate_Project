import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Support Section */}
        <div className="footer-section">
          <h3>Support</h3>
          <p>Vaishali 844101, Bihar, India</p>
          <p>Email: <a href="mailto:abhishekanand7091@gmail.com">abhishekanand7091@gmail.com</a></p>
          <p>Phone: 100</p>
        </div>

        {/* Account Section */}
        <div className="footer-section">
          <h3>Account</h3>
          <ul>
            <li><a href="#">My Account</a></li>
            <li><a href="#">Cart</a></li>
            <li><a href="#">Wishlist</a></li>
            <li><a href="#">Shop</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Copyright Rimel 2022. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
