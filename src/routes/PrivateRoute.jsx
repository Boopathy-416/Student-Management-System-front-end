// src/routes/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ allowedRoles }) {
  const { initializing, isAuthenticated, role } = useAuth();
  const location = useLocation();

  // While auth state is being read from localStorage, don't redirect — show nothing or a loader
  if (initializing) {
    return null; // or return a spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to="/choose-role" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // logged in but not allowed here => send to their dashboard
    return <Navigate to={role === "admin" ? "/dashboard/admin" : "/dashboard/teacher"} replace />;
  }

  return <Outlet />;
}
