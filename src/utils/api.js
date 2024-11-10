// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://logger-backend-u4p0.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor with logging
api.interceptors.request.use(
  (config) => {
    console.log("Request being sent:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor with logging
api.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default api;
