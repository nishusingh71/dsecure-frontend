import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";

const DataSanitizationComplianceBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50/30 to-emerald-50">
      <SEOHead seo={getSEOForPage('blog')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg rounded-xl mx-4 md:mx-12 lg:mx-24 text-center">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Data Sanitization & Compliance
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            How to securely erase data while meeting regulatory requirements.
          </p>
        </Reveal>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12 max-w-4xl space-y-8 text-slate-700">
        <Reveal>
          <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-6">
            <div className="space-y-4">
              <p className="text-slate-700 leading-relaxed">
                Organizations must follow standards like{" "}
                <strong className="text-emerald-600">NIST 800-88</strong> or <strong className="text-emerald-600">ISO/IEC 27040</strong> to
                ensure proper data sanitization. Using regulated software tools
                and maintaining audit logs are critical for compliance.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Secure erasure minimizes risk while reducing environmental impact
                by allowing devices to be safely reused or recycled.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Example Illustration Section */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-cyan-100">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Compliance Best Practices
            </h2>
            <p className="text-lg md:text-xl text-slate-700">
              Implementing proper procedures ensures regulatory compliance while
              protecting sensitive information.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default DataSanitizationComplianceBlog;






