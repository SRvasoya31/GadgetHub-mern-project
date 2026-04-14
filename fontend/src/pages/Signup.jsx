import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "user"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account Created ✅");
        navigate("/signin");
      } else {
        setError(data.message || "Signup Failed ❌");
      }

    } catch (error) {
      setError("Server Error ❌");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">

      <h1 className="logo">
        Gadget<span>Hub</span>
      </h1>

      <h2>Create Account</h2>
      <p className="subtitle">Sign up to get started</p>

      <div className="auth-box">

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="9876543210"
            onChange={handleChange}
            required
          />

          <button type="submit">
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        <p className="bottom-text">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>

      </div>

    </div>
  );
};

export default Signup;