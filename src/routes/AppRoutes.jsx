import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Intro
// import IntroIndex from "../pages/Intro/index";
// import Slide1 from "../pages/Intro/Slide1";
// import Slide2 from "../pages/Intro/Slide2";
// import Slide3 from "../pages/Intro/Slide3";


import IntroWrapper from "../pages/Intro/IntroWrapper";


// Role selection
import RoleSelection from "../pages/RoleSelection/RoleSelection";

// Auth
import TeacherSignIn from "../pages/Auth/Teacher/TeacherSignIn";
import TeacherSignUp from "../pages/Auth/Teacher/TeacherSignUp";
import AdminSignIn from "../pages/Auth/Admin/AdminSignIn";

// Dashboards
import TeacherDashboard from "../pages/Dashboard/Teacher/TeacherDashboard";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";

import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Intro redirects */}
      <Route path="/" element={<Navigate to="/intro" replace />} />
      <Route path="/intro" element={<IntroWrapper />} />
      {/* <Route path="/intro/1" element={<Slide1 />} />
      <Route path="/intro/2" element={<Slide2 />} />
      <Route path="/intro/3" element={<Slide3 />} /> */}

      {/* Choose role */}
      <Route path="/choose-role" element={<RoleSelection />} />

      {/* Auth */}
      <Route path="/auth/teacher/signin" element={<TeacherSignIn />} />
      <Route path="/auth/teacher/signup" element={<TeacherSignUp />} />
      <Route path="/auth/admin/signin" element={<AdminSignIn />} />

      {/* Protected dashboards */}
      <Route element={<PrivateRoute allowedRoles={["teacher"]} />}>
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
