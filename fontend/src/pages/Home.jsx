import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/footer";
import "./Home.css";

// ✅ LOCAL IMAGES
import iphoneImg from "../assets/products/iphone.jpg";
import samsungImg from "../assets/products/samsung.jpg";
import ps5Img from "../assets/products/ps5.jpg";
import ps5DigitalImg from "../assets/products/ps5-digital.jpg";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // 🔥 SAMPLE DATA (FULL STRUCTURE)
  const sampleProducts = [
    {
      _id: "s1",
      name: "iPhone 15 Pro",
      category: "Mobile",
      price: 135000,
      oldPrice: 145000,
      discount: "7%",
      bestseller: true,
      stock: 10,
      image: iphoneImg,
    },
    {
      _id: "s2",
      name: "Samsung Galaxy S24",
      category: "Mobile",
      price: 95000,
      oldPrice: 105000,
      discount: "10%",
      bestseller: false,
      stock: 15,
      image: samsungImg,
    },
    {
      _id: "s3",
      name: "Sony PlayStation 5",
      category: "Gaming",
      price: 55000,
      oldPrice: 60000,
      discount: "8%",
      bestseller: true,
      stock: 5,
      image: ps5Img,
    },
    {
      _id: "s4",
      name: "PS5 Digital Edition",
      category: "Gaming",
      price: 45000,
      oldPrice: 50000,
      discount: "10%",
      bestseller: false,
      stock: 8,
      image: ps5DigitalImg,
    },
  ];

  // ✅ SHOW SAMPLE FIRST
  const [products, setProducts] = useState(sampleProducts);

  // 🔥 FETCH API → ADD AFTER SAMPLE
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);

        if (data && data.length > 0) {
          // ✅ MERGE + REMOVE DUPLICATES
          const merged = [...sampleProducts, ...data].filter(
            (item, index, self) =>
              index === self.findIndex((p) => p.name === item.name)
          );

          setProducts(merged);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  // 🔥 FILTER
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />

      <Hero />

      {/* FEATURES */}
      <section className="home-features">
        <div className="home-feature">
          <div className="icon">🚚</div>
          <h3>Free Delivery</h3>
          <p>On orders above ₹999</p>
        </div>

        <div className="home-feature">
          <div className="icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>Razorpay protected</p>
        </div>

        <div className="home-feature">
          <div className="icon">⚡</div>
          <h3>Fast Processing</h3>
          <p>Ships within 24 hours</p>
        </div>
      </section>

      {/* CATEGORY */}
      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* PRODUCTS */}
      <FeaturedProducts products={filteredProducts} />

      <Footer />
    </>
  );
};

export default Home;