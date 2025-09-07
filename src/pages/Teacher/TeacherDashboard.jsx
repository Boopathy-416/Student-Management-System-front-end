import { useAuth } from "../../context/AuthContext";

export default function TeacherDashboard() {
  const { logout, name } = useAuth(); // 👈 destructure name from context

  return (
    <div className="flex justify-between items-center p-4 shadow bg-white">
      <h1 className="text-lg font-bold">Teacher Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-700">Welcome, {name || "Staff"}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
