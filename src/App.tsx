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
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CloudErasurePage = lazy(
  () => import("./pages/services/CloudErasurePage")
);
const SolutionsPage = lazy(() => import("./pages/SolutionsPage"));
const CompliancePage = lazy(() => import("./pages/CompliancePage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
// const Enterprise=lazy(()=>import("./pages/solutions/EnterpriseSolutionsPage"));
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
import ApiTestPage from "./pages/ApiTestPage";
import EnterprisePage from "./pages/EnterprisePage";
import HealthcareServices from "./pages/HealthcareServices";
import ITADSolution from "./pages/ITADSolution";
import AdminProfileEdit from "./pages/admin/AdminProfileEdit";
import EnhancedUserDashboard from "./pages/dashboards/EnhancedUserDashboard";
const HealthcareSolutionsPage = lazy(() => import("./pages/solutions/HealthcareSolutionsPage"));
const SearchDemoPage = lazy(() => import("./pages/SearchDemoPage"));


// Manual Pages
const InstallationPage = lazy(
  () => import("./pages/support/manual/InstallationPage")
);
const FirstTimeSetupPage = lazy(
  () => import("./pages/support/manual/FirstTimeSetupPage")
);
const UserInterfacePage = lazy(
  () => import("./pages/support/manual/UserInterfacePage")
);
const QuickStartTutorial = lazy(
  () => import("./pages/support/manual/QuickstartPage")
);
const OverwritePatternsPage = lazy(
  () => import("./pages/support/manual/OverwritePatternsPage")
);
const CryptographicErasurePage = lazy(
  () => import("./pages/support/manual/CryptographicErasurePage")
);
const PhysicalDestructionPage = lazy(
  () => import("./pages/support/manual/PhysicalDestructionPage")
);
const VerificationMethodsPage = lazy(
  () => import("./pages/support/manual/VerificationMethodsPage")
);
const WindowsSystemsPage = lazy(
  () => import("./pages/support/manual/WindowsSystemsPage")
);
const MacOSSystemsPage = lazy(
  () => import("./pages/support/manual/MacOSSystemsPage")
);
const LinuxSystemsPage = lazy(
  () => import("./pages/support/manual/LinuxSystemsPage")
);
const CommonIssuesPage = lazy(
  () => import("./pages/support/manual/CommonIssuesPage")
);
const ErrorCodesPage = lazy(
  () => import("./pages/support/manual/ErrorCodesPage")
);
const MobileDevicesPage = lazy(
  () => import("./pages/support/manual/MobileDevicesPage")
);
const EnterpriseServersPage = lazy(
  () => import("./pages/support/manual/EnterpriseServersPage")
);
const BatchOperationsPage = lazy(
  () => import("./pages/support/manual/BatchOperationsPage")
);
const RemoteManagementPage = lazy(
  () => import("./pages/support/manual/RemoteManagementPage")
);
const ScriptingAutomationPage = lazy(
  () => import("./pages/support/manual/ScriptingAutomationPage")
);
const CustomConfigurationsPage = lazy(
  () => import("./pages/support/manual/CustomConfigurationsPage")
);
const ComplianceStandardsPage = lazy(
  () => import("./pages/support/manual/ComplianceStandardsPage")
);
const CertificateGenerationPage = lazy(
  () => import("./pages/support/manual/CertificateGenerationPage")
);
const AuditTrailsPage = lazy(
  () => import("./pages/support/manual/AuditTrailsPage")
);
const ChainCustodyPage = lazy(
  () => import("./pages/support/manual/ChainCustodyPage")
);
const PerformanceOptimizationPage = lazy(
  () => import("./pages/support/manual/PerformanceOptimizationPage")
);
const RecoveryProceduresPage = lazy(
  () => import("./pages/support/manual/RecoveryProceduresPage")
);
const WindowsIntroductionPage = lazy(
  () => import("./pages/support/manual/WindowsIntroductionPage")
);
const WindowsBuiltinToolsPage = lazy(
  () => import("./pages/support/manual/WindowsBuiltinToolsPage")
);

const WindowsStoragePage = lazy(
  () => import("./pages/support/manual/WindowsStoragePage")
);
const WindowsPreparationPage = lazy(
  () => import("./pages/support/manual/WindowsPreparationPage")
);
const WindowsTroubleshootingPage = lazy(
  () => import("./pages/support/manual/WindowsTroubleshootingPage")
);
const WindowsEnterprisePage = lazy(
  () => import("./pages/support/manual/WindowsEnterprisePage")
);
const WindowsRisksPage = lazy(
  () => import("./pages/support/manual/WindowsRisksPage")
);
const WindowsFilesystemsPage = lazy(
  () => import("./pages/support/manual/WindowsFilesystemsPage")
);
const WindowsSystemFilesPage = lazy(
  () => import("./pages/support/manual/WindowsSystemFilesPage")
);
const WindowsResidualDataPage = lazy(
  () => import("./pages/support/manual/WindowsResidualDataPage")
);
const WindowsSoftwareErasurePage = lazy(
  () => import("./pages/support/manual/WindowsSoftwareErasurePage")
);
const WindowsCryptoErasurePage = lazy(
  () => import("./pages/support/manual/WindowsCryptoErasurePage")
);
const WindowsMethodsComparisonPage = lazy(
  () => import("./pages/support/manual/WindowsMethodsComparisonPage")
);
const WindowsCommandLinePage = lazy(
  () => import("./pages/support/manual/WindowsCommandLinePage")
);
const PreInstallationPage = lazy(
  () => import("./pages/support/manual/PreInstallationPage")
);
const DownloadInstallerPage = lazy(
  () => import("./pages/support/manual/DownloadInstallerPage")
);
const LicenseActivationPage = lazy(
  () => import("./pages/support/manual/LicenseActivationPage")
);
const InstallationSettingsPage = lazy(
  () => import("./pages/support/manual/InstallationSettingsPage")
);
const InstallationProgressPage = lazy(
  () => import("./pages/support/manual/InstallationProgressPage")
);
const SystemRequirementsPage = lazy(
  () => import("./pages/support/manual/SystemRequirementsPage")
);
const SetupWizardPage = lazy(
  () => import("./pages/support/manual/SetupWizardPage")
);
const FirstScanPage = lazy(
  () => import("./pages/support/manual/FirstScanPage")
);
const KeyActivationPage = lazy(
  () => import("./pages/support/manual/KeyActivationPage")
);
const FirewallSetupPage = lazy(
  () => import("./pages/support/manual/FirewallSetupPage")
);
const MainDashboardPage = lazy(
  () => import("./pages/support/manual/MainDashboardPage")
);
const NavigationPage = lazy(
  () => import("./pages/support/manual/NavigationPage")
);
const StatusIndicatorsPage = lazy(
  () => import("./pages/support/manual/StatusIndicatorsPage")
);
const DeviceSelectionPage = lazy(
  () => import("./pages/support/manual/DeviceSelectionPage")
);
const StartErasurePage = lazy(
  () => import("./pages/support/manual/StartErasurePage")
);
const ProgressMonitoringPage = lazy(
  () => import("./pages/support/manual/ProgressMonitoringPage")
);
const EnterpriseIntegrationPage = lazy(
  () => import("./pages/support/manual/EnterpriseIntegrationPage")
);
const UserManagementPage = lazy(
  () => import("./pages/support/manual/UserManagementPage")
);
const ErasurePreferencesPage = lazy(
  () => import("./pages/support/manual/ErasurePreferencesPage")
);
const ErasureReportsPage = lazy(
  () => import("./pages/support/manual/ErasureReportsPage")
);
const GeneralSettingsPage = lazy(
  () => import("./pages/support/manual/GeneralSettingsPage")
);
const CustomDashboardsPage = lazy(
  () => import("./pages/support/manual/CustomDashboardsPage")
);
const ComplianceExportPage = lazy(
  () => import("./pages/support/manual/ComplianceExportPage")
);
const OperationHistoryPage = lazy(
  () => import("./pages/support/manual/OperationHistoryPage")
);
const ApiIntegrationPage = lazy(
  () => import("./pages/support/manual/ApiIntegrationPage")
);
const KeyboardShortcutsPage = lazy(
  () => import("./pages/support/manual/KeyboardShortcutsPage")
);
const VerificationOverviewPage = lazy(
  () => import("./pages/support/manual/VerificationOverviewPage")
);

const ReadbackVerificationPage = lazy(
  () => import("./pages/support/manual/ReadbackVerificationPage")
);
const Nist80088Page = lazy(
  () => import("./pages/support/manual/Nist80088Page")
);
const AccessVerificationPage = lazy(() => import("./pages/support/manual/AccessVerificationPage"));
const ActivationKeyPage = lazy(() => import("./pages/support/manual/ActivationKeyPage"));
const AuditPreparationPage = lazy(() => import("./pages/support/manual/AuditPreparationPage"));
const AuditVerificationPage = lazy(() => import("./pages/support/manual/AuditVerificationPage"));
const AutoUpdatesPage = lazy(() => import("./pages/support/manual/AutoUpdatesPage"));
const BankingFinancePage = lazy(() => import("./pages/support/manual/BankingFinancePage"));
const BankingModePage = lazy(() => import("./pages/support/manual/BankingModePage"));
const BestPracticesPage = lazy(() => import("./pages/support/manual/BestPracticesPage"));
const BitraserIntegrationPage = lazy(() => import("./pages/support/manual/BitraserIntegrationPage"));
const CertificateDestructionPage = lazy(() => import("./pages/support/manual/CertificateDestructionPage"));
const CloudConsolePage = lazy(() => import("./pages/support/manual/CloudConsolePage"));
const ComparisonTablePage = lazy(() => import("./pages/support/manual/ComparisonTablePage"));
const CrushingMethodPage = lazy(() => import("./pages/support/manual/CrushingMethodPage"));
const CryptoBenefitsPage = lazy(() => import("./pages/support/manual/CryptoBenefitsPage"));
const CryptoImportancePage = lazy(() => import("./pages/support/manual/CryptoImportancePage"));
const CryptoProcessPage = lazy(() => import("./pages/support/manual/CryptoProcessPage"));
const CryptoVerificationPage = lazy(() => import("./pages/support/manual/CryptoVerificationPage"));
const CustomAlgorithmsPage = lazy(() => import("./pages/support/manual/CustomAlgorithmsPage"));
const DegaussingMethodPage = lazy(() => import("./pages/support/manual/DegaussingMethodPage"));
const DestructionQualityPage = lazy(() => import("./pages/support/manual/DestructionQualityPage"));
const DestructionStandardsPage = lazy(() => import("./pages/support/manual/DestructionStandardsPage"));
const DestructionUseCasesPage = lazy(() => import("./pages/support/manual/DestructionUseCasesPage"));
const DodStandardsPage = lazy(() => import("./pages/support/manual/DodStandardsPage"));
const Dod3passPage = lazy(() => import("./pages/support/manual/Dod3passPage"));
const Dod7passPage = lazy(() => import("./pages/support/manual/Dod7passPage"));
const EnterpriseBenefitsPage = lazy(() => import("./pages/support/manual/EnterpriseBenefitsPage"));
const EnvironmentalConsiderationsPage = lazy(() => import("./pages/support/manual/EnvironmentalConsiderationsPage"));
const EnvironmentalImpactPage = lazy(() => import("./pages/support/manual/EnvironmentalImpactPage"));
const ErasureProcessPage = lazy(() => import("./pages/support/manual/ErasureProcessPage"));
const FaqsPage = lazy(() => import("./pages/support/manual/FaqsPage"));
const FinancialVerificationPage = lazy(() => import("./pages/support/manual/FinancialVerificationPage"));
const FirewallConfigPage = lazy(() => import("./pages/support/manual/FirewallConfigPage"));
const FirstRunPage = lazy(() => import("./pages/support/manual/FirstRunPage"));
const FragmentVerificationPage = lazy(() => import("./pages/support/manual/FragmentVerificationPage"));
const FutureTrendsPage = lazy(() => import("./pages/support/manual/FutureTrendsPage"));
const GdprVerificationPage = lazy(() => import("./pages/support/manual/GdprVerificationPage"));
const GovernmentDefensePage = lazy(() => import("./pages/support/manual/GovernmentDefensePage"));
const GovernmentVerificationPage = lazy(() => import("./pages/support/manual/GovernmentVerificationPage"));
const HardwareSanitizationPage = lazy(() => import("./pages/support/manual/HardwareSanitizationPage"));
const HddDestructionPage = lazy(() => import("./pages/support/manual/HddDestructionPage"));
const HealthcareDestructionPage = lazy(() => import("./pages/support/manual/HealthcareDestructionPage"));
const HealthcareVerificationPage = lazy(() => import("./pages/support/manual/HealthcareVerificationPage"));
const ImplementationConsiderationsPage = lazy(() => import("./pages/support/manual/ImplementationConsiderationsPage"));
const ImplementationPracticesPage = lazy(() => import("./pages/support/manual/ImplementationPracticesPage"));
const IncinerationMethodPage = lazy(() => import("./pages/support/manual/IncinerationMethodPage"));
const IndustryApplicationsPage = lazy(() => import("./pages/support/manual/IndustryApplicationsPage"));
const IndustryUseCasesPage = lazy(() => import("./pages/support/manual/IndustryUseCasesPage"));
const InstallationPathPage = lazy(() => import("./pages/support/manual/InstallationPathPage"));
const InternetRequirementsPage = lazy(() => import("./pages/support/manual/InternetRequirementsPage"));
const ItadDatacentersPage = lazy(() => import("./pages/support/manual/ItadDatacentersPage"));
const KeyDestructionVerifyPage = lazy(() => import("./pages/support/manual/KeyDestructionVerifyPage"));
const LicenseAgreementPage = lazy(() => import("./pages/support/manual/LicenseAgreementPage"));
const LicenseTroubleshootingPage = lazy(() => import("./pages/support/manual/LicenseTroubleshootingPage"));
const LimitationsPage = lazy(() => import("./pages/support/manual/LimitationsPage"));
const MacosAppleSiliconPage = lazy(() => import("./pages/support/manual/MacosAppleSiliconPage"));
const MacosArchitecturePage = lazy(() => import("./pages/support/manual/MacosArchitecturePage"));
const MacosBestPracticesPage = lazy(() => import("./pages/support/manual/MacosBestPracticesPage"));
const MacosBuiltinToolsPage = lazy(() => import("./pages/support/manual/MacosBuiltinToolsPage"));
const MacosCompliancePage = lazy(() => import("./pages/support/manual/MacosCompliancePage"));
const MacosCryptoErasurePage = lazy(() => import("./pages/support/manual/MacosCryptoErasurePage"));
const MacosEncryptionPage = lazy(() => import("./pages/support/manual/MacosEncryptionPage"));
const MacosEnterprisePage = lazy(() => import("./pages/support/manual/MacosEnterprisePage"));
const MacosExternalMediaPage = lazy(() => import("./pages/support/manual/MacosExternalMediaPage"));
const MacosFaqPage = lazy(() => import("./pages/support/manual/MacosFaqPage"));
const MacosFilesystemsPage = lazy(() => import("./pages/support/manual/MacosFilesystemsPage"));
const MacosFilevaultPage = lazy(() => import("./pages/support/manual/MacosFilevaultPage"));
const MacosIntelProceduresPage = lazy(() => import("./pages/support/manual/MacosIntelProceduresPage"));
const MacosIntroductionPage = lazy(() => import("./pages/support/manual/MacosIntroductionPage"));
const MacosMethodsComparisonPage = lazy(() => import("./pages/support/manual/MacosMethodsComparisonPage"));
const MacosPreparationPage = lazy(() => import("./pages/support/manual/MacosPreparationPage"));
const MacosResourcesPage = lazy(() => import("./pages/support/manual/MacosResourcesPage"));
const MacosRisksPage = lazy(() => import("./pages/support/manual/MacosRisksPage"));
const MacosSoftwareErasurePage = lazy(() => import("./pages/support/manual/MacosSoftwareErasurePage"));
const MacosSsdConsiderationsPage = lazy(() => import("./pages/support/manual/MacosSsdConsiderationsPage"));
const MacosStoragePage = lazy(() => import("./pages/support/manual/MacosStoragePage"));
const MacosSystemDrivePage = lazy(() => import("./pages/support/manual/MacosSystemDrivePage"));
const MacosThirdPartyPage = lazy(() => import("./pages/support/manual/MacosThirdPartyPage"));
const MacosToolSelectionPage = lazy(() => import("./pages/support/manual/MacosToolSelectionPage"));
const MacosTroubleshootingPage = lazy(() => import("./pages/support/manual/MacosTroubleshootingPage"));
const MacosVerificationPage = lazy(() => import("./pages/support/manual/MacosVerificationPage"));
const MobileDestructionPage = lazy(() => import("./pages/support/manual/MobileDestructionPage"));
const NistGuidelinesPage = lazy(() => import("./pages/support/manual/NistGuidelinesPage"));
const NistModernStoragePage = lazy(() => import("./pages/support/manual/NistModernStoragePage"));
const OnsiteOffsitePage = lazy(() => import("./pages/support/manual/OnsiteOffsitePage"));
const OpticalTapeDestructionPage = lazy(() => import("./pages/support/manual/OpticalTapeDestructionPage"));
const OverwriteIntroductionPage = lazy(() => import("./pages/support/manual/OverwriteIntroductionPage"));
const OverwriteRisksPage = lazy(() => import("./pages/support/manual/OverwriteRisksPage"));
const ParentalControlsPage = lazy(() => import("./pages/support/manual/ParentalControlsPage"));
const PatternSelectionPage = lazy(() => import("./pages/support/manual/PatternSelectionPage"));
const PerformanceAnalysisPage = lazy(() => import("./pages/support/manual/PerformanceAnalysisPage"));
const PerformanceTradeoffsPage = lazy(() => import("./pages/support/manual/PerformanceTradeoffsPage"));
const PerformanceTroubleshootingPage = lazy(() => import("./pages/support/manual/PerformanceTroubleshootingPage"));
const PerformanceTuningPage = lazy(() => import("./pages/support/manual/PerformanceTuningPage"));
const PhysicalDestructionOverviewPage = lazy(() => import("./pages/support/manual/PhysicalDestructionOverviewPage"));
const PhysicalInspectionPage = lazy(() => import("./pages/support/manual/PhysicalInspectionPage"));
const PostInstallOptimizationPage = lazy(() => import("./pages/support/manual/PostInstallOptimizationPage"));
const RealTimeMonitoringPage = lazy(() => import("./pages/support/manual/RealTimeMonitoringPage"));
const RealtimeProtectionPage = lazy(() => import("./pages/support/manual/RealtimeProtectionPage"));
const RegulatoryCompliancePage = lazy(() => import("./pages/support/manual/RegulatoryCompliancePage"));
const SamplingMethodologyPage = lazy(() => import("./pages/support/manual/SamplingMethodologyPage"));
const SanitizationConceptsPage = lazy(() => import("./pages/support/manual/SanitizationConceptsPage"));
const ScanExclusionsPage = lazy(() => import("./pages/support/manual/ScanExclusionsPage"));
const ScanResultsPage = lazy(() => import("./pages/support/manual/ScanResultsPage"));
const ScanSchedulingPage = lazy(() => import("./pages/support/manual/ScanSchedulingPage"));
const SecurityAssurancePage = lazy(() => import("./pages/support/manual/SecurityAssurancePage"));
const SecurityProtocolsPage = lazy(() => import("./pages/support/manual/SecurityProtocolsPage"));
const ServiceWorkflowPage = lazy(() => import("./pages/support/manual/ServiceWorkflowPage"));
const ShreddingMethodPage = lazy(() => import("./pages/support/manual/ShreddingMethodPage"));
const SoftwareSupportedMediaPage = lazy(() => import("./pages/support/manual/SoftwareSupportedMediaPage"));
const SoftwareVerificationPage = lazy(() => import("./pages/support/manual/SoftwareVerificationPage"));
const SsdChallengesPage = lazy(() => import("./pages/support/manual/SsdChallengesPage"));
const SsdDestructionPage = lazy(() => import("./pages/support/manual/SsdDestructionPage"));
const StandardsComparisonPage = lazy(() => import("./pages/support/manual/StandardsComparisonPage"));
const StatisticalConfidencePage = lazy(() => import("./pages/support/manual/StatisticalConfidencePage"));
const SupportedDevicesPage = lazy(() => import("./pages/support/manual/SupportedDevicesPage"));
const SupportedEncryptionPage = lazy(() => import("./pages/support/manual/SupportedEncryptionPage"));
const SystemScanningPage = lazy(() => import("./pages/support/manual/SystemScanningPage"));
const UseCasesPage = lazy(() => import("./pages/support/manual/UseCasesPage"));
const UserProfilePage = lazy(() => import("./pages/support/manual/UserProfilePage"));
const VerificationChallengesPage = lazy(() => import("./pages/support/manual/VerificationChallengesPage"));
const VerificationImportancePage = lazy(() => import("./pages/support/manual/VerificationImportancePage"));
const VerificationLogsPage = lazy(() => import("./pages/support/manual/VerificationLogsPage"));
const VerificationRisksPage = lazy(() => import("./pages/support/manual/VerificationRisksPage"));
const VerificationStandardsPage = lazy(() => import("./pages/support/manual/VerificationStandardsPage"));
const VerificationTechniquesPage = lazy(() => import("./pages/support/manual/VerificationTechniquesPage"));
const VerificationToolsPage = lazy(() => import("./pages/support/manual/VerificationToolsPage"));
const VirusDefinitionsPage = lazy(() => import("./pages/support/manual/VirusDefinitionsPage"));
const VisualConfirmationPage = lazy(() => import("./pages/support/manual/VisualConfirmationPage"));
const VpnSetupPage = lazy(() => import("./pages/support/manual/VpnSetupPage"));
const WhyPhysicalDestructionPage = lazy(() => import("./pages/support/manual/WhyPhysicalDestructionPage"));
const WindowsBestPracticesPage = lazy(() => import("./pages/support/manual/WindowsBestPracticesPage"));
const WindowsBitlockerPage = lazy(() => import("./pages/support/manual/WindowsBitlockerPage"));
const WindowsBootableUsbPage = lazy(() => import("./pages/support/manual/WindowsBootableUsbPage"));
const WindowsCompliancePage = lazy(() => import("./pages/support/manual/WindowsCompliancePage"));
const WindowsDsecureEraserPage = lazy(() => import("./pages/support/manual/WindowsDsecureEraserPage"));
const WindowsFaqPage = lazy(() => import("./pages/support/manual/WindowsFaqPage"));
const WindowsResourcesPage = lazy(() => import("./pages/support/manual/WindowsResourcesPage"));
const WindowsSedDrivesPage = lazy(() => import("./pages/support/manual/WindowsSedDrivesPage"));
const WindowsSsdErasurePage = lazy(() => import("./pages/support/manual/WindowsSsdErasurePage"));
const WindowsThirdPartyPage = lazy(() => import("./pages/support/manual/WindowsThirdPartyPage"));
const WindowsVerificationPage = lazy(() => import("./pages/support/manual/WindowsVerificationPage"));

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
                    path="services/cloud-erasure"
                    element={<CloudErasurePage />}
                  />


                  {/* Solutions */}
                  <Route path="solutions" element={<SolutionsPage />} />
                  <Route
                    path="solutions/education"
                    element={<EducationPage />}
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
                    path="search-demo"
                    element={<SearchDemoPage />}
                  />

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
                  <Route path="enterprise" element={<EnterprisePage />} />
                  <Route path="healthcare-services" element={<HealthcareServices />} />
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
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="profile/edit" element={<AdminProfileEdit />} />
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
                  <Route path="/support/manual/access-verification" element={<AccessVerificationPage />} />
                  <Route path="/support/manual/activation-key" element={<ActivationKeyPage />} />
                  <Route path="/support/manual/audit-preparation" element={<AuditPreparationPage />} />
                  <Route path="/support/manual/audit-verification" element={<AuditVerificationPage />} />
                  <Route path="/support/manual/auto-updates" element={<AutoUpdatesPage />} />
                  <Route path="/support/manual/banking-finance" element={<BankingFinancePage />} />
                  <Route path="/support/manual/banking-mode" element={<BankingModePage />} />
                  <Route path="/support/manual/best-practices" element={<BestPracticesPage />} />
                  <Route path="/support/manual/bitraser-integration" element={<BitraserIntegrationPage />} />
                  <Route path="/support/manual/certificate-destruction" element={<CertificateDestructionPage />} />
                  <Route path="/support/manual/cloud-console" element={<CloudConsolePage />} />
                  <Route path="/support/manual/comparison-table" element={<ComparisonTablePage />} />
                  <Route path="/support/manual/crushing-method" element={<CrushingMethodPage />} />
                  <Route path="/support/manual/crypto-benefits" element={<CryptoBenefitsPage />} />
                  <Route path="/support/manual/crypto-importance" element={<CryptoImportancePage />} />
                  <Route path="/support/manual/crypto-process" element={<CryptoProcessPage />} />
                  <Route path="/support/manual/crypto-verification" element={<CryptoVerificationPage />} />
                  <Route path="/support/manual/custom-algorithms" element={<CustomAlgorithmsPage />} />
                  <Route path="/support/manual/degaussing-method" element={<DegaussingMethodPage />} />
                  <Route path="/support/manual/destruction-quality" element={<DestructionQualityPage />} />
                  <Route path="/support/manual/destruction-standards" element={<DestructionStandardsPage />} />
                  <Route path="/support/manual/destruction-use-cases" element={<DestructionUseCasesPage />} />
                  <Route path="/support/manual/dod-standards" element={<DodStandardsPage />} />
                  <Route path="/support/manual/enterprise-benefits" element={<EnterpriseBenefitsPage />} />
                  <Route path="/support/manual/environmental-considerations" element={<EnvironmentalConsiderationsPage />} />
                  <Route path="/support/manual/environmental-impact" element={<EnvironmentalImpactPage />} />
                  <Route path="/support/manual/erasure-process" element={<ErasureProcessPage />} />
                  <Route path="/support/manual/faqs" element={<FaqsPage />} />
                  <Route path="/support/manual/financial-verification" element={<FinancialVerificationPage />} />
                  <Route path="/support/manual/firewall-config" element={<FirewallConfigPage />} />
                  <Route path="/support/manual/first-run" element={<FirstRunPage />} />
                  <Route path="/support/manual/fragment-verification" element={<FragmentVerificationPage />} />
                  <Route path="/support/manual/future-trends" element={<FutureTrendsPage />} />
                  <Route path="/support/manual/gdpr-verification" element={<GdprVerificationPage />} />
                  <Route path="/support/manual/government-defense" element={<GovernmentDefensePage />} />
                  <Route path="/support/manual/government-verification" element={<GovernmentVerificationPage />} />
                  <Route path="/support/manual/hardware-sanitization" element={<HardwareSanitizationPage />} />
                  <Route path="/support/manual/hdd-destruction" element={<HddDestructionPage />} />
                  <Route path="/support/manual/healthcare-destruction" element={<HealthcareDestructionPage />} />
                  <Route path="/support/manual/healthcare-verification" element={<HealthcareVerificationPage />} />
                  <Route path="/support/manual/implementation-considerations" element={<ImplementationConsiderationsPage />} />
                  <Route path="/support/manual/implementation-practices" element={<ImplementationPracticesPage />} />
                  <Route path="/support/manual/incineration-method" element={<IncinerationMethodPage />} />
                  <Route path="/support/manual/industry-applications" element={<IndustryApplicationsPage />} />
                  <Route path="/support/manual/industry-use-cases" element={<IndustryUseCasesPage />} />
                  <Route path="/support/manual/installation-path" element={<InstallationPathPage />} />
                  <Route path="/support/manual/internet-requirements" element={<InternetRequirementsPage />} />
                  <Route path="/support/manual/itad-datacenters" element={<ItadDatacentersPage />} />
                  <Route path="/support/manual/key-destruction-verify" element={<KeyDestructionVerifyPage />} />
                  <Route path="/support/manual/license-agreement" element={<LicenseAgreementPage />} />
                  <Route path="/support/manual/license-troubleshooting" element={<LicenseTroubleshootingPage />} />
                  <Route path="/support/manual/limitations" element={<LimitationsPage />} />
                  <Route path="/support/manual/macos-apple-silicon" element={<MacosAppleSiliconPage />} />
                  <Route path="/support/manual/macos-architecture" element={<MacosArchitecturePage />} />
                  <Route path="/support/manual/macos-best-practices" element={<MacosBestPracticesPage />} />
                  <Route path="/support/manual/macos-builtin-tools" element={<MacosBuiltinToolsPage />} />
                  <Route path="/support/manual/macos-compliance" element={<MacosCompliancePage />} />
                  <Route path="/support/manual/macos-crypto-erasure" element={<MacosCryptoErasurePage />} />
                  <Route path="/support/manual/macos-encryption" element={<MacosEncryptionPage />} />
                  <Route path="/support/manual/macos-enterprise" element={<MacosEnterprisePage />} />
                  <Route path="/support/manual/macos-external-media" element={<MacosExternalMediaPage />} />
                  <Route path="/support/manual/macos-faq" element={<MacosFaqPage />} />
                  <Route path="/support/manual/macos-filesystems" element={<MacosFilesystemsPage />} />
                  <Route path="/support/manual/macos-filevault" element={<MacosFilevaultPage />} />
                  <Route path="/support/manual/macos-intel-procedures" element={<MacosIntelProceduresPage />} />
                  <Route path="/support/manual/macos-introduction" element={<MacosIntroductionPage />} />
                  <Route path="/support/manual/macos-methods-comparison" element={<MacosMethodsComparisonPage />} />
                  <Route path="/support/manual/macos-preparation" element={<MacosPreparationPage />} />
                  <Route path="/support/manual/macos-resources" element={<MacosResourcesPage />} />
                  <Route path="/support/manual/macos-risks" element={<MacosRisksPage />} />
                  <Route path="/support/manual/macos-software-erasure" element={<MacosSoftwareErasurePage />} />
                  <Route path="/support/manual/macos-ssd-considerations" element={<MacosSsdConsiderationsPage />} />
                  <Route path="/support/manual/macos-storage" element={<MacosStoragePage />} />
                  <Route path="/support/manual/macos-system-drive" element={<MacosSystemDrivePage />} />
                  <Route path="/support/manual/macos-third-party" element={<MacosThirdPartyPage />} />
                  <Route path="/support/manual/macos-tool-selection" element={<MacosToolSelectionPage />} />
                  <Route path="/support/manual/macos-troubleshooting" element={<MacosTroubleshootingPage />} />
                  <Route path="/support/manual/macos-verification" element={<MacosVerificationPage />} />
                  <Route path="/support/manual/mobile-destruction" element={<MobileDestructionPage />} />
                  <Route path="/support/manual/nist-guidelines" element={<NistGuidelinesPage />} />
                  <Route path="/support/manual/nist-modern-storage" element={<NistModernStoragePage />} />
                  <Route path="/support/manual/onsite-offsite" element={<OnsiteOffsitePage />} />
                  <Route path="/support/manual/optical-tape-destruction" element={<OpticalTapeDestructionPage />} />
                  <Route path="/support/manual/overwrite-introduction" element={<OverwriteIntroductionPage />} />
                  <Route path="/support/manual/overwrite-risks" element={<OverwriteRisksPage />} />
                  <Route path="/support/manual/parental-controls" element={<ParentalControlsPage />} />
                  <Route path="/support/manual/pattern-selection" element={<PatternSelectionPage />} />
                  <Route path="/support/manual/performance-analysis" element={<PerformanceAnalysisPage />} />
                  <Route path="/support/manual/performance-tradeoffs" element={<PerformanceTradeoffsPage />} />
                  <Route path="/support/manual/performance-troubleshooting" element={<PerformanceTroubleshootingPage />} />
                  <Route path="/support/manual/performance-tuning" element={<PerformanceTuningPage />} />
                  <Route path="/support/manual/physical-destruction-overview" element={<PhysicalDestructionOverviewPage />} />
                  <Route path="/support/manual/physical-inspection" element={<PhysicalInspectionPage />} />
                  <Route path="/support/manual/post-install-optimization" element={<PostInstallOptimizationPage />} />
                  <Route path="/support/manual/real-time-monitoring" element={<RealTimeMonitoringPage />} />
                  <Route path="/support/manual/realtime-protection" element={<RealtimeProtectionPage />} />
                  <Route path="/support/manual/regulatory-compliance" element={<RegulatoryCompliancePage />} />
                  <Route path="/support/manual/sampling-methodology" element={<SamplingMethodologyPage />} />
                  <Route path="/support/manual/sanitization-concepts" element={<SanitizationConceptsPage />} />
                  <Route path="/support/manual/scan-exclusions" element={<ScanExclusionsPage />} />
                  <Route path="/support/manual/scan-results" element={<ScanResultsPage />} />
                  <Route path="/support/manual/scan-scheduling" element={<ScanSchedulingPage />} />
                  <Route path="/support/manual/security-assurance" element={<SecurityAssurancePage />} />
                  <Route path="/support/manual/security-protocols" element={<SecurityProtocolsPage />} />
                  <Route path="/support/manual/service-workflow" element={<ServiceWorkflowPage />} />
                  <Route path="/support/manual/shredding-method" element={<ShreddingMethodPage />} />
                  <Route path="/support/manual/software-supported-media" element={<SoftwareSupportedMediaPage />} />
                  <Route path="/support/manual/software-verification" element={<SoftwareVerificationPage />} />
                  <Route path="/support/manual/ssd-challenges" element={<SsdChallengesPage />} />
                  <Route path="/support/manual/ssd-destruction" element={<SsdDestructionPage />} />
                  <Route path="/support/manual/standards-comparison" element={<StandardsComparisonPage />} />
                  <Route path="/support/manual/statistical-confidence" element={<StatisticalConfidencePage />} />
                  <Route path="/support/manual/supported-devices" element={<SupportedDevicesPage />} />
                  <Route path="/support/manual/supported-encryption" element={<SupportedEncryptionPage />} />
                  <Route path="/support/manual/system-scanning" element={<SystemScanningPage />} />
                  <Route path="/support/manual/use-cases" element={<UseCasesPage />} />
                  <Route path="/support/manual/user-profile" element={<UserProfilePage />} />
                  <Route path="/support/manual/verification-challenges" element={<VerificationChallengesPage />} />
                  <Route path="/support/manual/verification-importance" element={<VerificationImportancePage />} />
                  <Route path="/support/manual/verification-logs" element={<VerificationLogsPage />} />
                  <Route path="/support/manual/verification-risks" element={<VerificationRisksPage />} />
                  <Route path="/support/manual/verification-standards" element={<VerificationStandardsPage />} />
                  <Route path="/support/manual/verification-techniques" element={<VerificationTechniquesPage />} />
                  <Route path="/support/manual/verification-tools" element={<VerificationToolsPage />} />
                  <Route path="/support/manual/virus-definitions" element={<VirusDefinitionsPage />} />
                  <Route path="/support/manual/visual-confirmation" element={<VisualConfirmationPage />} />
                  <Route path="/support/manual/vpn-setup" element={<VpnSetupPage />} />
                  <Route path="/support/manual/why-physical-destruction" element={<WhyPhysicalDestructionPage />} />
                  <Route path="/support/manual/windows-best-practices" element={<WindowsBestPracticesPage />} />
                  <Route path="/support/manual/windows-bitlocker" element={<WindowsBitlockerPage />} />
                  <Route path="/support/manual/windows-bootable-usb" element={<WindowsBootableUsbPage />} />
                  <Route path="/support/manual/windows-compliance" element={<WindowsCompliancePage />} />
                  <Route path="/support/manual/windows-dsecure-eraser" element={<WindowsDsecureEraserPage />} />
                  <Route path="/support/manual/windows-faq" element={<WindowsFaqPage />} />
                  <Route path="/support/manual/windows-resources" element={<WindowsResourcesPage />} />
                  <Route path="/support/manual/windows-sed-drives" element={<WindowsSedDrivesPage />} />
                  <Route path="/support/manual/windows-ssd-erasure" element={<WindowsSsdErasurePage />} />
                  <Route path="/support/manual/windows-third-party" element={<WindowsThirdPartyPage />} />
                  <Route path="/support/manual/windows-verification" element={<WindowsVerificationPage />} />
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
