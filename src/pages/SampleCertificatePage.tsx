import React, { useRef, useState } from "react";
import SEOHead from "../components/SEOHead";
import SampleCertificate from "../components/SampleCertificate";
// @ts-ignore
import html2pdf from "html2pdf.js";

const SampleCertificatePage: React.FC = () => {
    const certificateRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownloadPDF = async () => {
        const element = certificateRef.current;
        if (!element) return;

        setIsGenerating(true);

        // Wait for all images/SVGs to fully load
        await new Promise(resolve => setTimeout(resolve, 500));

        const opt = {
            margin: [0.3, 0.3, 0.3, 0.3],
            filename: 'D-Secure-Certificate-of-Erasure.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                logging: false,
                letterRendering: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
            },
            jsPDF: {
                unit: 'in',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { mode: 'avoid-all' }
        };

        try {
            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('PDF generation error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            <SEOHead
                seo={{
                    title: "Sample Certificate | D-Secure Data Hygiene Assurance",
                    description: "View a sample D-Secure Data Hygiene Assurance Certificate. Professional certificate design showing ecosystem coverage, compliance badges, and security verification.",
                    canonicalUrl: "https://dsecuretech.com/sample-certificate",
                    keywords: "D-Secure certificate, data hygiene assurance, sample certificate, security certification, compliance certificate",
                }}
            />

            <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #f0fdf4 0%, #ffffff 20%, #ffffff 100%)" }}>
                {/* Header Section */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Title & Download Button */}
                        <div className="text-center mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                D-Secure <span className="text-emerald-600">Certificate of Erasure</span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                                Professional certificate showing complete data erasure with NIST 800-88 compliance
                            </p>

                            {/* Download PDF Button */}
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isGenerating}
                                className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl ${isGenerating
                                        ? 'bg-gray-400 cursor-wait'
                                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    }`}
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating PDF...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download PDF
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Certificate Display - This exact content will be in PDF */}
                        <div ref={certificateRef} className="mb-16">
                            <SampleCertificate />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default SampleCertificatePage;
