import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const expiry = localStorage.getItem("expiry");

      if (!expiry) return;

      const currentTime = new Date().getTime();

      if (currentTime > expiry) {
        localStorage.clear();
        alert("Session expired ⛔");
        navigate("/signin");
      }
    };

    const interval = setInterval(checkSession, 5000);
    return () => clearInterval(interval);
  }, [navigate]);
};

export default useAutoLogout;