import React from "react";
import "./Categories.css";
import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaKeyboard,
  FaGamepad,
  FaThLarge
} from "react-icons/fa";

const Categories = ({ activeCategory, setActiveCategory }) => {

  const categoryList = [
    { name: "All", icon: <FaThLarge /> },
    { name: "Mobile", icon: <FaMobileAlt /> },
    { name: "Laptops", icon: <FaLaptop /> },
   
    { name: "Accessories", icon: <FaKeyboard /> },
    { name: "Gaming", icon: <FaGamepad /> }
  ];

  return (
    <section className="categories-section">

      <div className="category-header">
        <h2>Shop by Category</h2>
      </div>

      <div className="category-container">

        {categoryList.map((cat) => (
          <div
            key={cat.name}
            className={`category-card ${
              activeCategory === cat.name ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat.name)}
          >

            <div className="category-icon">
              {cat.icon}
            </div>

            <span className="category-name">
              {cat.name}
            </span>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Categories;