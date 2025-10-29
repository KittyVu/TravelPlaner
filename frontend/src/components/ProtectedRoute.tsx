// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useMyContext } from "../context/AppContext";
import type React from "react";

export default function ProtectedRoute({ children } : {children: React.ReactNode})  {
  const { isLoggedIn } = useMyContext();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
