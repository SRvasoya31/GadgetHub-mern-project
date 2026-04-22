import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedProducts.css";
import ShopCard from "./ShopCard";

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  // ✅ FIX BOTH LOCAL + API IMAGES
  const fixedProducts = products.map((p) => {
    let imageUrl = "https://via.placeholder.com/200";

    if (p.image) {
      // 🔥 LOCAL IMAGE (imported)
      if (typeof p.image !== "string") {
        imageUrl = p.image;
      }
      // 🔥 API FULL URL
      else if (p.image.startsWith("http")) {
        imageUrl = p.image;
      }
      // 🔥 API FILE NAME
      else if (!p.image.includes("/")) {
        imageUrl = `http://localhost:5000/uploads/${p.image}`;
      }
      // 🔥 LOCAL STRING PATH
      else {
        imageUrl = p.image;
      }
    }

    return {
      ...p,
      image: imageUrl,
    };
  });

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>Featured Products</h2>
        <span className="view-all" onClick={() => navigate("/shop")}>
          View All →
        </span>
      </div>

      <div className="shop-grid">
        {fixedProducts.map((product) => (
          <ShopCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;