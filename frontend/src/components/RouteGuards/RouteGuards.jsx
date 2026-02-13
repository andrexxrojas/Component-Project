import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext.jsx";

export function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoggedIn === null) return null; // still checking auth, don’t redirect yet

  if (!isLoggedIn) {
    return <Navigate to={`/auth?redirect=${location.pathname}`} replace />;
  }

  return children;
}


export function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) return null; // still checking

  if (isLoggedIn) {
    return <Navigate to="/projects" replace />;
  }

  return children;
}
