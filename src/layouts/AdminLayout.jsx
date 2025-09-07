import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { LogOut, Settings, Users, BarChart, Menu, X, FileSpreadsheet, FileEdit } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
const { logout } = useAuth();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 bg-white shadow-md flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <Link to="/dashboard/admin" className="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
            <BarChart size={18} /> Dashboard
          </Link>
          <Link to="/dashboard/admin/import-export" className="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
             <FileSpreadsheet size={18} /> Excel Import / Export
          </Link>
          <Link to="/dashboard/admin/edit-students" className="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
            <FileEdit size={18} /> File Edit
          </Link>
          <Link to="/dashboard/admin/settings" className="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
            <Settings size={18} /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center gap-2 p-2 w-full text-left rounded hover:bg-red-100 text-red-500">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Sidebar (mobile) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-black/40 backdrop-blur-md shadow-md transform transition-transform duration-300 z-50 md:hidden flex flex-col 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <Link
            to="/dashboard/admin"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 p-2 rounded hover:bg-blue-100"
          >
            <BarChart size={18} /> Dashboard
          </Link>
          <Link
            to="/dashboard/admin/users"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 p-2 rounded hover:bg-blue-100"
          >
            <Users size={18} /> Users
          </Link>
          <Link
            to="/dashboard/admin/reports"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 p-2 rounded hover:bg-blue-100"
          >
            <BarChart size={18} /> Reports
          </Link>
          <Link
            to="/dashboard/admin/settings"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 p-2 rounded hover:bg-blue-100"
          >
            <Settings size={18} /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          
          <button onClick={logout} className="flex items-center gap-2 p-2 w-full text-left rounded hover:bg-red-100 text-red-500">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">
          {/* Menu button (only mobile) */}
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <span className="text-gray-600 hidden md:block">Welcome, Admin</span>
        </header>

        {/* Content */}
        <section className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
