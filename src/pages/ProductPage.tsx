import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "@/components/Reveal";
import {
  DatabaseIcon,
  ShieldIcon,
  CloudIcon,
  ArrowRightIcon,
  CheckIcon,
  ServerIcon,
  GearIcon,
  ClipboardIcon,
  StarIcon,
  LightningIcon,
} from "@/components/FlatIcons";

// Product Catalog Download Functions
const downloadCatalog = (productType: 'drive-eraser' | 'file-eraser') => {
  const catalogInfo = {
    'drive-eraser': {
      filename: 'D-Secure-Drive-Eraser-Catalog.pdf',
      url: '/downloads/dsecure-drive-eraser-catalog.pdf'
    },
    'file-eraser': {
      filename: 'D-Secure-File-Eraser-Catalog.pdf',
      url: '/downloads/dsecure-file-eraser-catalog.pdf'
    }
  };

  const catalog = catalogInfo[productType];

  // Create download link
  const link = document.createElement('a');
  link.href = catalog.url;
  link.download = catalog.filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ProductPage: React.FC = () => {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    platform: true,
    core: false,
    reporting: false,
    services: false,
    addons: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const pricingPlans = [
    { name: "Standard", id: "basic", tag: "" },
    { name: "Corporate", id: "standard", tag: "" },
    // { name: "Cloud", id: "cloud", tag: "" },
    // { name: "Network", id: "network", tag: "Popular" },
    { name: "Pro", id: "pro", tag: "" },
    { name: "Enterprise", id: "enterprise", tag: "Premium" },
  ];

  const features = {
    platform: [
      {
        name: t('products.windowsSupport'),
        basic: "check",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.linuxSupport'),
        basic: "x",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.macosSupport'),
        basic: "x",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.multiLanguageUI'),
        basic: "pending",
        standard: "pending",
        cloud: "pending",
        network: "pending",
        pro: "pending",
        enterprise: "pending",
      },
    ],
    core: [
      {
        name: t('products.thirtyAlgorithms'),
        basic: "check",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.fileFolderErase'),
        basic: "check",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.eraseTraces'),
        basic: "check",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.eraseDeletedData'),
        basic: "x",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.eraseVolume'),
        basic: "x",
        standard: "x",
        cloud: "x",
        network: "locked",
        pro: "locked",
        enterprise: "check-5",
      },
      {
        name: t('products.eraseDisk'),
        basic: "x",
        standard: "x",
        cloud: "x",
        network: "locked",
        pro: "locked",
        enterprise: "check-1",
      },
      {
        name: t('products.scheduledErase'),
        basic: "check-file",
        standard: "check-expanded",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.cloudStorageErase'),
        basic: "check",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
    ],
    reporting: [
      {
        name: t('products.localPdfReports'),
        basic: "x",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.whiteLabelReports'),
        basic: "x",
        standard: "x",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.cloudReportUpload'),
        basic: "x",
        standard: "x",
        cloud: "check-slow",
        network: "check-improved",
        pro: "check-fast",
        enterprise: "check-fastest",
      },
      {
        name: t('products.xmlReportFormat'),
        basic: "x",
        standard: "x",
        cloud: "x",
        network: "x",
        pro: "pending",
        enterprise: "check",
      },
      {
        name: t('products.auditGradeCompliance'),
        basic: "x",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.userActionLogs'),
        basic: "x",
        standard: "x",
        cloud: "x",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
    ],
    services: [
      {
        name: t('products.webDashboard'),
        basic: "limited",
        standard: "check",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.cloudCommands'),
        basic: "x",
        standard: "x",
        cloud: "x",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.customInstaller'),
        basic: "locked",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "check-1",
        enterprise: "check-5",
      },
      {
        name: t('products.subUserManagement'),
        basic: "locked-profiles",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: t('products.privateCloudSupport'),
        basic: "x",
        standard: "x",
        cloud: "x",
        network: "x",
        pro: "check-1",
        enterprise: "check-1",
      },
      {
        name: t('products.multiLevelUserLogs'),
        basic: "x",
        standard: "x",
        cloud: "x",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
      {
        name: t('products.whiteLabelDashboard'),
        basic: "x",
        standard: "x",
        cloud: "check",
        network: "check",
        pro: "check",
        enterprise: "check",
      },
    ],
    addons: [
      {
        name: t('products.additionalDiskLicenses'),
        basic: "x",
        standard: "x",
        cloud: "x",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: t('products.additionalVolumeLicenses'),
        basic: "x",
        standard: "x",
        cloud: "x",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: t('products.extraCustomInstaller'),
        basic: "locked",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: t('products.extraSubUsers'),
        basic: "locked",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: t('products.extraPrivateClouds'),
        basic: "x",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: t('products.bespokeIntegrations'),
        basic: "locked",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
      {
        name: t('products.dedicatedSlaSupport'),
        basic: "locked",
        standard: "locked",
        cloud: "locked",
        network: "locked",
        pro: "locked",
        enterprise: "locked",
      },
    ],
  };

  const comparisonSections = [
    {
      key: "platform" as const,
      title: t('products.platformOsSupport'),
      data: features.platform,
    },
    {
      key: "core" as const,
      title: t('products.coreErasureCapabilities'),
      data: features.core,
    },
    {
      key: "reporting" as const,
      title: t('products.reportingCompliance'),
      data: features.reporting,
    },
    {
      key: "addons" as const,
      title: t('products.addOnCustomization'),
      data: features.addons,
    },
  ];

  const renderFeatureIcon = (
    value: string,
    variant: "default" | "compact" = "default"
  ) => {
    const iconClass = variant === "compact" ? "w-3 h-3" : "w-4 h-4";
    const textClass = variant === "compact" ? "text-[0.65rem]" : "text-xs";
    const gapClass = variant === "compact" ? "space-x-1" : "space-x-1";
    switch (value) {
      case "check":
        return <CheckIcon className={`${iconClass} text-emerald-600`} />;
      case "check-1":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <CheckIcon className={`${iconClass} text-emerald-600`} />
            <span className={`${textClass} font-medium text-emerald-600`}>
              1
            </span>
          </div>
        );
      case "check-5":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <CheckIcon className={`${iconClass} text-emerald-600`} />
            <span className={`${textClass} font-medium text-emerald-600`}>
              5
            </span>
          </div>
        );
      case "check-file":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <ClipboardIcon className={`${iconClass} text-emerald-600`} />
            <span className={`${textClass} font-medium text-emerald-600`}>
              {t('products.files')}
            </span>
          </div>
        );
      case "check-expanded":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <ClipboardIcon className={`${iconClass} text-emerald-600`} />
            <span className={`${textClass} font-medium text-emerald-600`}>
              {t('products.all')}
            </span>
          </div>
        );
      case "check-slow":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <LightningIcon className={`${iconClass} text-amber-500`} />
            <span className={`${textClass} font-medium text-amber-500`}>
              {t('products.basic')}
            </span>
          </div>
        );
      case "check-improved":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <LightningIcon className={`${iconClass} text-emerald-500`} />
            <span className={`${textClass} font-medium text-emerald-500`}>
              {t('products.fast')}
            </span>
          </div>
        );
      case "check-fast":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <LightningIcon className={`${iconClass} text-emerald-600`} />
            <span className={`${textClass} font-medium text-emerald-600`}>
              {t('products.faster')}
            </span>
          </div>
        );
      case "check-fastest":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <LightningIcon className={`${iconClass} text-purple-600`} />
            <span className={`${textClass} font-medium text-purple-600`}>
              {t('products.premium')}
            </span>
          </div>
        );
      case "x":
        return (
          <svg
            className={`${iconClass} text-red-500`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "locked":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <ShieldIcon className={`${iconClass} text-amber-600`} />
            <span className={`${textClass} font-medium text-amber-600`}>
              {t('products.addon')}
            </span>
          </div>
        );
      case "locked-profiles":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <ShieldIcon className={`${iconClass} text-amber-600`} />
            <span className={`${textClass} font-medium text-amber-600`}>
              {t('products.profiles')}
            </span>
          </div>
        );
      case "pending":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <StarIcon className={`${iconClass} text-blue-600`} />
            <span className={`${textClass} font-medium text-blue-600`}>
              {t('products.comingSoon')}
            </span>
          </div>
        );
      case "limited":
        return (
          <div className={`flex items-center ${gapClass}`}>
            <GearIcon className={`${iconClass} text-slate-600`} />
            <span className={`${textClass} font-medium text-slate-600`}>
              {t('products.limited')}
            </span>
          </div>
        );
      default:
        return <span className={`${textClass} font-medium`}>{value}</span>;
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("products")} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-slate-800 overflow-hidden">
        {/* Hero Section */}
        <section className="relative text-center py-12 xs:py-16 sm:py-20 px-4 xs:px-6 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-emerald-700 mb-4 xs:mb-6">
                {t('products.title')}
              </h1>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="max-w-4xl mx-auto text-lg xs:text-xl sm:text-2xl text-slate-600 mb-6 xs:mb-8 leading-relaxed">
                {t('products.subtitle')}
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center items-center mt-8 xs:mt-10 sm:mt-12">
                <Link
                  to="/contact?request=free-demo"
                  className="inline-flex items-center px-6 xs:px-7 sm:px-8 py-3 xs:py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-2xl hover:shadow-2xl hover:scale-105 text-base xs:text-lg w-full sm:w-auto justify-center"
                >
                  {t('products.requestFreeDemo')}
                  <ArrowRightIcon className="ml-2 xs:ml-3 w-4 xs:w-5 h-4 xs:h-5" />
                </Link>
                <Link
                  to="/pricing-and-plan"
                  className="inline-flex items-center px-6 xs:px-7 sm:px-8 py-3 xs:py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 font-bold hover:bg-emerald-50 transition-all text-base xs:text-lg w-full sm:w-auto justify-center"
                >
                  {t('products.buyLicenses')}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Product Cards */}
        <section className="py-12 xs:py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 h-full">
              {/* Product 1 - Drive Eraser */}
              <Reveal>
                <div className="flex flex-col h-full bg-white rounded-3xl shadow-2xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 p-6 xs:p-8 sm:p-10 border border-emerald-100 group relative overflow-hidden">
                  <div className="absolute top-4 xs:top-6 right-4 xs:right-6 bg-emerald-600 text-white px-3 xs:px-4 py-1 rounded-full text-xs xs:text-sm font-bold">
                    {t('products.mostPopular')}
                  </div>
                  <div className="flex-none">
                    <DatabaseIcon className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 text-emerald-600 mb-4 xs:mb-6 transition-transform group-hover:scale-110" />
                    <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2 text-slate-900">
                      {t('products.driveEraserTitle')}
                    </h3>
                    <p className="text-slate-600 mb-3 xs:mb-4 leading-relaxed text-base xs:text-lg font-semibold">
                      {t('products.driveEraserSubtitle')}
                    </p>
                    <p className="text-slate-600 mb-4 xs:mb-6 leading-relaxed text-sm xs:text-base">
                      {t('products.driveEraserDesc')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6 mb-6 xs:mb-8 flex-1">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3 xs:mb-4 text-sm xs:text-base">
                        {t('products.keyFeatures')}
                      </h4>
                      <ul className="text-slate-700 space-y-3 text-sm">
                        <li className="flex items-center gap-3">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          {t('products.erasureStandards')}
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          {t('products.cloudConsoleIntegration')}
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          {t('products.usbPxeBoot')}
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          {t('products.digitallySigned')}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-4">
                        {t('products.technicalSpecs')}
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">
                            {t('products.supportedTypes')}
                          </span>
                          <span className="font-semibold">
                            {t('products.supportedTypesValue')}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">
                            {t('products.erasureMethods')}
                          </span>
                          <span className="font-semibold">{t('products.twentySixStandards')}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">{t('products.deployment')}</span>
                          <span className="font-semibold">{t('products.deploymentValue')}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">{t('products.licenses')}</span>
                          <span className="font-semibold">{t('products.licensesValue')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      {t('products.keyBenefits')}
                    </h4>
                    <ul className="text-slate-700 space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        {t('products.safeguardPrivacy')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        {t('products.preventDataThefts')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        {t('products.maxResaleValue')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        {t('products.globalStandardsCompliance')}
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      {t('products.startingAt')} $20
                    </div>
                    <div className="text-slate-600">
                      {t('products.payPerUse')}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <button
                      onClick={() => downloadCatalog('drive-eraser')}
                      className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50 transition-all text-center gap-2"
                    >
                      <ClipboardIcon className="w-4 h-4" />
                      {t('products.dataSheet')}
                    </button>
                    <Link
                      to="/contact?request=free-license&product=drive-eraser"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all group-hover:translate-x-1 text-center"
                    >
                      {t('products.requestFreeDemo')}
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                  <Link
                    to="/pricing-and-plan?product=drive-eraser"
                    className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50 transition-all text-center mt-2"
                  >
                    {t('products.buyNow')}
                  </Link>
                </div>
              </Reveal>

              {/* Product 2 - File Eraser */}
              <Reveal delayMs={100}>
                <div className="flex flex-col h-full bg-white rounded-3xl shadow-2xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 p-10 border border-emerald-100 group relative overflow-hidden">
                  <div className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {t('products.bestRated')}
                  </div>
                  <div className="flex-none">
                    <ServerIcon className="w-16 h-16 text-emerald-600 mb-6 transition-transform group-hover:scale-110" />
                    <h3 className="text-3xl font-bold mb-2 text-slate-900">
                      {t('products.fileEraserTitle')}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed text-lg font-semibold">
                      {t('products.fileEraserSubtitle')}
                    </p>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {t('products.fileEraserDesc')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 flex-1">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-4">
                        {t('products.keyFeatures')}
                      </h4>
                      <ul className="text-slate-700 space-y-3 text-sm">
                        <li className="flex items-center gap-3">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          {t('products.erasureStandards')}
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          {t('products.multiLanguageUI')}
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          {t('products.googleDriveErasure')}
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          {t('products.comprehensiveReporting')}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-4">
                        {t('products.platformSupport')}
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">{t('products.windows')}</span>
                          <span className="font-semibold">{t('products.windowsFullSupport')}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">{t('products.macos')}</span>
                          <span className="font-semibold">{t('products.macosFullSupport')}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">{t('products.linux')}</span>
                          <span className="font-semibold">{t('products.linuxFullSupport')}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-600">{t('products.cloud')}</span>
                          <span className="font-semibold">{t('products.cloudEnterprise')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      {t('products.useCases')}
                    </h4>
                    <ul className="text-slate-700 space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        {t('products.individualUsers')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        {t('products.corporateDataProtection')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        {t('products.cloudErasure')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600" />
                        {t('products.complianceAudit')}
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      {t('products.startingAt')} $40
                    </div>
                    <div className="text-slate-600">
                      {t('products.individualEnterpriseAvailable')}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <button
                      onClick={() => downloadCatalog('file-eraser')}
                      className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50 transition-all text-center gap-2"
                    >
                      <ClipboardIcon className="w-4 h-4" />
                      {t('products.dataSheet')}
                    </button>

                    <Link
                      to="/contact?request=free-demo&product=file-eraser"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all group-hover:translate-x-1 text-center"
                    >
                      {t('products.requestFreeDemo')}
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                  <Link
                    to="/pricing-and-plan?product=file-eraser"
                    className="mt-2 flex-1 inline-flex items-center justify-center px-6 py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50 transition-all text-center"
                  >
                    {t('products.buyNow')}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --- Features & Plans for File Eraser --- */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            {false && (<><Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  {t('products.fileErasureFeatures')}
                </h2>
                <p className="text-lg text-slate-600 mb-6 max-w-4xl mx-auto">
                  {t('products.compareAllFeatures')}
                </p>
              </div>
            </Reveal>

              {/* Pricing Table for File Eraser */}
              <Reveal delayMs={100}>
                <div className="bg-slate-50 rounded-2xl shadow-lg overflow-hidden">
                  <div className="hidden sm:block">
                    <div className="grid grid-cols-5 gap-0 bg-emerald-600 text-white">
                      <div className="p-6 font-semibold">{t('products.feature')}</div>
                      {pricingPlans.map((plan) => (
                        <div key={plan.id} className="p-6 text-center relative">
                          <div className="font-bold text-lg">{plan.name}</div>
                          {/* {plan.tag && (
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                            {plan.tag === 'Popular' ? t('products.popular') : t('products.premium')}
                          </div>
                        )} */}
                        </div>
                      ))}
                    </div>

                    {comparisonSections.map((section) => {
                      const isExpanded = expandedSections[section.key];
                      return (
                        <div
                          key={section.key}
                          className="border-b border-slate-200"
                        >
                          <button
                            onClick={() => toggleSection(section.key)}
                            className="w-full p-6 text-left bg-slate-100 hover:bg-slate-200 transition-colors flex justify-between items-center"
                          >
                            <span className="font-semibold text-slate-900">
                              {section.title}
                            </span>
                            {isExpanded ? (
                              <ArrowRightIcon className="w-5 h-5 rotate-[-90deg]" />
                            ) : (
                              <ArrowRightIcon className="w-5 h-5 rotate-90" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="bg-white">
                              {section.data.map((feature, index) => (
                                <div
                                  key={`${section.key}-${index}`}
                                  className="grid grid-cols-5 gap-0 border-b border-slate-100 last:border-b-0"
                                >
                                  <div className="p-4 border-r border-slate-100 text-sm text-slate-700 flex items-center">
                                    {feature.name}
                                  </div>
                                  {pricingPlans.map((plan) => (
                                    <div
                                      key={plan.id}
                                      className="p-4 border-r border-slate-100 last:border-r-0 text-center flex items-center justify-center"
                                    >
                                      {renderFeatureIcon(
                                        feature[
                                        plan.id as keyof typeof feature
                                        ]
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="sm:hidden">
                    {comparisonSections.map((section) => {
                      const isExpanded = expandedSections[section.key];
                      return (
                        <div
                          key={`mobile-${section.key}`}
                          className="border-b border-slate-200"
                        >
                          <button
                            onClick={() => toggleSection(section.key)}
                            className="w-full px-4 py-4 text-left bg-slate-100 hover:bg-slate-200 transition-colors flex justify-between items-center"
                          >
                            <span className="font-semibold text-slate-900 text-sm">
                              {section.title}
                            </span>
                            {isExpanded ? (
                              <ArrowRightIcon className="w-5 h-5 rotate-[-90deg]" />
                            ) : (
                              <ArrowRightIcon className="w-5 h-5 rotate-90" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="bg-white px-4 pb-4 pt-2 space-y-4">
                              {section.data.map((feature, index) => (
                                <div
                                  key={`${section.key}-mobile-${index}`}
                                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm"
                                >
                                  <div className="text-sm font-semibold text-slate-900">
                                    {feature.name}
                                  </div>
                                  <div className="mt-3 grid grid-cols-2 gap-3">
                                    {pricingPlans.map((plan) => (
                                      <div
                                        key={`${section.key}-${plan.id}-${index}`}
                                        className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm border border-slate-100"
                                      >
                                        <span className="text-xs font-medium text-slate-600">
                                          {plan.name}
                                        </span>
                                        <div className="flex items-center justify-end">
                                          {renderFeatureIcon(
                                            feature[
                                            plan.id as keyof typeof feature
                                            ],
                                            "compact"
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white px-4 xs:px-6 sm:px-8 py-6 xs:py-7 sm:py-8">
                    <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4">
                      {pricingPlans.map((plan) => (
                        <Link
                          key={plan.id}
                          to={`/pricing-and-plan?plan=${plan.id}&product=file-eraser&section=file-eraser`}
                          className="inline-flex items-center justify-center px-4 py-2.5 xs:py-3 rounded-lg bg-emerald-600 text-white text-sm xs:text-base font-semibold hover:bg-emerald-700 transition-all text-center w-full"
                        >
                          {plan.name} Plan
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 xs:mt-7 sm:mt-8 text-center">
                      <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center items-center">
                        <Link
                          to="/contact?request=free-demo&product=file-eraser"
                          className="inline-flex items-center justify-center px-6 xs:px-7 sm:px-8 py-3 xs:py-4 rounded-xl bg-emerald-600 text-white text-sm xs:text-base sm:text-lg font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
                        >
                          {t('products.requestFreeDemoBtn')}
                          <ArrowRightIcon className="ml-2 xs:ml-3 w-4 xs:w-5 h-4 xs:h-5" />
                        </Link>
                        <Link
                          to="/pricing-and-plan?product=file-eraser"
                          className="inline-flex items-center justify-center px-6 xs:px-7 sm:px-8 py-3 xs:py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 text-sm xs:text-base sm:text-lg font-bold hover:bg-emerald-50 transition-all w-full sm:w-auto"
                        >
                          {t('products.buyLicensesBtn')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal></>)}

            {/* --- Services Table for File & Drive Eraser --- */}
            <Reveal delayMs={200}>
              <div className="mt-20 bg-slate-50 rounded-2xl shadow-lg overflow-hidden">
                <div className="text-center py-10">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {t('products.servicesAvailable')}
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    {t('products.servicesDescription')}
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-emerald-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">
                          {t('products.service')}
                        </th>
                        <th className="px-6 py-4 text-center font-semibold">
                          {t('products.fileEraser')}
                        </th>
                        <th className="px-6 py-4 text-center font-semibold">
                          {t('products.driveEraser')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      <tr>
                        <td className="px-6 py-4">{t('products.webDashboard')}</td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">
                          {t('products.cloudCommands')}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">
                          {t('products.customInstaller')}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">{t('products.privateCloudSupport')}</td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">{t('products.multiLevelUserLogs')}</td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">{t('products.whiteLabelDashboard')}</td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {renderFeatureIcon("check")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-20 px-6 sm:px-10 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              {t('products.readyToSecure')}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-emerald-100 mb-8">
              {t('products.joinThousands')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-emerald-700 font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                {t('products.requestFreeDemoCtA')}
                <ArrowRightIcon className="ml-3 w-5 h-5" />
              </Link>
              <Link
                to="/pricing-and-plan"
                className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-white text-white font-bold hover:bg-white hover:text-emerald-700 transition-all text-lg"
              >
                {t('products.buyLicensesNow')}
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
};

export default ProductPage;
