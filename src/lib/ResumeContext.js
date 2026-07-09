"use client";

import React, { createContext, useState, useCallback, useEffect } from "react";
import { UPLOAD_STEPS, SAMPLE_REPORT } from "../constants";

export const ResumeContext = createContext(null);

export function ResumeContextProvider({ children }) {
  // 'upload' | 'analysis'
  const [view, setView] = useState("upload");
  
  // File state
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [resumeText, setResumeText] = useState("");
  
  // Status state: 'idle' | 'uploading' | 'reading' | 'analyzing' | 'completed'
  const [status, setStatus] = useState("idle");
  const [statusText, setStatusText] = useState("");
  
  // Report and analysis data
  const [report, setReport] = useState(null);
  const [jobMatch, setJobMatch] = useState(SAMPLE_REPORT.defaultJobMatch);
  const [isComparing, setIsComparing] = useState(false);
  const [isGeminiAnalyzing, setIsGeminiAnalyzing] = useState(false);
  const [geminiError, setGeminiError] = useState(null);
  const [theme, setTheme] = useState("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedTheme = localStorage.getItem("resumelens_theme");
      if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("resumelens_theme", next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }, []);

  // When resumeText is extracted in analysis view, trigger live Gemini AI analysis!
  useEffect(() => {
    if (!resumeText || view !== "analysis") return;

    let isMounted = true;
    setIsGeminiAnalyzing(true);
    setGeminiError(null);

    async function fetchGeminiAnalysis() {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText }),
        });
        if (res.ok && isMounted) {
          const data = await res.json();
          setReport((prev) => ({
            ...data,
            fileName: prev?.fileName || fileName || "resume.pdf",
            isLiveGemini: true,
          }));
          if (data.defaultJobMatch) {
            setJobMatch(data.defaultJobMatch);
          }
          setIsGeminiAnalyzing(false);
        } else if (isMounted) {
          const errData = await res.json().catch(() => ({}));
          const errorMsg = errData.error || `Gemini API error (${res.status})`;
          console.error("Gemini Analyze Error:", errorMsg);
          setGeminiError(errorMsg);
          setReport((prev) => ({
            ...(prev || SAMPLE_REPORT),
            fileName: prev?.fileName || fileName || "resume.pdf",
            isLiveGemini: false,
          }));
          setIsGeminiAnalyzing(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Gemini Network Error:", err);
          setGeminiError(err.message || "Network error calling Gemini API");
          setReport((prev) => ({
            ...(prev || SAMPLE_REPORT),
            fileName: prev?.fileName || fileName || "resume.pdf",
            isLiveGemini: false,
          }));
          setIsGeminiAnalyzing(false);
        }
      }
    }

    fetchGeminiAnalysis();
    return () => {
      isMounted = false;
    };
  }, [resumeText, view, fileName]);

  const startUpload = useCallback((uploadedFile) => {
    setStatus("uploading");
    setStatusText(UPLOAD_STEPS[0]);
    setResumeText("");
    
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    } else {
      // Sample fallback
      setFile("/sample-resume.pdf");
      setFileName("sample-resume.pdf");
    }

    // Step 1: Uploading -> Reading
    const t1 = setTimeout(() => {
      setStatus("reading");
      setStatusText(UPLOAD_STEPS[1]);
    }, 150);

    // Step 2: Reading -> Analyzing
    const t2 = setTimeout(() => {
      setStatus("analyzing");
      setStatusText(UPLOAD_STEPS[2]);
    }, 350);

    // Step 3: Completed -> Switch view
    const t3 = setTimeout(() => {
      setStatus("completed");
      setStatusText("");
      setIsGeminiAnalyzing(true);
      setGeminiError(null);
      setReport({
        ...SAMPLE_REPORT,
        fileName: uploadedFile ? uploadedFile.name : "sample-resume.pdf",
        isPlaceholder: true
      });
      setView("analysis");
    }, 550);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const resetToUpload = useCallback(() => {
    setView("upload");
    setStatus("idle");
    setStatusText("");
    setFile(null);
    setFileName(null);
    setResumeText("");
    setIsGeminiAnalyzing(false);
    setGeminiError(null);
  }, []);

  const runJobCompare = useCallback(async (jobDescription) => {
    if (!jobDescription || !jobDescription.trim()) return;
    setIsComparing(true);
    
    try {
      // Attempt Gemini API live comparison first
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      if (res.ok) {
        const data = await res.json();
        setJobMatch({
          matchScore: data.matchScore || 82,
          matched: data.matched || [],
          missing: data.missing || []
        });
        setIsComparing(false);
        return;
      }
    } catch (err) {
      console.log("Gemini compare offline, falling back to simulated analysis", err);
    }

    // Fallback simulated keyword matching if Gemini API is unconfigured/offline
    setTimeout(() => {
      const text = jobDescription.toLowerCase();
      const possibleKeywords = ["docker", "redis", "aws", "kubernetes", "react", "git", "javascript", "typescript", "node.js", "graphql", "python", "sql"];
      const matched = [];
      const missing = [];
      
      possibleKeywords.forEach(kw => {
        if (text.includes(kw)) {
          if (SAMPLE_REPORT.skills.some(s => s.toLowerCase() === kw)) {
            matched.push(kw.charAt(0).toUpperCase() + kw.slice(1));
          } else {
            missing.push(kw.charAt(0).toUpperCase() + kw.slice(1));
          }
        }
      });

      if (matched.length === 0 && missing.length === 0) {
        matched.push("React", "Git", "JavaScript");
        missing.push("Docker", "Redis", "AWS");
      }

      const total = matched.length + missing.length;
      const score = total > 0 ? Math.round((matched.length / total) * 100) : 82;

      setJobMatch({
        matchScore: score || 82,
        matched: matched.length > 0 ? matched : ["React", "Git", "JavaScript"],
        missing: missing.length > 0 ? missing : ["Docker", "Redis", "AWS"]
      });
      setIsComparing(false);
    }, 600);
  }, [resumeText]);

  const value = {
    view,
    setView,
    file,
    fileName,
    resumeText,
    setResumeText,
    status,
    statusText,
    report,
    jobMatch,
    isComparing,
    isGeminiAnalyzing,
    geminiError,
    theme,
    toggleTheme,
    startUpload,
    resetToUpload,
    runJobCompare
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}
