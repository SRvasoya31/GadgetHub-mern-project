import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  // Update cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    // Close dropdown on outside click
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        <Link to="/" className="logo-text">
          Gadget<span>Hub</span>
        </Link>
      </div>

      {/* LINKS */}
      <ul className="nav-links">
        <li>
          <Link className={isActive("/") ? "active" : ""} to="/">Home</Link>
        </li>
        <li>
          <Link className={isActive("/shop") ? "active" : ""} to="/shop">Shop</Link>
        </li>
        <li>
          <Link className={isActive("/contact") ? "active" : ""} to="/contact">Contact</Link>
        </li>
        <li>
          <Link className={isActive("/about") ? "active" : ""} to="/about">About</Link>
        </li>

         <li>
          <Link className={isActive("/orders") ? "active" : ""} to="/orders">Orders</Link>
        </li>
      </ul>

      {/* ICONS */}
      <div className="nav-icons-1">

        {/* Wishlist */}
        <FaHeart className="icon" />

        {/* Cart */}
        <Link to="/cart" className="cart-wrapper">
          <FaShoppingCart className="icon" />

          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </Link>

        {/* User */}
        <div className="user-wrapper">

          <FaUser
            className="icon"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          />

          {showMenu && (
            <div className="user-dropdown">

              {user ? (
                <>
                  <p onClick={() => navigate("/account")}>My Profile</p>
                  <p onClick={handleLogout}>Logout</p>
                </>
              ) : (
                <p onClick={() => navigate("/signin")}>Login</p>
              )}

            </div>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;