// src/components/Profile.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import "./profile.css";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    currency: "",
    avatar: "/avatar.jpg",
    // avatar: "https://avatar.iran.liara.run/public",
  });
  const [editForm, setEditForm] = useState({
    name: "",
    currency: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setProfileData({
        ...response.data,
        avatar: profileData.avatar,
      });
      setEditForm({
        name: response.data.name,
        currency: response.data.currency,
      });
    } catch (error) {
      toast.error("Failed to fetch profile");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/profile", editForm);
      setProfileData((prev) => ({ ...prev, ...editForm }));
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="profile">
      <h2>
        Profile : <span>{profileData.name}</span>
      </h2>
      <div className="main">
        <div className="avatar">
          <img id="avatarImage" src={profileData.avatar} alt="Avatar" />
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
            <input
              type="text"
              value={`Username: @${profileData.username}`}
              disabled
              className="username"
            />
            <div className="currency-select">
              <span>Set currency : </span>
              <select
                value={editForm.currency}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, currency: e.target.value }))
                }
                required
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="₹">INR (₹)</option>
              </select>
            </div>
            <div className="button-group">
              <button className="button save" type="submit">
                Save Changes
              </button>
              <button
                className="button cancel"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-item">
              <label>Name</label>
              <p>{profileData.name}</p>
            </div>
            <div className="info-item">
              <label>Username</label>
              <p>@{profileData.username}</p>
            </div>
            <div className="info-item" style={{ border: "none" }}>
              <label>Currency</label>
              <p>{profileData.currency}</p>
            </div>
            <button className="button edit" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
