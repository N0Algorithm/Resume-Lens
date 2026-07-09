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

Resume Text:
${resumeText.slice(0, 8000)}

Return ONLY valid JSON matching this exact structure:
{
  "overallScore": integer between 0 and 100,
  "candidateLevel": string (estimated experience level, e.g. "Senior Engineer (6+ years)" or "Mid-Level Developer"),
  "suggestedRoles": array of 3 strings (matching job titles for this background),
  "readability": string ("Strong", "Moderate", or "Needs Work"),
  "impactWordsCount": integer (count of strong action verbs identified),
  "strongVerbs": array of strings (top 5 action verbs found, e.g. ["Led", "Built", "Designed"]),
  "weakPhrases": array of strings (top 2-3 passive phrases found that could be stronger, e.g. ["Responsible for", "Worked on"]),
  "summary": string (a natural 2-sentence summary of the candidate's strengths and areas for improvement),
  "pillarScores": {
    "impactMetrics": integer between 0 and 100 (use of numbers and measurable results),
    "keywords": integer between 0 and 100 (relevant technical skills and tools),
    "formatting": integer between 0 and 100 (layout structure and readability),
    "contactInfo": integer between 0 and 100 (presence of email, phone, links)
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
    return NextResponse.json(reportData, { status: 200 });
  } catch (error) {
    console.error("Resume analysis failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze resume via Groq API." },
      { status: 500 }
    );
  }
}
