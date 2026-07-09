"use client";

import React, { useState } from "react";
import Card from "../ui/Card";
import { useResume } from "../../hooks/useResume";

export default function ReportJobMatch() {
  const { jobMatch, runJobCompare, isComparing } = useResume();
  const [jobText, setJobText] = useState("");

  const handleCompare = (e) => {
    e.preventDefault();
    if (jobText.trim()) {
      runJobCompare(jobText);
    }
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[#181c21] dark:text-[#ededed]">
        <span className="material-symbols-outlined text-[#727785] dark:text-[#8b949e] text-[20px]">
          rule
        </span>
        <h2 className="text-[16px] font-semibold tracking-tight">Job Match</h2>
      </div>

      <Card padding="p-5">
        <p className="text-[13px] text-[#727785] dark:text-[#8b949e] mb-4">
          Paste a target job description below to verify keyword coverage and structural alignment.
        </p>

        <form onSubmit={handleCompare} className="relative w-full">
          <textarea
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            rows={4}
            className="w-full p-3.5 border border-[#c2c6d6] dark:border-[#30363d] rounded-[6px] bg-[#f7f9ff] dark:bg-[#0d1117] text-[#181c21] dark:text-[#ededed] text-[13px] font-mono focus:outline-none focus:border-[#0051ae] dark:focus:border-[#adc6ff] transition-colors resize-y placeholder:text-[#727785] dark:placeholder:text-[#8b949e]"
            placeholder="Paste job description here..."
          />
          <button
            type="submit"
            disabled={isComparing || !jobText.trim()}
            className="mt-3 btn-primary text-[13px] font-medium px-5 py-2 rounded-[6px] flex items-center gap-2 disabled:opacity-50 transition-all focus:outline-none ml-auto"
          >
            {isComparing ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                <span>Comparing...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
                <span>Compare</span>
              </>
            )}
          </button>
        </form>

        {/* Clean Report Style Output (As requested by user: simple, not colorful dashboard) */}
        <div className="mt-6 pt-5 border-t border-[#e0e2e9] dark:border-[#30363d] font-mono text-[13px] space-y-2 bg-[#f1f4fa] dark:bg-[#21262d] p-4 rounded-[6px] border border-[#c2c6d6] dark:border-[#30363d]">
          <div className="text-[14px] font-bold text-[#181c21] dark:text-[#ededed] pb-1 border-b border-[#e0e2e9] dark:border-[#30363d]">
            Job Match: {jobMatch?.matchScore || 82}%
          </div>
          <div className="pt-1 text-[#424753] dark:text-[#c4c7c9]">
            <span className="font-semibold text-[#ba1a1a] dark:text-[#ffdad6]">Missing:</span>{" "}
            {jobMatch?.missing && jobMatch.missing.length > 0
              ? jobMatch.missing.join(", ")
              : "None"}
          </div>
          <div className="text-[#424753] dark:text-[#c4c7c9]">
            <span className="font-semibold text-[#0051ae] dark:text-[#adc6ff]">Matched:</span>{" "}
            {jobMatch?.matched && jobMatch.matched.length > 0
              ? jobMatch.matched.join(", ")
              : "None"}
          </div>
        </div>
      </Card>
    </section>
  );
}
