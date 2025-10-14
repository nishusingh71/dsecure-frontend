import Reveal from "@/components/Reveal";
import SearchBar from "@/components/SearchBar";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function HealthcareSolutionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const solutions = [
    {
      title: "HIPAA Compliant Data Erasure",
      description: "Secure patient data destruction meeting HIPAA requirements",
      features: ["PHI Protection", "Audit Trails", "Compliance Reports"]
    },
    {
      title: "Medical Device Sanitization", 
      description: "Specialized erasure for medical equipment and devices",
      features: ["Device Compatibility", "FDA Compliance", "Verification"]
    },
    {
      title: "EMR System Migration",
      description: "Secure data transfer and legacy system cleanup",
      features: ["Data Migration", "System Cleanup", "Zero Downtime"]
    }
  ];

  const filteredSolutions = solutions.filter(solution =>
    solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solution.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEOHead seo={getSEOForPage("healthcare-solutions")} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Healthcare Data Security
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  Solutions
                </span>
              </h1>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 mb-8">
                HIPAA-compliant data erasure solutions for healthcare organizations
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <SearchBar
                placeholder="Search healthcare solutions..."
                onSearch={setSearchTerm}
                className="max-w-md mx-auto"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSolutions.map((solution, i) => (
              <Reveal key={i} delayMs={i * 100}>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{solution.title}</h3>
                  <p className="text-slate-600 mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-600">
                        <svg className="w-4 h-4 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          
          {filteredSolutions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600">No solutions found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container-responsive text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Secure Your Healthcare Data?</h2>
            <Link to="/contact" className="btn-primary bg-white text-emerald-600 hover:bg-slate-50">
              Get Started Today
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}