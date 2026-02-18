import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  user: any;
  logout: () => void;
  setOpen: (open: boolean) => void;
  isScrolled: boolean;
  t: any; // Passing t to avoid duplicate hook call if preferred, though useTranslation is light
}

export default function MobileMenu({ user, logout, setOpen, isScrolled, t }: MobileMenuProps) {
  return (
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
        {/* Mobile Products Section with Sub-items */}
        <div className="space-y-1">
          <NavLink
            onClick={() => setOpen(false)}
            to="/products"
            className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-lg transition-colors"
            aria-label="View all security products"
          >
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
          {/* Product Sub-items */}
          <div className="ml-8 space-y-1 border-l-2 border-emerald-200 pl-4">
            <Link
              onClick={() => setOpen(false)}
              to="/products/drive-eraser"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <div>
                <span className="font-medium">Drive Eraser</span>
                <p className="text-xs text-slate-400">
                  HDD, SSD, Mac, Server
                </p>
              </div>
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/products/file-eraser"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-medium">File Eraser</span>
                <p className="text-xs text-slate-400">
                  Files, Folders, Traces
                </p>
              </div>
            </Link>
          </div>
        </div>
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
            aria-hidden="true"
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
            aria-hidden="true"
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
            aria-hidden="true"
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
            aria-hidden="true"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          Data Guardian Award
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
            aria-hidden="true"
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
                aria-hidden="true"
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
                aria-hidden="true"
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
  );
}
