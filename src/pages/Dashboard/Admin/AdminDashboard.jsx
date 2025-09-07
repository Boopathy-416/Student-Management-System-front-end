import { useAuth } from "../../../context/AuthContext";

export default function AdminDashboard() {
  const { logout } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
