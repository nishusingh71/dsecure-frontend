import React, { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "react-router-dom";
import { SUPPORTED_LANGUAGES } from "../i18n/languages";
import { Globe } from "lucide-react";
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate";

interface LanguageSwitcherProps {
  className?: string;
  showLabel?: boolean;
  variant?: "default" | "minimal";
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
  showLabel = true,
  variant = "default",
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useLocaleNavigate();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentLang = lang || i18n.language || "en";
  const currentLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) ||
    SUPPORTED_LANGUAGES[0];

  // Filter languages based on search query
  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return SUPPORTED_LANGUAGES;
    const q = searchQuery.toLowerCase();
    return SUPPORTED_LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleLanguageChange = (langCode: string) => {
    // Save user choice to localStorage
    localStorage.setItem("i18nextLng", langCode);
    i18n.changeLanguage(langCode);

    // Replace the lang segment in the current URL path
    const pathParts = location.pathname.split("/");
    if (
      pathParts.length > 1 &&
      SUPPORTED_LANGUAGES.some((l) => l.code === pathParts[1])
    ) {
      pathParts[1] = langCode;
    } else {
      pathParts.splice(1, 0, langCode);
    }
    navigate(pathParts.join("/") || "/", { replace: true });

    setIsOpen(false);
    setSearchQuery("");
    // Force re-render
    window.dispatchEvent(new Event("languageChanged"));
  };

  if (variant === "minimal") {
    return (
      <div ref={dropdownRef} className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Change language"
        >
          <Globe className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {currentLanguage.code.toUpperCase()}
          </span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 max-h-80 flex flex-col">
            {/* Search input */}
            <div className="px-3 pb-2 border-b border-slate-200 dark:border-slate-700">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="overflow-y-auto flex-1">
              {filteredLanguages.map((langItem) => (
                <button
                  key={langItem.code}
                  onClick={() => handleLanguageChange(langItem.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                    currentLang === langItem.code
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : ""
                  }`}
                >
                  <span className="text-2xl">{langItem.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      {langItem.nativeName}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {langItem.name}
                    </div>
                  </div>
                  {currentLang === langItem.code && (
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  )}
                </button>
              ))}
              {filteredLanguages.length === 0 && (
                <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 text-center">
                  No language found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-sm hover:shadow-md"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        {showLabel && (
          <>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {currentLanguage.nativeName}
            </span>
            <span className="text-2xl">{currentLanguage.flag}</span>
          </>
        )}
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 max-h-96 flex flex-col">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t("common.language", { defaultValue: "Language" })}
            </h3>
          </div>
          {/* Search input */}
          <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {filteredLanguages.map((langItem) => (
              <button
                key={langItem.code}
                onClick={() => handleLanguageChange(langItem.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                  currentLang === langItem.code
                    ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600"
                    : ""
                }`}
              >
                <span className="text-3xl">{langItem.flag}</span>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    {langItem.nativeName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {langItem.name}
                  </div>
                </div>
                {currentLang === langItem.code && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      Active
                    </span>
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                  </div>
                )}
              </button>
            ))}
            {filteredLanguages.length === 0 && (
              <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 text-center">
                No language found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
