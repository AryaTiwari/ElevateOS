// functions/api/analyze-reel.ts
//
// Cloudflare Pages Function — handles POST /api/analyze-reel
// This file must live at the PROJECT ROOT under /functions, i.e.
//   your-repo/functions/api/analyze-reel.ts
// (sibling to /src, NOT inside it). Cloudflare Pages auto-detects this
// folder and turns it into serverless routes — no extra config needed.
//
// Setup required before this works:
//   1. Move hosting from GitHub Pages to Cloudflare Pages (connect the
//      same GitHub repo — Cloudflare auto-detects your build command).
//   2. Get a Gemini API key from Google AI Studio (aistudio.google.com).
//   3. In the Cloudflare Pages project -> Settings -> Environment
//      variables, add GEMINI_API_KEY as a SECRET (not plain text).
//
// Your existing client code (analyzeReelWithAI) needs ZERO changes —
// it already calls fetch('/api/analyze-reel') and expects { result: {...} }
// back. This file is the only missing piece.

interface FrameInput {
  time: number;
  label: string;
  base64: string;
}

interface RequestPayload {
  fileName: string;
  fileSize: string;
  followers?: number | string;
  averageViews?: number | string;
  niche?: string;
  targetAudience?: string;
  durationSec: number;
  dimensions: string;
  aspectRatio: string;
  frames: FrameInput[];
}

const SYSTEM_PROMPT = `You are Elevate AI's Reel Analyzer. You are given a sequence of
timestamped frames extracted from a real Instagram Reel, in order, plus creator context.

Ground every observation in what is actually visible across these specific frames —
framing, cuts implied by visual changes between frames, on-screen text, subject
position, lighting, background. Never invent timestamps, text, or details you cannot
see. If something isn't visible in the frames (e.g. audio, exact spoken words), do not
claim to know it — note it as not determinable from frames.

Respond with ONLY valid JSON, no markdown fences, matching exactly this shape:
{
  "whatWeNoticed": string[],               // 3-5 highly specific, frame-grounded observations
  "breakdown": [                            // 3-6 entries
    { "range": string, "label": string, "insight": string }
  ],
  "strengths": [{ "detail": string, "why": string }],
  "weaknesses": [{ "detail": string, "why": string, "fix": string }],
  "beforeYouPost": [
    { "title": string, "detected": string, "suggestion": string }
  ],
  "estimatedViews": {
    "low": number, "high": number,
    "upside": string, "reasoning": string
  },
  "confidence": "High" | "Moderate" | "Limited"
}`;

export async function onRequestPost(context: {
  request: Request;
  env: { GEMINI_API_KEY: string };
}) {
  try {
    const payload = await context.request.json<RequestPayload>();

    if (!payload.frames || payload.frames.length === 0) {
      return Response.json(
        { error: 'No frames received — nothing to analyze.' },
        { status: 400 }
      );
    }

    const parts: Record<string, unknown>[] = [
      { text: SYSTEM_PROMPT },
      {
        text: `Creator context — followers: ${payload.followers ?? 'unknown'}, ` +
          `average views: ${payload.averageViews ?? 'unknown'}, niche: ${payload.niche ?? 'unknown'}, ` +
          `target audience: ${payload.targetAudience ?? 'unknown'}. ` +
          `Reel: ${payload.durationSec}s, ${payload.dimensions} (${payload.aspectRatio}).`,
      },
    ];

    for (const frame of payload.frames) {
      parts.push({ text: `Frame at ${frame.time.toFixed(1)}s — ${frame.label}:` });
      parts.push({
        inline_data: {
          mime_type: 'image/jpeg',
          data: frame.base64.replace(/^data:image\/\w+;base64,/, ''),
        },
      });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${context.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts }],
          generationConfig: { responseMimeType: 'application/json' },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API error:', geminiRes.status, errText);
      return Response.json({ error: 'Gemini request failed' }, { status: 502 });
    }

    const geminiData: any = await geminiRes.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error('Empty Gemini response:', JSON.stringify(geminiData));
      return Response.json({ error: 'Empty response from Gemini' }, { status: 502 });
    }

    const parsedResult = JSON.parse(rawText);

    return Response.json({ result: parsedResult });
  } catch (err: any) {
    console.error('analyze-reel function error:', err);
    return Response.json(
      { error: err?.message || 'Unknown server error' },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------
// DIAGNOSTIC ONLY — lets you check this endpoint from a phone browser by
// just visiting the URL directly (a plain GET), no dev tools needed:
//   https://your-project.pages.dev/api/analyze-reel
// It checks the function is deployed, the secret is present, and makes
// one tiny real call to Gemini so you see the exact error if one exists.
// Safe to delete once everything is confirmed working.
// ---------------------------------------------------------------------
export async function onRequestGet(context: { env: { GEMINI_API_KEY?: string } }) {
  const apiKeyPresent = !!context.env.GEMINI_API_KEY;

  if (!apiKeyPresent) {
    return Response.json({
      functionDeployed: true,
      apiKeyPresent: false,
      message:
        'GEMINI_API_KEY is not visible to this deployment. Add it in Cloudflare Pages → Settings → Variables and Secrets, then redeploy (adding a secret does not apply to deployments made before it).',
    });
  }

  try {
    const testRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${context.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Reply with exactly the word: OK' }] }],
        }),
      }
    );

    const testData: any = await testRes.json();

    return Response.json({
      functionDeployed: true,
      apiKeyPresent: true,
      geminiCallStatus: testRes.status,
      geminiCallSucceeded: testRes.ok,
      geminiRawResponse: testData,
    });
  } catch (err: any) {
    return Response.json({
      functionDeployed: true,
      apiKeyPresent: true,
      geminiCallThrew: err?.message || String(err),
    });
  }
}
