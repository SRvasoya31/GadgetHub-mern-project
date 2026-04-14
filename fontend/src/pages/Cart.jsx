import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  // LOAD CART
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // UPDATE CART
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  // INCREASE
  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].quantity += 1;
    updateCart(updated);
  };

  // DECREASE
  const decreaseQty = (index) => {
    const updated = [...cart];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      updateCart(updated);
    }
  };

  // REMOVE
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    updateCart(updated);
  };

  // TOTAL
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>

        {/* ✅ EMPTY CART */}
        {cart.length === 0 ? (
          <div className="empty-cart">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="empty"
              className="empty-img"
            />
            <h3>Your cart is empty</h3>
            <p>Add some products to get started</p>

            <button
              className="browse-btn"
              onClick={() => navigate("/shop")}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="cart-layout">

            {/* LEFT */}
            <div className="cart-items">

              {cart.map((item, index) => (
                <div className="cart-card" key={index}>

                  <div className="cart-left">
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `http://localhost:5000/uploads/${item.image}`
                      }
                      alt=""
                    />

                    <div className="cart-info">
                      <h4>{item.name}</h4>
                      <p>{item.category}</p>
                      <strong>
                        ₹{formatPrice(item.price)}
                      </strong>
                    </div>
                  </div>

                  {/* QTY */}
                  <div className="qty-box">
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                  </div>

                  {/* REMOVE */}
                  <span
                    className="remove-icon"
                    onClick={() => removeItem(index)}
                  >
                    🗑
                  </span>
                </div>
              ))}

            </div>

            {/* RIGHT SUMMARY */}
            <div className="cart-summary">

              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Items ({cart.length})</span>
                <span>₹{formatPrice(totalPrice)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span style={{ color: "green" }}>Free</span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <span>₹{formatPrice(totalPrice)}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout →
              </button>

            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default Cart;