// import axios from "axios";

// const API = axios.create({
// //   baseURL: "https://student-management-system-76kr.onrender.com/api/auth",
//     baseURL: "http://localhost:8080/api/auth",
// });

// // Teacher APIs
// export const teacherRegister = (data) => API.post("/teacher/register", data);
// export const teacherLogin = (data) => API.post("/teacher/login", data);

// // Admin APIs
// export const adminLogin = (data) => API.post("/admin/login", data);


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/auth", // change to live URL when deploy
});

// Teacher APIs
export const teacherRegister = (data) => API.post("/teacher/register", data);
export const teacherLogin = (data) => API.post("/teacher/login", data);

// Admin APIs
export const adminLogin = (data) => API.post("/admin/login", data);

// -----------------------
// LocalStorage Helpers
// -----------------------
const AUTH_KEY = "smd_user"; // unified key

// Save auth data {role, token, user}
export const setAuth = (data) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
};

// Get auth data
export const getAuth = () => {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
};

// Clear auth
export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};

// Check login
export const isLoggedIn = () => {
  const auth = getAuth();
  return auth && auth.token;
};
