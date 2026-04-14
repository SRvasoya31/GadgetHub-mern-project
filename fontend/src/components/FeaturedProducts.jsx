// import React, { useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import "./FeaturedProducts.css";
// import ShopCard from "./ShopCard";

// const FeaturedProducts = ({ products }) => {
//   const navigate = useNavigate();

//   const memoProducts = useMemo(() => products, [products]);

//   if (!memoProducts || memoProducts.length === 0) {
//     return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
//   }

//   return (
//     <section className="featured-section">
//       <div className="featured-header">
//         <h2>Featured Products</h2>
//         <span className="view-all" onClick={() => navigate("/shop")}>
//           View All →
//         </span>
//       </div>

//       <div className="shop-grid">
//         {memoProducts.map((product) => (
//           <ShopCard key={product._id} product={product} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedProducts.css";
import ShopCard from "./ShopCard";

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>Featured Products</h2>
        <span className="view-all" onClick={() => navigate("/shop")}>
          View All →
        </span>
      </div>

      <div className="shop-grid">
        {products.map((product) => (
          <ShopCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;