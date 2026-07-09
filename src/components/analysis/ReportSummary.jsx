"use client";

import React from "react";
import Card from "../ui/Card";
import { useResume } from "../../hooks/useResume";

export default function ReportSummary() {
  const { report } = useResume();
  const level = report?.candidateLevel || "Senior Software Engineer (8+ YOE)";
  const roles = report?.suggestedRoles || ["Senior Frontend Engineer", "Full-Stack Tech Lead", "Cloud Web Architect"];

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[#181c21] dark:text-[#ededed]">
        <span className="material-symbols-outlined text-[#727785] dark:text-[#8b949e] text-[20px]">
          subject
        </span>
        <h2 className="text-[16px] font-semibold tracking-tight">Summary & Career Alignment</h2>
      </div>
      <Card padding="p-5" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e0e2e9] dark:border-[#30363d] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0051ae] dark:text-[#adc6ff] text-[18px]">person</span>
            <span className="text-[13px] font-semibold text-[#181c21] dark:text-[#ededed]">Experience Level:</span>
            <span className="text-[13px] font-mono font-medium text-[#0051ae] dark:text-[#adc6ff] bg-[#f1f4fa] dark:bg-[#21262d] px-2.5 py-0.5 rounded-[4px] border border-[#e0e2e9] dark:border-[#30363d]">{level}</span>
          </div>
        </div>
        <p className="text-[14px] leading-relaxed text-[#424753] dark:text-[#c4c7c9]">
          {report?.summary ||
            "This resume is well-structured and clearly highlights technical experience. However, there are opportunities to quantify achievements more aggressively to improve ATS ranking and recruiter impact."}
        </p>
        {roles.length > 0 && (
          <div className="flex flex-col gap-2 pt-2 border-t border-[#e0e2e9] dark:border-[#30363d]">
            <span className="text-[12px] font-semibold text-[#727785] dark:text-[#8b949e] uppercase tracking-wider">Recommended Roles:</span>
            <div className="flex flex-wrap gap-2">
              {roles.map((role, idx) => (
                <span key={idx} className="text-[12px] font-medium text-[#181c21] dark:text-[#ededed] bg-[#f1f4fa] dark:bg-[#21262d] px-3 py-1 rounded-full border border-[#c2c6d6] dark:border-[#30363d]">
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </section>
  );
}
