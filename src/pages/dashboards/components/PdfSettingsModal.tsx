import React from "react";

// PDF Form Data ka type — parent se shared hota hai
interface PdfFormData {
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
}

// Base64 images ka type
interface ImageBase64State {
  headerLeftLogo: string | null;
  headerRightLogo: string | null;
  watermarkImage: string | null;
  technicianSignature: string | null;
  validatorSignature: string | null;
}

interface PdfSettingsModalProps {
  showBulkSettingsModal: boolean;
  setShowBulkSettingsModal: (show: boolean) => void;
  pdfFormData: PdfFormData;
  setPdfFormData: React.Dispatch<React.SetStateAction<PdfFormData>>;
  imageBase64: ImageBase64State;
  handleImageUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => void;
  savePdfSettingsToServer: () => Promise<boolean>;
  pdfSettingsLoading: boolean;
  isDemo: boolean;
  showInfo: (title: string, message?: string) => void;
  showSuccess: (message: string) => void;
}

// Bulk PDF Export Settings Modal — settings configure karta hai
const PdfSettingsModal: React.FC<PdfSettingsModalProps> = ({
  showBulkSettingsModal,
  setShowBulkSettingsModal,
  pdfFormData,
  setPdfFormData,
  imageBase64,
  handleImageUpload,
  savePdfSettingsToServer,
  pdfSettingsLoading,
  isDemo,
  showInfo,
  showSuccess,
}) => {
  if (!showBulkSettingsModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900">Settings</h2>
            {pdfSettingsLoading && (
              <span className="text-sm text-blue-600 flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              disabled={pdfSettingsLoading}
              onClick={async () => {
                if (isDemo) {
                  showInfo(
                    "Demo Mode",
                    "Saving PDF settings is disabled in demo mode",
                  );
                  setShowBulkSettingsModal(false);
                  return;
                }
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
              {(pdfFormData.headerLeftLogo ||
                imageBase64.headerLeftLogo) && (
                <p className="text-xs text-green-600 mt-1">
                  ✓{" "}
                  {pdfFormData.headerLeftLogo
                    ? "Image uploaded"
                    : "Saved image"}
                </p>
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
              {(pdfFormData.headerRightLogo ||
                imageBase64.headerRightLogo) && (
                <p className="text-xs text-green-600 mt-1">
                  ✓{" "}
                  {pdfFormData.headerRightLogo
                    ? "Image uploaded"
                    : "Saved image"}
                </p>
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
              <p className="text-xs text-green-600 mt-1">
                ✓{" "}
                {pdfFormData.watermarkImage
                  ? "Watermark uploaded"
                  : "Saved watermark"}
              </p>
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
                onChange={(e) =>
                  handleImageUpload(e, "technicianSignature")
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
              />
              {(pdfFormData.technicianSignature ||
                imageBase64.technicianSignature) && (
                <p className="text-xs text-green-600 mt-1">
                  ✓{" "}
                  {pdfFormData.technicianSignature
                    ? "Signature uploaded"
                    : "Saved signature"}
                </p>
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
              {(pdfFormData.validatorSignature ||
                imageBase64.validatorSignature) && (
                <p className="text-xs text-green-600 mt-1">
                  ✓{" "}
                  {pdfFormData.validatorSignature
                    ? "Signature uploaded"
                    : "Saved signature"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfSettingsModal;

// Re-export types for use in parent
export type { PdfFormData, ImageBase64State };
