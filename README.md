# Resume-Lens

Resume-Lens is an AI-powered resume analysis tool built to give you the feedback of a senior tech recruiter, right in your browser. It uses a custom-prompted Gemini model to grade your resume on impact, keywords, formatting, and overall readability. You can upload any PDF resume and instantly see actionable feedback side-by-side with your document.

## Features

* **Instant AI Feedback:** Get a comprehensive breakdown of your resume using Gemini 2.5 Flash.
* **Side-by-Side Studio View:** Read your feedback while viewing the exact section of the PDF it references.
* **ATS Compatibility Check:** See how easily Applicant Tracking Systems can parse your document.
* **Job Description Matching:** Compare your current skills against a specific job description.
* **Local Processing:** PDF text extraction happens entirely in your browser using `react-pdf`, saving bandwidth and protecting raw file privacy (only the extracted text is sent to the API).

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **AI Provider:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
* **PDF Handling:** [react-pdf](https://projects.wojtekmaj.pl/react-pdf/)

## Project Structure

* `/src/app` - Contains the main Next.js routes and the API endpoint (`/api/analyze/route.js`).
* `/src/components` - Houses all UI components, organized by domain (upload, analysis, layout).
* `/src/lib` - Core logic, including the `ResumeContext` that manages application state.
* `/src/constants` - Static configuration and fallback sample reports.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/Resume-Lens.git
   cd Resume-Lens
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```

## Environment Variables

To enable the live AI analysis, you need a Google Gemini API key.

1. Copy the example environment file or create a new one:
   ```bash
   cp .env.example .env.local
   ```
2. Add your API key to `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

*(Note: If no API key is provided, the app will gracefully fall back to displaying a sample report for demonstration purposes.)*

## Running the Project

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To create an optimized production build:

```bash
npm run build
npm start
```

## Usage

1. **Upload:** Drag and drop your PDF resume onto the upload screen.
2. **Review:** Wait a few seconds for the text extraction and Gemini API analysis to complete.
3. **Iterate:** Read through the recommendations. The "Bullet Rewrite" section will specifically target a weak bullet point and suggest a stronger, impact-driven alternative.
4. **Compare (Optional):** Scroll down to the Job Match section and paste a job description to see how well your resume aligns.

## Deployment

The easiest way to deploy this Next.js application is with [Vercel](https://vercel.com/):

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add your `GEMINI_API_KEY` in the Vercel Environment Variables settings.
4. Deploy.

## Security Notes

* Only the *extracted text* from the PDF is sent to the Gemini API. The actual PDF file never leaves your browser.
* Ensure your `GEMINI_API_KEY` is kept secret and never committed to version control. It is securely accessed only via the server-side API route (`/api/analyze`).

## Future Improvements

* Support for `.docx` files.
* Export the final report to PDF.
* Save past resume revisions and compare improvements over time.

## Contributing

Contributions are welcome! If you'd like to improve Resume-Lens, please:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request
