import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";

const OverwriteGuideBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
      <SEOHead seo={getSEOForPage('blog')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg rounded-xl mx-4 md:mx-12 lg:mx-24 text-center">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Overwrite Guide – How Many Passes Are Enough?
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            Understand the recommended number of overwrites for modern and
            legacy storage devices.
          </p>
        </Reveal>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12 max-w-4xl space-y-8 text-slate-700">
        <Reveal>
          <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-6">
            <div className="space-y-4">
              <p className="text-slate-700 leading-relaxed">
                Overwriting replaces the actual data on a storage device with
                patterns like zeros, ones, or pseudo-random bits. This ensures
                sensitive information cannot be recovered, even with advanced
                forensic techniques.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Industry standards like <strong className="text-emerald-600">NIST 800-88</strong> recommend a
                single pass for modern drives, while older standards like{" "}
                <strong className="text-emerald-600">DoD 5220.22-M</strong> suggest three passes. The Gutmann
                method uses 35 passes but is largely overkill for modern devices.
              </p>
              <p className="text-slate-700 leading-relaxed">
                In high-security environments, software overwriting should be
                combined with physical destruction for maximum protection.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Illustration Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-100">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Best Practices for Secure Overwriting
            </h2>
            <p className="text-lg md:text-xl text-slate-700">
              Follow proper overwrite techniques to ensure data confidentiality
              and regulatory compliance.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default OverwriteGuideBlog;






