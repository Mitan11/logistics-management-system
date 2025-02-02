import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ element: Component }) => {
  const { user } = useAuth();

  // If the user is logged in, render the component, otherwise navigate to the login page
  return user ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
