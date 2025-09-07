import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ allowedRoles }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/choose-role" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // If the user is logged in but not allowed here, send them to their dashboard.
    return <Navigate to={role === "admin" ? "/dashboard/admin" : "/dashboard/teacher"} replace />;
  }

  return <Outlet />;
}
