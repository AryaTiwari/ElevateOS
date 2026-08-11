import { GoogleGenAI } from "@google/genai";
import { generateRuleBasedDiagnosis } from "./src/utils/creatorStrategist.ts";
import { generateRuleBasedAnalysis } from "./src/utils/contentAnalyzer.ts";

const strategySubmissions: any[] = [];

export async function handleAnalyzeContent(body: any, apiKey?: string) {
  const { script, concept, caption, hook, cta, niche, targetAudience, creatorGoal } = body || {};

  const fullContent = [hook, script, concept, caption, cta].filter(Boolean).join("\n---\n");

  if (!fullContent || fullContent.trim().length === 0) {
    return {
      success: false,
      error: "Content is required for analysis"
    };
  }

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are ELEVATE AI, an expert Instagram Reels content strategist for creators.

Analyze the creator's submitted Reel script/content idea and provide a dynamic, highly personalized report.

CREATOR INPUT DETAILS:
- Script / Main Content: ${script || 'N/A'}
- Concept: ${concept || 'N/A'}
- Hook: ${hook || 'N/A'}
- Caption: ${caption || 'N/A'}
- CTA: ${cta || 'N/A'}
- Niche: ${niche || 'General Creator'}
- Target Audience: ${targetAudience || 'General Instagram Viewers'}
- Primary Creator Goal: ${creatorGoal || 'Grow Followers & Reach'}

ANALYSIS CRITERIA & RULES:
1. Base the analysis on: Hook strength, 1-3s retention potential, value density, shareability, saveability, emotional impact, originality, clarity, CTA quality, and trend alignment/fit.
2. Ratings must be EVIDENCE-BASED and change based on the actual CONTENT submitted. Do NOT give static or generic numbers.
3. Calculate an ELEVATE CONTENT SCORE (overallScore) out of 100 as a reasoned synthesis of the 10 dimensions.
4. Tone: Creator-friendly, modern, encouraging, never exam-like or harsh. Say "Here's where you're losing potential" instead of "Your content failed".
5. Phrase insights like: "Based on current publicly observable Instagram/Reels behavior, creator best practices, and the content provided..."
6. Never claim private access to Instagram's proprietary internal algorithm or guarantee exact views/virality.
7. Provide 3-5 specific strengths and 3-5 specific weaknesses.
8. Provide "biggestChange": exactly ONE high-impact recommendation (e.g. "Cut the first two sentences and start with...").
9. Provide "hookSuggestions": 3 alternative hooks using 3 psychological angles (Curiosity, Contrarian, Emotional/Storytelling).
10. Provide "retentionFix": practical suggestions for opening, pacing, information order, open loops, payoff, pattern interrupts.
11. Provide "improvedVersion": a rewritten version of the creator's script that fixes pacing, hook, retention, and CTA while preserving their core idea and personality.

Return ONLY a valid JSON object following this exact structure:
{
  "overallScore": 84,
  "summary": "Short personalized 1-2 sentence summary of the script.",
  "scores": {
    "hook": { "score": 8.2, "explanation": "Short explanation", "indicator": "🔥 Strong" },
    "retention": { "score": 7.5, "explanation": "Short explanation", "indicator": "⚡ Moderate" },
    "value": { "score": 9.0, "explanation": "Short explanation", "indicator": "🔥 Strong" },
    "shareability": { "score": 8.0, "explanation": "Short explanation", "indicator": "🔥 Strong" },
    "saveability": { "score": 8.8, "explanation": "Short explanation", "indicator": "🔥 Strong" },
    "emotionalImpact": { "score": 7.2, "explanation": "Short explanation", "indicator": "⚡ Moderate" },
    "originality": { "score": 8.1, "explanation": "Short explanation", "indicator": "🔥 Strong" },
    "clarity": { "score": 8.9, "explanation": "Short explanation", "indicator": "🔥 Strong" },
    "cta": { "score": 6.8, "explanation": "Short explanation", "indicator": "⚠️ Needs Work" },
    "trendAlignment": { "score": 8.5, "explanation": "Short explanation", "indicator": "🔥 Strong" }
  },
  "strengths": ["🔥 Strength 1", "🔥 Strength 2", "🔥 Strength 3"],
  "weaknesses": ["⚠️ Weakness 1", "⚠️ Weakness 2", "⚠️ Weakness 3"],
  "verdict": "Concise strategic explanation of the score.",
  "biggestChange": "ONE high-impact change recommendation.",
  "hookSuggestions": [
    { "angle": "Curiosity", "hook": "Alternative hook 1" },
    { "angle": "Contrarian", "hook": "Alternative hook 2" },
    { "angle": "Emotional/Storytelling", "hook": "Alternative hook 3" }
  ],
  "retentionFix": "Practical retention fix suggestions.",
  "trendAnalysis": { "score": 8.5, "explanation": "Trend fit explanation" },
  "improvedVersion": "Fully improved rewritten script preserving core idea and creator voice."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);

      return {
        success: true,
        isAI: true,
        report: parsed
      };
    } catch (aiErr) {
      console.error("Gemini API call for content analysis failed, using rule engine:", aiErr);
    }
  }

  // Fallback if AI Key is missing or API fails
  const fallbackReport = generateRuleBasedAnalysis({
    script: script || '',
    concept,
    caption,
    hook,
    cta,
    niche,
    targetAudience,
    creatorGoal
  });

  return {
    success: true,
    isAI: false,
    report: fallbackReport
  };
}

export async function handleDiagnose(body: any, apiKey?: string) {
  const { creatorName, niche, followers, mainGoal, currentBottleneck } = body || {};

  const name = creatorName || "Creator";
  const primaryNiche = niche || "Tech, AI & Software";
  const audienceScale = followers || "Early Stage — 0–5K";
  const primaryGoal = mainGoal || "Gain Views, Followers & Likes";
  const mainBottleneck = currentBottleneck || "Inconsistent growth and unclear positioning";

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the AI Creator Strategist inside Elevate OS.

Elevate OS helps creators turn views into a scalable brand, loyal community, and high-margin creator business.

Your job is to generate a simple, punchy, engaging, and hyper-personalized 3-step growth roadmap for an influencer/content creator. Keep tone energetic, modern, sharp, and easy to read in 20 seconds.

CREATOR INPUT:
Creator Name: ${name}
Primary Niche: ${primaryNiche}
Audience Scale: ${audienceScale}
Primary Goal: ${primaryGoal}
Current Bottleneck: ${mainBottleneck}

RULES FOR INFLUENCER-FRIENDLY COPY:
1. Make titles catch & punchy (e.g. "STEP 01: Profile & Hook Overhaul", "STEP 02: The Binge-Worthy Content Engine", "STEP 03: Monetization & Offer Unlock").
2. "whatToDo" must be 1-2 snappy sentences explaining the exact strategy in plain language.
3. Provide 3 direct, tactical bullet points in "actions" with clear verbs.
4. "why" should be a single compelling sentence explaining the psychology/algorithm reason.
5. "expectedOutcome" should highlight the exciting result (e.g., "2x profile-to-follower conversion rate", "Predictable incoming brand deal DMs").
6. Avoid dense corporate jargon. Speak like a top creator growth strategist.

Return ONLY a JSON object matching this exact schema:
{
  "creatorName": "${name}",
  "primaryNiche": "${primaryNiche}",
  "audienceScale": "${audienceScale}",
  "primaryGoal": "${primaryGoal}",
  "growthBottleneckDiagnosis": "1-2 snappy sentences diagnosing why they are currently stuck and what leverage point will unblock them.",
  "steps": [
    {
      "stepNumber": "STEP 01",
      "title": "Customized Step 1 Title",
      "whatToDo": "Clear, snappy explanation",
      "actions": ["Direct Action 1", "Direct Action 2", "Direct Action 3"],
      "why": "Punchy 1-sentence reason",
      "expectedOutcome": "Exciting 1-sentence outcome"
    },
    {
      "stepNumber": "STEP 02",
      "title": "Customized Step 2 Title",
      "whatToDo": "Clear, snappy explanation",
      "actions": ["Direct Action 1", "Direct Action 2", "Direct Action 3"],
      "why": "Punchy 1-sentence reason",
      "expectedOutcome": "Exciting 1-sentence outcome"
    },
    {
      "stepNumber": "STEP 03",
      "title": "Customized Step 3 Title",
      "whatToDo": "Clear, snappy explanation",
      "actions": ["Direct Action 1", "Direct Action 2", "Direct Action 3"],
      "why": "Punchy 1-sentence reason",
      "expectedOutcome": "Exciting 1-sentence outcome"
    }
  ],
  "elevateMove": "ONE high-impact, specific action step to execute in the next 7 days."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: systemInstruction,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);

      return {
        success: true,
        isAI: true,
        diagnosis: parsed
      };
    } catch (aiErr) {
      console.error("Gemini API call failed, using fallback rule engine:", aiErr);
    }
  }

  // Rule-based Fallback Generator if AI Key is absent or fails
  const fallbackDiagnosis = generateRuleBasedDiagnosis({
    creatorName: name,
    primaryNiche,
    audienceScale,
    primaryGoal,
    mainBottleneck
  });

  return {
    success: true,
    isAI: false,
    diagnosis: fallbackDiagnosis
  };
}

export async function handleBookStrategySession(body: any, envWebAppUrl?: string) {
  const { fullName, phoneNumber, instagramId, currentProblem, email } = body || {};

  if (!fullName || !phoneNumber || !instagramId || !currentProblem) {
    return { error: "Missing required fields", status: 400 };
  }

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const sheetPayload = {
    name: fullName,
    fullName: fullName,
    Name: fullName,
    email: email || "",
    Email: email || "",
    phone: phoneNumber,
    phoneNumber: phoneNumber,
    Phone: phoneNumber,
    instagram: instagramId,
    instagramId: instagramId,
    Instagram: instagramId,
    helpNeeded: currentProblem,
    currentProblem: currentProblem,
    bottleneck: currentProblem,
    Problem: currentProblem,
    timestamp: timestamp,
    Timestamp: timestamp
  };

  strategySubmissions.push(sheetPayload);
  console.log("Strategy Session Booking logged for Google Sheet:", sheetPayload);

  const webAppUrl = envWebAppUrl || process.env.GOOGLE_SHEET_WEB_APP_URL || "https://script.google.com/macros/s/AKfycbyyUmXiHTOFEWaxfQ2k36I6zlailBr4sxpQy1Q70QlUkI47MPeOow0BRZTsd_57G8b5/exec";

  if (webAppUrl) {
    try {
      await fetch(webAppUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(sheetPayload),
        redirect: "follow"
      });
    } catch (sheetErr) {
      console.error("Failed to forward to Google Sheet Web App (JSON):", sheetErr);
    }

    try {
      const formParams = new URLSearchParams();
      for (const [key, val] of Object.entries(sheetPayload)) {
        formParams.append(key, String(val ?? ""));
      }
      await fetch(webAppUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formParams.toString(),
        redirect: "follow"
      });
    } catch (formErr) {
      // Ignore secondary attempt
    }
  }

  return {
    success: true,
    message: "Successfully logged for strategy session",
    submission: sheetPayload
  };
}

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://elevateos.in/</loc>
    <lastmod>2026-08-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

const ROBOTS_TXT = `User-agent: *
Allow: /

# Disallow internal API endpoints
Disallow: /api/

Sitemap: https://elevateos.in/sitemap.xml
`;

export function getStrategySubmissions() {
  return { submissions: strategySubmissions };
}

// Cloudflare Workers Fetch Handler
export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // Serve valid XML sitemap directly to avoid SPA rewrite
    if (url.pathname === "/sitemap.xml") {
      return new Response(SITEMAP_XML, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }

    // Serve robots.txt
    if (url.pathname === "/robots.txt") {
      return new Response(ROBOTS_TXT, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }

    // API endpoint for ELEVATE AI Content Analyzer
    if (url.pathname === "/api/analyze-content" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const apiKey = env?.GEMINI_API_KEY || process.env?.GEMINI_API_KEY;
        const result = await handleAnalyzeContent(body, apiKey);
        return Response.json(result);
      } catch (err: any) {
        return Response.json(
          { error: "Elevate AI couldn't analyze this content right now. Please try again.", message: err?.message },
          { status: 500 }
        );
      }
    }

    // API endpoint for AI Creator OS Growth Audit & Strategic Diagnosis
    if (url.pathname === "/api/diagnose" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const apiKey = env?.GEMINI_API_KEY || process.env?.GEMINI_API_KEY;
        const result = await handleDiagnose(body, apiKey);
        return Response.json(result);
      } catch (err: any) {
        return Response.json(
          { error: "Failed to generate diagnosis", message: err?.message || "Internal server error" },
          { status: 500 }
        );
      }
    }

    // API endpoint for Free Strategy Session Google Sheets integration
    if (url.pathname === "/api/book-strategy-session" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const sheetUrl = env?.GOOGLE_SHEET_WEB_APP_URL || process.env?.GOOGLE_SHEET_WEB_APP_URL;
        const result = await handleBookStrategySession(body, sheetUrl);
        if ("error" in result && result.status) {
          return Response.json({ error: result.error }, { status: result.status });
        }
        return Response.json(result);
      } catch (err: any) {
        return Response.json({ error: err?.message || "Internal server error" }, { status: 500 });
      }
    }

    // API endpoint to retrieve logged strategy submissions
    if (url.pathname === "/api/strategy-submissions" && request.method === "GET") {
      return Response.json(getStrategySubmissions());
    }

    // Serve static assets through Cloudflare Workers Assets
    if (env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return await env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404 });
  }
};

// Node.js Express Server implementation for local development and Cloud Run containers
async function startServer() {
  const expressModule = await import("express");
  const express = expressModule.default;
  const pathModule = await import("path");
  const path = pathModule.default;

  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/analyze-content", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const result = await handleAnalyzeContent(req.body, apiKey);
      return res.json(result);
    } catch (error: any) {
      console.error("Content analysis error:", error);
      return res.status(500).json({
        error: "Elevate AI couldn't analyze this content right now. Please try again.",
        message: error?.message || "Internal server error"
      });
    }
  });

  app.post("/api/diagnose", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const result = await handleDiagnose(req.body, apiKey);
      return res.json(result);
    } catch (error: any) {
      console.error("Diagnosis error:", error);
      return res.status(500).json({
        error: "Failed to generate diagnosis",
        message: error?.message || "Internal server error"
      });
    }
  });

  app.post("/api/book-strategy-session", async (req, res) => {
    try {
      const sheetUrl = process.env.GOOGLE_SHEET_WEB_APP_URL;
      const result = await handleBookStrategySession(req.body, sheetUrl);
      if ("error" in result && result.status) {
        return res.status(result.status).json({ error: result.error });
      }
      return res.json(result);
    } catch (err: any) {
      console.error("Booking error:", err);
      return res.status(500).json({ error: err?.message || "Internal server error" });
    }
  });

  app.get("/api/strategy-submissions", (req, res) => {
    res.json(getStrategySubmissions());
  });

  app.get("/sitemap.xml", (req, res) => {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.send(SITEMAP_XML);
  });

  app.get("/robots.txt", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(ROBOTS_TXT);
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// Start Node server if running directly in a Node.js CLI process
if (typeof process !== "undefined" && Array.isArray(process.argv) && process.argv.length > 0) {
  const isNode = typeof process.versions !== "undefined" && !!process.versions.node;
  const isWorkerEnv = typeof globalThis !== "undefined" && "WebSocketPair" in globalThis && !isNode;
  if (!isWorkerEnv) {
    startServer().catch((err) => {
      console.error("Failed to start Node server:", err);
    });
  }
}
