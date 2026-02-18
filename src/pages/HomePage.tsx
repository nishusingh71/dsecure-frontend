import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import DSecureIconOnly from "@/assets/dsecure-icon-only.svg"; // Assuming vite-plugin-svgr or similar, but wait, typical vite import provides url by default. 
// [LCP-FIX] Removed synchronous import of seo.ts (276KB) — lazy loaded after first paint
// import { getSEOForPage } from "@/utils/seo";
import OptimizedImage from "@/components/OptimizedImage";
import {
  LightningIcon,
  ArrowRightIcon,
  ShieldIcon,
  BuildingIcon,
  StarIcon,
  GearIcon,
  HoverIcon,
  ClipboardIcon,
  GlobeIcon,
  HeartIcon,
  CloudIcon,
  ServerIcon,
  DatabaseIcon,
} from "@/components/FlatIcons";
import { useEffect, useState, memo, useMemo, useCallback, lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
// [LCP-FIX] getSEOForPage loaded lazily via dynamic import
import { usePerformanceMonitor } from "@/utils/performanceUtils";
import { useTranslation } from "react-i18next";

// [PERF-Phase5] Lazy-loaded home sections to reduce initial JS execution (TBT)
const BenefitsSection = lazy(() => import("@/components/home/BenefitsSection"));
const IndustriesSection = lazy(() => import("@/components/home/IndustriesSection"));
const ServicesOverviewSection = lazy(() => import("@/components/home/ServicesOverviewSection"));
const KeyStatsSection = lazy(() => import("@/components/home/KeyStatsSection"));

const HomePage = memo(function HomePage() {
  usePerformanceMonitor("HomePage");
  const { t } = useTranslation();

  // [LCP-FIX] Defer heavy hero illustration to after first paint
  // The h1 (LCP element) renders immediately; SVG illustration mounts after idle
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(() => setHeroReady(true));
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setHeroReady(true), 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToHash = useCallback(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    scrollToHash();
  }, [scrollToHash]);

  // [LCP-FIX] Lazy-load seo.ts (276KB) after first paint — not needed for visible content
  const [seoData, setSeoData] = useState<any>(null);
  useEffect(() => {
    import("@/utils/seo").then(mod => {
      setSeoData(mod.getSEOForPage("home"));
    });
  }, []);

  return (
    <>
      {seoData && <SEOHead seo={seoData} />}
      <section
        id="hero"
        className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 xxl:py-28"
      >
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xxl:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-12 xl:gap-16 xxl:gap-20 items-center">
            <div className="space-y-6 xs:space-y-7 sm:space-y-8 md:space-y-8 lg:space-y-8 xl:space-y-10 xxl:space-y-12 lg:pr-6 xl:pr-8 xxl:pr-12">
              {/* [LCP-FIX] No <Reveal> wrapper — render h1 immediately for fastest LCP */}
              <div className="space-y-6">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl xxl:text-7xl font-bold tracking-tight text-slate-900 leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight xxl:leading-tight">
                  {t("hero.title")}{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {t("hero.titleHighlight")}
                  </span>
                </h1>
                <p className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 leading-relaxed xs:leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-relaxed xxl:leading-relaxed">
                  {t("hero.subtitle")}
                </p>
              </div>
              {/* [LCP-FIX] No <Reveal> wrapper — CTA buttons render immediately */}
              <div className="flex flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row xxl:flex-row items-start xs:items-start sm:items-center md:items-center lg:items-center xl:items-center xxl:items-center gap-3 xs:gap-4 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-5 xxl:gap-6">
                <Link
                  to="/products"
                  className="btn-primary w-full sm:w-auto text-center inline-flex items-center justify-center"
                >
                  <HoverIcon>
                    {(filled) => (
                      <LightningIcon
                        className="w-5 h-5 mr-2"
                        filled={filled}
                      />
                    )}
                  </HoverIcon>
                  {t("home.exploreProducts")}
                </Link>
                <Link
                  to="/pricing-and-plan"
                  className="btn-primary w-full sm:w-auto text-center inline-flex items-center justify-center bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                >
                  <HoverIcon>
                    {(filled) => (
                      <svg
                        className="w-5 h-5 mr-2"
                        fill={filled ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5M7 13v5a2 2 0 002 2h6.5M17 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    )}
                  </HoverIcon>
                  Buy Now
                </Link>
              </div>
              {/* [LCP-FIX] No <Reveal> wrapper — badges render immediately */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>ISO 27001</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>NIST 800-88</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>GDPR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>SOC 2</span>
                </div>
              </div>
            </div>
            <div className="relative lg:order-last">
              {/* [LCP-FIX] Defer entire hero illustration until after first paint */}
              {heroReady ? (
                <div className="relative flex items-center justify-center min-h-[380px] lg:min-h-[520px]">
                  {/* Hero Illustration Container - Professional Design */}
                  <div className="relative w-[380px] h-[380px] lg:w-[480px] lg:h-[480px]">
                    {/* Outer Glow Ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-100/40 via-transparent to-teal-100/40 blur-xl"></div>

                    {/* Outer Glow Ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-100/40 via-transparent to-teal-100/40 blur-xl"></div>

                    {/* Outer Dashed Circle */}
                    <svg
                      className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite] will-change-transform"
                      viewBox="0 0 480 480"
                    >
                      <circle
                        cx="240"
                        cy="240"
                        r="225"
                        fill="none"
                        stroke="url(#gradientOuter)"
                        strokeWidth="1.5"
                        strokeDasharray="12 8"
                        opacity="0.5"
                      />
                      <defs>
                        <linearGradient
                          id="gradientOuter"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#14b8a6" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Inner Dashed Circle */}
                    <svg
                      className="absolute inset-0 w-full h-full animate-[spin_45s_linear_infinite_reverse] will-change-transform"
                      viewBox="0 0 480 480"
                    >
                      <circle
                        cx="240"
                        cy="240"
                        r="145"
                        fill="none"
                        stroke="url(#gradientInner)"
                        strokeWidth="1.5"
                        strokeDasharray="8 6"
                        opacity="0.6"
                      />
                      <defs>
                        <linearGradient
                          id="gradientInner"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Central Element - Shield with Data Protection Theme */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="relative">
                        {/* Shield Background */}
                        <div className="w-[140px] h-[160px] lg:w-[180px] lg:h-[200px] relative">
                          {/* Shield Shape */}
                          <svg
                            viewBox="0 0 100 120"
                            className="w-full h-full drop-shadow-xl"
                          >
                            <defs>
                              <linearGradient
                                id="shieldGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="50%" stopColor="#059669" />
                                <stop offset="100%" stopColor="#047857" />
                              </linearGradient>
                              <filter
                                id="shieldShadow"
                                x="-20%"
                                y="-20%"
                                width="140%"
                                height="140%"
                              >
                                <feDropShadow
                                  dx="0"
                                  dy="4"
                                  stdDeviation="6"
                                  floodColor="#10b981"
                                  floodOpacity="0.3"
                                />
                              </filter>
                            </defs>
                            <path
                              d="M50 5 L95 25 L95 55 C95 85 75 105 50 115 C25 105 5 85 5 55 L5 25 Z"
                              fill="url(#shieldGradient)"
                              filter="url(#shieldShadow)"
                            />
                            {/* Shield Inner Border */}
                            <path
                              d="M50 12 L88 29 L88 55 C88 80 71 97 50 106 C29 97 12 80 12 55 L12 29 Z"
                              fill="none"
                              stroke="white"
                              strokeWidth="1"
                              opacity="0.3"
                            />
                          </svg>

                          {/* Shield Content - Checkmark + Data Icon */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                            {/* Checkmark Circle */}
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                              <svg
                                className="w-7 h-7 lg:w-10 lg:h-10 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            {/* Text */}
                            <span className="text-white text-[10px] lg:text-xs font-bold tracking-wider mt-2 uppercase">
                              Secured
                            </span>
                          </div>
                        </div>

                        {/* Floating Badge - Removed NIST Certified */}
                      </div>
                    </div>

                    {/* Product Icons - 6 icons evenly around the Shield */}
                    {/* Top - Data Erasure (Main Product) */}
                    <div className="absolute top-[-8px] left-1/2 -translate-x-1/2">
                      <div className="group relative">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                          {/* Trash/Delete Icon - Clear Data Erasure Symbol */}
                          <svg
                            className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-semibold text-emerald-700 whitespace-nowrap bg-white/80 px-2 py-0.5 rounded">
                          Data Erasure
                        </span>
                      </div>
                    </div>

                    {/* Top Left - Desktop/Laptop */}
                    <div className="absolute top-[90px] left-[12px] lg:top-[110px] lg:left-[15px]">
                      <div className="group relative">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                          {/* Desktop/Monitor Icon */}
                          <svg
                            className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <path d="M8 21h8M12 17v4" />
                          </svg>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">
                          Personal Computer's
                        </span>
                      </div>
                    </div>

                    {/* Top Right - Cloud */}
                    <div className="absolute top-[90px] right-[12px] lg:top-[110px] lg:right-[15px]">
                      <div className="group relative">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                          {/* Cloud Icon */}
                          <svg
                            className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">
                          Cloud
                        </span>
                      </div>
                    </div>

                    {/* Bottom Left - Files/Folders */}
                    <div className="absolute bottom-[80px] left-[12px] lg:bottom-[95px] lg:left-[15px]">
                      <div className="group relative">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                          {/* Folder Icon */}
                          <svg
                            className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">
                          Files/Folder
                        </span>
                      </div>
                    </div>

                    {/* Bottom Right - HDD/SSD Drives */}
                    <div className="absolute bottom-[80px] right-[12px] lg:bottom-[95px] lg:right-[15px]">
                      <div className="group relative">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                          {/* HDD/Drive Icon - Disk with center */}
                          <svg
                            className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <circle cx="12" cy="12" r="4" />
                            <circle
                              cx="12"
                              cy="12"
                              r="1.5"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-600 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">
                          HDD/SSD
                        </span>
                      </div>
                    </div>

                    {/* Bottom - Compliance/Certification */}
                    <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
                      <div className="group relative">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 hover:border-emerald-500">
                          {/* Shield with Checkmark - Compliance */}
                          <svg
                            className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] font-semibold text-emerald-700 whitespace-nowrap bg-white/80 px-2 py-0.5 rounded">
                          Compliance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* [LCP-FIX] Placeholder to prevent layout shift while illustration loads */
                <div className="relative flex items-center justify-center min-h-[380px] lg:min-h-[520px]" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Trial Promotion Section — EMOJIS REPLACED */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        <div className="container-responsive relative z-10">
          <Reveal>
            <div className="text-center text-white max-w-4xl mx-auto">
              {/* 🎉 → StarIcon */}
              <div className="text-4xl md:text-6xl mb-6 animate-bounce">
                <StarIcon
                  className="w-16 h-16 text-yellow-300 mx-auto"
                  filled={true}
                />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("home.enterpriseTrialTitle")}
              </h2>
              <p className="text-xl md:text-2xl mb-2 opacity-90">
                {t("home.enterpriseTrialSubtitle")}
              </p>
              <p className="text-lg mb-8 opacity-80">
                {t("home.enterpriseTrialNote")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  to="/contact"
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center justify-center"
                >
                  {/* 🚀 → LightningIcon */}
                  <LightningIcon className="w-5 h-5 mr-2" filled={true} />
                  {t("home.enterpriseTrialButton")}
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm inline-flex items-center justify-center"
                >
                  {/* 📞 → Phone Icon (inline) */}
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.74 21 5 16.26 5 10.5V5z"
                    />
                  </svg>
                  {t("home.enterpriseTrialContact")}
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Reveal delayMs={10}>
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                    {/* 🛡️ → ShieldIcon */}
                    <div className="text-2xl mb-3 text-white">
                      <ShieldIcon className="w-8 h-8 mx-auto" filled={true} />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {t("home.enterpriseFeature1")}
                    </h3>
                    <p className="text-sm opacity-80">
                      {t("home.enterpriseFeature1Desc")}
                    </p>
                  </div>
                </Reveal>
                <Reveal delayMs={20}>
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                    {/* ⚡ → LightningIcon */}
                    <div className="text-2xl mb-3 text-white">
                      <LightningIcon
                        className="w-8 h-8 mx-auto"
                        filled={true}
                      />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {t("home.enterpriseFeature2")}
                    </h3>
                    <p className="text-sm opacity-80">
                      {t("home.enterpriseFeature2Desc")}
                    </p>
                  </div>
                </Reveal>
                <Reveal delayMs={30}>
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                    {/* 🎯 → StarIcon */}
                    <div className="text-2xl mb-3 text-white">
                      <StarIcon className="w-8 h-8 mx-auto" filled={true} />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {t("home.enterpriseFeature3")}
                    </h3>
                    <p className="text-sm opacity-80">
                      {t("home.enterpriseFeature3Desc")}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Compliance Standards Section — EMOJIS REPLACED */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30">
        <div className="container-app">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {t("home.featuresTitle")}{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
                  {t("home.standards")}
                </span>
              </h2>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                {t("home.featuresSubtitle")}
              </p>
            </Reveal>
          </div>

          {/* Standards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-12">
            <Reveal delayMs={200}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                <div className="relative z-10">
                  {/* 🇺🇸 → ShieldIcon */}
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 text-blue-600">
                    <ShieldIcon className="w-10 h-10 mx-auto" filled={true} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {t("home.nist80088")}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t("home.nist80088Desc")}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={250}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                <div className="relative z-10">
                  {/* 🇪🇺 → GlobeIcon */}
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 text-emerald-600">
                    <GlobeIcon className="w-10 h-10 mx-auto" filled={true} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {t("home.gdpr")}
                  </h3>
                  <p className="text-xs text-slate-500">{t("home.gdprDesc")}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={300}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                <div className="relative z-10">
                  {/* 🏥 → HeartIcon */}
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 text-blue-600">
                    <HeartIcon className="w-10 h-10 mx-auto" filled={true} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {t("home.hipaa")}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t("home.hipaaDesc")}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={350}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-purple-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                <div className="relative z-10">
                  {/* 📊 → Financial Chart SVG */}
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 text-purple-600">
                    <svg
                      className="w-10 h-10 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {t("home.sox")}
                  </h3>
                  <p className="text-xs text-slate-500">{t("home.soxDesc")}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={400}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                <div className="relative z-10">
                  {/* 🌍 → GlobeIcon */}
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 text-emerald-600">
                    <GlobeIcon className="w-10 h-10 mx-auto" filled={true} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {t("home.iso27001")}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t("home.iso27001Desc")}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={450}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-red-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                <div className="relative z-10">
                  {/* 💳 → Cart/Credit Card SVG */}
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 text-red-600">
                    <svg
                      className="w-10 h-10 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5M7 13v5a2 2 0 002 2h6.5M17 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                    {t("home.pciDss")}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t("home.pciDssDesc")}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Certifications Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            <Reveal delayMs={500}>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 text-center group hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="relative z-10">
                  {/* 🛡️ → ShieldIcon */}
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 text-blue-600">
                    <ShieldIcon className="w-8 h-8 mx-auto" filled={true} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {t("home.commonCriteria")}
                  </h3>
                  <p className="text-sm text-emerald-600 font-medium mb-2">
                    {t("home.commonCriteriaLevel")}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t("home.commonCriteriaDesc")}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={550}>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 text-center group hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="relative z-10">
                  {/* 🔒 → Lock Icon */}
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 text-blue-600">
                    <svg
                      className="w-8 h-8 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {t("home.fips1402")}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium mb-2">
                    {t("home.fips1402Level")}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t("home.fips1402Desc")}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={600}>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 text-center group hover:shadow-xl transition-all duration-300 hover:border-purple-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="relative z-10">
                  {/* 🏛️ → BuildingIcon */}
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 text-purple-600">
                    <BuildingIcon className="w-8 h-8 mx-auto" filled={true} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">
                    NSA/CSS
                  </h3>
                  <p className="text-sm text-purple-600 font-medium mb-2">
                    Approved
                  </p>
                  <p className="text-xs text-slate-500">
                    Evaluated Products List
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={650}>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 text-center group hover:shadow-xl transition-all duration-300 hover:border-yellow-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="relative z-10">
                  {/* ⭐ → StarIcon */}
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 text-yellow-600">
                    <StarIcon className="w-8 h-8 mx-auto" filled={true} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-yellow-600 transition-colors">
                    CSA STAR
                  </h3>
                  <p className="text-sm text-yellow-600 font-medium mb-2">
                    Gold
                  </p>
                  <p className="text-xs text-slate-500">
                    Cloud Security Alliance
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Key Features */}
          <Reveal delayMs={700}>
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-slate-200/60">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HoverIcon>
                      {(filled) => (
                        <ShieldIcon
                          className="w-8 h-8 text-white"
                          filled={filled}
                        />
                      )}
                    </HoverIcon>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {t("home.verifiableErasure")}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {t("home.verifiableErasureDesc")}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HoverIcon>
                      {(filled) => (
                        <ClipboardIcon
                          className="w-8 h-8 text-white"
                          filled={filled}
                        />
                      )}
                    </HoverIcon>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {t("home.auditReadyReports")}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {t("home.auditReadyReportsDesc")}
                  </p>
                </div>
                <div className="text-center md:col-span-2 lg:col-span-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HoverIcon>
                      {(filled) => (
                        <GlobeIcon
                          className="w-8 h-8 text-white"
                          filled={filled}
                        />
                      )}
                    </HoverIcon>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {t("home.globalStandards")}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {t("home.globalStandardsDesc")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={750}>
            <div className="text-center mt-12">
              <Link
                to="/compliance"
                className="btn-primary inline-flex items-center justify-center"
              >
                <span>{t("home.exploreComplianceStandards")}</span>
                <HoverIcon>
                  {(filled) => (
                    <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />
                  )}
                </HoverIcon>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* [PERF-Phase5] Lazy-loaded sections with fixed-height fallbacks to prevent CLS */}
      <Suspense fallback={<div className="h-[600px] bg-slate-50 animate-pulse" />}>
        <BenefitsSection />
      </Suspense>

      <Suspense fallback={<div className="h-[800px] bg-white animate-pulse" />}>
        <IndustriesSection />
      </Suspense>

      <Suspense fallback={<div className="h-[1000px] bg-slate-50 animate-pulse" />}>
        <ServicesOverviewSection />
      </Suspense>

      <Suspense fallback={<div className="h-[500px] bg-emerald-600 animate-pulse" />}>
        <KeyStatsSection />
      </Suspense>

      {/* Testimonials Section remains commented out or removed as per original */}
    </>
  );
});

export default HomePage;
