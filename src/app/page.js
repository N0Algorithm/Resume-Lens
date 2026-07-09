"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useResume } from "../hooks/useResume";
import UploadWorkspace from "../components/upload/UploadWorkspace";
import ReportOverview from "../components/analysis/ReportOverview";
import ReportSummary from "../components/analysis/ReportSummary";
import ReportSkills from "../components/analysis/ReportSkills";
import ReportRecommendations from "../components/analysis/ReportRecommendations";
import ReportAtsReview from "../components/analysis/ReportAtsReview";
import ReportJobMatch from "../components/analysis/ReportJobMatch";

// Dynamically import PdfViewer with SSR disabled to prevent DOMMatrix/pdfjs SSR issues
const PdfViewer = dynamic(() => import("../components/analysis/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-4 h-full w-full bg-[#ebeef5] dark:bg-[#0d1117] p-12 items-center justify-center">
      <span className="material-symbols-outlined animate-spin text-[32px] text-[#0051ae] dark:text-[#adc6ff]">
        sync
      </span>
      <span className="text-[13px] font-mono text-[#727785] dark:text-[#8b949e]">
        Loading PDF Engine...
      </span>
    </div>
  ),
});

export default function Home() {
  const { view, isGeminiAnalyzing } = useResume();

  if (view === "upload") {
    return <UploadWorkspace />;
  }

  // 1-Screen locked studio analysis view (zero global window scrolling)
  return (
    <div className="w-full h-full flex flex-col md:flex-row overflow-hidden animate-fadeIn">
      {/* Left Panel: PDF Viewer (48% width, 100% height, independent scroll) */}
      <div className="w-full md:w-[48%] h-full flex flex-col overflow-hidden border-r border-[#c2c6d6] dark:border-[#30363d] bg-[#ebeef5] dark:bg-[#0d1117]">
        <PdfViewer />
      </div>

      {/* Right Panel: Structured Report (52% width, 100% height, independent scroll) */}
      <div className="w-full md:w-[52%] h-full overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar bg-white dark:bg-[#161b22]/40">
        {isGeminiAnalyzing ? (
          <div className="max-w-[720px] mx-auto w-full h-full flex flex-col items-center justify-center min-h-[460px] gap-6 animate-fadeIn my-auto">
            <div className="w-14 h-14 rounded-full bg-[#f1f4fa] dark:bg-[#21262d] border border-[#c2c6d6] dark:border-[#30363d] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[28px] text-[#0051ae] dark:text-[#adc6ff] animate-pulse">
                description
              </span>
            </div>
            <div className="text-center space-y-1.5">
              <h2 className="text-[20px] font-semibold text-[#181c21] dark:text-[#ededed] tracking-tight">
                Reviewing your resume...
              </h2>
              <p className="text-[14px] text-[#727785] dark:text-[#8b949e] max-w-[360px]">
                We're reading your experience, checking keyword formatting, and preparing tailored feedback.
              </p>
            </div>
            <div className="w-full max-w-[380px] bg-[#f8f9fc] dark:bg-[#21262d]/50 border border-[#e0e2e9] dark:border-[#30363d] rounded-[6px] p-4 space-y-3 text-[13px] text-[#424753] dark:text-[#c4c7c9]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-[#0051ae] dark:text-[#adc6ff] animate-spin">sync</span>
                <span className="font-medium text-[#181c21] dark:text-[#ededed]">Reading document structure...</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-[#727785] dark:text-[#8b949e]">rule</span>
                <span>Checking ATS formatting and keywords...</span>
              </div>
              <div className="flex items-center gap-3 opacity-70">
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                <span>Preparing practical recommendations...</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-[720px] mx-auto w-full flex flex-col gap-6 pb-12 animate-fadeIn">
            <ReportOverview />
            <div className="h-px bg-[#e0e2e9] dark:bg-[#30363d] w-full" />
            <ReportSummary />
            <div className="h-px bg-[#e0e2e9] dark:bg-[#30363d] w-full" />
            <ReportSkills />
            <div className="h-px bg-[#e0e2e9] dark:bg-[#30363d] w-full" />
            <ReportRecommendations />
            <div className="h-px bg-[#e0e2e9] dark:bg-[#30363d] w-full" />
            <ReportAtsReview />
            <div className="h-px bg-[#e0e2e9] dark:bg-[#30363d] w-full" />
            <ReportJobMatch />
          </div>
        )}
      </div>
    </div>
  );
}
