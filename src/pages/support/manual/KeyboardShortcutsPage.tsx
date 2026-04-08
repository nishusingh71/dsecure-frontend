import React from "react";
import ManualPageTemplate from "@/components/ManualPageTemplate";
import SolutionContactSection from "@/components/SolutionContactSection";

const KeyboardShortcutsPage: React.FC = () => {
  const sections = [
    {
      id: 1,
      title: "Global Navigation",
      description: "Quickly navigate between main modules and dashboards.",
      icon: "🌐",
      subsections: [
        {
          id: 11,
          title: "Main Dashboard",
          description: "Press 'Ctrl + D' to return to the global overview.",
          url: "#dashboard",
          pageCount: 1
        },
        {
          id: 12,
          title: "Search Search",
          description: "Press '/' to focus the global intelligence search bar.",
          url: "#search",
          pageCount: 1
        }
      ]
    },
    {
      id: 2,
      title: "Erasure Operations",
      description: "Control active sanitization tasks using your keyboard.",
      icon: "⚡",
      subsections: [
        {
          id: 21,
          title: "Start/Stop Task",
          description: "Use Spacebar to toggle task execution in the workbench.",
          url: "#operations",
          pageCount: 1
        },
        {
          id: 22,
          title: "Emergency Abort",
          description: "Press 'Esc' twice to immediately halt all active processes.",
          url: "#abort",
          pageCount: 1
        }
      ]
    }
  ];

  const quickAccessItems = [
    {
      title: "Accessibility Guide",
      description: "Detailed documentation for screen readers.",
      icon: "♿",
      url: "/support/manual/accessibility",
      color: "bg-emerald-500"
    },
    {
      title: "Command Line CLI",
      description: "Advanced automation via D-Secure CLI.",
      icon: "💻",
      url: "/support/manual/cli",
      color: "bg-teal-500"
    }
  ];

  return (
    <>
      <ManualPageTemplate
        title="Keyboard Shortcuts"
        subtitle="Master the D-Secure interface with powerful navigation and command shortcuts."
        description="Maximize efficiency and speed within the D-Secure platform using our comprehensive list of hotkeys and shortcuts."
        canonicalUrl="https://dsecuretech.com/support/manual/keyboard-shortcuts"
        keywords="keyboard shortcuts, hotkeys, navigation, accessibility, D-Secure manual"
        sections={sections}
        quickAccessItems={quickAccessItems}
        ctaTitle="Need Custom Shortcuts?"
        ctaDescription="Our enterprise edition allows for custom key-mapping and CLI integration."
        ctaButtons={[
          { text: "Contact Enterprise", url: "/contact", primary: true },
          { text: "View CLI Documentation", url: "/support/manual/api-integration" }
        ]}
      />
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
           <h2 className="text-3xl font-bold text-slate-900 mb-6">Technical Overview</h2>
           <p className="text-slate-700 mb-6">
             The D-Secure Keyboard Shortcut engine is designed for high-throughput environments where speed is critical. 
             By minimizing mouse dependency, technicians can process 40% more devices per shift.
           </p>
           <p className="text-slate-700">
             Our shortcuts are compliant with WCAG 2.1 accessibility guidelines, ensuring that users with restricted mobility 
             can fully manage enterprise data sanitization tasks.
           </p>
        </div>
      </div>
      <SolutionContactSection 
        source="keyboard-shortcuts-manual"
      />
    </>
  );
};

export default KeyboardShortcutsPage;
