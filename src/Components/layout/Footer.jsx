import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h3 className="footer-title">TripMate</h3>
          <p className="footer-tagline">Find and book your next adventure with ease.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram" title="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter" title="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Facebook" title="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="YouTube" title="YouTube"><FaYoutube /></a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Support</h3>
            <p>Vaishali 844101, Bihar, India</p>
            <p>
              Email: <a href="mailto:adityaanand0950@gmail.com">adityaanand0950@gmail.com</a>
            </p>
            <p>Phone: 100</p>
          </div>

          <div className="footer-section">
            <h3>Account</h3>
            <ul className="footer-links">
              <li><a href="#">My Account</a></li>
              <li><a href="#">Cart</a></li>
              <li><a href="#">Wishlist</a></li>
              <li><a href="#">Shop</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Newsletter</h3>
            <p>Get travel deals and tips in your inbox.</p>
            <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" aria-label="Email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} TripMate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
