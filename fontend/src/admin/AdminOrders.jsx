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

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/orders");
      setOrders(data || []);
    } catch (err) {
      console.log(err);
      setOrders([]);
    }
  };

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

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const pending = orders.filter((o) => o.status === "Paid").length;

  return (
    <div className="orders-page">

      <h1>Admin Orders</h1>

      {/* DASHBOARD */}
      <div className="dashboard-orders">
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

      <div className="orders-container-1">

        {/* TABLE */}
        <div className="orders-table">

          <div className="table-head-1">
            <div>ID</div>
            <div>Date</div>
            <div>User</div>
            <div>Products</div>
            <div>Total</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {orders.length === 0 ? (
            <p style={{ padding: "20px" }}>No orders found</p>
          ) : (
            orders.map((order) => {
              const orderId = order?._id || "";

              return (
                <div className="table-row-1" key={orderId}>

                  <div className="order-id">
                    #{orderId.slice(-5)}
                  </div>

                  <div>
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "-"}
                  </div>

                  <div>
                    {order?.userId?.name || "Guest"}
                  </div>

                  <div className="product-list">
                    {order?.items?.map((item, i) => (
                      <div key={i} className="product-item">
                        <img
                          src={item.image || "https://via.placeholder.com/50"}
                          className="product-img"
                          alt=""
                        />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="total">₹{order.total}</div>

                  <div className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </div>

                  <div className="actions">
                    <select
                      className="status-dropdown"
                      value={order.status}
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
      </div>

      {/* ================= MODAL ================= */}
      {selectedOrder && (
        <div className="modal-3" onClick={() => setSelectedOrder(null)}>
          <div
            className="modal-content-3"
            onClick={(e) => e.stopPropagation()}
          >

            <h2 className="h2">🧾 Order Details</h2>

            <p className="h2"><b>ID:</b> {selectedOrder._id}</p>
            <p className="h2"><b>User:</b> {selectedOrder?.userId?.name}</p>
            <p className="h2"><b>Total:</b> ₹{selectedOrder.total}</p>

            <div className={`status ${selectedOrder.status.toLowerCase()}`}>
              {selectedOrder.status}
            </div>

            {/* ADDRESS */}
            <h3 style={{ marginTop: "15px" }}>📍 Delivery Address</h3>

            <div className="address-box">
              <p className="h2"><b>Full Name:</b> {selectedOrder?.address?.fullName || "-"}</p>
              <p className="h2"><b>Mobile:</b> {selectedOrder?.address?.phone || "-"}</p>
              <p className="h2"><b>House / Street:</b> {selectedOrder?.address?.street || "-"}</p>
              <p className="h2"><b>Area:</b> {selectedOrder?.address?.area || "-"}</p>
              <p className="h2"><b>City:</b> {selectedOrder?.address?.city || "-"}</p>
              <p className="h2"><b>State:</b> {selectedOrder?.address?.state || "-"}</p>
              <p className="h2"><b>Pincode:</b> {selectedOrder?.address?.pincode || "-"}</p>
            </div>

            {/* PRODUCTS */}
            <h3 style={{ marginTop: "15px" }}>Products</h3>

            <div className="products-list">
              {selectedOrder?.items?.map((item, i) => (
                <div key={i} className="product-item">
                  <span>{item.name}</span>
                  <span>{item.quantity} × ₹{item.price}</span>
                </div>
              ))}
            </div>

            <button
              className="close-btn"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrders;