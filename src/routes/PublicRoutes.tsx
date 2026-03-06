import { Suspense, lazy } from "react";
import { Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PageLoadingSkeleton from "../components/PageLoadingSkeleton";

// Core Pages
const HomePage = lazy(() => import("../pages/HomePage"));
const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const CloudErasurePage = lazy(() => import("../pages/services/CloudErasurePage"));
const SolutionsPage = lazy(() => import("../pages/SolutionsPage"));
const EnterpriseSolutionsPage = lazy(() => import("../pages/solutions/EnterpriseSolutionsPage"));
const EducationPage = lazy(() => import("../pages/EducationPage"));
const FinancialSolutionsPage = lazy(() => import("../pages/solutions/FinancialSolutionsPage"));
const FinancialServices = lazy(() => import("../pages/FinancialServices"));
const GovernmentPage = lazy(() => import("../pages/GovernmentPage"));
const HealthcareSolutionsPage = lazy(() => import("../pages/solutions/HealthcareSolutionsPage"));
const ServiceProvidersSolutionsPage = lazy(() => import("../pages/solutions/ServiceProvidersSolutionsPage"));
const ProgrammaticSolutionPage = lazy(() => import("../pages/ProgrammaticSolutionPage"));
const SearchDemoPage = lazy(() => import("../pages/SearchDemoPage"));
const ResourcesPage = lazy(() => import("../pages/ResourcesPage"));
const DocumentationResourcesPage = lazy(() => import("../pages/resources/DocumentationResourcesPage"));
const TechnicalDocumentation = lazy(() => import("../components/TechnicalDocumentation"));
const CaseStudiesResourcesPage = lazy(() => import("../pages/resources/CaseStudiesResourcesPage"));
const ComplianceResourcesPage = lazy(() => import("../pages/resources/ComplianceResourcesPage"));
const WhitepapersResourcesPage = lazy(() => import("../pages/resources/WhitepapersResourcesPage"));
const ForumPage = lazy(() => import("../pages/ForumPage"));
const CompliancePage = lazy(() => import("../pages/CompliancePage"));
const DataEraserSoftwarePage = lazy(() => import("../pages/DataEraserSoftwarePage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const About = lazy(() => import("../pages/About"));
const PricingAndPlanPage = lazy(() => import("../pages/PricingAndPlanPage"));
const DownloadPage = lazy(() => import("../pages/DownloadPage"));
const DriveEraserPage = lazy(() => import("../pages/DriveEraserPage"));
const FileEraserPage = lazy(() => import("../pages/FileEraserPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const OrderSuccessPage = lazy(() => import("../pages/OrderSuccessPage"));
const FailurePage = lazy(() => import("../pages/FailurePage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage"));
const DiagnosticsPage = lazy(() => import("../pages/DiagnosticsPage"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const LegalPolicy = lazy(() => import("../pages/LegalPolicy"));
const TermsOfServicePage = lazy(() => import("../pages/TermsOfServicePage"));
const CookiePolicyPage = lazy(() => import("../pages/CookiePolicyPage"));
const SecurityPage = lazy(() => import("../pages/SecurityPage"));
const WhatIsDSecurePage = lazy(() => import("../pages/WhatIsDSecurePage"));
const WhyDSecurePage = lazy(() => import("../pages/WhyDSecurePage"));
const AIOverviewPage = lazy(() => import("../pages/AIOverviewPage"));
const ComparisonPage = lazy(() => import("../pages/ComparisonPage"));
const WhitepaperPage = lazy(() => import("../pages/WhitepaperPage"));
const UseCasesPage = lazy(() => import("../pages/UseCasesPage"));
const FounderPage = lazy(() => import("../pages/FounderPage"));
const TrustCenterPage = lazy(() => import("../pages/TrustCenterPage"));
const StatusPage = lazy(() => import("../pages/StatusPage"));
const DataHygieneFrameworkPage = lazy(() => import("../pages/DataHygieneFrameworkPage"));
const GlossaryPage = lazy(() => import("../pages/GlossaryPage"));
const PartnersPage = lazy(() => import("../pages/PartnersPage"));
const SupportPage = lazy(() => import("../pages/SupportPage"));
const EnterprisePage = lazy(() => import("../pages/EnterprisePage"));
const HealthcareServices = lazy(() => import("../pages/HealthcareServices"));
const ITADSolution = lazy(() => import("../pages/ITADSolution"));
const ApiTestPage = lazy(() => import("../pages/ApiTestPage"));
const BlogPage = lazy(() => import("../components/blog/BlogPage"));

export const PublicRoutes = () => (
  <Route element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path="services" element={<ServicesPage />} />
    <Route path="products" element={<Navigate to=".." replace />} />
    <Route path="services/cloud-erasure" element={<CloudErasurePage />} />
    <Route path="solutions" element={<SolutionsPage />} />
    <Route path="solutions/enterprise" element={<EnterpriseSolutionsPage />} />
    <Route path="solutions/itad" element={<ITADSolution />} />
    <Route path="solutions/education" element={<EducationPage />} />
    <Route path="solutions/financial" element={<FinancialSolutionsPage />} />
    <Route
      path="solutions/financial-services"
      element={<FinancialServices />}
    />
    <Route path="solutions/government" element={<GovernmentPage />} />
    <Route path="solutions/healthcare" element={<HealthcareSolutionsPage />} />
    <Route
      path="solutions/service-providers"
      element={<ServiceProvidersSolutionsPage />}
    />
    <Route
      path="solutions/industry/:slug"
      element={<ProgrammaticSolutionPage />}
    />
    <Route path="search-demo" element={<SearchDemoPage />} />
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
    <Route path="resources/compliance" element={<ComplianceResourcesPage />} />
    <Route
      path="resources/whitepapers"
      element={<WhitepapersResourcesPage />}
    />
    <Route path="community" element={<ForumPage />} />
    <Route path="compliance" element={<CompliancePage />} />
    <Route path="data-eraser-software" element={<DataEraserSoftwarePage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="about" element={<About />} />
    <Route
      path="pricing"
      element={<Navigate to="../pricing-and-plan" replace />}
    />
    <Route path="pricing-and-plan" element={<PricingAndPlanPage />} />
    <Route path="download" element={<DownloadPage />} />
    <Route path="products/drive-eraser" element={<DriveEraserPage />} />
    <Route path="products/file-eraser" element={<FileEraserPage />} />
    <Route path="checkout" element={<CheckoutPage />} />
    <Route path="order-success" element={<OrderSuccessPage />} />
    <Route path="order-failure" element={<FailurePage />} />
    <Route path="payment" element={<PaymentPage />} />
    <Route path="diagnostics" element={<DiagnosticsPage />} />
    <Route path="privacy-policy" element={<PrivacyPolicy />} />
    <Route path="legal-policy" element={<LegalPolicy />} />
    <Route path="terms-of-service" element={<TermsOfServicePage />} />
    <Route path="cookie-policy" element={<CookiePolicyPage />} />
    <Route path="security" element={<SecurityPage />} />
    <Route path="what-is-d-secure" element={<WhatIsDSecurePage />} />
    <Route path="why-d-secure" element={<WhyDSecurePage />} />
    <Route path="ai-overview" element={<AIOverviewPage />} />
    <Route path="comparison" element={<ComparisonPage />} />
    <Route path="whitepaper" element={<WhitepaperPage />} />
    <Route path="use-cases" element={<UseCasesPage />} />
    <Route path="founder" element={<FounderPage />} />
    <Route path="trust-center" element={<TrustCenterPage />} />
    <Route path="status" element={<StatusPage />} />
    <Route
      path="data-hygiene-framework"
      element={<DataHygieneFrameworkPage />}
    />
    <Route path="glossary" element={<GlossaryPage />} />
    <Route path="partners" element={<PartnersPage />} />
    <Route path="support" element={<SupportPage />} />
    <Route path="enterprise" element={<EnterprisePage />} />
    <Route path="healthcare-services" element={<HealthcareServices />} />
    <Route path="itad-solution" element={<ITADSolution />} />
    <Route path="api-test" element={<ApiTestPage />} />
    <Route path="blog" element={<BlogPage />} />
  </Route>
);
