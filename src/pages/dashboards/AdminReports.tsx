import { ENV } from "@/config/env";
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { useMemo, useState, useRef, useCallback } from "react";
import React from "react";
import { exportToCsv, openPrintView } from "@/utils/csv";
import { Helmet } from "react-helmet-async";
import { useNotification } from "@/contexts/NotificationContext";
import { useAuth } from "@/auth/AuthContext";

import { AdminDashboardAPI, AdminReport } from "@/services/adminDashboardAPI";
import { useUserMachines } from "@/hooks/useUserMachines";
import { useGroups } from "@/hooks/useDashboardData";
import { useEffect } from "react";
import { apiClient } from "@/utils/enhancedApiClient";
import { authService } from "@/utils/authService";
import { useNavigate } from "react-router-dom";
import { isDemoMode, DEMO_AUDIT_REPORTS, DEMO_SUBUSERS } from "@/data/demoData";
import { useSubusers } from "@/hooks/useSubusers";

// Extended AdminReport interface to include raw data
interface ExtendedAdminReport extends AdminReport {
  method?: string;
  reportType?: string;
  totalFiles?: number;
  erasedFiles?: number;
  failedFiles?: number;
  successFiles?: number;
  email?: string;
  user?: string;
  group?: string;
  groupName?: string;
  _raw?: any;
  _details?: any;
}

export default function AdminReports() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateValidationError, setDateValidationError] = useState("");
  const [deviceRangeFilter, setDeviceRangeFilter] = useState("");
  const [showUniqueOnly, setShowUniqueOnly] = useState(false);
  const [sortBy, setSortBy] = useState<keyof AdminReport>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [eraserMethodFilter, setEraserMethodFilter] = useState("");
  const [reportTypeFilter, setReportTypeFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [subuserFilter, setSubuserFilter] = useState<string>(""); // "" = my reports, email = subuser's reports, "all" = all reports

  const navigate = useNavigate();

  // ✅ Cache Helper Functions
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const getCachedData = (key: string) => {
    try {
      const cached = localStorage.getItem(`admin_cache_${key}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          // console.log(`✅ Using cached data for ${key}`);
          return data;
        }
        localStorage.removeItem(`admin_cache_${key}`);
      }
    } catch (e) {
      console.warn(`⚠️ Cache read error for ${key}:`, e);
    }
    return null;
  };

  const setCachedData = (key: string, data: any) => {
    try {
      localStorage.setItem(
        `admin_cache_${key}`,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
      // console.log(`💾 Cached data for ${key}`);
    } catch (e) {
      console.warn(`⚠️ Cache write error for ${key}:`, e);
    }
  };

  // ✅ Date Helper Functions
  const formatDateToYYYYMMDD = (date: Date): string => {
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  };

  const isValidDateFormat = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString === formatDateToYYYYMMDD(date);
  };

  // ✅ Custom DateInput Component with YYYY-MM-DD format
  const CustomDateInput = ({
    label,
    value,
    onChange,
    placeholder = "YYYY-MM-DD"
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }) => {
    const [displayValue, setDisplayValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    const formatInputValue = (val: string) => {
      // Remove non-digits
      const digitsOnly = val.replace(/\D/g, '');

      // Format as YYYY-MM-DD
      if (digitsOnly.length >= 8) {
        return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4, 6)}-${digitsOnly.slice(6, 8)}`;
      } else if (digitsOnly.length >= 6) {
        return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4, 6)}-${digitsOnly.slice(6)}`;
      } else if (digitsOnly.length >= 4) {
        return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4)}`;
      }
      return digitsOnly;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formatted = formatInputValue(rawValue);

      setDisplayValue(formatted);

      // Only call onChange if we have a complete date or empty
      if (formatted === '' || formatted.match(/^\d{4}-\d{2}-\d{2}$/)) {
        onChange(formatted);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow backspace, delete, tab, escape, enter
      if ([8, 9, 27, 13, 46].includes(e.keyCode) ||
        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey) ||
        (e.keyCode === 67 && e.ctrlKey) ||
        (e.keyCode === 86 && e.ctrlKey) ||
        (e.keyCode === 88 && e.ctrlKey) ||
        // Allow numbers and dash
        (e.keyCode >= 48 && e.keyCode <= 57) || // 0-9
        (e.keyCode >= 96 && e.keyCode <= 105) || // numpad 0-9
        e.keyCode === 189 || e.keyCode === 109 // dash
      ) {
        return;
      }
      e.preventDefault();
    };

    React.useEffect(() => {
      setDisplayValue(value);
    }, [value]);

    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label} <span className="text-slate-500 text-xs">(YYYY-MM-DD)</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-transparent font-mono"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          maxLength={10}
        />
      </div>
    );
  };

  // ✅ Get current user email for API calls
  const getUserEmail = (): string => {
    const storedUser = localStorage.getItem("user_data");
    const authUser = localStorage.getItem("authUser");

    let storedUserData = null;
    if (storedUser) {
      try {
        storedUserData = JSON.parse(storedUser);
      } catch (e) {
        console.error("Error parsing user_data:", e);
      }
    }

    if (!storedUserData && authUser) {
      try {
        storedUserData = JSON.parse(authUser);
      } catch (e) {
        console.error("Error parsing authUser:", e);
      }
    }

    const jwtUser = authService.getUserFromToken();
    return storedUserData?.user_email || jwtUser?.user_email || jwtUser?.email || "";
  };

  const currentUserEmail = getUserEmail();
  const isDemo = isDemoMode();

  // ✅ RBAC: Role detection functions
  const getUserRole = (): string => {
    const storedUser = localStorage.getItem('user_data')
    const authUser = localStorage.getItem('authUser')
    let storedUserData = null
    
    if (storedUser) {
      try { storedUserData = JSON.parse(storedUser) } catch (e) { }
    }
    if (!storedUserData && authUser) {
      try { storedUserData = JSON.parse(authUser) } catch (e) { }
    }
    
    return storedUserData?.userRole || storedUserData?.role || storedUserData?.user_role || 
           user?.role || 'user'
  }

  const getUserGroupId = (): string | null => {
    const storedUser = localStorage.getItem('user_data')
    const authUser = localStorage.getItem('authUser')
    let storedUserData = null
    
    if (storedUser) {
      try { storedUserData = JSON.parse(storedUser) } catch (e) { }
    }
    if (!storedUserData && authUser) {
      try { storedUserData = JSON.parse(authUser) } catch (e) { }
    }
    
    return storedUserData?.user_group || storedUserData?.groupId || storedUserData?.group_id || null
  }

  // ✅ RBAC: Determine user's role and capabilities
  const currentUserRole = getUserRole().toLowerCase()
  const currentUserGroupId = getUserGroupId()
  const isSuperAdmin = currentUserRole === 'superadmin'
  const isGroupAdmin = currentUserRole === 'admin' || currentUserRole === 'administrator' || currentUserRole === 'groupadmin'
  const isSubUser = currentUserRole === 'user'

  // console.log('🔐 RBAC Info (AdminReports):', { role: currentUserRole, groupId: currentUserGroupId, email: currentUserEmail })

  // ✅ Fetch subusers for filter dropdown
  const { data: subusersData = isDemo ? DEMO_SUBUSERS : [] } = useSubusers(currentUserEmail, !!currentUserEmail && !isDemo);

  // ✅ Fetch groups for filter dropdown - using same endpoint as AdminGroups
  const [groupsData, setGroupsData] = useState<any[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(false);

  // Fetch groups from API on mount
  useEffect(() => {
    const fetchGroupsForFilter = async () => {
      if (isDemo) {
        setGroupsData([
          { groupId: 1, groupName: 'Engineering Team' },
          { groupId: 2, groupName: 'Marketing Team' },
          { groupId: 3, groupName: 'Sales Team' }
        ]);
        return;
      }

      try {
        setGroupsLoading(true);
        const response = await apiClient.getGroupsWithUsers();
        
        if (response.success && response.data?.groups?.data) {
          setGroupsData(response.data.groups.data);
        }
      } catch (error) {
        console.error('Error fetching groups for filter:', error);
      } finally {
        setGroupsLoading(false);
      }
    };

    fetchGroupsForFilter();
  }, [isDemo]);

  // ✅ Fetch user machines to get MAC addresses for filtering
  // This includes machines transferred to this user via AdminMachines transfer button
  // When a machine is transferred, all reports with matching MAC address become visible to new owner
  const { data: userMachines = [] } = useUserMachines(currentUserEmail, !!currentUserEmail && !isDemo);
  
  // Extract MAC addresses from user's machines (normalized and trimmed)
  // These MAC addresses will be used to fetch and filter reports
  const userMacAddresses = useMemo(() => {
    return userMachines
      .map((machine: any) => machine.mac_address?.toLowerCase().trim())
      .filter(Boolean);
  }, [userMachines]);

  // console.log('🔍 User MAC Addresses for filtering:', userMacAddresses);

  const [allRows, setAllRows] = useState<ExtendedAdminReport[]>(
    () => getCachedData("reports") || []
  );
  const [loading, setLoading] = useState(true);
  const [selectedReportIds, setSelectedReportIds] = useState<Set<string>>(
    new Set()
  );
  const [pageSize, setPageSize] = useState(5); // Default 10 rows per page
  const pageSizeOptions = [5, 10, 25, 50, 100, 250];

  // Generate PDF Modal State
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [
    selectedReport,
    setSelectedReport,
  ] = useState<ExtendedAdminReport | null>(null);

  // Bulk Settings Modal State
  const [showBulkSettingsModal, setShowBulkSettingsModal] = useState(false);
  const [bulkSettingsLoading, setBulkSettingsLoading] = useState(false);

  // Scheduler Modal State
  const [showSchedulerModal, setShowSchedulerModal] = useState(false);
  const [showScheduledReportsModal, setShowScheduledReportsModal] = useState(
    false
  );
  const [scheduledReports, setScheduledReports] = useState<any[]>([]);
  const [loadingScheduledReports, setLoadingScheduledReports] = useState(false);
  const [schedulerData, setSchedulerData] = useState({
    reportName: "",
    scheduleType: "once", // 'once', 'daily', 'weekly', 'monthly'
    scheduleDate: "",
    scheduleTime: "",
    reportIds: [] as string[],
    emailRecipients: "",
    includeFilters: false,
    filterStatus: "",
    filterDepartment: "",
  });

  // State for base64 images (for localStorage persistence)
  const [imageBase64, setImageBase64] = useState<{
    headerLeftLogo: string | null;
    headerRightLogo: string | null;
    watermarkImage: string | null;
    technicianSignature: string | null;
    validatorSignature: string | null;
  }>(() => {
    console.log('🔵 Initializing imageBase64 state...');
    try {
      // First check the unified cache
      const cachedSettings = localStorage.getItem("pdfExportSettingsCache");
      console.log('🔵 Cache found:', !!cachedSettings);
      if (cachedSettings) {
        const parsed = JSON.parse(cachedSettings);
        console.log('🔵 Parsed cache:', { 
          hasImages: !!parsed.images,
          imageKeys: parsed.images ? Object.keys(parsed.images) : []
        });
        if (parsed.images) {
          const result = {
            headerLeftLogo: parsed.images.headerLeftLogo || null,
            headerRightLogo: parsed.images.headerRightLogo || null,
            watermarkImage: parsed.images.watermarkImage || null,
            technicianSignature: parsed.images.technicianSignature || null,
            validatorSignature: parsed.images.validatorSignature || null,
          };
          console.log('🖼️ Initial imageBase64 from cache:', {
            headerLeftLogo: result.headerLeftLogo ? '✅ loaded' : '❌ null',
            headerRightLogo: result.headerRightLogo ? '✅ loaded' : '❌ null',
            watermarkImage: result.watermarkImage ? '✅ loaded' : '❌ null',
            technicianSignature: result.technicianSignature ? '✅ loaded' : '❌ null',
            validatorSignature: result.validatorSignature ? '✅ loaded' : '❌ null',
          });
          return result;
        }
      }
      // Fallback to old key for backwards compatibility
      const saved = localStorage.getItem("pdfImageSettings");
      if (saved) {
        console.log('🖼️ Initial imageBase64 loaded from pdfImageSettings (legacy)');
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("❌ Failed to load image settings from localStorage:", e);
    }
    console.log('🔵 No cached images found, using defaults');
    return {
      headerLeftLogo: null,
      headerRightLogo: null,
      watermarkImage: null,
      technicianSignature: null,
      validatorSignature: null,
    };
  });

  // Default PDF settings (removed localStorage)
  const defaultPdfSettings = {
    reportTitle: "Data Erasure Audit Report",
    headerText: "D-SecureTech",
    technicianName: "",
    technicianDept: "",
    validatorName: "",
    validatorDept: "",
    headerLeftLogo: null as File | null,
    headerRightLogo: null as File | null,
    watermarkImage: null as File | null,
    technicianSignature: null as File | null,
    validatorSignature: null as File | null,
  };

  const [pdfFormData, setPdfFormData] = useState<{
    reportTitle: string;
    headerText: string;
    technicianName: string;
    technicianDept: string;
    validatorName: string;
    validatorDept: string;
    headerLeftLogo: File | null;
    headerRightLogo: File | null;
    watermarkImage: File | null;
    technicianSignature: File | null;
    validatorSignature: File | null;
  }>(defaultPdfSettings);

  // Loading state for PDF settings fetch
  const [pdfSettingsLoading, setPdfSettingsLoading] = useState(true);
  const [pdfSettingsLoaded, setPdfSettingsLoaded] = useState(false);

  // Cache key for PDF settings
  const PDF_SETTINGS_CACHE_KEY = 'pdfExportSettingsCache';

  // Load saved PDF settings - first from cache, then from API if needed
  React.useEffect(() => {
    console.log('🟢 PDF Settings useEffect triggered');
    let isMounted = true;

    const loadSavedSettings = async () => {
      if (!isMounted) return;
      
      setPdfSettingsLoading(true);
      
      try {
        // Step 1: Check localStorage cache first
        const cachedSettings = localStorage.getItem(PDF_SETTINGS_CACHE_KEY);
        if (cachedSettings) {
          try {
            const parsed = JSON.parse(cachedSettings);
            console.log('✅ Using cached PDF settings from localStorage:', parsed);
            
            // Apply cached settings to form
            setPdfFormData({
              reportTitle: parsed.reportTitle || defaultPdfSettings.reportTitle,
              headerText: parsed.headerText || defaultPdfSettings.headerText,
              technicianName: parsed.technicianName || '',
              technicianDept: parsed.technicianDept || '',
              validatorName: parsed.validatorName || '',
              validatorDept: parsed.validatorDept || '',
              headerLeftLogo: null,
              headerRightLogo: null,
              watermarkImage: null,
              technicianSignature: null,
              validatorSignature: null,
            });
            
            // Apply cached images
            if (parsed.images) {
              console.log('🖼️ Applying cached images:', {
                headerLeftLogo: parsed.images.headerLeftLogo ? '✅ exists' : '❌ null',
                headerRightLogo: parsed.images.headerRightLogo ? '✅ exists' : '❌ null',
                watermarkImage: parsed.images.watermarkImage ? '✅ exists' : '❌ null',
                technicianSignature: parsed.images.technicianSignature ? '✅ exists' : '❌ null',
                validatorSignature: parsed.images.validatorSignature ? '✅ exists' : '❌ null',
              });
              setImageBase64({
                headerLeftLogo: parsed.images.headerLeftLogo || null,
                headerRightLogo: parsed.images.headerRightLogo || null,
                watermarkImage: parsed.images.watermarkImage || null,
                technicianSignature: parsed.images.technicianSignature || null,
                validatorSignature: parsed.images.validatorSignature || null,
              });
            } else {
              console.log('⚠️ No images found in cache');
            }
            
            setPdfSettingsLoaded(true);
            setPdfSettingsLoading(false);
            console.log('✅ PDF settings loaded from cache successfully');
            return; // Don't make API call if cache exists
          } catch (e) {
            console.warn('⚠️ Failed to parse cached settings, will fetch from API');
            localStorage.removeItem(PDF_SETTINGS_CACHE_KEY);
          }
        }

        // Step 2: No cache - fetch from API
        console.log('🔵 No cache found, fetching from API...');
        
        // Wait for token to be available (with retry)
        let token = authService.getAccessToken();
        let retryCount = 0;
        const maxRetries = 5;
        const retryDelay = 500;
        
        while (!token && retryCount < maxRetries) {
          console.log(`🔄 Token not available, retry ${retryCount + 1}/${maxRetries}...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          token = authService.getAccessToken();
          retryCount++;
        }

        if (!token) {
          console.warn('⚠️ No auth token available, skipping settings fetch');
          if (isMounted) setPdfSettingsLoading(false);
          return;
        }

        const API_BASE = ENV.API_BASE_URL;
        const response = await fetch(`${API_BASE}/api/EnhancedAuditReports/export-settings`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!isMounted) return;

        if (response.ok) {
          const responseData = await response.json();
          console.log('✅ Loaded PDF settings from server:', responseData);

          const savedSettings = responseData.data || responseData;
          const hasSettings = responseData.hasSettings === true;

          if (hasSettings && savedSettings) {
            const formSettings = {
              reportTitle: savedSettings.reportTitle || savedSettings.ReportTitle || defaultPdfSettings.reportTitle,
              headerText: savedSettings.headerText || savedSettings.HeaderText || defaultPdfSettings.headerText,
              technicianName: savedSettings.technicianName || savedSettings.TechnicianName || '',
              technicianDept: savedSettings.technicianDept || savedSettings.TechnicianDept || '',
              validatorName: savedSettings.validatorName || savedSettings.ValidatorName || '',
              validatorDept: savedSettings.validatorDept || savedSettings.ValidatorDept || '',
            };
            
            const imageSettings = {
              headerLeftLogo: savedSettings.headerLeftLogoBase64 || savedSettings.HeaderLeftLogoBase64 || null,
              headerRightLogo: savedSettings.headerRightLogoBase64 || savedSettings.HeaderRightLogoBase64 || null,
              watermarkImage: savedSettings.watermarkImageBase64 || savedSettings.WatermarkImageBase64 || null,
              technicianSignature: savedSettings.technicianSignatureBase64 || savedSettings.TechnicianSignatureBase64 || null,
              validatorSignature: savedSettings.validatorSignatureBase64 || savedSettings.ValidatorSignatureBase64 || null,
            };

            // Apply to state
            if (isMounted) {
              setPdfFormData({
                ...formSettings,
                headerLeftLogo: null,
                headerRightLogo: null,
                watermarkImage: null,
                technicianSignature: null,
                validatorSignature: null,
              });
              
              setImageBase64(imageSettings);
              setPdfSettingsLoaded(true);
              
              // Save to cache for future use
              const cacheData = {
                ...formSettings,
                images: imageSettings,
                cachedAt: Date.now(),
              };
              localStorage.setItem(PDF_SETTINGS_CACHE_KEY, JSON.stringify(cacheData));
              console.log('✅ PDF settings cached to localStorage');
            }
          } else {
            console.log('ℹ️ No saved settings found on server - using defaults');
          }
        } else {
          console.warn('⚠️ Failed to load settings from server:', response.status);
        }
      } catch (error) {
        console.warn('⚠️ Could not load PDF settings:', error);
      } finally {
        if (isMounted) setPdfSettingsLoading(false);
      }
    };

    loadSavedSettings();

    return () => {
      isMounted = false;
    };
  }, []);


  // Save PDF settings to API using FormData (server expects multipart/form-data)
  const savePdfSettingsToServer = useCallback(async (): Promise<boolean> => {
    try {
      const API_BASE = ENV.API_BASE_URL;

      // Build FormData for server
      const formData = new FormData();
      formData.append('reportTitle', pdfFormData.reportTitle);
      formData.append('headerText', pdfFormData.headerText);
      formData.append('technicianName', pdfFormData.technicianName);
      formData.append('technicianDept', pdfFormData.technicianDept);
      formData.append('validatorName', pdfFormData.validatorName);
      formData.append('validatorDept', pdfFormData.validatorDept);
      
      // Include base64 images if available
      if (imageBase64.headerLeftLogo) {
        formData.append('headerLeftLogoBase64', imageBase64.headerLeftLogo);
      }
      if (imageBase64.headerRightLogo) {
        formData.append('headerRightLogoBase64', imageBase64.headerRightLogo);
      }
      if (imageBase64.watermarkImage) {
        formData.append('watermarkImageBase64', imageBase64.watermarkImage);
      }
      if (imageBase64.technicianSignature) {
        formData.append('technicianSignatureBase64', imageBase64.technicianSignature);
      }
      if (imageBase64.validatorSignature) {
        formData.append('validatorSignatureBase64', imageBase64.validatorSignature);
      }

      console.log('🔵 Saving PDF settings to server with FormData');

      const response = await fetch(`${API_BASE}/api/EnhancedAuditReports/export-settings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authService.getAccessToken()}`,
          // Don't set Content-Type - browser will set it automatically with boundary for FormData
        },
        body: formData,
      });

      if (response.ok) {
        console.log('✅ PDF settings saved to server successfully');
        setPdfSettingsLoaded(true);
        
        // Update localStorage cache with new settings
        try {
          const cacheData = {
            reportTitle: pdfFormData.reportTitle,
            headerText: pdfFormData.headerText,
            technicianName: pdfFormData.technicianName,
            technicianDept: pdfFormData.technicianDept,
            validatorName: pdfFormData.validatorName,
            validatorDept: pdfFormData.validatorDept,
            images: {
              headerLeftLogo: imageBase64.headerLeftLogo,
              headerRightLogo: imageBase64.headerRightLogo,
              watermarkImage: imageBase64.watermarkImage,
              technicianSignature: imageBase64.technicianSignature,
              validatorSignature: imageBase64.validatorSignature,
            },
            cachedAt: Date.now(),
          };
          console.log('🖼️ Saving images to cache:', {
            headerLeftLogo: imageBase64.headerLeftLogo ? `✅ exists (${(imageBase64.headerLeftLogo.length / 1024).toFixed(1)}KB)` : '❌ null',
            headerRightLogo: imageBase64.headerRightLogo ? `✅ exists (${(imageBase64.headerRightLogo.length / 1024).toFixed(1)}KB)` : '❌ null',
            watermarkImage: imageBase64.watermarkImage ? `✅ exists (${(imageBase64.watermarkImage.length / 1024).toFixed(1)}KB)` : '❌ null',
            technicianSignature: imageBase64.technicianSignature ? `✅ exists (${(imageBase64.technicianSignature.length / 1024).toFixed(1)}KB)` : '❌ null',
            validatorSignature: imageBase64.validatorSignature ? `✅ exists (${(imageBase64.validatorSignature.length / 1024).toFixed(1)}KB)` : '❌ null',
          });
          
          const cacheString = JSON.stringify(cacheData);
          console.log(`📦 Total cache size: ${(cacheString.length / 1024).toFixed(1)}KB`);
          
          localStorage.setItem(PDF_SETTINGS_CACHE_KEY, cacheString);
          
          // Verify cache was saved
          const verifyCache = localStorage.getItem(PDF_SETTINGS_CACHE_KEY);
          if (verifyCache) {
            const verified = JSON.parse(verifyCache);
            console.log('✅ Cache verified - images present:', {
              headerLeftLogo: !!verified.images?.headerLeftLogo,
              headerRightLogo: !!verified.images?.headerRightLogo,
              watermarkImage: !!verified.images?.watermarkImage,
              technicianSignature: !!verified.images?.technicianSignature,
              validatorSignature: !!verified.images?.validatorSignature,
            });
          } else {
            console.error('❌ Cache verification failed - cache not found after save!');
          }
        } catch (e) {
          console.error('❌ Failed to update cache:', e);
          // If localStorage is full, try to clear old data and retry
          if (e instanceof DOMException && e.name === 'QuotaExceededError') {
            console.warn('⚠️ localStorage quota exceeded, clearing old caches...');
            localStorage.removeItem('pdfImageSettings'); // Remove old key
            try {
              const cacheData = {
                reportTitle: pdfFormData.reportTitle,
                headerText: pdfFormData.headerText,
                technicianName: pdfFormData.technicianName,
                technicianDept: pdfFormData.technicianDept,
                validatorName: pdfFormData.validatorName,
                validatorDept: pdfFormData.validatorDept,
                images: {
                  headerLeftLogo: imageBase64.headerLeftLogo,
                  headerRightLogo: imageBase64.headerRightLogo,
                  watermarkImage: imageBase64.watermarkImage,
                  technicianSignature: imageBase64.technicianSignature,
                  validatorSignature: imageBase64.validatorSignature,
                },
                cachedAt: Date.now(),
              };
              localStorage.setItem(PDF_SETTINGS_CACHE_KEY, JSON.stringify(cacheData));
              console.log('✅ Cache saved after clearing old data');
            } catch (retryError) {
              console.error('❌ Still failed after clearing old data:', retryError);
            }
          }
        }
        return true;
      } else {
        const errorText = await response.text();
        console.warn('⚠️ Failed to save PDF settings:', response.status, errorText);
        return false;
      }
    } catch (e) {
      console.warn("❌ Failed to save PDF settings:", e);
      return false;
    }
  }, [pdfFormData.reportTitle, pdfFormData.headerText, pdfFormData.technicianName, pdfFormData.technicianDept, pdfFormData.validatorName, pdfFormData.validatorDept, imageBase64]);

  // Handle image file upload - also convert to base64 for persistence
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showError("Invalid File", "Please upload an image file");
      return;
    }

    // Validate file size (max 2MB for localStorage limits)
    if (file.size > 2 * 1024 * 1024) {
      showError("File Too Large", "Image size should be less than 2MB for persistence");
      return;
    }

    // Set File object for current session
    setPdfFormData((prev) => ({ ...prev, [fieldName]: file }));

    // Convert to base64 for localStorage persistence
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      console.log(`🖼️ Image ${fieldName} converted to base64 (${(base64String.length / 1024).toFixed(1)}KB)`);
      
      setImageBase64((prev) => {
        const newState = { ...prev, [fieldName]: base64String };
        
        // Immediately persist to localStorage
        try {
          const existingCache = localStorage.getItem('pdfExportSettingsCache');
          const cacheData = existingCache ? JSON.parse(existingCache) : {
            reportTitle: pdfFormData.reportTitle,
            headerText: pdfFormData.headerText,
            technicianName: pdfFormData.technicianName,
            technicianDept: pdfFormData.technicianDept,
            validatorName: pdfFormData.validatorName,
            validatorDept: pdfFormData.validatorDept,
            images: {},
            cachedAt: Date.now(),
          };
          
          cacheData.images = {
            ...cacheData.images,
            [fieldName]: base64String,
          };
          cacheData.cachedAt = Date.now();
          
          localStorage.setItem('pdfExportSettingsCache', JSON.stringify(cacheData));
          console.log(`✅ Image ${fieldName} persisted to localStorage cache`);
        } catch (e) {
          console.error(`❌ Failed to persist ${fieldName} to cache:`, e);
        }
        
        return newState;
      });
    };
    reader.readAsDataURL(file);

    showSuccess(`${fieldName.replace(/([A-Z])/g, " $1").trim()} selected`);
  };


  // Bulk functions removed - now redirects to /admin/reports/generate

  // Scheduler handler functions
  // const handleSchedulerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setSchedulerData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // Load scheduled reports
  // const loadScheduledReports = async () => {
  //   setLoadingScheduledReports(true);
  //   try {
  //     const userEmail = user?.email || 'unknown';

  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL || "https://api.dsecuretech.com"}/api/ReportScheduler/list/${encodeURIComponent(userEmail)}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${authService.getAccessToken()}`
  //         }
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       setScheduledReports(data.data || []);
  //       console.log('✅ Loaded scheduled reports:', data.data?.length || 0);
  //     } else {
  //       console.warn('⚠️ Failed to load scheduled reports:', response.status);
  //       setScheduledReports([]);
  //     }
  //   } catch (error) {
  //     console.error('❌ Error loading scheduled reports:', error);
  //     setScheduledReports([]);
  //   } finally {
  //     setLoadingScheduledReports(false);
  //   }
  // };

  // Delete scheduled report
  // const handleDeleteScheduledReport = async (scheduleId: string) => {
  //   if (!window.confirm('Are you sure you want to delete this scheduled report?')) {
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL || "https://api.dsecuretech.com"}/api/ReportScheduler/${scheduleId}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           'Authorization': `Bearer ${authService.getAccessToken()}`
  //         }
  //       }
  //     );

  //     if (response.ok) {
  //       showSuccess('Schedule Deleted', 'Scheduled report has been deleted successfully');
  //       loadScheduledReports(); // Refresh the list
  //     } else {
  //       showError('Delete Failed', 'Failed to delete scheduled report');
  //     }
  //   } catch (error) {
  //     console.error('❌ Error deleting scheduled report:', error);
  //     showError('Delete Failed', 'Failed to delete scheduled report');
  //   }
  // };

  // Toggle schedule active status
  // const handleToggleSchedule = async (scheduleId: string, currentStatus: boolean) => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL || "https://api.dsecuretech.com"}/api/ReportScheduler/${scheduleId}/toggle`,
  //       {
  //         method: 'PATCH',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${authService.getAccessToken()}`
  //         },
  //         body: JSON.stringify({ isActive: !currentStatus })
  //       }
  //     );

  //     if (response.ok) {
  //       const statusText = !currentStatus ? 'activated' : 'deactivated';
  //       showSuccess('Schedule Updated', `Scheduled report has been ${statusText}`);
  //       loadScheduledReports(); // Refresh the list
  //     } else {
  //       showError('Update Failed', 'Failed to update schedule status');
  //     }
  //   } catch (error) {
  //     console.error('❌ Error toggling schedule:', error);
  //     showError('Update Failed', 'Failed to update schedule status');
  //   }
  // };

  // Open scheduled reports modal
  // const handleViewScheduledReports = () => {
  //   setShowScheduledReportsModal(true);
  //   loadScheduledReports();
  // };

  // const handleScheduleReport = async () => {
  //   // Validation
  //   if (!schedulerData.reportName.trim()) {
  //     showError('Validation Error', 'Please enter a report name');
  //     return;
  //   }

  //   // Skip date/time validation for immediate execution
  //   if (schedulerData.scheduleType !== 'immediate') {
  //     if (!schedulerData.scheduleDate || !schedulerData.scheduleTime) {
  //       showError('Validation Error', 'Please select date and time');
  //       return;
  //     }

  //     const scheduleDateTime = new Date(`${schedulerData.scheduleDate}T${schedulerData.scheduleTime}`);
  //     const now = new Date();

  //     if (scheduleDateTime <= now) {
  //       showError('Invalid Date/Time', 'Scheduled time must be in the future');
  //       return;
  //     }
  //   }

  //   try {
  //     // For immediate execution, use current time + 1 minute
  //     const scheduleDateTime = schedulerData.scheduleType === 'immediate'
  //       ? new Date(Date.now() + 60000) // Add 1 minute to current time
  //       : new Date(`${schedulerData.scheduleDate}T${schedulerData.scheduleTime}`);

  //     showInfo('Creating Schedule...', 'Processing your scheduled report request');

  //     // Get user email for created by field
  //     const userEmail = user?.email || 'unknown';

  //     // Prepare scheduler payload for API
  //     const schedulerPayload = {
  //       scheduleName: schedulerData.reportName,
  //       scheduleType: schedulerData.scheduleType, // 'once', 'daily', 'weekly', 'monthly'
  //       scheduledDateTime: scheduleDateTime.toISOString(),
  //       isActive: true,
  //       reportConfiguration: {
  //         // Include selected report IDs if any are selected
  //         reportIds: selectedReportIds.size > 0 ? Array.from(selectedReportIds) : [],
  //         // Include current filters if enabled
  //         filters: schedulerData.includeFilters ? {
  //           status: schedulerData.filterStatus || null,
  //           department: schedulerData.filterDepartment || null,
  //           dateRange: dateFilter || null,
  //           eraserMethod: eraserMethodFilter || null,
  //           deviceRange: deviceRangeFilter || null,
  //           searchQuery: query || null
  //         } : null,
  //         // Email configuration
  //         emailSettings: {
  //           recipients: schedulerData.emailRecipients
  //             ? schedulerData.emailRecipients.split(',').map(email => email.trim()).filter(email => email)
  //             : [userEmail], // Default to user's email if no recipients specified
  //           includeZipDownload: true,
  //           includeIndividualPdfs: selectedReportIds.size > 0,
  //           emailSubject: `Scheduled Report: ${schedulerData.reportName}`,
  //           emailTemplate: 'default'
  //         }
  //       },
  //       metadata: {
  //         createdBy: userEmail,
  //         createdAt: new Date().toISOString(),
  //         reportCount: selectedReportIds.size > 0 ? selectedReportIds.size : filtered.length,
  //         scheduleSource: 'admin-reports-dashboard'
  //       }
  //     };

  //     console.log('📅 Scheduling report with payload:', JSON.stringify(schedulerPayload, null, 2));

  //     // Call Report Scheduler API
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL || "https://api.dsecuretech.com"}/api/ReportScheduler/create`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${authService.getAccessToken()}`
  //         },
  //         body: JSON.stringify(schedulerPayload)
  //       }
  //     );

  //     console.log('📥 Scheduler API Response status:', response.status);

  //     if (!response.ok) {
  //       let errorMessage = `HTTP error! status: ${response.status}`;
  //       try {
  //         const errorData = await response.json();
  //         console.error('❌ Scheduler API error response:', errorData);
  //         errorMessage = errorData.message || errorData.error || errorMessage;
  //       } catch (e) {
  //         console.error('❌ Could not parse scheduler error response');
  //       }
  //       throw new Error(errorMessage);
  //     }

  //     const responseData = await response.json();
  //     console.log('✅ Scheduler created successfully:', responseData);

  //     // Show success message with schedule details
  //     const recipientCount = schedulerData.emailRecipients
  //       ? schedulerData.emailRecipients.split(',').length
  //       : 1;

  //     if (schedulerData.scheduleType === 'immediate') {
  //       showSuccess(
  //         'Report Execution Started',
  //         `"${schedulerData.reportName}" is being processed now. Email notifications will be sent to ${recipientCount} recipient(s) when complete.`
  //       );
  //     } else {
  //       const scheduleTypeText = schedulerData.scheduleType === 'once' ? 'one time' : schedulerData.scheduleType;
  //       showSuccess(
  //         'Report Scheduled Successfully',
  //         `"${schedulerData.reportName}" scheduled for ${scheduleDateTime.toLocaleString()} (${scheduleTypeText}). Email notifications will be sent to ${recipientCount} recipient(s).`
  //       );
  //     }

  //     // Reset form and close modal
  //     setSchedulerData({
  //       reportName: '',
  //       scheduleType: 'once',
  //       scheduleDate: '',
  //       scheduleTime: '',
  //       reportIds: [],
  //       emailRecipients: '',
  //       includeFilters: false,
  //       filterStatus: '',
  //       filterDepartment: '',
  //     });
  //     setSelectedReportIds(new Set()); // Clear selected reports
  //     setShowSchedulerModal(false);

  //   } catch (error) {
  //     console.error('❌ Error scheduling report:', error);
  //     showError(
  //       'Scheduling Failed',
  //       `Failed to schedule report. ${error instanceof Error ? error.message : "Please try again."}`
  //     );
  //   }
  // };

  // Load reports data on component mount and when filters change
  useEffect(() => {
    loadReportsData();
  }, [subuserFilter, query, statusFilter, fromDate, toDate, reportTypeFilter, groupFilter]);

  const loadReportsData = async () => {
    setLoading(true);

    // 🎮 Demo Mode Check - Show static data only
    if (isDemoMode()) {
      // console.log('🎮 Demo Mode Active - Using static audit reports data')
      // Map DEMO_AUDIT_REPORTS to AdminReport format
      let demoReports = DEMO_AUDIT_REPORTS.map(report => ({
        id: report.report_id,
        report_id: report.report_id,
        date: report.report_date,
        report_date: report.report_date,
        serial_number: report.serial_number,
        make: report.make,
        model: report.model,
        erasure_method: report.erasure_method,
        verification_status: report.verification_status,
        certificate_url: '',
        user_email: report.user_email,
        status: report.verification_status === 'Verified' ? 'completed' : 'pending',
        method: report.erasure_method,
        _raw: report,
        _details: report
      }))

      // Apply subuser filter in demo mode
      if (subuserFilter && subuserFilter !== "all") {
        demoReports = demoReports.filter((r: any) => r.user_email === subuserFilter)
      }

      setAllRows(demoReports as any)
      setLoading(false)
      return
    }

    // ✅ Generate cache key based on filters
    const cacheKey = `reports_${JSON.stringify({
      subuser: subuserFilter,
      query,
      status: statusFilter,
      from: fromDate,
      to: toDate,
      type: reportTypeFilter,
      group: groupFilter
    })}`;

    // ✅ Check cache first for instant display with filter-specific key
    const cachedReports = getCachedData(cacheKey);
    if (cachedReports && cachedReports.length > 0) {
      console.log("⚡ Displaying cached reports data for filters:", cacheKey);
      setAllRows(cachedReports);
      setLoading(false); // Hide loader since we have cached data
    }

    try {
      // Get user email - EXACT SAME PATTERN AS AdminDashboard & AdminMachines
      // 1. Try localStorage 'user_data' key (not 'dsecure_user_data')
      let storedUserData = null;
      const storedUser = localStorage.getItem("user_data");
      const authUser = localStorage.getItem("authUser");

      if (storedUser) {
        try {
          storedUserData = JSON.parse(storedUser);
          // console.log("💾 Parsed user_data from localStorage:", storedUserData);
        } catch (e) {
          console.error("Error parsing user_data:", e);
        }
      }

      if (!storedUserData && authUser) {
        try {
          storedUserData = JSON.parse(authUser);
          // console.log("💾 Parsed authUser from localStorage:", storedUserData);
        } catch (e) {
          console.error("Error parsing authUser:", e);
        }
      }

      // 2. Get user from JWT token
      const user = authService.getUserFromToken();
      // console.log("👤 User from token:", user);

      // 3. PRIORITY: Use user_email from localStorage user_data, then from token
      const userEmail =
        storedUserData?.user_email || user?.user_email || user?.email;
      // console.log("📧 Final userEmail for reports:", userEmail);

      if (!userEmail) {
        console.error("❌ No user email found");
        showError(
          "Authentication Error",
          "No user email found. Please login again."
        );
        setAllRows([]);
        setLoading(false);
        return;
      }

      // ✅ Determine which email to use based on subuserFilter
      let targetEmail = userEmail;
      if (subuserFilter && subuserFilter !== "all") {
        targetEmail = subuserFilter;
      }

      // ✅ Build filters object for new API endpoint
      const filters: any = {
        userEmail: targetEmail,
      };

      // Apply all active filters
      if (query) filters.search = query;
      if (statusFilter) filters.status = statusFilter;
      if (fromDate) filters.dateFrom = fromDate;
      if (toDate) filters.dateTo = toDate;
      if (reportTypeFilter) filters.reportType = reportTypeFilter;
      if (groupFilter) filters.groupName = groupFilter;

      // ✅ Generate cache key based on filters
      const cacheKey = `reports_${JSON.stringify({
        email: targetEmail,
        subuser: subuserFilter,
        query,
        status: statusFilter,
        from: fromDate,
        to: toDate,
        type: reportTypeFilter,
        group: groupFilter
      })}`;

      console.log("📋 Fetching filtered reports with:", filters);

      // ✅ Use new filtered endpoint (single API call instead of multiple)
      const response = await apiClient.getFilteredAuditReports(filters);
      console.log("📋 Respone of api filtered reports:", response.data);
      let uniqueReports: any[] = [];
      if (response.success && response.data) {
        // ✅ Handle new response format: { filters, totalReports, reports: [...] }
        const responseData = response.data as any;
        if (responseData.reports && Array.isArray(responseData.reports)) {
          uniqueReports = responseData.reports;
          console.log(`📊 Total Reports: ${responseData.totalReports}, Pages: ${responseData.totalPages}`);
        } else {
          // Fallback for old format (direct array)
          uniqueReports = Array.isArray(response.data) ? response.data : [response.data];
        }
      }

      // Handle "all" subusers - fetch for all subusers and combine
      if (subuserFilter === "all" && subusersData.length > 0) {
        const subuserPromises = subusersData.map((s: any) =>
          apiClient.getFilteredAuditReports({ ...filters, userEmail: s.subuser_email })
        );
        const subuserResults = await Promise.all(subuserPromises);
        console.log('📥 Fetched reports for all subusers:', subuserResults);
        subuserResults.forEach((res) => {
          if (res.success && res.data) {
            // Handle new response format
            const resData = res.data as any;
            const reportsArray = resData.reports && Array.isArray(resData.reports)
              ? resData.reports
              : (Array.isArray(res.data) ? res.data : [res.data]);
            uniqueReports = [...uniqueReports, ...reportsArray];
          }
        });

        // Remove duplicates based on report_id
        uniqueReports = Array.from(
          new Map(uniqueReports.map(report => [report.report_id || report.id, report])).values()
        );
      }

      console.log("📥 Filtered Reports:", uniqueReports.length);

      if (uniqueReports.length > 0) {
        // console.log("✅ Audit reports fetched:", uniqueReports.length);

        // If no reports found
        if (uniqueReports.length === 0) {
          // console.log("ℹ️ No audit reports found");
          showInfo("No Reports", "No audit reports found.");
          setAllRows([]);
          setLoading(false);
          return;
        }

        // console.log("🔄 Processing reports with report_details_json...");

        // Process each report
        const processedReports = uniqueReports.map((report: any) => {
          let reportDetails: any = {};
          let deviceCount = 1;

          // Parse report_details_json (JSON string from backend)
          if (report.report_details_json) {
            try {
              reportDetails = JSON.parse(report.report_details_json);
              // Debug: Log group information from report
              if (groupFilter) {
                console.log('🔍 Report Group Info:', {
                  reportId: report.report_id,
                  rawGroup: report.group,
                  rawGroupName: report.groupName,
                  rawGroupId: report.group_id,
                  detailsGroup: reportDetails.group,
                  detailsGroupName: reportDetails.groupName,
                  detailsGroupId: reportDetails.group_id,
                  selectedFilter: groupFilter
                });
              }
              console.log("📄 Parsed report_details_json:", reportDetails);

              // Get device count from erasure_log array
              if (
                reportDetails.erasure_log &&
                Array.isArray(reportDetails.erasure_log)
              ) {
                deviceCount = reportDetails.erasure_log.length;
              }
            } catch (e) {
              console.warn(`⚠️ Failed to parse report_details_json:`, e);
              // console.log("❌ Raw data:", report.report_details_json);
            }
          }

          // Map to table format using fields from report_details_json
          const mappedReport: ExtendedAdminReport = {
            id:
              reportDetails?.report_id?.toString() || report.report_id || "N/A",

            date: reportDetails?.datetime
              ? new Date(reportDetails.datetime).toISOString().split("T")[0]
              : report.report_datetime
              ? new Date(report.report_datetime).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0],

            devices: deviceCount,

            status: reportDetails?.status?.toLowerCase() || report.status?.toLowerCase() || "completed",

            department:
              reportDetails?.department ||
              reportDetails?.technician_dept ||
              report.department ||
              "IT",

            method:
              reportDetails?.eraser_method ||
              reportDetails?.erasure_method ||
              report.erasure_method ||
              "N/A",
            
            // ✅ Add email field for filtering (API uses client_email)
            email: report.client_email || report.user_email || reportDetails?.user_email,
            user: report.client_email || report.user_email || reportDetails?.user_email,

            // ✅ Store group information from report for filtering
            group: report.groupName || report.group || reportDetails?.groupName || reportDetails?.group,
            groupName: report.groupName || report.group || reportDetails?.groupName || reportDetails?.group,

            // New fields from report_details_json
            reportType:
              reportDetails?.erasure_type ||
              reportDetails?.Erasure_Type ||
              report.erasure_type ||
              reportDetails?.erasure_type ||
              "File and Folder",

            totalFiles:
              reportDetails?.total_files ??
              reportDetails?.totalFiles ??
              reportDetails?.file_count ??
              0,

            erasedFiles:
              reportDetails?.erased_files ??
              reportDetails?.erasedFiles ??
              reportDetails?.files_erased ??
              0,

            failedFiles:
              reportDetails?.failed_files ??
              reportDetails?.failedFiles ??
              reportDetails?.files_failed ??
              0,

            successFiles:
              reportDetails?.success_files ??
              reportDetails?.successFiles ??
              reportDetails?.files_success ??
              0,

            _raw: report,
            _details: reportDetails,
          };

          console.log("✅ Mapped:", mappedReport);
          return mappedReport;
        });

        // ✅ RBAC FILTERING: Apply role-based filtering BEFORE setting state
        // MACHINE TRANSFER LOGIC:
        // - When a machine is transferred via AdminMachines, it's reassigned to new user/subuser
        // - All reports with matching MAC address (from report_details_json or mac_address column)
        //   automatically become visible to the new machine owner
        // - This ensures report ownership follows machine ownership
        let filteredReports = processedReports
        
        // SubUser: Show reports if email matches OR machine MAC address matches
        if (isSubUser) {
          filteredReports = processedReports.filter((report: ExtendedAdminReport) => {
            // Check email match (original report creator)
            const emailMatch = (report as any).email === currentUserEmail || (report as any).user === currentUserEmail;
            
            // Check MAC address match from report_details_json or mac_address column
            // This allows transferred machines' reports to appear
            const reportMacAddress = report._details?.mac_address?.toLowerCase().trim() || 
                                   report._raw?.mac_address?.toLowerCase().trim();
            const macMatch = reportMacAddress && userMacAddresses.some(userMac => 
              userMac === reportMacAddress
            );
            
            return emailMatch || macMatch;
          })
          // console.log(`🔒 SubUser Filter: ${processedReports.length} → ${filteredReports.length} reports (Email or MAC match)`)
        }
        // GroupAdmin: Show reports if group matches OR email matches OR machine MAC address matches
        else if (isGroupAdmin && currentUserGroupId) {
          filteredReports = processedReports.filter((report: ExtendedAdminReport) => {
            const reportGroupId = report._details?.group_id || report._details?.groupId || report._raw?.group_id
            const groupMatch = reportGroupId === currentUserGroupId;
            const emailMatch = (report as any).email === currentUserEmail;
            
            // Check MAC address match from report_details_json or mac_address column
            // This allows transferred machines' reports to appear
            const reportMacAddress = report._details?.mac_address?.toLowerCase().trim() || 
                                   report._raw?.mac_address?.toLowerCase().trim();
            const macMatch = reportMacAddress && userMacAddresses.some(userMac => 
              userMac === reportMacAddress
            );
            
            return groupMatch || emailMatch || macMatch;
          })
          // console.log(`🔒 GroupAdmin Filter: ${processedReports.length} → ${filteredReports.length} reports (Group, Email, or MAC match)`)
        }
        // SuperAdmin: No filtering - sees all reports
        console.log("final reports to show in table :", filteredReports);
        setAllRows(filteredReports);
        // ✅ Cache all filtered data with filter-specific key
        console.log("💾 Caching filtered reports with key:", cacheKey);
        setCachedData(cacheKey, filteredReports);
      } else {
        showInfo("No Reports", "No audit reports found.");
        setAllRows([]);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      showError("Error", "Failed to load reports.");
      setAllRows([]);
    } finally {
      setLoading(false);
    }
  };

  const uniqueStatuses = useMemo(
    () => [...new Set(allRows.map((r) => r.status))],
    [allRows]
  );
  const uniqueEraserMethods = useMemo(
    () => [...new Set(allRows.map((r) => r.method).filter(Boolean))],
    [allRows]
  );
  const uniqueReportTypes = useMemo(
    () => [...new Set(allRows.map((r) => r.reportType).filter(Boolean))],
    [allRows]
  );
  
  // ✅ Use groups from API (same as AdminGroups) instead of extracting from reports
  // Sort groups alphabetically for better UX
  const uniqueGroups = useMemo(
    () => {
      if (!groupsData || groupsData.length === 0) return [];
      
      // Extract groupName from API response (same structure as AdminGroups)
      const groups = groupsData
        .map((g: any) => g.groupName || g.name)
        .filter(Boolean);
      
      // Sort alphabetically
      return groups.sort((a: string, b: string) => a.localeCompare(b));
    },
    [groupsData]
  );

  const filtered = useMemo(() => {
    // ✅ NO CLIENT-SIDE FILTERING - API already filters everything correctly
    // All filtering (query, status, date range, eraser method, device range, report type, group) 
    // is handled by the API endpoint with proper database relationships
    
    /* COMMENTED OUT - Client-side filtering removed (API handles all filtering):
    let result = allRows.filter((r) => {
      const matchesQuery =
        String(r.id || "")
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        String(r.department || "")
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesStatus = !statusFilter || r.status === statusFilter;

      // Date range filtering with format validation
      let matchesDateRange = true;
      if (fromDate || toDate) {
        const reportDate = new Date(r.date);

        if (fromDate && toDate) {
          // Validate both dates
          if (isValidDateFormat(fromDate) && isValidDateFormat(toDate)) {
            const fromDateTime = new Date(fromDate);
            const toDateTime = new Date(toDate);
            toDateTime.setHours(23, 59, 59, 999); // Include the entire end date
            matchesDateRange = reportDate >= fromDateTime && reportDate <= toDateTime;
          }
        } else if (fromDate) {
          // Validate from date
          if (isValidDateFormat(fromDate)) {
            const fromDateTime = new Date(fromDate);
            matchesDateRange = reportDate >= fromDateTime;
          }
        } else if (toDate) {
          // Validate to date
          if (isValidDateFormat(toDate)) {
            const toDateTime = new Date(toDate);
            toDateTime.setHours(23, 59, 59, 999); // Include the entire end date
            matchesDateRange = reportDate <= toDateTime;
          }
        }
      }

      const matchesEraserMethod =
        !eraserMethodFilter || r.method === eraserMethodFilter;

      let matchesDeviceRange = true;
      if (deviceRangeFilter) {
        if (deviceRangeFilter === "1-50") {
          matchesDeviceRange = r.devices >= 1 && r.devices <= 50;
        } else if (deviceRangeFilter === "51-100") {
          matchesDeviceRange = r.devices >= 51 && r.devices <= 100;
        } else if (deviceRangeFilter === "101-200") {
          matchesDeviceRange = r.devices >= 101 && r.devices <= 200;
        } else if (deviceRangeFilter === "201-999") {
          matchesDeviceRange = r.devices >= 201;
        }
      }

      // New filters for Report Type and Group
      const matchesReportType =
        !reportTypeFilter || r.reportType === reportTypeFilter;

      return (
        matchesQuery &&
        matchesStatus &&
        matchesDateRange &&
        matchesEraserMethod &&
        matchesDeviceRange &&
        matchesReportType
      );
    });
    */

    // Start with all API-filtered results
    let result = [...allRows];

    // Remove duplicates if requested (UI-only feature)
    if (showUniqueOnly) {
      const seen = new Set();
      result = result.filter((r) => {
        const key = `${r.id}-${r.date}-${r.department}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    // Sort results (UI-only feature)
    result.sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortBy) {
        case "id":
          aVal = String(a.id || "");
          bVal = String(b.id || "");
          break;
        case "date":
          aVal = new Date(a.date);
          bVal = new Date(b.date);
          break;
        case "devices":
          aVal = a.devices || 0;
          bVal = b.devices || 0;
          break;
        case "status":
          aVal = String(a.status || "");
          bVal = String(b.status || "");
          break;
        case "department":
          aVal = String(a.department || "");
          bVal = String(b.department || "");
          break;
        default:
          aVal = String(a.id || "");
          bVal = String(b.id || "");
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return result;
  }, [
    allRows,
    // Removed filter dependencies - API handles all filtering
    // query, statusFilter, fromDate, toDate, eraserMethodFilter, 
    // deviceRangeFilter, reportTypeFilter, groupFilter,
    showUniqueOnly,
    sortBy,
    sortOrder,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const clearAllFilters = () => {
    setQuery("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    setEraserMethodFilter("");
    setDeviceRangeFilter("");
    setReportTypeFilter("");
    setGroupFilter("");
    setShowUniqueOnly(false);
    setDateValidationError("");
    setSubuserFilter(""); // Reset subuser filter
    setPage(1);
  };

  // Action functions
  // const handleViewReport = async (report: AdminReport) => {
  //   showInfo(`Opening report ${report.id}`);
  //   // Additional view logic can be added here
  // };

  const handleDownloadReport = async (report: ExtendedAdminReport) => {
    try {
      showInfo(`Preparing PDF download for report ${report.id}...`);

      // Get the raw report data and parsed details
      const rawReport = report._raw;
      const reportDetails = report._details;

      if (!rawReport || !rawReport.report_id) {
        showError("Download Failed", "Report data not available");
        return;
      }

      // console.log("📄 Report details for PDF:", reportDetails);

      // Extract all fields from report_details_json for PDF generation
      const pdfPayload = {
        reportData: {
          // Required fields from report_details_json
          report_id:
            reportDetails?.report_id?.toString() || rawReport.report_id || "",
          datetime: reportDetails?.datetime || new Date().toISOString(),
          software_name: reportDetails?.software_name || "D-SecureErase",
          product_version: reportDetails?.product_version || "1.0",
          digital_signature: reportDetails?.digital_signature || "",
          status: reportDetails?.status || "Completed",
          process_mode: reportDetails?.process_mode || "Standard",
          os: reportDetails?.os || "",
          os_version: reportDetails?.os_version || "",
          computer_name: reportDetails?.computer_name || "Unknown",
          mac_address: reportDetails?.mac_address || "",
          manufacturer: reportDetails?.manufacturer || "",
          Eraser_Start_Time:
            reportDetails?.Eraser_Start_Time ||
            reportDetails?.eraser_start_time ||
            "",
          Eraser_End_Time:
            reportDetails?.Eraser_End_Time ||
            reportDetails?.eraser_end_time ||
            "",
          eraser_method: reportDetails?.eraser_method || "Secure Erase",
          validation_method: reportDetails?.validation_method || "",
          Erasure_Type:
            reportDetails?.Erasure_Type ||
            reportDetails?.erasure_type ||
            "Full Disk",
          total_files: reportDetails?.total_files || 0,
          erased_files: reportDetails?.erased_files || 0,
          failed_files: reportDetails?.failed_files || 0,
          erasure_log: reportDetails?.erasure_log || [],
        },
        // Optional branding/signature fields
        reportTitle: reportDetails?.report_title || "Data Erasure Audit Report",
        headerText: reportDetails?.header_text || "D-SecureTech",
        headerLeftLogo: reportDetails?.header_left_logo || "",
        headerRightLogo: reportDetails?.header_right_logo || "",
        watermarkImage: reportDetails?.watermark_image || "",
        technicianName: reportDetails?.technician_name || "",
        technicianDept: reportDetails?.technician_dept || "",
        validatorName: reportDetails?.validator_name || "",
        validatorDept: reportDetails?.validator_dept || "",
        technicianSignature: reportDetails?.technician_signature || "",
        validatorSignature: reportDetails?.validator_signature || "",
      };

      // console.log(
      // "📤 Sending PDF payload:",
      // JSON.stringify(pdfPayload, null, 2)
      // );

      // Call the PDF export API endpoint with POST method (to include images from settings)
      const reportId =
        reportDetails?.report_id?.toString() || rawReport.report_id || "";

      // Create FormData for the request
      const submitData = new FormData();

      // Add text fields from pdfFormData (saved in settings modal)
      submitData.append("reportTitle", pdfFormData.reportTitle);
      submitData.append("headerText", pdfFormData.headerText);
      submitData.append("technicianName", pdfFormData.technicianName);
      submitData.append("technicianDept", pdfFormData.technicianDept);
      submitData.append("validatorName", pdfFormData.validatorName);
      submitData.append("validatorDept", pdfFormData.validatorDept);

      // Add file fields if they exist, or use base64 from localStorage
      if (pdfFormData.headerLeftLogo) {
        submitData.append("headerLeftLogo", pdfFormData.headerLeftLogo);
      } else if (imageBase64.headerLeftLogo) {
        submitData.append("headerLeftLogoBase64", imageBase64.headerLeftLogo);
      }

      if (pdfFormData.headerRightLogo) {
        submitData.append("headerRightLogo", pdfFormData.headerRightLogo);
      } else if (imageBase64.headerRightLogo) {
        submitData.append("headerRightLogoBase64", imageBase64.headerRightLogo);
      }

      if (pdfFormData.watermarkImage) {
        submitData.append("watermarkImage", pdfFormData.watermarkImage);
      } else if (imageBase64.watermarkImage) {
        submitData.append("watermarkImageBase64", imageBase64.watermarkImage);
      }

      if (pdfFormData.technicianSignature) {
        submitData.append("technicianSignature", pdfFormData.technicianSignature);
      } else if (imageBase64.technicianSignature) {
        submitData.append("technicianSignatureBase64", imageBase64.technicianSignature);
      }

      if (pdfFormData.validatorSignature) {
        submitData.append("validatorSignature", pdfFormData.validatorSignature);
      } else if (imageBase64.validatorSignature) {
        submitData.append("validatorSignatureBase64", imageBase64.validatorSignature);
      }

      const downloadUrl = `${import.meta.env.VITE_API_BASE_URL ||
        "https://api.dsecuretech.com"}/api/EnhancedAuditReports/${encodeURIComponent(reportId)}/export-pdf-with-settings`;

      console.log('🔵 Download request:', downloadUrl);

      const response = await fetch(downloadUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authService.getAccessToken()}`,
        },
      }
      );

      console.log('🔵 Response status:', response.status, response.statusText);
      console.log('🔵 Content-Type:', response.headers.get('content-type'));

      if (!response.ok) {
        // Try to get error message from response body
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.error("❌ Backend error response:", errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          console.error("❌ Could not parse error response");
        }
        throw new Error(errorMessage);
      }

      // Get the PDF blob
      const blob = await response.blob();
      console.log("✅ PDF blob received, size:", blob.size, "type:", blob.type);

      if (blob.size === 0) {
        throw new Error("Received empty PDF file");
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-report-${report.id}-${report.date}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log("✅ Download triggered for:", a.download);
      showSuccess(`Report ${report.id} downloaded successfully`);
    } catch (error) {
      console.error("Error downloading report:", error);
      showError(
        "Download Failed",
        `Failed to download report. ${error instanceof Error ? error.message : "Please try again."
        }`
      );
    }
  };

  // ✅ Bulk Download Multiple Reports as ZIP
  const handleBulkDownload = async () => {
    if (selectedReportIds.size === 0) {
      showWarning(
        "No Reports Selected",
        "Please select at least one report to download"
      );
      return;
    }

    try {
      showInfo(`Preparing ${selectedReportIds.size} reports for download...`);

      // Import JSZip dynamically
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      // Get selected reports
      const selectedReports = allRows.filter((report) =>
        selectedReportIds.has(String(report.id || ""))
      );

      let successCount = 0;
      let failedCount = 0;

      // Download each report and add to ZIP
      for (const report of selectedReports) {
        try {
          const rawReport = report._raw;
          const reportDetails = report._details;

          if (!rawReport || !rawReport.report_id) {
            console.warn(`Skipping report ${report.id} - no data available`);
            failedCount++;
            continue;
          }

          const reportId =
            reportDetails?.report_id?.toString() || rawReport.report_id || "";

          // Create FormData for the request
          const submitData = new FormData();

          // Add text fields
          submitData.append("reportTitle", pdfFormData.reportTitle);
          submitData.append("headerText", pdfFormData.headerText);
          submitData.append("technicianName", pdfFormData.technicianName);
          submitData.append("technicianDept", pdfFormData.technicianDept);
          submitData.append("validatorName", pdfFormData.validatorName);
          submitData.append("validatorDept", pdfFormData.validatorDept);

          // Add file fields if they exist, or use base64 from localStorage
          if (pdfFormData.headerLeftLogo) {
            submitData.append("headerLeftLogo", pdfFormData.headerLeftLogo);
          } else if (imageBase64.headerLeftLogo) {
            submitData.append("headerLeftLogoBase64", imageBase64.headerLeftLogo);
          }

          if (pdfFormData.headerRightLogo) {
            submitData.append("headerRightLogo", pdfFormData.headerRightLogo);
          } else if (imageBase64.headerRightLogo) {
            submitData.append("headerRightLogoBase64", imageBase64.headerRightLogo);
          }

          if (pdfFormData.watermarkImage) {
            submitData.append("watermarkImage", pdfFormData.watermarkImage);
          } else if (imageBase64.watermarkImage) {
            submitData.append("watermarkImageBase64", imageBase64.watermarkImage);
          }

          if (pdfFormData.technicianSignature) {
            submitData.append("technicianSignature", pdfFormData.technicianSignature);
          } else if (imageBase64.technicianSignature) {
            submitData.append("technicianSignatureBase64", imageBase64.technicianSignature);
          }

          if (pdfFormData.validatorSignature) {
            submitData.append("validatorSignature", pdfFormData.validatorSignature);
          } else if (imageBase64.validatorSignature) {
            submitData.append("validatorSignatureBase64", imageBase64.validatorSignature);
          }

          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL ||
            "https://api.dsecuretech.com"}/api/EnhancedAuditReports/${encodeURIComponent(
              reportId
            )}/export-pdf-with-files`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${authService.getAccessToken()}`,
                // Content-Type header is not needed for FormData, browser sets it automatically with boundary
              },
              body: submitData,
            }
          );

          if (response.ok) {
            const blob = await response.blob();
            const fileName = `audit-report-${report.id}-${report.date}.pdf`;
            zip.file(fileName, blob);
            successCount++;
          } else {
            console.warn(`Failed to download report ${report.id}: ${response.statusText}`);
            // Fallback to regular export if custom fails? No, better to report error
            failedCount++;
          }
        } catch (error) {
          console.error(`Error downloading report ${report.id}:`, error);
          failedCount++;
        }
      }

      if (successCount === 0) {
        showError("Download Failed", "No reports could be downloaded");
        return;
      }

      // Generate ZIP file
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Create download link
      const url = window.URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-reports-${new Date().toISOString().split("T")[0]
        }.zip`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Clear selection and close modal
      setSelectedReportIds(new Set());
      // setShowBulkSettingsModal(false); // Handled by caller

      if (failedCount > 0) {
        showWarning(
          "Partial Success",
          `Downloaded ${successCount} reports. ${failedCount} failed.`
        );
      } else {
        showSuccess(`Successfully downloaded ${successCount} reports as ZIP`);
      }
    } catch (error) {
      console.error("Error creating ZIP:", error);
      showError(
        "Download Failed",
        "Failed to create ZIP file. Please try again."
      );
    }
  };

  // Bulk customization function
  // handleBulkCustomization removed - now redirects to /admin/reports/generate

  // ✅ Toggle individual report selection
  const toggleReportSelection = (reportId: string) => {
    const newSelection = new Set(selectedReportIds);
    if (newSelection.has(reportId)) {
      newSelection.delete(reportId);
    } else {
      newSelection.add(reportId);
    }
    // console.log("🔄 Selection updated:", newSelection.size, "reports selected");
    setSelectedReportIds(newSelection);
  };

  // ✅ Toggle all reports on current page
  const toggleSelectAll = (currentPageReports: ExtendedAdminReport[]) => {
    const currentPageIds = currentPageReports.map((r) => String(r.id || ""));
    const allSelected = currentPageIds.every((id) => selectedReportIds.has(id));

    const newSelection = new Set(selectedReportIds);
    if (allSelected) {
      // Deselect all on current page
      currentPageIds.forEach((id) => newSelection.delete(id));
    } else {
      // Select all on current page
      currentPageIds.forEach((id) => newSelection.add(id));
    }
    // console.log(
    // "🔄 Select All updated:",
    // newSelection.size,
    // "reports selected"
    // );
    setSelectedReportIds(newSelection);
  };

  // ✅ Handle preview of selected reports - Opens PDFs in new tabs (supports multiple)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  
  const handlePreviewSelectedReports = async () => {
    if (selectedReportIds.size === 0) {
      showWarning("No Reports Selected", "Please select at least one report to preview");
      return;
    }

    // Prevent multiple clicks while loading
    if (isPreviewLoading) {
      showInfo("Preview is already in progress...");
      return;
    }

    // Limit to prevent browser from blocking too many popups
    const MAX_PREVIEW_TABS = 5;
    const selectedCount = selectedReportIds.size;
    
    if (selectedCount > MAX_PREVIEW_TABS) {
      showWarning(
        "Too Many Reports", 
        `You can preview maximum ${MAX_PREVIEW_TABS} reports at once. You selected ${selectedCount}. Please select fewer reports.`
      );
      return;
    }

    // Get all selected reports
    const selectedReportsArray = allRows.filter(r => 
      selectedReportIds.has(String(r.id || ""))
    );

    if (selectedReportsArray.length === 0) {
      showError("Reports Not Found", "Could not find the selected report data");
      return;
    }

    setIsPreviewLoading(true);
    
    try {
      let successCount = 0;
      let failedCount = 0;

      // Process each report sequentially to avoid overwhelming the browser
      for (const selectedReport of selectedReportsArray) {
        try {
          const rawReport = selectedReport._raw;
          const reportDetails = selectedReport._details;
          const reportId = reportDetails?.report_id?.toString() || rawReport?.report_id || String(selectedReport.id || "");

          if (!reportId) {
            console.warn(`Skipping report - no ID found`);
            failedCount++;
            continue;
          }

          // Create FormData for the request
          const submitData = new FormData();

          // Add text fields
          submitData.append("reportTitle", pdfFormData.reportTitle);
          submitData.append("headerText", pdfFormData.headerText);
          submitData.append("technicianName", pdfFormData.technicianName);
          submitData.append("technicianDept", pdfFormData.technicianDept);
          submitData.append("validatorName", pdfFormData.validatorName);
          submitData.append("validatorDept", pdfFormData.validatorDept);

          // Add file fields if they exist, or use base64 from localStorage
          if (pdfFormData.headerLeftLogo) {
            submitData.append("headerLeftLogo", pdfFormData.headerLeftLogo);
          } else if (imageBase64.headerLeftLogo) {
            submitData.append("headerLeftLogoBase64", imageBase64.headerLeftLogo);
          }

          if (pdfFormData.headerRightLogo) {
            submitData.append("headerRightLogo", pdfFormData.headerRightLogo);
          } else if (imageBase64.headerRightLogo) {
            submitData.append("headerRightLogoBase64", imageBase64.headerRightLogo);
          }

          if (pdfFormData.watermarkImage) {
            submitData.append("watermarkImage", pdfFormData.watermarkImage);
          } else if (imageBase64.watermarkImage) {
            submitData.append("watermarkImageBase64", imageBase64.watermarkImage);
          }

          if (pdfFormData.technicianSignature) {
            submitData.append("technicianSignature", pdfFormData.technicianSignature);
          } else if (imageBase64.technicianSignature) {
            submitData.append("technicianSignatureBase64", imageBase64.technicianSignature);
          }

          if (pdfFormData.validatorSignature) {
            submitData.append("validatorSignature", pdfFormData.validatorSignature);
          } else if (imageBase64.validatorSignature) {
            submitData.append("validatorSignatureBase64", imageBase64.validatorSignature);
          }

          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL || "https://api.dsecuretech.com"}/api/EnhancedAuditReports/${encodeURIComponent(reportId)}/export-pdf-with-files`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${authService.getAccessToken()}`,
              },
              body: submitData,
            }
          );

          if (response.ok) {
            const blob = await response.blob();
            // Create object URL and open in new tab for preview
            const pdfUrl = window.URL.createObjectURL(blob);
            const newTab = window.open(pdfUrl, '_blank');
            
            if (newTab) {
              successCount++;
            } else {
              // Popup was blocked
              console.warn(`Popup blocked for report ${reportId}`);
              failedCount++;
            }
            
            // Small delay between opening tabs to prevent browser blocking
            if (selectedReportsArray.length > 1) {
              await new Promise(resolve => setTimeout(resolve, 300));
            }
          } else {
            const errorText = await response.text();
            console.error(`PDF preview failed for report ${reportId}:`, errorText);
            failedCount++;
          }
        } catch (error) {
          console.error(`Error generating PDF preview for report:`, error);
          failedCount++;
        }
      }

      // Show final result
      if (successCount === 0) {
        showError("Preview Failed", "No PDFs could be opened. Please check if popups are blocked.");
      } else if (failedCount > 0) {
        showWarning("Partial Success", `Opened ${successCount} PDF${successCount > 1 ? 's' : ''}. ${failedCount} failed.`);
      } else {
        showSuccess(`${successCount} PDF${successCount > 1 ? 's' : ''} opened in new tab${successCount > 1 ? 's' : ''}`);
      }
    } catch (error) {
      console.error("Error generating PDF previews:", error);
      showError("Preview Failed", "Failed to generate PDF previews. Please try again.");
    } finally {
      setIsPreviewLoading(false);
    }
  };

  // const handleDeleteReport = async (report: AdminReport) => {
  //   if (
  //     window.confirm(`Are you sure you want to delete report ${report.id}?`)
  //   ) {
  //     try {
  //       const response = await AdminDashboardAPI.deleteAdminReport(report.id);
  //       if (response.success) {
  //         showSuccess(`Report ${report.id} deleted successfully`);
  //         await loadReportsData(); // Refresh the list
  //       } else {
  //         throw new Error(response.error || "Failed to delete report");
  //       }
  //     } catch (error) {
  //       console.error("Error deleting report:", error);
  //       showError(
  //         "Delete Failed",
  //         "Failed to delete report. Please try again."
  //       );
  //     }
  //   }
  // };

  // const handleRegenerateReport = async (report: AdminReport) => {
  //   if (report.status === "pending") {
  //     showWarning(`Report ${report.id} is already being generated`);
  //     return;
  //   }
  //   try {
  //     const response = await AdminDashboardAPI.regenerateReport(report.id);
  //     if (response.success) {
  //       showSuccess(`Regenerating report ${report.id}`);
  //       await loadReportsData(); // Refresh the list
  //     } else {
  //       throw new Error(response.error || "Failed to regenerate report");
  //     }
  //   } catch (error) {
  //     console.error("Error regenerating report:", error);
  //     showError(
  //       "Regenerate Failed",
  //       "Failed to regenerate report. Please try again."
  //     );
  //   }
  // };

  // const handleShareReport = async (report: AdminReport) => {
  //   if (report.status !== "completed") {
  //     showWarning(`Cannot share ${report.id} - report is not completed`);
  //     return;
  //   }
  //   showInfo(`Sharing options for report ${report.id}`);
  //   // Additional sharing logic can be added here
  // };

  // // Open Generate PDF Modal
  // const handleGeneratePDF = (report: ExtendedAdminReport) => {
  //   setSelectedReport(report);
  //   setShowGenerateModal(true);
  // };

  // // Close Generate PDF Modal
  // const closeGenerateModal = () => {
  //   setShowGenerateModal(false);
  //   setSelectedReport(null);
  //   setPdfFormData({
  //     reportTitle: 'Data Erasure Audit Report',
  //     headerText: 'D-SecureTech',
  //     technicianName: '',
  //     technicianDept: '',
  //     validatorName: '',
  //     validatorDept: '',
  //     headerLeftLogo: '',
  //     headerRightLogo: '',
  //     watermarkImage: '',
  //     technicianSignature: '',
  //     validatorSignature: ''
  //   });
  // };

  // Submit Generate PDF with Files
  // const handleSubmitGeneratePDF = async () => {
  //   if (!selectedReport) return;

  //   try {
  //     showInfo(`Generating PDF with custom data for report ${selectedReport.id}...`);

  //     const rawReport = selectedReport._raw;
  //     const reportDetails = selectedReport._details;

  //     if (!rawReport || !rawReport.report_id) {
  //       showError("Generate Failed", "Report data not available");
  //       return;
  //     }

  //     // Build complete payload with form data and report_details_json
  //     const pdfPayload = {
  //       reportData: {
  //         // Required fields from report_details_json
  //         report_id: reportDetails?.report_id?.toString() || rawReport.report_id || "",
  //         datetime: reportDetails?.datetime || new Date().toISOString(),
  //         software_name: reportDetails?.software_name || "D-SecureErase",
  //         product_version: reportDetails?.product_version || "1.0",
  //         digital_signature: reportDetails?.digital_signature || "",
  //         status: reportDetails?.status || "Completed",
  //         process_mode: reportDetails?.process_mode || "Standard",
  //         os: reportDetails?.os || "",
  //         os_version: reportDetails?.os_version || "",
  //         computer_name: reportDetails?.computer_name || "Unknown",
  //         mac_address: reportDetails?.mac_address || "",
  //         manufacturer: reportDetails?.manufacturer || "",
  //         Eraser_Start_Time: reportDetails?.Eraser_Start_Time || reportDetails?.eraser_start_time || "",
  //         Eraser_End_Time: reportDetails?.Eraser_End_Time || reportDetails?.eraser_end_time || "",
  //         eraser_method: reportDetails?.eraser_method || "Secure Erase",
  //         validation_method: reportDetails?.validation_method || "",
  //         Erasure_Type: reportDetails?.Erasure_Type || reportDetails?.erasure_type || "Full Disk",
  //         total_files: reportDetails?.total_files || 0,
  //         erased_files: reportDetails?.erased_files || 0,
  //         failed_files: reportDetails?.failed_files || 0,
  //         erasure_log: reportDetails?.erasure_log || []
  //       },
  //       // User-provided branding/signature fields from form
  //       reportTitle: pdfFormData.reportTitle,
  //       headerText: pdfFormData.headerText,
  //       headerLeftLogo: pdfFormData.headerLeftLogo,
  //       headerRightLogo: pdfFormData.headerRightLogo,
  //       watermarkImage: pdfFormData.watermarkImage,
  //       technicianName: pdfFormData.technicianName,
  //       technicianDept: pdfFormData.technicianDept,
  //       validatorName: pdfFormData.validatorName,
  //       validatorDept: pdfFormData.validatorDept,
  //       technicianSignature: pdfFormData.technicianSignature,
  //       validatorSignature: pdfFormData.validatorSignature
  //     };

  //     console.log("📤 Sending Generate PDF payload:", JSON.stringify(pdfPayload, null, 2));

  //     // Create FormData for multipart/form-data request
  //     const formData = new FormData();

  //     // Add all payload fields as JSON string or individual fields
  //     formData.append('reportData', JSON.stringify(pdfPayload.reportData));
  //     formData.append('reportTitle', pdfPayload.reportTitle);
  //     formData.append('headerText', pdfPayload.headerText);
  //     formData.append('technicianName', pdfPayload.technicianName);
  //     formData.append('technicianDept', pdfPayload.technicianDept);
  //     formData.append('validatorName', pdfPayload.validatorName);
  //     formData.append('validatorDept', pdfPayload.validatorDept);

  //     // Add image fields (URLs or base64)
  //     if (pdfFormData.headerLeftLogo) formData.append('headerLeftLogo', pdfFormData.headerLeftLogo);
  //     if (pdfFormData.headerRightLogo) formData.append('headerRightLogo', pdfFormData.headerRightLogo);
  //     if (pdfFormData.watermarkImage) formData.append('watermarkImage', pdfFormData.watermarkImage);
  //     if (pdfFormData.technicianSignature) formData.append('technicianSignature', pdfFormData.technicianSignature);
  //     if (pdfFormData.validatorSignature) formData.append('validatorSignature', pdfFormData.validatorSignature);

  //     // Call the PDF export API with POST method
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL ||
  //         "https://api.dsecuretech.com"}/api/EnhancedAuditReports/export-pdf-with-files`,
  //       {
  //         method: "POST",
  //         headers: {
  //           // Don't set Content-Type for FormData - browser will set it automatically with boundary
  //           Authorization: `Bearer ${authService.getAccessToken()}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     console.log("📥 Response status:", response.status);

  //     if (!response.ok) {
  //       let errorMessage = `HTTP error! status: ${response.status}`;
  //       try {
  //         const errorData = await response.json();
  //         console.error("❌ Backend error response:", errorData);
  //         errorMessage = errorData.message || errorData.error || errorMessage;
  //       } catch (e) {
  //         console.error("❌ Could not parse error response");
  //       }
  //       throw new Error(errorMessage);
  //     }

  //     // Get the PDF blob
  //     const blob = await response.blob();
  //     console.log("✅ PDF blob received, size:", blob.size);

  //     // Create download link
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = `custom-audit-report-${selectedReport.id}-${selectedReport.date}.pdf`;
  //     document.body.appendChild(a);
  //     a.click();

  //     // Cleanup
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(a);

  //     showSuccess(`Custom PDF for report ${selectedReport.id} generated successfully`);
  //     closeGenerateModal();
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //     showError(
  //       "Generate Failed",
  //       `Failed to generate PDF. ${
  //         error instanceof Error ? error.message : "Please try again."
  //       }`
  //     );
  //   }
  // };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("admin-reports")} />
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/admin/reports" />
        <title>
          DSecureTech Compliance | Data Erasure Standards & Regulations
        </title>
        <meta
          name="description"
          content="D-SecureTech helps businesses meet global data sanitization standards like NIST, ISO 27001, GDPR, HIPAA, PCI DSS, and SOX with verifiable compliance solutions."
        />
        <meta
          name="keywords"
          content="data erasure compliance, NIST 800-88, ISO 27001, GDPR, HIPAA, SOX, PCI DSS, enterprise data destruction, B2B data security"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="space-y-4 xs:space-y-6 sm:space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 xs:p-6 sm:p-6">
        <div className="flex flex-col xs:flex-row sm:flex-row items-start xs:items-center sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-slate-900">
              Audit Reports
            </h1>
            {selectedReportIds.size > 0 && (
              <p className="text-sm text-slate-600 mt-1">
                {selectedReportIds.size} report
                {selectedReportIds.size > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          {/* PDF Settings Button - Always visible outside table */}
          <button
            onClick={() => {
              console.log('🔵 Opening Settings Modal with current pdfFormData:', pdfFormData);
              console.log('🔵 Current imageBase64:', imageBase64);
              console.log('🔵 pdfSettingsLoaded:', pdfSettingsLoaded);
              setShowBulkSettingsModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
            title="Configure PDF Report Settings"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings
          </button>

          {/* Bulk Actions moved to between filter and table */}

          {/* <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
            loading ? 'bg-yellow-100 text-yellow-800' :
            isUsingApi ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              loading ? 'bg-yellow-500' :
              isUsingApi ? 'bg-green-500' : 'bg-blue-500'
            }`}></div>
            <span>
              {loading ? 'Loading...' : 
               isUsingApi ? 'Live Backend Data' : 'Demo Data (AI Generated)'}
            </span>
          </div>
          {error && (
            <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
              API Unavailable: Showing AI demo data
            </div>
          )}
          <button 
            onClick={refetch}
            className="text-xs text-slate-600 hover:text-slate-800 bg-white px-3 py-1 rounded border"
          >
            Refresh
          </button>
        </div> */}
        </div>

        {/* {!loading && !isUsingApi && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800">Demo Mode Active</h3>
              <p className="mt-1 text-sm text-blue-700">
                You're viewing AI-generated demo data for demonstration purposes. 
                Connect to your backend API to see real audit reports from your database.
              </p>
            </div>
          </div>
        </div>
      )} */}

        {/* Advanced Filters */}
        <div className="card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Filters & Search
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 xs:gap-4 sm:gap-4">
            {/* Subuser Filter - Show only if there are subusers */}
            {subusersData && subusersData.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Report Owner
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
                  value={subuserFilter}
                  onChange={(e) => {
                    setSubuserFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">My Reports</option>
                  <option value="all">All Reports (Me + Subusers)</option>
                  <optgroup label="Subuser Reports">
                    {subusersData.map((subuser: any) => (
                      <option key={subuser.subuser_email} value={subuser.subuser_email}>
                        {subuser.subuser_name || subuser.subuser_email}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            )}

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Search
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
                placeholder="Search ID, department"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Status Filter */}
            {/* <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Statuses</option>
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Date Range Filter */}
            <CustomDateInput
              label="From Date"
              value={fromDate}
              onChange={(value) => {
                setFromDate(value);
                setPage(1);

                // Validate date format and range
                if (value && !isValidDateFormat(value)) {
                  setDateValidationError("Invalid date format. Please use YYYY-MM-DD.");
                } else if (value && toDate && new Date(value) > new Date(toDate)) {
                  setDateValidationError("From date cannot be later than To date.");
                } else {
                  setDateValidationError("");
                }
              }}
            />

            {/* To Date Filter */}
            <CustomDateInput
              label="To Date"
              value={toDate}
              onChange={(value) => {
                setToDate(value);
                setPage(1);

                // Validate date format and range
                if (value && !isValidDateFormat(value)) {
                  setDateValidationError("Invalid date format. Please use YYYY-MM-DD.");
                } else if (value && fromDate && new Date(fromDate) > new Date(value)) {
                  setDateValidationError("To date cannot be earlier than From date.");
                } else {
                  setDateValidationError("");
                }
              }}
            />

            {/* Date Validation Error */}
            {dateValidationError && (
              <div className="col-span-5 text-red-500 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
                ⚠️ {dateValidationError}
              </div>
            )}

            {/* Eraser Method Filter */}
            {/* <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Eraser Method
              </label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={eraserMethodFilter}
                onChange={(e) => {
                  setEraserMethodFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Methods</option>
                {uniqueEraserMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Report Type Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Report Type
              </label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={reportTypeFilter}
                onChange={(e) => {
                  setReportTypeFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Types</option>
                {uniqueReportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Group Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Group {uniqueGroups.length > 0 && <span className="text-xs text-slate-500">({uniqueGroups.length})</span>}
              </label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={groupFilter}
                onChange={(e) => {
                  setGroupFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Groups</option>
                {/* <option value="Dotnet">Dotnet</option> */}
                {uniqueGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="uniqueOnly"
                checked={showUniqueOnly}
                onChange={(e) => {
                  setShowUniqueOnly(e.target.checked);
                  setPage(1);
                }}
                className="rounded"
              />
              <label
                htmlFor="uniqueOnly"
                className="text-sm font-medium text-slate-700"
              >
                Show unique records only
              </label>
            </div> */}

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">
                Sort by:
              </label>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as keyof AdminReport)}
              >
                <option value="id">Report ID</option>
                <option value="date">Date</option>
                {/* <option value="devices">Devices</option> */}
                <option value="status">Status</option>
                <option value="department">Method</option>
              </select>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-2 py-1 border rounded text-sm hover:bg-slate-50"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>

            {/* <div className="text-sm text-slate-600">
              Showing {filtered.length} of {allRows.length} users
            </div> */}
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex flex-col xs:flex-row sm:flex-row items-start xs:items-center sm:items-center justify-between gap-4">
          <div>
            {/* <button className="btn-secondary" onClick={() => {navigate("/admin/reports/generate")}}>Setting</button> */}
          </div>
          <div className="flex justify-end gap-2 flex-wrap">
            {/* <button
              className="btn-primary flex items-center gap-2"
              onClick={() => setShowSchedulerModal(true)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Schedule Reports
            </button> */}
            {/* <button
              className="btn-secondary flex items-center gap-2"
              onClick={handleViewScheduledReports}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              View Scheduled
            </button> */}
            {/* Export/Print buttons - Commented out */}
            {/* <button
              className="btn-secondary"
              onClick={() =>
                exportToCsv(
                  "reports.csv",
                  filtered.map((r) => ({ ...r }))
                )
              }
            >
              Export All ({filtered.length})
            </button>
            <button
              className="btn-secondary"
              onClick={() =>
                exportToCsv(
                  "reports-page.csv",
                  rows.map((r) => ({ ...r }))
                )
              }
            >
              Export Page ({rows.length})
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                const body =
                  `<h1>Audit Reports</h1>` +
                  `<table border="1" style="border-collapse: collapse; width: 100%;"><thead><tr><th>Report ID</th><th>Date</th><th>Devices</th><th>Status</th><th>Department</th></tr></thead><tbody>` +
                  filtered
                    .map(
                      (r) =>
                        `<tr><td>${r.id}</td><td>${r.date}</td><td>${r.devices}</td><td>${r.status}</td><td>${r.department}</td></tr>`
                    )
                    .join("") +
                  `</tbody></table>`;
                openPrintView("Audit Reports", body);
              }}
            >
              Print All ({filtered.length})
            </button> */}
          </div>
        </div>

        {/* Table - scroll applied to table body only via inner container */}
        <div className="card-content card-table card overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 mb-4"></div>
              <p className="text-slate-600 text-sm">Loading reports...</p>
            </div>
          ) : allRows.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No Reports Found
              </h3>
              <p className="text-slate-600 mb-6">
                There are no audit reports available at the moment.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No Results Found
              </h3>
              <p className="text-slate-600 mb-6">
                No reports match your current filters.
              </p>
              <button onClick={clearAllFilters} className="btn-primary">
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Bulk Settings Button - shows when any report is selected */}
              {selectedReportIds.size > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-800">
                      {selectedReportIds.size} report{selectedReportIds.size > 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedReportIds(new Set())}
                      className="text-sm px-3 py-1.5 rounded border font-medium transition-colors text-slate-600 hover:text-slate-800 hover:bg-slate-100 border-slate-300"
                      title="Clear selection"
                      disabled={isPreviewLoading}
                    >
                      Clear
                    </button>
                    <button
                      onClick={handlePreviewSelectedReports}
                      disabled={isPreviewLoading}
                      className={`text-sm px-4 py-1.5 rounded border font-medium transition-colors flex items-center gap-2 ${
                        isPreviewLoading 
                          ? 'bg-blue-400 cursor-not-allowed border-blue-400' 
                          : 'bg-blue-600 hover:bg-blue-700 border-blue-600'
                      } text-white`}
                      title={`Preview ${selectedReportIds.size} selected report${selectedReportIds.size > 1 ? 's' : ''} in new tab${selectedReportIds.size > 1 ? 's' : ''}`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Preview
                    </button>
                    <button
                      onClick={handleBulkDownload}
                      className="text-sm px-4 py-1.5 rounded border font-medium transition-colors bg-green-600 text-white hover:bg-green-700 border-green-600 flex items-center gap-2"
                      title={`Download ${selectedReportIds.size} reports as ZIP`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Save
                    </button>
                  </div>
                </div>
              )}
              {/* Scrollable table wrapper - only tbody scrolls, header stays fixed */}
              <div className="max-h-[500px] overflow-y-auto scrollbar-hide">
                <table className="w-full text-nowrap min-w-[800px]">
                  <thead className="sticky top-0 bg-white shadow-sm z-10">
                    <tr className="text-left text-slate-500 border-b">
                      {/* ✅ RBAC: Only show checkbox for SuperAdmin and GroupAdmin */}
                      {!isSubUser && (
                        <th className="py-3 px-2 w-10">
                          <input
                            type="checkbox"
                            checked={
                              rows.length > 0 &&
                              rows.every((r) =>
                                selectedReportIds.has(String(r.id || ""))
                              )
                            }
                            onChange={() => toggleSelectAll(rows)}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                            title="Select all on this page"
                          />
                        </th>
                      )}
                      <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                        Report ID
                      </th>
                      <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                        Date
                      </th>
                      <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                        Report Type
                      </th>
                      {/* <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                      Devices
                    </th> */}
                      <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                        Status
                      </th>
                      <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                        Method
                      </th>
                      <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium text-center">
                        Total Files
                      </th>
                      <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium text-center">
                        Erased
                      </th>
                      <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium text-center">
                        Failed
                      </th>
                      <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium text-center">
                        Success
                      </th>
                      {/* <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={`${row.id}-${i}`}
                        className="border-t hover:bg-slate-50"
                      >
                        {/* ✅ RBAC: Only show checkbox for SuperAdmin and GroupAdmin */}
                        {!isSubUser && (
                          <td className="py-3 px-2">
                            <input
                              type="checkbox"
                              checked={selectedReportIds.has(String(row.id || ""))}
                              onChange={() =>
                                toggleReportSelection(String(row.id || ""))
                              }
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                            />
                          </td>
                        )}
                        <td className="py-3 px-2 font-medium font-mono text-xs xs:text-sm sm:text-sm">
                          {row.id}
                        </td>
                        <td className="py-3 px-2 text-xs xs:text-sm sm:text-sm">
                          {row.date}
                        </td>
                        <td className="py-3 px-2 text-xs xs:text-sm sm:text-sm">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {row.reportType || "Erasure"}
                          </span>
                        </td>
                        {/* <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            row.devices >= 200
                              ? "bg-purple-100 text-purple-800"
                              : row.devices >= 100
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {row.devices}
                        </span>
                      </td> */}
                        <td className="py-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${row.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : row.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : row.status === "failed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${row.status === "completed"
                                ? "bg-green-400"
                                : row.status === "pending"
                                  ? "bg-yellow-400"
                                  : row.status === "failed"
                                    ? "bg-red-400"
                                    : "bg-slate-400"
                                }`}
                            ></span>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-2 text-xs xs:text-sm sm:text-sm">
                          {row.method}
                        </td>
                        <td className="py-2 text-xs xs:text-sm sm:text-sm text-center">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {row.totalFiles ?? 0}
                          </span>
                        </td>
                        <td className="py-2 text-xs xs:text-sm sm:text-sm text-center">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {row.erasedFiles ?? 0}
                          </span>
                        </td>
                        <td className="py-2 text-xs xs:text-sm sm:text-sm text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${(row.failedFiles ?? 0) > 0 ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-800"}`}>
                            {row.failedFiles ?? 0}
                          </span>
                        </td>
                        <td className="py-2 text-xs xs:text-sm sm:text-sm text-center">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {row.successFiles ?? 0}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* End scrollable table wrapper */}

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t">
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
                    Showing {Math.min((page - 1) * pageSize + 1, filtered.length)} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} records
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
            </>
          )}
        </div>
      </div>

      {/* Bulk Settings Modal */}
      {showBulkSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-slate-900">
                  Settings
                </h2>
                {pdfSettingsLoading && (
                  <span className="text-sm text-blue-600 flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading saved settings...
                  </span>
                )}
                {!pdfSettingsLoading && pdfSettingsLoaded && (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {/* Settings loaded from server */}
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  disabled={pdfSettingsLoading}
                  onClick={async () => {
                    // if (!pdfFormData.reportTitle.trim() || !pdfFormData.headerText.trim()) {
                    //   showError("Validation Error", "Please fill in Report Title and Header Text");
                    //   return;
                    // }
                    // Save settings to API
                    await savePdfSettingsToServer();
                    showSuccess("Settings saved successfully!");
                    setShowBulkSettingsModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowBulkSettingsModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Report Title */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Report Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.reportTitle}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        reportTitle: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Data Erasure Audit Report"
                  />
                </div>

                {/* Header Text */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Header Text <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.headerText}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        headerText: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="D-SecureTech"
                  />
                </div>
              </div>
              {/* Technician & Validator Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Technician Name
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.technicianName}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        technicianName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Technician Department
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.technicianDept}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        technicianDept: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="IT Department"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Validator Name
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.validatorName}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        validatorName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Validator Department
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.validatorDept}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        validatorDept: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="QA Department"
                  />
                </div>
              </div>

              {/* Logo Uploads */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Header Left Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "headerLeftLogo")}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                  {(pdfFormData.headerLeftLogo || imageBase64.headerLeftLogo) && (
                    <p className="text-xs text-green-600 mt-1">✓ {pdfFormData.headerLeftLogo ? "Image uploaded" : "Saved image"}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Header Right Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "headerRightLogo")}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                  {(pdfFormData.headerRightLogo || imageBase64.headerRightLogo) && (
                    <p className="text-xs text-green-600 mt-1">✓ {pdfFormData.headerRightLogo ? "Image uploaded" : "Saved image"}</p>
                  )}
                </div>
              </div>

              {/* Watermark */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Watermark Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "watermarkImage")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                />
                {(pdfFormData.watermarkImage || imageBase64.watermarkImage) && (
                  <p className="text-xs text-green-600 mt-1">✓ {pdfFormData.watermarkImage ? "Watermark uploaded" : "Saved watermark"}</p>
                )}
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Technician Signature
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "technicianSignature")}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                  {(pdfFormData.technicianSignature || imageBase64.technicianSignature) && (
                    <p className="text-xs text-green-600 mt-1">✓ {pdfFormData.technicianSignature ? "Signature uploaded" : "Saved signature"}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Validator Signature
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "validatorSignature")}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                  {(pdfFormData.validatorSignature || imageBase64.validatorSignature) && (
                    <p className="text-xs text-green-600 mt-1">✓ {pdfFormData.validatorSignature ? "Signature uploaded" : "Saved signature"}</p>
                  )}
                </div>
              </div>

              {/* Selected Reports Preview */}
              {/* <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">
                  Selected Report IDs:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.from(selectedReportIds).map((id) => (
                    <span
                      key={id}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                    >
                      {id}
                    </span>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Footer */}
            {/* <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowBulkSettingsModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors"
                disabled={bulkSettingsLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!pdfFormData.reportTitle.trim() || !pdfFormData.headerText.trim()) {
                    showError("Validation Error", "Please fill in Report Title and Header Text");
                    return;
                  }
                  setBulkSettingsLoading(true);
                  try {
                    // Call the existing bulk download function with custom settings
                    await handleBulkDownload();
                    setShowBulkSettingsModal(false);
                  } catch (error) {
                    showError("Error", "Failed to generate reports");
                  } finally {
                    setBulkSettingsLoading(false);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                disabled={bulkSettingsLoading}
              >
                {bulkSettingsLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>Generate {selectedReportIds.size} Reports</>
                )}
              </button>
            </div> */}
          </div>
        </div>
      )}

      {/* Generate PDF Modal */}
      {showGenerateModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Generate Custom PDF - Report {selectedReport.id}
              </h2>
              {/* <button
                onClick={closeGenerateModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button> */}
            </div>

            <div className="p-6 space-y-4">
              {/* Report Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Report Title
                </label>
                <input
                  type="text"
                  value={pdfFormData.reportTitle}
                  onChange={(e) =>
                    setPdfFormData({
                      ...pdfFormData,
                      reportTitle: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Data Erasure Audit Report"
                />
              </div>

              {/* Header Text */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Header Text
                </label>
                <input
                  type="text"
                  value={pdfFormData.headerText}
                  onChange={(e) =>
                    setPdfFormData({
                      ...pdfFormData,
                      headerText: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="D-SecureTech"
                />
              </div>

              {/* Technician Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Technician Name
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.technicianName}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        technicianName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Technician Department
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.technicianDept}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        technicianDept: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="IT Operations"
                  />
                </div>
              </div>

              {/* Validator Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Validator Name
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.validatorName}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        validatorName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Validator Department
                  </label>
                  <input
                    type="text"
                    value={pdfFormData.validatorDept}
                    onChange={(e) =>
                      setPdfFormData({
                        ...pdfFormData,
                        validatorDept: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Quality Assurance"
                  />
                </div>
              </div>

              {/* Logos */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Header Left Logo
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={pdfFormData.headerLeftLogo?.name || ""}
                      readOnly
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      placeholder="Upload file"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                          <svg
                            className="w-4 h-4 text-slate-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-slate-600">
                            Upload Image
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, "headerLeftLogo")
                          }
                          className="hidden"
                        />
                      </label>
                      {pdfFormData.headerLeftLogo && (
                        <button
                          onClick={() =>
                            setPdfFormData({
                              ...pdfFormData,
                              headerLeftLogo: null,
                            })
                          }
                          className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Clear image"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Header Right Logo
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={pdfFormData.headerRightLogo?.name || ""}
                      readOnly
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      placeholder="Upload file"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                          <svg
                            className="w-4 h-4 text-slate-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-slate-600">
                            Upload Image
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, "headerRightLogo")
                          }
                          className="hidden"
                        />
                      </label>
                      {pdfFormData.headerRightLogo && (
                        <button
                          onClick={() =>
                            setPdfFormData({
                              ...pdfFormData,
                              headerRightLogo: null,
                            })
                          }
                          className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Clear image"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Watermark Image
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={pdfFormData.watermarkImage?.name || ""}
                    readOnly
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    placeholder="Upload file"
                  />
                  <div className="flex items-center gap-2">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                        <svg
                          className="w-4 h-4 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm text-slate-600">
                          Upload Image
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "watermarkImage")}
                        className="hidden"
                      />
                    </label>
                    {pdfFormData.watermarkImage && (
                      <button
                        onClick={() =>
                          setPdfFormData({ ...pdfFormData, watermarkImage: null })
                        }
                        className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Clear image"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Technician Signature
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={pdfFormData.technicianSignature?.name || ""}
                      readOnly
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      placeholder="Upload file"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                          <svg
                            className="w-4 h-4 text-slate-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-slate-600">
                            Upload Image
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, "technicianSignature")
                          }
                          className="hidden"
                        />
                      </label>
                      {pdfFormData.technicianSignature && (
                        <button
                          onClick={() =>
                            setPdfFormData({
                              ...pdfFormData,
                              technicianSignature: null,
                            })
                          }
                          className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Clear image"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Validator Signature
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={pdfFormData.validatorSignature?.name || ""}
                      readOnly
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      placeholder="Upload file"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                          <svg
                            className="w-4 h-4 text-slate-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-slate-600">
                            Upload Image
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, "validatorSignature")
                          }
                          className="hidden"
                        />
                      </label>
                      {pdfFormData.validatorSignature && (
                        <button
                          onClick={() =>
                            setPdfFormData({
                              ...pdfFormData,
                              validatorSignature: null,
                            })
                          }
                          className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Clear image"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t px-6 py-4 flex items-center justify-end gap-3">
              {/* <button
                onClick={closeGenerateModal}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button> */}
              {/* <button
                onClick={handleSubmitGeneratePDF}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Generate PDF
              </button> */}
            </div>
          </div>
        </div>
      )}

      {/* Bulk modal removed - now redirects to /admin/reports/generate */}

      {/* Report Scheduler Modal */}
      {showSchedulerModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Schedule Report Generation
              </h2>
              <button
                onClick={() => setShowSchedulerModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* <div className="p-6 space-y-6">
           
              <div>
                <label htmlFor="reportName" className="block text-sm font-medium text-slate-700 mb-2">
                  Report Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="reportName"
                  name="reportName"
                  value={schedulerData.reportName}
                  onChange={handleSchedulerInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter scheduled report name"
                />
              </div> */}
            {/* <div>
                <label htmlFor="scheduleType" className="block text-sm font-medium text-slate-700 mb-2">
                  Schedule Type
                </label>
                <select
                  id="scheduleType"
                  name="scheduleType"
                  value={schedulerData.scheduleType}
                  onChange={handleSchedulerInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="immediate">Execute Now</option>
                  <option value="once">One Time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div> */}

            {/* {schedulerData.scheduleType !== 'immediate' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="scheduleDate" className="block text-sm font-medium text-slate-700 mb-2">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="scheduleDate"
                      name="scheduleDate"
                      value={schedulerData.scheduleDate}
                      onChange={handleSchedulerInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="scheduleTime" className="block text-sm font-medium text-slate-700 mb-2">
                      Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      id="scheduleTime"
                      name="scheduleTime"
                      value={schedulerData.scheduleTime}
                      onChange={handleSchedulerInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              )} */}
            {/* {schedulerData.scheduleType === 'immediate' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">Execute Immediately</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Reports will be processed and emailed immediately when you click "Execute Now".
                      </p>
                    </div>
                  </div>
                </div>
              )} */}
            {/* {selectedReportIds.size > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Selected Reports</h3>
                  <p className="text-sm text-blue-700">
                     {selectedReportIds.size} reports selected: {Array.from(selectedReportIds).join(', ')}
                  </p>
                </div>
              )} */}
            {/* <div>
                <label htmlFor="emailRecipients" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Recipients
                </label>
                <textarea
                  id="emailRecipients"
                  name="emailRecipients"
                  value={schedulerData.emailRecipients}
                  onChange={handleSchedulerInputChange}
                  rows={1}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter email addresses separated by commas (e.g., user1@example.com, user2@example.com)"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Leave empty to send to your email only. Separate multiple emails with commas.
                </p>
              </div> */}

            {/* <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="includeFilters"
                    name="includeFilters"
                    checked={schedulerData.includeFilters}
                    onChange={(e) => setSchedulerData(prev => ({ ...prev, includeFilters: e.target.checked }))}
                    className="rounded border-slate-300"
                  />
                  <label htmlFor="includeFilters" className="text-sm font-medium text-slate-700">
                    Apply current filters to scheduled report
                  </label>
                </div>

                {schedulerData.includeFilters && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <div>
                      <label htmlFor="filterStatus" className="block text-sm font-medium text-slate-700 mb-1">
                        Status Filter
                      </label>
                      <select
                        id="filterStatus"
                        name="filterStatus"
                        value={schedulerData.filterStatus}
                        onChange={handleSchedulerInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="">All Statuses</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="filterDepartment" className="block text-sm font-medium text-slate-700 mb-1">
                        Department Filter
                      </label>
                      <input
                        type="text"
                        id="filterDepartment"
                        name="filterDepartment"
                        value={schedulerData.filterDepartment}
                        onChange={handleSchedulerInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter department name"
                      />
                    </div>
                  </div>
                )}
              </div> */}

            {/* Schedule Info */}
            {/* <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-slate-800 mb-2">
                  {schedulerData.scheduleType === 'immediate' ? 'Execution Summary' : 'Schedule Summary'}
                </h3>
                <div className="text-sm text-slate-600 space-y-1">
                  <p><strong>Report:</strong> {schedulerData.reportName || 'Untitled Report'}</p>
                  <p><strong>Type:</strong> {
                    schedulerData.scheduleType === 'immediate' ? 'Execute Immediately' :
                    schedulerData.scheduleType === 'once' ? 'One Time' : 
                    schedulerData.scheduleType.charAt(0).toUpperCase() + schedulerData.scheduleType.slice(1)
                  }</p>
                  {schedulerData.scheduleType === 'immediate' ? (
                    <p><strong>Execution:</strong> Immediately upon confirmation</p>
                  ) : (
                    schedulerData.scheduleDate && schedulerData.scheduleTime && (
                      <p><strong>Next Run:</strong> {new Date(`${schedulerData.scheduleDate}T${schedulerData.scheduleTime}`).toLocaleString()}</p>
                    )
                  )}
                  <p><strong>Reports:</strong> {selectedReportIds.size > 0 ? `${selectedReportIds.size} selected` : 'All filtered reports'}</p>
                  <p><strong>Recipients:</strong> {
                    schedulerData.emailRecipients 
                      ? schedulerData.emailRecipients.split(',').length + ' specified'
                      : 'Your email only'
                  }</p>
                </div>
              </div> */}
          </div>

          {/* Modal Footer */}
          {/* <div className="sticky bottom-0 bg-slate-50 border-t px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSchedulerModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleReport}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                    schedulerData.scheduleType === 'immediate' 
                      ? "M5 3l14 9-14 9V3z" 
                      : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  } />
                </svg>
                {schedulerData.scheduleType === 'immediate' ? 'Execute Now' : 'Schedule Report'}
              </button>
            </div> */}
          {/* </div> */}
        </div>
      )}
      {/* {showScheduledReportsModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
         
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Scheduled Reports</h2>
              <button
                onClick={() => setShowScheduledReportsModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {loadingScheduledReports ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4">
                    <svg className="animate-spin h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <p className="text-slate-600">Loading scheduled reports...</p>
                </div>
              ) : scheduledReports.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-600 mb-4">No scheduled reports found</p>
                  <button
                    onClick={() => {
                      setShowScheduledReportsModal(false);
                      setShowSchedulerModal(true);
                    }}
                    className="btn-primary"
                  >
                    Create First Schedule
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {scheduledReports.map((schedule) => (
                    <div key={schedule.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{schedule.scheduleName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              schedule.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {schedule.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                              {schedule.scheduleType === 'once' ? 'One Time' : schedule.scheduleType.charAt(0).toUpperCase() + schedule.scheduleType.slice(1)}
                            </span>
                          </div>
                          
                          <div className="text-sm text-slate-600 space-y-1">
                            <p><strong>Next Run:</strong> {new Date(schedule.scheduledDateTime).toLocaleString()}</p>
                            <p><strong>Reports:</strong> {schedule.reportConfiguration?.reportIds?.length || 0} selected reports</p>
                            <p><strong>Recipients:</strong> {schedule.reportConfiguration?.emailSettings?.recipients?.join(', ') || 'None'}</p>
                            {schedule.reportConfiguration?.filters && (
                              <p><strong>Filters Applied:</strong> Yes</p>
                            )}
                            <p><strong>Created:</strong> {new Date(schedule.metadata?.createdAt).toLocaleDateString()} by {schedule.metadata?.createdBy}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handleToggleSchedule(schedule.id, schedule.isActive)}
                            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                              schedule.isActive
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                            title={schedule.isActive ? 'Disable Schedule' : 'Enable Schedule'}
                          >
                            {schedule.isActive ? 'Disable' : 'Enable'}
                          </button>
                          <button
                            onClick={() => handleDeleteScheduledReport(schedule.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-xs font-medium transition-colors"
                            title="Delete Schedule"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t px-6 py-4 flex items-center justify-between">
              <button
                onClick={loadScheduledReports}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowScheduledReportsModal(false);
                    setShowSchedulerModal(true);
                  }}
                  className="btn-primary flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Schedule
                </button>
                <button
                  onClick={() => setShowScheduledReportsModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
