import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";

const CryptoEraseSSDGuide: React.FC = () => {
  return (
    <>
      <SEOHead seo={getSEOForPage('crypto-erase-ssd')} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-cyan-50">
        {/* HERO */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {/* Shield / lock svg */}
                  <svg
                    className="w-10 h-10 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 2l7 4v5c0 5-3.6 9.8-7 11-3.4-1.2-7-6-7-11V6l7-4z"
                    />
                    <path
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 11v2a3 3 0 006 0v-2"
                    />
                  </svg>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    CryptoEraseSSD
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto">
                  The professional guide to secure SSD data erasure — why SSDs
                  differ, what cryptographic erase does, and how to perform it
                  safely and compliantly in 2025.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Intro / Why it matters */}
        <section className="py-12">
          <div className="container-responsive">
            <Reveal>
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 border border-slate-100">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  Why Secure SSD Erasure Matters in 2025
                </h2>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  Over 70% of data breaches involve improperly sanitized storage
                  devices. SSDs behave differently than HDDs: wear-leveling,
                  over-provisioning and firmware behaviors make traditional
                  multi-pass overwrites unreliable.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    title="SSD vs HDD"
                    desc="Traditional overwrites often fail on SSDs due to wear-leveling and hidden reserved sectors."
                  />
                  <StatCard
                    title="Regulatory Risk"
                    desc="Comply with GDPR and India’s PDP (and other regional rules) by using regulated erasure and audit logs."
                  />
                  <StatCard
                    title="Preserve Lifespan"
                    desc="CryptoErase preserves drive health by avoiding unnecessary writes and finishes quickly."
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Technical explanation */}
        <section className="py-12 bg-white/50">
          <div className="container-responsive">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Reveal>
                <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Understanding SSD Technology
                  </h3>
                  <ul className="list-disc list-inside text-slate-700 space-y-2">
                    <li>
                      SSDs use flash memory cells and wear-leveling, not
                      magnetic platters.
                    </li>
                    <li>
                      Over-provisioning reserves hidden space inaccessible to
                      simple overwrites.
                    </li>
                    <li>
                      TRIM helps manage deleted blocks but does not guarantee
                      secure erasure.
                    </li>
                    <li>
                      Multi-pass overwrite standards (DoD 5220.22-M) are usually
                      ineffective for SSDs.
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    What Is Cryptographic Erase (CryptoErase)?
                  </h3>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    CryptoErase deletes the encryption keys protecting data on
                    self-encrypting drives (SEDs). The data stays physically
                    present, but without the key it is unreadable — like
                    throwing away the only key to a locked safe.
                  </p>
                  <p className="text-slate-700">
                    When supported by the drive (hardware encryption / Instant
                    Secure Erase), CryptoErase completes in seconds and
                    preserves drive health.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* When & How to use */}
        <section className="py-12">
          <div className="container-responsive">
            <Reveal>
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 border border-slate-100">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  When and How to Use CryptoEraseSSD
                </h3>

                <ol className="list-decimal list-inside text-slate-700 space-y-3 mb-4">
                  <li>
                    <strong>Requirements:</strong> Drive must have hardware
                    encryption enabled (AES 128+), and support cryptographic
                    erase.
                  </li>
                  <li>
                    <strong>Use regulated tools:</strong> Manufacturer utilities
                    (Samsung Magician, Intel Toolbox) or regulated software
                    (D-SecureDrive Eraser) provide tamper-proof regulatory documents
                    and audit logs.
                  </li>
                  <li>
                    <strong>Procedure overview:</strong> Create bootable media,
                    connect the SSD, boot to the erasure tool, perform
                    CryptoErase, and collect the regulatory document / logs for
                    compliance.
                  </li>
                </ol>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <p className="text-slate-700 text-sm">
                    Typical regulated workflows complete quickly (often under 15
                    minutes). Always verify the regulatory document/logs to prove key
                    destruction for audits.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Limitations & Comparison */}
        <section className="py-12 bg-white/50">
          <div className="container-responsive">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <Reveal>
                <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">
                    Limitations & Risks
                  </h4>
                  <ul className="list-disc list-inside text-slate-700 space-y-2">
                    <li>
                      CryptoErase fails if hardware encryption was never enabled
                      or misconfigured.
                    </li>
                    <li>
                      SSD firmware vulnerabilities can sometimes undermine
                      erasure guarantees.
                    </li>
                    <li>
                      Some pre-boot or firmware areas may remain outside
                      CryptoErase scope.
                    </li>
                    <li>
                      For highest sensitivity, combine CryptoErase with physical
                      destruction.
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">
                    CryptoErase vs Traditional Wiping
                  </h4>
                  <p className="text-slate-700 mb-3 leading-relaxed">
                    Traditional multi-pass overwrites attempt to replace sector
                    content multiple times — this is slow and unreliable on SSDs
                    due to wear-leveling and hidden sectors. CryptoErase is
                    near-instant and preserves drive lifespan.
                  </p>
                  <p className="text-slate-700">
                    If encryption is not enabled, use firmware-based sanitize or
                    vendor-specific utilities, then consider physical
                    destruction for sensitive data.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Step-by-step (D-Secureexample) */}
        <section className="py-12">
          <div className="container-responsive">
            <Reveal>
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 border border-slate-100">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  Step-by-Step: CryptoEraseSSD with BitRaser
                </h3>

                <ol className="list-decimal list-inside text-slate-700 space-y-3">
                  <li>
                    Download D-SecureISO and create bootable USB media
                    (Windows/Mac).
                  </li>
                  <li>
                    Connect the target SSD (internal or external) and boot from
                    USB.
                  </li>
                  <li>
                    Choose CryptoErase / cryptographic erase option in the tool.
                  </li>
                  <li>
                    Start the process — the tool destroys encryption keys and
                    sanitizes the drive.
                  </li>
                  <li>
                    Download tamper-proof regulatory document / logs proving successful
                    erasure for compliance.
                  </li>
                </ol>

                <p className="text-slate-700 text-sm mt-4">
                  Note: If the drive is not encrypted, D-Secureand vendor
                  utilities also offer firmware-based sanitize commands — choose
                  the correct method based on device capabilities.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Best practices */}
        <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mx-6 md:mx-12 lg:mx-24 text-white">
          <div className="container-responsive py-8">
            <Reveal>
              <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  Best Practices for SSD Data Security & Disposal
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/10 p-6 rounded-xl">
                    <h4 className="font-semibold mb-2">
                      Enable Hardware Encryption
                    </h4>
                    <p className="text-sm">
                      Always enable encryption (AES 128+). CryptoErase requires
                      a valid encryption layer.
                    </p>
                  </div>

                  <div className="bg-white/10 p-6 rounded-xl">
                    <h4 className="font-semibold mb-2">Use regulated Tools</h4>
                    <p className="text-sm">
                      Use vendor utilities or regulated software and keep
                      erasure regulatory documents for audits.
                    </p>
                  </div>

                  <div className="bg-white/10 p-6 rounded-xl">
                    <h4 className="font-semibold mb-2">
                      Firmware & Physical Measures
                    </h4>
                    <p className="text-sm">
                      Keep firmware updated; combine CryptoErase with physical
                      destruction for classified media.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Conclusion CTA */}
        <section className="py-12">
          <div className="container-responsive">
            <Reveal>
              <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow p-8 border border-slate-100">
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  Conclusion
                </h3>
                <p className="text-slate-700 mb-6">
                  Cryptographic erase is the fastest, most reliable method to
                  sanitize encrypted SSDs. Combine encryption with CryptoErase,
                  use regulated tools like BitRaser, and retain erasure
                  regulatory documents for compliance.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
                    Start CryptoErase Workflow
                  </button>
                  <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50">
                    Learn More Tools
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default CryptoEraseSSDGuide;

/* --- Helper subcomponent --- */
function StatCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-100">
      <h4 className="text-sm font-semibold text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-700">{desc}</p>
    </div>
  );
}
