import { useMemo, useState } from "react";
import { exportToCsv, openPrintView } from "@/utils/csv";
import { Helmet } from "react-helmet-async";
import { useNotification } from "@/contexts/NotificationContext";

import { AdminDashboardAPI, AdminReport } from "@/services/adminDashboardAPI";
import { useEffect } from "react";
import { apiClient } from "@/utils/enhancedApiClient";
import { authService } from "@/utils/authService";

// Extended AdminReport interface to include raw data
interface ExtendedAdminReport extends AdminReport {
  _raw?: any;
  _details?: any;
}

export default function AdminReports() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [deviceRangeFilter, setDeviceRangeFilter] = useState("");
  const [showUniqueOnly, setShowUniqueOnly] = useState(false);
  const [sortBy, setSortBy] = useState<keyof AdminReport>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  // ✅ Cache Helper Functions
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  
  const getCachedData = (key: string) => {
    try {
      const cached = localStorage.getItem(`admin_cache_${key}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          console.log(`✅ Using cached data for ${key}`);
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
      localStorage.setItem(`admin_cache_${key}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      console.log(`💾 Cached data for ${key}`);
    } catch (e) {
      console.warn(`⚠️ Cache write error for ${key}:`, e);
    }
  };
  
  const [allRows, setAllRows] = useState<ExtendedAdminReport[]>(() => getCachedData('reports') || []);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;

  // Generate PDF Modal State
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ExtendedAdminReport | null>(null);
  const [pdfFormData, setPdfFormData] = useState({
    reportTitle: 'Data Erasure Audit Report',
    headerText: 'D-SecureTech',
    technicianName: '',
    technicianDept: '',
    validatorName: '',
    validatorDept: '',
    headerLeftLogo: '',
    headerRightLogo: '',
    watermarkImage: '',
    technicianSignature: '',
    validatorSignature: ''
  });

  // Handle image file upload and convert to base64
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showError('Invalid File', 'Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showError('File Too Large', 'Image size should be less than 5MB');
      return;
    }

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPdfFormData({ ...pdfFormData, [fieldName]: base64String });
        showSuccess(`${fieldName} uploaded successfully`);
      };
      reader.onerror = () => {
        showError('Upload Failed', 'Failed to read image file');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      showError('Upload Failed', 'Failed to upload image');
    }
  };

  // Load reports data on component mount
  useEffect(() => {
    loadReportsData();
  }, []);

  const loadReportsData = async () => {
    setLoading(true);
    
    // ✅ Check cache first for instant display
    const cachedReports = getCachedData('reports');
    if (cachedReports && cachedReports.length > 0) {
      console.log('⚡ Displaying cached reports data');
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
          console.log("� Parsed user_data from localStorage:", storedUserData);
        } catch (e) {
          console.error("Error parsing user_data:", e);
        }
      }

      if (!storedUserData && authUser) {
        try {
          storedUserData = JSON.parse(authUser);
          console.log("� Parsed authUser from localStorage:", storedUserData);
        } catch (e) {
          console.error("Error parsing authUser:", e);
        }
      }

      // 2. Get user from JWT token
      const user = authService.getUserFromToken();
      console.log("� User from token:", user);

      // 3. PRIORITY: Use user_email from localStorage user_data, then from token
      const userEmail =
        storedUserData?.user_email || user?.user_email || user?.email;
      console.log("📧 Final userEmail for reports:", userEmail);

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

      console.log("📋 Fetching audit reports for email:", userEmail);

      // Call API: /api/AuditReports/by-email/{email}
      const auditReportsRes = await apiClient.getAuditReportsByEmail(userEmail);
      console.log("📥 API Response:", auditReportsRes);

      if (auditReportsRes.success && auditReportsRes.data) {
        console.log("✅ Audit reports fetched:", auditReportsRes.data.length);

        // Ensure data is an array
        const reportsArray = Array.isArray(auditReportsRes.data)
          ? auditReportsRes.data
          : [auditReportsRes.data];

        // If no reports found
        if (reportsArray.length === 0) {
          console.log("ℹ️ No audit reports found");
          showInfo("No Reports", "No audit reports found.");
          setAllRows([]);
          setLoading(false);
          return;
        }

        console.log("🔄 Processing reports with report_details_json...");

        // Process each report
        const processedReports = reportsArray.map((report: any) => {
          let reportDetails: any = {};
          let deviceCount = 1;

          // Parse report_details_json (JSON string from backend)
          if (report.report_details_json) {
            try {
              reportDetails = JSON.parse(report.report_details_json);
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
              console.log("❌ Raw data:", report.report_details_json);
            }
          }

          // Map to table format using fields from report_details_json
          const mappedReport: ExtendedAdminReport = {
            id:
              reportDetails?.report_id?.toString() || report.report_id || "N/A",

            date: reportDetails?.datetime
              ? new Date(reportDetails.datetime).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0],

            devices: deviceCount,

            status: reportDetails?.status?.toLowerCase() || "completed",

            department: "Operations",

            _raw: report,
            _details: reportDetails,
          };

          console.log("✅ Mapped:", mappedReport);
          return mappedReport;
        });

        setAllRows(processedReports);
        setCachedData('reports', processedReports); // ✅ Cache API data
      } else {
        console.warn("⚠️ API failed:", auditReportsRes);

        if (auditReportsRes.error?.includes("401")) {
          showError("Session Expired", "Please login again.");
        } else if (auditReportsRes.error?.includes("403")) {
          showError("Access Denied", "No permission to view reports.");
        } else {
          showInfo("No Reports", "No audit reports found.");
        }

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
  const uniqueMonths = useMemo(
    () => [...new Set(allRows.map((r) => r.date.substring(0, 7)))],
    [allRows]
  );

  const filtered = useMemo(() => {
    let result = allRows.filter((r) => {
      const matchesQuery =
        r.id.toLowerCase().includes(query.toLowerCase()) ||
        r.department.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = !statusFilter || r.status === statusFilter;
      const matchesDate = !dateFilter || r.date.startsWith(dateFilter);

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

      return matchesQuery && matchesStatus && matchesDate && matchesDeviceRange;
    });

    // Remove duplicates if requested
    if (showUniqueOnly) {
      const seen = new Set();
      result = result.filter((r) => {
        const key = `${r.id}-${r.date}-${r.department}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    // Sort results
    result.sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortBy) {
        case "id":
          aVal = a.id;
          bVal = b.id;
          break;
        case "date":
          aVal = new Date(a.date);
          bVal = new Date(b.date);
          break;
        case "devices":
          aVal = a.devices;
          bVal = b.devices;
          break;
        case "status":
          aVal = a.status;
          bVal = b.status;
          break;
        case "department":
          aVal = a.department;
          bVal = b.department;
          break;
        default:
          aVal = a.id;
          bVal = b.id;
      }

      if (typeof aVal === "string") {
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
    query,
    statusFilter,
    dateFilter,
    deviceRangeFilter,
    showUniqueOnly,
    sortBy,
    sortOrder,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const clearAllFilters = () => {
    setQuery("");
    setStatusFilter("");
    setDateFilter("");
    setDeviceRangeFilter("");
    setShowUniqueOnly(false);
    setPage(1);
  };

  // Action functions
  const handleViewReport = async (report: AdminReport) => {
    showInfo(`Opening report ${report.id}`);
    // Additional view logic can be added here
  };

  // const handleDownloadReport = async (report: ExtendedAdminReport) => {
  //   try {
  //     showInfo(`Preparing PDF download for report ${report.id}...`);

  //     // Get the raw report data and parsed details
  //     const rawReport = report._raw;
  //     const reportDetails = report._details;
      
  //     if (!rawReport || !rawReport.report_id) {
  //       showError("Download Failed", "Report data not available");
  //       return;
  //     }

  //     console.log("📄 Report details for PDF:", reportDetails);

  //     // Extract all fields from report_details_json for PDF generation
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
  //       // Optional branding/signature fields
  //       reportTitle: reportDetails?.report_title || "Data Erasure Audit Report",
  //       headerText: reportDetails?.header_text || "D-SecureTech",
  //       headerLeftLogo: reportDetails?.header_left_logo || "",
  //       headerRightLogo: reportDetails?.header_right_logo || "",
  //       watermarkImage: reportDetails?.watermark_image || "",
  //       technicianName: reportDetails?.technician_name || "",
  //       technicianDept: reportDetails?.technician_dept || "",
  //       validatorName: reportDetails?.validator_name || "",
  //       validatorDept: reportDetails?.validator_dept || "",
  //       technicianSignature: reportDetails?.technician_signature || "",
  //       validatorSignature: reportDetails?.validator_signature || ""
  //     };

  //     console.log("📤 Sending PDF payload:", JSON.stringify(pdfPayload, null, 2));

  //     // Call the PDF export API endpoint with GET method and report_id as query param
  //     const reportId = reportDetails?.report_id?.toString() || rawReport.report_id || "";
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL ||
  //         "https://api.dsecuretech.com"}/api/EnhancedAuditReports/export-pdf?reportId=${encodeURIComponent(reportId)}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authService.getAccessToken()}`,
  //         },
  //       }
  //     );

  //     console.log("📥 Response status:", response.status);
  //     console.log("📥 Response headers:", response.headers);

  //     if (!response.ok) {
  //       // Try to get error message from response body
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
  //     a.download = `audit-report-${report.id}-${report.date}.pdf`;
  //     document.body.appendChild(a);
  //     a.click();

  //     // Cleanup
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(a);

  //     showSuccess(`Report ${report.id} downloaded successfully`);
  //   } catch (error) {
  //     console.error("Error downloading report:", error);
  //     showError(
  //       "Download Failed",
  //       `Failed to download report. ${
  //         error instanceof Error ? error.message : "Please try again."
  //       }`
  //     );
  //   }
  // };

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

  const handleShareReport = async (report: AdminReport) => {
    if (report.status !== "completed") {
      showWarning(`Cannot share ${report.id} - report is not completed`);
      return;
    }
    showInfo(`Sharing options for report ${report.id}`);
    // Additional sharing logic can be added here
  };

  // Open Generate PDF Modal
  const handleGeneratePDF = (report: ExtendedAdminReport) => {
    setSelectedReport(report);
    setShowGenerateModal(true);
  };

  // Close Generate PDF Modal
  const closeGenerateModal = () => {
    setShowGenerateModal(false);
    setSelectedReport(null);
    setPdfFormData({
      reportTitle: 'Data Erasure Audit Report',
      headerText: 'D-SecureTech',
      technicianName: '',
      technicianDept: '',
      validatorName: '',
      validatorDept: '',
      headerLeftLogo: '',
      headerRightLogo: '',
      watermarkImage: '',
      technicianSignature: '',
      validatorSignature: ''
    });
  };

  // Submit Generate PDF with Files
  const handleSubmitGeneratePDF = async () => {
    if (!selectedReport) return;

    try {
      showInfo(`Generating PDF with custom data for report ${selectedReport.id}...`);

      const rawReport = selectedReport._raw;
      const reportDetails = selectedReport._details;

      if (!rawReport || !rawReport.report_id) {
        showError("Generate Failed", "Report data not available");
        return;
      }

      // Build complete payload with form data and report_details_json
      const pdfPayload = {
        reportData: {
          // Required fields from report_details_json
          report_id: reportDetails?.report_id?.toString() || rawReport.report_id || "",
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
          Eraser_Start_Time: reportDetails?.Eraser_Start_Time || reportDetails?.eraser_start_time || "",
          Eraser_End_Time: reportDetails?.Eraser_End_Time || reportDetails?.eraser_end_time || "",
          eraser_method: reportDetails?.eraser_method || "Secure Erase",
          validation_method: reportDetails?.validation_method || "",
          Erasure_Type: reportDetails?.Erasure_Type || reportDetails?.erasure_type || "Full Disk",
          total_files: reportDetails?.total_files || 0,
          erased_files: reportDetails?.erased_files || 0,
          failed_files: reportDetails?.failed_files || 0,
          erasure_log: reportDetails?.erasure_log || []
        },
        // User-provided branding/signature fields from form
        reportTitle: pdfFormData.reportTitle,
        headerText: pdfFormData.headerText,
        headerLeftLogo: pdfFormData.headerLeftLogo,
        headerRightLogo: pdfFormData.headerRightLogo,
        watermarkImage: pdfFormData.watermarkImage,
        technicianName: pdfFormData.technicianName,
        technicianDept: pdfFormData.technicianDept,
        validatorName: pdfFormData.validatorName,
        validatorDept: pdfFormData.validatorDept,
        technicianSignature: pdfFormData.technicianSignature,
        validatorSignature: pdfFormData.validatorSignature
      };

      console.log("📤 Sending Generate PDF payload:", JSON.stringify(pdfPayload, null, 2));

      // Create FormData for multipart/form-data request
      const formData = new FormData();
      
      // Add all payload fields as JSON string or individual fields
      formData.append('reportData', JSON.stringify(pdfPayload.reportData));
      formData.append('reportTitle', pdfPayload.reportTitle);
      formData.append('headerText', pdfPayload.headerText);
      formData.append('technicianName', pdfPayload.technicianName);
      formData.append('technicianDept', pdfPayload.technicianDept);
      formData.append('validatorName', pdfPayload.validatorName);
      formData.append('validatorDept', pdfPayload.validatorDept);
      
      // Add image fields (URLs or base64)
      if (pdfFormData.headerLeftLogo) formData.append('headerLeftLogo', pdfFormData.headerLeftLogo);
      if (pdfFormData.headerRightLogo) formData.append('headerRightLogo', pdfFormData.headerRightLogo);
      if (pdfFormData.watermarkImage) formData.append('watermarkImage', pdfFormData.watermarkImage);
      if (pdfFormData.technicianSignature) formData.append('technicianSignature', pdfFormData.technicianSignature);
      if (pdfFormData.validatorSignature) formData.append('validatorSignature', pdfFormData.validatorSignature);

      // Call the PDF export API with POST method
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL ||
          "https://api.dsecuretech.com"}/api/EnhancedAuditReports/export-pdf-with-files`,
        {
          method: "POST",
          headers: {
            // Don't set Content-Type for FormData - browser will set it automatically with boundary
            Authorization: `Bearer ${authService.getAccessToken()}`,
          },
          body: formData,
        }
      );

      console.log("📥 Response status:", response.status);

      if (!response.ok) {
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
      console.log("✅ PDF blob received, size:", blob.size);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `custom-audit-report-${selectedReport.id}-${selectedReport.date}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showSuccess(`Custom PDF for report ${selectedReport.id} generated successfully`);
      closeGenerateModal();
    } catch (error) {
      console.error("Error generating PDF:", error);
      showError(
        "Generate Failed",
        `Failed to generate PDF. ${
          error instanceof Error ? error.message : "Please try again."
        }`
      );
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/admin/reports" />
        <title>
          DSecureTech Compliance | Data Erasure Standards & Regulations
        </title>
        <meta
          name="description"
          content="DSecureTech helps businesses meet global data sanitization standards like NIST, ISO 27001, GDPR, HIPAA, PCI DSS, and SOX with verifiable compliance solutions."
        />
        <meta
          name="keywords"
          content="data erasure compliance, NIST 800-88, ISO 27001, GDPR, HIPAA, SOX, PCI DSS, enterprise data destruction, B2B data security"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="space-y-4 xs:space-y-6 sm:space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 xs:p-6 sm:p-6">
        <div className="flex flex-col xs:flex-row sm:flex-row items-start xs:items-center sm:items-center justify-between gap-4">
          <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            Audit Reports
          </h1>
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

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-4">
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
            <div>
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
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Month
              </label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Months</option>
                {uniqueMonths.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Device Range Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Device Range
              </label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={deviceRangeFilter}
                onChange={(e) => {
                  setDeviceRangeFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Ranges</option>
                <option value="1-50">1-50 devices</option>
                <option value="51-100">51-100 devices</option>
                <option value="101-200">101-200 devices</option>
                <option value="201-999">201+ devices</option>
              </select>
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
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
            </div>

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
                <option value="devices">Devices</option>
                <option value="status">Status</option>
                <option value="department">Department</option>
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

            <div className="text-sm text-slate-600">
              Showing {filtered.length} of {allRows.length} users
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex justify-end gap-2">
          <button
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
          </button>
        </div>

        {/* Table */}
        <div className="card-content card-table card overflow-x-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <svg
                  className="animate-spin h-8 w-8 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Loading Reports...
              </h3>
              <p className="text-slate-600">
                Please wait while we fetch your audit reports.
              </p>
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
              <table className="w-full text-nowrap min-w-[800px]">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                      Report ID
                    </th>
                    <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                      Date
                    </th>
                    <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                      Devices
                    </th>
                    <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                      Status
                    </th>
                    <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                      Department
                    </th>
                    <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={`${row.id}-${i}`}
                      className="border-t hover:bg-slate-50"
                    >
                      <td className="py-3 px-2 font-medium font-mono text-xs xs:text-sm sm:text-sm">
                        {row.id}
                      </td>
                      <td className="py-3 px-2 text-xs xs:text-sm sm:text-sm">
                        {row.date}
                      </td>
                      <td className="py-2">
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
                      </td>
                      <td className="py-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            row.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : row.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : row.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              row.status === "completed"
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
                        {row.department}
                      </td>
                      <td className="py-2">
                        <div className="flex items-center gap-1">
                          {/* <button
                            onClick={() => handleDownloadReport(row)}
                            className={`text-xs px-3 py-1.5 rounded border font-medium transition-colors ${
                              row.status === "completed"
                                ? "text-green-600 hover:text-white hover:bg-green-600 border-green-600"
                                : "text-slate-400 border-slate-200 cursor-not-allowed"
                            }`}
                            disabled={row.status !== "completed"}
                            title={
                              row.status !== "completed"
                                ? "Report not ready for download"
                                : "Download PDF Report"
                            }
                          >
                            <svg
                              className="w-4 h-4 inline-block mr-1"
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
                            Download
                          </button> */}
                          <button
                            onClick={() => handleGeneratePDF(row)}
                            className={`text-xs px-3 py-1.5 rounded border font-medium transition-colors ${
                              row.status === "completed"
                                ? "text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600"
                                : "text-slate-400 border-slate-200 cursor-not-allowed"
                            }`}
                            disabled={row.status !== "completed"}
                            title={
                              row.status !== "completed"
                                ? "Report not ready"
                                : "Generate Custom PDF"
                            }
                          >
                            <svg
                              className="w-4 h-4 inline-block mr-1"
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
                            Generate
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-sm text-slate-600">
                  Page {page} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Generate PDF Modal */}
      {showGenerateModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Generate Custom PDF - Report {selectedReport.id}
              </h2>
              <button
                onClick={closeGenerateModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
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
                  onChange={(e) => setPdfFormData({ ...pdfFormData, reportTitle: e.target.value })}
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
                  onChange={(e) => setPdfFormData({ ...pdfFormData, headerText: e.target.value })}
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
                    onChange={(e) => setPdfFormData({ ...pdfFormData, technicianName: e.target.value })}
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
                    onChange={(e) => setPdfFormData({ ...pdfFormData, technicianDept: e.target.value })}
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
                    onChange={(e) => setPdfFormData({ ...pdfFormData, validatorName: e.target.value })}
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
                    onChange={(e) => setPdfFormData({ ...pdfFormData, validatorDept: e.target.value })}
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
                      value={pdfFormData.headerLeftLogo}
                      onChange={(e) => setPdfFormData({ ...pdfFormData, headerLeftLogo: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/logo-left.png or upload file"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-slate-600">Upload Image</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'headerLeftLogo')}
                          className="hidden"
                        />
                      </label>
                      {pdfFormData.headerLeftLogo && (
                        <button
                          onClick={() => setPdfFormData({ ...pdfFormData, headerLeftLogo: '' })}
                          className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Clear image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                      value={pdfFormData.headerRightLogo}
                      onChange={(e) => setPdfFormData({ ...pdfFormData, headerRightLogo: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/logo-right.png or upload file"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-slate-600">Upload Image</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'headerRightLogo')}
                          className="hidden"
                        />
                      </label>
                      {pdfFormData.headerRightLogo && (
                        <button
                          onClick={() => setPdfFormData({ ...pdfFormData, headerRightLogo: '' })}
                          className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Clear image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                    value={pdfFormData.watermarkImage}
                    onChange={(e) => setPdfFormData({ ...pdfFormData, watermarkImage: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/watermark.png or upload file"
                  />
                  <div className="flex items-center gap-2">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-slate-600">Upload Image</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'watermarkImage')}
                        className="hidden"
                      />
                    </label>
                    {pdfFormData.watermarkImage && (
                      <button
                        onClick={() => setPdfFormData({ ...pdfFormData, watermarkImage: '' })}
                        className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Clear image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                      value={pdfFormData.technicianSignature}
                      onChange={(e) => setPdfFormData({ ...pdfFormData, technicianSignature: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/tech-signature.png or upload"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-slate-600">Upload Image</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'technicianSignature')}
                          className="hidden"
                        />
                      </label>
                      {pdfFormData.technicianSignature && (
                        <button
                          onClick={() => setPdfFormData({ ...pdfFormData, technicianSignature: '' })}
                          className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Clear image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                      value={pdfFormData.validatorSignature}
                      onChange={(e) => setPdfFormData({ ...pdfFormData, validatorSignature: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/validator-signature.png or upload"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-slate-600">Upload Image</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'validatorSignature')}
                          className="hidden"
                        />
                      </label>
                      {pdfFormData.validatorSignature && (
                        <button
                          onClick={() => setPdfFormData({ ...pdfFormData, validatorSignature: '' })}
                          className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Clear image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
              <button
                onClick={closeGenerateModal}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitGeneratePDF}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Generate PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
