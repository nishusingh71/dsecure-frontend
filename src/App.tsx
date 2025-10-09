import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import PageLoadingSkeleton from "./components/PageLoadingSkeleton";
import { ToastProvider } from "./components/ToastProvider";
import { Suspense, lazy, useEffect } from "react";
import { useGoogleAnalytics } from "./utils/analytics";
import { useMicrosoftClarity } from "./utils/microsoftClarity";
import { useSEOMonitoring } from "./utils/seoMonitor";

const HomePage = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const FeaturePage = lazy(() => import("./pages/FeaturePage"));
const DeviceErasurePage = lazy(
  () => import("./pages/services/DeviceErasurePage")
);
const NetworkErasurePage = lazy(
  () => import("./pages/services/NetworkErasurePage")
);
const CloudErasurePage = lazy(
  () => import("./pages/services/CloudErasurePage")
);
const SolutionsPage = lazy(() => import("./pages/SolutionsPage"));
const EnterpriseSolutionsPage = lazy(
  () => import("./pages/solutions/EnterpriseSolutionsPage")
);
const HealthcareSolutionsPage = lazy(
  () => import("./pages/solutions/HealthcareSolutionsPage")
);
const FinancialSolutionsPage = lazy(
  () => import("./pages/solutions/FinancialSolutionsPage")
);
const CompliancePage = lazy(() => import("./pages/CompliancePage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const DocumentationResourcesPage = lazy(
  () => import("./pages/resources/DocumentationResourcesPage")
);
const CaseStudiesResourcesPage = lazy(
  () => import("./pages/resources/CaseStudiesResourcesPage")
);
const ComplianceResourcesPage = lazy(
  () => import("./pages/resources/ComplianceResourcesPage")
);
const WhitepapersResourcesPage = lazy(
  () => import("./pages/resources/WhitepapersResourcesPage")
);
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const PricingAndPlanPage = lazy(() => import("./pages/PricingAndPlanPage"));
const About = lazy(() => import("./pages/About"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
const DiagnosticsPage = lazy(() => import("./pages/DiagnosticsPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicyPage"));
const SecurityPage = lazy(() => import("./pages/SecurityPage"));
const StatusPage = lazy(() => import("./pages/StatusPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PaymentSetupPage from "./pages/PaymentSetupPage";
import UserDashboard from "./pages/dashboards/UserDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import AdminShell from "./pages/dashboards/AdminShell";
import AdminPerformance from "./pages/dashboards/AdminPerformance";
import AdminReports from "./pages/dashboards/AdminReports";
import AdminMachines from "./pages/dashboards/AdminMachines";
import AdminLogs from "./pages/dashboards/AdminLogs";
import AdminSubusers from "./pages/dashboards/AdminSubusers";
import LegalPolicy from "./pages/LegalPolicy";
import OverwriteGuide from "./pages/OverwriteGuide";
import WipeSASDrives from "./pages/WipeSASDrive";
import WipeMacM1 from "./pages/WipeMacM1";
import MacEraseGuide from "./pages/MacEraseGuide";
import FileEraserGuide from "./pages/FileEraserGuide";
import SecureEraseHDDSSD from "./pages/SecureEraseHDDSDD";
import CloudConsoleGuide from "./pages/CloudConsoleGuide";
import CryptoEraseSSD from "./pages/CryptoEraseSSD";
import RetainOSGuide from "./pages/RetainOSGuide";
import NotFoundPage from "./pages/NotFoundPage";

// Support pages
const FAQsPage = lazy(() => import("./pages/support/FAQsPage"));
const KnowledgeBasePage = lazy(() => import("./pages/support/KnowledgeBasePage"));
const GetStartedPage = lazy(() => import("./pages/support/GetStartedPage"));
const HelpManualPage = lazy(() => import("./pages/support/HelpManualPage"));
const ProductVideosPage = lazy(() => import("./pages/support/ProductVideosPage"));

// Blog pages
const BlogPage = lazy(() => import("./components/blog/BlogPage"));
const OverwriteGuideBlog = lazy(() => import("./components/blog/OverwriteGuideBlog"));
const SSDWipeGuideBlog = lazy(() => import("./components/blog/SSDWipeGuideBlog"));
const ErasureVsDestructionBlog = lazy(() => import("./components/blog/ErasureVsDestructionBlog"));
const DataDeletionMythsBlog = lazy(() => import("./components/blog/DataDeletionMythsBlog"));
const DataSanitizationComplianceBlog = lazy(() => import("./components/blog/DataSanitizationComplianceBlog"));

// Analytics Integration Component
function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  // Initialize all analytics tracking
  useGoogleAnalytics();
  useMicrosoftClarity();
  useSEOMonitoring();

  useEffect(() => {
    // Track initial page load
    //console.log('🎯 DSecure Analytics & SEO Monitoring Initialized');
  }, []);

  return <>{children}</>;
}

// ScrollToTop Component - Scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AnalyticsWrapper>
          <ScrollToTop />
          <Suspense fallback={<PageLoadingSkeleton />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="features" element={<FeaturePage />} />
              <Route
                path="services/device-erasure"
                element={<DeviceErasurePage />}
              />
              <Route
                path="services/network-erasure"
                element={<NetworkErasurePage />}
              />
              <Route
                path="services/cloud-erasure"
                element={<CloudErasurePage />}
              />
              <Route path="solutions" element={<SolutionsPage />} />
              <Route
                path="solutions/enterprise"
                element={<EnterpriseSolutionsPage />}
              />
              <Route
                path="solutions/healthcare"
                element={<HealthcareSolutionsPage />}
              />
              <Route
                path="solutions/financial"
                element={<FinancialSolutionsPage />}
              />
              <Route path="compliance" element={<CompliancePage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route
                path="resources/documentation"
                element={<DocumentationResourcesPage />}
              />
              <Route
                path="resources/case-studies"
                element={<CaseStudiesResourcesPage />}
              />
              <Route
                path="resources/compliance"
                element={<ComplianceResourcesPage />}
              />
              <Route
                path="resources/whitepapers"
                element={<WhitepapersResourcesPage />}
              />
              <Route path="contact" element={<ContactPage />} />
              <Route path="about" element={<About />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="pricing-and-plan" element={<PricingAndPlanPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="order-success" element={<OrderSuccessPage />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="diagnostics" element={<DiagnosticsPage />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="legal-policy" element={<LegalPolicy />} />
              <Route path="terms-of-service" element={<TermsOfServicePage />} />
              <Route path="cookie-policy" element={<CookiePolicyPage />} />
              <Route path="security" element={<SecurityPage />} />
              <Route path="status" element={<StatusPage />} />
              <Route path="partners" element={<PartnersPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              {/* <Route path='privacy-policy' element={<PrivacyPolicyPage />} />
            <Route path='terms-of-service' element={<TermsOfServicePage />} />
            <Route path='cookie-policy' element={<CookiePolicyPage />} />
            <Route path='security' element={<SecurityPage />} /> */}

              {/* Payment/License Setup Page */}
              <Route
                path="payment"
                element={
                  <ProtectedRoute>
                    <PaymentSetupPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes - Only accessible by admin role */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <AdminShell />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="performance" element={<AdminPerformance />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="machines" element={<AdminMachines />} />
                <Route path="logs" element={<AdminLogs />} />
                <Route path="subusers" element={<AdminSubusers />} />
              </Route>
              <Route
                path="/support/overwrite-guide"
                element={<OverwriteGuide />}
              />
              <Route path="/support/wipe-guide" element={<OverwriteGuide />} />
              <Route
                path="/support/sas-wipe-guide"
                element={<WipeSASDrives />}
              />
              <Route path="/support/mac-wipe-guide" element={<WipeMacM1 />} />
              <Route
                path="/support/mac-eraser-guide"
                element={<MacEraseGuide />}
              />

              <Route
                path="/support/file-eraser-guide"
                element={<FileEraserGuide />}
              />
              <Route
                path="/support/secure-erase-hddssd"
                element={<SecureEraseHDDSSD />}
              />
              <Route
                path="/support/cloud-console-guide"
                element={<CloudConsoleGuide />}
              />
              <Route
                path="/support/ssd-cryptographic-erasure-guide"
                element={<CryptoEraseSSD />}
              />
              <Route
                path="/support/retain-os-guide"
                element={<RetainOSGuide />}
              />
              
              {/* New Support Pages */}
              <Route path="/support/faqs" element={<FAQsPage />} />
              <Route path="/support/knowledge-base" element={<KnowledgeBasePage />} />
              <Route path="/support/get-started" element={<GetStartedPage />} />
              <Route path="/support/help-manual" element={<HelpManualPage />} />
              <Route path="/support/product-videos" element={<ProductVideosPage />} />
              
              {/* Blog Routes */}
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/overwrite-guide" element={<OverwriteGuideBlog />} />
              <Route path="/blog/ssd-wipe-guide" element={<SSDWipeGuideBlog />} />
              <Route path="/blog/erasure-vs-destruction" element={<ErasureVsDestructionBlog />} />
              <Route path="/blog/data-deletion-myths" element={<DataDeletionMythsBlog />} />
              <Route path="/blog/data-sanitization-compliance" element={<DataSanitizationComplianceBlog />} />
              
              {/* Catch-all route for unmatched paths */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AnalyticsWrapper>
    </AuthProvider>
    </ToastProvider>
  );
}
