"use client";

import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { useResume } from "../../hooks/useResume";

export default function ReportSkills() {
  const { report } = useResume();
  const skills = report?.skills || [
    "JavaScript", "React", "Node.js", "TypeScript", "Docker", "AWS", "Git", "REST APIs"
  ];
  const strongVerbs = report?.strongVerbs || ["Architected", "Spearheaded", "Reduced", "Implemented", "Engineered"];
  const weakPhrases = report?.weakPhrases || ["Responsible for", "Worked on", "Helped with"];

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#181c21] dark:text-[#ededed]">
          <span className="material-symbols-outlined text-[#727785] dark:text-[#8b949e] text-[20px]">
            code
          </span>
          <h2 className="text-[16px] font-semibold tracking-tight">Skills & Keywords</h2>
        </div>
        <Card padding="p-5">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} className="font-mono">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#181c21] dark:text-[#ededed]">
          <span className="material-symbols-outlined text-[#0051ae] dark:text-[#adc6ff] text-[20px]">
            spellcheck
          </span>
          <h2 className="text-[16px] font-semibold tracking-tight">Word Choice & Vocabulary</h2>
        </div>
        <Card padding="p-5" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold text-[#1f883d] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Strong Action Words</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {strongVerbs.map((verb, idx) => (
                <span key={idx} className="text-[12px] font-mono font-medium text-[#1f883d] bg-[#f1f8f3] dark:bg-[#1f883d]/20 px-2.5 py-1 rounded-[4px] border border-[#1f883d]/30">
                  {verb}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold text-[#d97706] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">info</span>
              <span>Words to Replace</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {weakPhrases.map((phrase, idx) => (
                <span key={idx} className="text-[12px] font-mono font-medium text-[#d97706] bg-[#fffbeb] dark:bg-[#d97706]/20 px-2.5 py-1 rounded-[4px] border border-[#d97706]/30 line-through">
                  {phrase}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
