import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useState, useEffect, useCallback } from "react";
import {
  Zap,
  Smartphone,
  Activity,
  Database,
  RefreshCcw,
  Shield,
  Monitor,
  Server,
  X,
  CheckCircle2,
} from "lucide-react";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import ThemeAwareLogoFooter from "../components/ThemeAwareLogoFooter";
import ScrollToTopComponent from "@/components/ScrollToTop";
import { useTranslation } from "react-i18next";
import { useIdleTimer } from "@/hooks/useIdleTimer";

export default function MainLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [productsDropdownTab, setProductsDropdownTab] = useState<
    "eraser" | "migration" | "diagnostics" | "verification"
  >("eraser");
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [solutionsDropdownTab, setSolutionsDropdownTab] = useState<
    "industry" | "specialized"
  >("industry");
  const [hideHeader, setHideHeader] = useState(false); // Hide header when sticky section nav is visible

  const toggleMobileMenu = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(globalThis.scrollY > 10);
    };
  
    globalThis.addEventListener("scroll", handleScroll);
    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for auth state changes to force header re-render
  useEffect(() => {
    const handleAuthStateChange = () => {
    };

    globalThis.addEventListener("authStateChanged", handleAuthStateChange);
    return () =>
      globalThis.removeEventListener("authStateChanged", handleAuthStateChange);
  }, []);

  // Close products dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (productsDropdownOpen && !target.closest("[data-products-dropdown]")) {
        setProductsDropdownOpen(false);
      }
      if (solutionsDropdownOpen && !target.closest("[data-solutions-dropdown]")) {
        setSolutionsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [productsDropdownOpen, solutionsDropdownOpen]);

  // ? Idle Auto-Logout (15 minutes = 900,000 ms)
  // Only active when user is logged in
  useIdleTimer(
    15 * 60 * 1000,
    () => {
      if (user) {
        logout();
      }
    },
    !!user,
  );

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Listen for sticky section nav visibility to hide main header
  useEffect(() => {
    const handleStickyNavVisible = (
      event: CustomEvent<{ visible: boolean }>,
    ) => {
      setHideHeader(event.detail.visible);
    };

    globalThis.addEventListener(
      "stickyNavVisible",
      handleStickyNavVisible as EventListener,
    );
    return () =>
      globalThis.removeEventListener(
        "stickyNavVisible",
        handleStickyNavVisible as EventListener,
      );
  }, []);

  return (
    <>
      <SEOHead seo={getSEOForPage("home")} />
      <div className="min-h-dvh flex flex-col">
        <header
          className={`border-b sticky top-0 z-50 transition-all duration-300 ${
            hideHeader
              ? "-translate-y-full opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100"
          } ${
            isScrolled
              ? "bg-white/95 backdrop-blur-xl shadow-lg border-slate-200/50"
              : "bg-white/80 backdrop-blur-md shadow-sm border-slate-200/30"
          } supports-[backdrop-filter]:bg-white/80`}
        >
          <div className="mx-auto max-w-7xl xxl:max-w-[1536px] px-4 xs:px-4 sm:px-6 md:px-6 lg:px-8 xl:px-10 xxl:px-12 h-16 xs:h-18 sm:h-20 md:h-20 lg:h-22 xl:h-24 xxl:h-24 flex items-center justify-between gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 xs:gap-3 font-bold text-slate-800 hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label="D-Secure homepage"
            >
              <ThemeAwareLogo
                className="h-6 xs:h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 xxl:h-12 w-auto"
                responsive={true}
                priority
              />
            </Link>

            {/* Centered Navigation */}
            <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 xxl:gap-8 text-sm xl:text-base flex-1">
              {/* <NavLink
              to="/"
              className={({ isActive }) =>
                (isActive
                  ? "text-brand font-medium"
                  : "text-slate-600 hover:text-slate-900") +
                " inline-flex items-center gap-3 py-2"
              }
            >
              Home
            </NavLink> */}
              {/* Products Dropdown */}
              <div data-products-dropdown>
                <button
                  className={`inline-flex items-center gap-2 py-2 text-slate-600 hover:text-slate-900 ${productsDropdownOpen ? "text-brand font-medium" : ""}`}
                  onClick={() => {
                    setProductsDropdownOpen(!productsDropdownOpen);
                    setSolutionsDropdownOpen(false);
                  }}
                >
                  {t("common.products")}
                </button>

                {/* Dropdown Panel — Zoho-style mega menu */}
                {productsDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-200 z-50 overflow-hidden max-h-[37.5vh] flex flex-col">
                    {/* Close Button — top right */}
                    <button
                      onClick={() => setProductsDropdownOpen(false)}
                      className="absolute top-3 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all z-[60]"
                      aria-label="Close products menu"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-1 min-h-0 overflow-hidden">
                      {/* ── LEFT SIDEBAR — vertical category tabs ── */}
                      <div className="w-52 flex-shrink-0 border-r border-slate-200 bg-slate-50/80 py-4 overflow-y-auto custom-scrollbar">
                        <button
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            !productsDropdownTab ||
                            productsDropdownTab === "eraser"
                              ? "text-emerald-700 bg-white border-r-2 border-emerald-500 font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setProductsDropdownTab("eraser")}
                        >
                          Eraser
                          {(!productsDropdownTab ||
                            productsDropdownTab === "eraser") && (
                            <svg
                              className="w-3.5 h-3.5 ml-auto text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </button>
                        <button
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            productsDropdownTab === "migration"
                              ? "text-emerald-700 bg-white border-r-2 border-emerald-500 font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setProductsDropdownTab("migration")}
                        >
                          Migration
                          {productsDropdownTab === "migration" && (
                            <svg
                              className="w-3.5 h-3.5 ml-auto text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </button>
                        <button
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            productsDropdownTab === "diagnostics"
                              ? "text-emerald-700 bg-white border-r-2 border-emerald-500 font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setProductsDropdownTab("diagnostics")}
                        >
                          Diagnostics
                          {productsDropdownTab === "diagnostics" && (
                            <svg
                              className="w-3.5 h-3.5 ml-auto text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </button>
                        <button
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            productsDropdownTab === "verification"
                              ? "text-emerald-700 bg-white border-r-2 border-emerald-500 font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setProductsDropdownTab("verification")}
                        >
                          Verification
                          {productsDropdownTab === "verification" && (
                            <svg
                              className="w-3.5 h-3.5 ml-auto text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </button>

                        {/* "Explore all" link at bottom */}
                        <div className="mt-6 px-5">
                          <Link
                            to="/all-products"
                            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1"
                            onClick={() => setProductsDropdownOpen(false)}
                          >
                            Explore All Products
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                      {/* ── RIGHT CONTENT — 3-colum                      {/* ── RIGHT CONTENT — 3-column product grid ── */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white px-6 pb-6">
                        {/* Category heading - Sticky at top of the scrollable area */}
                        <div className="sticky top-0 bg-white z-20 pt-6 pb-4 -mx-6 px-6 border-b border-slate-100/50">
                          <h3 className="text-lg font-bold text-slate-800">
                            {(!productsDropdownTab || productsDropdownTab === "eraser") && "Eraser"}
                            {productsDropdownTab === "migration" && "Migration"}
                            {productsDropdownTab === "diagnostics" && "Diagnostics"}
                            {productsDropdownTab === "verification" && "Verification"}
                          </h3>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-6">
                          {/* ═══ ERASER TAB ═══ */}
                          {(!productsDropdownTab ||
                            productsDropdownTab === "eraser") && (
                            <>
                              {/* Drive Eraser — with 2 variants */}
                              <div 
                                className="border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group/card"
                                onClick={() => {
                                  navigate('/products/drive-eraser');
                                  setProductsDropdownOpen(false);
                                }}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/card:bg-emerald-200 transition-colors">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                    </svg>
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover/card:text-emerald-700 transition-colors">Drive Eraser</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Erase HDD, SSD, PC, Mac & Server data
                                  permanently.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Link
                                    to="/products/drive-eraser"
                                    className="px-3 py-1.5 rounded-full border bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700 text-[11px] font-bold transition-all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    Drive Eraser
                                  </Link>
                                  <Link
                                    to="/products/drive-eraser-diagnostic"
                                    className="px-3 py-1.5 rounded-full border bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 text-[11px] font-bold transition-all flex items-center gap-1.5"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    <span>Diagnostic & Health</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                                  </Link>
                                </div>
                              </div>

                              {/* File Eraser — with 2 variants */}
                              <div 
                                className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group/card"
                                onClick={() => {
                                  navigate('/products/file-eraser');
                                  setProductsDropdownOpen(false);
                                }}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/card:bg-blue-200 transition-colors">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover/card:text-blue-700 transition-colors">File Eraser</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Wipe files, folders, traces & browser history.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Link
                                    to="/products/file-eraser"
                                    className="px-3 py-1.5 rounded-full border bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 text-[11px] font-bold transition-all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    Standard
                                  </Link>
                                  <Link
                                    to="/products/file-eraser-network"
                                    className="px-3 py-1.5 rounded-full border bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700 text-[11px] font-bold transition-all flex items-center gap-1.5"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    <span>Network Edition</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                  </Link>
                                </div>
                              </div>

                              {/* Smartphone Eraser */}
                              <Link
                                to="/products/smartphone-eraser"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Smartphone className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                    Smartphone Eraser
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Bulk iOS & Android wiping with audit reports.
                                </p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* Virtual Machine Eraser */}
                              <Link
                                to="/products/virtual-machine-eraser"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Monitor className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Virtual Machine Eraser</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">Securely wipe VMs on ESXi & Hyper-V hosts.</p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </Link>

                              {/* Removable Media Eraser */}
                              <Link
                                to="/products/removable-media-eraser"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Database className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Removable Media Eraser</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">Securely erase USB & flash storage devices.</p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </Link>

                              {/* LUN Eraser */}
                              <Link
                                to="/products/lun-eraser"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Server className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">LUN Eraser</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">Sanitize Logical Unit Numbers in active storage.</p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </Link>
                            </>
                          )}

                          {/* ═══ MIGRATION TAB ═══ */}
                          {productsDropdownTab === "migration" && (
                            <>
                              {/* Data Migration */}
                              <Link
                                to="/products/data-migration"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                    Data Migration
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Secure transfer across Cloud & Infrastructure.
                                </p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* Forensic Imaging */}
                              <Link
                                to="/products/forensic-imaging"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-cyan-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Database className="w-5 h-5 text-cyan-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                                    Forensic Imaging
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Bit-for-bit acquisition & cryptographic
                                  hashing.
                                </p>
                                <span className="text-xs font-semibold text-cyan-600 group-hover:text-cyan-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* FreezeState — with 2 variants */}
                              <div 
                                className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group/card"
                                onClick={() => {
                                  navigate('/products/freeze-state');
                                  setProductsDropdownOpen(false);
                                }}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/card:bg-blue-200 transition-colors">
                                    <RefreshCcw className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover/card:text-blue-700 transition-colors">FreezeState</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Reboot-to-restore system protection.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Link
                                    to="/products/freeze-state-smart"
                                    className="px-3 py-1.5 rounded-full border bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700 text-[11px] font-bold transition-all flex items-center gap-1.5"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    <span>Smart Diagnostic</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                  </Link>
                                  <Link
                                    to="/products/freeze-state-advanced"
                                    className="px-3 py-1.5 rounded-full border bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 text-[11px] font-bold transition-all flex items-center gap-1.5"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductsDropdownOpen(false);
                                    }}
                                  >
                                    <span>Advanced Eraser</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                                  </Link>
                                </div>
                              </div>

                              {/* Asset Reimaging */}
                              <Link
                                to="/products/asset-reimaging"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <RefreshCcw className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Asset Reimaging</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">Automated OS deployment & imaging solution.</p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </Link>
                            </>
                          )}

                          {/* ═══ DIAGNOSTICS TAB ═══ */}
                          {productsDropdownTab === "diagnostics" && (
                            <>
                              {/* Hardware Diagnostics */}
                              <Link
                                to="/products/hardware-diagnostics"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg
                                      className="w-5 h-5 text-emerald-600"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                      />
                                    </svg>
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                    Hardware Diagnostics
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Enterprise-grade diagnostic tools.
                                </p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* Smartphone Diagnostics */}
                              <Link
                                to="/products/smartphone-diagnostic"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Activity className="w-5 h-5 text-teal-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                                    Smartphone Diagnostics
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  50+ automated tests for mobile health.
                                </p>
                                <span className="text-xs font-semibold text-teal-600 group-hover:text-teal-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* SMART Diagnostics */}
                              <Link
                                to="/products/hard-drive-monitor"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-rose-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg
                                      className="w-5 h-5 text-rose-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                      />
                                    </svg>
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                                    SMART Diagnostics
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Health monitoring & disk cloning.
                                </p>
                                <span className="text-xs font-semibold text-rose-500 group-hover:text-rose-600 uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>

                              {/* Autopilot Detection */}
                              <Link
                                to="/products/autopilot-detection"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                    Autopilot Detection
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Windows Autopilot identification.
                                </p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>
                            </>
                          )}

                          {/* ═══ VERIFICATION TAB ═══ */}
                          {productsDropdownTab === "verification" && (
                            <>
                              {/* Drive Verifier */}
                              <Link
                                to="/products/drive-verifier"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                      Erasure Verification
                                    </h4>
                                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-wider">New</span>
                                  </div>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                  Forensic verification & post-erasure audit tools.
                                </p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More{" "}
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Solutions Dropdown */}
              <div data-solutions-dropdown>
                <button
                  className={`inline-flex items-center gap-2 py-2 text-slate-600 hover:text-slate-900 ${solutionsDropdownOpen ? "text-brand font-medium" : ""}`}
                  onClick={() => {
                    setSolutionsDropdownOpen(!solutionsDropdownOpen);
                    setProductsDropdownOpen(false);
                  }}
                >
                  {t("solutions.title")}
                </button>

                {/* Dropdown Panel — Zoho-style mega menu */}
                {solutionsDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-200 z-50 overflow-hidden max-h-[37.5vh] flex flex-col">
                    {/* Close Button — top right */}
                    <button
                      onClick={() => setSolutionsDropdownOpen(false)}
                      className="absolute top-3 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all z-[60]"
                      aria-label="Close solutions menu"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-1 min-h-0 overflow-hidden">
                      {/* ── LEFT SIDEBAR ── */}
                      <div className="w-52 flex-shrink-0 border-r border-slate-200 bg-slate-50/80 py-4 overflow-y-auto custom-scrollbar">
                        <button
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            solutionsDropdownTab === "industry"
                              ? "text-emerald-700 bg-white border-r-2 border-emerald-500 font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setSolutionsDropdownTab("industry")}
                        >
                          Industries
                          {solutionsDropdownTab === "industry" && (
                            <svg className="w-3.5 h-3.5 ml-auto text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </button>
                        <button
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                            solutionsDropdownTab === "specialized"
                              ? "text-emerald-700 bg-white border-r-2 border-emerald-500 font-semibold"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                          }`}
                          onClick={() => setSolutionsDropdownTab("specialized")}
                        >
                          Specialized
                          {solutionsDropdownTab === "specialized" && (
                            <svg className="w-3.5 h-3.5 ml-auto text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </button>

                        <div className="mt-6 px-5 text-center">
                          <Link
                            to="/solutions"
                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors inline-block w-full"
                            onClick={() => setSolutionsDropdownOpen(false)}
                          >
                            All Solutions
                          </Link>
                        </div>
                      </div>

                      {/* ── RIGHT CONTENT ── */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white px-6 pb-6">
                        <div className="sticky top-0 bg-white z-20 pt-6 pb-4 -mx-6 px-6 border-b border-slate-100/50">
                          <h3 className="text-lg font-bold text-slate-800">
                            {solutionsDropdownTab === "industry" ? "By Industry" : "Specialized Segments"}
                          </h3>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-6">
                          {solutionsDropdownTab === "industry" && (
                            <>
                              {/* Enterprise */}
                              <Link
                                to="/solutions/enterprise"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Enterprise</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">Data security and sanitization for global corporations.</p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </Link>

                              {/* Banking & Finance */}
                              <Link
                                to="/solutions/financial"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Database className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Banking & Finance</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">Compliance-driven erasure for financial institutions.</p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </Link>

                              {/* Government */}
                              <Link
                                to="/solutions/government"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Government</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">Secure sanitization for public sector & defense.</p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </Link>

                              {/* Healthcare */}
                              <Link
                                to="/solutions/healthcare"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Activity className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Healthcare</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">Privacy-first data disposal for healthcare providers.</p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </Link>

                              {/* Education */}
                              <Link
                                to="/solutions/education"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Monitor className="w-5 h-5 text-emerald-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Education</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">Managing data privacy across academic institutions.</p>
                                <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </Link>
                            </>
                          )}

                          {solutionsDropdownTab === "specialized" && (
                            <>
                              {/* Service Providers */}
                              <Link
                                to="/solutions/service-providers"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all"
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Activity className="w-5 h-5 text-teal-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">Service Providers</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">Scaleable erasure services for MSPs and MSSPs.</p>
                                <span className="text-xs font-semibold text-teal-600 group-hover:text-teal-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </Link>

                              {/* ITAD */}
                              <Link
                                to="/solutions/itad"
                                className="group border border-slate-200 rounded-xl p-5 hover:border-cyan-300 hover:shadow-md transition-all"
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <RefreshCcw className="w-5 h-5 text-cyan-600" />
                                  </div>
                                  <h4 className="font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">ITAD</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-3">Maximize asset value with secure disposal workflows.</p>
                                <span className="text-xs font-semibold text-cyan-600 group-hover:text-cyan-700 uppercase tracking-wide flex items-center gap-1">
                                  Learn More <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  (isActive
                    ? "text-brand font-medium"
                    : "text-slate-600 hover:text-slate-900") +
                  " inline-flex items-center gap-2 py-2"
                }
              >
                {t("common.resources")}
              </NavLink>
              <NavLink
                to="/partners"
                className={({ isActive }) =>
                  (isActive
                    ? "text-brand font-medium"
                    : "text-slate-600 hover:text-slate-900") +
                  " inline-flex items-center gap-2 py-2"
                }
              >
                {t("common.partners")}
              </NavLink>
              <NavLink
                to="/data-guardian-award"
                className={({ isActive }) =>
                  (isActive
                    ? "text-brand font-medium"
                    : "text-slate-600 hover:text-slate-900") +
                  " inline-flex items-center gap-2 py-2"
                }
              >
                Trust Certificate
              </NavLink>
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  (isActive
                    ? "text-brand font-medium"
                    : "text-slate-600 hover:text-slate-900") +
                  " inline-flex items-center gap-2 py-2"
                }
              >
                {t("nav.support")}
              </NavLink>
            </nav>

            {/* Right side - User Authentication & Mobile Menu */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Language Switcher */}
              {/* <LanguageSwitcher variant="minimal" showLabel={false} className="hidden lg:flex" /> */}

              {/* User Authentication Navigation */}
              <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm xl:text-base">
                {user ? (
                  <>
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        (isActive
                          ? "text-brand font-medium"
                          : "text-slate-600 hover:text-slate-900") +
                        " inline-flex items-center gap-2 py-2"
                      }
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Dashboard
                    </NavLink>
                    <button
                      onClick={logout}
                      className="text-slate-600 hover:text-slate-900 inline-flex items-center gap-2 py-2 text-sm font-medium transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      (isActive
                        ? "text-brand font-medium"
                        : "text-slate-600 hover:text-slate-900") +
                      " inline-flex items-center gap-2 py-2"
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    {t("common.login")}
                  </NavLink>
                )}
              </nav>

              {/* Mobile menu button */}
              <button
                className={`lg:hidden xl:hidden xxl:hidden inline-flex items-center justify-center w-8 xs:w-9 sm:w-10 md:w-10 h-8 xs:h-9 sm:h-10 md:h-10 rounded-lg transition-all duration-200 ${
                  open
                    ? "bg-brand text-white hover:bg-brand/90"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
                onClick={toggleMobileMenu}
                aria-label={
                  open ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                <svg
                  className="w-4 xs:w-5 sm:w-5 md:w-5 h-4 xs:h-5 sm:h-5 md:h-5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {open ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {open && (
            <div
              id="mobile-menu"
              className={`lg:hidden xl:hidden xxl:hidden border-t animate-slide-down max-h-[calc(100vh-5rem)] overflow-y-auto ${
                isScrolled
                  ? "bg-white/98 backdrop-blur-xl shadow-lg"
                  : "bg-white/95 backdrop-blur-md"
              }`}
              role="navigation"
              aria-label="Mobile navigation menu"
            >
              <div className="mx-auto max-w-7xl px-4 xs:px-4 sm:px-6 md:px-6 py-4 xs:py-5 sm:py-6 md:py-6 space-y-1 xs:space-y-2 sm:space-y-2 md:space-y-2">
                {/* Mobile Products Section with Sub-items */}
                <div className="space-y-1">
                  <NavLink
                    onClick={() => setOpen(false)}
                    to="/#products"
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7"
                      />
                    </svg>
                    {t("common.products")}
                  </NavLink>
                  {/* Product Grouped Sub-items */}
                  <div className="ml-8 space-y-4 border-l-2 border-emerald-200 pl-4 py-2">
                    {/* Eraser Category */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">
                        Eraser
                      </p>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/drive-eraser"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">Drive Eraser</span>
                      </Link>
                      {/* Mobile Sub-variants */}
                      <div className="ml-4 pl-4 border-l border-slate-200 mt-1 mb-2 space-y-1">
                        <Link
                          onClick={() => setOpen(false)}
                          to="/products/drive-eraser"
                          className="block py-1 text-xs text-slate-500 hover:text-emerald-800"
                        >
                          • Drive Eraser (Standard)
                        </Link>
                        <Link
                          onClick={() => setOpen(false)}
                          to="/products/drive-eraser-diagnostic"
                          className="flex items-center gap-2 py-1 text-xs text-slate-500 hover:text-emerald-800"
                        >
                          • with Diagnostic & Health
                          <span className="text-[8px] font-bold text-blue-600">
                            NEW
                          </span>
                        </Link>
                      </div>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/file-eraser"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">File Eraser</span>
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/smartphone-eraser"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Smartphone Eraser</span>
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/removable-media-eraser"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <Database className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Removable Media Eraser</span>
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/lun-eraser"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <Server className="w-4 h-4" />
                        </div>
                        <span className="font-medium">LUN Eraser</span>
                      </Link>
                    </div>

                    {/* Migration Category */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">
                        Migration
                      </p>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/data-migration"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <Zap className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Data Migration</span>
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/forensic-imaging"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <Database className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Forensic Imaging</span>
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/freeze-state"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <RefreshCcw className="w-4 h-4" />
                        </div>
                        <span className="font-medium">FreezeState</span>
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/asset-reimaging"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <RefreshCcw className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Asset Reimaging</span>
                      </Link>
                    </div>

                    {/* Diagnostics Category */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">
                        Diagnostics
                      </p>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/hardware-diagnostics"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">
                          Hardware Diagnostics
                        </span>
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/smartphone-diagnostic"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <Activity className="w-4 h-4" />
                        </div>
                        <span className="font-medium">
                          Smartphone Diagnostics
                        </span>
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/hard-drive-monitor"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">SMART Diagnostics</span>
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/products/autopilot-detection"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center flex-shrink-0 text-white">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">Autopilot Detection</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <NavLink
                    onClick={() => setOpen(false)}
                    to="/solutions"
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
                    aria-label="View all data security solutions"
                  >
                    <svg
                      className="w-5 h-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    {t("solutions.title")}
                  </NavLink>
                  <div className="ml-8 space-y-1 border-l-2 border-emerald-200 pl-4">
                    {[
                      { to: "/solutions/enterprise", title: "Enterprise", desc: "Corporate Security", color: "from-brand to-emerald-600" },
                      { to: "/solutions/financial", title: "Banking & Finance", desc: "Compliance First", color: "from-emerald-500 to-teal-600" },
                      { to: "/solutions/government", title: "Government", desc: "Public Sector", color: "from-blue-500 to-indigo-600" },
                      { to: "/solutions/healthcare", title: "Healthcare", desc: "HIPAA & GDPR", color: "from-cyan-500 to-blue-600" },
                      { to: "/solutions/education", title: "Education", desc: "Academic Privacy", color: "from-emerald-400 to-teal-500" },
                      { to: "/solutions/service-providers", title: "Service Providers", desc: "MSP & MSSP", color: "from-teal-500 to-emerald-600" },
                      { to: "/solutions/itad", title: "ITAD", desc: "Asset Disposition", color: "from-cyan-400 to-blue-500" },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        onClick={() => setOpen(false)}
                        to={item.to}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-md flex items-center justify-center flex-shrink-0`}>
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="font-medium text-slate-800">{item.title}</span>
                          <p className="text-[10px] text-slate-500 font-medium">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <NavLink
                  onClick={() => setOpen(false)}
                  to="/resources"
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
                  aria-label="Access documentation and resources"
                >
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  {t("common.resources")}
                </NavLink>
                <NavLink
                  onClick={() => setOpen(false)}
                  to="/partners"
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
                  aria-label="Partner with D-Secure"
                >
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {t("common.partners")}
                </NavLink>
                <NavLink
                  onClick={() => setOpen(false)}
                  to="/data-guardian-award"
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
                  aria-label="D-Secure Data Guardian Award certification"
                >
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  Trust Certificate
                </NavLink>
                <NavLink
                  onClick={() => setOpen(false)}
                  to="/support"
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
                  aria-label="Get customer support"
                >
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  {t("nav.support")}
                </NavLink>
                {/* <NavLink
                onClick={() => setOpen(false)}
                to="/contact"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
                aria-label="Contact us for support and inquiries"
              >
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact
              </NavLink> */}

                {/* Language Switcher for Mobile */}
                {/* <div className="px-4 py-3">
                  <LanguageSwitcher variant="default" showLabel={true} />
                </div> */}

                {user ? (
                  <div className="flex flex-col gap-3 px-4 pt-6 mt-4 border-t border-slate-200/60">
                    <NavLink
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Dashboard
                    </NavLink>
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors w-full text-left"
                    >
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 px-4 pt-6 mt-4 border-t border-slate-200/60">
                    <NavLink
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors border border-slate-200"
                    >
                      Login
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="mt-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.02)_50%,transparent_70%)]"></div>

          <div className="container-app relative">
            {/* Newsletter CTA Section */}
            {/* <div className="py-12 border-b border-slate-700/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-brand/10 text-brand-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
          Newsletter
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Stay ahead of data security trends
        </h3>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          Get the latest insights on data erasure, compliance updates, and security best practices delivered to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 bg-white/10 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent backdrop-blur-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-brand to-brand-600 text-white font-semibold rounded-lg hover:from-brand-600 hover:to-brand-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Subscribe
          </button>
        </form>
        <p className="text-slate-400 text-sm mt-4">
          Join 10,000+ security professionals. Unsubscribe anytime.
        </p>
      </div>
    </div> */}

            {/* Main Footer Content */}
            <div className="py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-18 xxl:py-20 px-6 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-14 xxl:gap-16">
                {/* Company Info */}
                <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <Link
                    to="/"
                    className="flex items-center gap-2 xs:gap-3 font-bold text-white hover:opacity-80 transition-opacity mb-6"
                    aria-label="D-Secure homepage"
                  >
                    <ThemeAwareLogoFooter
                      className="h-10 xs:h-11 sm:h-12 w-auto"
                      responsive={true}
                      priority={false}
                    />
                  </Link>
                  <p className="text-slate-300 leading-relaxed mb-6 text-sm xs:text-base lg:text-base xl:text-lg">
                    Leading provider of Compliant data erasure solutions for enterprises worldwide. Secure your data lifecycle with our enterprise-grade security solutions.
                  </p>

                  {/* Trust Indicators */}
                  {/* <div className="mb-8">
            <p className="text-slate-400 text-sm mb-3">Trusted by 1000+ companies worldwide</p>
            <div className="flex items-center gap-6 opacity-60">
              <div className="text-slate-400 text-xs font-mono">ISO 27001</div>
              <div className="text-slate-400 text-xs font-mono">SOC 2</div>
              <div className="text-slate-400 text-xs font-mono">GDPR</div>
              <div className="text-slate-400 text-xs font-mono">HIPAA</div>
            </div>
          </div> */}

                  {/* Social Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href="https://twitter.com/dsecuretech"
                      className="text-slate-400 hover:text-brand transition-colors group"
                      aria-label="Follow D-Secure on Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/company/dsecuretech"
                      className="text-slate-400 hover:text-brand transition-colors group"
                      aria-label="Connect with D-Secure on LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/dsecuretech"
                      className="text-slate-400 hover:text-brand transition-colors group"
                      aria-label="View D-Secure projects on GitHub"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="https://youtube.com/dsecuretech"
                      className="text-slate-400 hover:text-brand transition-colors group"
                      aria-label="Subscribe to D-Secure YouTube channel"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="lg:col-span-9 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
                  {/* Products */}
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                      Products
                    </h4>
                    <ul className="space-y-4 text-slate-300">
                      <li>
                        <Link
                          to="/all-products"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          All Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/drive-eraser"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Drive Eraser
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/drive-eraser-diagnostic"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Drive Eraser Diagnostic
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/file-eraser"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          File Eraser
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Industries */}
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                      Industries
                    </h4>
                    <ul className="space-y-4 text-slate-300">
                      <li>
                        <Link
                          to="/#industries"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                          onClick={(e) => {
                            e.preventDefault();
                            globalThis.location.href = "/#industries";
                          }}
                        >
                          All Industries
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions/healthcare"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Healthcare
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions/financial-services"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Financial Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions/government"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Government
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions/education"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Education
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Resources */}
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                      Resources
                    </h4>
                    <ul className="space-y-4 text-slate-300">
                      <li>
                        <Link
                          to="resources/documentation?type=documentation"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Documentation
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/resources/compliance?type=compliance"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Compliance
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/blog"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions?type=case-studies"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Case Studies
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/resources?type=webinars"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Webinars
                        </Link>
                      </li> */}
                    </ul>
                  </div>

                  {/* Company */}
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                      Company
                    </h4>
                    <ul className="space-y-4 text-slate-300">
                      <li>
                        <Link
                          to="/about"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Contact
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/careers"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Careers
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to="/partners"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Partners
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/press"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Press
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700/50 py-8 px-6 sm:px-8">
              <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center text-slate-400 text-sm text-center sm:text-left">
                  <p>
                    © {new Date().getFullYear()} D-Secure Inc. All rights reserved.
                  </p>
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs">All systems operational</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-3 text-slate-400 text-sm">
                  <Link
                    to="/privacy-policy"
                    className="hover:text-brand transition-colors"
                    aria-label="Read our Privacy Policy"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/legal-policy"
                    className="hover:text-brand transition-colors"
                    aria-label="Read our Legal Policy"
                  >
                    Legal Policy
                  </Link>
                  <Link
                    to="/terms-of-service"
                    className="hover:text-brand transition-colors"
                    aria-label="Read our Terms of Service"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    to="/cookie-policy"
                    className="hover:text-brand transition-colors"
                    aria-label="Read our Cookie Policy"
                  >
                    Cookie Policy
                  </Link>
                  <Link
                    to="/security"
                    className="hover:text-brand transition-colors"
                    aria-label="View our security practices and certifications"
                  >
                    Security
                  </Link>
                  <Link
                    to="/status"
                    className="hover:text-brand transition-colors"
                    aria-label="Check system status and service availability"
                  >
                    Status
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <ScrollToTopComponent />
      </div>
    </>
  );
}
