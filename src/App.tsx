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
// [OLD CODE PRESERVED AS COMMENT]
// import TechnicalDocumentation from "./components/TechnicalDocumentation";
const TechnicalDocumentation = lazy(
  () => import("./components/TechnicalDocumentation"),
);

// Lazy pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CloudErasurePage = lazy(
  () => import("./pages/services/CloudErasurePage"),
);
const SolutionsPage = lazy(() => import("./pages/SolutionsPage"));
const CompliancePage = lazy(() => import("./pages/CompliancePage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
// const Enterprise=lazy(()=>import("./pages/solutions/EnterpriseSolutionsPage"));
const DocumentationResourcesPage = lazy(
  () => import("./pages/resources/DocumentationResourcesPage"),
);
const CaseStudiesResourcesPage = lazy(
  () => import("./pages/resources/CaseStudiesResourcesPage"),
);
const ComplianceResourcesPage = lazy(
  () => import("./pages/resources/ComplianceResourcesPage"),
);
const WhitepapersResourcesPage = lazy(
  () => import("./pages/resources/WhitepapersResourcesPage"),
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
const DownloadPage = lazy(() => import("./pages/DownloadPage"));
const DriveEraserPage = lazy(() => import("./pages/DriveEraserPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
// Auth pages - lazy loaded
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const PaymentSetupPage = lazy(() => import("./pages/PaymentSetupPage"));

// Dashboard pages - lazy loaded
const UserDashboard = lazy(() => import("./pages/dashboards/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/dashboards/AdminDashboard"));
const AdminShell = lazy(() => import("./pages/dashboards/AdminShell"));
const AdminPerformance = lazy(
  () => import("./pages/dashboards/AdminPerformance"),
);
const AdminReports = lazy(() => import("./pages/dashboards/AdminReports"));
const AdminMachines = lazy(() => import("./pages/dashboards/AdminMachines"));
const AdminSessions = lazy(() => import("./pages/dashboards/AdminSessions"));
const AdminSubusers = lazy(() => import("./pages/dashboards/AdminSubusers"));
const EditSubuser = lazy(() => import("./pages/dashboards/EditSubuser"));
const AdminGroupsDashboard = lazy(
  () => import("./pages/dashboards/AdminGroups"),
);
const AdminLicenses = lazy(() => import("./pages/dashboards/AdminLicenses"));
const AdminDownloads = lazy(() => import("./pages/dashboards/AdminDownloads"));
const NewErasurePage = lazy(() => import("./pages/dashboards/NewErasurePage"));
const ReportsPage = lazy(() => import("./pages/dashboards/ReportsPage"));
const DownloadAgentPage = lazy(
  () => import("./pages/dashboards/DownloadAgentPage"),
);
const PrivateCloudSetup = lazy(
  () => import("./pages/dashboards/PrivateCloudSetup"),
);

// Admin pages - lazy loaded
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminGroups = lazy(() => import("./pages/admin/AdminGroups"));
const AdminReportsAdmin = lazy(() => import("./pages/admin/AdminReports"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AddUser = lazy(() => import("./pages/admin/AddUser"));
const AddGroup = lazy(() => import("./pages/admin/AddGroup"));
const GenerateReport = lazy(() => import("./pages/admin/GenerateReport"));
const EditUser = lazy(() => import("./pages/admin/EditUser"));
const EditGroup = lazy(() => import("./pages/admin/EditGroup"));
const LegalPolicy = lazy(() => import("./pages/LegalPolicy"));
const OverwriteGuide = lazy(() => import("./pages/OverwriteGuide"));
const WipeSASDrives = lazy(() => import("./pages/WipeSASDrive"));
const WipeMacM1 = lazy(() => import("./pages/WipeMacM1"));
const MacEraseGuide = lazy(() => import("./pages/MacEraseGuide"));
const FileEraserGuide = lazy(() => import("./pages/FileEraserGuide"));
const SecureEraseHDDSSD = lazy(() => import("./pages/SecureEraseHDDSDD"));
const CloudConsoleGuide = lazy(() => import("./pages/CloudConsoleGuide"));
const CryptoEraseSSD = lazy(() => import("./pages/CryptoEraseSSD"));
const RetainOSGuide = lazy(() => import("./pages/RetainOSGuide"));
const MobileErasureSolutions = lazy(
  () => import("./pages/MobileErasureSolutions"),
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const FinancialServices = lazy(() => import("./pages/FinancialServices"));
const GovernmentPage = lazy(() => import("./pages/GovernmentPage"));
const ApiTestPage = lazy(() => import("./pages/ApiTestPage"));
const EnterprisePage = lazy(() => import("./pages/EnterprisePage"));
const HealthcareServices = lazy(() => import("./pages/HealthcareServices"));
const ITADSolution = lazy(() => import("./pages/ITADSolution"));
const AdminProfileEdit = lazy(() => import("./pages/admin/AdminProfileEdit"));
const EnhancedUserDashboard = lazy(
  () => import("./pages/dashboards/EnhancedUserDashboard"),
);
const CompleteDSecureNetworkFile = lazy(
  () => import("./pages/manual/CompleteDSecureNetworkFile"),
);
const NetworkFileManualLayout = lazy(
  () => import("./pages/manual/NetworkFileManualLayout"),
);
// Network file pages - keep as namespace import since components are accessed via NetworkFilePages.ComponentName
import * as NetworkFilePages from "./pages/manual/network-file";
// [OLD CODE PRESERVED AS COMMENT]
// import FailurePage from "./pages/FailurePage";
// import FileEraserPage from "./pages/FileEraserPage";
// import DataGuardianAwardPage from "./pages/DataGuardianAwardPage";
// import CompleteDSecureDriveManual from "./pages/manual/CompleteDSecureDriveManual";

const FailurePage = lazy(() => import("./pages/FailurePage"));
const FileEraserPage = lazy(() => import("./pages/FileEraserPage"));
const DataGuardianAwardPage = lazy(
  () => import("./pages/DataGuardianAwardPage"),
);
const CompleteDSecureDriveManual = lazy(
  () => import("./pages/manual/CompleteDSecureDriveManual"),
);

const HealthcareSolutionsPage = lazy(
  () => import("./pages/solutions/HealthcareSolutionsPage"),
);
const EnterpriseSolutionsPage = lazy(
  () => import("./pages/solutions/EnterpriseSolutionsPage"),
);
const FinancialSolutionsPage = lazy(
  () => import("./pages/solutions/FinancialSolutionsPage"),
);
const ServiceProvidersSolutionsPage = lazy(
  () => import("./pages/solutions/ServiceProvidersSolutionsPage"),
);
const SearchDemoPage = lazy(() => import("./pages/SearchDemoPage"));

// Manual Pages
const InstallationPage = lazy(
  () => import("./pages/support/manual/InstallationPage"),
);
const InstallationGuideDetailed = lazy(
  () => import("./pages/manual/InstallationGuideDetailed"),
);
const SystemSetupPage = lazy(() => import("./pages/manual/SystemSetupPage"));
const WorkingWithDSecurePage = lazy(
  () => import("./pages/manual/WorkingWithDSecurePage"),
);
const DSecureFAQPage = lazy(() => import("./pages/manual/DSecureFAQPage"));
const ReportManagementPage = lazy(
  () => import("./pages/manual/ReportManagementPage"),
);
const ScheduleSettingsPage = lazy(
  () => import("./pages/manual/ScheduleSettingsPage"),
);
const HelpManualIndexPage = lazy(
  () => import("./pages/manual/HelpManualIndexPage"),
);
const CompleteDSecureManual = lazy(
  () => import("./pages/manual/CompleteDSecureManual"),
);
const FirstTimeSetupPage = lazy(
  () => import("./pages/support/manual/FirstTimeSetupPage"),
);
const UserInterfacePage = lazy(
  () => import("./pages/support/manual/UserInterfacePage"),
);
const QuickStartTutorial = lazy(
  () => import("./pages/support/manual/QuickstartPage"),
);
const OverwritePatternsPage = lazy(
  () => import("./pages/support/manual/OverwritePatternsPage"),
);
const CryptographicErasurePage = lazy(
  () => import("./pages/support/manual/CryptographicErasurePage"),
);
const PhysicalDestructionPage = lazy(
  () => import("./pages/support/manual/PhysicalDestructionPage"),
);
const VerificationMethodsPage = lazy(
  () => import("./pages/support/manual/VerificationMethodsPage"),
);
const WindowsSystemsPage = lazy(
  () => import("./pages/support/manual/WindowsSystemsPage"),
);
const MacOSSystemsPage = lazy(
  () => import("./pages/support/manual/MacOSSystemsPage"),
);
const LinuxSystemsPage = lazy(
  () => import("./pages/support/manual/LinuxSystemsPage"),
);
const CommonIssuesPage = lazy(
  () => import("./pages/support/manual/CommonIssuesPage"),
);
const ErrorCodesPage = lazy(
  () => import("./pages/support/manual/ErrorCodesPage"),
);
const MobileDevicesPage = lazy(
  () => import("./pages/support/manual/MobileDevicesPage"),
);
const EnterpriseServersPage = lazy(
  () => import("./pages/support/manual/EnterpriseServersPage"),
);
const BatchOperationsPage = lazy(
  () => import("./pages/support/manual/BatchOperationsPage"),
);
const RemoteManagementPage = lazy(
  () => import("./pages/support/manual/RemoteManagementPage"),
);
const ScriptingAutomationPage = lazy(
  () => import("./pages/support/manual/ScriptingAutomationPage"),
);
const CustomConfigurationsPage = lazy(
  () => import("./pages/support/manual/CustomConfigurationsPage"),
);
const ComplianceStandardsPage = lazy(
  () => import("./pages/support/manual/ComplianceStandardsPage"),
);
const CertificateGenerationPage = lazy(
  () => import("./pages/support/manual/CertificateGenerationPage"),
);
const AuditTrailsPage = lazy(
  () => import("./pages/support/manual/AuditTrailsPage"),
);
const ChainCustodyPage = lazy(
  () => import("./pages/support/manual/ChainCustodyPage"),
);
const PerformanceOptimizationPage = lazy(
  () => import("./pages/support/manual/PerformanceOptimizationPage"),
);
const RecoveryProceduresPage = lazy(
  () => import("./pages/support/manual/RecoveryProceduresPage"),
);
const WindowsIntroductionPage = lazy(
  () => import("./pages/support/manual/WindowsIntroductionPage"),
);
const WindowsBuiltinToolsPage = lazy(
  () => import("./pages/support/manual/WindowsBuiltinToolsPage"),
);

const WindowsStoragePage = lazy(
  () => import("./pages/support/manual/WindowsStoragePage"),
);
const WindowsPreparationPage = lazy(
  () => import("./pages/support/manual/WindowsPreparationPage"),
);
const WindowsTroubleshootingPage = lazy(
  () => import("./pages/support/manual/WindowsTroubleshootingPage"),
);
const WindowsEnterprisePage = lazy(
  () => import("./pages/support/manual/WindowsEnterprisePage"),
);
const WindowsRisksPage = lazy(
  () => import("./pages/support/manual/WindowsRisksPage"),
);
const WindowsFilesystemsPage = lazy(
  () => import("./pages/support/manual/WindowsFilesystemsPage"),
);
const WindowsSystemFilesPage = lazy(
  () => import("./pages/support/manual/WindowsSystemFilesPage"),
);
const WindowsResidualDataPage = lazy(
  () => import("./pages/support/manual/WindowsResidualDataPage"),
);
const WindowsSoftwareErasurePage = lazy(
  () => import("./pages/support/manual/WindowsSoftwareErasurePage"),
);
const WindowsCryptoErasurePage = lazy(
  () => import("./pages/support/manual/WindowsCryptoErasurePage"),
);
const WindowsMethodsComparisonPage = lazy(
  () => import("./pages/support/manual/WindowsMethodsComparisonPage"),
);
const WindowsCommandLinePage = lazy(
  () => import("./pages/support/manual/WindowsCommandLinePage"),
);
const PreInstallationPage = lazy(
  () => import("./pages/support/manual/PreInstallationPage"),
);
const DownloadInstallerPage = lazy(
  () => import("./pages/support/manual/DownloadInstallerPage"),
);
const LicenseActivationPage = lazy(
  () => import("./pages/support/manual/LicenseActivationPage"),
);
const InstallationSettingsPage = lazy(
  () => import("./pages/support/manual/InstallationSettingsPage"),
);
const InstallationProgressPage = lazy(
  () => import("./pages/support/manual/InstallationProgressPage"),
);
const SystemRequirementsPage = lazy(
  () => import("./pages/support/manual/SystemRequirementsPage"),
);
const SetupWizardPage = lazy(
  () => import("./pages/support/manual/SetupWizardPage"),
);
const FirstScanPage = lazy(
  () => import("./pages/support/manual/FirstScanPage"),
);
const KeyActivationPage = lazy(
  () => import("./pages/support/manual/KeyActivationPage"),
);
const FirewallSetupPage = lazy(
  () => import("./pages/support/manual/FirewallSetupPage"),
);
const MainDashboardPage = lazy(
  () => import("./pages/support/manual/MainDashboardPage"),
);
const NavigationPage = lazy(
  () => import("./pages/support/manual/NavigationPage"),
);
const StatusIndicatorsPage = lazy(
  () => import("./pages/support/manual/StatusIndicatorsPage"),
);
const DeviceSelectionPage = lazy(
  () => import("./pages/support/manual/DeviceSelectionPage"),
);
const StartErasurePage = lazy(
  () => import("./pages/support/manual/StartErasurePage"),
);
const ProgressMonitoringPage = lazy(
  () => import("./pages/support/manual/ProgressMonitoringPage"),
);
const EnterpriseIntegrationPage = lazy(
  () => import("./pages/support/manual/EnterpriseIntegrationPage"),
);
const UserManagementPage = lazy(
  () => import("./pages/support/manual/UserManagementPage"),
);
const ErasurePreferencesPage = lazy(
  () => import("./pages/support/manual/ErasurePreferencesPage"),
);
const ErasureReportsPage = lazy(
  () => import("./pages/support/manual/ErasureReportsPage"),
);
const GeneralSettingsPage = lazy(
  () => import("./pages/support/manual/GeneralSettingsPage"),
);
const CustomDashboardsPage = lazy(
  () => import("./pages/support/manual/CustomDashboardsPage"),
);
const ComplianceExportPage = lazy(
  () => import("./pages/support/manual/ComplianceExportPage"),
);
const OperationHistoryPage = lazy(
  () => import("./pages/support/manual/OperationHistoryPage"),
);
const ApiIntegrationPage = lazy(
  () => import("./pages/support/manual/ApiIntegrationPage"),
);
const KeyboardShortcutsPage = lazy(
  () => import("./pages/support/manual/KeyboardShortcutsPage"),
);
const VerificationOverviewPage = lazy(
  () => import("./pages/support/manual/VerificationOverviewPage"),
);

const ReadbackVerificationPage = lazy(
  () => import("./pages/support/manual/ReadbackVerificationPage"),
);
const Nist80088Page = lazy(
  () => import("./pages/support/manual/Nist80088Page"),
);
const AccessVerificationPage = lazy(
  () => import("./pages/support/manual/AccessVerificationPage"),
);
const ActivationKeyPage = lazy(
  () => import("./pages/support/manual/ActivationKeyPage"),
);
const AuditPreparationPage = lazy(
  () => import("./pages/support/manual/AuditPreparationPage"),
);
const AuditVerificationPage = lazy(
  () => import("./pages/support/manual/AuditVerificationPage"),
);
const AutoUpdatesPage = lazy(
  () => import("./pages/support/manual/AutoUpdatesPage"),
);
const BankingFinancePage = lazy(
  () => import("./pages/support/manual/BankingFinancePage"),
);
const BankingModePage = lazy(
  () => import("./pages/support/manual/BankingModePage"),
);
const BestPracticesPage = lazy(
  () => import("./pages/support/manual/BestPracticesPage"),
);
const BitraserIntegrationPage = lazy(
  () => import("./pages/support/manual/BitraserIntegrationPage"),
);
const CertificateDestructionPage = lazy(
  () => import("./pages/support/manual/CertificateDestructionPage"),
);
const CloudConsolePage = lazy(
  () => import("./pages/support/manual/CloudConsolePage"),
);
const ComparisonTablePage = lazy(
  () => import("./pages/support/manual/ComparisonTablePage"),
);
const CrushingMethodPage = lazy(
  () => import("./pages/support/manual/CrushingMethodPage"),
);
const CryptoBenefitsPage = lazy(
  () => import("./pages/support/manual/CryptoBenefitsPage"),
);
const CryptoImportancePage = lazy(
  () => import("./pages/support/manual/CryptoImportancePage"),
);
const CryptoProcessPage = lazy(
  () => import("./pages/support/manual/CryptoProcessPage"),
);
const CryptoVerificationPage = lazy(
  () => import("./pages/support/manual/CryptoVerificationPage"),
);
const CustomAlgorithmsPage = lazy(
  () => import("./pages/support/manual/CustomAlgorithmsPage"),
);
const DegaussingMethodPage = lazy(
  () => import("./pages/support/manual/DegaussingMethodPage"),
);
const DestructionQualityPage = lazy(
  () => import("./pages/support/manual/DestructionQualityPage"),
);
const DestructionStandardsPage = lazy(
  () => import("./pages/support/manual/DestructionStandardsPage"),
);
const DestructionUseCasesPage = lazy(
  () => import("./pages/support/manual/DestructionUseCasesPage"),
);
const DodStandardsPage = lazy(
  () => import("./pages/support/manual/DodStandardsPage"),
);
const Dod3passPage = lazy(() => import("./pages/support/manual/Dod3passPage"));
const Dod7passPage = lazy(() => import("./pages/support/manual/Dod7passPage"));
const EnterpriseBenefitsPage = lazy(
  () => import("./pages/support/manual/EnterpriseBenefitsPage"),
);
const EnvironmentalConsiderationsPage = lazy(
  () => import("./pages/support/manual/EnvironmentalConsiderationsPage"),
);
const EnvironmentalImpactPage = lazy(
  () => import("./pages/support/manual/EnvironmentalImpactPage"),
);
const ErasureProcessPage = lazy(
  () => import("./pages/support/manual/ErasureProcessPage"),
);
const FaqsPage = lazy(() => import("./pages/support/manual/FaqsPage"));
const FinancialVerificationPage = lazy(
  () => import("./pages/support/manual/FinancialVerificationPage"),
);
const FirewallConfigPage = lazy(
  () => import("./pages/support/manual/FirewallConfigPage"),
);
const FirstRunPage = lazy(() => import("./pages/support/manual/FirstRunPage"));
const FragmentVerificationPage = lazy(
  () => import("./pages/support/manual/FragmentVerificationPage"),
);
const FutureTrendsPage = lazy(
  () => import("./pages/support/manual/FutureTrendsPage"),
);
const GdprVerificationPage = lazy(
  () => import("./pages/support/manual/GdprVerificationPage"),
);
const GovernmentDefensePage = lazy(
  () => import("./pages/support/manual/GovernmentDefensePage"),
);
const GovernmentVerificationPage = lazy(
  () => import("./pages/support/manual/GovernmentVerificationPage"),
);
const HardwareSanitizationPage = lazy(
  () => import("./pages/support/manual/HardwareSanitizationPage"),
);
const HddDestructionPage = lazy(
  () => import("./pages/support/manual/HddDestructionPage"),
);
const HealthcareDestructionPage = lazy(
  () => import("./pages/support/manual/HealthcareDestructionPage"),
);
const HealthcareVerificationPage = lazy(
  () => import("./pages/support/manual/HealthcareVerificationPage"),
);
const ImplementationConsiderationsPage = lazy(
  () => import("./pages/support/manual/ImplementationConsiderationsPage"),
);
const ImplementationPracticesPage = lazy(
  () => import("./pages/support/manual/ImplementationPracticesPage"),
);
const IncinerationMethodPage = lazy(
  () => import("./pages/support/manual/IncinerationMethodPage"),
);
const IndustryApplicationsPage = lazy(
  () => import("./pages/support/manual/IndustryApplicationsPage"),
);
const IndustryUseCasesPage = lazy(
  () => import("./pages/support/manual/IndustryUseCasesPage"),
);
const InstallationPathPage = lazy(
  () => import("./pages/support/manual/InstallationPathPage"),
);
const InternetRequirementsPage = lazy(
  () => import("./pages/support/manual/InternetRequirementsPage"),
);
const ItadDatacentersPage = lazy(
  () => import("./pages/support/manual/ItadDatacentersPage"),
);
const KeyDestructionVerifyPage = lazy(
  () => import("./pages/support/manual/KeyDestructionVerifyPage"),
);
const LicenseAgreementPage = lazy(
  () => import("./pages/support/manual/LicenseAgreementPage"),
);
const LicenseTroubleshootingPage = lazy(
  () => import("./pages/support/manual/LicenseTroubleshootingPage"),
);
const LimitationsPage = lazy(
  () => import("./pages/support/manual/LimitationsPage"),
);
const MacosAppleSiliconPage = lazy(
  () => import("./pages/support/manual/MacosAppleSiliconPage"),
);
const MacosArchitecturePage = lazy(
  () => import("./pages/support/manual/MacosArchitecturePage"),
);
const MacosBestPracticesPage = lazy(
  () => import("./pages/support/manual/MacosBestPracticesPage"),
);
const MacosBuiltinToolsPage = lazy(
  () => import("./pages/support/manual/MacosBuiltinToolsPage"),
);
const MacosCompliancePage = lazy(
  () => import("./pages/support/manual/MacosCompliancePage"),
);
const MacosCryptoErasurePage = lazy(
  () => import("./pages/support/manual/MacosCryptoErasurePage"),
);
const MacosEncryptionPage = lazy(
  () => import("./pages/support/manual/MacosEncryptionPage"),
);
const MacosEnterprisePage = lazy(
  () => import("./pages/support/manual/MacosEnterprisePage"),
);
const MacosExternalMediaPage = lazy(
  () => import("./pages/support/manual/MacosExternalMediaPage"),
);
const MacosFaqPage = lazy(() => import("./pages/support/manual/MacosFaqPage"));
const MacosFilesystemsPage = lazy(
  () => import("./pages/support/manual/MacosFilesystemsPage"),
);
const MacosFilevaultPage = lazy(
  () => import("./pages/support/manual/MacosFilevaultPage"),
);
const MacosIntelProceduresPage = lazy(
  () => import("./pages/support/manual/MacosIntelProceduresPage"),
);
const MacosIntroductionPage = lazy(
  () => import("./pages/support/manual/MacosIntroductionPage"),
);
const MacosMethodsComparisonPage = lazy(
  () => import("./pages/support/manual/MacosMethodsComparisonPage"),
);
const MacosPreparationPage = lazy(
  () => import("./pages/support/manual/MacosPreparationPage"),
);
const MacosResourcesPage = lazy(
  () => import("./pages/support/manual/MacosResourcesPage"),
);
const MacosRisksPage = lazy(
  () => import("./pages/support/manual/MacosRisksPage"),
);
const MacosSoftwareErasurePage = lazy(
  () => import("./pages/support/manual/MacosSoftwareErasurePage"),
);
const MacosSsdConsiderationsPage = lazy(
  () => import("./pages/support/manual/MacosSsdConsiderationsPage"),
);
const MacosStoragePage = lazy(
  () => import("./pages/support/manual/MacosStoragePage"),
);
const MacosSystemDrivePage = lazy(
  () => import("./pages/support/manual/MacosSystemDrivePage"),
);
const MacosThirdPartyPage = lazy(
  () => import("./pages/support/manual/MacosThirdPartyPage"),
);
const MacosToolSelectionPage = lazy(
  () => import("./pages/support/manual/MacosToolSelectionPage"),
);
const MacosTroubleshootingPage = lazy(
  () => import("./pages/support/manual/MacosTroubleshootingPage"),
);
const MacosVerificationPage = lazy(
  () => import("./pages/support/manual/MacosVerificationPage"),
);
const MobileDestructionPage = lazy(
  () => import("./pages/support/manual/MobileDestructionPage"),
);
const NistGuidelinesPage = lazy(
  () => import("./pages/support/manual/NistGuidelinesPage"),
);
const NistModernStoragePage = lazy(
  () => import("./pages/support/manual/NistModernStoragePage"),
);
const OnsiteOffsitePage = lazy(
  () => import("./pages/support/manual/OnsiteOffsitePage"),
);
const OpticalTapeDestructionPage = lazy(
  () => import("./pages/support/manual/OpticalTapeDestructionPage"),
);
const OverwriteIntroductionPage = lazy(
  () => import("./pages/support/manual/OverwriteIntroductionPage"),
);
const OverwriteRisksPage = lazy(
  () => import("./pages/support/manual/OverwriteRisksPage"),
);
const ParentalControlsPage = lazy(
  () => import("./pages/support/manual/ParentalControlsPage"),
);
const PatternSelectionPage = lazy(
  () => import("./pages/support/manual/PatternSelectionPage"),
);
const PerformanceAnalysisPage = lazy(
  () => import("./pages/support/manual/PerformanceAnalysisPage"),
);
const PerformanceTradeoffsPage = lazy(
  () => import("./pages/support/manual/PerformanceTradeoffsPage"),
);
const PerformanceTroubleshootingPage = lazy(
  () => import("./pages/support/manual/PerformanceTroubleshootingPage"),
);
const PerformanceTuningPage = lazy(
  () => import("./pages/support/manual/PerformanceTuningPage"),
);
const PhysicalDestructionOverviewPage = lazy(
  () => import("./pages/support/manual/PhysicalDestructionOverviewPage"),
);
const PhysicalInspectionPage = lazy(
  () => import("./pages/support/manual/PhysicalInspectionPage"),
);
const PostInstallOptimizationPage = lazy(
  () => import("./pages/support/manual/PostInstallOptimizationPage"),
);
const RealTimeMonitoringPage = lazy(
  () => import("./pages/support/manual/RealTimeMonitoringPage"),
);
const RealtimeProtectionPage = lazy(
  () => import("./pages/support/manual/RealtimeProtectionPage"),
);
const RegulatoryCompliancePage = lazy(
  () => import("./pages/support/manual/RegulatoryCompliancePage"),
);
const SamplingMethodologyPage = lazy(
  () => import("./pages/support/manual/SamplingMethodologyPage"),
);
const SanitizationConceptsPage = lazy(
  () => import("./pages/support/manual/SanitizationConceptsPage"),
);
const ScanExclusionsPage = lazy(
  () => import("./pages/support/manual/ScanExclusionsPage"),
);
const ScanResultsPage = lazy(
  () => import("./pages/support/manual/ScanResultsPage"),
);
const ScanSchedulingPage = lazy(
  () => import("./pages/support/manual/ScanSchedulingPage"),
);
const SecurityAssurancePage = lazy(
  () => import("./pages/support/manual/SecurityAssurancePage"),
);
const SecurityProtocolsPage = lazy(
  () => import("./pages/support/manual/SecurityProtocolsPage"),
);
const ServiceWorkflowPage = lazy(
  () => import("./pages/support/manual/ServiceWorkflowPage"),
);
const ShreddingMethodPage = lazy(
  () => import("./pages/support/manual/ShreddingMethodPage"),
);
const SoftwareSupportedMediaPage = lazy(
  () => import("./pages/support/manual/SoftwareSupportedMediaPage"),
);
const SoftwareVerificationPage = lazy(
  () => import("./pages/support/manual/SoftwareVerificationPage"),
);
const SsdChallengesPage = lazy(
  () => import("./pages/support/manual/SsdChallengesPage"),
);
const SsdDestructionPage = lazy(
  () => import("./pages/support/manual/SsdDestructionPage"),
);
const StandardsComparisonPage = lazy(
  () => import("./pages/support/manual/StandardsComparisonPage"),
);
const StatisticalConfidencePage = lazy(
  () => import("./pages/support/manual/StatisticalConfidencePage"),
);
const SupportedDevicesPage = lazy(
  () => import("./pages/support/manual/SupportedDevicesPage"),
);
const SupportedEncryptionPage = lazy(
  () => import("./pages/support/manual/SupportedEncryptionPage"),
);
const SystemScanningPage = lazy(
  () => import("./pages/support/manual/SystemScanningPage"),
);
const UseCasesPage = lazy(() => import("./pages/support/manual/UseCasesPage"));
const UserProfilePage = lazy(
  () => import("./pages/support/manual/UserProfilePage"),
);
const VerificationChallengesPage = lazy(
  () => import("./pages/support/manual/VerificationChallengesPage"),
);
const VerificationImportancePage = lazy(
  () => import("./pages/support/manual/VerificationImportancePage"),
);
const VerificationLogsPage = lazy(
  () => import("./pages/support/manual/VerificationLogsPage"),
);
const VerificationRisksPage = lazy(
  () => import("./pages/support/manual/VerificationRisksPage"),
);
const VerificationStandardsPage = lazy(
  () => import("./pages/support/manual/VerificationStandardsPage"),
);
const VerificationTechniquesPage = lazy(
  () => import("./pages/support/manual/VerificationTechniquesPage"),
);
const VerificationToolsPage = lazy(
  () => import("./pages/support/manual/VerificationToolsPage"),
);
const VirusDefinitionsPage = lazy(
  () => import("./pages/support/manual/VirusDefinitionsPage"),
);
const VisualConfirmationPage = lazy(
  () => import("./pages/support/manual/VisualConfirmationPage"),
);
const VpnSetupPage = lazy(() => import("./pages/support/manual/VpnSetupPage"));
const WhyPhysicalDestructionPage = lazy(
  () => import("./pages/support/manual/WhyPhysicalDestructionPage"),
);
const WindowsBestPracticesPage = lazy(
  () => import("./pages/support/manual/WindowsBestPracticesPage"),
);
const WindowsBitlockerPage = lazy(
  () => import("./pages/support/manual/WindowsBitlockerPage"),
);
const WindowsBootableUsbPage = lazy(
  () => import("./pages/support/manual/WindowsBootableUsbPage"),
);
const WindowsCompliancePage = lazy(
  () => import("./pages/support/manual/WindowsCompliancePage"),
);
const WindowsDsecureEraserPage = lazy(
  () => import("./pages/support/manual/WindowsDsecureEraserPage"),
);
const WindowsFaqPage = lazy(
  () => import("./pages/support/manual/WindowsFaqPage"),
);
const WindowsResourcesPage = lazy(
  () => import("./pages/support/manual/WindowsResourcesPage"),
);
const WindowsSedDrivesPage = lazy(
  () => import("./pages/support/manual/WindowsSedDrivesPage"),
);
const WindowsSsdErasurePage = lazy(
  () => import("./pages/support/manual/WindowsSsdErasurePage"),
);
const WindowsThirdPartyPage = lazy(
  () => import("./pages/support/manual/WindowsThirdPartyPage"),
);
const WindowsVerificationPage = lazy(
  () => import("./pages/support/manual/WindowsVerificationPage"),
);

// Support pages
const FAQsPage = lazy(() => import("./pages/support/FAQsPage"));
const KnowledgeBasePage = lazy(
  () => import("./pages/support/KnowledgeBasePage"),
);
const GetStartedPage = lazy(() => import("./pages/support/GetStartedPage"));
const HelpManualPage = lazy(() => import("./pages/support/HelpManualPage"));
const ProductVideosPage = lazy(
  () => import("./pages/support/ProductVideosPage"),
);

// Blog pages
// Blog pages
const BlogPage = lazy(() => import("./components/blog/BlogPage"));
const OverwriteGuideBlog = lazy(
  () => import("./components/blog/OverwriteGuideBlog"),
);
const SSDWipeGuideBlog = lazy(
  () => import("./components/blog/SSDWipeGuideBlog"),
);
const ErasureVsDestructionBlog = lazy(
  () => import("./components/blog/ErasureVsDestructionBlog"),
);
const DataDeletionMythsBlog = lazy(
  () => import("./components/blog/DataDeletionMythsBlog"),
);
const DataSanitizationComplianceBlog = lazy(
  () => import("./components/blog/DataSanitizationComplianceBlog"),
);

// New Blog Pages
const BestErasureMethodBlog = lazy(
  () => import("./components/blog/BestErasureMethodBlog"),
);
const ErasureBestPracticesBlog = lazy(
  () => import("./components/blog/ErasureBestPracticesBlog"),
);
const AutomatedErasureBlog = lazy(
  () => import("./components/blog/AutomatedErasureBlog"),
);
const MobileErasureGuideBlog = lazy(
  () => import("./components/blog/MobileErasureGuideBlog"),
);
const ZeroTrustDisposalBlog = lazy(
  () => import("./components/blog/ZeroTrustDisposalBlog"),
);
const MSPSecurityBlog = lazy(() => import("./components/blog/MSPSecurityBlog"));
const SECComplianceBlog = lazy(
  () => import("./components/blog/SECComplianceBlog"),
);
const ITAMDisposalGuideBlog = lazy(
  () => import("./components/blog/ITAMDisposalGuideBlog"),
);
const DataHoardingRisksBlog = lazy(
  () => import("./components/blog/DataHoardingRisksBlog"),
);
const ShadowDataRisksBlog = lazy(
  () => import("./components/blog/ShadowDataRisksBlog"),
);
const ESGDataErasureBlog = lazy(
  () => import("./components/blog/ESGDataErasureBlog"),
);
const SustainableITReuseBlog = lazy(
  () => import("./components/blog/SustainableITReuseBlog"),
);
const CarbonFootprintErasureBlog = lazy(
  () => import("./components/blog/CarbonFootprintErasureBlog"),
);
const Scope3EmissionsBlog = lazy(
  () => import("./components/blog/Scope3EmissionsBlog"),
);
const ErasureVerificationBlog = lazy(
  () => import("./components/blog/ErasureVerificationBlog"),
);
const HardwareDiagnosticsBlog = lazy(
  () => import("./components/blog/HardwareDiagnosticsBlog"),
);
const DataMinimizationBlog = lazy(
  () => import("./components/blog/DataMinimizationBlog"),
);
const GovDeviceTheftBlog = lazy(
  () => import("./components/blog/GovDeviceTheftBlog"),
);
const ITADSelectionGuideBlog = lazy(
  () => import("./components/blog/ITADSelectionGuideBlog"),
);
const BrandReputationESGBlog = lazy(
  () => import("./components/blog/BrandReputationESGBlog"),
);
const MSPDataErasureBlog = lazy(
  () => import("./components/blog/MSPDataErasureBlog"),
);
const CryptographicEraseNISTBlog = lazy(
  () => import("./components/blog/CryptographicEraseNISTBlog"),
);
const SecurePHIePHIErasureBlog = lazy(
  () => import("./components/blog/SecurePHIePHIErasureBlog"),
);
const StatutoryRegulatoryComplianceDataErasureBlog = lazy(
  () =>
    import("./components/blog/StatutoryRegulatoryComplianceDataErasureBlog"),
);
const LegalEthicalDataErasureBlog = lazy(
  () => import("./components/blog/LegalEthicalDataErasureBlog"),
);
const CaptionCallFCCSettlementBlog = lazy(
  () => import("./components/blog/CaptionCallFCCSettlementBlog"),
);
const HardwareDiagnosticsITADComplianceBlog = lazy(
  () => import("./components/blog/HardwareDiagnosticsITADComplianceBlog"),
);
const FutureOfDataDestructionBlog = lazy(
  () => import("./components/blog/FutureOfDataDestructionBlog"),
);
const DoDVsIEEEDataSanitizationBlog = lazy(
  () => import("./components/blog/DoDVsIEEEDataSanitizationBlog"),
);
const RemoteWorkDataErasureBestPracticesBlog = lazy(
  () => import("./components/blog/RemoteWorkDataErasureBestPracticesBlog"),
);
const NCUAThirdPartyDataDisposalBlog = lazy(
  () => import("./components/blog/NCUAThirdPartyDataDisposalBlog"),
);
const MSPErasureAsAServiceBlog = lazy(
  () => import("./components/blog/MSPErasureAsAServiceBlog"),
);
const DellDataWipeVsDSecureBlog = lazy(
  () => import("./components/blog/DellDataWipeVsDSecureBlog"),
);
const CommonCriteriaCertifiedDataWipingBlog = lazy(
  () => import("./components/blog/CommonCriteriaCertifiedDataWipingBlog"),
);
const ErasureAsAServiceDSecureBlog = lazy(
  () => import("./components/blog/ErasureAsAServiceDSecureBlog"),
);
const ReturningLeasedITHardwareDosAndDontsBlog = lazy(
  () => import("./components/blog/ReturningLeasedITHardwareDosAndDonts"),
);
const HealthcareRansomwareLessonsBlog = lazy(
  () => import("./components/blog/HealthcareRansomwareLessonsBlog"),
);
const MacM1ErasureKnownIssuesBlog = lazy(
  () => import("./components/blog/MacM1ErasureKnownIssues"),
);
const WipeSSDFromBIOSGuideBlog = lazy(
  () => import("./components/blog/WipeSSDFromBIOSGuide"),
);
const DataErasureForNonProfitsBlog = lazy(
  () => import("./components/blog/DataErasureForNonProfits"),
);
const EraseMacDataSafelyUsingDSecureBlog = lazy(
  () => import("./components/blog/EraseMacDataSafelyUsingDSecureBlog"),
);
const EraseDataPcLaptopDesktopBlog = lazy(
  () => import("./components/blog/EraseDataPcLaptopDesktopBlog"),
);

// Newly copied blog pages
const CCPAViolationBlog = lazy(
  () => import("./components/blog/CCPAViolationBlog"),
);
const CertifiedITADReasonsBlog = lazy(
  () => import("./components/blog/CertifiedITADReasonsBlog"),
);
const ChainOfCustodyBlog = lazy(
  () => import("./components/blog/ChainOfCustodyBlog"),
);
const ChangeHealthcareAttackBlog = lazy(
  () => import("./components/blog/ChangeHealthcareAttackBlog"),
);
const ChromebookDataRisksBlog = lazy(
  () => import("./components/blog/ChromebookDataRisksBlog"),
);
const CloudMigrationBlog = lazy(
  () => import("./components/blog/CloudMigrationBlog"),
);
const CommonCriteriaBlog = lazy(
  () => import("./components/blog/CommonCriteriaBlog"),
);
const CorporateITAssetRisksBlog = lazy(
  () => import("./components/blog/CorporateITAssetRisksBlog"),
);
const CryptographicEraseBlog = lazy(
  () => import("./components/blog/CryptographicEraseBlog"),
);
const CybersecurityDataDestructionBlog = lazy(
  () => import("./components/blog/CybersecurityDataDestructionBlog"),
);
const DSecureOperationsBlog = lazy(
  () => import("./components/blog/DSecureOperationsBlog"),
);
const DarkDataRisksBlog = lazy(
  () => import("./components/blog/DarkDataRisksBlog"),
);
const DataDestructionBestPracticesBlog = lazy(
  () => import("./components/blog/DataDestructionBestPracticesBlog"),
);
const DataDisposalGuidelinesBlog = lazy(
  () => import("./components/blog/DataDisposalGuidelinesBlog"),
);
const DataErasureDisasterRecoveryBlog = lazy(
  () => import("./components/blog/DataErasureDisasterRecoveryBlog"),
);
const DataErasureMythsBlog = lazy(
  () => import("./components/blog/DataErasureMythsBlog"),
);
const DataHoardingBlog = lazy(
  () => import("./components/blog/DataHoardingBlog"),
);
const DataPrivacyObligationsBlog = lazy(
  () => import("./components/blog/DataPrivacyObligationsBlog"),
);
const DataRemanenceBlog = lazy(
  () => import("./components/blog/DataRemanenceBlog"),
);
const DataRemediationErasureBlog = lazy(
  () => import("./components/blog/DataRemediationErasureBlog"),
);
const DataRetentionPrivacyBlog = lazy(
  () => import("./components/blog/DataRetentionPrivacyBlog"),
);
const DegaussingRisksBlog = lazy(
  () => import("./components/blog/DegaussingRisksBlog"),
);
const DeletedFilesTruthBlog = lazy(
  () => import("./components/blog/DeletedFilesTruthBlog"),
);
const DeletionVsErasureBlog = lazy(
  () => import("./components/blog/DeletionVsErasureBlog"),
);
const DellDataWipeAlternativeBlog = lazy(
  () => import("./components/blog/DellDataWipeAlternativeBlog"),
);
const DeploymentOptionsBlog = lazy(
  () => import("./components/blog/DeploymentOptionsBlog"),
);
const DiagnosticsErasureITADBlog = lazy(
  () => import("./components/blog/DiagnosticsErasureITADBlog"),
);
const DigitalDivideBlog = lazy(
  () => import("./components/blog/DigitalDivideBlog"),
);
const DoDVsIEEEBlog = lazy(() => import("./components/blog/DoDVsIEEEBlog"));
const DoDWipingStandardBlog = lazy(
  () => import("./components/blog/DoDWipingStandardBlog"),
);
const DumpsterDivingDataBreachBlog = lazy(
  () => import("./components/blog/DumpsterDivingDataBreachBlog"),
);
const ESGReportBlog = lazy(() => import("./components/blog/ESGReportBlog"));
const EUCSRDBlog = lazy(() => import("./components/blog/EUCSRDBlog"));
const EducationDataDestructionBlog = lazy(
  () => import("./components/blog/EducationDataDestructionBlog"),
);
const EndOfLifeDataSecurityBlog = lazy(
  () => import("./components/blog/EndOfLifeDataSecurityBlog"),
);
const ErasureVerificationBlogNew = lazy(
  () => import("./components/blog/ErasureVerificationBlog"),
);
const FinancialDataBreachCaseStudyBlog = lazy(
  () => import("./components/blog/FinancialDataBreachCaseStudyBlog"),
);
const FreeVsProEraserBlog = lazy(
  () => import("./components/blog/FreeVsProEraserBlog"),
);
const FutureDataDestructionBlog = lazy(
  () => import("./components/blog/FutureDataDestructionBlog"),
);
const GDPRSevenYearsBlog = lazy(
  () => import("./components/blog/GDPRSevenYearsBlog"),
);
const GovernmentDeviceTheftBlog = lazy(
  () => import("./components/blog/GovernmentDeviceTheftBlog"),
);
const GovernmentITDisposalBlog = lazy(
  () => import("./components/blog/GovernmentITDisposalBlog"),
);
const GreenITPracticesBlog = lazy(
  () => import("./components/blog/GreenITPracticesBlog"),
);
const HIPAAComplianceErasureBlog = lazy(
  () => import("./components/blog/HIPAAComplianceErasureBlog"),
);
const HardwareDiagnosticsBlogNew = lazy(
  () => import("./components/blog/HardwareDiagnosticsBlog"),
);
const HealthcareDataBreachCaseStudyBlog = lazy(
  () => import("./components/blog/HealthcareDataBreachCaseStudyBlog"),
);
const HexViewerBlog = lazy(() => import("./components/blog/HexViewerBlog"));
const HiddenDiskAreasBlog = lazy(
  () => import("./components/blog/HiddenDiskAreasBlog"),
);
const HowToEraseMacBlog = lazy(
  () => import("./components/blog/HowToEraseMacBlog"),
);
const IPadTabletErasureBlog = lazy(
  () => import("./components/blog/IPadTabletErasureBlog"),
);
const ITADChallengesBlog = lazy(
  () => import("./components/blog/ITADChallengesBlog"),
);
const ITADEnvironmentalBlog = lazy(
  () => import("./components/blog/ITADEnvironmentalBlog"),
);
const ITADMarketGrowthBlog = lazy(
  () => import("./components/blog/ITADMarketGrowthBlog"),
);
const ITADProcurementBlog = lazy(
  () => import("./components/blog/ITADProcurementBlog"),
);
const ITAMDataBreachBlog = lazy(
  () => import("./components/blog/ITAMDataBreachBlog"),
);
const ITAssetLifecycleBlog = lazy(
  () => import("./components/blog/ITAssetLifecycleBlog"),
);
const ITAssetReuseBlog = lazy(
  () => import("./components/blog/ITAssetReuseBlog"),
);
const LegalEthicalErasureBlog = lazy(
  () => import("./components/blog/LegalEthicalErasureBlog"),
);
const LooseDrivesErasureGuideBlog = lazy(
  () => import("./components/blog/LooseDrivesErasureGuideBlog"),
);
const M1MacErasureIssuesBlog = lazy(
  () => import("./components/blog/M1MacErasureIssuesBlog"),
);
const MDMDetectionBlog = lazy(
  () => import("./components/blog/MDMDetectionBlog"),
);
const MSPErasureServiceBlog = lazy(
  () => import("./components/blog/MSPErasureServiceBlog"),
);
const MarriottSettlementBlog = lazy(
  () => import("./components/blog/MarriottSettlementBlog"),
);
const MediaSanitizationNeedBlog = lazy(
  () => import("./components/blog/MediaSanitizationNeedBlog"),
);
const MobileDiagnosticsBenefitsBlog = lazy(
  () => import("./components/blog/MobileDiagnosticsBenefitsBlog"),
);
const MobileDiagnosticsRevolutionBlog = lazy(
  () => import("./components/blog/MobileDiagnosticsRevolutionBlog"),
);
const MorganStanleyDataBreachBlog = lazy(
  () => import("./components/blog/MorganStanleyDataBreachBlog"),
);
const MorganStanleyFineBlog = lazy(
  () => import("./components/blog/MorganStanleyFineBlog"),
);
const NCUAGuidelinesBlog = lazy(
  () => import("./components/blog/NCUAGuidelinesBlog"),
);
const NISTClearPurgeBlog = lazy(
  () => import("./components/blog/NISTClearPurgeBlog"),
);
const NISTTestedErasureSoftwareBlog = lazy(
  () => import("./components/blog/NISTTestedErasureSoftwareBlog"),
);
const NISTVsIEEEBlog = lazy(() => import("./components/blog/NISTVsIEEEBlog"));
const OnsiteVsOffsiteDestructionBlog = lazy(
  () => import("./components/blog/OnsiteVsOffsiteDestructionBlog"),
);
const PHIErasureBlog = lazy(() => import("./components/blog/PHIErasureBlog"));
const PIIDisposalBreachBlog = lazy(
  () => import("./components/blog/PIIDisposalBreachBlog"),
);
const PostCovidDataDisposalBlog = lazy(
  () => import("./components/blog/PostCovidDataDisposalBlog"),
);
const PrivateCloudBlog = lazy(
  () => import("./components/blog/PrivateCloudBlog"),
);
const RemoteWipingSoftwareBlog = lazy(
  () => import("./components/blog/RemoteWipingSoftwareBlog"),
);
const RemoteWorkDataErasureBlog = lazy(
  () => import("./components/blog/RemoteWorkDataErasureBlog"),
);
const ResellerProfitsBlog = lazy(
  () => import("./components/blog/ResellerProfitsBlog"),
);
const RightToRepairBlog = lazy(
  () => import("./components/blog/RightToRepairBlog"),
);
const SSDWipeBIOSBlog = lazy(() => import("./components/blog/SSDWipeBIOSBlog"));
const SecureFileEraseBlog = lazy(
  () => import("./components/blog/SecureFileEraseBlog"),
);
const SecureHDDDisposalBlog = lazy(
  () => import("./components/blog/SecureHDDDisposalBlog"),
);
const SecureITAssetDisposalBlog = lazy(
  () => import("./components/blog/SecureITAssetDisposalBlog"),
);
const SecureSmartphoneErasureBlog = lazy(
  () => import("./components/blog/SecureSmartphoneErasureBlog"),
);
const ServerErasureBlog = lazy(
  () => import("./components/blog/ServerErasureBlog"),
);
const ShadowDataBlog = lazy(() => import("./components/blog/ShadowDataBlog"));
const StatutoryComplianceBlog = lazy(
  () => import("./components/blog/StatutoryComplianceBlog"),
);
const UltratestComparisonBlog = lazy(
  () => import("./components/blog/UltratestComparisonBlog"),
);
const VMErasureBlog = lazy(() => import("./components/blog/VMErasureBlog"));
const Windows10EOSBlog = lazy(
  () => import("./components/blog/Windows10EOSBlog"),
);
const WipeComputerDonatingBlog = lazy(
  () => import("./components/blog/WipeComputerDonatingBlog"),
);
const WorldClassNPSBlog = lazy(
  () => import("./components/blog/WorldClassNPSBlog"),
);
const CaptionCallSettlementBlog = lazy(
  () => import("./components/blog/CaptionCallSettlementBlog"),
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
                  <Route element={<MainLayout />}>
                    {/* Core Routes */}
                    <Route index element={<HomePage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="products" element={<ProductPage />} />

                    {/* Services */}
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
                    <Route path="solutions/itad" element={<ITADSolution />} />
                    <Route
                      path="solutions/education"
                      element={<EducationPage />}
                    />
                    <Route
                      path="solutions/financial"
                      element={<FinancialSolutionsPage />}
                    />
                    <Route
                      path="solutions/financial-services"
                      element={<FinancialServices />}
                    />
                    <Route
                      path="solutions/government"
                      element={<GovernmentPage />}
                    />
                    <Route
                      path="solutions/healthcare"
                      element={<HealthcareSolutionsPage />}
                    />
                    <Route
                      path="solutions/service-providers"
                      element={<ServiceProvidersSolutionsPage />}
                    />
                    <Route path="search-demo" element={<SearchDemoPage />} />

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
                    <Route path="download" element={<DownloadPage />} />
                    <Route
                      path="/products/drive-eraser"
                      element={<DriveEraserPage />}
                    />
                    <Route
                      path="/products/file-eraser"
                      element={<FileEraserPage />}
                    />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route
                      path="order-success"
                      element={<OrderSuccessPage />}
                    />
                    <Route path="order-failure" element={<FailurePage />} />
                    <Route path="payment" element={<PaymentPage />} />
                    <Route path="diagnostics" element={<DiagnosticsPage />} />

                    {/* New Blog Routes */}
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

                    <Route
                      path="blog/best-data-erasure-methods"
                      element={<BestErasureMethodBlog />}
                    />
                    <Route
                      path="blog/erasure-best-practices"
                      element={<ErasureBestPracticesBlog />}
                    />
                    <Route
                      path="blog/automate-data-erasure"
                      element={<AutomatedErasureBlog />}
                    />
                    <Route
                      path="blog/mobile-erasure-guide"
                      element={<MobileErasureGuideBlog />}
                    />
                    <Route
                      path="blog/zero-trust-disposal"
                      element={<ZeroTrustDisposalBlog />}
                    />
                    <Route
                      path="blog/msp-data-erasure"
                      element={<MSPSecurityBlog />}
                    />
                    <Route
                      path="blog/sec-compliance"
                      element={<SECComplianceBlog />}
                    />
                    <Route
                      path="blog/itam-disposal-guide"
                      element={<ITAMDisposalGuideBlog />}
                    />
                    <Route
                      path="blog/data-hoarding-risks"
                      element={<DataHoardingRisksBlog />}
                    />
                    <Route
                      path="blog/shadow-data-risks"
                      element={<ShadowDataRisksBlog />}
                    />
                    <Route
                      path="blog/esg-data-erasure"
                      element={<ESGDataErasureBlog />}
                    />
                    <Route
                      path="blog/sustainable-it-reuse"
                      element={<SustainableITReuseBlog />}
                    />
                    <Route
                      path="blog/reduce-carbon-footprint"
                      element={<CarbonFootprintErasureBlog />}
                    />
                    <Route
                      path="blog/scope-3-emissions-reuse"
                      element={<Scope3EmissionsBlog />}
                    />
                    <Route
                      path="blog/erasure-verification-process"
                      element={<ErasureVerificationBlog />}
                    />
                    <Route
                      path="blog/hardware-diagnostics"
                      element={<HardwareDiagnosticsBlog />}
                    />
                    <Route
                      path="blog/data-minimization"
                      element={<DataMinimizationBlog />}
                    />
                    <Route
                      path="blog/government-device-theft"
                      element={<GovDeviceTheftBlog />}
                    />
                    <Route
                      path="blog/itad-selection-guide"
                      element={<ITADSelectionGuideBlog />}
                    />
                    <Route
                      path="blog/brand-reputation-esg"
                      element={<BrandReputationESGBlog />}
                    />
                    <Route
                      path="blog/msp-data-erasure"
                      element={<MSPDataErasureBlog />}
                    />
                    <Route
                      path="blog/cryptographic-erase-nist"
                      element={<CryptographicEraseNISTBlog />}
                    />
                    <Route
                      path="blog/secure-phi-erasure"
                      element={<SecurePHIePHIErasureBlog />}
                    />
                    <Route
                      path="blog/statutory-regulatory-compliance-data-erasure"
                      element={<StatutoryRegulatoryComplianceDataErasureBlog />}
                    />
                    <Route
                      path="blog/legal-ethical-data-erasure"
                      element={<LegalEthicalDataErasureBlog />}
                    />
                    <Route
                      path="blog/caption-call-fcc-settlement"
                      element={<CaptionCallFCCSettlementBlog />}
                    />
                    <Route
                      path="blog/hardware-diagnostics-itad-compliance"
                      element={<HardwareDiagnosticsITADComplianceBlog />}
                    />
                    <Route
                      path="blog/future-of-data-destruction"
                      element={<FutureOfDataDestructionBlog />}
                    />
                    <Route
                      path="blog/dod-vs-ieee-data-sanitization"
                      element={<DoDVsIEEEDataSanitizationBlog />}
                    />
                    <Route
                      path="blog/remote-work-data-erasure-best-practices"
                      element={<RemoteWorkDataErasureBestPracticesBlog />}
                    />
                    <Route
                      path="blog/ncua-third-party-data-disposal"
                      element={<NCUAThirdPartyDataDisposalBlog />}
                    />
                    <Route
                      path="blog/msp-erasure-as-a-service"
                      element={<MSPErasureAsAServiceBlog />}
                    />
                    <Route
                      path="blog/dell-data-wipe-vs-dsecure"
                      element={<DellDataWipeVsDSecureBlog />}
                    />
                    <Route
                      path="blog/common-criteria-certified-data-wiping"
                      element={<CommonCriteriaCertifiedDataWipingBlog />}
                    />
                    <Route
                      path="blog/erasure-as-a-service-dsecure"
                      element={<ErasureAsAServiceDSecureBlog />}
                    />
                    <Route
                      path="blog/returning-leased-it-hardware-dos-and-donts"
                      element={<ReturningLeasedITHardwareDosAndDontsBlog />}
                    />
                    <Route
                      path="blog/healthcare-ransomware-lessons"
                      element={<HealthcareRansomwareLessonsBlog />}
                    />
                    <Route
                      path="blog/mac-m1-erasure-known-issues"
                      element={<MacM1ErasureKnownIssuesBlog />}
                    />
                    <Route
                      path="blog/wipe-ssd-from-bios-guide"
                      element={<WipeSSDFromBIOSGuideBlog />}
                    />
                    <Route
                      path="blog/data-erasure-for-non-profits"
                      element={<DataErasureForNonProfitsBlog />}
                    />
                    <Route
                      path="blog/erase-mac-data-safely-using-dsecure"
                      element={<EraseMacDataSafelyUsingDSecureBlog />}
                    />
                    <Route
                      path="blog/erase-data-pc-laptop-desktop"
                      element={<EraseDataPcLaptopDesktopBlog />}
                    />

                    {/* Newly copied blog routes */}
                    <Route
                      path="blog/ccpa-violation"
                      element={<CCPAViolationBlog />}
                    />
                    <Route
                      path="blog/certified-itad-reasons"
                      element={<CertifiedITADReasonsBlog />}
                    />
                    <Route
                      path="blog/chain-of-custody"
                      element={<ChainOfCustodyBlog />}
                    />
                    <Route
                      path="blog/change-healthcare-attack"
                      element={<ChangeHealthcareAttackBlog />}
                    />
                    <Route
                      path="blog/chromebook-data-risks"
                      element={<ChromebookDataRisksBlog />}
                    />
                    <Route
                      path="blog/cloud-migration"
                      element={<CloudMigrationBlog />}
                    />
                    <Route
                      path="blog/common-criteria"
                      element={<CommonCriteriaBlog />}
                    />
                    <Route
                      path="blog/corporate-it-asset-risks"
                      element={<CorporateITAssetRisksBlog />}
                    />
                    <Route
                      path="blog/cryptographic-erase"
                      element={<CryptographicEraseBlog />}
                    />
                    <Route
                      path="blog/cybersecurity-data-destruction"
                      element={<CybersecurityDataDestructionBlog />}
                    />
                    <Route
                      path="blog/dsecure-operations"
                      element={<DSecureOperationsBlog />}
                    />
                    <Route
                      path="blog/dark-data-risks"
                      element={<DarkDataRisksBlog />}
                    />
                    <Route
                      path="blog/data-destruction-best-practices"
                      element={<DataDestructionBestPracticesBlog />}
                    />
                    <Route
                      path="blog/data-disposal-guidelines"
                      element={<DataDisposalGuidelinesBlog />}
                    />
                    <Route
                      path="blog/data-erasure-disaster-recovery"
                      element={<DataErasureDisasterRecoveryBlog />}
                    />
                    <Route
                      path="blog/data-erasure-myths"
                      element={<DataErasureMythsBlog />}
                    />
                    <Route
                      path="blog/data-hoarding"
                      element={<DataHoardingBlog />}
                    />
                    <Route
                      path="blog/data-privacy-obligations"
                      element={<DataPrivacyObligationsBlog />}
                    />
                    <Route
                      path="blog/data-remanence"
                      element={<DataRemanenceBlog />}
                    />
                    <Route
                      path="blog/data-remediation-erasure"
                      element={<DataRemediationErasureBlog />}
                    />
                    <Route
                      path="blog/data-retention-privacy"
                      element={<DataRetentionPrivacyBlog />}
                    />
                    <Route
                      path="blog/degaussing-risks"
                      element={<DegaussingRisksBlog />}
                    />
                    <Route
                      path="blog/deleted-files-truth"
                      element={<DeletedFilesTruthBlog />}
                    />
                    <Route
                      path="blog/deletion-vs-erasure"
                      element={<DeletionVsErasureBlog />}
                    />
                    <Route
                      path="blog/dell-data-wipe-alternative"
                      element={<DellDataWipeAlternativeBlog />}
                    />
                    <Route
                      path="blog/deployment-options"
                      element={<DeploymentOptionsBlog />}
                    />
                    <Route
                      path="blog/diagnostics-erasure-itad"
                      element={<DiagnosticsErasureITADBlog />}
                    />
                    <Route
                      path="blog/digital-divide"
                      element={<DigitalDivideBlog />}
                    />
                    <Route
                      path="blog/dod-vs-ieee"
                      element={<DoDVsIEEEBlog />}
                    />
                    <Route
                      path="blog/dod-wiping-standard"
                      element={<DoDWipingStandardBlog />}
                    />
                    <Route
                      path="blog/dumpster-diving-data-breach"
                      element={<DumpsterDivingDataBreachBlog />}
                    />
                    <Route path="blog/esg-report" element={<ESGReportBlog />} />
                    <Route path="blog/eu-csrd" element={<EUCSRDBlog />} />
                    <Route
                      path="blog/education-data-destruction"
                      element={<EducationDataDestructionBlog />}
                    />
                    <Route
                      path="blog/end-of-life-data-security"
                      element={<EndOfLifeDataSecurityBlog />}
                    />
                    <Route
                      path="blog/financial-data-breach-case-study"
                      element={<FinancialDataBreachCaseStudyBlog />}
                    />
                    <Route
                      path="blog/free-vs-pro-eraser"
                      element={<FreeVsProEraserBlog />}
                    />
                    <Route
                      path="blog/future-data-destruction"
                      element={<FutureDataDestructionBlog />}
                    />
                    <Route
                      path="blog/gdpr-seven-years"
                      element={<GDPRSevenYearsBlog />}
                    />
                    <Route
                      path="blog/government-device-theft-case-study"
                      element={<GovernmentDeviceTheftBlog />}
                    />
                    <Route
                      path="blog/government-it-disposal"
                      element={<GovernmentITDisposalBlog />}
                    />
                    <Route
                      path="blog/green-it-practices"
                      element={<GreenITPracticesBlog />}
                    />
                    <Route
                      path="blog/hipaa-compliance-erasure"
                      element={<HIPAAComplianceErasureBlog />}
                    />
                    <Route
                      path="blog/healthcare-data-breach-case-study"
                      element={<HealthcareDataBreachCaseStudyBlog />}
                    />
                    <Route path="blog/hex-viewer" element={<HexViewerBlog />} />
                    <Route
                      path="blog/hidden-disk-areas"
                      element={<HiddenDiskAreasBlog />}
                    />
                    <Route
                      path="blog/how-to-erase-mac"
                      element={<HowToEraseMacBlog />}
                    />
                    <Route
                      path="blog/ipad-tablet-erasure"
                      element={<IPadTabletErasureBlog />}
                    />
                    <Route
                      path="blog/itad-challenges"
                      element={<ITADChallengesBlog />}
                    />
                    <Route
                      path="blog/itad-environmental"
                      element={<ITADEnvironmentalBlog />}
                    />
                    <Route
                      path="blog/itad-market-growth"
                      element={<ITADMarketGrowthBlog />}
                    />
                    <Route
                      path="blog/itad-procurement"
                      element={<ITADProcurementBlog />}
                    />
                    <Route
                      path="blog/itam-data-breach"
                      element={<ITAMDataBreachBlog />}
                    />
                    <Route
                      path="blog/it-asset-lifecycle"
                      element={<ITAssetLifecycleBlog />}
                    />
                    <Route
                      path="blog/it-asset-reuse"
                      element={<ITAssetReuseBlog />}
                    />
                    <Route
                      path="blog/legal-ethical-erasure"
                      element={<LegalEthicalErasureBlog />}
                    />
                    <Route
                      path="blog/loose-drives-erasure-guide"
                      element={<LooseDrivesErasureGuideBlog />}
                    />
                    <Route
                      path="blog/m1-mac-erasure-issues"
                      element={<M1MacErasureIssuesBlog />}
                    />
                    <Route
                      path="blog/mdm-detection"
                      element={<MDMDetectionBlog />}
                    />
                    <Route
                      path="blog/msp-erasure-service"
                      element={<MSPErasureServiceBlog />}
                    />
                    <Route
                      path="blog/marriott-settlement"
                      element={<MarriottSettlementBlog />}
                    />
                    <Route
                      path="blog/media-sanitization-need"
                      element={<MediaSanitizationNeedBlog />}
                    />
                    <Route
                      path="blog/mobile-diagnostics-benefits"
                      element={<MobileDiagnosticsBenefitsBlog />}
                    />
                    <Route
                      path="blog/mobile-diagnostics-revolution"
                      element={<MobileDiagnosticsRevolutionBlog />}
                    />
                    <Route
                      path="blog/morgan-stanley-data-breach"
                      element={<MorganStanleyDataBreachBlog />}
                    />
                    <Route
                      path="blog/morgan-stanley-fine"
                      element={<MorganStanleyFineBlog />}
                    />
                    <Route
                      path="blog/ncua-guidelines"
                      element={<NCUAGuidelinesBlog />}
                    />
                    <Route
                      path="blog/nist-clear-purge"
                      element={<NISTClearPurgeBlog />}
                    />
                    <Route
                      path="blog/nist-tested-erasure-software"
                      element={<NISTTestedErasureSoftwareBlog />}
                    />
                    <Route
                      path="blog/nist-vs-ieee"
                      element={<NISTVsIEEEBlog />}
                    />
                    <Route
                      path="blog/onsite-vs-offsite-destruction"
                      element={<OnsiteVsOffsiteDestructionBlog />}
                    />
                    <Route
                      path="blog/phi-erasure"
                      element={<PHIErasureBlog />}
                    />
                    <Route
                      path="blog/pii-disposal-breach"
                      element={<PIIDisposalBreachBlog />}
                    />
                    <Route
                      path="blog/post-covid-data-disposal"
                      element={<PostCovidDataDisposalBlog />}
                    />
                    <Route
                      path="blog/private-cloud"
                      element={<PrivateCloudBlog />}
                    />
                    <Route
                      path="blog/remote-wiping-software"
                      element={<RemoteWipingSoftwareBlog />}
                    />
                    <Route
                      path="blog/remote-work-data-erasure"
                      element={<RemoteWorkDataErasureBlog />}
                    />
                    <Route
                      path="blog/reseller-profits"
                      element={<ResellerProfitsBlog />}
                    />
                    <Route
                      path="blog/right-to-repair"
                      element={<RightToRepairBlog />}
                    />
                    <Route
                      path="blog/ssd-wipe-bios"
                      element={<SSDWipeBIOSBlog />}
                    />
                    <Route
                      path="blog/secure-file-erase"
                      element={<SecureFileEraseBlog />}
                    />
                    <Route
                      path="blog/secure-hdd-disposal"
                      element={<SecureHDDDisposalBlog />}
                    />
                    <Route
                      path="blog/secure-it-asset-disposal"
                      element={<SecureITAssetDisposalBlog />}
                    />
                    <Route
                      path="blog/secure-smartphone-erasure"
                      element={<SecureSmartphoneErasureBlog />}
                    />
                    <Route
                      path="blog/server-erasure"
                      element={<ServerErasureBlog />}
                    />
                    <Route
                      path="blog/shadow-data"
                      element={<ShadowDataBlog />}
                    />
                    <Route
                      path="blog/statutory-compliance"
                      element={<StatutoryComplianceBlog />}
                    />
                    <Route
                      path="blog/ultratest-comparison"
                      element={<UltratestComparisonBlog />}
                    />
                    <Route path="blog/vm-erasure" element={<VMErasureBlog />} />
                    <Route
                      path="blog/windows-10-eos"
                      element={<Windows10EOSBlog />}
                    />
                    <Route
                      path="blog/wipe-computer-donating"
                      element={<WipeComputerDonatingBlog />}
                    />
                    <Route
                      path="blog/world-class-nps"
                      element={<WorldClassNPSBlog />}
                    />
                    <Route
                      path="blog/caption-call-settlement"
                      element={<CaptionCallSettlementBlog />}
                    />

                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="legal-policy" element={<LegalPolicy />} />
                    <Route
                      path="terms-of-service"
                      element={<TermsOfServicePage />}
                    />
                    <Route
                      path="cookie-policy"
                      element={<CookiePolicyPage />}
                    />
                    <Route path="security" element={<SecurityPage />} />
                    <Route path="status" element={<StatusPage />} />
                    <Route path="partners" element={<PartnersPage />} />
                    <Route path="support" element={<SupportPage />} />
                    <Route path="enterprise" element={<EnterprisePage />} />
                    <Route
                      path="healthcare-services"
                      element={<HealthcareServices />}
                    />
                    <Route path="itad-solution" element={<ITADSolution />} />
                    <Route path="api-test" element={<ApiTestPage />} />
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
                    <Route
                      path="dashboard/enhanced"
                      element={
                        <ProtectedRoute>
                          <EnhancedUserDashboard />
                        </ProtectedRoute>
                      }
                    />
                    {/* Admin Routes - Only accessible by admin role */}
                    <Route
                      path="admin"
                      element={
                        <ProtectedRoute>
                          <AdminShell />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route
                        path="performance"
                        element={<AdminPerformance />}
                      />
                      <Route path="reports" element={<AdminReports />} />
                      <Route path="machines" element={<AdminMachines />} />
                      <Route path="sessions" element={<AdminSessions />} />
                      <Route path="subusers" element={<AdminSubusers />} />
                      <Route path="edit-subuser" element={<EditSubuser />} />
                      <Route path="groups" element={<AdminGroupsDashboard />} />
                      <Route path="licenses" element={<AdminLicenses />} />
                      <Route path="downloads" element={<AdminDownloads />} />
                      <Route
                        path="private-cloud-setup"
                        element={<PrivateCloudSetup />}
                      />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="users/add" element={<AddUser />} />
                      <Route path="users/edit/:userId" element={<EditUser />} />
                      <Route path="groups" element={<AdminGroups />} />
                      <Route path="groups/add" element={<AddGroup />} />
                      <Route
                        path="groups/edit/:groupId"
                        element={<EditGroup />}
                      />
                      <Route
                        path="reports/admin"
                        element={<AdminReportsAdmin />}
                      />
                      <Route
                        path="reports/generate"
                        element={<GenerateReport />}
                      />
                      <Route
                        path="reports/generate/:reportId"
                        element={<GenerateReport />}
                      />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route
                        path="profile/edit"
                        element={<AdminProfileEdit />}
                      />
                    </Route>
                    {/* Support Guides */}
                    <Route
                      path="support/overwrite-guide"
                      element={<OverwriteGuide />}
                    />
                    <Route
                      path="support/wipe-guide"
                      element={<OverwriteGuide />}
                    />
                    <Route
                      path="support/sas-wipe-guide"
                      element={<WipeSASDrives />}
                    />
                    <Route
                      path="support/mac-wipe-guide"
                      element={<WipeMacM1 />}
                    />
                    <Route
                      path="support/mac-eraser-guide"
                      element={<MacEraseGuide />}
                    />
                    <Route
                      path="support/file-eraser-guide"
                      element={<FileEraserGuide />}
                    />
                    <Route
                      path="/data-guardian-award"
                      element={<DataGuardianAwardPage />}
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

                    <Route
                      path="/support/manual/installation"
                      element={<InstallationPage />}
                    />
                    <Route
                      path="/support/manual/installation-guide"
                      element={<InstallationGuideDetailed />}
                    />
                    <Route
                      path="/support/manual/system-setup"
                      element={<SystemSetupPage />}
                    />
                    <Route
                      path="/support/manual/working-with-D-Secure"
                      element={<WorkingWithDSecurePage />}
                    />
                    <Route
                      path="/support/help-manual/working-guide"
                      element={<WorkingWithDSecurePage />}
                    />
                    <Route
                      path="/support/help-manual/faqs"
                      element={<DSecureFAQPage />}
                    />
                    <Route
                      path="/support/help-manual/report-management"
                      element={<ReportManagementPage />}
                    />
                    <Route
                      path="/support/help-manual/schedule-settings"
                      element={<ScheduleSettingsPage />}
                    />
                    <Route
                      path="/support/help-manual/complete-manual"
                      element={<CompleteDSecureManual />}
                    />
                    <Route
                      path="/support/help-manual/complete-drive-manual"
                      element={<CompleteDSecureDriveManual />}
                    />
                    {/* Network File Manual - Nested Routes */}
                    <Route
                      path="/support/help-manual/complete-network-manual"
                      element={<NetworkFileManualLayout />}
                    >
                      <Route
                        index
                        element={
                          <div className="text-center py-12">
                            <p className="text-gray-600">
                              Select a topic from the sidebar to get started
                            </p>
                          </div>
                        }
                      />
                    </Route>
                    <Route
                      path="/support/help-manual/network-file"
                      element={<NetworkFileManualLayout />}
                    >
                      <Route
                        path="quick-overview"
                        element={<NetworkFilePages.QuickOverview />}
                      />
                      <Route
                        path="installation"
                        element={<NetworkFilePages.Installation />}
                      />
                      <Route
                        path="user-interface"
                        element={<NetworkFilePages.UserInterface />}
                      />
                      <Route
                        path="licensing"
                        element={<NetworkFilePages.Licensing />}
                      />
                      <Route
                        path="settings"
                        element={<NetworkFilePages.Settings />}
                      />
                      <Route
                        path="connecting-domain"
                        element={<NetworkFilePages.ConnectingDomain />}
                      />
                      <Route
                        path="cloud-integration"
                        element={<NetworkFilePages.CloudIntegration />}
                      />
                      <Route
                        path="erasing-files"
                        element={<NetworkFilePages.ErasingFiles />}
                      />
                      <Route
                        path="erasing-traces"
                        element={<NetworkFilePages.ErasingTraces />}
                      />
                      <Route
                        path="scheduling-tasks"
                        element={<NetworkFilePages.SchedulingTasks />}
                      />
                      <Route
                        path="report-management"
                        element={<NetworkFilePages.ReportManagement />}
                      />
                      <Route path="faq" element={<NetworkFilePages.FAQ />} />
                      <Route
                        path="support"
                        element={<NetworkFilePages.Support />}
                      />
                      <Route
                        path="about"
                        element={<NetworkFilePages.About />}
                      />
                    </Route>
                    <Route
                      path="/support/help-manual"
                      element={<HelpManualIndexPage />}
                    />
                    <Route
                      path="/support/help-manual"
                      element={<HelpManualIndexPage />}
                    />

                    <Route
                      path="/support/manual/first-time-setup"
                      element={<FirstTimeSetupPage />}
                    />
                    <Route
                      path="/support/manual/user-interface"
                      element={<UserInterfacePage />}
                    />
                    <Route
                      path="/support/manual/quickstart"
                      element={<QuickStartTutorial />}
                    />
                    <Route
                      path="/support/manual/overwrite-patterns"
                      element={<OverwritePatternsPage />}
                    />
                    <Route
                      path="/support/manual/cryptographic-erasure"
                      element={<CryptographicErasurePage />}
                    />
                    <Route
                      path="/support/manual/physical-destruction"
                      element={<PhysicalDestructionPage />}
                    />
                    <Route
                      path="support/manual/physical-destruction"
                      element={<PhysicalDestructionPage />}
                    />
                    <Route
                      path="/support/manual/verification-methods"
                      element={<VerificationMethodsPage />}
                    />
                    <Route
                      path="/support/manual/windows"
                      element={<WindowsSystemsPage />}
                    />
                    <Route
                      path="/support/manual/macos"
                      element={<MacOSSystemsPage />}
                    />
                    <Route
                      path="/support/manual/linux"
                      element={<LinuxSystemsPage />}
                    />
                    <Route
                      path="/support/manual/common-issues"
                      element={<CommonIssuesPage />}
                    />
                    <Route
                      path="/support/manual/error-codes"
                      element={<ErrorCodesPage />}
                    />
                    <Route
                      path="/support/manual/mobile"
                      element={<MobileDevicesPage />}
                    />
                    <Route
                      path="/support/manual/servers"
                      element={<EnterpriseServersPage />}
                    />
                    <Route
                      path="/support/manual/batch-operations"
                      element={<BatchOperationsPage />}
                    />
                    <Route
                      path="/support/manual/remote-management"
                      element={<RemoteManagementPage />}
                    />
                    <Route
                      path="/support/manual/scripting"
                      element={<ScriptingAutomationPage />}
                    />
                    <Route
                      path="/support/manual/custom-configs"
                      element={<CustomConfigurationsPage />}
                    />
                    <Route
                      path="/support/manual/compliance"
                      element={<ComplianceStandardsPage />}
                    />
                    <Route
                      path="/support/manual/certificates"
                      element={<CertificateGenerationPage />}
                    />
                    <Route
                      path="/support/manual/audit-trails"
                      element={<AuditTrailsPage />}
                    />
                    <Route
                      path="/support/manual/chain-custody"
                      element={<ChainCustodyPage />}
                    />
                    <Route
                      path="/support/manual/performance"
                      element={<PerformanceOptimizationPage />}
                    />
                    <Route
                      path="/support/manual/recovery"
                      element={<RecoveryProceduresPage />}
                    />
                    <Route
                      path="/support/manual/windows-introduction"
                      element={<WindowsIntroductionPage />}
                    />
                    <Route
                      path="/support/manual/windows-builtin-tools"
                      element={<WindowsBuiltinToolsPage />}
                    />
                    <Route
                      path="/support/manual/windows-ssd-erasure"
                      element={<WindowsSsdErasurePage />}
                    />
                    <Route
                      path="/support/manual/windows-storage"
                      element={<WindowsStoragePage />}
                    />
                    <Route
                      path="/support/manual/windows-preparation"
                      element={<WindowsPreparationPage />}
                    />
                    <Route
                      path="/support/manual/windows-troubleshooting"
                      element={<WindowsTroubleshootingPage />}
                    />
                    <Route
                      path="/support/manual/windows-enterprise"
                      element={<WindowsEnterprisePage />}
                    />
                    <Route
                      path="/support/manual/windows-risks"
                      element={<WindowsRisksPage />}
                    />
                    <Route
                      path="/support/manual/windows-filesystems"
                      element={<WindowsFilesystemsPage />}
                    />
                    <Route
                      path="/support/manual/windows-system-files"
                      element={<WindowsSystemFilesPage />}
                    />
                    <Route
                      path="/support/manual/windows-residual-data"
                      element={<WindowsResidualDataPage />}
                    />
                    <Route
                      path="/support/manual/windows-software-erasure"
                      element={<WindowsSoftwareErasurePage />}
                    />
                    <Route
                      path="/support/manual/windows-crypto-erasure"
                      element={<WindowsCryptoErasurePage />}
                    />
                    <Route
                      path="/support/manual/windows-methods-comparison"
                      element={<WindowsMethodsComparisonPage />}
                    />
                    <Route
                      path="/support/manual/windows-command-line"
                      element={<WindowsCommandLinePage />}
                    />
                    <Route
                      path="/support/manual/pre-installation"
                      element={<PreInstallationPage />}
                    />
                    <Route
                      path="/support/manual/download-installer"
                      element={<DownloadInstallerPage />}
                    />
                    <Route
                      path="/support/manual/license-activation"
                      element={<LicenseActivationPage />}
                    />
                    <Route
                      path="/support/manual/installation-settings"
                      element={<InstallationSettingsPage />}
                    />
                    <Route
                      path="/support/manual/installation-progress"
                      element={<InstallationProgressPage />}
                    />
                    <Route
                      path="/support/manual/system-requirements"
                      element={<SystemRequirementsPage />}
                    />
                    <Route
                      path="/support/manual/setup-wizard"
                      element={<SetupWizardPage />}
                    />
                    <Route
                      path="/support/manual/first-scan"
                      element={<FirstScanPage />}
                    />
                    <Route
                      path="/support/manual/key-activation"
                      element={<KeyActivationPage />}
                    />
                    <Route
                      path="/support/manual/firewall-setup"
                      element={<FirewallSetupPage />}
                    />
                    <Route
                      path="/support/manual/main-dashboard"
                      element={<MainDashboardPage />}
                    />
                    <Route
                      path="/support/manual/navigation"
                      element={<NavigationPage />}
                    />
                    <Route
                      path="/support/manual/status-indicators"
                      element={<StatusIndicatorsPage />}
                    />
                    <Route
                      path="/support/manual/device-selection"
                      element={<DeviceSelectionPage />}
                    />
                    <Route
                      path="/support/manual/start-erasure"
                      element={<StartErasurePage />}
                    />
                    <Route
                      path="/support/manual/progress-monitoring"
                      element={<ProgressMonitoringPage />}
                    />
                    <Route
                      path="/support/manual/enterprise-integration"
                      element={<EnterpriseIntegrationPage />}
                    />
                    <Route
                      path="/support/manual/user-management"
                      element={<UserManagementPage />}
                    />
                    <Route
                      path="/support/manual/erasure-preferences"
                      element={<ErasurePreferencesPage />}
                    />
                    <Route
                      path="/support/manual/erasure-reports"
                      element={<ErasureReportsPage />}
                    />
                    <Route
                      path="/support/manual/general-settings"
                      element={<GeneralSettingsPage />}
                    />
                    <Route
                      path="/support/manual/custom-dashboards"
                      element={<CustomDashboardsPage />}
                    />
                    <Route
                      path="/support/manual/compliance-export"
                      element={<ComplianceExportPage />}
                    />
                    <Route
                      path="/support/manual/operation-history"
                      element={<OperationHistoryPage />}
                    />
                    <Route
                      path="/support/manual/api-integration"
                      element={<ApiIntegrationPage />}
                    />
                    <Route
                      path="/support/manual/keyboard-shortcuts"
                      element={<KeyboardShortcutsPage />}
                    />
                    <Route
                      path="/support/manual/certificate-generation"
                      element={<CertificateGenerationPage />}
                    />
                    <Route
                      path="/support/manual/scripting-automation"
                      element={<ScriptingAutomationPage />}
                    />
                    <Route
                      path="/support/manual/custom-configurations"
                      element={<CustomConfigurationsPage />}
                    />
                    <Route
                      path="/support/manual/performance-optimization"
                      element={<PerformanceOptimizationPage />}
                    />
                    <Route
                      path="/support/manual/verification-overview"
                      element={<VerificationOverviewPage />}
                    />
                    <Route
                      path="/support/manual/dod-3pass"
                      element={<Dod3passPage />}
                    />
                    <Route
                      path="/support/manual/dod-7pass"
                      element={<Dod7passPage />}
                    />
                    <Route
                      path="/support/manual/readback-verification"
                      element={<ReadbackVerificationPage />}
                    />
                    <Route
                      path="/support/manual/nist-800-88"
                      element={<Nist80088Page />}
                    />
                    <Route
                      path="/support/manual/access-verification"
                      element={<AccessVerificationPage />}
                    />
                    <Route
                      path="/support/manual/activation-key"
                      element={<ActivationKeyPage />}
                    />
                    <Route
                      path="/support/manual/audit-preparation"
                      element={<AuditPreparationPage />}
                    />
                    <Route
                      path="/support/manual/audit-verification"
                      element={<AuditVerificationPage />}
                    />
                    <Route
                      path="/support/manual/auto-updates"
                      element={<AutoUpdatesPage />}
                    />
                    <Route
                      path="/support/manual/banking-finance"
                      element={<BankingFinancePage />}
                    />
                    <Route
                      path="/support/manual/banking-mode"
                      element={<BankingModePage />}
                    />
                    <Route
                      path="/support/manual/best-practices"
                      element={<BestPracticesPage />}
                    />
                    <Route
                      path="/support/manual/bitraser-integration"
                      element={<BitraserIntegrationPage />}
                    />
                    <Route
                      path="/support/manual/certificate-destruction"
                      element={<CertificateDestructionPage />}
                    />
                    <Route
                      path="/support/manual/cloud-console"
                      element={<CloudConsolePage />}
                    />
                    <Route
                      path="/support/manual/comparison-table"
                      element={<ComparisonTablePage />}
                    />
                    <Route
                      path="/support/manual/crushing-method"
                      element={<CrushingMethodPage />}
                    />
                    <Route
                      path="/support/manual/crypto-benefits"
                      element={<CryptoBenefitsPage />}
                    />
                    <Route
                      path="/support/manual/crypto-importance"
                      element={<CryptoImportancePage />}
                    />
                    <Route
                      path="/support/manual/crypto-process"
                      element={<CryptoProcessPage />}
                    />
                    <Route
                      path="/support/manual/crypto-verification"
                      element={<CryptoVerificationPage />}
                    />
                    <Route
                      path="/support/manual/custom-algorithms"
                      element={<CustomAlgorithmsPage />}
                    />
                    <Route
                      path="/support/manual/degaussing-method"
                      element={<DegaussingMethodPage />}
                    />
                    <Route
                      path="/support/manual/destruction-quality"
                      element={<DestructionQualityPage />}
                    />
                    <Route
                      path="/support/manual/destruction-standards"
                      element={<DestructionStandardsPage />}
                    />
                    <Route
                      path="/support/manual/destruction-use-cases"
                      element={<DestructionUseCasesPage />}
                    />
                    <Route
                      path="/support/manual/dod-standards"
                      element={<DodStandardsPage />}
                    />
                    <Route
                      path="/support/manual/enterprise-benefits"
                      element={<EnterpriseBenefitsPage />}
                    />
                    <Route
                      path="/support/manual/environmental-considerations"
                      element={<EnvironmentalConsiderationsPage />}
                    />
                    <Route
                      path="/support/manual/environmental-impact"
                      element={<EnvironmentalImpactPage />}
                    />
                    <Route
                      path="/support/manual/erasure-process"
                      element={<ErasureProcessPage />}
                    />
                    <Route path="/support/manual/faqs" element={<FaqsPage />} />
                    <Route
                      path="/support/manual/financial-verification"
                      element={<FinancialVerificationPage />}
                    />
                    <Route
                      path="/support/manual/firewall-config"
                      element={<FirewallConfigPage />}
                    />
                    <Route
                      path="/support/manual/first-run"
                      element={<FirstRunPage />}
                    />
                    <Route
                      path="/support/manual/fragment-verification"
                      element={<FragmentVerificationPage />}
                    />
                    <Route
                      path="/support/manual/future-trends"
                      element={<FutureTrendsPage />}
                    />
                    <Route
                      path="/support/manual/gdpr-verification"
                      element={<GdprVerificationPage />}
                    />
                    <Route
                      path="/support/manual/government-defense"
                      element={<GovernmentDefensePage />}
                    />
                    <Route
                      path="/support/manual/government-verification"
                      element={<GovernmentVerificationPage />}
                    />
                    <Route
                      path="/support/manual/hardware-sanitization"
                      element={<HardwareSanitizationPage />}
                    />
                    <Route
                      path="/support/manual/hdd-destruction"
                      element={<HddDestructionPage />}
                    />
                    <Route
                      path="/support/manual/healthcare-destruction"
                      element={<HealthcareDestructionPage />}
                    />
                    <Route
                      path="/support/manual/healthcare-verification"
                      element={<HealthcareVerificationPage />}
                    />
                    <Route
                      path="/support/manual/implementation-considerations"
                      element={<ImplementationConsiderationsPage />}
                    />
                    <Route
                      path="/support/manual/implementation-practices"
                      element={<ImplementationPracticesPage />}
                    />
                    <Route
                      path="/support/manual/incineration-method"
                      element={<IncinerationMethodPage />}
                    />
                    <Route
                      path="/support/manual/industry-applications"
                      element={<IndustryApplicationsPage />}
                    />
                    <Route
                      path="/support/manual/industry-use-cases"
                      element={<IndustryUseCasesPage />}
                    />
                    <Route
                      path="/support/manual/installation-path"
                      element={<InstallationPathPage />}
                    />
                    <Route
                      path="/support/manual/internet-requirements"
                      element={<InternetRequirementsPage />}
                    />
                    <Route
                      path="/support/manual/itad-datacenters"
                      element={<ItadDatacentersPage />}
                    />
                    <Route
                      path="/support/manual/key-destruction-verify"
                      element={<KeyDestructionVerifyPage />}
                    />
                    <Route
                      path="/support/manual/license-agreement"
                      element={<LicenseAgreementPage />}
                    />
                    <Route
                      path="/support/manual/license-troubleshooting"
                      element={<LicenseTroubleshootingPage />}
                    />
                    <Route
                      path="/support/manual/limitations"
                      element={<LimitationsPage />}
                    />
                    <Route
                      path="/support/manual/macos-apple-silicon"
                      element={<MacosAppleSiliconPage />}
                    />
                    <Route
                      path="/support/manual/macos-architecture"
                      element={<MacosArchitecturePage />}
                    />
                    <Route
                      path="/support/manual/macos-best-practices"
                      element={<MacosBestPracticesPage />}
                    />
                    <Route
                      path="/support/manual/macos-builtin-tools"
                      element={<MacosBuiltinToolsPage />}
                    />
                    <Route
                      path="/support/manual/macos-compliance"
                      element={<MacosCompliancePage />}
                    />
                    <Route
                      path="/support/manual/macos-crypto-erasure"
                      element={<MacosCryptoErasurePage />}
                    />
                    <Route
                      path="/support/manual/macos-encryption"
                      element={<MacosEncryptionPage />}
                    />
                    <Route
                      path="/support/manual/macos-enterprise"
                      element={<MacosEnterprisePage />}
                    />
                    <Route
                      path="/support/manual/macos-external-media"
                      element={<MacosExternalMediaPage />}
                    />
                    <Route
                      path="/support/manual/macos-faq"
                      element={<MacosFaqPage />}
                    />
                    <Route
                      path="/support/manual/macos-filesystems"
                      element={<MacosFilesystemsPage />}
                    />
                    <Route
                      path="/support/manual/macos-filevault"
                      element={<MacosFilevaultPage />}
                    />
                    <Route
                      path="/support/manual/macos-intel-procedures"
                      element={<MacosIntelProceduresPage />}
                    />
                    <Route
                      path="/support/manual/macos-introduction"
                      element={<MacosIntroductionPage />}
                    />
                    <Route
                      path="/support/manual/macos-methods-comparison"
                      element={<MacosMethodsComparisonPage />}
                    />
                    <Route
                      path="/support/manual/macos-preparation"
                      element={<MacosPreparationPage />}
                    />
                    <Route
                      path="/support/manual/macos-resources"
                      element={<MacosResourcesPage />}
                    />
                    <Route
                      path="/support/manual/macos-risks"
                      element={<MacosRisksPage />}
                    />
                    <Route
                      path="/support/manual/macos-software-erasure"
                      element={<MacosSoftwareErasurePage />}
                    />
                    <Route
                      path="/support/manual/macos-ssd-considerations"
                      element={<MacosSsdConsiderationsPage />}
                    />
                    <Route
                      path="/support/manual/macos-storage"
                      element={<MacosStoragePage />}
                    />
                    <Route
                      path="/support/manual/macos-system-drive"
                      element={<MacosSystemDrivePage />}
                    />
                    <Route
                      path="/support/manual/macos-third-party"
                      element={<MacosThirdPartyPage />}
                    />
                    <Route
                      path="/support/manual/macos-tool-selection"
                      element={<MacosToolSelectionPage />}
                    />
                    <Route
                      path="/support/manual/macos-troubleshooting"
                      element={<MacosTroubleshootingPage />}
                    />
                    <Route
                      path="/support/manual/macos-verification"
                      element={<MacosVerificationPage />}
                    />
                    <Route
                      path="/support/manual/mobile-destruction"
                      element={<MobileDestructionPage />}
                    />
                    <Route
                      path="/support/manual/nist-guidelines"
                      element={<NistGuidelinesPage />}
                    />
                    <Route
                      path="/support/manual/nist-modern-storage"
                      element={<NistModernStoragePage />}
                    />
                    <Route
                      path="/support/manual/onsite-offsite"
                      element={<OnsiteOffsitePage />}
                    />
                    <Route
                      path="/support/manual/optical-tape-destruction"
                      element={<OpticalTapeDestructionPage />}
                    />
                    <Route
                      path="/support/manual/overwrite-introduction"
                      element={<OverwriteIntroductionPage />}
                    />
                    <Route
                      path="/support/manual/overwrite-risks"
                      element={<OverwriteRisksPage />}
                    />
                    <Route
                      path="/support/manual/parental-controls"
                      element={<ParentalControlsPage />}
                    />
                    <Route
                      path="/support/manual/pattern-selection"
                      element={<PatternSelectionPage />}
                    />
                    <Route
                      path="/support/manual/performance-analysis"
                      element={<PerformanceAnalysisPage />}
                    />
                    <Route
                      path="/support/manual/performance-tradeoffs"
                      element={<PerformanceTradeoffsPage />}
                    />
                    <Route
                      path="/support/manual/performance-troubleshooting"
                      element={<PerformanceTroubleshootingPage />}
                    />
                    <Route
                      path="/support/manual/performance-tuning"
                      element={<PerformanceTuningPage />}
                    />
                    <Route
                      path="/support/manual/physical-destruction-overview"
                      element={<PhysicalDestructionOverviewPage />}
                    />
                    <Route
                      path="/support/manual/physical-inspection"
                      element={<PhysicalInspectionPage />}
                    />
                    <Route
                      path="/support/manual/post-install-optimization"
                      element={<PostInstallOptimizationPage />}
                    />
                    <Route
                      path="/support/manual/real-time-monitoring"
                      element={<RealTimeMonitoringPage />}
                    />
                    <Route
                      path="/support/manual/realtime-protection"
                      element={<RealtimeProtectionPage />}
                    />
                    <Route
                      path="/support/manual/regulatory-compliance"
                      element={<RegulatoryCompliancePage />}
                    />
                    <Route
                      path="/support/manual/sampling-methodology"
                      element={<SamplingMethodologyPage />}
                    />
                    <Route
                      path="/support/manual/sanitization-concepts"
                      element={<SanitizationConceptsPage />}
                    />
                    <Route
                      path="/support/manual/scan-exclusions"
                      element={<ScanExclusionsPage />}
                    />
                    <Route
                      path="/support/manual/scan-results"
                      element={<ScanResultsPage />}
                    />
                    <Route
                      path="/support/manual/scan-scheduling"
                      element={<ScanSchedulingPage />}
                    />
                    <Route
                      path="/support/manual/security-assurance"
                      element={<SecurityAssurancePage />}
                    />
                    <Route
                      path="/support/manual/security-protocols"
                      element={<SecurityProtocolsPage />}
                    />
                    <Route
                      path="/support/manual/service-workflow"
                      element={<ServiceWorkflowPage />}
                    />
                    <Route
                      path="/support/manual/shredding-method"
                      element={<ShreddingMethodPage />}
                    />
                    <Route
                      path="/support/manual/software-supported-media"
                      element={<SoftwareSupportedMediaPage />}
                    />
                    <Route
                      path="/support/manual/software-verification"
                      element={<SoftwareVerificationPage />}
                    />
                    <Route
                      path="/support/manual/ssd-challenges"
                      element={<SsdChallengesPage />}
                    />
                    <Route
                      path="/support/manual/ssd-destruction"
                      element={<SsdDestructionPage />}
                    />
                    <Route
                      path="/support/manual/standards-comparison"
                      element={<StandardsComparisonPage />}
                    />
                    <Route
                      path="/support/manual/statistical-confidence"
                      element={<StatisticalConfidencePage />}
                    />
                    <Route
                      path="/support/manual/supported-devices"
                      element={<SupportedDevicesPage />}
                    />
                    <Route
                      path="/support/manual/supported-encryption"
                      element={<SupportedEncryptionPage />}
                    />
                    <Route
                      path="/support/manual/system-scanning"
                      element={<SystemScanningPage />}
                    />
                    <Route
                      path="/support/manual/use-cases"
                      element={<UseCasesPage />}
                    />
                    <Route
                      path="/support/manual/user-profile"
                      element={<UserProfilePage />}
                    />
                    <Route
                      path="/support/manual/verification-challenges"
                      element={<VerificationChallengesPage />}
                    />
                    <Route
                      path="/support/manual/verification-importance"
                      element={<VerificationImportancePage />}
                    />
                    <Route
                      path="/support/manual/verification-logs"
                      element={<VerificationLogsPage />}
                    />
                    <Route
                      path="/support/manual/verification-risks"
                      element={<VerificationRisksPage />}
                    />
                    <Route
                      path="/support/manual/verification-standards"
                      element={<VerificationStandardsPage />}
                    />
                    <Route
                      path="/support/manual/verification-techniques"
                      element={<VerificationTechniquesPage />}
                    />
                    <Route
                      path="/support/manual/verification-tools"
                      element={<VerificationToolsPage />}
                    />
                    <Route
                      path="/support/manual/virus-definitions"
                      element={<VirusDefinitionsPage />}
                    />
                    <Route
                      path="/support/manual/visual-confirmation"
                      element={<VisualConfirmationPage />}
                    />
                    <Route
                      path="/support/manual/vpn-setup"
                      element={<VpnSetupPage />}
                    />
                    <Route
                      path="/support/manual/why-physical-destruction"
                      element={<WhyPhysicalDestructionPage />}
                    />
                    <Route
                      path="/support/manual/windows-best-practices"
                      element={<WindowsBestPracticesPage />}
                    />
                    <Route
                      path="/support/manual/windows-bitlocker"
                      element={<WindowsBitlockerPage />}
                    />
                    <Route
                      path="/support/manual/windows-bootable-usb"
                      element={<WindowsBootableUsbPage />}
                    />
                    <Route
                      path="/support/manual/windows-compliance"
                      element={<WindowsCompliancePage />}
                    />
                    <Route
                      path="/support/manual/windows-D-Secure-eraser"
                      element={<WindowsDsecureEraserPage />}
                    />
                    <Route
                      path="/support/manual/windows-faq"
                      element={<WindowsFaqPage />}
                    />
                    <Route
                      path="/support/manual/windows-resources"
                      element={<WindowsResourcesPage />}
                    />
                    <Route
                      path="/support/manual/windows-sed-drives"
                      element={<WindowsSedDrivesPage />}
                    />
                    <Route
                      path="/support/manual/windows-ssd-erasure"
                      element={<WindowsSsdErasurePage />}
                    />
                    <Route
                      path="/support/manual/windows-third-party"
                      element={<WindowsThirdPartyPage />}
                    />
                    <Route
                      path="/support/manual/windows-verification"
                      element={<WindowsVerificationPage />}
                    />
                    <Route
                      path="products/mobile-erasure"
                      element={<MobileErasureSolutions />}
                    />
                    {/* New Blog Routes */}
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

                    <Route
                      path="blog/best-data-erasure-methods"
                      element={<BestErasureMethodBlog />}
                    />
                    <Route
                      path="blog/erasure-best-practices"
                      element={<ErasureBestPracticesBlog />}
                    />
                    <Route
                      path="blog/automate-data-erasure"
                      element={<AutomatedErasureBlog />}
                    />
                    <Route
                      path="blog/mobile-erasure-guide"
                      element={<MobileErasureGuideBlog />}
                    />
                    <Route
                      path="blog/zero-trust-disposal"
                      element={<ZeroTrustDisposalBlog />}
                    />
                    <Route
                      path="blog/msp-data-erasure"
                      element={<MSPSecurityBlog />}
                    />
                    <Route
                      path="blog/sec-compliance"
                      element={<SECComplianceBlog />}
                    />
                    <Route
                      path="blog/itam-disposal-guide"
                      element={<ITAMDisposalGuideBlog />}
                    />
                    <Route
                      path="blog/data-hoarding-risks"
                      element={<DataHoardingRisksBlog />}
                    />
                    <Route
                      path="blog/shadow-data-risks"
                      element={<ShadowDataRisksBlog />}
                    />
                    <Route
                      path="blog/esg-data-erasure"
                      element={<ESGDataErasureBlog />}
                    />
                    <Route
                      path="blog/sustainable-it-reuse"
                      element={<SustainableITReuseBlog />}
                    />
                    <Route
                      path="blog/reduce-carbon-footprint"
                      element={<CarbonFootprintErasureBlog />}
                    />
                    <Route
                      path="blog/scope-3-emissions-reuse"
                      element={<Scope3EmissionsBlog />}
                    />
                    <Route
                      path="blog/erasure-verification-process"
                      element={<ErasureVerificationBlog />}
                    />
                    <Route
                      path="blog/hardware-diagnostics"
                      element={<HardwareDiagnosticsBlog />}
                    />
                    <Route
                      path="blog/data-minimization"
                      element={<DataMinimizationBlog />}
                    />
                    <Route
                      path="blog/government-device-theft"
                      element={<GovDeviceTheftBlog />}
                    />
                    <Route
                      path="blog/itad-selection-guide"
                      element={<ITADSelectionGuideBlog />}
                    />
                    <Route
                      path="blog/brand-reputation-esg"
                      element={<BrandReputationESGBlog />}
                    />
                    <Route
                      path="blog/msp-data-erasure"
                      element={<MSPDataErasureBlog />}
                    />
                    <Route
                      path="blog/cryptographic-erase-nist"
                      element={<CryptographicEraseNISTBlog />}
                    />
                    <Route
                      path="blog/secure-phi-erasure"
                      element={<SecurePHIePHIErasureBlog />}
                    />
                    <Route
                      path="blog/statutory-regulatory-compliance-data-erasure"
                      element={<StatutoryRegulatoryComplianceDataErasureBlog />}
                    />
                    <Route
                      path="blog/legal-ethical-data-erasure"
                      element={<LegalEthicalDataErasureBlog />}
                    />
                    <Route
                      path="blog/caption-call-fcc-settlement"
                      element={<CaptionCallFCCSettlementBlog />}
                    />
                    <Route
                      path="blog/hardware-diagnostics-itad-compliance"
                      element={<HardwareDiagnosticsITADComplianceBlog />}
                    />
                    <Route
                      path="blog/future-of-data-destruction"
                      element={<FutureOfDataDestructionBlog />}
                    />
                    <Route
                      path="blog/dod-vs-ieee-data-sanitization"
                      element={<DoDVsIEEEDataSanitizationBlog />}
                    />
                    <Route
                      path="blog/remote-work-data-erasure-best-practices"
                      element={<RemoteWorkDataErasureBestPracticesBlog />}
                    />
                    <Route
                      path="blog/ncua-third-party-data-disposal"
                      element={<NCUAThirdPartyDataDisposalBlog />}
                    />
                    <Route
                      path="blog/msp-erasure-as-a-service"
                      element={<MSPErasureAsAServiceBlog />}
                    />
                    <Route
                      path="blog/dell-data-wipe-vs-dsecure"
                      element={<DellDataWipeVsDSecureBlog />}
                    />
                    <Route
                      path="blog/common-criteria-certified-data-wiping"
                      element={<CommonCriteriaCertifiedDataWipingBlog />}
                    />
                    <Route
                      path="blog/erasure-as-a-service-dsecure"
                      element={<ErasureAsAServiceDSecureBlog />}
                    />
                    <Route
                      path="blog/returning-leased-it-hardware-dos-and-donts"
                      element={<ReturningLeasedITHardwareDosAndDontsBlog />}
                    />
                    <Route
                      path="blog/healthcare-ransomware-lessons"
                      element={<HealthcareRansomwareLessonsBlog />}
                    />
                    <Route
                      path="blog/mac-m1-erasure-known-issues"
                      element={<MacM1ErasureKnownIssuesBlog />}
                    />
                    <Route
                      path="blog/wipe-ssd-from-bios-guide"
                      element={<WipeSSDFromBIOSGuideBlog />}
                    />
                    <Route
                      path="blog/data-erasure-for-non-profits"
                      element={<DataErasureForNonProfitsBlog />}
                    />
                    <Route
                      path="blog/erase-mac-data-safely-using-dsecure"
                      element={<EraseMacDataSafelyUsingDSecureBlog />}
                    />
                    <Route
                      path="blog/erase-data-pc-laptop-desktop"
                      element={<EraseDataPcLaptopDesktopBlog />}
                    />

                    {/* Newly copied blog routes */}
                    <Route
                      path="blog/ccpa-violation"
                      element={<CCPAViolationBlog />}
                    />
                    <Route
                      path="blog/certified-itad-reasons"
                      element={<CertifiedITADReasonsBlog />}
                    />
                    <Route
                      path="blog/chain-of-custody"
                      element={<ChainOfCustodyBlog />}
                    />
                    <Route
                      path="blog/change-healthcare-attack"
                      element={<ChangeHealthcareAttackBlog />}
                    />
                    <Route
                      path="blog/chromebook-data-risks"
                      element={<ChromebookDataRisksBlog />}
                    />
                    <Route
                      path="blog/cloud-migration"
                      element={<CloudMigrationBlog />}
                    />
                    <Route
                      path="blog/common-criteria"
                      element={<CommonCriteriaBlog />}
                    />
                    <Route
                      path="blog/corporate-it-asset-risks"
                      element={<CorporateITAssetRisksBlog />}
                    />
                    <Route
                      path="blog/cryptographic-erase"
                      element={<CryptographicEraseBlog />}
                    />
                    <Route
                      path="blog/cybersecurity-data-destruction"
                      element={<CybersecurityDataDestructionBlog />}
                    />
                    <Route
                      path="blog/dsecure-operations"
                      element={<DSecureOperationsBlog />}
                    />
                    <Route
                      path="blog/dark-data-risks"
                      element={<DarkDataRisksBlog />}
                    />
                    <Route
                      path="blog/data-destruction-best-practices"
                      element={<DataDestructionBestPracticesBlog />}
                    />
                    <Route
                      path="blog/data-disposal-guidelines"
                      element={<DataDisposalGuidelinesBlog />}
                    />
                    <Route
                      path="blog/data-erasure-disaster-recovery"
                      element={<DataErasureDisasterRecoveryBlog />}
                    />
                    <Route
                      path="blog/data-erasure-myths"
                      element={<DataErasureMythsBlog />}
                    />
                    <Route
                      path="blog/data-hoarding"
                      element={<DataHoardingBlog />}
                    />
                    <Route
                      path="blog/data-privacy-obligations"
                      element={<DataPrivacyObligationsBlog />}
                    />
                    <Route
                      path="blog/data-remanence"
                      element={<DataRemanenceBlog />}
                    />
                    <Route
                      path="blog/data-remediation-erasure"
                      element={<DataRemediationErasureBlog />}
                    />
                    <Route
                      path="blog/data-retention-privacy"
                      element={<DataRetentionPrivacyBlog />}
                    />
                    <Route
                      path="blog/degaussing-risks"
                      element={<DegaussingRisksBlog />}
                    />
                    <Route
                      path="blog/deleted-files-truth"
                      element={<DeletedFilesTruthBlog />}
                    />
                    <Route
                      path="blog/deletion-vs-erasure"
                      element={<DeletionVsErasureBlog />}
                    />
                    <Route
                      path="blog/dell-data-wipe-alternative"
                      element={<DellDataWipeAlternativeBlog />}
                    />
                    <Route
                      path="blog/deployment-options"
                      element={<DeploymentOptionsBlog />}
                    />
                    <Route
                      path="blog/diagnostics-erasure-itad"
                      element={<DiagnosticsErasureITADBlog />}
                    />
                    <Route
                      path="blog/digital-divide"
                      element={<DigitalDivideBlog />}
                    />
                    <Route
                      path="blog/dod-vs-ieee"
                      element={<DoDVsIEEEBlog />}
                    />
                    <Route
                      path="blog/dod-wiping-standard"
                      element={<DoDWipingStandardBlog />}
                    />
                    <Route
                      path="blog/dumpster-diving-data-breach"
                      element={<DumpsterDivingDataBreachBlog />}
                    />
                    <Route path="blog/esg-report" element={<ESGReportBlog />} />
                    <Route path="blog/eu-csrd" element={<EUCSRDBlog />} />
                    <Route
                      path="blog/education-data-destruction"
                      element={<EducationDataDestructionBlog />}
                    />
                    <Route
                      path="blog/end-of-life-data-security"
                      element={<EndOfLifeDataSecurityBlog />}
                    />
                    <Route
                      path="blog/financial-data-breach-case-study"
                      element={<FinancialDataBreachCaseStudyBlog />}
                    />
                    <Route
                      path="blog/free-vs-pro-eraser"
                      element={<FreeVsProEraserBlog />}
                    />
                    <Route
                      path="blog/future-data-destruction"
                      element={<FutureDataDestructionBlog />}
                    />
                    <Route
                      path="blog/gdpr-seven-years"
                      element={<GDPRSevenYearsBlog />}
                    />
                    <Route
                      path="blog/government-device-theft-case-study"
                      element={<GovernmentDeviceTheftBlog />}
                    />
                    <Route
                      path="blog/government-it-disposal"
                      element={<GovernmentITDisposalBlog />}
                    />
                    <Route
                      path="blog/green-it-practices"
                      element={<GreenITPracticesBlog />}
                    />
                    <Route
                      path="blog/hipaa-compliance-erasure"
                      element={<HIPAAComplianceErasureBlog />}
                    />
                    <Route
                      path="blog/healthcare-data-breach-case-study"
                      element={<HealthcareDataBreachCaseStudyBlog />}
                    />
                    <Route path="blog/hex-viewer" element={<HexViewerBlog />} />
                    <Route
                      path="blog/hidden-disk-areas"
                      element={<HiddenDiskAreasBlog />}
                    />
                    <Route
                      path="blog/how-to-erase-mac"
                      element={<HowToEraseMacBlog />}
                    />
                    <Route
                      path="blog/ipad-tablet-erasure"
                      element={<IPadTabletErasureBlog />}
                    />
                    <Route
                      path="blog/itad-challenges"
                      element={<ITADChallengesBlog />}
                    />
                    <Route
                      path="blog/itad-environmental"
                      element={<ITADEnvironmentalBlog />}
                    />
                    <Route
                      path="blog/itad-market-growth"
                      element={<ITADMarketGrowthBlog />}
                    />
                    <Route
                      path="blog/itad-procurement"
                      element={<ITADProcurementBlog />}
                    />
                    <Route
                      path="blog/itam-data-breach"
                      element={<ITAMDataBreachBlog />}
                    />
                    <Route
                      path="blog/it-asset-lifecycle"
                      element={<ITAssetLifecycleBlog />}
                    />
                    <Route
                      path="blog/it-asset-reuse"
                      element={<ITAssetReuseBlog />}
                    />
                    <Route
                      path="blog/legal-ethical-erasure"
                      element={<LegalEthicalErasureBlog />}
                    />
                    <Route
                      path="blog/loose-drives-erasure-guide"
                      element={<LooseDrivesErasureGuideBlog />}
                    />
                    <Route
                      path="blog/m1-mac-erasure-issues"
                      element={<M1MacErasureIssuesBlog />}
                    />
                    <Route
                      path="blog/mdm-detection"
                      element={<MDMDetectionBlog />}
                    />
                    <Route
                      path="blog/msp-erasure-service"
                      element={<MSPErasureServiceBlog />}
                    />
                    <Route
                      path="blog/marriott-settlement"
                      element={<MarriottSettlementBlog />}
                    />
                    <Route
                      path="blog/media-sanitization-need"
                      element={<MediaSanitizationNeedBlog />}
                    />
                    <Route
                      path="blog/mobile-diagnostics-benefits"
                      element={<MobileDiagnosticsBenefitsBlog />}
                    />
                    <Route
                      path="blog/mobile-diagnostics-revolution"
                      element={<MobileDiagnosticsRevolutionBlog />}
                    />
                    <Route
                      path="blog/morgan-stanley-data-breach"
                      element={<MorganStanleyDataBreachBlog />}
                    />
                    <Route
                      path="blog/morgan-stanley-fine"
                      element={<MorganStanleyFineBlog />}
                    />
                    <Route
                      path="blog/ncua-guidelines"
                      element={<NCUAGuidelinesBlog />}
                    />
                    <Route
                      path="blog/nist-clear-purge"
                      element={<NISTClearPurgeBlog />}
                    />
                    <Route
                      path="blog/nist-tested-erasure-software"
                      element={<NISTTestedErasureSoftwareBlog />}
                    />
                    <Route
                      path="blog/nist-vs-ieee"
                      element={<NISTVsIEEEBlog />}
                    />
                    <Route
                      path="blog/onsite-vs-offsite-destruction"
                      element={<OnsiteVsOffsiteDestructionBlog />}
                    />
                    <Route
                      path="blog/phi-erasure"
                      element={<PHIErasureBlog />}
                    />
                    <Route
                      path="blog/pii-disposal-breach"
                      element={<PIIDisposalBreachBlog />}
                    />
                    <Route
                      path="blog/post-covid-data-disposal"
                      element={<PostCovidDataDisposalBlog />}
                    />
                    <Route
                      path="blog/private-cloud"
                      element={<PrivateCloudBlog />}
                    />
                    <Route
                      path="blog/remote-wiping-software"
                      element={<RemoteWipingSoftwareBlog />}
                    />
                    <Route
                      path="blog/remote-work-data-erasure"
                      element={<RemoteWorkDataErasureBlog />}
                    />
                    <Route
                      path="blog/reseller-profits"
                      element={<ResellerProfitsBlog />}
                    />
                    <Route
                      path="blog/right-to-repair"
                      element={<RightToRepairBlog />}
                    />
                    <Route
                      path="blog/ssd-wipe-bios"
                      element={<SSDWipeBIOSBlog />}
                    />
                    <Route
                      path="blog/secure-file-erase"
                      element={<SecureFileEraseBlog />}
                    />
                    <Route
                      path="blog/secure-hdd-disposal"
                      element={<SecureHDDDisposalBlog />}
                    />
                    <Route
                      path="blog/secure-it-asset-disposal"
                      element={<SecureITAssetDisposalBlog />}
                    />
                    <Route
                      path="blog/secure-smartphone-erasure"
                      element={<SecureSmartphoneErasureBlog />}
                    />
                    <Route
                      path="blog/server-erasure"
                      element={<ServerErasureBlog />}
                    />
                    <Route
                      path="blog/shadow-data"
                      element={<ShadowDataBlog />}
                    />
                    <Route
                      path="blog/statutory-compliance"
                      element={<StatutoryComplianceBlog />}
                    />
                    <Route
                      path="blog/ultratest-comparison"
                      element={<UltratestComparisonBlog />}
                    />
                    <Route path="blog/vm-erasure" element={<VMErasureBlog />} />
                    <Route
                      path="blog/windows-10-eos"
                      element={<Windows10EOSBlog />}
                    />
                    <Route
                      path="blog/wipe-computer-donating"
                      element={<WipeComputerDonatingBlog />}
                    />
                    <Route
                      path="blog/world-class-nps"
                      element={<WorldClassNPSBlog />}
                    />
                    <Route
                      path="blog/caption-call-settlement"
                      element={<CaptionCallSettlementBlog />}
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
    </QueryClientProvider>
  );
}
