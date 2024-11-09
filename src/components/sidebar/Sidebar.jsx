import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import api from "../../utils/api";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setIsOpen(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setName(response.data.name);
    } catch (error) {
      console.log("Failed to fetch profile:\n", error);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="site-title">
          <h2>Expense Tracker</h2>
        </div>
        <div className="display-name">
          Hello, <span>{name || "{error getting name}"}</span>
        </div>
        <nav>
          <Link to="/dashboard" onClick={toggleMenu}>
            Dashboard
          </Link>
          <Link to="/profile" onClick={toggleMenu}>
            Profile
          </Link>
        </nav>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}

export default Sidebar;
