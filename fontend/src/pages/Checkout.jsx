import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Checkout.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // FORMAT PRICE
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  // LOAD CART
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // HANDLE INPUT
  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  // 🔥 PAYMENT FUNCTION
  const handlePayment = async () => {
    if (!user) {
      toast.error("Please login first ❌");
      return;
    }

    // VALIDATION
    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.street ||
      !shipping.city ||
      !shipping.state ||
      !shipping.pincode
    ) {
      toast.error("Please fill all fields ❌");
      return;
    }

    if (shipping.phone.length !== 10) {
      toast.error("Invalid phone number ❌");
      return;
    }

    if (shipping.pincode.length !== 6) {
      toast.error("Invalid pincode ❌");
      return;
    }

    try {
      console.log("Actual Total:", totalPrice);

      // ✅ CREATE ORDER
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        {
          amount: totalPrice,
        }
      );

      if (!data.success) {
        toast.error("Order creation failed ❌");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "GadgetHub",
        description: "Order Payment",
        order_id: data.order.id,

        // ✅ SUCCESS
        handler: async function (response) {
          try {
            const verify = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cart,
                total: totalPrice,
                address: shipping,
                userId: user._id,
              }
            );

            if (verify.data.success) {
              toast.success("Payment Successful 🎉");

              // CLEAR CART
              localStorage.removeItem("cart");

              // 🔥 REDIRECT TO HOME AFTER 2 SEC
              setTimeout(() => {
                navigate("/");
              }, 2000);
            } else {
              toast.error("Payment Verification Failed ❌");
            }
          } catch (err) {
            console.error("Verify Error:", err);
            toast.error("Verification failed ❌");
          }
        },

        prefill: {
          name: shipping.fullName,
          contact: shipping.phone,
          email: user?.email,
        },

        theme: {
          color: "#2563eb",
        },

        retry: {
          enabled: false,
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

      // ❌ FAILED
      razor.on("payment.failed", function (response) {
        console.error(response.error);
        toast.error("Payment Failed ❌");
      });

    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="checkout-container">
        {/* LEFT */}
        <div className="shipping-form">
          <h2>Delivery Address 🇮🇳</h2>

          <label>Full Name</label>
          <input name="fullName" onChange={handleChange} />

          <label>Mobile Number</label>
          <input name="phone" maxLength="10" onChange={handleChange} />

          <label>House No / Street</label>
          <input name="street" onChange={handleChange} />

          <label>Area / Landmark</label>
          <input name="area" onChange={handleChange} />

          <div className="row">
            <div>
              <label>City</label>
              <input name="city" onChange={handleChange} />
            </div>

            <div>
              <label>State</label>
              <input name="state" onChange={handleChange} />
            </div>
          </div>

          <label>Pincode</label>
          <input name="pincode" maxLength="6" onChange={handleChange} />
        </div>

        {/* RIGHT */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty 🛒</p>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="summary-product">
                <img src={item.image} alt={item.name} />

                <div>
                  <p>{item.name}</p>
                  <span>Qty: {item.quantity}</span>
                </div>

                <strong>₹{formatPrice(item.price)}</strong>
              </div>
            ))
          )}

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{formatPrice(totalPrice)}</span>
          </div>

          <button onClick={handlePayment} className="pay-btn">
            Pay Now 💳
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;