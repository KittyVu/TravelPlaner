// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useMyContext } from "../context/AppContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useMyContext();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
