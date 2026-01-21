import { useState, useEffect, useMemo } from 'react'
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { Helmet } from 'react-helmet-async'
import { useNotification } from '@/contexts/NotificationContext'
import { apiClient } from '@/utils/enhancedApiClient'
import { authService } from '@/utils/authService'
import { isDemoMode, DEMO_SESSIONS } from '@/data/demoData'

// ✅ 1. Standardized Interface
interface MappedSession {
  session_id: string;
  user_email: string;
  login_time: string;
  logout_time: string | null;
  ip_address: string;
  device_info: string;
  session_status: string;
  activity_type: string;
  activity_details: any;
  resource_id: string;
}

// ✅ 2. Helper: Safely Parse JSON
const safeJsonParse = (value: any) => {
  if (typeof value !== 'string') return value;
  try {
    const parsed = JSON.parse(value);
    return (typeof parsed === 'object' && parsed !== null) ? parsed : value;
  } catch (e) {
    return value;
  }
};

// ✅ 3. Helper: Smart Value Finder (Case Insensitive)
const findValue = (obj: any, candidates: string[]): any => {
  if (!obj) return undefined;
  
  // Direct check
  for (const key of candidates) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') return obj[key];
  }

  // Case-insensitive check
  const objectKeys = Object.keys(obj);
  for (const candidate of candidates) {
    const foundKey = objectKeys.find(k => k.toLowerCase() === candidate.toLowerCase());
    if (foundKey && obj[foundKey] !== undefined && obj[foundKey] !== null && obj[foundKey] !== '') {
      return obj[foundKey];
    }
  }
  return undefined;
};

// ✅ 4. Flattener: Handles Hierarchy
const flattenTimelineData = (response: any): any[] => {
    let allRecords: any[] = [];
    const rootData = response.data || response; 

    if (Array.isArray(rootData)) {
        rootData.forEach((yearItem: any) => {
            if (yearItem.months && Array.isArray(yearItem.months)) {
                yearItem.months.forEach((monthItem: any) => {
                    if (monthItem.records && Array.isArray(monthItem.records)) {
                        allRecords.push(...monthItem.records);
                    }
                });
            } else {
                allRecords.push(yearItem);
            }
        });
    } else if (response.items && Array.isArray(response.items)) {
        allRecords = response.items;
    }
    return allRecords;
}

// ✅ 5. Normalizer: Enhanced Mapping logic
const normalizeSession = (raw: any): MappedSession => {
  return {
    session_id: findValue(raw, ['session_id', 'sessionId', 'SessionId', 'id', 'ID']) || 'N/A',
    user_email: findValue(raw, ['user_email', 'userEmail', 'UserEmail', 'email', 'Email']) || 'Unknown',
    
    // Login Time Candidates
    login_time: findValue(raw, ['login_time', 'loginTime', 'LoginTime', 'CreatedAt', 'created_at', 'startTime']) || new Date().toISOString(),
    
    // Logout Time Candidates (Added More)
    logout_time: findValue(raw, ['logout_time', 'logoutTime', 'LogoutTime', 'endTime', 'EndTime', 'completed_at', 'EndDate']) || null,
    
    ip_address: findValue(raw, ['ip_address', 'ipAddress', 'IP', 'ClientIp']) || 'N/A',
    
    // Device Info
    device_info: safeJsonParse(findValue(raw, ['device_info', 'deviceInfo', 'userAgent', 'Device']) || 'N/A'),
    
    session_status: findValue(raw, ['session_status', 'sessionStatus', 'status']) || 'unknown',
    activity_type: findValue(raw, ['activity_type', 'activityType']) || 'System',
    
    // Activity Details
    activity_details: safeJsonParse(findValue(raw, ['activity_details', 'activityDetails', 'details', 'meta_data']) || 'No details'),
    
    // Resource ID Candidates (Added More)
    resource_id: findValue(raw, ['resource_id', 'resourceId', 'ResourceId', 'Resource_Id', 'key', 'Key']) || '-',
  };
};

export default function AdminSessions() {
  const { showError, showInfo } = useNotification()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const pageSizeOptions = [5, 10, 25, 50, 100]
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  
  const [sessions, setSessions] = useState<MappedSession[]>([]) 
  const [loading, setLoading] = useState(true)

  // Load Data
  useEffect(() => {
    loadData();
  }, [fromDate, toDate]);

  const handleRefresh = () => {
    showInfo('Refreshing...');
    loadData();
  }

  const loadData = async () => {
    setLoading(true);
    const startTime = performance.now();
    
    if (isDemoMode()) {
        setSessions((DEMO_SESSIONS as any[]).map(normalizeSession));
        setLoading(false);
        return;
    }

    try {
      const response = await apiClient.getSessionsTimeline({
          dateFrom: fromDate || undefined,
          dateTo: toDate || undefined
      });

      if (response) {
        const flatData = flattenTimelineData(response);
        const mappedData = flatData.map(normalizeSession);
        
        // Sort by Login Time (Newest First)
        mappedData.sort((a, b) => new Date(b.login_time).getTime() - new Date(a.login_time).getTime());
        
        setSessions(mappedData);
      }
    } catch (e: any) {
      console.error(e);
      showError('Error', 'Failed to load data');
    } finally {
      const elapsedTime = performance.now() - startTime;
      const minDelay = elapsedTime < 300 ? 300 - elapsedTime : 0;
      setTimeout(() => setLoading(false), minDelay);
    }
  };

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sessions.slice(start, start + pageSize);
  }, [sessions, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(sessions.length / pageSize));

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'N/A') return '-';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch { return dateString; }
  };

  const getStatusColor = (status: string) => {
    const s = String(status).toLowerCase();
    if (s.includes('active') || s.includes('success')) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (s.includes('fail') || s.includes('error')) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  }

  // ✅ IMPROVED: Render JSON Activity Details cleanly
  const renderActivityDetails = (details: any) => {
    if (!details || details === 'No details') return <span className="text-slate-400 italic">No details</span>;

    // If Array
    if (Array.isArray(details)) return <span>{details.join(', ')}</span>;

    // If Object (The fix you requested)
    if (typeof details === 'object') {
        return (
            <div className="flex flex-col gap-1 mt-1">
                {Object.entries(details).map(([key, value]) => (
                    <div key={key} className="flex flex-wrap items-baseline gap-1 text-xs">
                        <span className="font-semibold text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="text-slate-700 font-mono">{String(value)}</span>
                    </div>
                ))}
            </div>
        );
    }

    // If String
    return <span>{String(details)}</span>;
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("admin-sessions")} />
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/admin/sessions" />
        <title>DSecureTech Admin Logs | System Activity & Security Monitoring</title>
        <meta
          name="description"
          content="Monitor system activity, commands, and user sessions with comprehensive logging and filtering capabilities."
        />
        <meta
          name="keywords"
          content="system logs, activity monitoring, commands, sessions, security monitoring, admin dashboard"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="space-y-4 xs:space-y-6 sm:space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 xs:p-6 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col xs:flex-row sm:flex-row items-start xs:items-center sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sessions</h1>
        <div className="flex gap-3">
            <button onClick={handleRefresh} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
            </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Filters & Search</h3>
          <button
            onClick={() => { setFromDate(''); setToDate(''); setPage(1); }}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-4">
          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">From Date</label>
            <input 
              type="date" 
              value={fromDate} 
              onChange={e => setFromDate(e.target.value)} 
              className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent" 
            />
          </div>
          
          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">To Date</label>
            <input 
              type="date" 
              value={toDate} 
              onChange={e => setToDate(e.target.value)} 
              className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent" 
            />
          </div>
        </div>
        
      </div>

      {/* Main Content */}
      <div className="card">
        
        {/* Table Header */}
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-hide">
        <div className="hidden md:grid grid-cols-11 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-3">User & Status</div>
            <div className="col-span-2">Time</div>
            <div className="col-span-3">Device & Network</div>
            <div className="col-span-3">Activity Log</div>
        </div>

        <div className="divide-y divide-slate-100">
            {loading ? (
                <div className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 mb-4"></div>
                        <p className="text-slate-600 text-sm">Loading session data...</p>
                    </div>
                </div>
            ) : sessions.length === 0 ? (
                <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                    <svg className="w-12 h-12 mb-3 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    No sessions found for this period
                </div>
            ) : (
                paginatedData.map((session, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-11 gap-4 p-4 hover:bg-slate-50 transition-colors items-start">
                        
                        {/* 1. User & Status */}
                        <div className="col-span-12 md:col-span-3">
                            <div className="flex flex-col gap-1">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border w-fit ${getStatusColor(session.session_status)}`}>
                                    {session.session_status}
                                </span>
                                <span className="text-sm font-semibold text-slate-800 truncate" title={session.user_email}>
                                    {session.user_email}
                                </span>
                            </div>
                        </div>

                        {/* 2. Time */}
                        <div className="col-span-6 md:col-span-2 flex flex-col justify-center text-sm">
                            <div className="flex flex-col mb-1">
                                <span className="text-[10px] text-slate-400 uppercase font-bold">Login</span>
                                <span className="font-medium text-slate-700">{formatDate(session.login_time)}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 uppercase font-bold">Logout</span>
                                <span className="font-medium text-slate-700">
                                    {session.logout_time ? formatDate(session.logout_time) : <span className="text-emerald-600 font-medium bg-emerald-50 px-1 rounded text-xs">Active Now</span>}
                                </span>
                            </div>
                        </div>

                        {/* 3. Device & Network */}
                        <div className="col-span-12 md:col-span-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                             <div className="flex flex-col gap-2 text-xs">
                                <div>
                                    <span className="text-slate-400 block uppercase text-[10px] font-bold">IP Address</span>
                                    <span className="font-mono text-slate-600">{session.ip_address}</span>
                                </div>
                                <div className="border-t border-slate-200 pt-2">
                                    <span className="text-slate-400 block uppercase text-[10px] font-bold">Device Info</span>
                                    <span className="text-slate-700 font-medium break-all line-clamp-2" title={String(session.device_info)}>
                                        {typeof session.device_info === 'object' ? JSON.stringify(session.device_info) : session.device_info}
                                    </span>
                                </div>
                             </div>
                        </div>

                        {/* 4. Activity Log */}
                        <div className="col-span-12 md:col-span-3 text-sm">
                             <div className="flex flex-col gap-1">
                                <span className="font-semibold text-slate-700 flex items-center gap-2 text-xs uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    {session.activity_type}
                                </span>
                                {/* Uses the new renderer for cleaner output */}
                                <div className="bg-white border border-slate-100 rounded p-2 text-xs shadow-sm">
                                    {renderActivityDetails(session.activity_details)}
                                </div>
                             </div>
                        </div>

                    </div>
                ))
            )}
        </div>
        </div>
        
        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-t border-slate-200 bg-slate-50">
          {/* Left side - Rows per page selector */}
          <div className="flex items-center gap-3">
            <label htmlFor="pageSize" className="text-sm text-slate-600">
              Rows per page:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => {
                const newSize = parseInt(e.target.value, 10);
                setPageSize(newSize);
                setPage(1); // Reset to first page when changing page size
              }}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-slate-500">
              Showing {Math.min((page - 1) * pageSize + 1, sessions.length)} to {Math.min(page * pageSize, sessions.length)} of {sessions.length} records
            </span>
          </div>

          {/* Right side - Page navigation */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}