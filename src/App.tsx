import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { AuthProvider } from "./auth/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ToastContainer from "./components/ui/ToastContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import PageLoadingSkeleton from "./components/PageLoadingSkeleton";
import { ToastProvider } from "./components/ToastProvider";
import { Suspense, lazy, useEffect } from "react";
import { useGoogleAnalytics } from "./utils/analytics";
import { useMicrosoftClarity } from "./utils/microsoftClarity";
import { useSEOMonitoring } from "./utils/seoMonitor";
import NetworkStatus from "./components/NetworkStatus";
import { PublicRoutes } from "./routes/PublicRoutes";
import { BlogRoutes } from "./routes/BlogRoutes";
import { SupportRoutes } from "./routes/SupportRoutes";
import { DashboardRoutes } from "./routes/DashboardRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
// Analytics Wrapper
function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useGoogleAnalytics();
  useMicrosoftClarity();
  useSEOMonitoring();
  useEffect(() => {}, []);
  return <>{children}</>;
}

// Scroll To Top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export default function App() {
  // Domain Redirect Logic - ensures dsecuretech.com is the canonical domain
  useEffect(() => {
    const hostname = window.location.hostname;
    // Check if the current hostname is the dashed version (with or without www)
    if (hostname.includes("d-securetech.com")) {
      const newUrl = window.location.href.replace("d-securetech.com", "dsecuretech.com");
      window.location.replace(newUrl);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <NotificationProvider>
            <AnalyticsWrapper>
              <ScrollToTop />
              <NetworkStatus />
              <ToastContainer />
              <Suspense fallback={<PageLoadingSkeleton />}>
                <Routes>
                  {/* MODULARIZED ROUTES - called as functions, not components, because <Routes> requires <Route> as direct children */}
                  {PublicRoutes()}
                  {AuthRoutes()}
                  {DashboardRoutes()}
                  {SupportRoutes()}
                  {BlogRoutes()}

                  {/* 404 Catch-all - must be LAST, wrapped in MainLayout for navbar/footer */}
                  <Route element={<MainLayout />}>
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </AnalyticsWrapper>
          </NotificationProvider>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
