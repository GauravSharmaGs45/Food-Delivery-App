import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";   // 👈 ADD THIS

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Bringing delicious meals to your doorstep with fresh ingredients, 
            fast delivery, and unforgettable flavors. 
            Order your favorites anytime, anywhere.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91-308-4900522</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
  Copyright {new Date().getFullYear()} @ Tomato.com - All Right Reserved.
</p>
    </div>
  );
};

export default Footer;