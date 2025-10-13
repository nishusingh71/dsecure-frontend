import React from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const ErasureVsDestructionBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-emerald-50/30 to-teal-50">
      <Helmet>
        <title>Data Erasure vs Destruction | D-Secure Blog</title>
        <meta
          name="description"
          content="Understand the key differences between data erasure, destruction, and degaussing, and when to use each method."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg rounded-xl mx-4 md:mx-12 lg:mx-24 text-center">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Data Erasure vs Data Destruction – What’s the Difference?
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            Learn which method to choose for secure data disposal based on your
            needs.
          </p>
          <img
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1000&h=400&fit=crop&crop=center"
            alt="Data Security Comparison - Digital vs Physical Destruction"
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
                <strong className="text-emerald-600">Data Erasure</strong> overwrites data with patterns to
                make it unrecoverable.
                <strong className="text-emerald-600"> Data Destruction</strong> physically damages the device
                to prevent reuse.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Degaussing disrupts magnetic storage, while SSDs require secure
                software or encryption-based methods. Choose the method that meets
                your compliance and security requirements.
              </p>
            </div>
            <div className="mt-6">
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1000&h=400&fit=crop&crop=center"
                alt="Data Storage Methods Comparison - Digital vs Physical"
                className="rounded-xl shadow-lg object-cover w-full h-64"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Example Illustration Section */}
      <section className="py-16 bg-gradient-to-br from-cyan-50 to-emerald-100">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Choosing the Right Method
            </h2>
            <p className="text-lg md:text-xl text-slate-700">
              Proper selection of erasure or destruction ensures data security
              and regulatory compliance.
            </p>
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1000&h=400&fit=crop&crop=center"
              alt="Secure Data Disposal Decision Matrix"
              className="mx-auto rounded-xl shadow-lg object-cover w-full"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default ErasureVsDestructionBlog;
