import React from "react";
import "../styles/navBar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/shopVerse logo.png" alt="ShopVerse Logo" className="navbar-logo" style={{ height: '36px', width: '36px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.35))' }}/>
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;