import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  GlobeIcon,
  BuildingIcon,
  GearIcon,
  HoverIcon,
  ArrowRightIcon,
} from "@/components/FlatIcons";
import { useTranslation } from "react-i18next";

export default function IndustriesSection() {
  const { t } = useTranslation();

  return (
    <section
      id="industries"
      className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30"
    >
      <div className="container-responsive">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {t("home.industriesTitle").split(" ").slice(0, 2).join(" ")}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                {t("home.industriesTitle").split(" ").slice(2).join(" ")}
              </span>
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t("home.industriesSubtitle")}
            </p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <Reveal delayMs={200}>
            <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <HoverIcon>
                      {(filled) => (
                        <HeartIcon
                          className="w-6 h-6 text-white"
                          filled={filled}
                        />
                      )}
                    </HoverIcon>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {t("home.healthcare")}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {t("home.healthcareCompliance")}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  {t("home.healthcareDesc")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    Medical Devices
                  </span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    PHI Protection
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={250}>
            <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-green-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {t("home.financial")}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {t("home.financialCompliance")}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  {t("home.financialDesc")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Trading Systems
                  </span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Customer Data
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={300}>
            <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <HoverIcon>
                      {(filled) => (
                        <GlobeIcon
                          className="w-6 h-6 text-white"
                          filled={filled}
                        />
                      )}
                    </HoverIcon>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {t("home.government")}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {t("home.governmentCompliance")}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  {t("home.governmentDesc")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {t("home.dodStandards")}
                  </span>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {t("home.federalAgencies")}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={350}>
            <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <HoverIcon>
                      {(filled) => (
                        <BuildingIcon
                          className="w-6 h-6 text-white"
                          filled={filled}
                        />
                      )}
                    </HoverIcon>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {t("home.enterprise")}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {t("home.enterpriseCompliance")}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  {t("home.enterpriseDesc")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                    Data Centers
                  </span>
                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                    Cloud Migration
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={400}>
            <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-orange-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <HoverIcon>
                      {(filled) => (
                        <GearIcon
                          className="w-6 h-6 text-white"
                          filled={filled}
                        />
                      )}
                    </HoverIcon>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {t("home.itadServices")}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {t("home.itadCompliance")}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{t("home.itadDesc")}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                    Asset Recovery
                  </span>
                  <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                    Multi-Client
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={450}>
            <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-teal-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {t("home.serviceProviders")}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {t("home.serviceProvidersCompliance")}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  {t("home.serviceProvidersDesc")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
                    MSP Solutions
                  </span>
                  <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
                    Revenue Share
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delayMs={500}>
          <div className="text-center mt-12">
            <Link
              to="/solutions"
              className="btn-primary inline-flex items-center justify-center"
            >
              <span>{t("home.exploreAllIndustrySolutions")}</span>
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
