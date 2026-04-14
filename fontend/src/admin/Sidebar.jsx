import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/signin";
  };

  return (
    <div className="sidebar">

      <div>
        {/* LOGO */}
        <h2 className="logo">
          GadgetHub <span>Admin</span>
        </h2>

        {/* MENU */}
        <ul>

          <li className={location.pathname === "/admin" ? "active" : ""}>
            <Link to="/admin">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          <li className={isActive("/admin/products") ? "active" : ""}>
            <Link to="/admin/products">
              <FaBox /> Products
            </Link>
          </li>

          <li className={isActive("/admin/orders") ? "active" : ""}>
            <Link to="/admin/orders">
              <FaShoppingCart /> Orders
            </Link>
          </li>

          <li className={isActive("/admin/users") ? "active" : ""}>
            <Link to="/admin/users">
              <FaUsers /> Users
            </Link>
          </li>

        </ul>
      </div>

      {/* LOGOUT */}
      <div className="logout" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </div>

    </div>
  );
};

export default Sidebar;