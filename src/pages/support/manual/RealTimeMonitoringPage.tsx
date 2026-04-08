import React from "react";
import ManualPageTemplate from "@/components/ManualPageTemplate";
import SolutionContactSection from "@/components/SolutionContactSection";

const RealTimeMonitoringPage: React.FC = () => {
  const sections = [
    {
      id: 1,
      title: "Active Job Tracking",
      description: "Monitor real-time status of local and distributed sanitization jobs.",
      icon: "📊",
      subsections: [
        {
          id: 11,
          title: "Dashboard Overview",
          description: "Understanding percentage progress and estimated completion times.",
          url: "#dashboard",
          pageCount: 1
        },
        {
          id: 12,
          title: "Multi-Node Monitoring",
          description: "Visualizing erasure tasks across the entire network in a single pane.",
          url: "#multinode",
          pageCount: 2
        }
      ]
    },
    {
      id: 2,
      title: "Alerts & Notifications",
      description: "Getting notified for critical events and completion.",
      icon: "🔔",
      subsections: [
        {
          id: 21,
          title: "Critical Error Alerts",
          description: "Configuring push and email notifications for drive failures.",
          url: "#alerts",
          pageCount: 1
        },
        {
          id: 22,
          title: "Success Summaries",
          description: "Automated daily reporting for finished sanitization cycles.",
          url: "#success",
          pageCount: 1
        }
      ]
    }
  ];

  return (
    <>
      <ManualPageTemplate
        title="Real-Time Monitoring"
        subtitle="Manage large-scale data sanitization from a unified, live-updating command center."
        description="Comprehensive guide to real-time status monitoring, dashboard navigation, and automated alerting for D-Secure enterprise operations."
        canonicalUrl="https://dsecuretech.com/support/manual/real-time-monitoring"
        keywords="real-time monitoring, live status, erasure console, centralized control, D-Secure manual"
        sections={sections}
      />
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-slate-700 leading-relaxed font-primary">
           <h2 className="text-3xl font-bold text-slate-900 mb-6 font-primary text-emerald-800">Advanced Status Management</h2>
           <p className="mb-4">
             The D-Secure Monitoring Engine provides sub-second updates from all active nodes. 
             This allows IT managers to optimize workflow and predict hardware turnover with high precision.
           </p>
           <p className="mb-4">
             In complex SAN or NAS environments, the monitor visualizes individual LUNs and drive bays to ensure 
             complete audit coverage during the sanitization lifecycle.
           </p>
        </div>
      </div>
      <SolutionContactSection 
        source="real-time-monitoring-manual"
      />
    </>
  );
};

export default RealTimeMonitoringPage;
