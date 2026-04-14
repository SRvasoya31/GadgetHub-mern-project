import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        const expiryTime = new Date().getTime() + 20 * 60 * 1000; // 20 min

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("expiry", expiryTime);

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Invalid credentials");
      }

    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">

      <h1 className="logo">
        Gadget<span>Hub</span>
      </h1>

      <h2>Welcome back</h2>
      <p className="subtitle">Sign in to your account</p>

      <div className="auth-box">

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

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

          <button type="submit">
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <p className="bottom-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>

      </div>

    </div>
  );
};

export default SignIn;