import React, { useEffect, useState } from "react";
import { FaUserSlash, FaUserCheck, FaTrash } from "react-icons/fa";
import "./Users.css";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // 🔍 FILTER USERS
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 PAGINATION
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // 🔄 TOGGLE STATUS
  const toggleStatus = async (id) => {
    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "PUT"
    });

    const updated = await res.json();

    setUsers(users.map(u => u._id === id ? updated : u));

    showToast("User status updated");
  };

  // ❌ DELETE
  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;

    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE"
    });

    setUsers(users.filter(u => u._id !== id));

    showToast("User deleted");
  };

  // 🔔 TOAST
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="users-page">

      <h1>Users</h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search users..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="users-table">

        {/* HEADER */}
        <div className="table-head">
          <span>User</span>
          <span>Status</span>
          <span>Action</span>
          <span>Delete</span>
        </div>

        {/* USERS */}
        {currentUsers.map(user => (
          <div className="table-row" key={user._id}>

            <div>
              <span>{user.username}</span>
              <span className="email">{user.email}</span>
            </div>

            <span className={`status ${user.status}`}>
              {user.status}
            </span>

            <div className="actions">
              {user.status === "active" ? (
                <FaUserSlash
                  className="icon block"
                  onClick={() => toggleStatus(user._id)}
                />
              ) : (
                <FaUserCheck
                  className="icon unblock"
                  onClick={() => toggleStatus(user._id)}
                />
              )}
            </div>

            <div className="actions">
              <FaTrash
                className="icon delete"
                onClick={() => deleteUser(user._id)}
              />
            </div>

          </div>
        ))}

      </div>

      {/* 📄 PAGINATION */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 🔔 TOAST */}
      {toast && <div className="toast">{toast}</div>}

    </div>
  );
};

export default Users;