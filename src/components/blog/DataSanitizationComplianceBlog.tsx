import React from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const DataSanitizationComplianceBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50/30 to-emerald-50">
      <Helmet>
        <title>Data Sanitization & Compliance | D-Secure Blog</title>
        <meta
          name="description"
          content="Explore regulations and standards for data sanitization and secure erasure of sensitive information."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg rounded-xl mx-4 md:mx-12 lg:mx-24 text-center">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Data Sanitization & Compliance
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            How to securely erase data while meeting regulatory requirements.
          </p>
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1000&h=400&fit=crop&crop=center"
            alt="Compliance and Data Sanitization - Legal Documents and Technology"
            className="mx-auto mt-6 rounded-xl shadow-md w-full max-w-4xl object-cover"
          />
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
            <div className="mt-6">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1000&h=400&fit=crop&crop=center"
                alt="Data Sanitization Process and Compliance Standards"
                className="rounded-xl shadow-lg object-cover w-full h-64"
              />
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
            <img
              src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1759944511/k8ejthnuseeb8flsztls.png"
              alt="Compliance Documentation and Best Practices"
              className="mx-auto rounded-xl shadow-lg object-cover w-full"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default DataSanitizationComplianceBlog;
