"use client";

import React from "react";
import Card from "../ui/Card";
import { useResume } from "../../hooks/useResume";

export default function ReportRecommendations() {
  const { report } = useResume();
  const recommendations = report?.recommendations || [];
  const rewrite = report?.bulletRewrite || {
    original: "Worked on frontend web app using React and reduced bundle size.",
    improved: "Architected modular frontend architecture in React and Next.js, slashing JavaScript bundle size by 42% and boosting page load speed for 5M+ users.",
    why: "Replaces weak passive phrasing ('Worked on') with strong clinical ownership ('Architected') and adds quantifiable scale and impact metrics."
  };

  return (
    <section className="flex flex-col gap-5">
      {rewrite && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#181c21] dark:text-[#ededed]">
            <span className="material-symbols-outlined text-[#0051ae] dark:text-[#adc6ff] text-[20px]">
              edit_note
            </span>
            <h2 className="text-[16px] font-semibold tracking-tight">Bullet Point Suggestion</h2>
          </div>
          <Card padding="p-5" className="flex flex-col gap-4 bg-[#f7f9ff] dark:bg-[#161b22]/80 border-l-4 border-l-[#0051ae]">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-[#ba1a1a] dark:text-[#ffdad6] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">remove_circle_outline</span>
                <span>Current:</span>
              </span>
              <p className="text-[13px] text-[#424753] dark:text-[#c4c7c9] font-mono bg-white dark:bg-[#0d1117] p-2.5 rounded border border-[#e0e2e9] dark:border-[#30363d] line-through opacity-80">
                "{rewrite.original}"
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-[#1f883d] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Suggested:</span>
              </span>
              <p className="text-[13px] font-medium text-[#181c21] dark:text-[#ededed] bg-white dark:bg-[#0d1117] p-3 rounded border border-[#1f883d]/40 shadow-sm">
                "{rewrite.improved}"
              </p>
            </div>
            {rewrite.why && (
              <div className="text-[12px] text-[#727785] dark:text-[#8b949e] italic flex items-start gap-1.5 pt-1 border-t border-[#e0e2e9] dark:border-[#30363d]">
                <span className="material-symbols-outlined text-[14px] text-[#0051ae] dark:text-[#adc6ff] shrink-0 mt-0.5">info</span>
                <span><strong>Why it's better:</strong> {rewrite.why}</span>
              </div>
            )}
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#181c21] dark:text-[#ededed]">
          <span className="material-symbols-outlined text-[#727785] dark:text-[#8b949e] text-[20px]">
            lightbulb
          </span>
          <h2 className="text-[16px] font-semibold tracking-tight">Recommendations</h2>
        </div>

        <div className="flex flex-col gap-3">
          {recommendations.map((rec) => (
            <Card
              key={rec.id}
              padding="p-5"
              className="flex gap-4 items-start border-l-4 border-l-[#0051ae] dark:border-l-[#adc6ff] hover:bg-[#f7f9ff] dark:hover:bg-[#21262d]/50 transition-colors"
            >
              <span className="material-symbols-outlined text-[#0051ae] dark:text-[#adc6ff] mt-0.5 text-[20px] shrink-0">
                {rec.icon || "info"}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-[14px] font-semibold text-[#181c21] dark:text-[#ededed]">
                  {rec.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#424753] dark:text-[#c4c7c9]">
                  {rec.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
