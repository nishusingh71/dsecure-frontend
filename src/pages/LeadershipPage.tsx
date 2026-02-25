import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";

export default function LeadershipPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const leaders = [
    {
      name: "Dhruv Rai",
      role: "Founder & Chief Executive Officer",
      bio: "Cybersecurity architectures, NIST 800-88 mapping, and Zero-Trust ITAD frameworks.",
      link: "/founder",
    },
    {
      name: "Soorya",
      role: "Head of Product Design",
      bio: "Expertise in translating complex cryptographic processes into intuitive, auditable workflow governance consoles.",
      link: null,
    },
    {
      name: "Deepak",
      role: "Head of Research & Development",
      bio: "Specializes in low-level driver integration, NVMe sanitization algorithms, and PXE boot architectures.",
      link: null,
    },
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage("leadership")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20 lg:py-28">
        <div className="container-responsive">
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              D-Secure Leadership Team
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Our engineering and product teams are composed of industry
              veterans dedicated to securing the final stage of the enterprise
              data lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-slate-900 flex items-center justify-center">
                  <div className="w-24 h-24 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-slate-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {leader.name}
                  </h2>
                  <p className="text-brand font-medium mb-4">{leader.role}</p>
                  <p className="text-slate-600 leading-relaxed min-h-[80px]">
                    <strong className="text-slate-800">Expertise:</strong>{" "}
                    {leader.bio}
                  </p>

                  {leader.link && (
                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <a
                        href={leader.link}
                        className="text-brand font-semibold hover:text-brand-dark flex items-center transition-colors"
                      >
                        View Full Technical Bio
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <div className="bg-white border text-center border-slate-100 rounded-2xl p-10 max-w-4xl mx-auto shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Engineering Excellence
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                D-Secure's technical authority stems from deep roots in
                structural engineering, cryptography, and enterprise security
                platforms. We actively contribute to data hygiene research and
                publish operational guidelines on mitigating residual data
                risks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
