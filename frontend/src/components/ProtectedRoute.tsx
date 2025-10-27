import { Navigate } from "react-router-dom";
import { useMyContext } from "../context/AppContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useMyContext();

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
