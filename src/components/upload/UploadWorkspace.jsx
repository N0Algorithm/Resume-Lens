"use client";

import React, { useRef, useState } from "react";
import { useResume } from "../../hooks/useResume";

export default function UploadWorkspace() {
  const { status, statusText, startUpload } = useResume();
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        startUpload(file);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        startUpload(file);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  const triggerBrowse = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // When actively uploading, reading, or analyzing -> show smart step status
  if (status !== "idle") {
    const getProgressWidth = () => {
      if (status === "uploading") return "33%";
      if (status === "reading") return "66%";
      return "100%";
    };

    return (
      <div className="flex-grow flex flex-col items-center justify-center p-6 w-full max-w-[640px] mx-auto animate-fadeIn">
        <div className="w-full bg-white dark:bg-[#161b22] border border-[#c2c6d6] dark:border-[#30363d] rounded-[8px] p-12 flex flex-col items-center justify-center min-h-[320px] shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#f1f4fa] dark:bg-[#21262d] flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[28px] text-[#0051ae] dark:text-[#adc6ff] animate-pulse">
              description
            </span>
          </div>
          <div className="text-[18px] font-medium text-[#181c21] dark:text-[#ededed] mb-6 tracking-tight">
            {statusText}
          </div>
          <div className="w-56 bg-[#ebeef5] dark:bg-[#21262d] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#0051ae] dark:bg-[#adc6ff] h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: getProgressWidth() }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Default clean productivity upload view (no hero, no CTA, no marketing)
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6 w-full max-w-[640px] mx-auto">
      <div className="w-full text-center mb-8">
        <h1 className="text-[24px] font-semibold text-[#181c21] dark:text-[#ededed] tracking-tight">
          Upload Resume
        </h1>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerBrowse}
        className={`w-full bg-white dark:bg-[#161b22] border border-dashed rounded-[8px] p-12 flex flex-col items-center justify-center custom-upload-zone cursor-pointer min-h-[320px] shadow-sm ${
          isDragOver
            ? "dragover border-[#0051ae] dark:border-[#adc6ff] bg-[#f1f4fa] dark:bg-[#21262d]"
            : "border-[#c2c6d6] dark:border-[#30363d]"
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-[#f1f4fa] dark:bg-[#21262d] flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[32px] text-[#0051ae] dark:text-[#adc6ff]">
            upload_file
          </span>
        </div>

        <p className="text-[16px] font-medium text-[#181c21] dark:text-[#ededed] mb-2">
          Drop PDF here
        </p>
        <p className="text-[14px] text-[#727785] dark:text-[#8b949e] mb-6">or</p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            triggerBrowse();
          }}
          className="btn-primary text-[14px] font-medium px-6 py-2.5 rounded-[6px] flex items-center gap-2 focus:outline-none"
        >
          <span>Browse File</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => startUpload(null)}
          className="text-[13px] text-[#727785] dark:text-[#8b949e] hover:text-[#0051ae] dark:hover:text-[#adc6ff] underline transition-colors focus:outline-none"
        >
          Or test with a sample resume
        </button>
      </div>
    </div>
  );
}
