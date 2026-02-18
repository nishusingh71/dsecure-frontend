import Reveal from "@/components/Reveal";
import { useTranslation } from "react-i18next";

export default function KeyStatsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container-app relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("home.trustedTitle").split(" ").slice(0, 3).join(" ")}{" "}
              <span className="text-yellow-300">
                {t("home.trustedTitle").split(" ").slice(3).join(" ")}
              </span>
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              {t("home.trustedSubtitle")}
            </p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <Reveal delayMs={400}>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-slate-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">
                  {t("home.militaryGradeSecurity")}
                </h3>
              </div>
              <p className="text-white/90">{t("home.militaryGradeDesc")}</p>
            </div>
          </Reveal>
          <Reveal delayMs={450}>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-slate-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">
                  {t("home.enterpriseScale")}
                </h3>
              </div>
              <p className="text-white/90">{t("home.enterpriseScaleDesc")}</p>
            </div>
          </Reveal>
          <Reveal delayMs={500}>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-slate-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">
                  {t("home.globalCompliance")}
                </h3>
              </div>
              <p className="text-white/90">
                {t("home.globalComplianceDesc")}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
