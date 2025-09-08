import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

export default function TeacherLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/choose-role"); // go back to role selection or signin
  };

  const displayName = user?.name || "Teacher";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white shadow-md flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-indigo-600">Teacher Panel</h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard/teacher" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
            <Home size={18} /> Dashboard
          </Link>

          <Link to="/dashboard/teacher/classes" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
            <BookOpen size={18} /> Classes
          </Link>

          <Link to="/dashboard/teacher/students" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
            <Users size={18} /> Students
          </Link>

          <Link to="/dashboard/teacher/AuditLogs" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
            <User size={18} /> AuditLogs
          </Link>

          <Link to="/dashboard/teacher/settings" className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
            <Settings size={18} /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t">
          <button onClick={handleLogout} className="flex items-center gap-3 p-2 w-full text-left rounded hover:bg-red-50 text-red-600">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Slide-in Sidebar */}
      {/* overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 z-50 md:hidden flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-indigo-600">Teacher Panel</h2>
          <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard/teacher" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
            <Home size={18} /> Dashboard
          </Link>
          <Link to="/dashboard/teacher/classes" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
            <BookOpen size={18} /> Classes
          </Link>
          <Link to="/dashboard/teacher/students" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
            <Users size={18} /> Students
          </Link>
          <Link to="/dashboard/teacher/AuditLogs" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
            <User size={18} /> AuditLogs
          </Link>
          <Link to="/dashboard/teacher/settings" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-indigo-50">
            <Settings size={18} /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t">
          <button onClick={handleLogout} className="flex items-center gap-3 p-2 w-full text-left rounded hover:bg-red-50 text-red-600">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-14 bg-white shadow flex items-center justify-between px-4 md:px-6">
          {/* Hamburger (mobile) */}
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold">Teacher Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-gray-600 hidden sm:block">Welcome, <span className="font-medium">{displayName}</span></div>
          </div>
        </header>

        {/* Content area where nested pages render */}
        <section className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
