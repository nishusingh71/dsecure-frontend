import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const PerformanceOptimizationPage: React.FC = memo(() => {
 return (
 <>
 <Helmet>
 <title>Performance Optimization | D-Secure Manual</title>
 <meta
 name="description"
 content="D-Secure performance optimization guide for maximizing erasure speed and system performance."
 />
 </Helmet>

 <div className="min-h-screen bg-slate-50">
 <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <Reveal>
 <div className="text-center">
 <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
 Performance <span className="text-emerald-600">Optimization</span>
 </h1>
 <p className="text-xl text-slate-700 max-w-3xl mx-auto">
 Optimize D-Secure erasure speed and system performance for maximum efficiency
 </p>
 </div>
 </Reveal>
 </div>
 </section>

 <section className="py-16 lg:py-20">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <div className="space-y-12">
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
 Hardware Optimization
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-emerald-600">Storage Interface</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• SATA 6Gb/s optimization</li>
 <li>• NVMe PCIe 4.0 support</li>
 <li>• USB 3.2 Gen 2 tuning</li>
 <li>• Thunderbolt 4 acceleration</li>
 </ul>
 </div>
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-teal-600">System Resources</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• CPU core allocation</li>
 <li>• Memory buffer sizing</li>
 <li>• I/O queue optimization</li>
 <li>• Power management tuning</li>
 </ul>
 </div>
 </div>
 </div>
 </Reveal>

 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
 Performance Metrics
 </h2>
 <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
 <div className="grid md:grid-cols-4 gap-6 text-center">
 <div>
 <div className="text-3xl font-bold text-emerald-600 mb-2">25GB/s</div>
 <p className="text-sm text-slate-700">Max Throughput</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-teal-600 mb-2">95%</div>
 <p className="text-sm text-slate-700">CPU Efficiency</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-cyan-600 mb-2">8TB/hr</div>
 <p className="text-sm text-slate-700">Average Speed</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-slate-600 mb-2">99.9%</div>
 <p className="text-sm text-slate-700">Reliability</p>
 </div>
 </div>
 </div>
 </div>
 </Reveal>

 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
 Optimization Strategies
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-emerald-50 rounded-lg p-6">
 <h3 className="text-lg font-semibold text-emerald-600 mb-4">Parallel Processing</h3>
 <ul className="space-y-2 text-slate-700 text-sm">
 <li>• Multi-threaded operations</li>
 <li>• Concurrent device handling</li>
 <li>• Load balancing algorithms</li>
 <li>• Resource pooling</li>
 </ul>
 </div>
 <div className="bg-teal-50 rounded-lg p-6">
 <h3 className="text-lg font-semibold text-teal-600 mb-4">Smart Scheduling</h3>
 <ul className="space-y-2 text-slate-700 text-sm">
 <li>• Priority-based queuing</li>
 <li>• Off-peak optimization</li>
 <li>• Resource-aware scheduling</li>
 <li>• Adaptive algorithms</li>
 </ul>
 </div>
 </div>
 </div>
 </Reveal>
 </div>
 </div>
 </section>
 </div>
 </>
 );
});

export default PerformanceOptimizationPage;