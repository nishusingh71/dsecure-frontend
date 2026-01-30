import React, { useState, memo, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getProductIcon } from "@/utils/productIcons";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import { ENV } from "@/config/env";

// --- Types Definitions (Best Practice for maintainability) ---
interface DownloadInfo {
    url: string;
    filename: string;
    size: string;
    arch: string;
}

interface ProductDownloads {
    windowsAmd?: DownloadInfo;
    windows?: DownloadInfo;
    macos: DownloadInfo;
    linux: DownloadInfo;
}

interface Product {
    id: string;
    name: string;
    subtitle: string;
    description: string;
}

// --- Static Data (Moved outside component to prevent recreation on every render) ---
const PRODUCTS: Product[] = [
    {
        id: "drive-eraser",
        name: "Drive Eraser",
        subtitle: "Erase HDDs, SSDs in PCs, Mac & Servers",
        description: "Complete Hard Drive & SSD Erasure with Enterprise-Grade Security Standards",
    },
    {
        id: "file-eraser",
        name: "File Eraser",
        subtitle: "Erase Files, Folders & Volumes",
        description: "Secure File, Folder & Application Trace Elimination",
    },
];

const DOWNLOAD_LINKS: Record<string, ProductDownloads> = {
    "drive-eraser": {
        windowsAmd: {
            url:"#", 
            filename: "D-SecureDriveEraser-x64-Setup.exe",
            size: "45 MB",
            arch: "AMD/Intel (x64)",
        },
        macos: {
            url: "#",
            filename: "D-SecureDriveEraser.dmg",
            size: "52 MB",
            arch: "Intel & Apple Silicon",
        },
        linux: {
            url: "#",
            filename: "d-secure-drive-eraser.deb",
            size: "38 MB",
            arch: "64-bit (Ubuntu/Debian)",
        },
    },
    "file-eraser": {
        windows: {
            url: ENV.FileEraser_Windows_Download_Link, 
            filename: "D-SecureFileEraser-Setup.exe",
            size: "600 MB",
            arch: "64-bit",
        },
        macos: {
            url: "#",
            filename: "D-SecureFileEraser.dmg",
            size: "38 MB",
            arch: "Intel & Apple Silicon",
        },
        linux: {
            url: "#",
            filename: "d-secure-file-eraser.deb",
            size: "28 MB",
            arch: "64-bit (Ubuntu/Debian)",
        },
    },
};

// --- Sub-components for Icons (Memoized) ---
const WindowsIcon = memo(() => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3.449L9.75 2.1v9.45H0V3.449zm10.949-1.55L24 0v11.4H10.949V1.9zM0 12.6h9.75v9.45L0 20.7v-8.1zm10.949-.05H24V24l-13.051-1.95V12.55z" />
    </svg>
));

const MacIcon = memo(() => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
));

const LinuxIcon = memo(() => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.503 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.89-.39 1.821-.364 2.781C4.76 17.547 5.1 18.5 5.63 19.3c.53.83 1.252 1.5 2.11 2.01 1.71 1.05 3.89 1.38 6.27 1.38 2.38 0 4.55-.33 6.27-1.38.858-.51 1.58-1.18 2.11-2.01.53-.8.87-1.753.907-2.66.026-.96-.086-1.89-.364-2.78-.589-1.77-1.831-3.47-2.716-4.52-.75-1.07-.974-1.93-1.05-3.02-.065-1.49 1.056-5.965-3.17-6.298A3.482 3.482 0 0 0 12.503 0z" />
    </svg>
));


const DownloadPage: React.FC = memo(() => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState<string>("drive-eraser");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Initial load logic
    useEffect(() => {
        const productParam = searchParams.get("product");
        const validProducts = PRODUCTS.map(p => p.id);
        if (productParam && validProducts.includes(productParam)) {
            setSelectedProduct(productParam);
        }
    }, [searchParams]);

    // Derived state (Efficient way to get current data)
    const currentProduct = useMemo(() => 
        PRODUCTS.find(p => p.id === selectedProduct) || PRODUCTS[0], 
    [selectedProduct]);

    const currentDownloads = useMemo(() => 
        DOWNLOAD_LINKS[selectedProduct], 
    [selectedProduct]);

    // Handle Tab Change
    const handleProductChange = useCallback((productId: string) => {
        setSelectedProduct(productId);
        setOpenDropdown(null); // Close dropdowns on product switch
        navigate(`/download?product=${productId}`, { replace: true });
    }, [navigate]);


    // --- Core Logic for Download without Reload ---
    const handleDownload = useCallback((osKey: keyof ProductDownloads, e: React.MouseEvent) => {
        // 1. Prevent Default Behavior (Important to stop reload)
        e.preventDefault();
        e.stopPropagation();

        const downloadInfo = currentDownloads[osKey];

        if (downloadInfo && downloadInfo.url && downloadInfo.url !== "#") {
            // 2. Create a temporary link element
            const link = document.createElement('a');
            link.href = downloadInfo.url;
            
            // 3. Set download attribute (forces browser to treat as download)
            link.setAttribute('download', downloadInfo.filename);
            
            // 4. Append, Click, Remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // Fallback for missing links
            console.warn("Download link missing or invalid");
            alert("Download link will be available soon!");
        }
        
        // Close dropdown after selection
        setOpenDropdown(null);
    }, [currentDownloads]);

    // Dropdown Toggler
    const toggleDropdown = useCallback((key: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenDropdown(prev => prev === key ? null : key);
    }, []);

    return (
        <>
            <SEOHead seo={getSEOForPage('download')} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                <div className="container mx-auto px-4 xs:px-6 sm:px-6 md:px-8 py-8 max-w-7xl">
                    
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                            FREE DOWNLOAD
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Download{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                                D-Secure
                            </span>{" "}
                            Software
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Choose your operating system and download our enterprise-grade data erasure software.
                            Works on Windows, macOS, and Linux.
                        </p>
                    </div>

                    {/* Custom Installer Note */}
                    <div className="max-w-3xl mx-auto mb-10">
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
                            <div className="flex items-start justify-center">
                                <span className="text-blue-500 text-xl font-bold mr-2">*</span>
                                <p className="text-sm text-blue-900 font-medium pt-0.5">
                                    For custom installer setup, please contact the support team.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product Selection Tabs */}
                    <div className="flex justify-center mb-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
                            {PRODUCTS.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => handleProductChange(product.id)}
                                    className={`p-6 rounded-xl text-left transition-all duration-300 border-2 ${
                                        selectedProduct === product.id
                                            ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white border-teal-500 shadow-xl transform scale-105"
                                            : "bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:shadow-lg"
                                    }`}
                                >
                                    <h3 className="font-semibold text-sm mb-1">
                                        {product.name}
                                    </h3>
                                    <p className={`text-xs ${selectedProduct === product.id ? 'opacity-90' : 'text-gray-500'}`}>
                                        {product.subtitle}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Download Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-8 max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                            <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl shrink-0">
                                <img
                                    src={getProductIcon(selectedProduct, 64)}
                                    alt={currentProduct.name}
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                    D-Secure {currentProduct.name}
                                </h2>
                                <p className="text-gray-600 mb-1">{currentProduct.description}</p>
                            </div>
                        </div>

                        {/* Download Buttons Grid */}
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                            
                            {/* --- WINDOWS BUTTON --- */}
                            <div className="relative">
                                <button
                                    onClick={(e) => selectedProduct === 'drive-eraser' ? toggleDropdown("windows-drive", e) : handleDownload("windows", e)}
                                    type="button"
                                    className="w-full flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg group"
                                >
                                    <div className="text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                                        <WindowsIcon />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">Windows</h3>
                                    <p className="text-xs text-gray-500 mb-3">
                                        {selectedProduct === 'drive-eraser' ? 'AMD/Intel (x64)' : 'x64 & ARM64'}
                                    </p>
                                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                                        <DownloadIcon />
                                        Download
                                        {selectedProduct === 'drive-eraser' && <ChevronIcon />}
                                    </div>
                                </button>

                                {/* Windows Dropdown (Only for Drive Eraser) */}
                                {openDropdown === "windows-drive" && (
                                    <DropdownMenu>
                                        <DropdownItem 
                                            title="AMD/Intel (x64)" 
                                            subtitle="For standard PCs" 
                                            onClick={(e) => handleDownload("windowsAmd", e)} 
                                        />
                                        {/* Add ARM Item here if needed */}
                                    </DropdownMenu>
                                )}
                            </div>


                            {/* --- macOS BUTTON --- */}
                            <div className="relative">
                                <button
                                    onClick={(e) => toggleDropdown("macos", e)}
                                    type="button"
                                    className="w-full flex flex-col items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg group"
                                >
                                    <div className="text-gray-700 mb-3 group-hover:scale-110 transition-transform">
                                        <MacIcon />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">macOS</h3>
                                    <p className="text-xs text-gray-500 mb-3">Intel & Apple Silicon</p>
                                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                        <DownloadIcon />
                                        Download
                                        <ChevronIcon />
                                    </div>
                                </button>

                                {openDropdown === "macos" && (
                                    <DropdownMenu>
                                        <DropdownItem 
                                            title="Universal Installer" 
                                            subtitle="For Intel & M1/M2/M3" 
                                            onClick={(e) => handleDownload("macos", e)} 
                                        />
                                    </DropdownMenu>
                                )}
                            </div>


                            {/* --- LINUX BUTTON --- */}
                            <div className="relative">
                                <button
                                    onClick={(e) => toggleDropdown("linux", e)}
                                    type="button"
                                    className="w-full flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg group"
                                >
                                    <div className="text-orange-600 mb-3 group-hover:scale-110 transition-transform">
                                        <LinuxIcon />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">Linux</h3>
                                    <p className="text-xs text-gray-500 mb-3">DEB & RPM</p>
                                    <div className="flex items-center gap-2 text-orange-600 font-semibold">
                                        <DownloadIcon />
                                        Download
                                        <ChevronIcon />
                                    </div>
                                </button>

                                {openDropdown === "linux" && (
                                    <DropdownMenu>
                                        <DropdownItem 
                                            title=".DEB Package" 
                                            subtitle="For Ubuntu, Debian, Mint" 
                                            onClick={(e) => handleDownload("linux", e)} 
                                        />
                                        {/* Add RPM logic here if URL is different, currently mapping both to 'linux' key */}
                                    </DropdownMenu>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

// --- Helper Components for Cleaner JSX ---

const DownloadIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ChevronIcon = () => (
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="absolute top-full left-0 right-0 mt-2 z-20">
        <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {children}
        </div>
    </div>
);

const DropdownItem: React.FC<{ title: string; subtitle: string; onClick: (e: React.MouseEvent) => void }> = ({ title, subtitle, onClick }) => (
    <button
        onClick={onClick}
        type="button"
        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center justify-between group"
    >
        <div>
            <p className="font-semibold text-gray-900 text-sm group-hover:text-teal-600 transition-colors">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <DownloadIcon />
    </button>
);

DownloadPage.displayName = "DownloadPage";

export default DownloadPage;