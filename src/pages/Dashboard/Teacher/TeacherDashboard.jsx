import { useAuth } from "../../../context/AuthContext";

export default function TeacherDashboard() {
  const { logout } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h2>Teacher Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
