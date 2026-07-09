"use client";

import { useContext } from "react";
import { ResumeContext } from "../lib/ResumeContext";

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeContextProvider");
  }
  return context;
}
