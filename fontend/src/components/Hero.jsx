import React from "react";
import "./Hero.css";
import iphone from "../assets/image1.png"; // Add your image here

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <h4>Apple iPhone 14 Series</h4>
        <h1>
          Up to 10% off <br /> Voucher
        </h1>
        <button className="shop-btn">Shop Now →</button>
      </div>

      <div className="hero-right">
        <img src={iphone} alt="iphone" />
      </div>
    </section>
  );
};

export default Hero;
