import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/orders");
      setOrders(data || []);
    } catch (err) {
      console.log(err);
      setOrders([]);
    }
  };

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    setLoadingId(id);
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status });

      setOrders((prev) =>
        prev.map((o) =>
          (o._id || o.id) === id ? { ...o, status } : o
        )
      );
    } catch (err) {
      console.log(err);
    }
    setLoadingId(null);
  };

  // 📊 Dashboard calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const pending = orders.filter((o) => o.status === "Paid").length;

  return (
    <div className="orders-page">
      <h1>Admin Orders</h1>

      {/* 📊 DASHBOARD */}
      <div className="dashboard">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>

        <div className="card">
          <h3>Delivered</h3>
          <p>{delivered}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>
      </div>

      {/* 📋 TABLE */}
      <div className="orders-table">

        {/* HEADER */}
        <div className="table-head">
          <span>ID</span>
          <span>Date</span>
          <span>User</span>
          <span>Products</span>
          <span>Total</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* DATA */}
        {orders.length === 0 ? (
          <p style={{ padding: "20px" }}>No orders found</p>
        ) : (
          orders.map((order) => {
            const orderId = order?._id || "";

            return (
              <div className="table-row" key={orderId}>

                {/* ID */}
                <span className="order-id">
                  #{orderId.toString().slice(-5)}
                </span>

                {/* DATE */}
                <span>
                  {order?.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "-"}
                </span>

                {/* USER */}
                <span>
                  {order?.userId?.name || order?.userId?.email || "Guest"}
                </span>

                {/* PRODUCTS */}
                <div className="product-list">
                  {order?.items?.length > 0 ? (
                    order.items.map((item, i) => (
                      <div key={i} className="product-item">

                        <img
                          src={item.image || "https://via.placeholder.com/50"}
                          alt={item.name}
                          className="product-img"
                        />

                        <div>
                          <p>{item.name}</p>
                          <small>
                            Qty: {item.quantity} × ₹{item.price}
                          </small>
                        </div>

                      </div>
                    ))
                  ) : (
                    <span>No items</span>
                  )}
                </div>

                {/* TOTAL */}
                <span className="total">₹{order?.total || 0}</span>

                {/* STATUS */}
                <span className={`status ${order?.status?.toLowerCase()}`}>
                  {order?.status}
                </span>

                {/* ACTIONS */}
                <div className="actions">
                  <select
                    className="status-dropdown"
                    value={order?.status}
                    disabled={loadingId === orderId}
                    onChange={(e) =>
                      updateStatus(orderId, e.target.value)
                    }
                  >
                    <option>Paid</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>

                  <button
                    className="view-btn"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* 🔍 MODAL */}
      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">

            <h2>Order Details</h2>

            <p><b>ID:</b> {selectedOrder._id}</p>
            <p><b>User:</b> {selectedOrder?.userId?.name}</p>
            <p><b>Total:</b> ₹{selectedOrder.total}</p>
            <p><b>Status:</b> {selectedOrder.status}</p>

            <h3>Products</h3>
            {selectedOrder.items.map((item, i) => (
              <p key={i}>
                {item.name} — {item.quantity} × ₹{item.price}
              </p>
            ))}

            <h3>Address</h3>
            <p>{selectedOrder?.address?.addressLine}</p>
            <p>{selectedOrder?.address?.city}</p>
            <p>{selectedOrder?.address?.pincode}</p>

            <button onClick={() => setSelectedOrder(null)}>
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;