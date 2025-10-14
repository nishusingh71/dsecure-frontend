import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

interface Issue {
 id: number;
 title: string;
 description: string;
 solution: string;
 category: string;
 severity: "Low" | "Medium" | "High" | "Critical";
}

const CommonIssuesPage: React.FC = memo(() => {
 const [activeIssue, setActiveIssue] = useState<number | null>(null);
 const [selectedCategory, setSelectedCategory] = useState<string>("All");

 const issues: Issue[] = [
 {
 id: 1,
 title: "D-Secure Installation Fails on Windows",
 description: "Installation process stops with error code 1603 or similar Windows installer errors.",
 solution: "Run installer as administrator, disable antivirus temporarily, ensure .NET Framework 4.8+ is installed, and check Windows Update status.",
 category: "Installation",
 severity: "High",
 },
 {
 id: 2,
 title: "Drive Not Detected by D-Secure",
 description: "Target drive appears in system but not visible in D-Secure interface.",
 solution: "Check drive permissions, run D-Secure as administrator, verify drive is not in use by other applications, and ensure USB/SATA connections are secure.",
 category: "Hardware",
 severity: "Medium",
 },
 {
 id: 3,
 title: "Erasure Process Stops at 50%",
 description: "Data erasure operation halts midway through the process without completion.",
 solution: "Check for bad sectors using CHKDSK, ensure adequate power supply, verify drive health with SMART tools, and retry with single-pass method.",
 category: "Erasure",
 severity: "High",
 },
 {
 id: 4,
 title: "D-Secure License Activation Failed",
 description: "License key is rejected or activation server cannot be reached.",
 solution: "Verify internet connection, check firewall settings, ensure license key is correct, and contact D-Secure support for license validation.",
 category: "Licensing",
 severity: "Critical",
 },
 {
 id: 5,
 title: "Slow Erasure Performance",
 description: "Data erasure is significantly slower than expected speeds.",
 solution: "Close unnecessary applications, check drive health, use USB 3.0+ ports, disable real-time antivirus scanning, and consider single-pass method for speed.",
 category: "Performance",
 severity: "Low",
 },
 {
 id: 6,
 title: "Certificate Generation Error",
 description: "Unable to generate certificate of destruction after successful erasure.",
 solution: "Ensure adequate disk space, check write permissions in output directory, verify system date/time, and restart D-Secure service if needed.",
 category: "Reporting",
 severity: "Medium",
 },
 {
 id: 7,
 title: "BitLocker Drive Access Denied",
 description: "Cannot access BitLocker encrypted drives for erasure.",
 solution: "Unlock BitLocker first using manage-bde command, suspend BitLocker encryption, or use D-Secure cryptographic erasure method for encrypted drives.",
 category: "Encryption",
 severity: "High",
 },
 {
 id: 8,
 title: "Network Drive Erasure Fails",
 description: "Cannot perform erasure operations on network-attached storage.",
 solution: "Ensure network stability, check SMB/NFS permissions, verify sufficient bandwidth, and consider local mounting before erasure.",
 category: "Network",
 severity: "Medium",
 },
 ];

 const categories = ["All", "Installation", "Hardware", "Erasure", "Licensing", "Performance", "Reporting", "Encryption", "Network"];

 const filteredIssues = selectedCategory === "All" 
 ? issues 
 : issues.filter(issue => issue.category === selectedCategory);

 const toggleIssue = (id: number) => {
 setActiveIssue(activeIssue === id ? null : id);
 };

 const getSeverityColor = (severity: string) => {
 switch (severity) {
 case "Critical": return "bg-red-500";
 case "High": return "bg-orange-500";
 case "Medium": return "bg-yellow-500";
 case "Low": return "bg-green-500";
 default: return "bg-gray-500";
 }
 };

 return (
 <>
 <Helmet>
 <title>D-Secure Common Issues | Troubleshooting Guide</title>
 <meta name="description" content="Common D-Secure issues and solutions. Troubleshooting guide for installation, erasure, licensing, and performance problems." />
 <meta name="keywords" content="D-Secure troubleshooting, common issues, installation problems, erasure errors, support guide" />
 </Helmet>

 <div className="min-h-screen bg-slate-50">
 <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-8 sm:py-12 md:py-16 lg:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 <Reveal>
 <div className="text-center">
 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight">
 D-Secure Common{" "}
 <span className="text-emerald-600 block sm:inline">Issues</span>
 </h1>
 <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
 Troubleshooting guide for common D-Secure problems and their solutions. Find quick fixes for installation, erasure, and performance issues.
 </p>
 </div>
 </Reveal>
 </div>
 </section>

 <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 <Reveal>
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
 {filteredIssues.map((issue, index) => (
 <Reveal key={issue.id} delayMs={index * 50}>
 <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
 <button
 onClick={() => toggleIssue(issue.id)}
 className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
 >
 <div className="flex items-center gap-3 sm:gap-4 flex-1">
 <div className={`w-3 h-3 rounded-full ${getSeverityColor(issue.severity)} flex-shrink-0`}></div>
 <div className="flex-1">
 <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
 {issue.title}
 </h3>
 <p className="text-slate-600 text-xs sm:text-sm">
 {issue.description}
 </p>
 <div className="flex items-center gap-2 sm:gap-4 mt-2">
 <span className="text-xs text-slate-500">{issue.category}</span>
 <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(issue.severity)} text-white`}>
 {issue.severity}
 </span>
 </div>
 </div>
 </div>
 <svg
 className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform ${
 activeIssue === issue.id ? "rotate-180" : ""
 }`}
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
 </svg>
 </button>

 {activeIssue === issue.id && (
 <div className="px-4 sm:px-6 pb-4 sm:pb-6">
 <div className="border-t border-slate-200 pt-4">
 <h4 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Solution:</h4>
 <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
 {issue.solution}
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
 Still Need Help?
 </h2>
 <p className="text-base sm:text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
 If you can't find a solution to your problem, our D-Secure support team is here to help.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg">
 Contact D-Secure Support
 </button>
 <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg">
 Submit Support Ticket
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

export default CommonIssuesPage;