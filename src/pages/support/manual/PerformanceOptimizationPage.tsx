import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import OptimizedImage from '@/components/OptimizedImage';
import { getFallbackImage } from '@/utils/imagePlaceholders';

// CDN Image URLs
const CDN_IMAGES = {
  hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  hardware: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  software: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  monitoring: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
};

interface OptimizationTip {
  id: number;
  title: string;
  description: string;
  impact: "Low" | "Medium" | "High" | "Critical";
  difficulty: "Easy" | "Moderate" | "Advanced" | "Expert";
  category: string;
  steps: string[];
}

const PerformanceOptimizationPage: React.FC = memo(() => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const optimizationTips: OptimizationTip[] = [
    {
      id: 1,
      title: "Enable Hardware-Accelerated Erasure",
      description: "Utilize ATA Secure Erase and NVMe Format commands for maximum performance on supported drives.",
      impact: "Critical",
      difficulty: "Easy",
      category: "Hardware",
      steps: [
        "Check drive compatibility using D-Secure hardware detection",
        "Ensure drive is not in frozen state (reboot if necessary)",
        "Enable hardware acceleration in D-Secure settings",
        "Select 'Hardware Secure Erase' method for supported drives",
        "Monitor completion - typically 10-100x faster than software methods"
      ]
    },
    {
      id: 2,
      title: "Optimize Memory Buffer Settings",
      description: "Configure optimal memory buffer sizes for different drive types and system configurations.",
      impact: "High",
      difficulty: "Moderate",
      category: "System",
      steps: [
        "Determine available system RAM (minimum 8GB recommended)",
        "Set buffer size to 25% of available RAM for single operations",
        "For multiple concurrent operations, divide buffer proportionally",
        "Use larger buffers (1-4GB) for high-capacity drives",
        "Monitor memory usage and adjust if system becomes unstable"
      ]
    },
    {
      id: 3,
      title: "Configure Parallel Processing",
      description: "Enable multi-threaded operations and concurrent device processing for enterprise environments.",
      impact: "High",
      difficulty: "Advanced",
      category: "Software",
      steps: [
        "Assess system CPU cores and available threads",
        "Enable parallel processing in D-Secure advanced settings",
        "Set maximum concurrent operations (typically CPU cores / 2)",
        "Configure thread priority to 'High' for D-Secure processes",
        "Monitor CPU usage and thermal throttling during operations"
      ]
    },
    {
      id: 4,
      title: "Optimize USB 3.0+ Performance",
      description: "Maximize USB drive erasure speeds through proper configuration and hardware selection.",
      impact: "Medium",
      difficulty: "Easy",
      category: "Hardware",
      steps: [
        "Use USB 3.0 or higher ports (blue connectors)",
        "Ensure high-quality USB cables (preferably under 3 feet)",
        "Disable USB selective suspend in Power Options",
        "Update USB controller drivers to latest versions",
        "Use powered USB hubs for multiple drive operations"
      ]
    },
    {
      id: 5,
      title: "Implement SSD-Specific Optimizations",
      description: "Apply specialized settings for solid-state drives to maximize performance and longevity.",
      impact: "High",
      difficulty: "Moderate",
      category: "Hardware",
      steps: [
        "Enable TRIM support in Windows (fsutil behavior set DisableDeleteNotify 0)",
        "Use single-pass overwrite methods for SSDs",
        "Prefer cryptographic erasure for encrypted SSDs",
        "Monitor drive temperature during intensive operations",
        "Allow thermal throttling to prevent damage"
      ]
    },
    {
      id: 6,
      title: "Configure Network-Attached Storage",
      description: "Optimize performance for network drives and remote storage systems.",
      impact: "Medium",
      difficulty: "Advanced",
      category: "Network",
      steps: [
        "Use wired Gigabit Ethernet connections (minimum)",
        "Increase network buffer sizes in D-Secure settings",
        "Configure SMB/NFS timeouts for stability",
        "Use dedicated network segments for data operations",
        "Monitor network utilization and latency"
      ]
    },
    {
      id: 7,
      title: "Disable Unnecessary Background Services",
      description: "Free up system resources by disabling non-essential services during erasure operations.",
      impact: "Medium",
      difficulty: "Easy",
      category: "System",
      steps: [
        "Temporarily disable Windows Search indexing",
        "Pause automatic Windows Updates",
        "Close unnecessary applications and browser tabs",
        "Disable real-time antivirus scanning temporarily",
        "Stop non-critical Windows services during operations"
      ]
    },
    {
      id: 8,
      title: "Optimize Power Management Settings",
      description: "Configure power settings to prevent performance throttling during long operations.",
      impact: "Medium",
      difficulty: "Easy",
      category: "System",
      steps: [
        "Set Windows power plan to 'High Performance'",
        "Disable USB selective suspend",
        "Set hard disk timeout to 'Never'",
        "Disable processor power management",
        "Use UPS for critical operations to prevent interruptions"
      ]
    },
    {
      id: 9,
      title: "Configure RAID Array Optimization",
      description: "Optimize performance for RAID configurations and enterprise storage systems.",
      impact: "High",
      difficulty: "Expert",
      category: "Hardware",
      steps: [
        "Configure RAID controller for maximum performance",
        "Disable write caching if data integrity is critical",
        "Use RAID 0 for maximum speed (non-critical data only)",
        "Optimize stripe size for workload characteristics",
        "Monitor RAID controller temperature and performance"
      ]
    },
    {
      id: 10,
      title: "Implement Thermal Management",
      description: "Prevent thermal throttling and maintain optimal operating temperatures.",
      impact: "Medium",
      difficulty: "Moderate",
      category: "Hardware",
      steps: [
        "Monitor drive temperatures using SMART tools",
        "Ensure adequate case ventilation and airflow",
        "Use external cooling for intensive operations",
        "Schedule operations during cooler periods",
        "Implement thermal throttling in D-Secure settings"
      ]
    },
    {
      id: 11,
      title: "Optimize Database Performance",
      description: "Enhance logging and audit trail performance through database optimization.",
      impact: "Medium",
      difficulty: "Advanced",
      category: "Software",
      steps: [
        "Use SSD storage for D-Secure database files",
        "Configure appropriate database buffer sizes",
        "Implement database maintenance routines",
        "Archive old audit logs to separate storage",
        "Monitor database performance metrics"
      ]
    },
    {
      id: 12,
      title: "Configure Enterprise Batch Processing",
      description: "Optimize large-scale batch operations for maximum throughput and efficiency.",
      impact: "Critical",
      difficulty: "Expert",
      category: "Software",
      steps: [
        "Implement intelligent queue management",
        "Configure load balancing across multiple agents",
        "Use priority-based scheduling for critical operations",
        "Implement resource pooling and sharing",
        "Monitor and adjust concurrency limits dynamically"
      ]
    }
  ];

  const categories = ["All", "Hardware", "Software", "System", "Network"];

  const filteredTips = optimizationTips.filter(tip => {
    const matchesCategory = activeCategory === "All" || tip.category === activeCategory;
    const matchesSearch = !searchQuery || 
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-50";
      case "Moderate": return "text-yellow-600 bg-yellow-50";
      case "Advanced": return "text-orange-600 bg-orange-50";
      case "Expert": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://D-Securetech.com/support/manual/performance-optimization" />
        <title>Performance Optimization | D-Secure Speed & Efficiency Guide</title>
        <meta name="description" content="Comprehensive guide to optimizing D-Secure performance. Maximize erasure speed, system efficiency, and throughput with expert optimization techniques." />
        <meta name="keywords" content="D-Secure performance, erasure speed optimization, system tuning, hardware acceleration, throughput optimization" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <Link
                    to="/support"
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-3 md:mb-4 transition-colors text-sm sm:text-base"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Support
                  </Link>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight">
                    Performance{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block sm:inline">Optimization</span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Maximize D-Secure erasure speed and system efficiency with expert optimization techniques, hardware acceleration, and advanced configuration strategies.
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search optimization techniques..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-sm sm:text-base"
                      />
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-6xl mx-auto">
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
                  <OptimizedImage
                    src={CDN_IMAGES.hero}
                    alt="D-Secure Performance Optimization Dashboard"
                    fallback={getFallbackImage('technology')}
                    className="w-full h-full object-cover"
                    width={1600}
                    height={900}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 md:p-8 text-white">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        Maximum Performance
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
                        Achieve up to 25GB/s throughput with hardware acceleration and advanced optimization techniques
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Performance Benchmarks
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Achievable performance metrics with proper optimization
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
              <Reveal delayMs={100}>
                <div className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                    25GB/s
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">Max Throughput</div>
                  <div className="text-xs text-slate-500 mt-1">NVMe PCIe 4.0</div>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-600 mb-2">
                    95%
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">CPU Efficiency</div>
                  <div className="text-xs text-slate-500 mt-1">Multi-threaded</div>
                </div>
              </Reveal>
              <Reveal delayMs={300}>
                <div className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-600 mb-2">
                    8TB/hr
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">Average Speed</div>
                  <div className="text-xs text-slate-500 mt-1">Enterprise SSD</div>
                </div>
              </Reveal>
              <Reveal delayMs={400}>
                <div className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                    99.9%
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">Reliability</div>
                  <div className="text-xs text-slate-500 mt-1">Enterprise grade</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                      activeCategory === category
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

        {/* Optimization Tips */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {filteredTips.map((tip, index) => (
                <Reveal key={tip.id} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-slate-200 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-1 rounded ${getImpactColor(tip.impact)} text-white font-medium`}>
                            {tip.impact} Impact
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(tip.difficulty)} font-medium`}>
                            {tip.difficulty}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                          {tip.title}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base mb-4">
                          {tip.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-900 text-sm sm:text-base flex items-center">
                        <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Implementation Steps:
                      </h4>
                      <div className="space-y-2">
                        {tip.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start">
                            <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                              {stepIndex + 1}
                            </div>
                            <div className="text-slate-700 text-sm flex-1">
                              {step}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Category: {tip.category}</span>
                        <span>Difficulty: {tip.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Hardware Recommendations */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Hardware Recommendations
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Optimal hardware configurations for different performance tiers
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <Reveal delayMs={100}>
                <div className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Standard Performance</h3>
                    <p className="text-slate-600 text-sm">Up to 2GB/s throughput</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">CPU:</span>
                      <span className="font-medium">Intel i5 / AMD Ryzen 5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">RAM:</span>
                      <span className="font-medium">8GB DDR4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Storage:</span>
                      <span className="font-medium">SATA SSD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Interface:</span>
                      <span className="font-medium">USB 3.0+</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="bg-emerald-50 rounded-xl p-6 sm:p-8 border-2 border-emerald-200">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">High Performance</h3>
                    <p className="text-slate-600 text-sm">Up to 10GB/s throughput</p>
                    <div className="inline-block bg-emerald-500 text-white text-xs px-2 py-1 rounded mt-2">
                      Recommended
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">CPU:</span>
                      <span className="font-medium">Intel i7 / AMD Ryzen 7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">RAM:</span>
                      <span className="font-medium">16GB DDR4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Storage:</span>
                      <span className="font-medium">NVMe PCIe 3.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Interface:</span>
                      <span className="font-medium">USB 3.2 / Thunderbolt</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={300}>
                <div className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise Performance</h3>
                    <p className="text-slate-600 text-sm">Up to 25GB/s throughput</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">CPU:</span>
                      <span className="font-medium">Intel i9 / AMD Ryzen 9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">RAM:</span>
                      <span className="font-medium">32GB+ DDR4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Storage:</span>
                      <span className="font-medium">NVMe PCIe 4.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Interface:</span>
                      <span className="font-medium">Thunderbolt 4</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Monitoring Tools */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Performance Monitoring Tools
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Essential tools for monitoring and optimizing D-Secure performance
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  name: "Task Manager",
                  description: "Monitor CPU, memory, and disk usage",
                  icon: "📊",
                  platform: "Windows"
                },
                {
                  name: "Resource Monitor",
                  description: "Detailed system resource analysis",
                  icon: "🔍",
                  platform: "Windows"
                },
                {
                  name: "CrystalDiskInfo",
                  description: "Drive health and temperature monitoring",
                  icon: "💾",
                  platform: "Cross-platform"
                },
                {
                  name: "HWiNFO64",
                  description: "Comprehensive hardware monitoring",
                  icon: "🖥️",
                  platform: "Windows"
                }
              ].map((tool, index) => (
                <Reveal key={tool.name} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-slate-200">
                    <div className="text-3xl sm:text-4xl mb-3">{tool.icon}</div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">
                      {tool.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mb-2">
                      {tool.description}
                    </p>
                    <div className="text-xs text-emerald-600 font-medium">
                      {tool.platform}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  Need Performance Optimization Help?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Our performance experts can help you achieve maximum throughput and efficiency for your specific hardware configuration and use case.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/support/contact" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg inline-flex items-center gap-2 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Get Performance Consultation
                  </Link>
                  <a href="mailto:performance@D-Securetech.com" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg inline-flex items-center gap-2 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Performance Team
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default PerformanceOptimizationPage;