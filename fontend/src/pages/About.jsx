import React from "react";
import Navbar from "../components/Navbar";
import "./About.css";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="about-container">

        {/* HERO */}

        <div className="about-hero">
          <h1>About GadgetHub</h1>
          <p>Your one-stop destination for the latest gadgets & tech products 🚀</p>
        </div>

        {/* SECTION 1 */}

        <div className="about-section">

          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              GadgetHub is an innovative ecommerce platform dedicated to bringing
              you the latest and most reliable tech products. From smartphones
              to accessories, we ensure high-quality products at the best prices.
            </p>
          </div>

          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475" />

          </div>

        </div>

        {/* SECTION 2 */}

        <div className="about-section reverse">

          <div className="about-image">
           <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" />
          </div>

          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              Our mission is to make technology accessible and affordable for
              everyone. We aim to deliver a seamless shopping experience with
              fast delivery, secure payments, and excellent customer support.
            </p>
          </div>

        </div>

        {/* FEATURES */}

        <div className="about-features">

          <div className="feature">
            <h3>⚡ Fast Delivery</h3>
            <p>Get your orders delivered quickly and safely.</p>
          </div>

          <div className="feature">
            <h3>💳 Secure Payment</h3>
            <p>Multiple secure payment options available.</p>
          </div>

          <div className="feature">
            <h3>⭐ Quality Products</h3>
            <p>Only top-quality verified products.</p>
          </div>

        </div>

      </div>
    </>
  );
};

export default About;