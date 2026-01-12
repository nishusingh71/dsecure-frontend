/**
 * Code Splitting Configuration
 * 
 * Centralized lazy loading configuration for route-based code splitting
 * Organizes components into logical chunks for better bundle optimization
 */

import { lazy, ComponentType } from 'react';

/**
 * Chunk Groups
 * Components are grouped into chunks to optimize loading
 */

// ==================== PUBLIC PAGES (Chunk: public) ====================
export const PublicPages = {
  HomePage: lazy(() => import('../pages/HomePage')),
  About: lazy(() => import('../pages/About')),
  ContactPage: lazy(() => import('../pages/ContactPage')),
  ServicesPage: lazy(() => import('../pages/ServicesPage')),
  ProductPage: lazy(() => import('../pages/ProductPage')),
  SolutionsPage: lazy(() => import('../pages/SolutionsPage')),
  ResourcesPage: lazy(() => import('../pages/ResourcesPage')),
  PricingPage: lazy(() => import('../pages/PricingPage')),
  CompliancePage: lazy(() => import('../pages/CompliancePage')),
  SupportPage: lazy(() => import('../pages/SupportPage')),
  DownloadPage: lazy(() => import('../pages/DownloadPage')),
  PartnersPage: lazy(() => import('../pages/PartnersPage')),
  NotFoundPage: lazy(() => import('../pages/NotFoundPage')),
};

// ==================== AUTH PAGES (Chunk: auth) ====================
export const AuthPages = {
  LoginPage: lazy(() => import('../pages/auth/LoginPage')),
  RegisterPage: lazy(() => import('../pages/auth/RegisterPage')),
  PaymentSetupPage: lazy(() => import('../pages/PaymentSetupPage')),
};

// ==================== DASHBOARD PAGES (Chunk: dashboards) ====================
export const DashboardPages = {
  UserDashboard: lazy(() => import('../pages/dashboards/UserDashboard')),
  AdminDashboard: lazy(() => import('../pages/dashboards/AdminDashboard')),
  EnhancedUserDashboard: lazy(() => import('../pages/dashboards/EnhancedUserDashboard')),
  AdminShell: lazy(() => import('../pages/dashboards/AdminShell')),
  AdminPerformance: lazy(() => import('../pages/dashboards/AdminPerformance')),
  AdminReports: lazy(() => import('../pages/dashboards/AdminReports')),
  AdminMachines: lazy(() => import('../pages/dashboards/AdminMachines')),
  AdminSessions: lazy(() => import('../pages/dashboards/AdminSessions')),
  AdminSubusers: lazy(() => import('../pages/dashboards/AdminSubusers')),
  EditSubuser: lazy(() => import('../pages/dashboards/EditSubuser')),
  AdminGroups: lazy(() => import('../pages/dashboards/AdminGroups')),
  AdminLicenses: lazy(() => import('../pages/dashboards/AdminLicenses')),
  AdminDownloads: lazy(() => import('../pages/dashboards/AdminDownloads')),
  NewErasurePage: lazy(() => import('../pages/dashboards/NewErasurePage')),
  ReportsPage: lazy(() => import('../pages/dashboards/ReportsPage')),
  DownloadAgentPage: lazy(() => import('../pages/dashboards/DownloadAgentPage')),
  PrivateCloudSetup: lazy(() => import('../pages/dashboards/PrivateCloudSetup')),
};

// ==================== ADMIN PAGES (Chunk: admin) ====================
export const AdminPages = {
  AdminUsers: lazy(() => import('../pages/admin/AdminUsers')),
  AdminGroups: lazy(() => import('../pages/admin/AdminGroups')),
  AdminReportsAdmin: lazy(() => import('../pages/admin/AdminReports')),
  AdminSettings: lazy(() => import('../pages/admin/AdminSettings')),
  AddUser: lazy(() => import('../pages/admin/AddUser')),
  AddGroup: lazy(() => import('../pages/admin/AddGroup')),
  GenerateReport: lazy(() => import('../pages/admin/GenerateReport')),
  EditUser: lazy(() => import('../pages/admin/EditUser')),
  EditGroup: lazy(() => import('../pages/admin/EditGroup')),
  AdminProfileEdit: lazy(() => import('../pages/admin/AdminProfileEdit')),
};

// ==================== SOLUTION PAGES (Chunk: solutions) ====================
export const SolutionPages = {
  HealthcareSolutionsPage: lazy(() => import('../pages/solutions/HealthcareSolutionsPage')),
  EnterpriseSolutionsPage: lazy(() => import('../pages/solutions/EnterpriseSolutionsPage')),
  FinancialSolutionsPage: lazy(() => import('../pages/solutions/FinancialSolutionsPage')),
  ServiceProvidersSolutionsPage: lazy(() => import('../pages/solutions/ServiceProvidersSolutionsPage')),
  HealthcareServices: lazy(() => import('../pages/HealthcareServices')),
  FinancialServices: lazy(() => import('../pages/FinancialServices')),
  EnterprisePage: lazy(() => import('../pages/EnterprisePage')),
  EducationPage: lazy(() => import('../pages/EducationPage')),
  GovernmentPage: lazy(() => import('../pages/GovernmentPage')),
  ITADSolution: lazy(() => import('../pages/ITADSolution')),
};

// ==================== RESOURCE PAGES (Chunk: resources) ====================
export const ResourcePages = {
  DocumentationResourcesPage: lazy(() => import('../pages/resources/DocumentationResourcesPage')),
  CaseStudiesResourcesPage: lazy(() => import('../pages/resources/CaseStudiesResourcesPage')),
  ComplianceResourcesPage: lazy(() => import('../pages/resources/ComplianceResourcesPage')),
  WhitepapersResourcesPage: lazy(() => import('../pages/resources/WhitepapersResourcesPage')),
};

// ==================== SERVICE PAGES (Chunk: services) ====================
export const ServicePages = {
  CloudErasurePage: lazy(() => import('../pages/services/CloudErasurePage')),
};

// ==================== GUIDE PAGES (Chunk: guides) ====================
export const GuidePages = {
  LegalPolicy: lazy(() => import('../pages/LegalPolicy')),
  OverwriteGuide: lazy(() => import('../pages/OverwriteGuide')),
  WipeSASDrives: lazy(() => import('../pages/WipeSASDrive')),
  WipeMacM1: lazy(() => import('../pages/WipeMacM1')),
  MacEraseGuide: lazy(() => import('../pages/MacEraseGuide')),
  FileEraserGuide: lazy(() => import('../pages/FileEraserGuide')),
  SecureEraseHDDSSD: lazy(() => import('../pages/SecureEraseHDDSDD')),
  CloudConsoleGuide: lazy(() => import('../pages/CloudConsoleGuide')),
  CryptoEraseSSD: lazy(() => import('../pages/CryptoEraseSSD')),
  RetainOSGuide: lazy(() => import('../pages/RetainOSGuide')),
  MobileErasureSolutions: lazy(() => import('../pages/MobileErasureSolutions')),
};

// ==================== MANUAL/SUPPORT PAGES (Chunk: manuals) ====================
export const ManualPages = {
  InstallationPage: lazy(() => import('../pages/support/manual/InstallationPage')),
  InstallationGuideDetailed: lazy(() => import('../pages/manual/InstallationGuideDetailed')),
  SystemSetupPage: lazy(() => import('../pages/manual/SystemSetupPage')),
  WorkingWithDSecurePage: lazy(() => import('../pages/manual/WorkingWithDSecurePage')),
  DSecureFAQPage: lazy(() => import('../pages/manual/DSecureFAQPage')),
  ReportManagementPage: lazy(() => import('../pages/manual/ReportManagementPage')),
  ScheduleSettingsPage: lazy(() => import('../pages/manual/ScheduleSettingsPage')),
  HelpManualIndexPage: lazy(() => import('../pages/manual/HelpManualIndexPage')),
  CompleteDSecureManual: lazy(() => import('../pages/manual/CompleteDSecureManual')),
  FirstTimeSetupPage: lazy(() => import('../pages/support/manual/FirstTimeSetupPage')),
  UserInterfacePage: lazy(() => import('../pages/support/manual/UserInterfacePage')),
  CompleteDSecureNetworkFile: lazy(() => import('../pages/manual/CompleteDSecureNetworkFile')),
  NetworkFileManualLayout: lazy(() => import('../pages/manual/NetworkFileManualLayout')),
};

// ==================== PAYMENT/CHECKOUT PAGES (Chunk: payment) ====================
export const PaymentPages = {
  PaymentPage: lazy(() => import('../pages/PaymentPage')),
  CheckoutPage: lazy(() => import('../pages/CheckoutPage')),
  OrderSuccessPage: lazy(() => import('../pages/OrderSuccessPage')),
  PricingAndPlanPage: lazy(() => import('../pages/PricingAndPlanPage')),
};

// ==================== LEGAL PAGES (Chunk: legal) ====================
export const LegalPages = {
  PrivacyPolicy: lazy(() => import('../pages/PrivacyPolicy')),
  TermsOfServicePage: lazy(() => import('../pages/TermsOfServicePage')),
  CookiePolicyPage: lazy(() => import('../pages/CookiePolicyPage')),
};

// ==================== UTILITY PAGES (Chunk: utils) ====================
export const UtilityPages = {
  SecurityPage: lazy(() => import('../pages/SecurityPage')),
  StatusPage: lazy(() => import('../pages/StatusPage')),
  DiagnosticsPage: lazy(() => import('../pages/DiagnosticsPage')),
  ApiTestPage: lazy(() => import('../pages/ApiTestPage')),
  SearchDemoPage: lazy(() => import('../pages/SearchDemoPage')),
};

/**
 * All lazy-loaded components combined
 * Use this for easy access to any lazy component
 */
export const LazyComponents = {
  ...PublicPages,
  ...AuthPages,
  ...DashboardPages,
  ...AdminPages,
  ...SolutionPages,
  ...ResourcePages,
  ...ServicePages,
  ...GuidePages,
  ...ManualPages,
  ...PaymentPages,
  ...LegalPages,
  ...UtilityPages,
};

/**
 * Bundle size estimates (approximate)
 * These help identify which chunks are largest
 */
export const ChunkSizes = {
  public: '~200KB',      // Homepage, about, contact, etc.
  auth: '~50KB',         // Login, register
  dashboards: '~300KB',  // All dashboard pages
  admin: '~150KB',       // Admin panel pages
  solutions: '~200KB',   // Solution-specific pages
  resources: '~100KB',   // Resource pages
  services: '~80KB',     // Service pages
  guides: '~250KB',      // Guide/documentation pages
  manuals: '~200KB',     // Manual pages
  payment: '~100KB',     // Payment/checkout
  legal: '~50KB',        // Terms, privacy
  utils: '~80KB',        // Utility pages
};

export default LazyComponents;
