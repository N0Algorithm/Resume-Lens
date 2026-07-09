"use client";

import React from "react";

export default function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={`px-3 py-1 bg-[#f1f4fa] dark:bg-[#21262d] text-[#424753] dark:text-[#c4c7c9] text-[12px] font-medium rounded-full inline-flex items-center gap-1.5 transition-colors border border-transparent hover:border-[#c2c6d6] dark:hover:border-[#30363d] ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
