import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import ShopCard from "../components/ShopCard";
import "../components/ShopCard.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <>
      <Navbar />

      <div className="shop-container">
        <h1>All Products</h1>

        {/* FILTER */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Mobile</option>
            <option>Laptop</option>
            <option>Accessories</option>
          </select>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="shop-grid">
            {filteredProducts.map((product) => (
              <ShopCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;