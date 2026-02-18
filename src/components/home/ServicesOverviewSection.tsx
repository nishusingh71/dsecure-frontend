import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
  DatabaseIcon,
  ServerIcon,
  HoverIcon,
  ArrowRightIcon,
} from "@/components/FlatIcons";
import { useTranslation } from "react-i18next";

export default function ServicesOverviewSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container-app">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {t("home.servicesTitle").split(" ").slice(0, 1).join(" ")}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {t("home.servicesTitle").split(" ").slice(1).join(" ")}
              </span>
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("home.servicesSubtitle")}
            </p>
          </Reveal>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* D-Secure Drive Eraser */}
          <Reveal delayMs={200}>
            <div className="group relative bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-8 border border-emerald-200/60 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="absolute top-6 right-6">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <HoverIcon>
                    {(filled) => (
                      <DatabaseIcon
                        className="w-8 h-8 text-white"
                        filled={filled}
                      />
                    )}
                  </HoverIcon>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {t("home.driveEraserTitle")}
                </h3>
                <p className="text-slate-600 mb-6">
                  {t("home.driveEraserDesc")}
                </p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-slate-700">
                    {t("home.driveEraserFeature1")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-slate-700">
                    {t("home.driveEraserFeature2")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-slate-700">
                    {t("home.driveEraserFeature3")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-slate-700">
                    {t("home.driveEraserFeature4")}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-xl font-bold text-slate-900 mb-2">
                  {t("home.driveEraserPrice")}
                </div>
                <div className="text-slate-600 text-sm">
                  {t("home.driveEraserPriceNote")}
                </div>
              </div>
              <Link
                to="/products?focus=drive-eraser"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group"
              >
                <span>{t("home.viewProductDetails")}</span>
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </Reveal>

          {/* D-Secure File Eraser */}
          <Reveal delayMs={250}>
            <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 border border-blue-200/60 hover:border-blue-300 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="absolute top-6 right-6">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <HoverIcon>
                    {(filled) => (
                      <ServerIcon
                        className="w-8 h-8 text-white"
                        filled={filled}
                      />
                    )}
                  </HoverIcon>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {t("home.fileEraserTitle")}
                </h3>
                <p className="text-slate-600 mb-6">
                  {t("home.fileEraserDesc")}
                </p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-slate-700">
                    {t("home.fileEraserFeature1")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-slate-700">
                    {t("home.fileEraserFeature2")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-slate-700">
                    {t("home.fileEraserFeature3")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-slate-700">
                    {t("home.fileEraserFeature4")}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-xl font-bold text-slate-900 mb-2">
                  {t("home.fileEraserPrice")}
                </div>
                <div className="text-slate-600 text-sm">
                  {t("home.fileEraserPriceNote")}
                </div>
              </div>
              <Link
                to="/products?focus=file-eraser"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
              >
                <span>{t("home.viewProductDetails")}</span>
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delayMs={300}>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-primary inline-flex items-center justify-center"
            >
              <span>{t("home.viewAllProducts")}</span>
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
  );
}
