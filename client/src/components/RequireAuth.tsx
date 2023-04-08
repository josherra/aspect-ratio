import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const RequireAuth = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
