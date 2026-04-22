import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import ShopCard from "../components/ShopCard";
import Footer from "../components/footer";
import "../components/ShopCard.css";

// ✅ LOCAL IMAGES
import iphoneImg from "../assets/products/iphone.jpg";
import samsungImg from "../assets/products/samsung.jpg";
import ps5Img from "../assets/products/ps5.jpg";
import ps5DigitalImg from "../assets/products/ps5-digital.jpg";

const Shop = () => {

  // 🔥 SAMPLE PRODUCTS
  const sampleProducts = [
    {
      _id: "s1",
      name: "iPhone 15 Pro",
      category: "Mobile",
      price: 135000,
      image: iphoneImg,
    },
    {
      _id: "s2",
      name: "Samsung Galaxy S24",
      category: "Mobile",
      price: 95000,
      image: samsungImg,
    },
    {
      _id: "s3",
      name: "PS5",
      category: "Gaming",
      price: 55000,
      image: ps5Img,
    },
    {
      _id: "s4",
      name: "PS5 Digital",
      category: "Gaming",
      price: 45000,
      image: ps5DigitalImg,
    },
  ];

  // ✅ STATE
  const [products, setProducts] = useState(sampleProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");

        console.log("API DATA:", res.data);

        // ✅ FIX IMAGE URL
        const apiProducts = (res.data || []).map((p) => ({
          ...p,
          image: p.image
            ? p.image.startsWith("http")
              ? p.image
              : `http://localhost:5000/uploads/${p.image}`
            : "https://via.placeholder.com/200",
        }));

        // ✅ REMOVE DUPLICATE BY _id (BETTER THAN name)
        const merged = [...sampleProducts, ...apiProducts].filter(
          (item, index, self) =>
            index === self.findIndex((p) => p._id === item._id)
        );

        setProducts(merged);

      } catch (error) {
        console.log("API ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 FILTER
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      product.category?.toLowerCase() === category.toLowerCase();

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
            <option>Laptops</option>
            <option>Accessories</option>
            <option>Gaming</option>
          </select>
        </div>

        {/* LOADING */}
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="shop-grid">

            {filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              filteredProducts.map((product) => (
                <ShopCard key={product._id} product={product} />
              ))
            )}

          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Shop;