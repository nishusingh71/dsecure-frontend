import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

// PDF Worker initialize — component load hone pe set hoga
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// PDF Preview Modal ke props interface
interface PdfPreviewModalProps {
  showPreviewModal: boolean;
  previewBlobs: Blob[];
  currentPreviewIndex: number;
  setCurrentPreviewIndex: React.Dispatch<React.SetStateAction<number>>;
  setShowPreviewModal: (show: boolean) => void;
  isDemo: boolean;
  showInfo: (title: string, message?: string) => void;
}

// PDF Preview Modal component — react-pdf se rendered PDF dikhata hai
const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  showPreviewModal,
  previewBlobs,
  currentPreviewIndex,
  setCurrentPreviewIndex,
  setShowPreviewModal,
  isDemo,
  showInfo,
}) => {
  if (!showPreviewModal || previewBlobs.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-[90vh] flex flex-col">
        {/* Header / Controls */}
        <div className="bg-slate-100 border-b px-4 py-3 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-900">
              Report Preview{" "}
              {previewBlobs.length > 1
                ? `(${currentPreviewIndex + 1} of ${previewBlobs.length})`
                : ""}
            </h2>

            {previewBlobs.length > 1 && (
              <div className="flex items-center gap-2 bg-white rounded-md border px-1 py-0.5">
                <button
                  disabled={currentPreviewIndex === 0}
                  onClick={() => setCurrentPreviewIndex((i) => i - 1)}
                  className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Previous Report"
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
                <span className="text-sm font-medium w-16 text-center">
                  {currentPreviewIndex + 1} / {previewBlobs.length}
                </span>
                <button
                  disabled={currentPreviewIndex === previewBlobs.length - 1}
                  onClick={() => setCurrentPreviewIndex((i) => i + 1)}
                  className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Next Report"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Download Button */}
            <button
              onClick={() => {
                if (isDemo) {
                  showInfo(
                    "Demo Mode",
                    "PDF Preview download is disabled in demo mode",
                  );
                  return;
                }
                const blob = previewBlobs[currentPreviewIndex];
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `report-preview-${currentPreviewIndex + 1}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium transition-colors"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </button>

            <button
              onClick={() => setShowPreviewModal(false)}
              className="text-slate-500 hover:text-slate-700 p-1 rounded hover:bg-slate-200 transition-colors"
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

        {/* Content Area - PDF Viewer */}
        <div className="flex-1 bg-slate-500 overflow-auto flex justify-center p-4">
          {previewBlobs[currentPreviewIndex] ? (
            <Document
              file={previewBlobs[currentPreviewIndex]}
              onLoadError={(error) =>
                console.error("Error loading PDF:", error)
              }
              loading={
                <div className="flex items-center justify-center p-10 text-white">
                  <svg
                    className="animate-spin h-8 w-8 text-white mr-3"
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
                  Loading PDF...
                </div>
              }
              className="shadow-lg"
            >
              <Page
                pageNumber={1}
                className="shadow-xl"
                renderAnnotationLayer={false}
                renderTextLayer={false}
                scale={1.2}
              />
            </Document>
          ) : (
            <div className="text-white text-lg">No PDF loaded</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfPreviewModal;
