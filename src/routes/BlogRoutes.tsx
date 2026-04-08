import { lazy } from "react";
import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Blog Pages
const BlogPage = lazy(() => import("../components/blog/BlogPage"));
const OverwriteGuideBlog = lazy(() => import("../components/blog/OverwriteGuideBlog"));
const SSDWipeGuideBlog = lazy(() => import("../components/blog/SSDWipeGuideBlog"));
const ErasureVsDestructionBlog = lazy(() => import("../components/blog/ErasureVsDestructionBlog"));
const DataDeletionMythsBlog = lazy(() => import("../components/blog/DataDeletionMythsBlog"));
const DataSanitizationComplianceBlog = lazy(() => import("../components/blog/DataSanitizationComplianceBlog"));
const BestErasureMethodBlog = lazy(() => import("../components/blog/BestErasureMethodBlog"));
const ErasureBestPracticesBlog = lazy(() => import("../components/blog/ErasureBestPracticesBlog"));
const AutomatedErasureBlog = lazy(() => import("../components/blog/AutomatedErasureBlog"));
const MobileErasureGuideBlog = lazy(() => import("../components/blog/MobileErasureGuideBlog"));
const ZeroTrustDisposalBlog = lazy(() => import("../components/blog/ZeroTrustDisposalBlog"));
const MSPSecurityBlog = lazy(() => import("../components/blog/MSPSecurityBlog"));
const SECComplianceBlog = lazy(() => import("../components/blog/SECComplianceBlog"));
const ITAMDisposalGuideBlog = lazy(() => import("../components/blog/ITAMDisposalGuideBlog"));
const DataHoardingRisksBlog = lazy(() => import("../components/blog/DataHoardingRisksBlog"));
const ShadowDataRisksBlog = lazy(() => import("../components/blog/ShadowDataRisksBlog"));
const ESGDataErasureBlog = lazy(() => import("../components/blog/ESGDataErasureBlog"));
const SustainableITReuseBlog = lazy(() => import("../components/blog/SustainableITReuseBlog"));
const CarbonFootprintErasureBlog = lazy(() => import("../components/blog/CarbonFootprintErasureBlog"));
const Scope3EmissionsBlog = lazy(() => import("../components/blog/Scope3EmissionsBlog"));
const ErasureVerificationBlog = lazy(() => import("../components/blog/ErasureVerificationBlog"));
const HardwareDiagnosticsBlog = lazy(() => import("../components/blog/HardwareDiagnosticsBlog"));
const DataMinimizationBlog = lazy(() => import("../components/blog/DataMinimizationBlog"));
const GovDeviceTheftBlog = lazy(() => import("../components/blog/GovDeviceTheftBlog"));
const ITADSelectionGuideBlog = lazy(() => import("../components/blog/ITADSelectionGuideBlog"));
const BrandReputationESGBlog = lazy(() => import("../components/blog/BrandReputationESGBlog"));
const MSPDataErasureBlog = lazy(() => import("../components/blog/MSPDataErasureBlog"));
const CryptographicEraseNISTBlog = lazy(() => import("../components/blog/CryptographicEraseNISTBlog"));
const SecurePHIePHIErasureBlog = lazy(() => import("../components/blog/SecurePHIePHIErasureBlog"));
const StatutoryRegulatoryComplianceDataErasureBlog = lazy(() => import("../components/blog/StatutoryRegulatoryComplianceDataErasureBlog"));
const LegalEthicalDataErasureBlog = lazy(() => import("../components/blog/LegalEthicalDataErasureBlog"));
const CaptionCallFCCSettlementBlog = lazy(() => import("../components/blog/CaptionCallFCCSettlementBlog"));
const HardwareDiagnosticsITADComplianceBlog = lazy(() => import("../components/blog/HardwareDiagnosticsITADComplianceBlog"));
const FutureOfDataDestructionBlog = lazy(() => import("../components/blog/FutureOfDataDestructionBlog"));
const DoDVsIEEEDataSanitizationBlog = lazy(() => import("../components/blog/DoDVsIEEEDataSanitizationBlog"));
const RemoteWorkDataErasureBestPracticesBlog = lazy(() => import("../components/blog/RemoteWorkDataErasureBestPracticesBlog"));
const NCUAThirdPartyDataDisposalBlog = lazy(() => import("../components/blog/NCUAThirdPartyDataDisposalBlog"));
const MSPErasureAsAServiceBlog = lazy(() => import("../components/blog/MSPErasureAsAServiceBlog"));
const DellDataWipeVsDSecureBlog = lazy(() => import("../components/blog/DellDataWipeVsDSecureBlog"));
const CommonCriteriaComplianceVerifiedDataWipingBlog = lazy(() => import("../components/blog/CommonCriteriaComplianceVerifiedDataWipingBlog"));
const ErasureAsAServiceDSecureBlog = lazy(() => import("../components/blog/ErasureAsAServiceDSecureBlog"));
const ReturningLeasedITHardwareDosAndDontsBlog = lazy(() => import("../components/blog/ReturningLeasedITHardwareDosAndDonts"));
const HealthcareRansomwareLessonsBlog = lazy(() => import("../components/blog/HealthcareRansomwareLessonsBlog"));
const MacM1ErasureKnownIssuesBlog = lazy(() => import("../components/blog/MacM1ErasureKnownIssues"));
const WipeSSDFromBIOSGuideBlog = lazy(() => import("../components/blog/WipeSSDFromBIOSGuide"));
const DataErasureForNonProfitsBlog = lazy(() => import("../components/blog/DataErasureForNonProfits"));
const EraseMacDataSafelyUsingDSecureBlog = lazy(() => import("../components/blog/EraseMacDataSafelyUsingDSecureBlog"));
const EraseDataPcLaptopDesktopBlog = lazy(() => import("../components/blog/EraseDataPcLaptopDesktopBlog"));
const PhysicalDestructionVsWipingBlog = lazy(() => import("../components/blog/PhysicalDestructionVsWipingBlog"));
const NIST80088IndiaBlog = lazy(() => import("../components/blog/NIST80088IndiaBlog"));

const CCPAViolationBlog = lazy(() => import("../components/blog/CCPAViolationBlog"));
const ComplianceVerifiedITADReasonsBlog = lazy(() => import("../components/blog/ComplianceVerifiedITADReasonsBlog"));
const ChainOfCustodyBlog = lazy(() => import("../components/blog/ChainOfCustodyBlog"));
const ChangeHealthcareAttackBlog = lazy(() => import("../components/blog/ChangeHealthcareAttackBlog"));
const ChromebookDataRisksBlog = lazy(() => import("../components/blog/ChromebookDataRisksBlog"));
const CloudMigrationBlog = lazy(() => import("../components/blog/CloudMigrationBlog"));
const CommonCriteriaBlog = lazy(() => import("../components/blog/CommonCriteriaBlog"));
const CorporateITAssetRisksBlog = lazy(() => import("../components/blog/CorporateITAssetRisksBlog"));
const CryptographicEraseBlog = lazy(() => import("../components/blog/CryptographicEraseBlog"));
const CybersecurityDataDestructionBlog = lazy(() => import("../components/blog/CybersecurityDataDestructionBlog"));
const DSecureOperationsBlog = lazy(() => import("../components/blog/DSecureOperationsBlog"));
const DarkDataRisksBlog = lazy(() => import("../components/blog/DarkDataRisksBlog"));
const DataDestructionBestPracticesBlog = lazy(() => import("../components/blog/DataDestructionBestPracticesBlog"));
const DataDisposalGuidelinesBlog = lazy(() => import("../components/blog/DataDisposalGuidelinesBlog"));
const DataErasureDisasterRecoveryBlog = lazy(() => import("../components/blog/DataErasureDisasterRecoveryBlog"));
const DataErasureMythsBlog = lazy(() => import("../components/blog/DataErasureMythsBlog"));
const DataHoardingBlog = lazy(() => import("../components/blog/DataHoardingBlog"));
const DataPrivacyObligationsBlog = lazy(() => import("../components/blog/DataPrivacyObligationsBlog"));
const DataRemanenceBlog = lazy(() => import("../components/blog/DataRemanenceBlog"));
const DataRemediationErasureBlog = lazy(() => import("../components/blog/DataRemediationErasureBlog"));
const DataRetentionPrivacyBlog = lazy(() => import("../components/blog/DataRetentionPrivacyBlog"));
const DegaussingRisksBlog = lazy(() => import("../components/blog/DegaussingRisksBlog"));
const DeletedFilesTruthBlog = lazy(() => import("../components/blog/DeletedFilesTruthBlog"));
const DeletionVsErasureBlog = lazy(() => import("../components/blog/DeletionVsErasureBlog"));
const DellDataWipeAlternativeBlog = lazy(() => import("../components/blog/DellDataWipeAlternativeBlog"));
const DeploymentOptionsBlog = lazy(() => import("../components/blog/DeploymentOptionsBlog"));
const DiagnosticsErasureITADBlog = lazy(() => import("../components/blog/DiagnosticsErasureITADBlog"));
const DigitalDivideBlog = lazy(() => import("../components/blog/DigitalDivideBlog"));
const DoDVsIEEEBlog = lazy(() => import("../components/blog/DoDVsIEEEBlog"));
const DoDWipingStandardBlog = lazy(() => import("../components/blog/DoDWipingStandardBlog"));
const DumpsterDivingDataBreachBlog = lazy(() => import("../components/blog/DumpsterDivingDataBreachBlog"));
const ESGReportBlog = lazy(() => import("../components/blog/ESGReportBlog"));
const EUCSRDBlog = lazy(() => import("../components/blog/EUCSRDBlog"));
const EducationDataDestructionBlog = lazy(() => import("../components/blog/EducationDataDestructionBlog"));
const EndOfLifeDataSecurityBlog = lazy(() => import("../components/blog/EndOfLifeDataSecurityBlog"));
const FinancialDataBreachCaseStudyBlog = lazy(() => import("../components/blog/FinancialDataBreachCaseStudyBlog"));
const FreeVsProEraserBlog = lazy(() => import("../components/blog/FreeVsProEraserBlog"));
const FutureDataDestructionBlog = lazy(() => import("../components/blog/FutureDataDestructionBlog"));
const GDPRSevenYearsBlog = lazy(() => import("../components/blog/GDPRSevenYearsBlog"));
const GovernmentDeviceTheftBlog = lazy(() => import("../components/blog/GovernmentDeviceTheftBlog"));
const GovernmentITDisposalBlog = lazy(() => import("../components/blog/GovernmentITDisposalBlog"));
const GreenITPracticesBlog = lazy(() => import("../components/blog/GreenITPracticesBlog"));
const HIPAAComplianceErasureBlog = lazy(() => import("../components/blog/HIPAAComplianceErasureBlog"));
const HealthcareDataBreachCaseStudyBlog = lazy(() => import("../components/blog/HealthcareDataBreachCaseStudyBlog"));
const HexViewerBlog = lazy(() => import("../components/blog/HexViewerBlog"));
const HiddenDiskAreasBlog = lazy(() => import("../components/blog/HiddenDiskAreasBlog"));
const HowToEraseMacBlog = lazy(() => import("../components/blog/HowToEraseMacBlog"));
const IPadTabletErasureBlog = lazy(() => import("../components/blog/IPadTabletErasureBlog"));
const ITADChallengesBlog = lazy(() => import("../components/blog/ITADChallengesBlog"));
const ITADEnvironmentalBlog = lazy(() => import("../components/blog/ITADEnvironmentalBlog"));
const ITADMarketGrowthBlog = lazy(() => import("../components/blog/ITADMarketGrowthBlog"));
const ITADProcurementBlog = lazy(() => import("../components/blog/ITADProcurementBlog"));
const ITAMDataBreachBlog = lazy(() => import("../components/blog/ITAMDataBreachBlog"));
const ITAssetLifecycleBlog = lazy(() => import("../components/blog/ITAssetLifecycleBlog"));
const ITAssetReuseBlog = lazy(() => import("../components/blog/ITAssetReuseBlog"));
const LegalEthicalErasureBlog = lazy(() => import("../components/blog/LegalEthicalErasureBlog"));
const LooseDrivesErasureGuideBlog = lazy(() => import("../components/blog/LooseDrivesErasureGuideBlog"));
const M1MacErasureIssuesBlog = lazy(() => import("../components/blog/M1MacErasureIssuesBlog"));
const MDMDetectionBlog = lazy(() => import("../components/blog/MDMDetectionBlog"));
const MSPErasureServiceBlog = lazy(() => import("../components/blog/MSPErasureServiceBlog"));
const MarriottSettlementBlog = lazy(() => import("../components/blog/MarriottSettlementBlog"));
const MediaSanitizationNeedBlog = lazy(() => import("../components/blog/MediaSanitizationNeedBlog"));
const MobileDiagnosticsBenefitsBlog = lazy(() => import("../components/blog/MobileDiagnosticsBenefitsBlog"));
const MobileDiagnosticsRevolutionBlog = lazy(() => import("../components/blog/MobileDiagnosticsRevolutionBlog"));
const MorganStanleyDataBreachBlog = lazy(() => import("../components/blog/MorganStanleyDataBreachBlog"));
const MorganStanleyFineBlog = lazy(() => import("../components/blog/MorganStanleyFineBlog"));
const NCUAGuidelinesBlog = lazy(() => import("../components/blog/NCUAGuidelinesBlog"));
const NISTClearPurgeBlog = lazy(() => import("../components/blog/NISTClearPurgeBlog"));
const NISTTestedErasureSoftwareBlog = lazy(() => import("../components/blog/NISTTestedErasureSoftwareBlog"));
const NISTVsIEEEBlog = lazy(() => import("../components/blog/NISTVsIEEEBlog"));
const OnsiteVsOffsiteDestructionBlog = lazy(() => import("../components/blog/OnsiteVsOffsiteDestructionBlog"));
const PHIErasureBlog = lazy(() => import("../components/blog/PHIErasureBlog"));
const PIIDisposalBreachBlog = lazy(() => import("../components/blog/PIIDisposalBreachBlog"));
const PostCovidDataDisposalBlog = lazy(() => import("../components/blog/PostCovidDataDisposalBlog"));
const PrivateCloudBlog = lazy(() => import("../components/blog/PrivateCloudBlog"));
const RemoteWipingSoftwareBlog = lazy(() => import("../components/blog/RemoteWipingSoftwareBlog"));
const RemoteWorkDataErasureBlog = lazy(() => import("../components/blog/RemoteWorkDataErasureBlog"));
const ResellerProfitsBlog = lazy(() => import("../components/blog/ResellerProfitsBlog"));
const RightToRepairBlog = lazy(() => import("../components/blog/RightToRepairBlog"));
const SSDWipeBIOSBlog = lazy(() => import("../components/blog/SSDWipeBIOSBlog"));
const SecureFileEraseBlog = lazy(() => import("../components/blog/SecureFileEraseBlog"));
const SecureHDDDisposalBlog = lazy(() => import("../components/blog/SecureHDDDisposalBlog"));
const SecureITAssetDisposalBlog = lazy(() => import("../components/blog/SecureITAssetDisposalBlog"));
const SecureSmartphoneErasureBlog = lazy(() => import("../components/blog/SecureSmartphoneErasureBlog"));
const ServerErasureBlog = lazy(() => import("../components/blog/ServerErasureBlog"));
const ShadowDataBlog = lazy(() => import("../components/blog/ShadowDataBlog"));
const StatutoryComplianceBlog = lazy(() => import("../components/blog/StatutoryComplianceBlog"));
const UltratestComparisonBlog = lazy(() => import("../components/blog/UltratestComparisonBlog"));
const VMErasureBlog = lazy(() => import("../components/blog/VMErasureBlog"));
const Windows10EOSBlog = lazy(() => import("../components/blog/Windows10EOSBlog"));
const WipeComputerDonatingBlog = lazy(() => import("../components/blog/WipeComputerDonatingBlog"));
const WorldClassNPSBlog = lazy(() => import("../components/blog/WorldClassNPSBlog"));
const CaptionCallSettlementBlog = lazy(() => import("../components/blog/CaptionCallSettlementBlog"));

export const BlogRoutes = () => (
  <Route element={<MainLayout />}>
    <Route path="blog" element={<BlogPage />} />
    <Route path="blog/overwrite-guide" element={<OverwriteGuideBlog />} />
    <Route path="blog/ssd-wipe-guide" element={<SSDWipeGuideBlog />} />
    <Route path="blog/erasure-vs-destruction" element={<ErasureVsDestructionBlog />} />
    <Route path="blog/data-deletion-myths" element={<DataDeletionMythsBlog />} />
    <Route path="blog/data-sanitization-compliance" element={<DataSanitizationComplianceBlog />} />
    <Route path="blog/best-data-erasure-methods" element={<BestErasureMethodBlog />} />
    <Route path="blog/erasure-best-practices" element={<ErasureBestPracticesBlog />} />
    <Route path="blog/automate-data-erasure" element={<AutomatedErasureBlog />} />
    <Route path="blog/mobile-erasure-guide" element={<MobileErasureGuideBlog />} />
    <Route path="blog/zero-trust-disposal" element={<ZeroTrustDisposalBlog />} />
    <Route path="blog/msp-data-erasure" element={<MSPSecurityBlog />} />
    <Route path="blog/sec-compliance" element={<SECComplianceBlog />} />
    <Route path="blog/itam-disposal-guide" element={<ITAMDisposalGuideBlog />} />
    <Route path="blog/data-hoarding-risks" element={<DataHoardingRisksBlog />} />
    <Route path="blog/shadow-data-risks" element={<ShadowDataRisksBlog />} />
    <Route path="blog/esg-data-erasure" element={<ESGDataErasureBlog />} />
    <Route path="blog/sustainable-it-reuse" element={<SustainableITReuseBlog />} />
    <Route path="blog/reduce-carbon-footprint" element={<CarbonFootprintErasureBlog />} />
    <Route path="blog/scope-3-emissions-reuse" element={<Scope3EmissionsBlog />} />
    <Route path="blog/erasure-verification-process" element={<ErasureVerificationBlog />} />
    <Route path="blog/hardware-diagnostics" element={<HardwareDiagnosticsBlog />} />
    <Route path="blog/data-minimization" element={<DataMinimizationBlog />} />
    <Route path="blog/government-device-theft" element={<GovDeviceTheftBlog />} />
    <Route path="blog/itad-selection-guide" element={<ITADSelectionGuideBlog />} />
    <Route path="blog/brand-reputation-esg" element={<BrandReputationESGBlog />} />
    <Route path="blog/msp-data-erasure" element={<MSPDataErasureBlog />} />
    <Route path="blog/cryptographic-erase-nist" element={<CryptographicEraseNISTBlog />} />
    <Route path="blog/secure-phi-erasure" element={<SecurePHIePHIErasureBlog />} />
    <Route path="blog/statutory-regulatory-compliance-data-erasure" element={<StatutoryRegulatoryComplianceDataErasureBlog />} />
    <Route path="blog/legal-ethical-data-erasure" element={<LegalEthicalDataErasureBlog />} />
    <Route path="blog/caption-call-fcc-settlement" element={<CaptionCallFCCSettlementBlog />} />
    <Route path="blog/hardware-diagnostics-itad-compliance" element={<HardwareDiagnosticsITADComplianceBlog />} />
    <Route path="blog/future-of-data-destruction" element={<FutureOfDataDestructionBlog />} />
    <Route path="blog/dod-vs-ieee-data-sanitization" element={<DoDVsIEEEDataSanitizationBlog />} />
    <Route path="blog/remote-work-data-erasure-best-practices" element={<RemoteWorkDataErasureBestPracticesBlog />} />
    <Route path="blog/ncua-third-party-data-disposal" element={<NCUAThirdPartyDataDisposalBlog />} />
    <Route path="blog/msp-erasure-as-a-service" element={<MSPErasureAsAServiceBlog />} />
    <Route path="blog/dell-data-wipe-vs-dsecure" element={<DellDataWipeVsDSecureBlog />} />
    <Route path="blog/common-criteria-certified-data-wiping" element={<CommonCriteriaComplianceVerifiedDataWipingBlog />} />
    <Route path="blog/erasure-as-a-service-dsecure" element={<ErasureAsAServiceDSecureBlog />} />
    <Route path="blog/returning-leased-it-hardware-dos-and-donts" element={<ReturningLeasedITHardwareDosAndDontsBlog />} />
    <Route path="blog/healthcare-ransomware-lessons" element={<HealthcareRansomwareLessonsBlog />} />
    <Route path="blog/mac-m1-erasure-known-issues" element={<MacM1ErasureKnownIssuesBlog />} />
    <Route path="blog/wipe-ssd-from-bios-guide" element={<WipeSSDFromBIOSGuideBlog />} />
    <Route path="blog/data-erasure-for-non-profits" element={<DataErasureForNonProfitsBlog />} />
    <Route path="blog/erase-mac-data-safely-using-dsecure" element={<EraseMacDataSafelyUsingDSecureBlog />} />
    <Route path="blog/erase-data-pc-laptop-desktop" element={<EraseDataPcLaptopDesktopBlog />} />
    <Route path="blog/physical-destruction-vs-data-wiping" element={<PhysicalDestructionVsWipingBlog />} />
    <Route path="blog/nist-800-88-compliance-india" element={<NIST80088IndiaBlog />} />
    <Route path="blog/ccpa-violation" element={<CCPAViolationBlog />} />
    <Route path="blog/certified-itad-reasons" element={<ComplianceVerifiedITADReasonsBlog />} />
    <Route path="blog/chain-of-custody" element={<ChainOfCustodyBlog />} />
    <Route path="blog/change-healthcare-attack" element={<ChangeHealthcareAttackBlog />} />
    <Route path="blog/chromebook-data-risks" element={<ChromebookDataRisksBlog />} />
    <Route path="blog/cloud-migration" element={<CloudMigrationBlog />} />
    <Route path="blog/common-criteria" element={<CommonCriteriaBlog />} />
    <Route path="blog/corporate-it-asset-risks" element={<CorporateITAssetRisksBlog />} />
    <Route path="blog/cryptographic-erase" element={<CryptographicEraseBlog />} />
    <Route path="blog/cybersecurity-data-destruction" element={<CybersecurityDataDestructionBlog />} />
    <Route path="blog/dsecure-operations" element={<DSecureOperationsBlog />} />
    <Route path="blog/dark-data-risks" element={<DarkDataRisksBlog />} />
    <Route path="blog/data-destruction-best-practices" element={<DataDestructionBestPracticesBlog />} />
    <Route path="blog/data-disposal-guidelines" element={<DataDisposalGuidelinesBlog />} />
    <Route path="blog/data-erasure-disaster-recovery" element={<DataErasureDisasterRecoveryBlog />} />
    <Route path="blog/data-erasure-myths" element={<DataErasureMythsBlog />} />
    <Route path="blog/data-hoarding" element={<DataHoardingBlog />} />
    <Route path="blog/data-privacy-obligations" element={<DataPrivacyObligationsBlog />} />
    <Route path="blog/data-remanence" element={<DataRemanenceBlog />} />
    <Route path="blog/data-remediation-erasure" element={<DataRemediationErasureBlog />} />
    <Route path="blog/data-retention-privacy" element={<DataRetentionPrivacyBlog />} />
    <Route path="blog/degaussing-risks" element={<DegaussingRisksBlog />} />
    <Route path="blog/deleted-files-truth" element={<DeletedFilesTruthBlog />} />
    <Route path="blog/deletion-vs-erasure" element={<DeletionVsErasureBlog />} />
    <Route path="blog/dell-data-wipe-alternative" element={<DellDataWipeAlternativeBlog />} />
    <Route path="blog/deployment-options" element={<DeploymentOptionsBlog />} />
    <Route path="blog/diagnostics-erasure-itad" element={<DiagnosticsErasureITADBlog />} />
    <Route path="blog/digital-divide" element={<DigitalDivideBlog />} />
    <Route path="blog/dod-vs-ieee" element={<DoDVsIEEEBlog />} />
    <Route path="blog/dod-wiping-standard" element={<DoDWipingStandardBlog />} />
    <Route path="blog/dumpster-diving-data-breach" element={<DumpsterDivingDataBreachBlog />} />
    <Route path="blog/esg-report" element={<ESGReportBlog />} />
    <Route path="blog/eu-csrd" element={<EUCSRDBlog />} />
    <Route path="blog/education-data-destruction" element={<EducationDataDestructionBlog />} />
    <Route path="blog/end-of-life-data-security" element={<EndOfLifeDataSecurityBlog />} />
    <Route path="blog/financial-data-breach-case-study" element={<FinancialDataBreachCaseStudyBlog />} />
    <Route path="blog/free-vs-pro-eraser" element={<FreeVsProEraserBlog />} />
    <Route path="blog/future-data-destruction" element={<FutureDataDestructionBlog />} />
    <Route path="blog/gdpr-seven-years" element={<GDPRSevenYearsBlog />} />
    <Route path="blog/government-device-theft-case-study" element={<GovernmentDeviceTheftBlog />} />
    <Route path="blog/government-it-disposal" element={<GovernmentITDisposalBlog />} />
    <Route path="blog/green-it-practices" element={<GreenITPracticesBlog />} />
    <Route path="blog/hipaa-compliance-erasure" element={<HIPAAComplianceErasureBlog />} />
    <Route path="blog/healthcare-data-breach-case-study" element={<HealthcareDataBreachCaseStudyBlog />} />
    <Route path="blog/hex-viewer" element={<HexViewerBlog />} />
    <Route path="blog/hidden-disk-areas" element={<HiddenDiskAreasBlog />} />
    <Route path="blog/how-to-erase-mac" element={<HowToEraseMacBlog />} />
    <Route path="blog/ipad-tablet-erasure" element={<IPadTabletErasureBlog />} />
    <Route path="blog/itad-challenges" element={<ITADChallengesBlog />} />
    <Route path="blog/itad-environmental" element={<ITADEnvironmentalBlog />} />
    <Route path="blog/itad-market-growth" element={<ITADMarketGrowthBlog />} />
    <Route path="blog/itad-procurement" element={<ITADProcurementBlog />} />
    <Route path="blog/itam-data-breach" element={<ITAMDataBreachBlog />} />
    <Route path="blog/it-asset-lifecycle" element={<ITAssetLifecycleBlog />} />
    <Route path="blog/it-asset-reuse" element={<ITAssetReuseBlog />} />
    <Route path="blog/legal-ethical-erasure" element={<LegalEthicalErasureBlog />} />
    <Route path="blog/loose-drives-erasure-guide" element={<LooseDrivesErasureGuideBlog />} />
    <Route path="blog/m1-mac-erasure-issues" element={<M1MacErasureIssuesBlog />} />
    <Route path="blog/mdm-detection" element={<MDMDetectionBlog />} />
    <Route path="blog/msp-erasure-service" element={<MSPErasureServiceBlog />} />
    <Route path="blog/marriott-settlement" element={<MarriottSettlementBlog />} />
    <Route path="blog/media-sanitization-need" element={<MediaSanitizationNeedBlog />} />
    <Route path="blog/mobile-diagnostics-benefits" element={<MobileDiagnosticsBenefitsBlog />} />
    <Route path="blog/mobile-diagnostics-revolution" element={<MobileDiagnosticsRevolutionBlog />} />
    <Route path="blog/morgan-stanley-data-breach" element={<MorganStanleyDataBreachBlog />} />
    <Route path="blog/morgan-stanley-fine" element={<MorganStanleyFineBlog />} />
    <Route path="blog/ncua-guidelines" element={<NCUAGuidelinesBlog />} />
    <Route path="blog/nist-clear-purge" element={<NISTClearPurgeBlog />} />
    <Route path="blog/nist-tested-erasure-software" element={<NISTTestedErasureSoftwareBlog />} />
    <Route path="blog/nist-vs-ieee" element={<NISTVsIEEEBlog />} />
    <Route path="blog/onsite-vs-offsite-destruction" element={<OnsiteVsOffsiteDestructionBlog />} />
    <Route path="blog/phi-erasure" element={<PHIErasureBlog />} />
    <Route path="blog/pii-disposal-breach" element={<PIIDisposalBreachBlog />} />
    <Route path="blog/post-covid-data-disposal" element={<PostCovidDataDisposalBlog />} />
    <Route path="blog/private-cloud" element={<PrivateCloudBlog />} />
    <Route path="blog/remote-wiping-software" element={<RemoteWipingSoftwareBlog />} />
    <Route path="blog/remote-work-data-erasure" element={<RemoteWorkDataErasureBlog />} />
    <Route path="blog/reseller-profits" element={<ResellerProfitsBlog />} />
    <Route path="blog/right-to-repair" element={<RightToRepairBlog />} />
    <Route path="blog/ssd-wipe-bios" element={<SSDWipeBIOSBlog />} />
    <Route path="blog/secure-file-erase" element={<SecureFileEraseBlog />} />
    <Route path="blog/secure-hdd-disposal" element={<SecureHDDDisposalBlog />} />
    <Route path="blog/secure-it-asset-disposal" element={<SecureITAssetDisposalBlog />} />
    <Route path="blog/secure-smartphone-erasure" element={<SecureSmartphoneErasureBlog />} />
    <Route path="blog/server-erasure" element={<ServerErasureBlog />} />
    <Route path="blog/shadow-data" element={<ShadowDataBlog />} />
    <Route path="blog/statutory-compliance" element={<StatutoryComplianceBlog />} />
    <Route path="blog/ultratest-comparison" element={<UltratestComparisonBlog />} />
    <Route path="blog/vm-erasure" element={<VMErasureBlog />} />
    <Route path="blog/windows-10-eos" element={<Windows10EOSBlog />} />
    <Route path="blog/wipe-computer-donating" element={<WipeComputerDonatingBlog />} />
    <Route path="blog/world-class-nps" element={<WorldClassNPSBlog />} />
    <Route path="blog/caption-call-settlement" element={<CaptionCallSettlementBlog />} />
  </Route>
);
