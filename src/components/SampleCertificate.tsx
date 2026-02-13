import React from "react";

// Inline D-Secure Logo Component for PDF compatibility
const DSecureLogo: React.FC<{ width?: number; height?: number }> = ({ width = 150, height = 30 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 509 100" width={width} height={height} style={{ display: 'block' }}>
        <g fill="currentColor" transform="matrix(6.86498873813172,0,0,6.86498873813172,117.02839670478744,8.010670260985925)">
            <path d="M4.31 1.86L0.81 1.86L1.12 2.91L1.12 10.26L4.31 10.26C6.86 10.26 8.43 8.79 8.43 6.06C8.43 3.33 6.86 1.86 4.31 1.86ZM6.99 6.06C6.99 8.13 6.03 9.13 4.31 9.13L2.44 9.13L2.44 3.00L4.31 3.00C6.03 3.00 6.99 3.99 6.99 6.06ZM14.87 7.07L14.87 5.99L9.63 5.99L9.63 7.07ZM22.48 7.80C22.48 6.24 21.43 5.35 19.28 5.35C18.10 5.35 17.56 4.90 17.56 4.14C17.56 3.57 18.17 2.90 19.47 2.90C20.19 2.90 20.76 2.97 21.35 3.11L21.87 4.00L22.32 4.00L22.32 2.18C21.36 1.86 20.57 1.69 19.47 1.69C17.25 1.69 16.13 2.98 16.13 4.27C16.13 5.81 17.14 6.73 19.28 6.73C20.47 6.73 21.04 7.15 21.04 7.92C21.04 8.55 20.44 9.23 19.08 9.23C17.99 9.23 17.08 9.06 16.13 8.74L16.13 9.94C17.08 10.26 17.99 10.43 19.08 10.43C21.36 10.43 22.48 9.10 22.48 7.80ZM26.61 3.57C24.74 3.57 23.51 4.86 23.51 7C23.51 9.21 24.89 10.43 27.15 10.43C27.76 10.43 28.55 10.29 29.11 10.08L29.11 8.95C28.53 9.14 27.79 9.28 27.15 9.28C25.87 9.28 24.99 8.74 24.88 7.43L29.62 7.43C29.64 7.29 29.64 7.15 29.64 7C29.64 4.86 28.50 3.57 26.61 3.57ZM28.34 6.36L24.89 6.36C25.02 5.25 25.68 4.65 26.61 4.65C27.51 4.65 28.20 5.22 28.34 6.36ZM35.98 10.12L35.98 8.99C35.41 9.17 34.78 9.28 34.22 9.28C32.89 9.28 32.13 8.54 32.13 7C32.13 5.45 32.89 4.70 34.22 4.70C34.45 4.70 34.72 4.73 35 4.79L35.53 5.80L35.98 5.80L35.98 3.86C35.46 3.70 34.75 3.57 34.22 3.57C32.03 3.57 30.76 4.84 30.76 7C30.76 9.14 32.03 10.43 34.22 10.43C34.75 10.43 35.46 10.29 35.98 10.12ZM44.25 10.26L44.25 9.14C44.06 9.21 43.83 9.28 43.60 9.28C43.27 9.28 43.13 9.13 43.13 8.81L43.13 3.72L41.82 3.72L41.82 9.02C41.40 9.18 40.98 9.28 40.47 9.28C39.49 9.28 38.99 8.83 38.99 7.98L38.99 3.72L37.67 3.72L37.67 7.98C37.67 9.52 38.74 10.43 40.47 10.43C41.10 10.43 41.68 10.28 42.20 10.04C42.45 10.29 42.84 10.43 43.26 10.43C43.61 10.43 43.99 10.35 44.25 10.26ZM50.08 5.80L50.08 3.86C49.55 3.70 48.83 3.57 48.30 3.57C47.45 3.57 46.41 3.74 45.56 3.99L45.33 4.05L45.64 5.08L45.64 10.26L46.96 10.26L46.96 4.89C47.38 4.77 47.85 4.70 48.30 4.70C48.54 4.70 48.82 4.73 49.10 4.79L49.62 5.80ZM54.03 3.57C52.15 3.57 50.92 4.86 50.92 7C50.92 9.21 52.30 10.43 54.56 10.43C55.17 10.43 55.96 10.29 56.52 10.08L56.52 8.95C55.94 9.14 55.20 9.28 54.56 9.28C53.28 9.28 52.40 8.74 52.29 7.43L57.04 7.43C57.05 7.29 57.05 7.15 57.05 7C57.05 4.86 55.92 3.57 54.03 3.57ZM55.75 6.36L52.30 6.36C52.43 5.25 53.09 4.65 54.03 4.65C54.92 4.65 55.61 5.22 55.75 6.36Z"></path>
        </g>
        <g transform="matrix(1.05,0,0,1.05,-0.35307515263557576,-1.7062499940395384)" stroke="none" fill="#2BBBAD">
            <path d="M92.812 49.125a6.058 6.058 0 00-5.383 3.281l-27.775-4.741a10.628 10.628 0 00-.43-1.82l22.734-11.268c1.703 1.74 4.389 2.262 6.658 1.072a5.663 5.663 0 10-5.262-10.03c-2.172 1.143-3.273 3.49-2.957 5.785l-22.842 11.32a10.669 10.669 0 00-1.673-1.732l18.902-26.375c.938.109 1.906.016 2.84-.373a5.662 5.662 0 10-7.405-3.044c.317.76.788 1.403 1.353 1.935l-18.795 26.1a10.61 10.61 0 00-1.633-.45l-1.179-19.699A5.5 5.5 0 1042.375 14a5.499 5.499 0 004.066 5.305l1.161 19.416c-.691.103-1.359.267-1.999.496L24.944 12.771A6.838 6.838 0 0026.25 8.75a6.875 6.875 0 10-6.875 6.875 6.844 6.844 0 002.827-.613l20.281 25.947a10.724 10.724 0 00-2.647 3.174l-18.602-6.435c.005-.1.03-.194.03-.297a5.841 5.841 0 00-5.84-5.84 5.84 5.84 0 000 11.681c1.855 0 3.489-.882 4.558-2.229l18.715 6.473a10.775 10.775 0 00-.152 1.726c0 .078.01.153.011.231L11.63 58.19c-1-1.605-2.767-2.682-4.797-2.682a5.662 5.662 0 000 11.324c2.967 0 5.374-2.291 5.617-5.195l26.773-8.72a10.573 10.573 0 002.546 3.905L30.218 73.656a4.944 4.944 0 00-6.001 3.321 4.956 4.956 0 009.474 2.908c.449-1.464.167-2.963-.607-4.151l11.601-16.906c1.362.635 2.875 1 4.477 1 .207 0 .405-.019.609-.029l2.371 23.204a6.873 6.873 0 002.233 13.372 6.873 6.873 0 001.262-13.629L53.346 58.97a10.617 10.617 0 003.637-2.597l16.47 17.112a5.466 5.466 0 00-.827 2.89 5.5 5.5 0 105.5-5.5c-.615 0-1.205.105-1.758.292-.045-.029-.123-.015-.268.09L58.917 53.404c.301-.699.524-1.437.671-2.203l27.199 4.647a6.062 6.062 0 106.025-6.723z"></path>
        </g>
    </svg>
);

interface CertificateData {
    // Customer Details
    customerName: string;
    customerAddress: string;

    // Report Info
    reportId: string;
    erasureStatus: string;

    // Media Information
    mediaSource: string;
    mediaDestination: string;
    modelName: string;
    size: string;
    serialNumber: string;
    mediaType: string;
    manufacturer: string;
    smartStatus: string;

    // Erasure Information
    digitalIdentifier: string;
    toolUsed: string;
    erasureMethod: string;
    methodType: string;
    writePasses: string;
    verification: string;
    startTime: string;
    endTime: string;
    duration: string;
    erasureStatusDetail: string;
    extraStatus: string;

    // Validation Details
    technicianName: string;
    validatorName: string;
    organization1: string;
    organization2: string;
    date: string;
}

interface SampleCertificateProps {
    data?: CertificateData;
}

const defaultData: CertificateData = {
    customerName: "TechCorp Industries Pvt. Ltd.",
    customerAddress: "Mumbai, Maharashtra, India",
    reportId: "2451",
    erasureStatus: "Completed",
    mediaSource: "IT Department",
    mediaDestination: "Data Center",
    modelName: "SAMSUNG SSD 870 EVO 1TB",
    size: "931.51 GB",
    serialNumber: "S5H2NS0N123456",
    mediaType: "SSD",
    manufacturer: "Samsung Electronics",
    smartStatus: "PASSED",
    digitalIdentifier: "a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3",
    toolUsed: "D-Secure Drive Eraser 3.0.1.0",
    erasureMethod: "NIST 800-88 Purge",
    methodType: "Purge",
    writePasses: "NA",
    verification: "Total Verification",
    startTime: "February 5, 2026 10:30:15 IST",
    endTime: "February 5, 2026 10:52:40 IST",
    duration: "00:22:25",
    erasureStatusDetail: "Completed",
    extraStatus: "SSD Secure Erase",
    technicianName: "Rajesh Kumar",
    validatorName: "Priya Sharma",
    organization1: "TechCorp Industries",
    organization2: "D-Secure Tech",
    date: "February 5, 2026 11:00:00 IST",
};

const SampleCertificate: React.FC<SampleCertificateProps> = ({ data = defaultData }) => {
    return (
        <div
            className="w-full max-w-5xl mx-auto shadow-xl rounded-lg overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 15%, #ffffff 100%)',
                border: '2px solid #10b981'
            }}
        >
            {/* Header Section with Gradient */}
            <div
                className="px-8 py-6 flex items-center justify-between"
                style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #14b8a6 100%)'
                }}
            >
                {/* D-Secure Logo */}
                <div style={{ width: '150px', display: 'flex', alignItems: 'center', marginTop: '50px', color: 'white' }}>
                    <DSecureLogo width={150} height={30} />
                </div>

                {/* Certificate Title */}
                <h1
                    className="text-2xl font-bold text-white text-center flex-1"
                    style={{ lineHeight: '50px', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
                >
                    Certificate of Erasure
                </h1>

                {/* Empty space for balance */}
                <div style={{ width: '150px' }}></div>
            </div>

            {/* Main Content */}
            <div className="px-8 py-6">
                {/* Erasure Status & Report ID Row */}
                <div
                    className="grid grid-cols-2 gap-8 mb-6 p-4 rounded-lg"
                    style={{ background: 'rgba(16, 185, 129, 0.08)' }}
                >
                    <div>
                        <span className="font-bold text-gray-900">Erasure Status:</span>
                        <span className="ml-4 font-semibold" style={{ color: '#059669' }}>{data.erasureStatus}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-900">Report ID:</span>
                        <span className="ml-4 text-gray-700">{data.reportId}</span>
                    </div>
                </div>

                {/* Customer Details Section */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg mb-3 pb-2" style={{ color: '#059669', borderBottom: '2px solid #10b981' }}>Customer Details</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <span className="font-semibold text-gray-700">Customer Name:</span>
                            <span className="ml-4 text-gray-900">{data.customerName}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Customer Address:</span>
                            <span className="ml-4 text-gray-900">{data.customerAddress}</span>
                        </div>
                    </div>
                </div>

                {/* Media Information Section */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg mb-3 pb-2" style={{ color: '#059669', borderBottom: '2px solid #10b981' }}>Media Information</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                            <span className="font-semibold text-gray-700">Media Source:</span>
                            <span className="ml-4 text-gray-900">{data.mediaSource}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Media Destination:</span>
                            <span className="ml-4 text-gray-900">{data.mediaDestination}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Model Name:</span>
                            <span className="ml-4 text-gray-900">{data.modelName}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Size:</span>
                            <span className="ml-4 text-gray-900">{data.size}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Serial number:</span>
                            <span className="ml-4 text-gray-900">{data.serialNumber}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Media Type:</span>
                            <span className="ml-4 text-gray-900">{data.mediaType}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Manufacturer:</span>
                            <span className="ml-4 text-gray-900">{data.manufacturer}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">SMART Status:</span>
                            <span className="ml-4 font-semibold" style={{ color: '#059669' }}>{data.smartStatus}</span>
                        </div>
                    </div>
                </div>

                {/* Erasure Information Section */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg mb-3 pb-2" style={{ color: '#059669', borderBottom: '2px solid #10b981' }}>Erasure Information</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                            <span className="font-semibold text-gray-700">Digital Identifier:</span>
                            <span className="ml-4 text-gray-900 text-sm break-all">{data.digitalIdentifier}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Tool Used:</span>
                            <span className="ml-4 text-gray-900">{data.toolUsed}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Erasure Method:</span>
                            <span className="ml-4 text-gray-900">{data.erasureMethod}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Method Type:</span>
                            <span className="ml-4 text-gray-900">{data.methodType}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Write Passes:</span>
                            <span className="ml-4 text-gray-900">{data.writePasses}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Verification:</span>
                            <span className="ml-4 text-gray-900">{data.verification}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Start Time:</span>
                            <span className="ml-4 text-gray-900">{data.startTime}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">End Time:</span>
                            <span className="ml-4 text-gray-900">{data.endTime}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Duration:</span>
                            <span className="ml-4 text-gray-900">{data.duration}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Erasure Status:</span>
                            <span className="ml-4 font-semibold" style={{ color: '#059669' }}>{data.erasureStatusDetail}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Extra Status:</span>
                            <span className="ml-4 text-gray-900">{data.extraStatus}</span>
                        </div>
                    </div>
                </div>

                {/* Watermark Icon */}
                <div className="flex justify-center my-12">
                    <div style={{ opacity: 0.1 }}>
                        <svg className="w-64 h-64" fill="#10b981" viewBox="0 0 24 24">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                            <circle cx="12" cy="12" r="6" fill="white" />
                            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                        </svg>
                    </div>
                </div>

                {/* Erasure & Validation Details Section */}
                <div className="mb-8">
                    <h2 className="font-bold text-lg mb-3 pb-2" style={{ color: '#059669', borderBottom: '2px solid #10b981' }}>Erasure & Validation Details</h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                        <div>
                            <span className="font-semibold text-gray-700">Technician Name:</span>
                            <span className="ml-4 text-gray-900">{data.technicianName}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Organization:</span>
                            <span className="ml-4 text-gray-900">{data.organization1}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Validator Name:</span>
                            <span className="ml-4 text-gray-900">{data.validatorName}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Organization:</span>
                            <span className="ml-4 text-gray-900">{data.organization2}</span>
                        </div>
                    </div>
                    <p className="text-gray-700 italic text-sm mt-4">
                        I hereby state that the data erasure process has been carried out in accordance with the given specifications.
                    </p>
                </div>

                {/* Signature Section */}
                <div className="border-t-2 border-gray-300 pt-6">
                    <div className="grid grid-cols-3 gap-8 items-end mb-8">
                        <div>
                            <span className="font-semibold text-gray-700">Date:</span>
                            <span className="ml-4 text-gray-900">{data.date}</span>
                        </div>
                        <div className="text-center">
                            <div className="border-b-2 border-gray-400 pb-2 mb-2">
                                <span className="text-blue-600 italic font-serif text-xl">Sample Signature</span>
                            </div>
                            <p className="text-sm text-gray-600">Data Erasure Technician</p>
                        </div>
                        <div className="text-center">
                            <div className="border-b-2 border-gray-400 pb-2 mb-2">
                                <span className="text-blue-600 italic font-serif text-xl">Sample Signature</span>
                            </div>
                            <p className="text-sm text-gray-600">Validator</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-4 mt-6">
                    <div className="flex items-center gap-3">
                        <div style={{ width: '100px', flexShrink: 0 }}>
                            <DSecureLogo width={100} height={20} />
                        </div>
                        <p className="text-xs text-gray-600">
                            The information contained in this report is digitally protected and has been generated by the D-Secure profiling process.
                            D-Secure is an innovation from D-Secure Tech.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SampleCertificate;
