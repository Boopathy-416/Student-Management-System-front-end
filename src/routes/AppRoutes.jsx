import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Intro

import IntroWrapper from "../pages/Intro/IntroWrapper";

// Role selection
import RoleSelection from "../pages/RoleSelection/RoleSelection";

// Auth
import TeacherSignIn from "../pages/Auth/Teacher/TeacherSignIn";
import TeacherSignUp from "../pages/Auth/Teacher/TeacherSignUp";
import AdminSignIn from "../pages/Auth/Admin/AdminSignIn";

// Dashboards
// import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import TeacherLayout from "../layouts/TeacherLayout";

import Classes from "../pages/Teacher/Classes";
import Students from "../pages/Teacher/Students";


import NotFound from "../pages/NotFound";
import AdminLayout from "../layouts/AdminLayout";
import ImportExport from "../pages/Admin/ImportExport"
import EditStudents from "../pages/Admin/Edit-Students";
import AuditLogs from "../pages/Teacher/AuditLogs";
import DashboardHome from "../pages/Teacher/DashboardHome";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Intro redirects */}
      <Route path="/" element={<Navigate to="/intro" replace />} />
      <Route path="/intro" element={<IntroWrapper />} />

      {/* Choose role */}
      <Route path="/choose-role" element={<RoleSelection />} />

      {/* Auth */}
      <Route path="/auth/teacher/signin" element={<TeacherSignIn />} />
      <Route path="/auth/teacher/signup" element={<TeacherSignUp />} />
      <Route path="/auth/admin/signin" element={<AdminSignIn />} />

      {/* Protected dashboards */}

      <Route element={<PrivateRoute allowedRoles={["teacher"]} />}>
        <Route path="/dashboard/teacher" element={<TeacherLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="classes" element={<Classes />} />
          <Route path="students" element={<Students />} />
          <Route path="profile" element={<AuditLogs />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Route>

      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard/admin" element={<AdminLayout />}>
          <Route index element={<h2>Admin Home</h2>} />
          <Route path="import-export" element={<ImportExport />} />
          <Route path="edit-students" element={<EditStudents />} />
          <Route path="settings" element={<h2>Settings</h2>} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
