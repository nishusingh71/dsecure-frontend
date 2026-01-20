import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { apiClient } from '@/utils/enhancedApiClient';
import { authService } from '@/utils/authService';
import { isDemoMode } from '@/data/demoData';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

// Types for API responses
interface LicenseStats {
    total: number;
    active: number;
    inactive: number;
    expired: number;
    revoked: number;
}

interface License {
    license_id: string;
    license_key: string;
    user_email: string;
    license_type: string;
    status: string;
    created_at: string;
    expires_at: string;
    activated_at?: string;
    machine_count?: number;
}

interface LicenseDistribution {
    id?: number;
    type: string;
    count: number;
    percentage: number;
    color: string;
    [key: string]: any;
}

export default function AdminLicenses() {
    const isDemo = isDemoMode();
    
    // ✅ Get user role for RBAC
    const getUserRole = (): string => {
        const storedUser = localStorage.getItem('user_data');
        const authUser = localStorage.getItem('authUser');

        let storedUserData = null;
        if (storedUser) {
            try {
                storedUserData = JSON.parse(storedUser);
            } catch (e) {
                console.error('Error parsing user_data:', e);
            }
        }

        if (!storedUserData && authUser) {
            try {
                storedUserData = JSON.parse(authUser);
            } catch (e) {
                console.error('Error parsing authUser:', e);
            }
        }

        const jwtUser = authService.getUserFromToken();
        return storedUserData?.role || storedUserData?.user_role || jwtUser?.role || 'user';
    };

    // ✅ Get user's groupId for GroupAdmin filtering
    const getUserGroupId = (): string | null => {
        const storedUser = localStorage.getItem('user_data');
        const authUser = localStorage.getItem('authUser');

        let storedUserData = null;
        if (storedUser) {
            try {
                storedUserData = JSON.parse(storedUser);
            } catch (e) {
                console.error('Error parsing user_data:', e);
            }
        }

        if (!storedUserData && authUser) {
            try {
                storedUserData = JSON.parse(authUser);
            } catch (e) {
                console.error('Error parsing authUser:', e);
            }
        }

        return storedUserData?.user_group || storedUserData?.groupId || null;
    };

    // ✅ Get current user email
    const getUserEmail = (): string => {
        const storedUser = localStorage.getItem('user_data');
        const authUser = localStorage.getItem('authUser');

        let storedUserData = null;
        if (storedUser) {
            try {
                storedUserData = JSON.parse(storedUser);
            } catch (e) {
                console.error('Error parsing user_data:', e);
            }
        }

        if (!storedUserData && authUser) {
            try {
                storedUserData = JSON.parse(authUser);
            } catch (e) {
                console.error('Error parsing authUser:', e);
            }
        }

        const jwtUser = authService.getUserFromToken();
        return storedUserData?.user_email || jwtUser?.user_email || jwtUser?.email || '';
    };

    const currentUserRole = getUserRole().toLowerCase();
    const currentUserGroupId = getUserGroupId();
    const currentUserEmail = getUserEmail();
    const isSuperAdmin = currentUserRole === 'superadmin';
    const isGroupAdmin = currentUserRole === 'admin' || currentUserRole === 'administrator' || currentUserRole === 'groupadmin';
    const isSubUser = currentUserRole === 'user';

    // console.log('🔐 RBAC Info:', { role: currentUserRole, groupId: currentUserGroupId, email: currentUserEmail });

    // State for API data
    const [licenses, setLicenses] = useState<LicenseStats>({
        total: 0,
        active: 0,
        inactive: 0,
        expired: 0,
        revoked: 0,
    });


    const [licenseList, setLicenseList] = useState<License[]>([]);
    const [licenseDetails, setLicenseDetails] = useState<LicenseDistribution[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [exporting, setExporting] = useState<'excel' | 'pdf' | null>(null);

    // State for UI features
    const [selectedLicenses, setSelectedLicenses] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [displayLimit, setDisplayLimit] = useState(20);

    // State for Revoke Modal
    const [showRevokeModal, setShowRevokeModal] = useState(false);
    const [revokeReason, setRevokeReason] = useState('');
    const [revokeData, setRevokeData] = useState<{ ids: string[]; count: number; singleKey?: string; countIsOne: boolean }>({
        ids: [],
        count: 0,
        countIsOne: false
    });

    // Fetch data on component mount
    useEffect(() => {
        fetchLicenseData();
    }, []);

    const fetchLicenseData = async () => {
        // Skip API calls for demo mode - use dummy data
        if (isDemo) {
            setLoading(false);
            setError(null);
            setLicenses({
                total: 2450,
                active: 1840,
                inactive: 410,
                expired: 150,
                revoked: 50
            });
            setLicenseList([
                {
                    license_id: '1',
                    license_key: 'ENT-XXXX-XXXX-XXXX-0001',
                    user_email: 'john.doe@demo.com',
                    license_type: 'Enterprise',
                    status: 'Active',
                    created_at: '2024-01-15T09:00:00Z',
                    expires_at: '2027-01-15T09:00:00Z',
                    activated_at: '2024-01-15T10:30:00Z',
                    machine_count: 3
                },
                {
                    license_id: '2',
                    license_key: 'PRO-XXXX-XXXX-XXXX-0002',
                    user_email: 'jane.smith@demo.com',
                    license_type: 'Professional',
                    status: 'Active',
                    created_at: '2024-02-20T14:00:00Z',
                    expires_at: '2026-02-20T14:00:00Z',
                    activated_at: '2024-02-20T15:00:00Z',
                    machine_count: 2
                },
                {
                    license_id: '3',
                    license_key: 'STD-XXXX-XXXX-XXXX-0003',
                    user_email: 'mike.wilson@demo.com',
                    license_type: 'Standard',
                    status: 'Active',
                    created_at: '2024-03-10T11:00:00Z',
                    expires_at: '2025-03-10T11:00:00Z',
                    activated_at: '2024-03-10T12:00:00Z',
                    machine_count: 1
                },
                {
                    license_id: '4',
                    license_key: 'ENT-XXXX-XXXX-XXXX-0004',
                    user_email: 'sarah.jones@demo.com',
                    license_type: 'Enterprise',
                    status: 'Inactive',
                    created_at: '2024-01-25T08:00:00Z',
                    expires_at: '2027-01-25T08:00:00Z',
                    machine_count: 0
                },
                {
                    license_id: '5',
                    license_key: 'TRIAL-XXXX-XXXX-XXXX-0005',
                    user_email: 'demo.user@demo.com',
                    license_type: 'Trial',
                    status: 'Expired',
                    created_at: '2023-11-01T10:00:00Z',
                    expires_at: '2023-12-01T10:00:00Z',
                    activated_at: '2023-11-01T11:00:00Z',
                    machine_count: 1
                }
            ]);
            setLicenseDetails([
                { id: 1, type: 'Enterprise', count: 1200, percentage: 49, color: 'emerald' },
                { id: 2, type: 'Professional', count: 850, percentage: 35, color: 'blue' },
                { id: 3, type: 'Standard', count: 300, percentage: 12, color: 'purple' },
                { id: 4, type: 'Trial', count: 100, percentage: 4, color: 'orange' }
            ]);
            return;
        }
        
        setLoading(true);
        setError(null);

        try {
            // Fetch all data in parallel using enhancedApiClient
            // enhanceApiClient.get returns Promise<ApiResponse<T>> where data is in response.data
            const [statsRes, listRes, distributionRes] = await Promise.all([
                apiClient.get<LicenseStats>('/api/License/stats'),
                apiClient.get<any>('/api/License/admin/all'),
                apiClient.get<any>('/api/License/distribution')
            ]);

            console.log('API Responses:', { statsRes, listRes, distributionRes }); // Debugging data fields

            // Update license stats
            if (statsRes.success && statsRes.data) {
                setLicenses({
                    total: statsRes.data.total || 0,
                    active: statsRes.data.active || 0,
                    inactive: statsRes.data.inactive || 0,
                    expired: statsRes.data.expired || 0,
                    revoked: statsRes.data.revoked || 0
                });
            }

            // Update license list
            if (listRes.success && listRes.data) {
                const rawList = Array.isArray(listRes.data) ? listRes.data : listRes.data.licenses || [];
                console.log('Sample Raw License:', rawList[0]); // Debugging

                // Robust mapping to ensure all fields are present
                const mappedList = rawList.map((item: any) => ({
                    ...item,
                    license_id: item.license_id || item.id || item._id, // Fallback for ID
                    license_key: item.license_key || item.key,
                    user_email: item.user_email || item.email,
                    license_type: item.edition || item.license_type || item.type || 'Standard', // Use edition as requested
                    status: item.status || 'Active',
                    created_at: item.created_at || item.createdAt,
                    expires_at: item.expires_at || item.expiresAt || item.expiry_date, // Fallback for Expires
                    machine_count: item.machine_count || item.machineCount || 0
                }));

                // ✅ RBAC FILTERING: Apply role-based filtering BEFORE setting state
                let filteredList = mappedList;

                // SubUser: Only see own licenses
                if (isSubUser) {
                    filteredList = mappedList.filter((license: License) => 
                        license.user_email === currentUserEmail
                    );
                    // console.log(`🔒 SubUser Filter: ${mappedList.length} → ${filteredList.length} licenses`);
                }
                // GroupAdmin: Filter by groupId if available (check user_email belongs to same group)
                else if (isGroupAdmin && currentUserGroupId) {
                    // Note: Backend should handle this via WHERE clause
                    // Frontend filtering as additional safety layer
                    filteredList = mappedList.filter((license: License) => {
                        // Check if license user belongs to same group
                        const licenseGroupId = (license as any).group_id || (license as any).groupId;
                        return licenseGroupId === currentUserGroupId || license.user_email === currentUserEmail;
                    });
                    // console.log(`🔒 GroupAdmin Filter: ${mappedList.length} → ${filteredList.length} licenses`);
                }
                // SuperAdmin: No filtering - sees everything

                setLicenseList(filteredList);
            }

            // Update distribution data for pie chart
            if (distributionRes.success && distributionRes.data) {
                const distribution = distributionRes.data.licenseDetails ||
                    (Array.isArray(distributionRes.data) ? distributionRes.data : []) ||
                    distributionRes.data.distribution || [];

                console.log('Distribution Data:', distribution);

                // Map colors to distribution types
                const colorMap: Record<string, string> = {
                    'Enterprise': 'emerald',
                    'ENTERPRISE': 'emerald',
                    'Professional': 'blue',
                    'PRO': 'blue',
                    'Standard': 'purple',
                    'Trial': 'orange',
                    'Basic': 'slate',
                    'Premium': 'indigo'
                };

                const mappedDistribution = distribution.map((item: any, index: number) => ({
                    id: index + 1,
                    type: item.type || item.license_type || 'Unknown',
                    count: item.count || 0,
                    percentage: item.percentage || 0,
                    color: colorMap[item.type || item.license_type] || colorMap[item.type?.toUpperCase()] || 'slate'
                }));

                setLicenseDetails(mappedDistribution);
            }
        } catch (err: any) {
            console.error('Error fetching license data:', err);
            setError(err.message || 'Failed to fetch license data');

            // Fallback to default data if API fails
            setLicenseDetails([
                { type: 'Enterprise', count: 0, percentage: 0, color: 'emerald' },
                { type: 'Professional', count: 0, percentage: 0, color: 'blue' },
                { type: 'Standard', count: 0, percentage: 0, color: 'purple' },
                { type: 'Trial', count: 0, percentage: 0, color: 'orange' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Export to Excel - Try backend API first, fallback to client-side
    const handleExportExcel = async () => {
        setExporting('excel');
        try {
            // Try backend API first
            const authHeaders = authService.getAuthHeader();
            const response = await fetch('/api/License/admin/export?format=excel', {
                method: 'GET',
                headers: {
                    ...authHeaders,
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            });

            if (response.ok) {
                // Download from API
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;

                const typeSuffix = typeFilter !== 'all' ? `_${typeFilter}` : '';
                const fileName = `licenses_report${typeSuffix}_${new Date().toISOString().split('T')[0]}.xlsx`;

                const contentDisposition = response.headers.get('Content-Disposition');
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                    if (match && match[1]) {
                        // Use match but maybe inject suffix if backend doesn't? 
                        // Actually, let's rely on client-side filename generation for consistency if backend filename is generic.
                        // Or just use our generated one since we are overriding 'link.download'.
                        // For now, let's stick to our generated meaningful name.
                    }
                }

                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } else {
                throw new Error('API export failed');
            }
        } catch (err) {
            console.warn('Backend export failed, using client-side generation:', err);

            // Fallback to client-side generation
            const dataToExport = filteredLicenses.length > 0 ? filteredLicenses : licenseList;

            if (dataToExport.length === 0) {
                console.log('No license data to export');
                setExporting(null);
                return;
            }

            try {
                // Create workbook and worksheet
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Licenses');

                // Define columns
                worksheet.columns = [
                    { header: 'S.No', key: 'sno', width: 6 },
                    { header: 'License Key', key: 'license_key', width: 25 },
                    { header: 'User Email', key: 'user_email', width: 30 },
                    { header: 'License Type', key: 'license_type', width: 15 },
                    { header: 'Status', key: 'status', width: 10 },
                    { header: 'Created At', key: 'created_at', width: 12 },
                    { header: 'Expires At', key: 'expires_at', width: 12 },
                    { header: 'Machines', key: 'machines', width: 10 }
                ];

                // Add data rows
                dataToExport.forEach((license, index) => {
                    worksheet.addRow({
                        sno: index + 1,
                        license_key: license.license_key || 'N/A',
                        user_email: license.user_email || 'N/A',
                        license_type: license.license_type || 'N/A',
                        status: license.status || 'N/A',
                        created_at: license.created_at ? new Date(license.created_at).toLocaleDateString() : 'N/A',
                        expires_at: license.expires_at ? new Date(license.expires_at).toLocaleDateString() : 'N/A',
                        machines: license.machine_count || 0
                    });
                });

                // Style the header row
                const headerRow = worksheet.getRow(1);
                headerRow.font = { bold: true };
                headerRow.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFE0E0E0' }
                };

                const typeSuffix = typeFilter !== 'all' ? `_${typeFilter}` : '';
                const fileName = `licenses_report${typeSuffix}_${new Date().toISOString().split('T')[0]}.xlsx`;

                // Write to buffer and save
                const buffer = await workbook.xlsx.writeBuffer();
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                saveAs(blob, fileName);

            } catch (clientErr) {
                console.error('Client-side export failed:', clientErr);
                console.error('Failed to export to Excel. Please try again.');
            }
        } finally {
            setExporting(null);
        }
    };

    // Export to PDF - Try backend API first, fallback to client-side
    const handleExportPDF = async () => {
        setExporting('pdf');
        try {
            // Try backend API first
            const authHeaders = authService.getAuthHeader();
            const response = await fetch('/api/License/admin/export?format=pdf', {
                method: 'GET',
                headers: {
                    ...authHeaders,
                    'Accept': 'application/pdf'
                }
            });

            if (response.ok) {
                // Download from API
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;

                const typeSuffix = typeFilter !== 'all' ? `_${typeFilter}` : '';
                const fileName = `licenses_report${typeSuffix}_${new Date().toISOString().split('T')[0]}.pdf`;

                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } else {
                throw new Error('API export failed');
            }
        } catch (err) {
            console.warn('Backend export failed, using client-side generation:', err);

            // Fallback to client-side generation
            const dataToExport = filteredLicenses.length > 0 ? filteredLicenses : licenseList;

            if (dataToExport.length === 0) {
                console.log('No license data to export');
                setExporting(null);
                return;
            }

            try {
                const doc = new jsPDF();

                doc.setFontSize(20);
                doc.setTextColor(30, 41, 59);
                const reportTitle = typeFilter !== 'all' ? `${typeFilter} License Report` : 'License Report';
                doc.text(reportTitle, 14, 22);

                doc.setFontSize(10);
                doc.setTextColor(100, 116, 139);
                doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

                doc.setFontSize(12);
                doc.setTextColor(30, 41, 59);
                doc.text(`Total: ${licenses.total}  |  Active: ${licenses.active}  |  Inactive: ${licenses.inactive}  |  Expired: ${licenses.expired}`, 14, 40);

                const tableData = dataToExport.map((license, index) => [
                    index + 1,
                    license.license_key || 'N/A',
                    license.user_email || 'N/A',
                    license.license_type || 'N/A',
                    license.status || 'N/A',
                    license.expires_at ? new Date(license.expires_at).toLocaleDateString() : 'N/A'
                ]);

                autoTable(doc, {
                    head: [['#', 'License Key', 'User Email', 'Type', 'Status', 'Expires']],
                    body: tableData,
                    startY: 50,
                    styles: { fontSize: 9, cellPadding: 3 },
                    headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold' },
                    alternateRowStyles: { fillColor: [248, 250, 252] },
                    columnStyles: {
                        0: { cellWidth: 10 }, 1: { cellWidth: 35 }, 2: { cellWidth: 45 },
                        3: { cellWidth: 25 }, 4: { cellWidth: 20 }, 5: { cellWidth: 25 }
                    }
                });

                const typeSuffix = typeFilter !== 'all' ? `_${typeFilter}` : '';
                const fileName = `licenses_report${typeSuffix}_${new Date().toISOString().split('T')[0]}.pdf`;
                doc.save(fileName);
            } catch (clientErr) {
                console.error('Client-side export failed:', clientErr);
                console.error('Failed to export to PDF. Please try again.');
            }
        } finally {
            setExporting(null);
        }
    };

    const filteredLicenses = licenseList.filter(license => {
        const matchesSearch = (
            (license.license_key?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (license.user_email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
        );
        const matchesStatus = statusFilter === 'all' || (license.status?.toLowerCase() === statusFilter.toLowerCase());
        const matchesType = typeFilter === 'all' || (license.license_type?.toLowerCase() === typeFilter.toLowerCase());

        return matchesSearch && matchesStatus && matchesType;
    });

    // Get unique license types for filter
    const uniqueLicenseTypes = Array.from(new Set(licenseList.map(l => l.license_type || 'Unknown'))).sort();


    const displayedLicenses = filteredLicenses.slice(0, displayLimit);

    // Filter handlers
    const handleLoadMore = () => {
        setDisplayLimit(prev => Math.min(prev + 20, filteredLicenses.length));
    };

    // Selection handlers
    const toggleSelectAll = () => {
        if (selectedLicenses.size === filteredLicenses.length && filteredLicenses.length > 0) {
            setSelectedLicenses(new Set());
        } else {
            setSelectedLicenses(new Set(filteredLicenses.map(l => l.license_id)));
        }
    };

    const toggleSelectOne = (id: string) => {
        const newSelected = new Set(selectedLicenses);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedLicenses(newSelected);
    };

    // Initialize Revoke
    const handleRevoke = (ids: string[]) => {
        const targets = licenseList.filter(l => ids.includes(l.license_id));
        if (targets.length === 0) return;

        setRevokeData({
            ids,
            count: targets.length,
            singleKey: targets.length === 1 ? targets[0].license_key : undefined,
            countIsOne: targets.length === 1
        });
        setRevokeReason('');
        setShowRevokeModal(true);
    };

    // Confirm Revoke (API Call)
    const confirmRevoke = async () => {
        if (!revokeReason.trim()) {
            // alert('Please enter a reason for revocation.');
            return;
        }

        setShowRevokeModal(false);
        setLoading(true);

        try {
            // Find license objects
            const targets = licenseList.filter(l => revokeData.ids.includes(l.license_id));

            const results = await Promise.all(targets.map(license =>
                apiClient.post('/api/License/admin/revoke', {
                    license_key: license.license_key,
                    reason: revokeReason
                })
            ));

            const failures = results.filter(r => !r.success);

            if (failures.length === 0) {
                await fetchLicenseData();
                setSelectedLicenses(new Set());
                // alert('Licenses revoked successfully');
            } else {
                console.error('Some revocations failed:', failures);
                throw new Error(`Failed to revoke ${failures.length} licenses. Please check logs.`);
            }
        } catch (err: any) {
            console.error('Revoke failed:', err);
            await fetchLicenseData();
            // alert(err.message || 'Failed to revoke licenses');
        } finally {
            setLoading(false);
        }
    };

    // Calculate pie chart data with offsets - REMOVED

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Licenses - Admin Dashboard | D-Secure</title>
            </Helmet>

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Licenses</h1>
                        <p className="text-slate-600 mt-1">License distribution and management</p>
                    </div >
                    {/* Export Buttons */}
                    < div className="flex items-center gap-3" >
                        {/* ✅ RBAC: Only SuperAdmin and GroupAdmin can bulk revoke */}
                        {
                            !isSubUser && selectedLicenses.size > 0 && (
                                <button
                                    onClick={() => handleRevoke(Array.from(selectedLicenses))}
                                    className="btn-danger flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors mr-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Revoke Selected ({selectedLicenses.size})
                                </button>
                            )
                        }
                        < button
                            onClick={handleExportExcel}
                            disabled={loading || exporting !== null
                            }
                            className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {exporting === 'excel' ? (
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            )}
                            Export to Excel
                        </button >
                        <button
                            onClick={handleExportPDF}
                            disabled={loading || exporting !== null}
                            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {exporting === 'pdf' ? (
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            )}
                            Download PDF
                        </button>
                    </div >
                </div >

                {/* Error Message */}
                {
                    error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                            <p className="font-medium">Error loading data</p>
                            <p className="text-sm mt-1">{error}</p>
                            <button
                                onClick={fetchLicenseData}
                                className="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
                            >
                                Try again
                            </button>
                        </div>
                    )
                }

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Total Licenses</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {loading ? (
                                        <span className="inline-block w-16 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        licenses.total.toLocaleString()
                                    )}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Active</p>
                                <p className="text-3xl font-bold text-emerald-600 mt-1">
                                    {loading ? (
                                        <span className="inline-block w-16 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        licenses.active.toLocaleString()
                                    )}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Inactive</p>
                                <p className="text-3xl font-bold text-orange-600 mt-1">
                                    {loading ? (
                                        <span className="inline-block w-16 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        licenses.inactive.toLocaleString()
                                    )}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Expired</p>
                                <p className="text-3xl font-bold text-red-600 mt-1">
                                    {loading ? (
                                        <span className="inline-block w-16 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        licenses.expired.toLocaleString()
                                    )}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Revoked</p>
                                <p className="text-3xl font-bold text-rose-600 mt-1">
                                    {loading ? (
                                        <span className="inline-block w-16 h-8 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        licenses.revoked.toLocaleString()
                                    )}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Pie Chart and Distribution Table */}
            < div className="grid grid-cols-1 lg:grid-cols-2 gap-6" >
                {/* Pie Chart */}
                < div className="card !p-6" >
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">License Distribution</h3>
                    {
                        loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600"></div>
                            </div>
                        ) : licenseDetails.length > 0 ? (
                            <>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={licenseDetails}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="count"
                                                nameKey="type"
                                            >
                                                {licenseDetails.map((entry, index) => {
                                                    const colors: Record<string, string> = {
                                                        emerald: '#10b981',
                                                        blue: '#3b82f6',
                                                        purple: '#a855f7',
                                                        orange: '#f97316',
                                                        slate: '#64748b',
                                                        indigo: '#6366f1'
                                                    };
                                                    return (
                                                        <Cell key={`cell-${index}`} fill={colors[entry.color] || '#64748b'} strokeWidth={0} />
                                                    );
                                                })}
                                            </Pie>
                                            <RechartsTooltip
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        const data = payload[0].payload;
                                                        return (
                                                            <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
                                                                <p className="font-semibold text-slate-900">{data.type}</p>
                                                                <p className="text-sm text-slate-600">Count: {data.count}</p>
                                                                <p className="text-sm text-slate-600">Percentage: {data.percentage}%</p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Legend
                                                verticalAlign="bottom"
                                                height={36}
                                                formatter={(value, entry: any) => (
                                                    <span className="text-slate-600 text-sm ml-1">{value} ({entry.payload.percentage}%)</span>
                                                )}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-64 text-slate-500">
                                No distribution data available
                            </div>
                        )
                    }
                </div >

                {/* License Breakdown Table */}
                < div className="card !p-0 overflow-hidden" >
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-900">License Breakdown</h3>
                    </div>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-200 border-t-emerald-600"></div>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Count
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Percentage
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {licenseDetails.map((license, index) => {
                                        const colors: Record<string, string> = {
                                            emerald: 'bg-emerald-100 text-emerald-800',
                                            blue: 'bg-blue-100 text-blue-800',
                                            purple: 'bg-purple-100 text-purple-800',
                                            orange: 'bg-orange-100 text-orange-800',
                                            slate: 'bg-slate-100 text-slate-800',
                                            indigo: 'bg-indigo-100 text-indigo-800'
                                        };

                                        return (
                                            <tr key={index} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[license.color] || 'bg-slate-100 text-slate-800'}`}>
                                                        {license.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-900">
                                                    {license.count.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-600">
                                                    {license.percentage}%
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr className="bg-slate-50 font-semibold">
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-900">
                                            Total
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-slate-900">
                                            {licenses.total.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-slate-900">
                                            100%
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div >
            </div >

            {/* Full License List Table with Filters and Actions */}
            < div className="card !p-0 overflow-hidden" >
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <h3 className="text-lg font-semibold text-slate-900">All Licenses</h3>
                        <span className="text-sm text-slate-500">{filteredLicenses.length} found</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search licenses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-64"
                            />
                            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="expired">Expired</option>
                            <option value="revoked">Revoked</option>
                        </select>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="all">All Types</option>
                            {uniqueLicenseTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto max-h-[600px] overflow-y-auto" onScroll={(e) => {
                    const target = e.currentTarget;
                    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
                        handleLoadMore();
                    }
                }}>
                    <table className="w-full relative">
                        <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                            <tr>
                                {/* ✅ RBAC: Only show checkbox column for SuperAdmin and GroupAdmin */}
                                {!isSubUser && (
                                    <th className="px-4 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={filteredLicenses.length > 0 && selectedLicenses.size === filteredLicenses.length}
                                            onChange={toggleSelectAll}
                                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </th>
                                )}
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    License Key
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    User Email
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Expires
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {displayedLicenses.length > 0 ? (
                                displayedLicenses.map((license, index) => (
                                    <tr key={license.license_id || index} className={`hover:bg-slate-50 ${selectedLicenses.has(license.license_id) ? 'bg-emerald-50' : ''}`}>
                                        {/* ✅ RBAC: Only show checkbox column for SuperAdmin and GroupAdmin */}
                                        {!isSubUser && (
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLicenses.has(license.license_id)}
                                                    onChange={() => toggleSelectOne(license.license_id)}
                                                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                            </td>
                                        )}
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-slate-900 max-w-xs overflow-x-auto custom-scrollbar">
                                            {license.license_key}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                                            {license.user_email || 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {license.license_type || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${license.status?.toLowerCase() === 'active'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : license.status?.toLowerCase() === 'expired'
                                                    ? 'bg-red-100 text-red-800'
                                                    : license.status?.toLowerCase() === 'revoked'
                                                        ? 'bg-rose-100 text-rose-800'
                                                        : 'bg-orange-100 text-orange-800'
                                                }`}>
                                                {license.status || 'Unknown'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                                            {license.expires_at ? new Date(license.expires_at).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                            {/* ✅ RBAC: Only SuperAdmin and GroupAdmin can Revoke licenses */}
                                            {!isSubUser && (
                                                <button
                                                    onClick={() => handleRevoke([license.license_id])}
                                                    className="text-rose-600 hover:text-rose-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={
                                                        license.status?.toLowerCase() === 'revoked' || 
                                                        license.status?.toLowerCase() === 'expired'
                                                    }
                                                    title={
                                                        license.status?.toLowerCase() === 'revoked' 
                                                            ? 'License already revoked' 
                                                            : license.status?.toLowerCase() === 'expired'
                                                            ? 'Cannot revoke expired license'
                                                            : 'Revoke this license'
                                                    }
                                                >
                                                    Revoke
                                                </button>
                                            )}
                                            {isSubUser && (
                                                <span className="text-slate-400 text-xs">View Only</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                                        No licenses found matching your filters.
                                    </td>
                                </tr>
                            )}
                            {loading && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-4 text-center">
                                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-4 border-slate-200 border-t-emerald-600"></div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div >
            {/* Revoke Confirmation Modal */}
            {showRevokeModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Backdrop */}
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowRevokeModal(false)}></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        {/* Modal Panel */}
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Revoke License{revokeData.count > 1 ? 's' : ''}
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {revokeData.countIsOne
                                                    ? `Are you sure you want to revoke the license ending in ...${revokeData.singleKey?.slice(-4)}?`
                                                    : `Are you sure you want to revoke ${revokeData.count} selected licenses?`
                                                }
                                                <br />
                                                This action cannot be undone.
                                            </p>
                                            <div className="mt-4">
                                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                                                    Reason for Revocation
                                                </label>
                                                <textarea
                                                    id="reason"
                                                    rows={3}
                                                    className="shadow-sm focus:ring-red-500 focus:border-red-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                                    placeholder="Enter reason..."
                                                    value={revokeReason}
                                                    onChange={(e) => setRevokeReason(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={confirmRevoke}
                                >
                                    Revoke
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowRevokeModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
