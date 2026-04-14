import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Profile.css";

const Profile = () => {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser) {
      setUser({ ...user, ...savedUser });
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {

    if (user.newPassword && user.newPassword !== user.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    const updatedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile Updated Successfully ✅");
  };

  return (
    <>
      <Navbar />

     <div className="profile-container">

  <h2>👤 My Profile</h2>

  <div className="profile-card">

    <h3>Personal Information</h3>

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

    <h3 className="section-title">🔐 Change Password</h3>

    <input
      type="password"
      name="currentPassword"
      value={user.currentPassword}
      onChange={handleChange}
      placeholder="Current Password"
    />

    <input
      type="password"
      name="newPassword"
      value={user.newPassword}
      onChange={handleChange}
      placeholder="New Password"
    />

    <input
      type="password"
      name="confirmPassword"
      value={user.confirmPassword}
      onChange={handleChange}
      placeholder="Confirm Password"
    />

    <div className="profile-buttons">
      <button className="cancel-btn">Cancel</button>
      <button className="save-btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>

  </div>
</div>
    </>
  );
};

export default Profile;