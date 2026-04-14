import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, ResponsiveContainer
} from "recharts";
import "./admin.css";

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    users: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dashboard");
      const data = await res.json();

      setSalesData(data.salesData || []);
      setOrderData(data.orderData || []);
      setStats(data.stats || {});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* CARDS */}
      <div className="cards">
        <div className="card">
          <p>Total Revenue</p>
          <h2>₹{stats.revenue}</h2>
        </div>

        <div className="card">
          <p>Total Orders</p>
          <h2>{stats.orders}</h2>
        </div>

        <div className="card">
          <p>Total Products</p>
          <h2>{stats.products}</h2>
        </div>

        <div className="card">
          <p>Total Users</p>
          <h2>{stats.users}</h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts">

        <div className="chart-box">
          <h3>Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Orders Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={orderData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;