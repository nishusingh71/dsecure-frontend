import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
  ShieldIcon,
  BuildingIcon,
  ClipboardIcon,
  GlobeIcon,
  LightningIcon,
  HeartIcon,
  HoverIcon,
  ArrowRightIcon,
} from "@/components/FlatIcons";
import { useTranslation } from "react-i18next";

export default function BenefitsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="why-choose"
      className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-slate-50/50 to-white"
    >
      <div className="container-responsive">
        <div className="text-center mb-12 lg:mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              {t("home.whyChooseTitle")}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {t("home.whyChooseSubtitle")}
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {[
            {
              titleKey: "home.reason1Title",
              descKey: "home.reason1Desc",
              icon: (
                <HoverIcon>
                  {(filled) => (
                    <ShieldIcon
                      className="w-8 h-8 text-white"
                      filled={filled}
                    />
                  )}
                </HoverIcon>
              ),
              bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
            },
            {
              titleKey: "home.reason3Title",
              descKey: "home.reason3Desc",
              icon: (
                <HoverIcon>
                  {(filled) => (
                    <BuildingIcon
                      className="w-8 h-8 text-white"
                      filled={filled}
                    />
                  )}
                </HoverIcon>
              ),
              bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
            },
            {
              titleKey: "home.feature3Title",
              descKey: "home.feature3Desc",
              icon: (
                <HoverIcon>
                  {(filled) => (
                    <ClipboardIcon
                      className="w-8 h-8 text-white"
                      filled={filled}
                    />
                  )}
                </HoverIcon>
              ),
              bgColor: "bg-gradient-to-br from-teal-500 to-teal-600",
            },
            {
              titleKey: "home.reason2Title",
              descKey: "home.reason2Desc",
              icon: (
                <HoverIcon>
                  {(filled) => (
                    <GlobeIcon
                      className="w-8 h-8 text-white"
                      filled={filled}
                    />
                  )}
                </HoverIcon>
              ),
              bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
            },
            {
              titleKey: "home.feature5Title",
              descKey: "home.feature5Desc",
              icon: (
                <HoverIcon>
                  {(filled) => (
                    <LightningIcon
                      className="w-8 h-8 text-white"
                      filled={filled}
                    />
                  )}
                </HoverIcon>
              ),
              bgColor: "bg-gradient-to-br from-teal-500 to-teal-600",
            },
            {
              titleKey: "home.feature6Title",
              descKey: "home.feature6Desc",
              icon: (
                <HoverIcon>
                  {(filled) => (
                    <HeartIcon
                      className="w-8 h-8 text-white"
                      filled={filled}
                    />
                  )}
                </HoverIcon>
              ),
              bgColor: "bg-gradient-to-br from-rose-500 to-rose-600",
            },
          ].map((feature, i) => (
            <Reveal key={feature.titleKey} delayMs={i * 100}>
              <div className="group card hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 ease-out h-full flex flex-col relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    feature.bgColor.includes("blue")
                      ? "from-blue-50 to-transparent"
                      : feature.bgColor.includes("emerald")
                        ? "from-emerald-50 to-transparent"
                        : feature.bgColor.includes("purple")
                          ? "from-purple-50 to-transparent"
                          : feature.bgColor.includes("orange")
                            ? "from-orange-50 to-transparent"
                            : feature.bgColor.includes("teal")
                              ? "from-teal-50 to-transparent"
                              : "from-rose-50 to-transparent"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200 will-change-transform`}
                  >
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand transition-colors duration-200">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={60}>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6 sm:p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-blue-50/50 opacity-60"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
                <Reveal delayMs={20}>
                  <div className="group">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-600 mb-2 group-hover:scale-105 transition-transform duration-300">
                      {t("home.devicesCount")}
                    </div>
                    <div className="text-slate-600 text-sm sm:text-base font-medium">
                      {t("home.devices")}
                    </div>
                  </div>
                </Reveal>
                <Reveal delayMs={30}>
                  <div className="group">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-105 transition-transform duration-300">
                      {t("home.complianceRate")}
                    </div>
                    <div className="text-slate-600 text-sm sm:text-base font-medium">
                      {t("home.compliance")}
                    </div>
                  </div>
                </Reveal>
                <Reveal delayMs={40}>
                  <div className="group">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-2 group-hover:scale-105 transition-transform duration-300">
                      {t("home.encryptionStrength")}
                    </div>
                    <div className="text-slate-600 text-sm sm:text-base font-medium">
                      {t("home.encryption")}
                    </div>
                  </div>
                </Reveal>
                <Reveal delayMs={50}>
                  <div className="group">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-600 mb-2 group-hover:scale-105 transition-transform duration-300">
                      {t("home.supportAvailability")}
                    </div>
                    <div className="text-slate-600 text-sm sm:text-base font-medium">
                      {t("home.support")}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
