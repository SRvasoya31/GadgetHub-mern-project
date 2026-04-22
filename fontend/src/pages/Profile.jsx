import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Profile.css";
import axios from "axios";

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

  const token = localStorage.getItem("token");

  // =========================
  // ✅ LOAD PROFILE
  // =========================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("TOKEN:", token); // DEBUG

        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}` // ✅ FIX
            }
          }
        );

        setUser((prev) => ({
          ...prev,
          ...res.data
        }));

      } catch (err) {
        console.log(err.response?.data);
      }
    };

    fetchUser();
  }, [token]);

  // =========================
  // INPUT HANDLER
  // =========================
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // SAVE PROFILE + PASSWORD
  // =========================
  const handleSave = async () => {
    try {
      if (!token) {
        alert("Please login first ❌");
        return;
      }

      // 🔴 PASSWORD CHECK
      if (user.newPassword && user.newPassword !== user.confirmPassword) {
        alert("Passwords do not match ❌");
        return;
      }

      // =========================
      // UPDATE PROFILE
      // =========================
      await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // ✅ FIX
          }
        }
      );

      // =========================
      // CHANGE PASSWORD
      // =========================
      if (user.currentPassword && user.newPassword) {
        await axios.put(
          "http://localhost:5000/api/users/change-password",
          {
            currentPassword: user.currentPassword,
            newPassword: user.newPassword
          },
          {
            headers: {
              Authorization: `Bearer ${token}` // ✅ FIX
            }
          }
        );
      }

      alert("Profile Updated Successfully ✅");

      // 🔥 clear password fields
      setUser((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong ❌");
    }
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