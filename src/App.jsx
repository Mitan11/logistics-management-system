import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./PrivateRouter";
import { Toaster } from "react-hot-toast";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
    <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Private route (dashboard page) */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<DashboardPage />} />}
        />

        {/* Redirect to login if not logged in */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
