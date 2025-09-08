// src/services/api.js
import axios from "axios";
import { getAuth } from "./auth"; // you already have getAuth in auth.js

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const auth = getAuth();
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
