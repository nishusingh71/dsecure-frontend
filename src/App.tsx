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
/* [OLD CODE PRESERVED AS COMMENT]
import TechnicalDocumentation from "./components/TechnicalDocumentation";
*/
/* [MODULARIZED IMPORTS - PRESERVED AS PER USER RULES]
const TechnicalDocumentation = lazy(() => import("./components/TechnicalDocumentation"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicyPage"));
const GDPRPage = lazy(() => import("./pages/GDPRPage"));
const CCPACompliancePage = lazy(() => import("./pages/CCPACompliancePage"));
const EULAPage = lazy(() => import("./pages/EULAPage"));
const AccessibilityStatementPage = lazy(() => import("./pages/AccessibilityStatementPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const InvestorsPage = lazy(() => import("./pages/InvestorsPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const KnowledgeBasePage = lazy(() => import("./pages/KnowledgeBasePage"));
const TutorialsPage = lazy(() => import("./pages/TutorialsPage"));
const WebinarsPage = lazy(() => import("./pages/WebinarsPage"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const WhitepapersPage = lazy(() => import("./pages/WhitepapersPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));
const SolutionsPage = lazy(() => import("./pages/SolutionsPage"));
const IndustriesPage = lazy(() => import("./pages/IndustriesPage"));
const TechnologyPage = lazy(() => import("./pages/TechnologyPage"));
const SecurityPage = lazy(() => import("./pages/SecurityPage"));
const CompliancePage = lazy(() => import("./pages/CompliancePage"));
const IntegrationsPage = lazy(() => import("./pages/IntegrationsPage"));
const APIPage = lazy(() => import("./pages/APIPage"));
const DevelopersPage = lazy(() => import("./pages/DevelopersPage"));
const DocumentationPage = lazy(() => import("./pages/DocumentationPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const DownloadsPage = lazy(() => import("./pages/DownloadsPage"));
const FreeTrialPage = lazy(() => import("./pages/FreeTrialPage"));
const DemoRequestPage = lazy(() => import("./pages/DemoRequestPage"));
const QuoteRequestPage = lazy(() => import("./pages/QuoteRequestPage"));
const AffiliateProgramPage = lazy(() => import("./pages/AffiliateProgramPage"));
const ResellerProgramPage = lazy(() => import("./pages/ResellerProgramPage"));
const PartnerPortalPage = lazy(() => import("./pages/PartnerPortalPage"));
const CustomerStoriesPage = lazy(() => import("./pages/CustomerStoriesPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const AwardsPage = lazy(() => import("./pages/AwardsPage"));
const CertificationsPage = lazy(() => import("./pages/CertificationsPage"));
const PressReleasesPage = lazy(() => import("./pages/PressReleasesPage"));
const MediaKitPage = lazy(() => import("./pages/MediaKitPage"));
const BrandGuidelinesPage = lazy(() => import("./pages/BrandGuidelinesPage"));
const InvestorRelationsPage = lazy(() => import("./pages/InvestorRelationsPage"));
const BoardOfDirectorsPage = lazy(() => import("./pages/BoardOfDirectorsPage"));
const ExecutiveTeamPage = lazy(() => import("./pages/ExecutiveTeamPage"));
const CompanyHistoryPage = lazy(() => import("./pages/CompanyHistoryPage"));
const MissionVisionPage = lazy(() => import("./pages/MissionVisionPage"));
const ValuesPage = lazy(() => import("./pages/ValuesPage"));
const CulturePage = lazy(() => import("./pages/CulturePage"));
const DiversityInclusionPage = lazy(() => import("./pages/DiversityInclusionPage"));
const SocialResponsibilityPage = lazy(() => import("./pages/SocialResponsibilityPage"));
const EnvironmentalPolicyPage = lazy(() => import("./pages/EnvironmentalPolicyPage"));
const SupplierCodeOfConductPage = lazy(() => import("./pages/SupplierCodeOfConductPage"));
const VendorRegistrationPage = lazy(() => import("./pages/VendorRegistrationPage"));
const ProcurementPage = lazy(() => import("./pages/ProcurementPage"));
const LegalNoticesPage = lazy(() => import("./pages/LegalNoticesPage"));
const PatentInformationPage = lazy(() => import("./pages/PatentInformationPage"));
const TrademarkInformationPage = lazy(() => import("./pages/TrademarkInformationPage"));
const CopyrightInformationPage = lazy(() => import("./pages/CopyrightInformationPage"));
const ReportVulnerabilityPage = lazy(() => import("./pages/ReportVulnerabilityPage"));
const BugBountyProgramPage = lazy(() => import("./pages/BugBountyProgramPage"));
const SecurityAdvisoriesPage = lazy(() => import("./pages/SecurityAdvisoriesPage"));
const IncidentResponsePage = lazy(() => import("./pages/IncidentResponsePage"));
const DataBreachNotificationPage = lazy(() => import("./pages/DataBreachNotificationPage"));
const DisasterRecoveryPage = lazy(() => import("./pages/DisasterRecoveryPage"));
const BusinessContinuityPage = lazy(() => import("./pages/BusinessContinuityPage"));
const ServiceLevelAgreementPage = lazy(() => import("./pages/ServiceLevelAgreementPage"));
const UptimeStatusPage = lazy(() => import("./pages/UptimeStatusPage"));
const SystemStatusPage = lazy(() => import("./pages/SystemStatusPage"));
const MaintenanceSchedulePage = lazy(() => import("./pages/MaintenanceSchedulePage"));
const ReleaseNotesPage = lazy(() => import("./pages/ReleaseNotesPage"));
const ChangelogPage = lazy(() => import("./pages/ChangelogPage"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
const SuggestionsPage = lazy(() => import("./pages/SuggestionsPage"));
const FeatureRequestPage = lazy(() => import("./pages/FeatureRequestPage"));
const CommunityForumPage = lazy(() => import("./pages/CommunityForumPage"));
const UserGroupsPage = lazy(() => import("./pages/UserGroupsPage"));
const WebinarsOnDemandPage = lazy(() => import("./pages/WebinarsOnDemandPage"));
const TrainingPage = lazy(() => import("./pages/TrainingPage"));
const CertificationsTrainingPage = lazy(() => import("./pages/CertificationsTrainingPage"));
const ProfessionalServicesPage = lazy(() => import("./pages/ProfessionalServicesPage"));
const ManagedServicesPage = lazy(() => import("./pages/ManagedServicesPage"));
const ConsultingServicesPage = lazy(() => import("./pages/ConsultingServicesPage"));
const ImplementationServicesPage = lazy(() => import("./pages/ImplementationServicesPage"));
const MigrationServicesPage = lazy(() => import("./pages/MigrationServicesPage"));
const CustomDevelopmentPage = lazy(() => import("./pages/CustomDevelopmentPage"));
const IntegrationServicesPage = lazy(() => import("./pages/IntegrationServicesPage"));
const SupportPlansPage = lazy(() => import("./pages/SupportPlansPage"));
const PremiumSupportPage = lazy(() => import("./pages/PremiumSupportPage"));
const EnterpriseSupportPage = lazy(() => import("./pages/EnterpriseSupportPage"));
const ContactSalesPage = lazy(() => import("./pages/ContactSalesPage"));
const ContactSupportPage = lazy(() => import("./pages/ContactSupportPage"));
const ContactMarketingPage = lazy(() => import("./pages/ContactMarketingPage"));
const ContactHRPage = lazy(() => import("./pages/ContactHRPage"));
const ContactLegalPage = lazy(() => import("./pages/ContactLegalPage"));
const ContactPRPage = lazy(() => import("./pages/ContactPRPage"));
const ContactInvestorsPage = lazy(() => import("./pages/ContactInvestorsPage"));
const ContactPartnersPage = lazy(() => import("./pages/ContactPartnersPage"));
const ContactWebmasterPage = lazy(() => import("./pages/ContactWebmasterPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("./pages/UnauthorizedPage"));
const ServerErrorPage = lazy(() => import("./pages/ServerErrorPage"));
const UnderMaintenancePage = lazy(() => import("./pages/UnderMaintenancePage"));
const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const ConfirmationPage = lazy(() => import("./pages/ConfirmationPage"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const PaymentFailurePage = lazy(() => import("./pages/PaymentFailurePage"));
const OrderConfirmationPage = lazy(() => import("./pages/OrderConfirmationPage"));
const SubscriptionManagementPage = lazy(() => import("./pages/SubscriptionManagementPage"));
const AccountSettingsPage = lazy(() => import("./pages/AccountSettingsPage"));
const ProfileSettingsPage = lazy(() => import("./pages/ProfileSettingsPage"));
const NotificationSettingsPage = lazy(() => import("./pages/NotificationSettingsPage"));
const SecuritySettingsPage = lazy(() => import("./pages/SecuritySettingsPage"));
const PrivacySettingsPage = lazy(() => import("./pages/PrivacySettingsPage"));
const BillingInformationPage = lazy(() => import("./pages/BillingInformationPage"));
const PaymentMethodsPage = lazy(() => import("./pages/PaymentMethodsPage"));
const InvoiceHistoryPage = lazy(() => import("./pages/InvoiceHistoryPage"));
const UsageAnalyticsPage = lazy(() => import("./pages/UsageAnalyticsPage"));
const AuditLogPage = lazy(() => import("./pages/AuditLogPage"));
const UserManagementPage = lazy(() => import("./pages/UserManagementPage"));
const RoleManagementPage = lazy(() => import("./pages/RoleManagementPage"));
const PermissionsManagementPage = lazy(() => import("./pages/PermissionsManagementPage"));
const GroupManagementPage = lazy(() => import("./pages/GroupManagementPage"));
const TeamManagementPage = lazy(() => import("./pages/TeamManagementPage"));
const OrganizationSettingsPage = lazy(() => import("./pages/OrganizationSettingsPage"));
const IntegrationsSettingsPage = lazy(() => import("./pages/IntegrationsSettingsPage"));
const APISettingsPage = lazy(() => import("./pages/APISettingsPage"));
const WebhookSettingsPage = lazy(() => import("./pages/WebhookSettingsPage"));
const DataExportPage = lazy(() => import("./pages/DataExportPage"));
const DataImportPage = lazy(() => import("./pages/DataImportPage"));
const BackupRestorePage = lazy(() => import("./pages/BackupRestorePage"));
const EnhancedUserDashboard = lazy(
  () => import("./pages/dashboards/EnhancedUserDashboard"),
);
*/
const CompleteDSecureNetworkFile = lazy(
  () => import("./pages/manual/CompleteDSecureNetworkFile"),
);
// [MODULARIZED FOR PERFORMANCE - ORIGINAL LAZY IMPORTS PRESERVED AS COMMENTS]
const NetworkFileManualLayout = lazy(
  () => import("./pages/manual/NetworkFileManualLayout"),
);

// Network file pages - keep as namespace import since components are accessed via NetworkFilePages.ComponentName
import * as NetworkFilePages from "./pages/manual/network-file";
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
const ManualUseCasesPage = lazy(
  () => import("./pages/support/manual/UseCasesPage"),
);
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
const ForumPage = lazy(() => import("./pages/ForumPage"));
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
