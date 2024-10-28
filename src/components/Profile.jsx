// src/components/Profile.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";

function Profile() {
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [avatar, setAvatar] = useState("https://placehold.co/150x150");

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (file && file.size <= maxSize) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image under 2MB.");
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setName(response.data.name);
      setCurrency(response.data.currency);
    } catch (error) {
      toast.error("Failed to fetch profile");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/profile", { name, currency });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div
        className="avatar"
        onClick={() => document.getElementById("fileInput").click()}
        style={{ cursor: "pointer" }}
      >
        <img id="avatarImage" src={avatar} alt="Avatar" />
        <div>
          Add photo
          <br />
          <i className="fa-solid fa-camera"></i>
        </div>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
