import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useState, useEffect, useCallback, memo } from "react";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import OptimizedImage from "@/components/OptimizedImage";
import { Helmet } from "react-helmet-async";
import ThemeAwareLogoFooter from "../components/ThemeAwareLogoFooter";
import ScrollToTop from "@/components/ScrollToTop";
import BlogPage from "@/components/BlogPage";

export default function MainLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/" />
        <title>
          D-SecureTech Compliance | Data Erasure Standards & Regulations
        </title>
        <meta
          name="description"
          content="D-SecureTech helps businesses meet global data sanitization standards like NIST, ISO 27001, GDPR, HIPAA, PCI DSS, and SOX with verifiable compliance solutions."
        />
        <meta
          name="keywords"
          content="data erasure compliance, NIST 800-88, ISO 27001, GDPR, HIPAA, SOX, PCI DSS, enterprise data destruction, B2B data security"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="min-h-dvh flex flex-col">
        <header
          className={`border-b sticky top-0 z-50 transition-all duration-300 ${
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
            <nav className="hidden lg:flex xl:flex xxl:flex items-center gap-3 lg:gap-4 xl:gap-5 xxl:gap-6 text-sm lg:text-sm xl:text-base xxl:text-base absolute left-1/2 transform -translate-x-1/2">
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
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  (isActive
                    ? "text-brand font-medium"
                    : "text-slate-600 hover:text-slate-900") +
                  " inline-flex items-center gap-2 py-2"
                }
              >
                Features
              </NavLink>
              <NavLink
                to="/solutions"
                className={({ isActive }) =>
                  (isActive
                    ? "text-brand font-medium"
                    : "text-slate-600 hover:text-slate-900") +
                  " inline-flex items-center gap-2 py-2"
                }
              >
                Solutions
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
                Resources
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
                Partners
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
                Support
              </NavLink>
            </nav>

            {/* Right side - User Authentication & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* User Authentication Navigation */}
              <nav className="hidden lg:flex xl:flex xxl:flex items-center gap-3 lg:gap-4 xl:gap-5 xxl:gap-6 text-sm lg:text-sm xl:text-base xxl:text-base">
                {user ? (
                  <>
                    <NavLink
                      to={user.role === "admin" ? "/admin" : "/dashboard"}
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
                      Login
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
            <div
              id="mobile-menu"
              className={`lg:hidden xl:hidden xxl:hidden border-t animate-slide-down ${
                isScrolled
                  ? "bg-white/98 backdrop-blur-xl shadow-lg"
                  : "bg-white/95 backdrop-blur-md"
              }`}
              role="navigation"
              aria-label="Mobile navigation menu"
            >
              <div className="mx-auto max-w-7xl px-4 xs:px-4 sm:px-6 md:px-6 py-4 xs:py-5 sm:py-6 md:py-6 space-y-1 xs:space-y-2 sm:space-y-2 md:space-y-2">
                <NavLink
                  onClick={() => setOpen(false)}
                  to="/features"
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
                  aria-label="View all security features"
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
                  Features
                </NavLink>
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
                  Solutions
                </NavLink>
                {/* <NavLink
                onClick={() => setOpen(false)}
                to="/compliance"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
                aria-label="View compliance and regulatory information"
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Compliance
              </NavLink>
              <NavLink
                onClick={() => setOpen(false)}
                to="/pricing"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
                aria-label="View pricing plans and packages"
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Pricing
              </NavLink> */}
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
                  Resources
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
                  Partners
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
                  Support
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
                {user ? (
                  <div className="flex flex-col gap-3 px-4 pt-6 mt-4 border-t border-slate-200/60">
                    <NavLink
                      to={user.role === "admin" ? "/admin" : "/dashboard"}
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
                    {/* <NavLink 
                    to="/register" 
                    onClick={()=>setOpen(false)} 
                    className="btn-primary w-full justify-center"
                  >
                    Get Started
                  </NavLink> */}
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
            <div className="py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-18 xxl:py-20">
              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-12 xl:grid-cols-12 xxl:grid-cols-12 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-12 xl:gap-14 xxl:gap-16">
                {/* Company Info */}
                <div className="sm:col-span-2 md:col-span-2 lg:col-span-4 xl:col-span-4 xxl:col-span-4">
                  <Link
                    to="/"
                    className="flex items-center gap-2 xs:gap-3 font-bold text-white hover:opacity-80 transition-opacity mb-4 xs:mb-5 sm:mb-6"
                    aria-label="D-Secure homepage"
                  >
                    <ThemeAwareLogoFooter
                      className="h-8 xs:h-9 sm:h-10 md:h-11 lg:h-12 xl:h-13 xxl:h-14 w-auto"
                      responsive={true}
                      priority={false}
                    />
                  </Link>
                  <p className="text-slate-300 leading-relaxed mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base sm:text-base md:text-base lg:text-base xl:text-lg xxl:text-lg">
                    Leading provider of Compliant data erasure solutions for
                    enterprises worldwide. Secure your data lifecycle with our
                    enterprise-grade security solutions.
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
                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {/* Services */}
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                      Features
                    </h4>
                    <ul className="space-y-4 text-slate-300">
                      <li>
                        <Link
                          to="/#features"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = "/#features";
                          }}
                        >
                          All Features
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/device-erasure"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Device Erasure
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/network-erasure"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Network Erasure
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/cloud-erasure"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Cloud Erasure
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services?type=device"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Mobile Erasure
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                      Solutions
                    </h4>
                    <ul className="space-y-4 text-slate-300">
                      <li>
                        <Link
                          to="/#industries"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = "/#industries";
                          }}
                        >
                          All Solutions
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions?type=enterprise"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Healthcare
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions?type=financial"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Financial Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions?type=government"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Government
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions?type=enterprise"
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
                          to="/resources?type=documentation"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Documentation
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/compliance"
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
                          to="/resources?type=case-studies"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Case Studies
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/resources?type=webinars"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Webinars
                        </Link>
                      </li>
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
                      {/* <li><a href="#" className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block">Careers</a></li> */}
                      {/* <li><a href="#" className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block">Partners</a></li> */}
                      {/* <li><a href="#" className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block">Press</a></li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700/50 py-8">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-6 items-center text-slate-400 text-sm">
                  <p>
                    © {new Date().getFullYear()} D-Secure Inc. All rights
                    reserved.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs">All systems operational</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-slate-400 text-sm">
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
                  {/* <Link
                  to="/security"
                  className="hover:text-brand transition-colors"
                  aria-label="View our security practices and certifications"
                >
                  Security
                </Link> */}
                  {/* <Link
                  to="/status"
                  className="hover:text-brand transition-colors"
                  aria-label="Check system status and service availability"
                >
                  Status
                </Link> */}
                </div>
              </div>
            </div>
          </div>
        </footer>
        <ScrollToTop />
      </div>
    </>
  );
}
