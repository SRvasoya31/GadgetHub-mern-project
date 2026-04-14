import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className="notfound-container">

        <div className="breadcrumb">
          Home &gt; 404 Error
        </div>

        <h1>404 Not Found</h1>

        <p>
          Your visited page not found. You may go home page.
        </p>

        <Link to="/" className="home-btn">
          Back to home page
        </Link>

      </div>
    </>
  );
};

export default NotFound;
