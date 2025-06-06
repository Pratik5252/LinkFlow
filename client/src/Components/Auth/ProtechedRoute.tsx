import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtechedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

export default ProtechedRoute;
