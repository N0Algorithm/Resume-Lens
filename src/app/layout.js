/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";
import { ResumeContextProvider } from "../lib/ResumeContext";
import Header from "../components/layout/Header";

export const metadata = {
  title: "ResumeLens — Quiet, Developer-Centric Resume Review",
  description: "A fast, clinical, and reliable software utility for analyzing and refining engineering resumes without marketing fluff or noise.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="h-screen max-h-screen overflow-hidden flex flex-col bg-[#f7f9ff] dark:bg-[#0d1117] text-[#181c21] dark:text-[#ededed] font-sans selection:bg-[#0051ae]/10 selection:text-[#0051ae] dark:selection:bg-[#0969da]/20 dark:selection:text-[#adc6ff]"
      >
        <ResumeContextProvider>
          <div className="flex flex-col h-full w-full overflow-hidden">
            <Header />
            <main className="flex-1 flex flex-col w-full overflow-hidden">
              {children}
            </main>
          </div>
        </ResumeContextProvider>
      </body>
    </html>
  );
}
