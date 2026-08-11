import { GoogleGenAI } from "@google/genai";
import { generateRuleBasedDiagnosis } from "./src/utils/creatorStrategist.ts";
import { generateRuleBasedAnalysis } from "./src/utils/contentAnalyzer.ts";
import { generateRuleBased7DayRoadmap } from "./src/utils/roadmapGenerator.ts";

const strategySubmissions: any[] = [];

// Helper to clean markdown code blocks and parse JSON safely
function parseCleanJSON(rawText: string): any {
  if (!rawText) return null;
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const startIdx = cleaned.indexOf("{");
    const endIdx = cleaned.lastIndexOf("}");
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      const jsonSub = cleaned.substring(startIdx, endIdx + 1);
      return JSON.parse(jsonSub);
    }
    throw e;
  }
}

export async function handleGenerate7DayRoadmap(body: any, apiKey?: string) {
  const { creatorName, niche, audienceStage, mainGoal, currentBottleneck } = body || {};

  const name = (creatorName || "Creator").trim();
  const primaryNiche = niche || "Business";
  const stage = audienceStage || "Growing";
  const goal = mainGoal || "Increase Views";
  const problem = (currentBottleneck || "Low reach").trim();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are ELEVATE AI, an expert Instagram Reels creator strategist for Elevate OS.

Your job is to build a SURFACE-LEVEL, high-level 7-Day Creator Roadmap to give the creator clear initial direction based on their input.

INPUT DETAILS:
- Creator Name: ${name}
- Main Niche: ${primaryNiche}
- Audience Stage: ${stage}
- Primary Goal: ${goal}
- Biggest Current Bottleneck/Problem: ${problem}

RULES FOR GENERATION:
1. Provide a SURFACE-LEVEL roadmap only. Focus on high-level direction, key priorities, and simple actions.
2. Do NOT provide full scripts, 20 content ideas, detailed posting calendars, deep personas, or step-by-step execution guides.
3. Tone: Professional, creator-focused, encouraging, clear.
4. Phrasing rule: Use phrases like "Based on current creator best practices and publicly observable Reels patterns..."
5. Do NOT claim access to Instagram's private or internal algorithm.
6. Do NOT promise virality, exact follower counts, or income.
7. Customize the 7 days based on the creator's niche (${primaryNiche}), stage (${stage}), goal (${goal}), and problem (${problem}).

Return ONLY a JSON object matching this exact schema:
{
  "creatorName": "${name}",
  "niche": "${primaryNiche}",
  "audienceStage": "${stage}",
  "mainGoal": "${goal}",
  "currentBottleneck": "${problem}",
  "intro": "2-3 short, personalized sentences introducing the strategic direction for their week.",
  "days": [
    {
      "day": 1,
      "focus": "Short focus title",
      "action": "One clear, practical action.",
      "shortExplanation": "Short 1-sentence reason or principle."
    },
    {
      "day": 2,
      "focus": "Short focus title",
      "action": "One clear, practical action.",
      "shortExplanation": "Short 1-sentence reason or principle."
    },
    {
      "day": 3,
      "focus": "Short focus title",
      "action": "One clear, practical action.",
      "shortExplanation": "Short 1-sentence reason or principle."
    },
    {
      "day": 4,
      "focus": "Short focus title",
      "action": "One clear, practical action.",
      "shortExplanation": "Short 1-sentence reason or principle."
    },
    {
      "day": 5,
      "focus": "Short focus title",
      "action": "One clear, practical action.",
      "shortExplanation": "Short 1-sentence reason or principle."
    },
    {
      "day": 6,
      "focus": "Short focus title",
      "action": "One clear, practical action.",
      "shortExplanation": "Short 1-sentence reason or principle."
    },
    {
      "day": 7,
      "focus": "Short focus title",
      "action": "One clear, practical action.",
      "shortExplanation": "Short 1-sentence reason or principle."
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = parseCleanJSON(text);

      if (parsed && Array.isArray(parsed.days) && parsed.days.length === 7) {
        return {
          success: true,
          isAI: true,
          roadmap: parsed
        };
      }
    } catch (aiErr) {
      console.error("Gemini API call failed for 7-day roadmap, using fallback rule engine:", aiErr);
    }
  }

  // Fallback if AI Key is missing or API fails
  const fallbackRoadmap = generateRuleBased7DayRoadmap({
    creatorName: name,
    niche: primaryNiche,
    audienceStage: stage,
    mainGoal: goal,
    currentBottleneck: problem
  });

  return {
    success: true,
    isAI: false,
    roadmap: fallbackRoadmap
  };
}

export async function handleAnalyzeContent(body: any, apiKey?: string) {
  const { script, concept, caption, hook, cta, niche, targetAudience, creatorGoal } = body || {};

  const fullContent = [hook, script, concept, caption, cta].filter(Boolean).join("\n---\n");

  if (!fullContent || fullContent.trim().length === 0) {
    return {
      success: false,
      error: "Please enter a script, hook, or content concept to analyze."
    };
  }

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are ELEVATE AI, an elite Instagram Reels content strategist, comedy editor, and viral short-form video consultant.

==================================================
NEW AI PHILOSOPHY (CRITICAL MANDATE)
==================================================
First understand the creator. Then optimize the content.
NEVER apply a generic corporate formula to everything.

You MUST NEVER convert a creator's unique personality, jokes, slang, sarcasm, Gen-Z tone, or storytelling style into generic "ChatGPT corporate advice" or bland educational language!

Example 1 (Comedy/Meme):
Original: "Bro really thought posting 7 reels a day would make him famous 💀"
WRONG Rewrite: "Consistency is the key to achieving social media success. Here are seven strategies..." (DESTROYED CREATOR VOICE)
RIGHT Rewrite: "Bro posted 7 reels a day for a week and was genuinely shocked when Instagram didn't mail him a verified checkmark 💀" (PRESERVED HUMOR & TONE)

Example 2 (Emotional Storytelling):
Original: "I spent 2 years trying to grow on Instagram before realizing nobody actually cared about my content."
WRONG Rewrite: "To build an audience on Instagram, you need to conduct market research and align with audience needs." (DESTROYED EMOTIONAL IMPACT)
RIGHT Rewrite: "I spent two years posting on Instagram before realizing something brutal: Nobody actually cared about my content. And honestly... I can't even blame them." (PRESERVED VULNERABILITY)

CREATOR INPUT DETAILS:
- Script / Main Content: ${script || 'N/A'}
- Concept: ${concept || 'N/A'}
- Hook: ${hook || 'N/A'}
- Caption: ${caption || 'N/A'}
- CTA: ${cta || 'N/A'}
- Niche: ${niche || 'General Creator'}
- Target Audience: ${targetAudience || 'General Instagram Viewers'}
- Primary Creator Goal: ${creatorGoal || 'Grow Followers & Reach'}

==================================================
STEP 1 — INTERNAL CONTENT CLASSIFICATION
==================================================
Before scoring or rewriting, internally determine:
1. CONTENT TYPE: Educational, Storytelling, Humor, Meme, Sarcasm, Relatable, Motivational, Emotional, Controversial, Opinion, Personal experience, Promotional, Tutorial, Commentary, Entertainment, or Hybrid.
2. TONE: Funny, Serious, Dark humor, Playful, Sarcastic, Emotional, Inspirational, Aggressive, Calm, Conversational, Gen-Z, Professional, Casual.
3. EMOTIONAL INTENT: Laugh, Curiosity, Surprise, Inspiration, Anger, Empathy, Nostalgia, Relatability, Shock, Motivation, FOMO, Validation.
4. AUDIENCE REACTION: Predict the intended reaction (e.g., "LMAO that's literally me", "Wait... I've been doing this wrong", "That's actually useful").

==================================================
HUMOR & EMOTIONAL UNDERSTANDING
==================================================
- If the content is funny, sarcastic, ironic, meme-like, exaggerated, or intentionally informal:
  Preserve jokes, punchlines, slang, exaggeration, sarcasm, irony, comedic timing, informal language, Gen-Z phrasing ("bro", "💀", "POV"), meme references, and intentional grammatical quirks. Do NOT "fix" intentional slang into formal English!
- Evaluate humor on setup, punchline, surprise, relatability, comedic escalation, and payoff.
- Evaluate emotional impact on vulnerability, contrast, setup, and payoff. Understand that a short sentence like "I wish I knew this before I started" can carry higher emotional impact than a long paragraph.

==================================================
CONTEXTUAL MEANING & DYNAMIC SCORING
==================================================
- Consider the FULL script context (HOOK -> SETUP -> DEVELOPMENT -> PAYOFF -> CTA). Respect intentional curiosity delays or delayed punchlines.
- Dynamic Score Weighting:
  * Comedy/POV/Meme: Humor + Retention + Relatability + Shareability matter most. Do NOT penalize for lacking educational bullet points.
  * Educational/Tutorial: Value + Clarity + Retention + Saveability matter most. Do NOT penalize for lacking jokes.
  * Storytelling/Emotional: Emotional Impact + Retention + Curiosity + Payoff matter most.
- Every score (0-10) MUST include an explanation referencing actual words or phrases from the creator's input.

==================================================
THREE IMPROVEMENT VERSIONS & SEMANTIC CHECK
==================================================
Internally generate 3 versions:
- VERSION 1 (LIGHT POLISH): 90–95% original wording preserved.
- VERSION 2 (ELEVATE): The primary Improved Version! Sharpens hook, pacing, retention, comedic punchline, or curiosity while strictly preserving the creator's personality, humor, slang, tone, core message, and CTA intention.
- VERSION 3 (CREATIVE ALTERNATIVE): Stronger alternative structure preserving core message & tone.

SEMANTIC PRESERVATION CHECK on Version 2:
Verify: Same core message? Same intended meaning? Same audience? Same emotional intent? Same humor? Same personality? Same CTA purpose?
If NO: Rewrite Version 2 to restore the creator's authentic identity!

==================================================
AI PERSONA & OUTPUT FORMAT
==================================================
Communicate naturally like a top-tier Instagram Reels strategist talking to a fellow creator. Avoid corporate buzzwords ("leverage your ecosystem", "optimize acquisition funnel"). Speak directly ("Your idea is solid. The joke lands, but it arrives too late—move the punchline up...").

Return ONLY a valid JSON object matching this exact structure:
{
  "overallScore": 84,
  "summary": "1-2 sentence sharp summary acknowledging what the creator is attempting to communicate and their specific tone/vibe.",
  "scores": {
    "hook": { "score": 8.2, "explanation": "Detailed explanation referencing creator's exact words.", "indicator": "🔥 Strong" },
    "retention": { "score": 7.5, "explanation": "Detailed explanation referencing creator's exact words.", "indicator": "⚡ Moderate" },
    "value": { "score": 9.0, "explanation": "Detailed explanation referencing creator's exact words.", "indicator": "🔥 Strong" },
    "shareability": { "score": 8.0, "explanation": "Detailed explanation referencing creator's exact words.", "indicator": "🔥 Strong" },
    "saveability": { "score": 8.8, "explanation": "Detailed explanation referencing creator's exact words.", "indicator": "🔥 Strong" },
    "emotionalImpact": { "score": 7.2, "explanation": "Detailed explanation referencing creator's exact words.", "indicator": "⚡ Moderate" },
    "originality": { "score": 8.1, "explanation": "Detailed explanation referencing creator's exact words.", "indicator": "🔥 Strong" },
    "clarity": { "score": 8.9, "explanation": "Detailed explanation referencing creator's exact words.", "indicator": "🔥 Strong" },
    "cta": { "score": 6.8, "explanation": "Detailed explanation referencing creator's exact words.", "indicator": "⚠️ Needs Work" },
    "trendAlignment": { "score": 8.5, "explanation": "Detailed explanation referencing creator's exact words.", "indicator": "🔥 Strong" }
  },
  "strengths": ["🔥 Specific strength 1 referencing actual script words", "🔥 Specific strength 2 referencing actual script words", "🔥 Specific strength 3 referencing actual script words"],
  "weaknesses": ["⚠️ Specific weakness 1 referencing actual script words", "⚠️ Specific weakness 2 referencing actual script words", "⚠️ Specific weakness 3 referencing actual script words"],
  "verdict": "Natural, human-like strategic assessment from a top Reels strategist without corporate jargon.",
  "biggestChange": "Exactly ONE highest-impact recommendation answering WHAT to change, WHY, and HOW, referencing actual lines.",
  "hookSuggestions": [
    { "angle": "Curiosity", "hook": "Alternative hook matching creator tone" },
    { "angle": "Contrarian", "hook": "Alternative hook matching creator tone" },
    { "angle": "Emotional/Storytelling", "hook": "Alternative hook matching creator tone" }
  ],
  "retentionFix": "Practical, specific pacing/retention recommendations for this script.",
  "trendAnalysis": { "score": 8.5, "explanation": "Trend fit explanation tailored to current Reels consumption patterns for this format." },
  "improvedVersion": "Version 2 (Elevate): Fully rewritten version that sharpens pacing/hook while strictly preserving the creator's tone, humor, slang, story, and personality!"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = parseCleanJSON(text);

      if (parsed && typeof parsed === "object" && parsed.overallScore) {
        return {
          success: true,
          isAI: true,
          report: parsed
        };
      }
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
    <lastmod>2026-08-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://elevateos.in/elevate-ai</loc>
    <lastmod>2026-08-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://elevateos.in/blueprint</loc>
    <lastmod>2026-08-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://elevateos.in/revenue</loc>
    <lastmod>2026-08-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateos.in/services</loc>
    <lastmod>2026-08-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://elevateos.in/about</loc>
    <lastmod>2026-08-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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

    // API endpoint for ELEVATE AI — 7-Day Creator Roadmap
    if (url.pathname === "/api/generate-roadmap" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const apiKey = env?.GEMINI_API_KEY || process.env?.GEMINI_API_KEY;
        const result = await handleGenerate7DayRoadmap(body, apiKey);
        return Response.json(result);
      } catch (err: any) {
        return Response.json(
          { error: "Elevate AI couldn't build your roadmap right now. Please try again.", message: err?.message },
          { status: 500 }
        );
      }
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

  app.post("/api/generate-roadmap", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const result = await handleGenerate7DayRoadmap(req.body, apiKey);
      return res.json(result);
    } catch (error: any) {
      console.error("7-Day Roadmap generation error:", error);
      return res.status(500).json({
        error: "Elevate AI couldn't build your roadmap right now. Please try again.",
        message: error?.message || "Internal server error"
      });
    }
  });

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
