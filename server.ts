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
  const problem = (currentBottleneck || "Low reach and viewer drop-off").trim();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are ELEVATE AI — an elite short-form video strategist and creator consultant (Instagram Reels, TikTok, YouTube Shorts).

==================================================
MISSION: 7-DAY CREATOR SPRINT ROADMAP
==================================================
Build a hyper-personalized, ultra-actionable 7-Day Sprint Roadmap for this creator.

CRITICAL MANDATES:
1. NO GENERIC CORPORATE FLUFF. Avoid textbook marketing jargon ("synergize touchpoints", "optimize value delivery streams", "execute stakeholder alignment").
2. SPEAK CREATOR LANGUAGE. Use modern, sharp, practical terms like "curiosity gap", "visual pattern interrupt", "contrarian angle", "1-word DM trigger", "retention drop-off point", "proof-point payoff".
3. ROOT-CAUSE THE BOTTLENECK: The entire 7-day roadmap MUST be built around actively diagnosing and solving the creator's exact stated problem ("${problem}") within their specific niche ("${primaryNiche}") and stage ("${stage}").
4. CONCRETE MICRO-ACTIONS: Every day MUST give ONE clear, practical, high-leverage action that a real creator can execute in under 45 minutes (e.g. not "Improve your content", but "Draft 3 contrasting hook lines for your next video: 1 curiosity-driven, 1 contrarian, 1 relatable").
5. PROGRESSIVE ARC:
   - Day 1: Bottleneck Root-Cause Deconstruction & Single-Angle Focus (define the 1 differentiated angle in ${primaryNiche} addressing ${problem}).
   - Day 2: Hook Architecture & Opening 3 Seconds (test 3 opening hook variations with zero fluff).
   - Day 3: Lean Scripting & Payoff Execution (record a 30-45s Reel with punchy pacing and immediate payoff).
   - Day 4: 24-Hour Retention Audit & Comment Signal Analysis (diagnose exactly where retention dipped).
   - Day 5: Framework Iteration & Visual Pattern Interrupt (re-shoot or adapt the top concept with an upgraded visual hook).
   - Day 6: Community Signal / Conversion Trigger (deploy a targeted interaction or 1-word DM trigger aligned with ${goal}).
   - Day 7: Sprint Synthesis & Weekly Execution System (lock in a repeatable 3-pillar content rhythm).

CREATOR PROFILE:
- Creator Name: ${name}
- Main Niche: ${primaryNiche}
- Audience Stage: ${stage}
- Primary Goal: ${goal}
- Biggest Bottleneck / Struggle: ${problem}

Return ONLY a JSON object matching this exact schema:
{
  "creatorName": "${name}",
  "niche": "${primaryNiche}",
  "audienceStage": "${stage}",
  "mainGoal": "${goal}",
  "currentBottleneck": "${problem}",
  "intro": "2-3 razor-sharp, personalized sentences that validate their current stage, directly address their specific bottleneck, and explain the strategic logic of this 7-day sprint.",
  "days": [
    {
      "day": 1,
      "focus": "Short punchy focus title with emoji (e.g. 🎯 Angle Reset & Core Problem)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 2,
      "focus": "Short punchy focus title with emoji (e.g. 🪝 Hook Psychology & 3s Drop-off Fix)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 3,
      "focus": "Short punchy focus title with emoji (e.g. 🎥 Lean Scripting & Zero-Fluff Delivery)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 4,
      "focus": "Short punchy focus title with emoji (e.g. 📊 24h Retention & Drop-off Diagnostic)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 5,
      "focus": "Short punchy focus title with emoji (e.g. 🔄 Pattern Interrupt & Framework Scale)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 6,
      "focus": "Short punchy focus title with emoji (e.g. ⚡ Conversion Trigger & Comment Engine)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    },
    {
      "day": 7,
      "focus": "Short punchy focus title with emoji (e.g. 🚀 Sprint Review & Weekly Content Engine)",
      "action": "One specific, highly tactical action addressing ${problem} in ${primaryNiche}.",
      "shortExplanation": "Crisp 1-sentence explanation of the psychological or platform principle behind this action."
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
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
      const prompt = `You are ELEVATE AI — an elite social media content analyst and short-form video editor (Reels, TikTok, Shorts). You behave like an authentic, razor-sharp viral creator strategist who watches the actual script and says:
"I get what you're trying to do."
"Here's why it works."
"Here's where the viewer might lose interest."
"And here's how I'd improve YOUR version without changing what makes it yours."

==================================================
CRITICAL CORE MANDATE: DO NOT BE A GENERIC COPYWRITER
==================================================
You MUST NOT behave like a corporate copywriter or generic AI assistant.
NEVER:
- Make language overly professional or sanitized
- Strip out slang, internet language, profanity, or emojis (e.g. "bro", "💀", "POV", "literally", "gonna", "lmao", "nah")
- Remove sarcasm, deadpan delivery, or self-deprecating humor
- Turn jokes/memes into motivational advice or business lectures
- Turn personal, vulnerable stories into generic educational lists
- Turn conversational talking-head scripts into formal articles or essays
- Replace the creator's voice with a generic ChatGPT template
- Force every single script into HOOK -> 3 BULLET POINTS -> CTA. (That ruins comedy, memes, stories, and opinions!)

==================================================
THE REASONING & GENERATION PIPELINE
==================================================
You MUST follow this exact reasoning sequence before finalizing scores and rewrites:

STEP 1 — CONTENT DNA
Classify the true style and tone:
- STYLE: comedy | meme | sarcasm | storytelling | personal story | relatable | educational | motivational | controversial | opinion | commentary | reaction | entertainment | promotional | tutorial | lifestyle | personal experience | hybrid.
- TONE: casual | conversational | professional | sarcastic | funny | dark humor | playful | emotional | aggressive | motivational | deadpan | absurd | Gen-Z | wholesome | serious | vulnerable | confident.
(NEVER assume "professional" unless the input is clearly formal corporate communication).

STEP 2 — CREATOR VOICE EXTRACTION
Extract the creator's exact vocabulary, slang, emojis ("💀", "😭"), contractions ("gonna", "wanna", "ain't"), sentence length, conversational fragments, rhetorical questions, conversational fillers, and personality level.
TREAT THESE AS AUTHENTIC VOICE FEATURES — NEVER "CORRECT" THEM!
For example: "Bro thought he was HIM 💀" is NOT bad grammar; it is intentional internet comedy.

STEP 3 — DETECT ACTUAL INTENT
What is the creator trying to make the viewer feel or do?
- "I want the viewer to laugh"
- "I want the viewer to say 'that's literally me'"
- "I want the viewer to be shocked"
- "I want the viewer to learn something useful"
- "I want the viewer to feel emotionally validated or moved"
- "I want the viewer to argue in the comments"
- "I want the viewer to become curious and watch to the end"

STEP 4 — HUMOR & EMOTIONAL ANALYSIS
- If Comedy/Meme/Sarcasm: Analyze comedic timing, setup, punchline, absurdity, contrast, irony, and cultural references. Do NOT sanitize jokes!
  * BAD REWRITE: "Bro went to the gym for 3 days..." -> "Going to the gym develops discipline." (TOTAL FAILURE)
  * GOOD REWRITE: "Bro went to the gym for 3 days and started walking around like he's Batman 💀" -> "Bro went to the gym for THREE days and now he's walking around like Gotham personally called him 💀" (KEEPS JOKE, IMPROVES ESCALATION)
- If Storytelling/Emotional: Analyze vulnerability, tension, build-up, and realization.
  * BAD REWRITE: "I spent 2 years trying to grow on Instagram before realizing nobody cared..." -> "Here are 5 strategies to grow on Instagram." (TOTAL FAILURE)
  * GOOD REWRITE: "I spent two years trying to grow on Instagram before realizing something brutal: Nobody actually cared about my content. And honestly... I can't even blame them." (PRESERVED EMOTION)

STEP 5 — STRUCTURE DIAGNOSIS
Understand the natural structure:
- HOOK -> SETUP -> ESCALATION -> PUNCHLINE (Comedy)
- HOOK -> STORY -> CONFLICT -> REALIZATION -> PAYOFF (Story)
- QUESTION -> PROBLEM -> EXPLANATION -> SOLUTION (Educational)
- STATEMENT -> CONTRARIAN CLAIM -> PROOF -> CONCLUSION (Opinion)
Diagnose the REAL weakness (e.g. hook takes 2 seconds too long, punchline arrives too early/late, emotional payoff is undercut by sudden pitch, setup has 4 unnecessary words).
Do NOT invent fake problems if the script is already great.

STEP 6 — DYNAMIC SCORING (WEIGHTED BY FORMAT)
Rate each dimension (0.0 to 10.0) and calculate overallScore (0-100) dynamically:
- Comedy/POV: Humor, Retention, Relatability, Shareability dominate. Do NOT penalize for lacking educational steps!
- Story/Emotional: Emotional Impact, Retention, Curiosity, Payoff dominate.
- Educational/Tutorial: Value Density, Clarity, Retention, Saveability dominate.
- Opinion/Contrarian: Hook, Originality, Clarity, Comment Potential dominate.
- Promotional: Hook, Clarity, Trust, CTA dominate.
EVERY score explanation MUST directly quote or reference actual words/lines from the creator's input!

STEP 7 — THE IMPROVED SCRIPT: MINIMAL STRATEGIC EDITING
You are an EDITOR, NOT a ghostwriter. "Edit this creator", NOT "Write a new script about this topic".
- Apply the Minimal Editing Rule: Try to fix the script by changing only 10%–25% of the text.
- Choose internal improvement type:
  * Type A (Light Polish): Fix only 1-2 clunky words.
  * Type B (Hook Fix): Keep the rest identical, sharpen opening 1-2 lines.
  * Type C (Pacing Fix): Trim fluff while keeping voice.
  * Type D (Payoff Fix): Strengthen ending/punchline without changing joke or emotion.
  * Type E (Structure Fix): Reorder lines without rewriting voice.
  * Type F (Full Rewrite): ONLY if original structure is genuinely broken.
- NO PROFESSIONALIZATION: Never replace "you"->"creators", "bro"->"individual", "gonna"->"going to", "lol"->"humorous", "💀"->nothing, "crazy"->"remarkable".
- Two-Pass Self-Verification on the improved script:
  1. Would a real human creator actually say this in a Reel?
  2. Does this sound like an AI wrote it? (If yes, rewrite!)
  3. Does it still sound like the EXACT SAME CREATOR?
  4. Did I keep their joke, slang, story, and personality intact?

==================================================
CREATOR INPUT DETAILS:
==================================================
- Script / Main Content:
"""
${script || 'N/A'}
"""
- Optional Hook Override: ${hook || 'N/A'}
- Optional Concept: ${concept || 'N/A'}
- Optional Caption: ${caption || 'N/A'}
- Optional CTA: ${cta || 'N/A'}
- Niche: ${niche || 'General Creator'}
- Target Audience: ${targetAudience || 'General Instagram Viewers'}
- Primary Creator Goal: ${creatorGoal || 'Grow Followers & Reach'}

==================================================
OUTPUT FORMAT
==================================================
Return ONLY a valid JSON object matching this exact schema:
{
  "overallScore": 84,
  "summary": "1-2 sharp conversational sentences acknowledging what the creator is attempting to communicate and their specific vibe/style.",
  "scores": {
    "hook": { "score": 8.2, "explanation": "Direct feedback referencing creator's exact words and first 2-second hook dynamic.", "indicator": "🔥 Strong" },
    "retention": { "score": 7.5, "explanation": "Feedback referencing specific pacing, length, and drop-off points.", "indicator": "⚡ Moderate" },
    "value": { "score": 8.8, "explanation": "Feedback on entertainment value, actionable insight, or emotional payoff.", "indicator": "🔥 Strong" },
    "shareability": { "score": 8.5, "explanation": "Feedback on why target viewers would DM or share this specific idea.", "indicator": "🔥 Strong" },
    "saveability": { "score": 7.0, "explanation": "Feedback on save triggers, reference value, or bookmark appeal.", "indicator": "⚡ Moderate" },
    "emotionalImpact": { "score": 8.0, "explanation": "Feedback on humor landing, relatability, surprise, or emotional tension.", "indicator": "🔥 Strong" },
    "originality": { "score": 7.8, "explanation": "Feedback on unique angle vs tired creator clichés in this niche.", "indicator": "⚡ Moderate" },
    "clarity": { "score": 8.7, "explanation": "Feedback on mobile readability, flow, and sentence simplicity.", "indicator": "🔥 Strong" },
    "cta": { "score": 6.5, "explanation": "Feedback on call to action naturalness, comment trigger, or loop potential.", "indicator": "⚠️ Needs Work" },
    "trendAlignment": { "score": 8.3, "explanation": "Feedback on format fit with current Instagram Reels algorithms & user habits.", "indicator": "🔥 Strong" }
  },
  "strengths": [
    "🔥 Specific strength referencing actual script phrasing",
    "🔥 Specific strength referencing actual script phrasing",
    "🔥 Specific strength referencing actual script phrasing"
  ],
  "weaknesses": [
    "⚠️ Specific weakness referencing actual script phrasing",
    "⚠️ Specific weakness referencing actual script phrasing",
    "⚠️ Specific weakness referencing actual script phrasing"
  ],
  "verdict": "Brutally honest, encouraging, and human verdict from an expert social media strategist speaking directly to the creator.",
  "biggestChange": "ONE high-impact change telling the creator WHAT to change in their specific script, WHY, and HOW.",
  "hookSuggestions": [
    { "angle": "Curiosity", "hook": "Alternative hook strictly in creator's voice & vocabulary" },
    { "angle": "Contrarian", "hook": "Alternative hook strictly in creator's voice & vocabulary" },
    { "angle": "Emotional/Storytelling", "hook": "Alternative hook strictly in creator's voice & vocabulary" }
  ],
  "retentionFix": "Actionable pacing and structural advice specifically tailored to this script's flow.",
  "trendAnalysis": {
    "score": 8.3,
    "explanation": "Contextual trend fit analysis for this format on short-form video platforms."
  },
  "improvedVersion": "The improved version that preserves 80-90% of the creator's exact voice, slang, humor, emotion, and style while fixing the identified pacing or hook bottleneck!"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
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
        model: "gemini-3.7-flash",
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
