"use client";

import React from "react";

export default function Card({ children, className = "", padding = "p-6", ...props }) {
  return (
    <div
      className={`bg-white dark:bg-[#161b22] border border-[#c2c6d6] dark:border-[#30363d] rounded-[6px] ${padding} transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
