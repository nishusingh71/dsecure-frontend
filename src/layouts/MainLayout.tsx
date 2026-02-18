import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useState, useEffect, useCallback, memo, lazy, Suspense } from "react";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import OptimizedImage from "@/components/OptimizedImage";
import SEOHead from "@/components/SEOHead";
// [PERF-C3] Removed import of seo.ts (276KB) — inlined default SEO below
// import { getSEOForPage } from "@/utils/seo";
// [PERF-M2] Footer extracted to separate lazy-loaded component (~414 lines / 18KB removed from MainLayout)
const FooterSection = lazy(() => import("./FooterSection"));
const MobileMenu = lazy(() => import("./MobileMenu"));
// [PERF-M2] ThemeAwareLogoFooter import moved to FooterSection.tsx
// import ThemeAwareLogoFooter from "../components/ThemeAwareLogoFooter";
import ScrollToTop from "@/components/ScrollToTop";
// [PERF-C2] Dead import — BlogPage is never used in MainLayout, removed from main bundle
// import BlogPage from "@/components/BlogPage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useIdleTimer } from "@/hooks/useIdleTimer";

// [PERF-FIX] Extracted SEO config outside component to prevent re-creation on every render
const DEFAULT_SEO = {
  title:
    "D-Secure - Best Data Erasure Software | Secure Tech for Enterprise Data Wiping",
  description:
    "D-Secure is the best data erasure software trusted globally. Secure data wiping for HDD, SSD, mobile devices. NIST 800-88, GDPR, HIPAA certified. Free trial available.",
  keywords:
    "data erasure software, secure data wiping, NIST 800-88, GDPR compliance, enterprise data sanitization",
  canonicalUrl: "https://dsecuretech.com",
  ogTitle: "D-Secure Tech - Secure Data Erasure Solutions",
  ogDescription:
    "Professional data erasure and sanitization software for enterprise compliance and security.",
  ogImage: "https://dsecuretech.com/logo-white.svg",
  ogType: "website" as const,
  twitterCard: "summary_large_image" as const,
  twitterTitle: "D-Secure Tech - Data Erasure Solutions",
  twitterDescription:
    "Secure data destruction and sanitization for enterprise compliance.",
  twitterImage: "https://dsecuretech.com/logo-white.svg",
};

export default function MainLayout() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false); // Hide header when sticky section nav is visible

  const toggleMobileMenu = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // [PERF-FIX] Removed redundant authKey state — useAuth() already triggers re-renders on auth changes

  // Close products dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (productsDropdownOpen && !target.closest("[data-products-dropdown]")) {
        setProductsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [productsDropdownOpen]);

  // ? Idle Auto-Logout (15 minutes = 900,000 ms)
  // Only active when user is logged in
  useIdleTimer({
    timeout: 15 * 60 * 1000,
    onIdle: () => {
      if (user) {
        // console.log('? User idle for 15 minutes - auto logging out');
        logout();
      }
    },
    isActive: !!user,
  });

  // Listen for sticky section nav visibility to hide main header
  useEffect(() => {
    const handleStickyNavVisible = (
      event: CustomEvent<{ visible: boolean }>,
    ) => {
      setHideHeader(event.detail.visible);
    };

    window.addEventListener(
      "stickyNavVisible",
      handleStickyNavVisible as EventListener,
    );
    return () =>
      window.removeEventListener(
        "stickyNavVisible",
        handleStickyNavVisible as EventListener,
      );
  }, []);

  return (
    <>
      {/* [PERF-C3] Inlined default SEO to avoid importing 276KB seo.ts in layout */}
      {/* [PERF-FIX] Using module-level constant instead of inline object */}
      <SEOHead seo={DEFAULT_SEO} />
      <div className="min-h-dvh flex flex-col">
        {/* [A11Y] Skip navigation link for keyboard and screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-emerald-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
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
          <div className="mx-auto max-w-7xl px-4 xs:px-4 sm:px-6 md:px-6 lg:px-8 xl:px-8 xxl:px-10 h-16 xs:h-18 sm:h-20 md:h-20 lg:h-22 xl:h-24 xxl:h-24 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 xs:gap-3 font-bold text-slate-800 hover:opacity-80 transition-opacity"
              aria-label="D-Secure homepage"
            >
              <ThemeAwareLogo
                className="h-6 xs:h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 xxl:h-12 w-auto"
                responsive={true}
                priority
              />
            </Link>

            {/* Centered Navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex xl:flex xxl:flex items-center gap-3 lg:gap-4 xl:gap-5 xxl:gap-6 text-sm lg:text-sm xl:text-base xxl:text-base absolute left-1/2 transform -translate-x-1/2"
            >
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
              <div className="relative" data-products-dropdown>
                <button
                  className={`inline-flex items-center gap-2 py-2 text-slate-600 hover:text-slate-900 ${productsDropdownOpen ? "text-brand font-medium" : ""}`}
                  onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                  aria-expanded={productsDropdownOpen}
                  aria-haspopup="true"
                >
                  {t("common.products")}
                </button>

                {/* Dropdown Panel */}
                {productsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[800px] bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
                    {/* Dropdown Header */}
                    <div className="border-b border-slate-200 px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-emerald-700 border-b-2 border-emerald-500 pb-1">
                          Eraser
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Wiping Of Sensitive Data Across Storage Devices.
                      </p>
                    </div>

                    {/* Products Grid - 2 Columns (Row Layout) */}
                    <div className="p-6 grid grid-cols-2 gap-5">
                      {/* Drive Eraser */}
                      <Link
                        to="/products/drive-eraser"
                        className="flex items-start gap-3 p-4 rounded-lg hover:bg-slate-50 transition-colors group"
                        onClick={() => setProductsDropdownOpen(false)}
                      >
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
                              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors text-base">
                            Drive Eraser
                          </h4>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            Software to Erase Data From HDD, SSD, PC, Mac,
                            Chromebook & Server
                          </p>
                        </div>
                      </Link>

                      {/* File Erasure Software */}
                      <Link
                        to="/products/file-eraser"
                        className="flex items-start gap-3 p-4 rounded-lg hover:bg-slate-50 transition-colors group"
                        onClick={() => setProductsDropdownOpen(false)}
                      >
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
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors text-base">
                            File Eraser
                          </h4>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            Software to Wipe Files, Folders, Traces, Browser
                            History Etc.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <NavLink
                to="/solutions"
                className={({ isActive }) =>
                  (isActive
                    ? "text-brand font-medium"
                    : "text-slate-600 hover:text-slate-900") +
                  " inline-flex items-center gap-2 py-2"
                }
              >
                {t("solutions.title")}
              </NavLink>
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
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              {/* <LanguageSwitcher variant="minimal" showLabel={false} className="hidden lg:flex" /> */}

              {/* User Authentication Navigation */}
              <nav className="hidden lg:flex xl:flex xxl:flex items-center gap-3 lg:gap-4 xl:gap-5 xxl:gap-6 text-sm lg:text-sm xl:text-base xxl:text-base">
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
                  <>
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
                  </>
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
            <Suspense
              fallback={<div className="h-64 bg-white animate-pulse" />}
            >
              <MobileMenu
                user={user}
                logout={logout}
                setOpen={setOpen}
                isScrolled={isScrolled}
                t={t}
              />
            </Suspense>
          )}
        </header>
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        {/* [PERF-M2] Footer lazy-loaded — below the fold, no visible delay */}
        <Suspense fallback={<div className="mt-auto bg-slate-900 h-64" />}>
          <FooterSection />
        </Suspense>
        <ScrollToTop />
      </div>
    </>
  );
}
