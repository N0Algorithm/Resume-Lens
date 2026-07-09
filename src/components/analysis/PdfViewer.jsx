"use client";

import React, { useState, useEffect } from "react";
import { useResume } from "../../hooks/useResume";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker using cloudflare
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
}

export default function PdfViewer() {
  const { file, fileName, resetToUpload, setResumeText } = useResume();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.85);
  const [hasError, setHasError] = useState(false);

  // Reset page when file changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageNumber(1);
      setScale(0.85);
      setHasError(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [file]);

  async function onDocumentLoadSuccess(pdf) {
    setNumPages(pdf.numPages);
    setHasError(false);

    // Automatically extract text from all pages for AI analysis
    try {
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n\n";
      }
      if (setResumeText && fullText.trim()) {
        setResumeText(fullText.trim());
      }
    } catch (err) {
      console.error("Failed to extract text from PDF:", err);
    }
  }

  function onDocumentLoadError(error) {
    console.error("PDF load error:", error);
    setHasError(true);
  }

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.15, 1.8));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.15, 0.5));
  const resetZoom = () => setScale(0.85);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Top bar with file name and controls */}
      <div className="flex justify-between items-center bg-white dark:bg-[#161b22] border-b border-[#c2c6d6] dark:border-[#30363d] p-3 px-4 shrink-0 shadow-sm">
        <div className="flex items-center gap-2 overflow-hidden mr-2">
          <span className="material-symbols-outlined text-[#727785] dark:text-[#8b949e] text-[20px] shrink-0">
            description
          </span>
          <span className="text-[13px] font-mono font-medium text-[#181c21] dark:text-[#ededed] truncate">
            {fileName || "resume-v1.pdf"}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Zoom controls */}
          <div className="flex items-center bg-[#f1f4fa] dark:bg-[#21262d] rounded-[4px] p-0.5 border border-[#e0e2e9] dark:border-[#30363d]">
            <button
              onClick={zoomOut}
              className="p-1 hover:bg-[#e0e2e9] dark:hover:bg-[#30363d] rounded-[3px] text-[#424753] dark:text-[#c4c7c9] transition-colors flex items-center justify-center focus:outline-none cursor-pointer"
              title="Zoom Out"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <button
              onClick={resetZoom}
              className="text-[12px] font-mono px-2 text-[#424753] dark:text-[#c4c7c9] hover:text-[#0051ae] dark:hover:text-[#adc6ff] transition-colors focus:outline-none cursor-pointer"
              title="Reset Zoom to Fit"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={zoomIn}
              className="p-1 hover:bg-[#e0e2e9] dark:hover:bg-[#30363d] rounded-[3px] text-[#424753] dark:text-[#c4c7c9] transition-colors flex items-center justify-center focus:outline-none cursor-pointer"
              title="Zoom In"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>

          <div className="w-px h-4 bg-[#c2c6d6] dark:bg-[#30363d] mx-1" />

          {/* Replace Button -> returns to upload */}
          <button
            onClick={resetToUpload}
            className="btn-secondary px-3 py-1.5 text-[12px] font-medium rounded-[4px] transition-colors focus:outline-none cursor-pointer"
          >
            Replace
          </button>
        </div>
      </div>

      {/* PDF Viewer Canvas Area */}
      <div className="flex-1 overflow-auto relative p-6 bg-[#ebeef5] dark:bg-[#0d1117] custom-scrollbar flex flex-col items-center justify-start">
        {!hasError ? (
          <div className="w-full flex flex-col items-center justify-start my-auto pb-6">
            <Document
              file={file || "/sample-resume.pdf"}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex flex-col items-center gap-3 py-12 text-[#727785] dark:text-[#8b949e]">
                  <span className="material-symbols-outlined animate-spin text-[28px]">sync</span>
                  <span className="text-[13px] font-mono">Rendering Document...</span>
                </div>
              }
              error={
                <div className="text-center p-6 text-[#ba1a1a] dark:text-[#ffdad6]">
                  <p className="text-[14px] font-medium mb-1">Could not render PDF directly</p>
                  <p className="text-[12px] text-[#727785] dark:text-[#8b949e]">Switching to visual fallback view...</p>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="shadow-md bg-white rounded-[4px] border border-[#d0d7de] dark:border-[#30363d]"
              />
            </Document>

            {/* Page navigation if multi-page */}
            {numPages > 1 && (
              <div className="flex items-center gap-4 mt-6 bg-white dark:bg-[#161b22] border border-[#c2c6d6] dark:border-[#30363d] px-4 py-2 rounded-full shadow-sm text-[13px]">
                <button
                  disabled={pageNumber <= 1}
                  onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                  className="disabled:opacity-40 hover:text-[#0051ae] dark:hover:text-[#adc6ff] transition-colors font-medium focus:outline-none cursor-pointer"
                >
                  Prev
                </button>
                <span className="font-mono text-[#727785] dark:text-[#8b949e]">
                  Page <strong className="text-[#181c21] dark:text-[#ededed]">{pageNumber}</strong> of {numPages}
                </span>
                <button
                  disabled={pageNumber >= numPages}
                  onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
                  className="disabled:opacity-40 hover:text-[#0051ae] dark:hover:text-[#adc6ff] transition-colors font-medium focus:outline-none cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          /* High-fidelity visual fallback if PDF worker/network fails */
          <div className="w-full max-w-[500px] bg-white text-[#181c21] p-10 rounded-[4px] shadow-md border border-[#c2c6d6] flex flex-col gap-6 font-sans my-auto">
            <div className="border-b border-[#e0e2e9] pb-4">
              <h3 className="text-[22px] font-bold tracking-tight text-[#0051ae]">ALEXANDER VANCE</h3>
              <p className="text-[12px] text-[#424753] font-mono mt-1">Senior Software Engineer | alexander.vance@example.com</p>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#424753] uppercase tracking-wider mb-2">Professional Summary</h4>
              <p className="text-[13px] leading-relaxed text-[#181c21]">
                Results-driven Senior Software Engineer with 8+ years of experience building scalable cloud-native web applications and distributed systems. Proven track record of improving system performance and leading high-performing engineering teams.
              </p>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#424753] uppercase tracking-wider mb-2">Core Competencies</h4>
              <p className="text-[13px] leading-relaxed text-[#181c21] font-mono">
                JavaScript, TypeScript, React, Next.js, Node.js, Docker, AWS (S3, ECS, Lambda), Git, REST APIs
              </p>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#424753] uppercase tracking-wider mb-2">Professional Experience</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[13px] font-semibold">
                    <span>Senior Frontend Engineer — TechCorp Inc.</span>
                    <span className="font-mono text-[12px] text-[#727785]">2021 - Present</span>
                  </div>
                  <ul className="list-disc list-inside text-[13px] text-[#424753] mt-1 space-y-1">
                    <li>Architected modular frontend applications using Next.js and React, serving 5M+ users.</li>
                    <li>Reduced frontend JavaScript bundle size by 42% through strategic code splitting.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
