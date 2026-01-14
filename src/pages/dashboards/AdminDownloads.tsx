import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { apiClient } from '../../utils/enhancedApiClient';

interface DownloadStats {
    totalDownloads: number;
    windowsDownloads: number;
    macOsDownloads: number;
    linuxDownloads: number;
    todayDownloads: number;
    thisWeekDownloads: number;
    thisMonthDownloads: number;
}

export default function AdminDownloads() {
    // Aggregated product stats
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<DownloadStats>({
        totalDownloads: 0,
        windowsDownloads: 0,
        macOsDownloads: 0,
        linuxDownloads: 0,
        todayDownloads: 0,
        thisWeekDownloads: 0,
        thisMonthDownloads: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Global Stats
                const statsResponse = await apiClient.get<DownloadStats>('/api/Download/stats');
                if (statsResponse.success && statsResponse.data) {
                    setStats(statsResponse.data);
                }

                // Fetch Product Downloads List for Aggregation
                // Note: Currently fetching page 1 with 100 items for overview. 
                // For accurate all-time stats with large data, backend should provide a dedicated breakdown endpoint.
                const listResponse = await apiClient.get<any>('/api/Download/all?page=1&pageSize=100');
                if (listResponse.success && listResponse.data && Array.isArray(listResponse.data.downloads)) {

                    const rawDownloads = listResponse.data.downloads;

                    // Aggregate data by product name
                    const productMap = new Map<string, any>();

                    rawDownloads.forEach((item: any) => {
                        const name = item.productName || 'Unknown Product';

                        if (!productMap.has(name)) {
                            productMap.set(name, {
                                id: item.id, // Use first ID found
                                name: name,
                                version: item.version,
                                downloads: 0,
                                lastDownload: item.downloadedAt,
                                platforms: { windows: 0, macos: 0, linux: 0 }
                            });
                        }

                        const product = productMap.get(name)!;
                        product.downloads += 1; // Increment download count

                        // Update last download date
                        if (new Date(item.downloadedAt) > new Date(product.lastDownload)) {
                            product.lastDownload = item.downloadedAt;
                            product.version = item.version; // Assume latest download has latest version
                        }

                        // Count platforms (case-insensitive check)
                        const platform = (item.platform || '').toLowerCase();
                        if (platform.includes('win')) product.platforms.windows++;
                        else if (platform.includes('mac') || platform.includes('osx') || platform.includes('apple')) product.platforms.macos++;
                        else if (platform.includes('nux') || platform.includes('ubuntu') || platform.includes('debian')) product.platforms.linux++;
                    });

                    setProducts(Array.from(productMap.values()));
                }

            } catch (error) {
                console.error('Failed to fetch download data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Use API stats if available, otherwise 0 (initial state)
    const totalDownloads = stats.totalDownloads;
    const totalWindows = stats.windowsDownloads;
    const totalMacOS = stats.macOsDownloads;
    const totalLinux = stats.linuxDownloads;

    return (
        <>
            <Helmet>
                <title>Downloads - Admin Dashboard | D-Secure</title>
            </Helmet>

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Downloads</h1>
                        <p className="text-slate-600 mt-1">Software downloads overview and statistics</p>
                    </div>
                    <Link to="/download" className="btn-primary flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Go to Downloads
                    </Link>
                </div>

                {/* Custom Installer Note */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <div className="flex items-start">
                        <span className="text-blue-500 text-xl font-bold mr-2">*</span>
                        <p className="text-sm text-blue-900 font-medium pt-0.5">
                            For custom installer setup, please contact the support team.
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Total Downloads</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{totalDownloads.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Windows</p>
                                <p className="text-3xl font-bold text-blue-600 mt-1">{totalWindows.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">macOS</p>
                                <p className="text-3xl font-bold text-slate-700 mt-1">{totalMacOS.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Linux</p>
                                <p className="text-3xl font-bold text-orange-600 mt-1">{totalLinux.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Period Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Today</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.todayDownloads.toLocaleString()}</p>
                            </div>
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">This Week</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.thisWeekDownloads.toLocaleString()}</p>
                            </div>
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">This Month</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.thisMonthDownloads.toLocaleString()}</p>
                            </div>
                            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Downloads */}
                <div className="card !p-0 overflow-hidden">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-900">Product Downloads</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        {loading ? (
                            <div className="text-center py-8 text-slate-500">Loading download data...</div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">No download data available</div>
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="text-lg font-semibold text-slate-900">{product.name}</h4>
                                            <p className="text-sm text-slate-600 mt-1">Version {product.version}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-emerald-600">{product.downloads.toLocaleString()}</p>
                                            <p className="text-xs text-slate-500 mt-1">Total Downloads</p>
                                        </div>
                                    </div>

                                    {/* Platform Breakdown */}
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                                                </svg>
                                                <span className="text-xs font-medium text-slate-700">Windows</span>
                                            </div>
                                            <p className="text-lg font-bold text-blue-600">{product.platforms.windows}</p>
                                        </div>

                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <svg className="w-4 h-4 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                                </svg>
                                                <span className="text-xs font-medium text-slate-700">macOS</span>
                                            </div>
                                            <p className="text-lg font-bold text-slate-700">{product.platforms.macos}</p>
                                        </div>

                                        <div className="bg-orange-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z" />
                                                </svg>
                                                <span className="text-xs font-medium text-slate-700">Linux</span>
                                            </div>
                                            <p className="text-lg font-bold text-orange-600">{product.platforms.linux}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                                        <span className="text-sm text-slate-600">
                                            Last download: {new Date(product.lastDownload).toLocaleDateString()}
                                        </span>
                                        <Link
                                            to={`/download?product=${product.name.toLowerCase().replace(' ', '-')}`}
                                            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
