"use client";

import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import { useResume } from "../../hooks/useResume";

export default function ReportOverview() {
  const { report } = useResume();
  const [displayScore, setDisplayScore] = useState("—");
  const [isAnalyzingScore, setIsAnalyzingScore] = useState(true);

  useEffect(() => {
    if (report && report.overallScore) {
      const initTimer = setTimeout(() => {
        setIsAnalyzingScore(true);
        setDisplayScore("—");
      }, 0);
      
      const timer = setTimeout(() => {
        setIsAnalyzingScore(false);
        // Animate counter from 70 to target
        let current = 70;
        const target = report.overallScore;
        const interval = setInterval(() => {
          if (current >= target) {
            setDisplayScore(target);
            clearInterval(interval);
          } else {
            current += 1;
            setDisplayScore(current);
          }
        }, 30);
        return () => clearInterval(interval);
      }, 600);

      return () => {
        clearTimeout(initTimer);
        clearTimeout(timer);
      };
    }
  }, [report]);

  return (
    <section className="flex flex-col gap-4">
      {/* Report Title Banner */}
      <div className="flex items-center justify-between border-b border-[#c2c6d6] dark:border-[#30363d] pb-4">
        <div>
          <h1 className="text-[22px] font-semibold text-[#181c21] dark:text-[#ededed] tracking-tight">
            Resume Review Report
          </h1>
          <p className="text-[13px] text-[#727785] dark:text-[#8b949e] mt-0.5">
            Comprehensive feedback and keyword alignment
          </p>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Overall Score Card - Animated Placeholder */}
        <Card className="flex flex-col justify-between" padding="p-5">
          <div className="text-[12px] font-medium text-[#727785] dark:text-[#8b949e] uppercase tracking-wider mb-2">
            Overall Score
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[32px] font-semibold text-[#0051ae] dark:text-[#adc6ff] font-mono leading-none">
              {displayScore}
            </span>
            <span className="text-[13px] text-[#727785] dark:text-[#8b949e] font-mono">
              / 100
            </span>
          </div>
          <div className="text-[12px] text-[#727785] dark:text-[#8b949e] mt-2 italic">
            {isAnalyzingScore ? "Waiting for analysis..." : "Overall structural alignment"}
          </div>
        </Card>

        {/* Readability Card */}
        <Card className="flex flex-col justify-between" padding="p-5">
          <div className="text-[12px] font-medium text-[#727785] dark:text-[#8b949e] uppercase tracking-wider mb-2">
            Readability
          </div>
          <div className="text-[22px] font-semibold text-[#181c21] dark:text-[#ededed] leading-none mt-1">
            {report?.readability || "Strong"}
          </div>
          <div className="text-[12px] text-[#727785] dark:text-[#8b949e] mt-2">
            Clear visual hierarchy & spacing
          </div>
        </Card>

        {/* Impact Words Card */}
        <Card className="flex flex-col justify-between" padding="p-5">
          <div className="text-[12px] font-medium text-[#727785] dark:text-[#8b949e] uppercase tracking-wider mb-2">
            Action Words
          </div>
          <div className="text-[22px] font-semibold text-[#181c21] dark:text-[#ededed] leading-none mt-1 font-mono">
            {report?.impactWordsCount || 14}
          </div>
          <div className="text-[12px] text-[#727785] dark:text-[#8b949e] mt-2">
            Strong action-oriented verbs
          </div>
        </Card>
      </div>

      {/* Resume Health Breakdown */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#181c21] dark:text-[#ededed] uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#0051ae] dark:text-[#adc6ff]">analytics</span>
            <span>Resume Health Breakdown</span>
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Quantifiable Impact", score: report?.pillarScores?.impactMetrics || 82, icon: "trending_up" },
            { label: "Keyword Match", score: report?.pillarScores?.keywords || 94, icon: "key" },
            { label: "Formatting & Layout", score: report?.pillarScores?.formatting || 90, icon: "layers" },
            { label: "Contact Info", score: report?.pillarScores?.contactInfo || 100, icon: "contact_mail" },
          ].map((pillar, i) => (
            <Card key={i} padding="p-3" className="flex flex-col gap-2">
              <div className="flex items-start justify-between text-[12px] text-[#727785] dark:text-[#8b949e] gap-1">
                <span className="font-medium text-wrap leading-tight">{pillar.label}</span>
                <span className="material-symbols-outlined text-[16px] text-[#0051ae] dark:text-[#adc6ff] shrink-0">{pillar.icon}</span>
              </div>
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-[18px] font-semibold text-[#181c21] dark:text-[#ededed]">{pillar.score}%</span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded ${pillar.score >= 80 ? 'text-[#1f883d] bg-[#f1f8f3] dark:bg-[#1f883d]/20' : 'text-[#d97706] bg-[#fffbeb] dark:bg-[#d97706]/20'}`}>
                  {pillar.score >= 85 ? "Good" : "Review"}
                </span>
              </div>
              <div className="w-full bg-[#ebeef5] dark:bg-[#21262d] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#0051ae] dark:bg-[#adc6ff] h-full rounded-full transition-all duration-500" style={{ width: `${pillar.score}%` }} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
