import { lazy } from "react";
import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));

export const AuthRoutes = () => (
  <Route element={<MainLayout />}>
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
  </Route>
);
