import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopCard.css";
// import defaultImage from "../assets/default-product.png";

const ShopCard = ({ product }) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="shop-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* BADGES */}
      {product.discount && (
        <span className="badge">-{product.discount}%</span>
      )}
      {product.bestseller && (
        <span className="best">BESTSELLER</span>
      )}

      {/* IMAGE */}
      <img
        src={product.image || defaultImage}
        alt={product.name}
      />

      {/* INFO */}
      <p className="category">{product.category}</p>

      <h3>{product.name}</h3>

      <div className="price">
        ₹{formatPrice(product.price)}

        {product.oldPrice && (
          <span className="old-price">
            ₹{formatPrice(product.oldPrice)}
          </span>
        )}
      </div>

     

      <button onClick={handleAddToCart}>
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ShopCard;