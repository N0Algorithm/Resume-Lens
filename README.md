# Resume-Lens

Resume-Lens is an AI-powered resume analysis tool built to give you the clinical, actionable feedback of a senior tech recruiter right inside your browser. Powered primarily by ultra-fast **GroqCloud (`llama-3.3-70b-versatile`)**, it grades your resume on impact metrics, keywords, formatting, and overall readability. You can upload any PDF resume and instantly view tailored feedback side-by-side with your document.

## Features

* **Lightning-Fast AI Feedback via Groq:** Get an exhaustive, multi-pillar breakdown of your resume powered by **Llama 3.3 70B** on Groq's high-speed inference engine (300+ tokens/sec).
* **Multi-Provider Auto-Detection:** Built with a seamless triple-fallback backend that automatically recognizes keys from **GroqCloud (`gsk_...`)**, **OpenAI (`sk-...`)**, and **Google Gemini (`AIza...`)**.
* **Side-by-Side Studio View:** Read specific recruiter recommendations while inspecting the exact layout and structure of your PDF.
* **ATS Compatibility Check:** Verify that Applicant Tracking Systems can easily parse your document headers, fonts, and layout.
* **Job Description Matching:** Paste a target job description to dynamically check keyword overlap and identify critical missing skills.
* **Local & Private PDF Processing:** Text extraction happens entirely inside your browser via `react-pdf`, saving bandwidth and ensuring your raw binary PDF file never leaves your machine.

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Flagship AI Engine:** [GroqCloud API](https://console.groq.com/) (`llama-3.3-70b-versatile`) via OpenAI SDK
* **Supported Fallback Providers:** [OpenAI ChatGPT](https://platform.openai.com/) (`gpt-4o-mini`), [Google Gemini API](https://ai.google.dev/) (`gemini-2.0-flash`)
* **PDF Handling:** [react-pdf](https://projects.wojtekmaj.pl/react-pdf/)

## Project Structure

* `/src/app` - Contains the main Next.js routes and server-side API endpoints (`/api/analyze/route.js` & `/api/compare/route.js`).
* `/src/components` - Domain-organized UI components (`upload`, `analysis`, `layout`, and `ui`).
* `/src/lib` - Application state management via `ResumeContext`.
* `/src/constants` - Static configuration, scoring criteria, and sample fallback reports.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/N0Algorithm/Resume-Lens.git
   cd Resume-Lens
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```

## Environment Variables

To enable live AI analysis, configure your API key inside `.env.local`. **GroqCloud (`gsk_...`)** is recommended for the fastest inference speed.

1. Create your `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```
2. Add your **Groq API key** (or any supported provider key):
   ```env
   # Recommended Flagship Provider: GroqCloud (Llama 3.3 70B)
   GROQ_API_KEY=gsk_your_groqcloud_api_key_here

   # Or alternatively use an OpenAI key (sk-...) or Google Gemini key (AIza...)
   # OPENAI_API_KEY=sk_your_openai_api_key_here
   # GEMINI_API_KEY=your_gemini_api_key_here
   ```

*(Note: If no API key is configured or offline, the application gracefully falls back to displaying a realistic sample report for demonstration and testing purposes.)*

## Running the Project

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

To verify or create an optimized production build:

```bash
npm run build
npm start
```

## Usage Workflow

1. **Upload:** Drag and drop your PDF resume onto the clean drop zone.
2. **Analyze:** Watch the multi-stage progress indicator as text is extracted and analyzed by **Groq (`llama-3.3-70b`)**.
3. **Review & Iterate:** Explore your overall score, word choices, ATS health, and clinical bullet rewrites.
4. **Compare:** Paste a target job description in the Job Match panel to see how well your background aligns.

## Deployment

Deploy effortlessly to [Vercel](https://vercel.com/):

1. Push your repository to GitHub.
2. Import the project into your Vercel dashboard.
3. Add your `GROQ_API_KEY` (or chosen provider key) under **Project Settings > Environment Variables**.
4. Deploy!

## Security Notes

* Only the *extracted plain text* from your PDF is transmitted to the AI API; your original PDF binary remains securely in your browser session.
* Keep your API keys confidential (`.env.local` is listed in `.gitignore`). API requests are handled server-side (`/api/analyze` and `/api/compare`) to prevent leaking your secret keys to client-side browsers.

## License

This project is open-source and available for developer educational and career improvement purposes.
