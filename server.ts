import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { generateRuleBasedDiagnosis } from "./src/utils/creatorStrategist.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for AI Creator OS Growth Audit & Strategic Diagnosis
  app.post("/api/diagnose", async (req, res) => {
    try {
      const { creatorName, niche, followers, mainGoal, currentBottleneck } = req.body;

      const name = creatorName || "Creator";
      const primaryNiche = niche || "Tech, AI & Software";
      const audienceScale = followers || "Early Stage — 0–5K";
      const primaryGoal = mainGoal || "Gain Views, Followers & Likes";
      const mainBottleneck = currentBottleneck || "Inconsistent growth and unclear positioning";

      const apiKey = process.env.GEMINI_API_KEY;
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

          return res.json({
            success: true,
            isAI: true,
            diagnosis: parsed
          });
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

      return res.json({
        success: true,
        isAI: false,
        diagnosis: fallbackDiagnosis
      });

    } catch (error: any) {
      console.error("Diagnosis error:", error);
      return res.status(500).json({
        error: "Failed to generate diagnosis",
        message: error?.message || "Internal server error"
      });
    }
  });

  // API endpoint for Free Strategy Session Google Sheets integration (Spreadsheet ID: 1MJCTxdYxttUAcNDRp6UqWIARN7RhQdJeJT3VohHBBk8)
  const strategySubmissions: any[] = [];
  const SPREADSHEET_ID = "1MJCTxdYxttUAcNDRp6UqWIARN7RhQdJeJT3VohHBBk8";

  app.post("/api/book-strategy-session", async (req, res) => {
    try {
      const { fullName, phoneNumber, instagramId, currentProblem, email } = req.body;

      if (!fullName || !phoneNumber || !instagramId || !currentProblem) {
        return res.status(400).json({ error: "Missing required fields" });
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

      // Forward to Google Apps Script Web App
      const webAppUrl = process.env.GOOGLE_SHEET_WEB_APP_URL || "https://script.google.com/macros/s/AKfycbyyUmXiHTOFEWaxfQ2k36I6zlailBr4sxpQy1Q70QlUkI47MPeOow0BRZTsd_57G8b5/exec";
      if (webAppUrl) {
        // Send JSON as text/plain to avoid CORS / parser issues in Google Apps Script
        try {
          const sheetRes = await fetch(webAppUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(sheetPayload),
            redirect: "follow"
          });
          console.log("Posted entry to Google Apps Script Web App, status:", sheetRes.status);
        } catch (sheetErr) {
          console.error("Failed to forward to Google Sheet Web App (JSON):", sheetErr);
        }

        // Also post as URL-encoded form data in case doPost reads e.parameter
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

      return res.json({
        success: true,
        message: "Successfully logged for strategy session",
        submission: sheetPayload
      });
    } catch (err: any) {
      console.error("Booking error:", err);
      return res.status(500).json({ error: err?.message || "Internal server error" });
    }
  });

  app.get("/api/strategy-submissions", (req, res) => {
    res.json({ submissions: strategySubmissions });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
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

startServer();
