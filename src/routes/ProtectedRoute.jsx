import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/token";

const ProtectedRoute = ({ type }) => {
  const token = getToken();

  if (type === "protected" && !token) {
    return <Navigate to="/auth/login" replace />;
  }
  if (type === "public" && token) {
    return <Navigate to="/about" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
