import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, ResponsiveContainer
} from "recharts";
import "./dashboard.css";

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadFakeData();
  }, []);

  const loadFakeData = () => {
    // 🔥 FAKE STATS
    setStats({
      revenue: 125000,
      orders: 320,
      products: 58,
      users: 210
    });

    // 🔥 FAKE SALES DATA
    setSalesData([
      { name: "Jan", sales: 4000 },
      { name: "Feb", sales: 3000 },
      { name: "Mar", sales: 5000 },
      { name: "Apr", sales: 7000 },
      { name: "May", sales: 6000 },
      { name: "Jun", sales: 8000 }
    ]);

    // 🔥 FAKE ORDERS DATA
    setOrderData([
      { name: "Mon", orders: 20 },
      { name: "Tue", orders: 35 },
      { name: "Wed", orders: 25 },
      { name: "Thu", orders: 40 },
      { name: "Fri", orders: 30 },
      { name: "Sat", orders: 50 }
    ]);
  };

  return (
    <div className="dashboard">

      <h1>🚀 Admin Dashboard</h1>

      {/* STATS CARDS */}
      <div className="cards">

        <div className="card">
          <span className="icon">💰</span>
          <p>Total Revenue</p>
          <h2>₹{stats.revenue}</h2>
        </div>

        <div className="card">
          <span className="icon">🧾</span>
          <p>Total Orders</p>
          <h2>{stats.orders}</h2>
        </div>

        <div className="card">
          <span className="icon">📦</span>
          <p>Products</p>
          <h2>{stats.products}</h2>
        </div>

        <div className="card">
          <span className="icon">👤</span>
          <p>Users</p>
          <h2>{stats.users}</h2>
        </div>

      </div>

      {/* CHARTS */}
      <div className="charts">

        <div className="chart-box">
          <h3>📊 Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>📈 Weekly Orders</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={orderData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;