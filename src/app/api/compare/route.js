import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { resumeText, jobDescription } = await req.json();
    if (!jobDescription) {
      return NextResponse.json({ error: "No job description provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key is not configured." }, { status: 503 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an experienced technical recruiter.
Compare this candidate's resume against the target job description. Evaluate how well their skills and background match what the employer is looking for in a conversational, human tone.

Resume Text:
${(resumeText || "").slice(0, 6000)}

Target Job Description:
${jobDescription.slice(0, 6000)}

Return ONLY valid JSON matching this exact structure:
{
  "matchScore": integer between 0 and 100 representing overall requirement fit,
  "missing": array of strings (top 3-6 critical skills or qualifications required by the job that are missing from the resume),
  "matched": array of strings (top 4-8 key skills or qualifications present in both)
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
        maxOutputTokens: 2048,
      },
    });

    const matchData = JSON.parse(response.text);
    return NextResponse.json(matchData, { status: 200 });
  } catch (error) {
    console.error("Job comparison failed:", error);
    return NextResponse.json({ error: "Failed to compare job match." }, { status: 500 });
  }
}
