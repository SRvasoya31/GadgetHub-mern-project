import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTruck, FaUndo } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./ProductDetails.css";
import defaultImage from "../assets/default-product.png";
import Footer from "../components/footer";

// SAMPLE IMAGES
import iphoneImg from "../assets/products/iphone.jpg";
import samsungImg from "../assets/products/samsung.jpg";
import ps5Img from "../assets/products/ps5.jpg";
import ps5DigitalImg from "../assets/products/ps5-digital.jpg";

const BASE_URL = "http://localhost:5000";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // ✅ IMAGE FIX FUNCTION
  const getImage = (img) => {
    if (!img) return defaultImage;

    // local images (sample)
    if (img.startsWith("http") || img.includes("assets")) {
      return img;
    }

    // API images
    return `${BASE_URL}/uploads/${img}`;
  };

  // SAMPLE DATA
  const sampleProducts = [
    {
      _id: "s1",
      name: "iPhone 15 Pro",
      category: "Mobile",
      price: 135000,
      oldPrice: 145000,
      image: iphoneImg,
      description: "Apple flagship phone",
      colors: ["red", "black", "blue"],
    },
    {
      _id: "s2",
      name: "Samsung Galaxy S24",
      category: "Mobile",
      price: 95000,
      oldPrice: 105000,
      image: samsungImg,
      description: "Samsung premium phone",
      colors: ["black", "gray"],
    },
    {
      _id: "s3",
      name: "Sony PlayStation 5",
      category: "Gaming",
      price: 55000,
      image: ps5Img,
      description: "Next-gen gaming console",
    },
    {
      _id: "s4",
      name: "PS5 Digital Edition",
      category: "Gaming",
      price: 45000,
      image: ps5DigitalImg,
      description: "Digital version of PS5",
    },
  ];

  // FETCH PRODUCTS
  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const merged = [...sampleProducts, ...(data || [])];
        setAllProducts(merged);

        const found = merged.find((p) => p._id === id);

        if (found) {
          setProduct(found);
          setSelectedImage(getImage(found.image));
        }
      })
      .catch(() => {
        setAllProducts(sampleProducts);

        const found = sampleProducts.find((p) => p._id === id);
        if (found) {
          setProduct(found);
          setSelectedImage(found.image);
        }
      });
  }, [id]);

  if (!product) {
    return <h2 style={{ padding: "50px" }}>Loading...</h2>;
  }

  // ✅ FIX IMAGES ARRAY
  const images = [product.image, ...(product.images || [])]
    .filter(Boolean)
    .map((img) => getImage(img));

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  // ADD TO CART
  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity,
      color: selectedColor || "Default",
    };

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const index = existingCart.findIndex(
      (item) =>
        item._id === cartItem._id &&
        item.color === cartItem.color
    );

    if (index > -1) {
      existingCart[index].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("storage"));

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    const orderItem = {
      ...product,
      quantity,
      color: selectedColor || "Default",
    };

    localStorage.setItem("checkoutItem", JSON.stringify(orderItem));
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      <div className="details-container">

        {/* LEFT */}
        <div className="details-left">

          <div className="thumbnail-container">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className={`thumb ${
                  selectedImage === img ? "active-thumb" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div className="main-image">
            <img src={selectedImage} alt={product.name} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="details-right">
          <p className="category">{product.category}</p>

          <h1>{product.name}</h1>

          <div className="price-row">
            <span className="new-price">
              ₹{formatPrice(product.price)}
            </span>

            {product.oldPrice && (
              <span className="old-price">
                ₹{formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="description">
            {product.description || "Premium product"}
          </p>

          {/* COLORS */}
          {product.colors && (
            <div>
              <h4>Select Color</h4>
              <div className="color-options">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className={`color-circle ${color} ${
                      selectedColor === color ? "active-color" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className="quantity-box">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          {/* BUTTONS */}
          <div className="action-buttons">
            <button
              className={`cart-btn ${added ? "added" : ""}`}
              onClick={handleAddToCart}
            >
              {added ? "Added ✓" : "🛒 Add to Cart"}
            </button>

            {/* <button className="buy-btn" onClick={handleBuyNow}>
              ⚡ Buy Now
            </button> */}
          </div>

          {/* DELIVERY */}
          <div className="delivery-box">
            <div className="delivery-item">
              <FaTruck />
              <div>
                <h4>Free Delivery</h4>
                <p>Available across India</p>
              </div>
            </div>

            <div className="delivery-item">
              <FaUndo />
              <div>
                <h4>7 Days Return</h4>
                <p>Easy return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;