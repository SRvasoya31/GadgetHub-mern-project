import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("expiry");

  if (!token || !expiry) return <Navigate to="/signin" />;

  if (new Date().getTime() > expiry) {
    localStorage.clear();
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;