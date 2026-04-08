import React from "react";
import ManualPageTemplate from "@/components/ManualPageTemplate";
import SolutionContactSection from "@/components/SolutionContactSection";

const PerformanceTroubleshootingPage: React.FC = () => {
  const sections = [
    {
      id: 1,
      title: "Throughput Optimization",
      description: "Diagnose and resolve slow data sanitization speeds.",
      icon: "🚀",
      subsections: [
        {
          id: 11,
          title: "SATA/SAS Bottlenecks",
          description: "Detect if your hardware controller is limiting I/O bandwidth.",
          url: "#throughput",
          pageCount: 3
        },
        {
          id: 12,
          title: "Multi-threading CPU Usage",
          description: "Adjust CPU affinity to prevent resource exhaustion.",
          url: "#cpu",
          pageCount: 2
        }
      ]
    },
    {
      id: 2,
      title: "Driver Compatibility",
      description: "Managing storage drivers for peak efficiency.",
      icon: "⚙️",
      subsections: [
        {
          id: 21,
          title: "Updating ACHI/NVMe Drivers",
          description: "Download the latest low-latency drivers for specialized drives.",
          url: "#drivers",
          pageCount: 2
        },
        {
          id: 22,
          title: "Host Bus Adapter Config",
          description: "Optimizing HBA settings for bulk erasure operations.",
          url: "#hba",
          pageCount: 1
        }
      ]
    }
  ];

  return (
    <>
      <ManualPageTemplate
        title="Performance Troubleshooting"
        subtitle="Achieve peak throughput and eliminate I/O bottlenecks for your data sanitization operations."
        description="Detailed guide to identifying and resolving performance issues during bulk data erasure, from driver updates to CPU management."
        canonicalUrl="https://dsecuretech.com/support/manual/performance-troubleshooting"
        keywords="performance optimization, troubleshooting, slow erasure, data throughput, D-Secure manual"
        sections={sections}
      />
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-slate-700 leading-relaxed font-primary">
           <h2 className="text-3xl font-bold text-slate-900 mb-6 underline decoration-emerald-500">I/O Performance Diagnostics</h2>
           <p className="mb-4">
             When dealing with massive data sets or multi-drive chassis, performance is key to organizational efficiency. 
             Slow erasure rates are often tracked back to SATA Rev 2.0 limitations or shared bus bandwidth.
           </p>
           <p className="mb-4 bg-emerald-50 p-6 border-l-4 border-emerald-500 rounded-r-lg font-medium text-emerald-900">
             TIP: Always use Native Command Queuing (NCQ) and AHCI mode in the BIOS for maximum SATA efficiency.
           </p>
        </div>
      </div>
      <SolutionContactSection 
        source="performance-troubleshooting-manual"
      />
    </>
  );
};

export default PerformanceTroubleshootingPage;
