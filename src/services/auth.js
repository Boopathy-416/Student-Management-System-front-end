import axios from "axios";

const API = axios.create({
//   baseURL: "https://student-management-system-76kr.onrender.com/api/auth",
    baseURL: "http://localhost:8080/api/auth",
});

// Teacher APIs
export const teacherRegister = (data) => API.post("/teacher/register", data);
export const teacherLogin = (data) => API.post("/teacher/login", data);

// Admin APIs
export const adminLogin = (data) => API.post("/admin/login", data);
