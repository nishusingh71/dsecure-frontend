import React from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const DataDeletionMythsBlog: React.FC = () => {
  const myths = [
    "Myth 1: Deleting files is enough → Actually, files can be recovered unless overwritten.",
    "Myth 2: One pass is never enough → For modern drives, one pass is sufficient.",
    "Myth 3: SSDs can be erased like HDDs → Special methods needed due to wear-leveling.",
    "Myth 4: Physical destruction is always required → Not always, software erasure may suffice.",
    "Myth 5: Degaussing works for SSDs → Ineffective, only works on magnetic drives.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
      <Helmet>
        <title>Top 5 Myths About Secure Data Deletion | D-Secure Blog</title>
        <meta
          name="description"
          content="Debunk common misconceptions about secure data deletion and learn what actually keeps data safe."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg rounded-xl mx-4 md:mx-12 lg:mx-24 text-center">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Top 5 Myths About Secure Data Deletion
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            Learn the truth behind common misconceptions about secure data
            erasure.
          </p>
          <img
            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1000&h=400&fit=crop&crop=center"
            alt="Data Security Myths and Facts - Computer Security Concept"
            className="mx-auto mt-6 rounded-xl shadow-md w-full max-w-4xl object-cover"
          />
        </Reveal>
      </section>

      {/* Myths List */}
      <section className="container mx-auto px-4 py-12 max-w-4xl space-y-8 text-slate-700">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myths.map((myth, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-md border border-slate-200/50 h-full flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900">
                    Myth {idx + 1}
                  </h3>
                </div>
                <div className="flex-grow">
                  <p className="text-slate-600 text-sm font-medium mb-2">
                    {myth.split("→")[0].replace(`Myth ${idx + 1}: `, "")}
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <span className="font-semibold text-emerald-600">Reality:</span> {myth.split("→")[1]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Example Illustration Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-100">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Visualizing Secure Data Deletion
            </h2>
            <p className="text-lg md:text-xl text-slate-700">
              Understanding proper erasure methods can help prevent data
              recovery risks.
            </p>
            <img
              src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=1000&h=400&fit=crop&crop=center"
              alt="Data Security Myths vs Reality - Cybersecurity Concept"
              className="mx-auto rounded-xl shadow-lg object-cover w-full"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default DataDeletionMythsBlog;
