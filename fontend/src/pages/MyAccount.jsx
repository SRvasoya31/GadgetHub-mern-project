import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./MyAccount.css";

const MyAccount = () => {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile Updated ✅");
  };

  return (
    <>
      <Navbar />

      <div className="account-wrapper">
        <div className="account-content">
          <h2>Edit Your Profile</h2>

          <div className="form-row">
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default MyAccount;