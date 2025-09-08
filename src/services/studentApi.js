import api from "./api"; // your axios instance with token handling

// Get students with search/filter/pagination
export const fetchStudents = async ({ page = 1, limit = 10, name = "", className = "" }) => {
  const params = { page, limit };
  if (name) params.name = name;
  if (className) params.class = className;

  const res = await api.get("/students", { params });
  return res.data;
};

// Get statistics (total, per class, gender ratio)
export const fetchStudentStats = async () => {
  const res = await api.get("/students/stats");
  return res.data;
};


// fetch logs from backend
export const fetchAuditLogs = async () => {
  const res = await api.get("/audit-logs");
  return res.data;
};
