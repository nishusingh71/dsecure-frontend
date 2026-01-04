import React, { useState, memo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProductIcon } from "@/utils/productIcons";

const DownloadPage: React.FC = memo(() => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState("drive-eraser");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Read product from URL on component mount
    useEffect(() => {
        const productParam = searchParams.get("product");
        if (productParam && (productParam === "drive-eraser" || productParam === "file-eraser")) {
            setSelectedProduct(productParam);
        }
    }, [searchParams]);

    // Handle product tab change and update URL
    const handleProductChange = (productId: string) => {
        setSelectedProduct(productId);
        navigate(`/download?product=${productId}`, { replace: true });
    };

    // Product categories
    const products = [
        {
            id: "drive-eraser",
            name: "Drive Eraser",
            subtitle: "Erase HDDs, SSDs in PCs, Mac & Servers",
            description: "Complete Hard Drive & SSD Erasure with Enterprise-Grade Security Standards",
            // version: "V1.0.0.0",
        },
        {
            id: "file-eraser",
            name: "File Eraser",
            subtitle: "Erase Files, Folders & Volumes",
            description: "Secure File, Folder & Application Trace Elimination",
            // version: "V1.0.0.0",
        },
    ];

    // Download links for different OS
    const downloadLinks = {
        "drive-eraser": {
            windowsAmd: {
                url: "#", // Replace with actual download URL
                filename: "D-SecureDriveEraser-x64-Setup.exe",
                size: "45 MB",
                arch: "AMD/Intel (x64)",
            },
            windowsArm: {
                url: "#", // Replace with actual download URL
                filename: "D-SecureDriveEraser-ARM64-Setup.exe",
                size: "42 MB",
                arch: "ARM64",
            },
            macos: {
                url: "#", // Replace with actual download URL
                filename: "D-SecureDriveEraser.dmg",
                size: "52 MB",
                arch: "Intel & Apple Silicon",
            },
            linux: {
                url: "#", // Replace with actual download URL
                filename: "d-secure-drive-eraser.deb",
                size: "38 MB",
                arch: "64-bit (Ubuntu/Debian)",
            },
        },
        "file-eraser": {
            windows: {
                url: "#", // Replace with actual download URL
                filename: "D-SecureFileEraser-Setup.exe",
                size: "32 MB",
                arch: "64-bit",
            },
            macos: {
                url: "#", // Replace with actual download URL
                filename: "D-SecureFileEraser.dmg",
                size: "38 MB",
                arch: "Intel & Apple Silicon",
            },
            linux: {
                url: "#", // Replace with actual download URL
                filename: "d-secure-file-eraser.deb",
                size: "28 MB",
                arch: "64-bit (Ubuntu/Debian)",
            },
        },
    };

    const getCurrentProduct = () => products.find(p => p.id === selectedProduct) || products[0];
    const getCurrentDownloads = (): any => downloadLinks[selectedProduct as keyof typeof downloadLinks];

    // OS Icons
    const WindowsIcon = () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 3.449L9.75 2.1v9.45H0V3.449zm10.949-1.55L24 0v11.4H10.949V1.9zM0 12.6h9.75v9.45L0 20.7v-8.1zm10.949-.05H24V24l-13.051-1.95V12.55z" />
        </svg>
    );

    const MacIcon = () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
    );

    const LinuxIcon = () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.503 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.89-.39 1.821-.364 2.781C4.76 17.547 5.1 18.5 5.63 19.3c.53.83 1.252 1.5 2.11 2.01 1.71 1.05 3.89 1.38 6.27 1.38 2.38 0 4.55-.33 6.27-1.38.858-.51 1.58-1.18 2.11-2.01.53-.8.87-1.753.907-2.66.026-.96-.086-1.89-.364-2.78-.589-1.77-1.831-3.47-2.716-4.52-.75-1.07-.974-1.93-1.05-3.02-.065-1.49 1.056-5.965-3.17-6.298A3.482 3.482 0 0 0 12.503 0z" />
        </svg>
    );

    const handleDownload = (os: string) => {
        const downloads = getCurrentDownloads();
        const osDownload = downloads[os as keyof typeof downloads];
        if (osDownload && osDownload.url !== "#") {
            window.open(osDownload.url, "_blank");
        } else {
            alert("Download link coming soon!");
        }
    };

    return (
        <>
            <Helmet>
                <title>Download - D-Secure Data Erasure Software | Windows, macOS, Linux</title>
                <meta
                    name="description"
                    content="Download D-Secure data erasure software for Windows, macOS, and Linux. Secure, NIST compliant data wiping for enterprise and personal use."
                />
                <meta
                    name="keywords"
                    content="download data erasure software, secure delete Windows, Mac data wipe, Linux disk eraser"
                />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                <div className="container mx-auto px-4 xs:px-6 sm:px-6 md:px-8 py-8 xs:py-10 sm:py-12 md:py-12 max-w-7xl">
                    {/* Header */}
                    <div className="text-center mb-12 xs:mb-14 sm:mb-16 md:mb-16">
                        <div className="inline-flex items-center bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 xs:px-6 sm:px-6 py-2 rounded-full text-xs xs:text-sm sm:text-sm font-semibold mb-4 xs:mb-6 sm:mb-6 shadow-lg">
                            FREE DOWNLOAD
                        </div>
                        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 xs:mb-6 sm:mb-6 leading-tight px-2">
                            Download{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                                D-Secure
                            </span>{" "}
                            Software
                        </h1>
                        <p className="text-base xs:text-lg sm:text-xl md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                            Choose your operating system and download our enterprise-grade data erasure software.
                            Works on Windows, macOS, and Linux.
                        </p>
                    </div>

                    {/* Custom Installer Note */}
                    <div className="max-w-3xl mx-auto mb-8 xs:mb-10 sm:mb-12">
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
                            <div className="flex items-start justify-center">
                                <span className="text-blue-500 text-xl font-bold mr-2">*</span>
                                <p className="text-sm text-blue-900 font-medium pt-0.5">
                                    For custom installer setup, please contact the support team.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product Selection */}
                    <div className="flex justify-center mb-8 xs:mb-10 sm:mb-12 md:mb-12">
                        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 xs:gap-4 sm:gap-4 max-w-2xl w-full px-4 xs:px-0 sm:px-0">
                            {products.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => handleProductChange(product.id)}
                                    className={`p-4 xs:p-5 sm:p-6 rounded-xl text-left transition-all duration-300 border-2 ${selectedProduct === product.id
                                        ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white border-teal-500 shadow-xl transform scale-105"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:shadow-lg hover:scale-102"
                                        }`}
                                >
                                    <h3 className="font-semibold text-xs xs:text-sm sm:text-sm mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs xs:text-xs sm:text-xs opacity-90">{product.subtitle}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 xs:p-8 sm:p-10 mb-8 max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                            <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl">
                                <img
                                    src={getProductIcon(selectedProduct, 64)}
                                    alt={getCurrentProduct().name}
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-2">
                                    D-Secure {getCurrentProduct().name}
                                </h2>
                                <p className="text-gray-600 mb-1">{getCurrentProduct().description}</p>
                                {/* <p className="text-sm text-teal-600 font-medium">Version: {getCurrentProduct().version}</p> */}
                            </div>
                        </div>

                        {/* Download Buttons */}
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                            {/* Windows with Dropdown (for File Eraser) */}
                            {selectedProduct === 'drive-eraser' ? (
                                <div className="relative">
                                    <button
                                        onClick={() => handleDownload("windowsAmd")}
                                        className="w-full flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="text-blue-600 mb-3">
                                            <WindowsIcon />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-1">Windows</h3>
                                        <p className="text-xs text-gray-500 mb-3">AMD/Intel & ARM64</p>
                                        <div className="flex items-center gap-2 text-blue-600 font-semibold relative">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenDropdown(openDropdown === "windows-drive" ? null : "windows-drive");
                                                }}
                                                className="ml-2 p-1 hover:bg-blue-200 rounded transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {openDropdown === "windows-drive" && (
                                        <div className="absolute top-full left-0 right-0 mt-2 z-10">
                                            <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden">
                                                <button
                                                    onClick={() => { handleDownload("windowsAmd"); setOpenDropdown(null); }}
                                                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">AMD/Intel (x64)</p>
                                                        <p className="text-xs text-gray-500">For standard PCs</p>
                                                    </div>
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => { handleDownload("windowsArm"); setOpenDropdown(null); }}
                                                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">ARM64</p>
                                                        <p className="text-xs text-gray-500">For Surface Pro X, Copilot+ PCs</p>
                                                    </div>
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => handleDownload("windows")}
                                        className="w-full flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="text-blue-600 mb-3">
                                            <WindowsIcon />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-1">Windows</h3>
                                        <p className="text-xs text-gray-500 mb-3">x64 & ARM64</p>
                                        <div className="flex items-center gap-2 text-blue-600 font-semibold relative">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenDropdown(openDropdown === "windows" ? null : "windows");
                                                }}
                                                className="ml-2 p-1 hover:bg-blue-200 rounded transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {openDropdown === "windows" && (
                                        <div className="absolute top-full left-0 right-0 mt-2 z-10">
                                            <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden">
                                                <button
                                                    onClick={() => { handleDownload("windows"); setOpenDropdown(null); }}
                                                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">x64 (Intel/AMD)</p>
                                                        <p className="text-xs text-gray-500">For standard PCs</p>
                                                    </div>
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => { handleDownload("windows"); setOpenDropdown(null); }}
                                                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">ARM64</p>
                                                        <p className="text-xs text-gray-500">For Surface Pro X, Copilot+ PCs</p>
                                                    </div>
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}


                            {/* macOS with Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => handleDownload("macos")}
                                    className="w-full flex flex-col items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className="text-gray-700 mb-3">
                                        <MacIcon />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">macOS</h3>
                                    <p className="text-xs text-gray-500 mb-3">Intel & Apple Silicon</p>
                                    <div className="flex items-center gap-2 text-gray-700 font-semibold relative">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenDropdown(openDropdown === "macos" ? null : "macos");
                                            }}
                                            className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {openDropdown === "macos" && (
                                    <div className="absolute top-full left-0 right-0 mt-2 z-10">
                                        <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden">
                                            <button
                                                onClick={() => { handleDownload("macos"); setOpenDropdown(null); }}
                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 flex items-center justify-between"
                                            >
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">Intel Chip</p>
                                                    <p className="text-xs text-gray-500">For Intel-based Macs</p>
                                                </div>
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => { handleDownload("macos"); setOpenDropdown(null); }}
                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                                            >
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">Apple Silicon</p>
                                                    <p className="text-xs text-gray-500">For M1, M2, M3 Macs</p>
                                                </div>
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Linux with Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => handleDownload("linux")}
                                    className="w-full flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className="text-orange-600 mb-3">
                                        <LinuxIcon />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">Linux</h3>
                                    <p className="text-xs text-gray-500 mb-3">DEB & RPM</p>
                                    <div className="flex items-center gap-2 text-orange-600 font-semibold relative">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenDropdown(openDropdown === "linux" ? null : "linux");
                                            }}
                                            className="ml-2 p-1 hover:bg-orange-200 rounded transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {openDropdown === "linux" && (
                                    <div className="absolute top-full left-0 right-0 mt-2 z-10">
                                        <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden">
                                            <button
                                                onClick={() => { handleDownload("linux"); setOpenDropdown(null); }}
                                                className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors border-b border-gray-100 flex items-center justify-between"
                                            >
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">.DEB Package</p>
                                                    <p className="text-xs text-gray-500">For Ubuntu, Debian, Mint</p>
                                                </div>
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => { handleDownload("linux"); setOpenDropdown(null); }}
                                                className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center justify-between"
                                            >
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">.RPM Package</p>
                                                    <p className="text-xs text-gray-500">For Fedora, RHEL, CentOS</p>
                                                </div>
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* System Requirements */}
                    {/* <div className="bg-white rounded-2xl shadow-xl p-6 xs:p-8 sm:p-10 max-w-4xl mx-auto mb-8">
                        <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-6 text-center">
                            System Requirements
                        </h2>
                        <div className={`grid gap-6 ${selectedProduct === 'drive-eraser' ? 'grid-cols-2 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
                            {/* Windows x64 *\/}
                            <div className="text-center p-4 bg-blue-50 rounded-xl">
                                <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <WindowsIcon />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Windows {selectedProduct === 'drive-eraser' ? '(x64)' : ''}</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>Windows 10/11 (64-bit)</li>
                                    <li>Windows Server 2016+</li>
                                    <li>4 GB RAM minimum</li>
                                    <li>500 MB disk space</li>
                                </ul>
                            </div>

                            {/* Windows ARM - Only for Drive Eraser *\/}
                            {selectedProduct === 'drive-eraser' && (
                                <div className="text-center p-4 bg-purple-50 rounded-xl">
                                    <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                        <WindowsIcon />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Windows (ARM64)</h3>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>Windows 11 ARM</li>
                                        <li>Surface Pro X / Copilot+ PCs</li>
                                        <li>4 GB RAM minimum</li>
                                        <li>500 MB disk space</li>
                                    </ul>
                                </div>
                            )}

                            {/* macOS *\/}
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
                                    <MacIcon />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">macOS</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>macOS 11.0 Big Sur+</li>
                                    <li>Intel & Apple Silicon</li>
                                    <li>4 GB RAM minimum</li>
                                    <li>500 MB disk space</li>
                                </ul>
                            </div>

                            {/* Linux *\/}
                            <div className="text-center p-4 bg-orange-50 rounded-xl">
                                <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                    <LinuxIcon />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Linux</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>Ubuntu 20.04+ / Debian 11+</li>
                                    <li>CentOS 8+ / RHEL 8+</li>
                                    <li>4 GB RAM minimum</li>
                                    <li>500 MB disk space</li>
                                </ul>
                            </div>
                        </div>
                    </div> */}


                    {/* Features Section */}
                    {/* <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-xl p-6 xs:p-8 sm:p-10 max-w-4xl mx-auto text-white">
                        <h2 className="text-xl xs:text-2xl font-bold mb-6 text-center">
                            Why Choose D-Secure?
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { title: "NIST Compliant", desc: "Meets NIST 800-88 standards" },
                                { title: "DoD regulated", desc: "DoD 5220.22-M compliant" },
                                { title: "Enterprise Ready", desc: "Scalable for large organizations" },
                                { title: "Audit Reports", desc: "Detailed compliance regulatory documents" },
                                { title: "24/7 Support", desc: "Dedicated technical assistance" },
                                { title: "Free Updates", desc: "Lifetime software updates" },
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-sm">{feature.title}</h3>
                                        <p className="text-xs text-teal-100">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
});

DownloadPage.displayName = "DownloadPage";

export default DownloadPage;
