import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { getFallbackImage } from '@/utils/imagePlaceholders';

const CDN_IMAGES = {
 hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
 ios: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
 android: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
};

interface ManualSection {
 id: number;
 title: string;
 description: string;
 icon: string;
 subsections: ManualSubsection[];
}

interface ManualSubsection {
 id: number;
 title: string;
 description: string;
 pageCount: number;
}

const MobileDevicesPage: React.FC = memo(() => {
 const [activeSection, setActiveSection] = useState<number | null>(null);

 const manualSections: ManualSection[] = [
 {
 id: 1,
 title: "D-Secure iOS Device Erasure",
 description: "Complete data erasure for iPhone and iPad devices",
 icon: "📱",
 subsections: [
 {
 id: 11,
 title: "iOS Erasure Methods",
 description: "Factory reset, remote wipe, and cryptographic erasure",
 pageCount: 2,
 },
 {
 id: 12,
 title: "Enterprise iOS Management",
 description: "MDM integration and bulk device erasure",
 pageCount: 2,
 },
 {
 id: 13,
 title: "iOS Security Features",
 description: "Secure Enclave, Face ID, and Touch ID considerations",
 pageCount: 1,
 },
 ],
 },
 {
 id: 2,
 title: "D-Secure Android Device Erasure",
 description: "Comprehensive Android device data erasure",
 icon: "🤖",
 subsections: [
 {
 id: 21,
 title: "Android Erasure Techniques",
 description: "Factory reset, encryption, and secure deletion",
 pageCount: 2,
 },
 {
 id: 22,
 title: "Enterprise Android Management",
 description: "Android Enterprise and device administration",
 pageCount: 2,
 },
 {
 id: 23,
 title: "Custom ROM Considerations",
 description: "Handling modified Android installations",
 pageCount: 1,
 },
 ],
 },
 {
 id: 3,
 title: "D-Secure Enterprise Mobile Management",
 description: "Large-scale mobile device erasure and management",
 icon: "🏢",
 subsections: [
 {
 id: 31,
 title: "MDM Integration",
 description: "Mobile Device Management platform integration",
 pageCount: 2,
 },
 {
 id: 32,
 title: "Bulk Device Operations",
 description: "Mass erasure and device lifecycle management",
 pageCount: 2,
 },
 {
 id: 33,
 title: "Compliance & Reporting",
 description: "Mobile device compliance and audit trails",
 pageCount: 1,
 },
 ],
 },
 ];

 const toggleSection = (id: number) => {
 setActiveSection(activeSection === id ? null : id);
 };

 const getTotalPages = (section: ManualSection) => {
 return section.subsections.reduce((total, sub) => total + sub.pageCount, 0);
 };

 return (
 <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("mobile-devices")} />
 <Helmet>
 <title>D-Secure Mobile Devices | iOS & Android Erasure Guide</title>
 <meta name="description" content="Complete guide to secure data erasure on mobile devices with D-Secure. Procedures for iOS, Android, and enterprise mobile management." />
 <meta name="keywords" content="D-Secure mobile erasure, iOS data wipe, Android secure delete, mobile device management, enterprise mobile security" />
 </Helmet>

 <div className="min-h-screen bg-slate-50">
 <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-8 sm:py-12 md:py-16 lg:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 <Reveal>
 <div className="text-center">
 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight">
 D-Secure Mobile{" "}
 <span className="text-emerald-600 block sm:inline">Devices</span>
 </h1>
 <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
 Secure Data Erasure for Mobile Devices: Complete procedures for iOS, Android, and enterprise mobile device management with D-Secure.
 </p>
 </div>
 </Reveal>
 </div>
 </section>

 <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 <Reveal>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
 <div className="p-4 sm:p-6">
 <div className="text-3xl sm:text-4xl mb-4">📱</div>
 <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-2">iOS Ready</div>
 <div className="text-slate-600 text-sm sm:text-base">iPhone & iPad support</div>
 </div>
 <div className="p-4 sm:p-6">
 <div className="text-3xl sm:text-4xl mb-4">🤖</div>
 <div className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">Android</div>
 <div className="text-slate-600 text-sm sm:text-base">All Android versions</div>
 </div>
 <div className="p-4 sm:p-6">
 <div className="text-3xl sm:text-4xl mb-4">🏢</div>
 <div className="text-xl sm:text-2xl font-bold text-cyan-600 mb-2">Enterprise</div>
 <div className="text-slate-600 text-sm sm:text-base">MDM integration</div>
 </div>
 </div>
 </Reveal>
 </div>
 </section>

 <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <div className="space-y-4 sm:space-y-6">
 {manualSections.map((section, index) => (
 <Reveal key={section.id} delayMs={index * 50}>
 <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
 <button
 onClick={() => toggleSection(section.id)}
 className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
 >
 <div className="flex items-center gap-3 sm:gap-4">
 <div className="text-lg sm:text-2xl">{section.icon}</div>
 <div>
 <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
 {section.title}
 </h3>
 <p className="text-slate-600 text-xs sm:text-sm">
 {section.description}
 </p>
 <div className="flex items-center gap-2 sm:gap-4 mt-2 text-xs text-slate-500">
 <span>{section.subsections.length} topics</span>
 <span>{getTotalPages(section)} pages</span>
 </div>
 </div>
 </div>
 <svg
 className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform ${
 activeSection === section.id ? "rotate-180" : ""
 }`}
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
 </svg>
 </button>

 {activeSection === section.id && (
 <div className="px-4 sm:px-6 pb-4 sm:pb-6">
 <div className="border-t border-slate-200 pt-4">
 <div className="grid gap-3 sm:gap-4">
 {section.subsections.map((subsection) => (
 <div
 key={subsection.id}
 className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg"
 >
 <div className="flex-1">
 <h4 className="font-medium text-slate-900 mb-1 text-sm sm:text-base">
 {subsection.title}
 </h4>
 <p className="text-xs sm:text-sm text-slate-600">
 {subsection.description}
 </p>
 </div>
 <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
 <span>{subsection.pageCount} pages</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 )}
 </div>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 to-teal-600">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 <Reveal>
 <div className="text-center text-white">
 <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
 Need D-Secure Mobile Erasure Assistance?
 </h2>
 <p className="text-base sm:text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
 Our D-Secure experts specialize in mobile device data erasure for iOS, Android, and enterprise environments.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg">
 D-Secure Mobile Services
 </button>
 <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg">
 Consult D-Secure Experts
 </button>
 </div>
 </div>
 </Reveal>
 </div>
 </section>
 </div>
 </>
 );
});

export default MobileDevicesPage;