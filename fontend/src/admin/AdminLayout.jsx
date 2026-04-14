import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-content">
        <Outlet />   {/* 🔥 VERY IMPORTANT */}
      </div>
    </div>
  );
};

export default AdminLayout;