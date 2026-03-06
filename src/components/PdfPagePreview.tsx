import { Document, Page, pdfjs } from "react-pdf";

// Initialize PDF Worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfPagePreviewProps {
  blob: Blob;
}

export default function PdfPagePreview({ blob }: PdfPagePreviewProps) {
  return (
    <Document
      file={blob}
      onLoadError={(error) => console.error("Error loading PDF:", error)}
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
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
  );
}
