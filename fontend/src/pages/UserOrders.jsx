import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Orders.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user?._id) fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/orders/my/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Orders API response:", data); // 🔥 DEBUG

      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="orders-container">
        <h2>📦 Your Orders</h2>

        {orders.length === 0 && <p>No orders yet</p>}

        {orders.map((order) => (
          <div key={order._id} className="order-card">

            {/* HEADER */}
            <div className="order-header">
              <div>
                <p>Order #{order._id.slice(-6)}</p>
                <small>
                  {new Date(order.createdAt).toDateString()}
                </small>
              </div>

              <span className="status">
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            {order.items.map((item, i) => (
              <div key={i} className="order-item">
                <img src={item.image} alt="" />

                <div>
                  <p>{item.name}</p>
                  <span>
                    {item.quantity} × ₹{item.price}
                  </span>
                </div>
              </div>
            ))}

            {/* ADDRESS */}
            <div style={{ marginTop: "10px", fontSize: "13px" }}>
              <b>Address:</b> {order.address?.fullName},{" "}
              {order.address?.city}
            </div>

            {/* TOTAL */}
            <div className="order-footer">
              <span>Total: ₹{order.total}</span>
            </div>

          </div>
        ))}
      </div>
    </>
  );
};

export default UserOrders;