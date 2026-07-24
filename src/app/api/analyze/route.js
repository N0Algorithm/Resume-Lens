import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { resumeText } = await req.json();
    if (!resumeText) {
      return NextResponse.json({ error: "No resume text provided." }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "No Groq API key configured in .env.local (GROQ_API_KEY)." }, { status: 503 });
    }

    // We ask the model to review the resume like a friendly, experienced tech recruiter.
    const prompt = `You are an experienced, supportive technical recruiter and career mentor.
Review the following resume text and provide practical, constructive feedback in a natural, conversational human tone. Avoid robotic phrasing, buzzwords, or overly formal jargon. Keep descriptions concise and clear.
CRITICAL: Do NOT hallucinate. Ensure that any phrases or words you extract (like weakPhrases, strongVerbs, bulletRewrite) exist EXACTLY in the provided Resume Text. Do not invent details not present in the resume.

Resume Text:
${resumeText.slice(0, 8000)}

Return ONLY valid JSON matching this exact structure:
{
  "overallScore": integer between 0 and 100 (calculate as the exact average of the 4 pillar scores below),
  "candidateLevel": string (estimated experience level, e.g. "Senior Engineer (6+ years)" or "Mid-Level Developer"),
  "suggestedRoles": array of 3 strings (matching job titles for this background),
  "readability": string ("Strong", "Moderate", or "Needs Work"),
  "impactWordsCount": integer (count of strong action verbs identified),
  "strongVerbs": array of strings (top 5 action verbs found, e.g. ["Led", "Built", "Designed"]),
  "weakPhrases": array of strings (top 2-3 passive phrases found that could be stronger, e.g. ["Responsible for", "Worked on"]),
  "summary": string (a natural 2-sentence summary of the candidate's strengths and areas for improvement),
  "pillarScores": {
    "impactMetrics": integer between 0 and 100 (Strictly calculated: count the number of bullet points in the professional experience section, and compute the percentage of those bullets that contain a quantifiable metric/number. E.g., if only 3 out of 10 bullet points have numbers, this score must be exactly 30),
    "keywords": integer between 0 and 100 (Strictly calculated: count the number of relevant industry skills/tools listed. 10+ skills = 90-100, 7-9 skills = 75-89, 4-6 skills = 50-74, 0-3 skills = 0-49),
    "formatting": integer between 0 and 100 (Strictly calculated: start at 100, deduct 15 points for any weak/passive phrasing found, deduct 10 points for each grammatical issue/typo, deduct 20 points for wall of text or bad spacing),
    "contactInfo": integer between 0 and 100 (Strictly calculated: 100 if email, phone, location/LinkedIn, and GitHub are all present; deduct 25 points for each missing component)
  },
  "skills": array of strings (top 8-12 technical skills found),
  "bulletRewrite": {
    "original": string (one bullet point from the resume that could be stronger),
    "improved": string (a clearer, more impactful version with strong action words and results),
    "why": string (short explanation of why the new version works better)
  },
  "recommendations": array of exactly 3 objects with { "id": number, "title": string, "description": string, "icon": string ("warning", "format_align_left", or "cloud"), "type": string },
  "atsReview": {
    "status": string ("Passed" or "Needs Attention"),
    "checks": array of 4 objects with { "name": string, "status": string ("pass" or "warn"), "detail": string }
  },
  "defaultJobMatch": {
    "matchScore": integer between 0 and 100,
    "missing": array of strings (key skills not found),
    "matched": array of strings (key skills found)
  }
}`;

    const groq = new Groq({ apiKey });
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are an experienced technical recruiter and career mentor that always responds with valid JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
      max_tokens: 4096,
    });

    const reportData = JSON.parse(response.choices[0].message.content);
    
    // Programmatically calculate the overallScore to ensure mathematical accuracy and variation
    if (reportData.pillarScores) {
      const impactMetrics = Number(reportData.pillarScores.impactMetrics) || 0;
      const keywords = Number(reportData.pillarScores.keywords) || 0;
      const formatting = Number(reportData.pillarScores.formatting) || 0;
      const contactInfo = Number(reportData.pillarScores.contactInfo) || 0;
      
      reportData.overallScore = Math.round((impactMetrics + keywords + formatting + contactInfo) / 4);
    }

    console.log("LLM response:", JSON.stringify(reportData, null, 2));
    return NextResponse.json(reportData, { status: 200 });
  } catch (error) {
    console.error("Resume analysis failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze resume via Groq API." },
      { status: 500 }
    );
  }
}
