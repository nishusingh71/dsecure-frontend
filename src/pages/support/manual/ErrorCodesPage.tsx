import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

interface ErrorCode {
 id: number;
 code: string;
 title: string;
 description: string;
 solution: string;
 category: string;
 severity: "Info" | "Warning" | "Error" | "Critical";
}

const ErrorCodesPage: React.FC = memo(() => {
 const [activeError, setActiveError] = useState<number | null>(null);
 const [selectedCategory, setSelectedCategory] = useState<string>("All");

 const errorCodes: ErrorCode[] = [
 {
 id: 1,
 code: "DSE-001",
 title: "Drive Access Denied",
 description: "D-Secure cannot access the target drive due to insufficient permissions.",
 solution: "Run D-Secure as administrator, check drive permissions, ensure drive is not in use by other applications, and verify hardware connections.",
 category: "Access",
 severity: "Error",
 },
 {
 id: 2,
 code: "DSE-002",
 title: "License Validation Failed",
 description: "D-Secure license key is invalid or has expired.",
 solution: "Verify license key format, check expiration date, ensure internet connectivity for validation, and contact support for license renewal.",
 category: "Licensing",
 severity: "Critical",
 },
 {
 id: 3,
 code: "DSE-003",
 title: "Insufficient Disk Space",
 description: "Not enough free space available for temporary files or logging.",
 solution: "Free up disk space on system drive, clean temporary files, check available space in D-Secure working directory, and consider changing temp location.",
 category: "Storage",
 severity: "Warning",
 },
 {
 id: 4,
 code: "DSE-004",
 title: "Hardware Communication Error",
 description: "Unable to communicate with target storage device.",
 solution: "Check cable connections, try different USB port, verify device power, test with different cable, and check device manager for hardware issues.",
 category: "Hardware",
 severity: "Error",
 },
 {
 id: 5,
 code: "DSE-005",
 title: "Erasure Pattern Verification Failed",
 description: "Written data pattern does not match expected verification pattern.",
 solution: "Check for bad sectors, verify drive health with SMART tools, retry with different erasure method, and consider physical destruction if verification continues to fail.",
 category: "Verification",
 severity: "Critical",
 },
 {
 id: 6,
 code: "DSE-006",
 title: "Network Connection Timeout",
 description: "Connection to D-Secure cloud services or remote management timed out.",
 solution: "Check internet connectivity, verify firewall settings, ensure proxy configuration is correct, and retry connection after network stabilization.",
 category: "Network",
 severity: "Warning",
 },
 {
 id: 7,
 code: "DSE-007",
 title: "Encryption Key Not Found",
 description: "Required encryption key for cryptographic erasure is missing or invalid.",
 solution: "Verify key file location, check key file permissions, ensure correct key format, and regenerate key if necessary using D-Secure key management tools.",
 category: "Encryption",
 severity: "Error",
 },
 {
 id: 8,
 code: "DSE-008",
 title: "Process Interrupted",
 description: "Erasure operation was interrupted by user or system event.",
 solution: "Restart erasure operation, ensure stable power supply, close unnecessary applications, and check system logs for interruption cause.",
 category: "Process",
 severity: "Warning",
 },
 {
 id: 9,
 code: "DSE-009",
 title: "Certificate Generation Failed",
 description: "Unable to generate certificate of destruction after successful erasure.",
 solution: "Check output directory permissions, verify system date/time settings, ensure adequate disk space, and restart D-Secure certificate service.",
 category: "Reporting",
 severity: "Error",
 },
 {
 id: 10,
 code: "DSE-010",
 title: "Database Connection Error",
 description: "Cannot connect to D-Secure database for logging or configuration.",
 solution: "Check database service status, verify connection string, ensure database permissions, and restart database service if needed.",
 category: "Database",
 severity: "Critical",
 },
 ];

 const categories = ["All", "Access", "Licensing", "Storage", "Hardware", "Verification", "Network", "Encryption", "Process", "Reporting", "Database"];

 const filteredErrors = selectedCategory === "All" 
 ? errorCodes 
 : errorCodes.filter(error => error.category === selectedCategory);

 const toggleError = (id: number) => {
 setActiveError(activeError === id ? null : id);
 };

 const getSeverityColor = (severity: string) => {
 switch (severity) {
 case "Critical": return "bg-red-500";
 case "Error": return "bg-orange-500";
 case "Warning": return "bg-yellow-500";
 case "Info": return "bg-blue-500";
 default: return "bg-gray-500";
 }
 };

 const getSeverityIcon = (severity: string) => {
 switch (severity) {
 case "Critical": return "🚨";
 case "Error": return "❌";
 case "Warning": return "⚠️";
 case "Info": return "ℹ️";
 default: return "❓";
 }
 };

 return (
 <>
 <Helmet>
 <title>D-Secure Error Codes | Complete Reference Guide</title>
 <meta name="description" content="Complete reference guide for D-Secure error codes. Find solutions for all error messages and troubleshooting steps." />
 <meta name="keywords" content="D-Secure error codes, error messages, troubleshooting, support reference, error solutions" />
 </Helmet>

 <div className="min-h-screen bg-slate-50">
 <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-8 sm:py-12 md:py-16 lg:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 <Reveal>
 <div className="text-center">
 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight">
 D-Secure Error{" "}
 <span className="text-emerald-600 block sm:inline">Codes</span>
 </h1>
 <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
 Complete reference guide for D-Secure error codes and messages. Find detailed explanations and solutions for all error conditions.
 </p>
 </div>
 </Reveal>
 </div>
 </section>

 <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 <Reveal>
 <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center mb-8">
 <div className="p-4 sm:p-6">
 <div className="text-2xl sm:text-3xl font-bold text-red-500 mb-2">
 {errorCodes.filter(e => e.severity === "Critical").length}
 </div>
 <div className="text-slate-600 text-sm sm:text-base">Critical Errors</div>
 </div>
 <div className="p-4 sm:p-6">
 <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-2">
 {errorCodes.filter(e => e.severity === "Error").length}
 </div>
 <div className="text-slate-600 text-sm sm:text-base">Errors</div>
 </div>
 <div className="p-4 sm:p-6">
 <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-2">
 {errorCodes.filter(e => e.severity === "Warning").length}
 </div>
 <div className="text-slate-600 text-sm sm:text-base">Warnings</div>
 </div>
 <div className="p-4 sm:p-6">
 <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2">
 {errorCodes.filter(e => e.severity === "Info").length}
 </div>
 <div className="text-slate-600 text-sm sm:text-base">Info Messages</div>
 </div>
 </div>
 <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
 {categories.map((category) => (
 <button
 key={category}
 onClick={() => setSelectedCategory(category)}
 className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
 selectedCategory === category
 ? "bg-emerald-500 text-white"
 : "bg-slate-100 text-slate-700 hover:bg-slate-200"
 }`}
 >
 {category}
 </button>
 ))}
 </div>
 </Reveal>
 </div>
 </section>

 <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <div className="space-y-4 sm:space-y-6">
 {filteredErrors.map((error, index) => (
 <Reveal key={error.id} delayMs={index * 50}>
 <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
 <button
 onClick={() => toggleError(error.id)}
 className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
 >
 <div className="flex items-center gap-3 sm:gap-4 flex-1">
 <div className="text-lg sm:text-xl">{getSeverityIcon(error.severity)}</div>
 <div className="flex-1">
 <div className="flex items-center gap-2 mb-1">
 <span className="font-mono text-sm sm:text-base font-bold text-emerald-600">
 {error.code}
 </span>
 <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(error.severity)} text-white`}>
 {error.severity}
 </span>
 </div>
 <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
 {error.title}
 </h3>
 <p className="text-slate-600 text-xs sm:text-sm">
 {error.description}
 </p>
 <div className="flex items-center gap-2 mt-2">
 <span className="text-xs text-slate-500">{error.category}</span>
 </div>
 </div>
 </div>
 <svg
 className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform ${
 activeError === error.id ? "rotate-180" : ""
 }`}
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
 </svg>
 </button>

 {activeError === error.id && (
 <div className="px-4 sm:px-6 pb-4 sm:pb-6">
 <div className="border-t border-slate-200 pt-4">
 <h4 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Solution:</h4>
 <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
 {error.solution}
 </p>
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
 Error Not Listed?
 </h2>
 <p className="text-base sm:text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
 If you encounter an error code not listed here, our D-Secure support team can provide immediate assistance.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg">
 Report New Error Code
 </button>
 <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg">
 Contact D-Secure Support
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

export default ErrorCodesPage;