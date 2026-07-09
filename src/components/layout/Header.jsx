"use client";

import React from "react";
import { useResume } from "../../hooks/useResume";

export default function Header() {
  const { resetToUpload } = useResume();

  return (
    <header className="bg-white dark:bg-[#161b22] border-b border-[#c2c6d6] dark:border-[#30363d] sticky top-0 z-50 w-full transition-colors duration-200">
      <div className="flex justify-between items-center h-14 w-full px-6 max-w-[1280px] mx-auto">
        {/* Brand - clicking returns to upload workspace */}
        <button
          onClick={resetToUpload}
          className="text-[20px] font-semibold text-[#0051ae] dark:text-[#adc6ff] hover:opacity-80 transition-all flex items-center gap-2 focus:outline-none"
          title="Return to Upload Workspace"
        >
          <span className="material-symbols-outlined fill text-[22px]">lens</span>
          <span>ResumeLens</span>
        </button>

        {/* Navigation Links & Actions */}
        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-6 text-[14px] font-medium text-[#424753] dark:text-[#c4c7c9]">
            <a
              href="https://github.com/N0Algorithm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0051ae] dark:hover:text-[#adc6ff] transition-colors"
            >
              Profile
            </a>
            <a
              href="https://github.com/N0Algorithm/Resume-Lens"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0051ae] dark:hover:text-[#adc6ff] transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
