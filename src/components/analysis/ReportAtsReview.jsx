"use client";

import React from "react";
import Card from "../ui/Card";
import { useResume } from "../../hooks/useResume";

export default function ReportAtsReview() {
  const { report } = useResume();
  const checks = report?.atsReview?.checks || [];

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[#181c21] dark:text-[#ededed]">
        <span className="material-symbols-outlined text-[#727785] dark:text-[#8b949e] text-[20px]">
          verified
        </span>
        <h2 className="text-[16px] font-semibold tracking-tight">ATS Review</h2>
      </div>

      <Card padding="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {checks.map((check, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-[#f1f4fa] dark:bg-[#21262d] rounded-[6px] border border-[#e0e2e9] dark:border-[#30363d]"
            >
              <span className="material-symbols-outlined text-[#1f883d] text-[18px] shrink-0 mt-0.5">
                check_circle
              </span>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#181c21] dark:text-[#ededed]">
                  {check.name}
                </span>
                <span className="text-[12px] text-[#727785] dark:text-[#8b949e] font-mono mt-0.5">
                  {check.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
