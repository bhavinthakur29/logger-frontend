import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import "./auth.css";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passVisible, setPassVisible] = useState(true);
  const [strength, setStrength] = useState({
    lowercase: false,
    uppercase: false,
    specialChar: false,
    minLength: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", { username, password, name });
      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  const handlePassVisibility = () => {
    setPassVisible((prev) => !prev);
  };

  const checkStrength = (password) => {
    setStrength({
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      minLength: password.length >= 8,
    });
  };

  const strengthCount = Object.values(strength).filter(Boolean).length;

  const getProgressColor = () => {
    if (strengthCount <= 1) return "red";
    if (strengthCount === 2) return "orange";
    if (strengthCount === 3) return "yellow";
    if (strengthCount === 4) return "green";
    return "grey";
  };

  const strengthText = () => {
    if (strengthCount === 4) return "Strong";
    if (strengthCount === 3) return "Medium";
    return "Weak";
  };

  const isPasswordStrong = strengthCount === 4;

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className="password">
          <input
            type={passVisible ? "password" : "text"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkStrength(e.target.value);
            }}
            required
          />
          <i
            onClick={handlePassVisibility}
            className={
              passVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
            }
          ></i>
        </div>
        <div className="password-strength">
          <p>Password Strength: {strengthText()}</p>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${strengthCount * 25}%`,
                backgroundColor: getProgressColor(),
              }}
            ></div>
          </div>
          <ul className="password-strength-items">
            <li className={strength.lowercase ? "valid" : "invalid"}>
              <i
                className={
                  strength.lowercase
                    ? "fas fa-check-circle"
                    : "fas fa-times-circle"
                }
              ></i>
              &nbsp;1 Lowercase
            </li>
            <li className={strength.uppercase ? "valid" : "invalid"}>
              <i
                className={
                  strength.uppercase
                    ? "fas fa-check-circle"
                    : "fas fa-times-circle"
                }
              ></i>
              &nbsp;1 Uppercase
            </li>
            <li className={strength.specialChar ? "valid" : "invalid"}>
              <i
                className={
                  strength.specialChar
                    ? "fas fa-check-circle"
                    : "fas fa-times-circle"
                }
              ></i>
              &nbsp;Special Character
            </li>
            <li className={strength.minLength ? "valid" : "invalid"}>
              <i
                className={
                  strength.minLength
                    ? "fas fa-check-circle"
                    : "fas fa-times-circle"
                }
              ></i>
              &nbsp;At least 8 Characters
            </li>
          </ul>
        </div>
        <button type="submit" disabled={!isPasswordStrong}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
