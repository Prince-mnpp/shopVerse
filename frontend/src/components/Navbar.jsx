import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <link rel="stylesheet" href="/">
          <img src="/logo.png" alt="ShopNest Logo" className="navbar-logo" />
        </link>
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