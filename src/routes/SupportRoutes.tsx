import { lazy } from "react";
import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Support Pages
const FAQsPage = lazy(() => import("../pages/support/FAQsPage"));
const KnowledgeBasePage = lazy(() => import("../pages/support/KnowledgeBasePage"));
const GetStartedPage = lazy(() => import("../pages/support/GetStartedPage"));
const HelpManualPage = lazy(() => import("../pages/support/HelpManualPage"));
const ProductVideosPage = lazy(() => import("../pages/support/ProductVideosPage"));

// Manual Core
const HelpManualIndexPage = lazy(() => import("../pages/manual/HelpManualIndexPage"));
const CompleteDSecureManual = lazy(() => import("../pages/manual/CompleteDSecureManual"));
const CompleteDSecureDriveManual = lazy(() => import("../pages/manual/CompleteDSecureDriveManual"));
const CompleteFreezeStateManual = lazy(() => import("../pages/manual/CompleteFreezeStateManual"));
const NetworkFileManualLayout = lazy(() => import("../pages/manual/NetworkFileManualLayout"));
const NetworkFileQuickOverview = lazy(
  () => import("../pages/manual/network-file/QuickOverview"),
);
const NetworkFileInstallation = lazy(
  () => import("../pages/manual/network-file/Installation"),
);
const NetworkFileUserInterface = lazy(
  () => import("../pages/manual/network-file/UserInterface"),
);
const NetworkFileLicensing = lazy(
  () => import("../pages/manual/network-file/Licensing"),
);
const NetworkFileSettings = lazy(
  () => import("../pages/manual/network-file/Settings"),
);
const NetworkFileConnectingDomain = lazy(
  () => import("../pages/manual/network-file/ConnectingDomain"),
);
const NetworkFileCloudIntegration = lazy(
  () => import("../pages/manual/network-file/CloudIntegration"),
);
const NetworkFileErasingFiles = lazy(
  () => import("../pages/manual/network-file/ErasingFiles"),
);
const NetworkFileErasingTraces = lazy(
  () => import("../pages/manual/network-file/ErasingTraces"),
);
const NetworkFileSchedulingTasks = lazy(
  () => import("../pages/manual/network-file/SchedulingTasks"),
);
const NetworkFileReportManagement = lazy(
  () => import("../pages/manual/network-file/ReportManagement"),
);
const NetworkFileFAQ = lazy(() => import("../pages/manual/network-file/FAQ"));
const NetworkFileSupport = lazy(
  () => import("../pages/manual/network-file/Support"),
);
const NetworkFileAbout = lazy(
  () => import("../pages/manual/network-file/About"),
);
// Specific Manual Guides
const InstallationPage = lazy(
  () => import("../pages/support/manual/InstallationPage"),
);
const InstallationGuideDetailed = lazy(
  () => import("../pages/manual/InstallationGuideDetailed"),
);
const SystemSetupPage = lazy(() => import("../pages/manual/SystemSetupPage"));
const WorkingWithDSecurePage = lazy(
  () => import("../pages/manual/WorkingWithDSecurePage"),
);
const DSecureFAQPage = lazy(() => import("../pages/manual/DSecureFAQPage"));
const ReportManagementPage = lazy(
  () => import("../pages/manual/ReportManagementPage"),
);
const ScheduleSettingsPage = lazy(
  () => import("../pages/manual/ScheduleSettingsPage"),
);
const FirstTimeSetupPage = lazy(
  () => import("../pages/support/manual/FirstTimeSetupPage"),
);
const UserInterfacePage = lazy(
  () => import("../pages/support/manual/UserInterfacePage"),
);
const QuickStartTutorial = lazy(
  () => import("../pages/support/manual/QuickstartPage"),
);
const OverwritePatternsPage = lazy(
  () => import("../pages/support/manual/OverwritePatternsPage"),
);
const CryptographicErasurePage = lazy(
  () => import("../pages/support/manual/CryptographicErasurePage"),
);
const PhysicalDestructionPage = lazy(
  () => import("../pages/support/manual/PhysicalDestructionPage"),
);
const VerificationMethodsPage = lazy(
  () => import("../pages/support/manual/VerificationMethodsPage"),
);
const WindowsSystemsPage = lazy(
  () => import("../pages/support/manual/WindowsSystemsPage"),
);
const MacOSSystemsPage = lazy(
  () => import("../pages/support/manual/MacOSSystemsPage"),
);
const LinuxSystemsPage = lazy(
  () => import("../pages/support/manual/LinuxSystemsPage"),
);
const CommonIssuesPage = lazy(
  () => import("../pages/support/manual/CommonIssuesPage"),
);
const ErrorCodesPage = lazy(
  () => import("../pages/support/manual/ErrorCodesPage"),
);
const MobileDevicesPage = lazy(
  () => import("../pages/support/manual/MobileDevicesPage"),
);
const EnterpriseServersPage = lazy(
  () => import("../pages/support/manual/EnterpriseServersPage"),
);
const BatchOperationsPage = lazy(
  () => import("../pages/support/manual/BatchOperationsPage"),
);
const RemoteManagementPage = lazy(
  () => import("../pages/support/manual/RemoteManagementPage"),
);
const ScriptingAutomationPage = lazy(
  () => import("../pages/support/manual/ScriptingAutomationPage"),
);
const CustomConfigurationsPage = lazy(
  () => import("../pages/support/manual/CustomConfigurationsPage"),
);
const ComplianceStandardsPage = lazy(
  () => import("../pages/support/manual/ComplianceStandardsPage"),
);
const CertificateGenerationPage = lazy(
  () => import("../pages/support/manual/CertificateGenerationPage"),
);
const AuditTrailsPage = lazy(
  () => import("../pages/support/manual/AuditTrailsPage"),
);
const ChainCustodyPage = lazy(
  () => import("../pages/support/manual/ChainCustodyPage"),
);
const PerformanceOptimizationPage = lazy(
  () => import("../pages/support/manual/PerformanceOptimizationPage"),
);
const RecoveryProceduresPage = lazy(
  () => import("../pages/support/manual/RecoveryProceduresPage"),
);
const WindowsIntroductionPage = lazy(
  () => import("../pages/support/manual/WindowsIntroductionPage"),
);
const WindowsBuiltinToolsPage = lazy(
  () => import("../pages/support/manual/WindowsBuiltinToolsPage"),
);
const WindowsSsdErasurePage = lazy(
  () => import("../pages/support/manual/WindowsSsdErasurePage"),
);
const WindowsStoragePage = lazy(
  () => import("../pages/support/manual/WindowsStoragePage"),
);
const WindowsPreparationPage = lazy(
  () => import("../pages/support/manual/WindowsPreparationPage"),
);
const WindowsTroubleshootingPage = lazy(
  () => import("../pages/support/manual/WindowsTroubleshootingPage"),
);
const WindowsEnterprisePage = lazy(
  () => import("../pages/support/manual/WindowsEnterprisePage"),
);
const WindowsRisksPage = lazy(
  () => import("../pages/support/manual/WindowsRisksPage"),
);
const WindowsFilesystemsPage = lazy(
  () => import("../pages/support/manual/WindowsFilesystemsPage"),
);
const WindowsSystemFilesPage = lazy(
  () => import("../pages/support/manual/WindowsSystemFilesPage"),
);
const WindowsResidualDataPage = lazy(
  () => import("../pages/support/manual/WindowsResidualDataPage"),
);
const WindowsSoftwareErasurePage = lazy(
  () => import("../pages/support/manual/WindowsSoftwareErasurePage"),
);
const WindowsCryptoErasurePage = lazy(
  () => import("../pages/support/manual/WindowsCryptoErasurePage"),
);
const WindowsMethodsComparisonPage = lazy(
  () => import("../pages/support/manual/WindowsMethodsComparisonPage"),
);
const WindowsCommandLinePage = lazy(
  () => import("../pages/support/manual/WindowsCommandLinePage"),
);
const PreInstallationPage = lazy(
  () => import("../pages/support/manual/PreInstallationPage"),
);
const DownloadInstallerPage = lazy(
  () => import("../pages/support/manual/DownloadInstallerPage"),
);
const LicenseActivationPage = lazy(
  () => import("../pages/support/manual/LicenseActivationPage"),
);
const InstallationSettingsPage = lazy(
  () => import("../pages/support/manual/InstallationSettingsPage"),
);
const InstallationProgressPage = lazy(
  () => import("../pages/support/manual/InstallationProgressPage"),
);
const SystemRequirementsPage = lazy(
  () => import("../pages/support/manual/SystemRequirementsPage"),
);
const SetupWizardPage = lazy(
  () => import("../pages/support/manual/SetupWizardPage"),
);
const FirstScanPage = lazy(
  () => import("../pages/support/manual/FirstScanPage"),
);
const KeyActivationPage = lazy(
  () => import("../pages/support/manual/KeyActivationPage"),
);
const FirewallSetupPage = lazy(
  () => import("../pages/support/manual/FirewallSetupPage"),
);
const MainDashboardPage = lazy(
  () => import("../pages/support/manual/MainDashboardPage"),
);
const NavigationPage = lazy(
  () => import("../pages/support/manual/NavigationPage"),
);

// Legacy Manual Supports
const OverwriteGuide = lazy(() => import("../pages/OverwriteGuide"));
const WipeSASDrives = lazy(() => import("../pages/WipeSASDrive"));
const WipeMacM1 = lazy(() => import("../pages/WipeMacM1"));
const MacEraseGuide = lazy(() => import("../pages/MacEraseGuide"));
const FileEraserGuide = lazy(() => import("../pages/FileEraserGuide"));
const SecureEraseHDDSSD = lazy(() => import("../pages/SecureEraseHDDSDD"));
const CloudConsoleGuide = lazy(() => import("../pages/CloudConsoleGuide"));
const CryptoEraseSSD = lazy(() => import("../pages/CryptoEraseSSD"));
const RetainOSGuide = lazy(() => import("../pages/RetainOSGuide"));
const DataGuardianAwardPage = lazy(
  () => import("../pages/DataGuardianAwardPage"),
);

export const SupportRoutes = () => (
  <Route element={<MainLayout />}>
    {/* Legacy Support Guides */}
    <Route path="support/overwrite-guide" element={<OverwriteGuide />} />
    <Route path="support/wipe-guide" element={<OverwriteGuide />} />
    <Route path="support/sas-wipe-guide" element={<WipeSASDrives />} />
    <Route path="support/mac-wipe-guide" element={<WipeMacM1 />} />
    <Route path="support/mac-eraser-guide" element={<MacEraseGuide />} />
    <Route path="support/file-eraser-guide" element={<FileEraserGuide />} />
    <Route path="/data-guardian-award" element={<DataGuardianAwardPage />} />
    <Route path="support/secure-erase-hddssd" element={<SecureEraseHDDSSD />} />
    <Route path="support/cloud-console-guide" element={<CloudConsoleGuide />} />
    <Route
      path="support/ssd-cryptographic-erasure-guide"
      element={<CryptoEraseSSD />}
    />
    <Route path="support/retain-os-guide" element={<RetainOSGuide />} />

    {/* Support Pages */}
    <Route path="support/faqs" element={<FAQsPage />} />
    <Route path="support/knowledge-base" element={<KnowledgeBasePage />} />
    <Route path="support/get-started" element={<GetStartedPage />} />
    <Route path="support/help-manual" element={<HelpManualPage />} />
    <Route path="support/product-videos" element={<ProductVideosPage />} />

    {/* Automated Manual Hub */}
    <Route path="/support/manual/installation" element={<InstallationPage />} />
    <Route
      path="/support/manual/installation-guide"
      element={<InstallationGuideDetailed />}
    />
    <Route path="/support/manual/system-setup" element={<SystemSetupPage />} />
    <Route
      path="/support/manual/working-with-D-Secure"
      element={<WorkingWithDSecurePage />}
    />
    <Route
      path="/support/help-manual/working-guide"
      element={<WorkingWithDSecurePage />}
    />
    <Route path="/support/help-manual/faqs" element={<DSecureFAQPage />} />
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
    <Route
      path="/support/help-manual/complete-freeze-state-manual"
      element={<CompleteFreezeStateManual />}
    />

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
      <Route path="quick-overview" element={<NetworkFileQuickOverview />} />
      <Route path="installation" element={<NetworkFileInstallation />} />
      <Route path="user-interface" element={<NetworkFileUserInterface />} />
      <Route path="licensing" element={<NetworkFileLicensing />} />
      <Route path="settings" element={<NetworkFileSettings />} />
      <Route
        path="connecting-domain"
        element={<NetworkFileConnectingDomain />}
      />
      <Route
        path="cloud-integration"
        element={<NetworkFileCloudIntegration />}
      />
      <Route path="erasing-files" element={<NetworkFileErasingFiles />} />
      <Route path="erasing-traces" element={<NetworkFileErasingTraces />} />
      <Route path="scheduling-tasks" element={<NetworkFileSchedulingTasks />} />
      <Route
        path="report-management"
        element={<NetworkFileReportManagement />}
      />
      <Route path="faq" element={<NetworkFileFAQ />} />
      <Route path="support" element={<NetworkFileSupport />} />
      <Route path="about" element={<NetworkFileAbout />} />
    </Route>

    <Route path="/support/help-manual" element={<HelpManualIndexPage />} />
    <Route
      path="/support/manual/first-time-setup"
      element={<FirstTimeSetupPage />}
    />
    <Route
      path="/support/manual/user-interface"
      element={<UserInterfacePage />}
    />
    <Route path="/support/manual/quickstart" element={<QuickStartTutorial />} />
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
    <Route path="/support/manual/windows" element={<WindowsSystemsPage />} />
    <Route path="/support/manual/macos" element={<MacOSSystemsPage />} />
    <Route path="/support/manual/linux" element={<LinuxSystemsPage />} />
    <Route
      path="/support/manual/common-issues"
      element={<CommonIssuesPage />}
    />
    <Route path="/support/manual/error-codes" element={<ErrorCodesPage />} />
    <Route path="/support/manual/mobile" element={<MobileDevicesPage />} />
    <Route path="/support/manual/servers" element={<EnterpriseServersPage />} />
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
    <Route path="/support/manual/audit-trails" element={<AuditTrailsPage />} />
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
    <Route path="/support/manual/setup-wizard" element={<SetupWizardPage />} />
    <Route path="/support/manual/first-scan" element={<FirstScanPage />} />
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
    <Route path="/support/manual/navigation" element={<NavigationPage />} />
  </Route>
);
