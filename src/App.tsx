import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import TechnicalDocumentation from "./components/TechnicalDocumentation";

// Lazy pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ProductPage = lazy(() => import("./pages/ProductPage")); // ✅ Added ProductPage
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
import NewErasurePage from "./pages/dashboards/NewErasurePage";
import ReportsPage from "./pages/dashboards/ReportsPage";
import DownloadAgentPage from "./pages/dashboards/DownloadAgentPage";
// Admin pages
import AdminUsers from "./pages/admin/AdminUsers";
import AdminGroups from "./pages/admin/AdminGroups";
import AdminReportsAdmin from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";
import AddUser from "./pages/admin/AddUser";
import AddGroup from "./pages/admin/AddGroup";
import GenerateReport from "./pages/admin/GenerateReport";
import EditUser from "./pages/admin/EditUser";
import EditGroup from "./pages/admin/EditGroup";
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
import MobileErasureSolutions from "./pages/MobileErasureSolutions";
import NotFoundPage from "./pages/NotFoundPage";
import EducationPage from "./pages/EducationPage";
import FinancialServices from "./pages/FinancialServices";
import GovernmentPage from "./pages/GovernmentPage";

// Support pages
const FAQsPage = lazy(() => import("./pages/support/FAQsPage"));
const KnowledgeBasePage = lazy(
  () => import("./pages/support/KnowledgeBasePage")
);
const GetStartedPage = lazy(() => import("./pages/support/GetStartedPage"));
const HelpManualPage = lazy(() => import("./pages/support/HelpManualPage"));
const ProductVideosPage = lazy(
  () => import("./pages/support/ProductVideosPage")
);

// Blog pages
const BlogPage = lazy(() => import("./components/blog/BlogPage"));
const OverwriteGuideBlog = lazy(
  () => import("./components/blog/OverwriteGuideBlog")
);
const SSDWipeGuideBlog = lazy(
  () => import("./components/blog/SSDWipeGuideBlog")
);
const ErasureVsDestructionBlog = lazy(
  () => import("./components/blog/ErasureVsDestructionBlog")
);
const DataDeletionMythsBlog = lazy(
  () => import("./components/blog/DataDeletionMythsBlog")
);
const DataSanitizationComplianceBlog = lazy(
  () => import("./components/blog/DataSanitizationComplianceBlog")
);

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
  return (
    <ToastProvider>
      <AuthProvider>
        <NotificationProvider>
          <AnalyticsWrapper>
            <ScrollToTop />
            <ToastContainer />
            <Suspense fallback={<PageLoadingSkeleton />}>
              <Routes>
                <Route element={<MainLayout />}>
                  {/* Core Routes */}
                  <Route index element={<HomePage />} />
                  <Route path="services" element={<ServicesPage />} />
                  <Route path="products" element={<ProductPage />} />
                  {/* Services */}
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
                  {/* Solutions */}
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
                  <Route path="solutions/education" element={<EducationPage />} />
                  <Route path="solutions/financial-services" element={<FinancialServices />} />
                  <Route path="solutions/government" element={<GovernmentPage />} />
                  {/* Resources */}
                  <Route path="resources" element={<ResourcesPage />} />
                  <Route
                    path="resources/documentation"
                    element={<DocumentationResourcesPage />}
                  />
                  <Route
                    path="technical-documentation"
                    element={<TechnicalDocumentation />}
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
                  {/* Other Pages */}
                  <Route path="compliance" element={<CompliancePage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="about" element={<About />} />
                  <Route path="pricing" element={<PricingPage />} />
                  <Route
                    path="pricing-and-plan"
                    element={<PricingAndPlanPage />}
                  />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="order-success" element={<OrderSuccessPage />} />
                  <Route path="payment" element={<PaymentPage />} />
                  <Route path="diagnostics" element={<DiagnosticsPage />} />
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="legal-policy" element={<LegalPolicy />} />
                  <Route
                    path="terms-of-service"
                    element={<TermsOfServicePage />}
                  />
                  <Route path="cookie-policy" element={<CookiePolicyPage />} />
                  <Route path="security" element={<SecurityPage />} />
                  <Route path="status" element={<StatusPage />} />
                  <Route path="partners" element={<PartnersPage />} />
                  <Route path="support" element={<SupportPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  {/* Protected Routes */}
                  <Route
                    path="payment/setup"
                    element={
                      <ProtectedRoute>
                        <PaymentSetupPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute>
                        <UserDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="dashboard/new-erasure"
                    element={
                      <ProtectedRoute>
                        <NewErasurePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="dashboard/reports"
                    element={
                      <ProtectedRoute>
                        <ReportsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="dashboard/download-agent"
                    element={
                      <ProtectedRoute>
                        <DownloadAgentPage />
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
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="users/add" element={<AddUser />} />
                    <Route path="users/edit/:userId" element={<EditUser />} />
                    <Route path="groups" element={<AdminGroups />} />
                    <Route path="groups/add" element={<AddGroup />} />
                    <Route path="groups/edit/:groupId" element={<EditGroup />} />
                    <Route path="reports/admin" element={<AdminReportsAdmin />} />
                    <Route path="reports/generate" element={<GenerateReport />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                  {/* Support Guides */}
                  <Route
                    path="support/overwrite-guide"
                    element={<OverwriteGuide />}
                  />
                  <Route path="support/wipe-guide" element={<OverwriteGuide />} />
                  <Route
                    path="support/sas-wipe-guide"
                    element={<WipeSASDrives />}
                  />
                  <Route path="support/mac-wipe-guide" element={<WipeMacM1 />} />
                  <Route
                    path="support/mac-eraser-guide"
                    element={<MacEraseGuide />}
                  />
                  <Route
                    path="support/file-eraser-guide"
                    element={<FileEraserGuide />}
                  />
                  <Route
                    path="support/secure-erase-hddssd"
                    element={<SecureEraseHDDSSD />}
                  />
                  <Route
                    path="support/cloud-console-guide"
                    element={<CloudConsoleGuide />}
                  />
                  <Route
                    path="support/ssd-cryptographic-erasure-guide"
                    element={<CryptoEraseSSD />}
                  />
                  <Route
                    path="support/retain-os-guide"
                    element={<RetainOSGuide />}
                  />
                  {/* Support Pages */}
                  <Route path="support/faqs" element={<FAQsPage />} />
                  <Route
                    path="support/knowledge-base"
                    element={<KnowledgeBasePage />}
                  />
                  <Route
                    path="support/get-started"
                    element={<GetStartedPage />}
                  />
                  <Route
                    path="support/help-manual"
                    element={<HelpManualPage />}
                  />
                  <Route
                    path="support/product-videos"
                    element={<ProductVideosPage />}
                  />
                  {/* Blog */}
                  <Route path="blog" element={<BlogPage />} />
                  <Route
                    path="blog/overwrite-guide"
                    element={<OverwriteGuideBlog />}
                  />
                  <Route
                    path="blog/ssd-wipe-guide"
                    element={<SSDWipeGuideBlog />}
                  />
                  <Route
                    path="blog/erasure-vs-destruction"
                    element={<ErasureVsDestructionBlog />}
                  />
                  <Route
                    path="blog/data-deletion-myths"
                    element={<DataDeletionMythsBlog />}
                  />
                  <Route
                    path="blog/data-sanitization-compliance"
                    element={<DataSanitizationComplianceBlog />}
                  />
                  {/* Product-specific Feature */}
                  <Route
                    path="products/mobile-erasure"
                    element={<MobileErasureSolutions />}
                  />
                  {/* Catch-all */}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </AnalyticsWrapper>
        </NotificationProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
