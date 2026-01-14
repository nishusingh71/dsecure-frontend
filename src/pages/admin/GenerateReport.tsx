import { useAuth } from "@/auth/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React from "react";
import { apiClient } from "@/utils/enhancedApiClient";
import { useNotification } from "@/contexts/NotificationContext";

interface ReportFormData {
  reportTitle: string;
  headerText: string;
  headerLeftLogo: File | null;
  headerRightLogo: File | null;
  watermarkImage: File | null;
  technicianName: string;
  technicianDept: string;
  validatorName: string;
  validatorDept: string;
  technicianSignature: File | null;
  validatorSignature: File | null;
  // Scheduler properties
  isScheduled?: boolean;
  scheduledDate?: string;
  scheduledTime?: string;
  repeatFrequency?: "once" | "daily" | "weekly" | "monthly";
  endDate?: string;
  emailRecipients?: string[];
}

export default function GenerateReport() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId?: string }>();
  const [searchParams] = useSearchParams();
  const { showSuccess, showError, showInfo } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  // Get bulk report IDs from URL parameter
  const bulkParam = searchParams.get("bulk");
  const bulkReportIds = bulkParam
    ? bulkParam.split(",").filter((id) => id.trim())
    : [];
  const isBulkMode = bulkReportIds.length > 0;
  const [formData, setFormData] = useState<ReportFormData>({
    reportTitle: "",
    headerText: "",
    headerLeftLogo: null,
    headerRightLogo: null,
    watermarkImage: null,
    technicianName: "",
    technicianDept: "",
    validatorName: "",
    validatorDept: "",
    technicianSignature: null,
    validatorSignature: null,
    // Scheduler properties initialized as undefined
    isScheduled: undefined,
    scheduledDate: undefined,
    scheduledTime: undefined,
    repeatFrequency: undefined,
    endDate: undefined,
    emailRecipients: undefined,
  });

  // File input refs
  const headerLeftLogoRef = React.useRef<HTMLInputElement>(null);
  const headerRightLogoRef = React.useRef<HTMLInputElement>(null);
  const watermarkImageRef = React.useRef<HTMLInputElement>(null);
  const technicianSignatureRef = React.useRef<HTMLInputElement>(null);
  const validatorSignatureRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      const file = files ? files[0] : null;
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileSelect = (
    fieldName: keyof ReportFormData,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    ref.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.reportTitle.trim()) {
      showError("Validation Error", "Please enter a report title");
      return;
    }

    if (!formData.headerText.trim()) {
      showError("Validation Error", "Please enter header text");
      return;
    }

    // If reportId is provided, validate it
    if (reportId && !reportId.trim()) {
      showError("Invalid Report ID", "The report ID provided is not valid");
      return;
    }

    setIsLoading(true);

    try {
      if (reportId) {
        // Custom report generation using specific API endpoint
        // console.log("Generating custom report for ID:", reportId);

        // Create FormData for file uploads
        const submitData = new FormData();

        // Add text fields
        submitData.append("reportTitle", formData.reportTitle);
        submitData.append("headerText", formData.headerText);
        submitData.append("technicianName", formData.technicianName);
        submitData.append("technicianDept", formData.technicianDept);
        submitData.append("validatorName", formData.validatorName);
        submitData.append("validatorDept", formData.validatorDept);

        // Add file fields
        if (formData.headerLeftLogo) {
          submitData.append("headerLeftLogo", formData.headerLeftLogo);
        }
        if (formData.headerRightLogo) {
          submitData.append("headerRightLogo", formData.headerRightLogo);
        }
        if (formData.watermarkImage) {
          submitData.append("watermarkImage", formData.watermarkImage);
        }
        if (formData.technicianSignature) {
          submitData.append(
            "technicianSignature",
            formData.technicianSignature
          );
        }
        if (formData.validatorSignature) {
          submitData.append("validatorSignature", formData.validatorSignature);
        }

        // Call enhanced audit reports API for custom PDF generation
        const response = await fetch(
          `https://api.dsecuretech.com/api/EnhancedAuditReports/${reportId}/export-pdf-with-files`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user?.token || ""}`,
            },
            body: submitData,
          }
        );

        if (response.ok) {
          // Handle file download
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `custom-report-${reportId}-${Date.now()}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          showSuccess(
            "Report Generated Successfully",
            `Custom report for ID ${reportId} has been generated and downloaded`
          );
        } else {
          const errorData = await response.text();
          console.error("API Error:", errorData);
          showError(
            "Report Generation Failed",
            `Failed to generate custom report: ${response.status} ${response.statusText}`
          );
        }
      } else if (isBulkMode && bulkReportIds.length > 0) {
        // Bulk report generation with ZIP download
        // console.log("Generating bulk reports for IDs:", bulkReportIds);

        showInfo(`Customizing ${bulkReportIds.length} reports...`);

        // Import JSZip dynamically
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();

        let successCount = 0;
        let failedCount = 0;

        // Process each selected report
        for (const reportId of bulkReportIds) {
          try {
            const submitData = new FormData();

            // Add text fields
            submitData.append("reportTitle", formData.reportTitle);
            submitData.append("headerText", formData.headerText);
            submitData.append("technicianName", formData.technicianName);
            submitData.append("technicianDept", formData.technicianDept);
            submitData.append("validatorName", formData.validatorName);
            submitData.append("validatorDept", formData.validatorDept);

            // Add file fields
            if (formData.headerLeftLogo) {
              submitData.append("headerLeftLogo", formData.headerLeftLogo);
            }
            if (formData.headerRightLogo) {
              submitData.append("headerRightLogo", formData.headerRightLogo);
            }
            if (formData.watermarkImage) {
              submitData.append("watermarkImage", formData.watermarkImage);
            }
            if (formData.technicianSignature) {
              submitData.append(
                "technicianSignature",
                formData.technicianSignature
              );
            }
            if (formData.validatorSignature) {
              submitData.append(
                "validatorSignature",
                formData.validatorSignature
              );
            }

            const response = await fetch(
              `https://api.dsecuretech.com/api/EnhancedAuditReports/${reportId}/export-pdf-with-files`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${user?.token || ""}`,
                },
                body: submitData,
              }
            );

            if (response.ok) {
              const blob = await response.blob();
              const fileName = `custom-report-${reportId}-${Date.now()}.pdf`;
              zip.file(fileName, blob);
              successCount++;
            } else {
              console.warn(`Failed to customize report ${reportId}`);
              failedCount++;
            }
          } catch (error) {
            console.error(`Error customizing report ${reportId}:`, error);
            failedCount++;
          }
        }

        if (successCount === 0) {
          showError("Customization Failed", "No reports could be customized");
          return;
        }

        // Generate ZIP file
        const zipBlob = await zip.generateAsync({ type: "blob" });

        // Create download link
        const url = window.URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `custom-reports-${
          new Date().toISOString().split("T")[0]
        }.zip`;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        if (failedCount > 0) {
          showSuccess(
            "Partial Success",
            `Customized ${successCount} reports. ${failedCount} failed. ZIP file downloaded.`
          );
        } else {
          showSuccess(
            `Successfully customized and downloaded ${successCount} reports as ZIP`
          );
        }
      } else {
        // Regular report generation (existing functionality)
        const submitData = new FormData();

        // Add text fields
        submitData.append("reportTitle", formData.reportTitle);
        submitData.append("headerText", formData.headerText);
        submitData.append("technicianName", formData.technicianName);
        submitData.append("technicianDept", formData.technicianDept);
        submitData.append("validatorName", formData.validatorName);
        submitData.append("validatorDept", formData.validatorDept);

        // Add file fields
        if (formData.headerLeftLogo) {
          submitData.append("headerLeftLogo", formData.headerLeftLogo);
        }
        if (formData.headerRightLogo) {
          submitData.append("headerRightLogo", formData.headerRightLogo);
        }
        if (formData.watermarkImage) {
          submitData.append("watermarkImage", formData.watermarkImage);
        }
        if (formData.technicianSignature) {
          submitData.append(
            "technicianSignature",
            formData.technicianSignature
          );
        }
        if (formData.validatorSignature) {
          submitData.append("validatorSignature", formData.validatorSignature);
        }

        // Simulate API call for regular report generation
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // console.log(
          // "Generating regular report with data:",
          // Object.fromEntries(submitData)
        // );

        showSuccess(
          "Report Generation Started",
          `Report "${formData.reportTitle}" generation has started! You will be notified when it's ready.`
        );
      }

      // Navigate back to reports
      navigate("/admin/reports");
    } catch (error) {
      console.error("Error generating report:", error);
      showError(
        "Report Generation Failed",
        "Failed to generate report. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Generate Report - Admin Dashboard | DSecureTech</title>
        <meta
          name="description"
          content="Generate custom reports for data erasure activities in DSecureTech admin dashboard."
        />
      </Helmet>

      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate("/admin/reports")}
                className="text-slate-600 hover:text-slate-900 transition-colors"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {isBulkMode
                  ? `Bulk Customize Reports (${bulkReportIds.length} selected)`
                  : reportId
                  ? `Generate Custom Report - Report #${reportId}`
                  : "Generate Report"}
              </h1>
            </div>
            <p className="text-slate-600">
              {isBulkMode
                ? `Configure settings for ${
                    bulkReportIds.length
                  } reports: ${bulkReportIds.join(", ")}`
                : "Create custom reports for data erasure activities and compliance"}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="card">
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">
                Report Configuration
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Configure your custom report settings
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Report Title */}
              <div>
                <label
                  htmlFor="reportTitle"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  ReportTitle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="reportTitle"
                  name="reportTitle"
                  value={formData.reportTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter report title"
                />
              </div>

              {/* Header Text */}
              <div>
                <label
                  htmlFor="headerText"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  HeaderText <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="headerText"
                  name="headerText"
                  value={formData.headerText}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter header text"
                />
              </div>

              {/* Header Left Logo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  HeaderLeftLogo
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.headerLeftLogo?.name || ""}
                    readOnly
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md bg-slate-50"
                    placeholder="No file chosen"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleFileSelect("headerLeftLogo", headerLeftLogoRef)
                    }
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"
                  >
                    Choose file...
                  </button>
                </div>
                <input
                  ref={headerLeftLogoRef}
                  type="file"
                  name="headerLeftLogo"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="hidden"
                />
                {/* <div className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="headerLeftLogoEmpty"
                    className="rounded border-slate-300"
                  />
                  <label htmlFor="headerLeftLogoEmpty" className="text-sm text-slate-600">
                    Send empty value
                  </label>
                </div> */}
              </div>

              {/* Header Right Logo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  HeaderRightLogo
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.headerRightLogo?.name || ""}
                    readOnly
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md bg-slate-50"
                    placeholder="No file chosen"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleFileSelect("headerRightLogo", headerRightLogoRef)
                    }
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"
                  >
                    Choose file...
                  </button>
                </div>
                <input
                  ref={headerRightLogoRef}
                  type="file"
                  name="headerRightLogo"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="hidden"
                />
                {/* <div className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="headerRightLogoEmpty"
                    className="rounded border-slate-300"
                  />
                  <label htmlFor="headerRightLogoEmpty" className="text-sm text-slate-600">
                    Send empty value
                  </label>
                </div> */}
              </div>

              {/* Watermark Image */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  WatermarkImage
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.watermarkImage?.name || ""}
                    readOnly
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md bg-slate-50"
                    placeholder="No file chosen"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleFileSelect("watermarkImage", watermarkImageRef)
                    }
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"
                  >
                    Choose file...
                  </button>
                </div>
                <input
                  ref={watermarkImageRef}
                  type="file"
                  name="watermarkImage"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="hidden"
                />
                {/* <div className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="watermarkImageEmpty"
                    className="rounded border-slate-300"
                  />
                  <label htmlFor="watermarkImageEmpty" className="text-sm text-slate-600">
                    Send empty value
                  </label>
                </div> */}
              </div>

              {/* Technician Name */}
              <div>
                <label
                  htmlFor="technicianName"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  TechnicianName
                </label>
                <input
                  type="text"
                  id="technicianName"
                  name="technicianName"
                  value={formData.technicianName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter technician name"
                />
              </div>

              {/* Technician Department */}
              <div>
                <label
                  htmlFor="technicianDept"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  TechnicianDept
                </label>
                <input
                  type="text"
                  id="technicianDept"
                  name="technicianDept"
                  value={formData.technicianDept}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter technician department"
                />
              </div>

              {/* Validator Name */}
              <div>
                <label
                  htmlFor="validatorName"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  ValidatorName
                </label>
                <input
                  type="text"
                  id="validatorName"
                  name="validatorName"
                  value={formData.validatorName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter validator name"
                />
              </div>

              {/* Validator Department */}
              <div>
                <label
                  htmlFor="validatorDept"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  ValidatorDept
                </label>
                <input
                  type="text"
                  id="validatorDept"
                  name="validatorDept"
                  value={formData.validatorDept}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter validator department"
                />
              </div>

              {/* Technician Signature */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  TechnicianSignature
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.technicianSignature?.name || ""}
                    readOnly
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md bg-slate-50"
                    placeholder="No file chosen"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleFileSelect(
                        "technicianSignature",
                        technicianSignatureRef
                      )
                    }
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"
                  >
                    Choose file...
                  </button>
                </div>
                <input
                  ref={technicianSignatureRef}
                  type="file"
                  name="technicianSignature"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="hidden"
                />
                {/* <div className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="technicianSignatureEmpty"
                    className="rounded border-slate-300"
                  />
                  <label htmlFor="technicianSignatureEmpty" className="text-sm text-slate-600">
                    Send empty value
                  </label>
                </div> */}
              </div>

              {/* Validator Signature */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ValidatorSignature
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.validatorSignature?.name || ""}
                    readOnly
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md bg-slate-50"
                    placeholder="No file chosen"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleFileSelect(
                        "validatorSignature",
                        validatorSignatureRef
                      )
                    }
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"
                  >
                    Choose file...
                  </button>
                </div>
                <input
                  ref={validatorSignatureRef}
                  type="file"
                  name="validatorSignature"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="hidden"
                />
                {/* <div className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="validatorSignatureEmpty"
                    className="rounded border-slate-300"
                  />
                  <label htmlFor="validatorSignatureEmpty" className="text-sm text-slate-600">
                    Send empty value
                  </label>
                </div> */}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin/reports")}
                className="btn-secondary px-6 py-2"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary px-6 py-2 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
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
                    {isBulkMode
                      ? `Processing ${bulkReportIds.length} reports...`
                      : "Executing..."}
                  </>
                ) : isBulkMode ? (
                  `Customize & Download ${bulkReportIds.length} Reports`
                ) : (
                  "Execute"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
