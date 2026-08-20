// functions/api/analyze-reel.ts
//
// Cloudflare Pages Function — handles POST /api/analyze-reel
// Multimodal Gemini 3.6 Flash Video + Audio Analysis

interface FrameInput {
  time: number;
  label: string;
  base64: string;
}

interface RequestPayload {
  fileName: string;
  fileSize: string;
  mimeType?: string;
  videoBase64?: string;
  followers?: number | string;
  averageViews?: number | string;
  niche?: string;
  targetAudience?: string;
  durationSec?: number;
  dimensions?: string;
  aspectRatio?: string;
  frames?: FrameInput[];
  userId?: string;
  sessionId?: string;
}

const SYSTEM_PROMPT = `You are ELEVATE AI — an experienced Instagram Reels Content Strategist & Video Director inside Elevate OS.
You personally watched and listened to this uploaded Reel. You provide clear, encouraging, and razor-sharp feedback using natural creator language.

==================================================
MANDATORY STRATEGIST DIRECTIVES (EVIDENCE-FIRST)
==================================================
1. YOU PERSONALLY WATCHED AND LISTENED TO THIS REEL:
   - The uploaded video and audio stream are your EXCLUSIVE source of truth.
   - The creator must feel like an expert director sat down with them and reviewed their actual video.
   - Never give generic advice (e.g. NEVER say "Improve your hook" or "Improve pacing" without citing the exact detected moment).
   - Quote the creator's actual spoken words, describe their exact camera framing/movement, lighting, on-screen text, and audio cues detected in THIS Reel.
   - Before generating each recommendation, ask internally: "What EXACT thing in this Reel caused me to give this advice?"

2. REMOVE ALL TECHNICAL JARGON:
   - FORBIDDEN TERMS: Do NOT use "Stack Audit", "P0", "P1", "P2", "Priority Fix", "Forensic Analysis", "Content Diagnosis", "Technical Audit", "Performance Engineering", "Retention Architecture".
   - USE NATURAL CREATOR LANGUAGE: "What's Working", "What's Holding It Back", "The 3 Changes I'd Make", "Your Hook", "Your Pacing", "Your Audio", "Your Ending", "Try This Instead", "Your Better Version", "Before You Post".

3. NO LONG REEL TIMELINE DUMPS:
   - Do NOT output long 2-second timestamp breakdown tables. Use timestamps ONLY when they help pinpoint a specific problem or friction point (e.g. "At 0:03, the video stays on the same shot for too long").

4. CREATOR CONTEXT & BENCHMARKING:
   - Evaluate this Reel against the creator's baseline views, niche, and target audience (India / IST timezone).
   - Realistic Performance Outlook: Compare this Reel against their baseline views (Potential: "Above your normal performance" | "Around your normal performance" | "Below your normal performance").

==================================================
REQUIRED OUTPUT SCHEMA (JSON)
==================================================
Return ONLY a valid JSON object matching this exact structure:
{
  "durationFormatted": "0:25",
  "overallScore": 7.8,
  "verdict": "One clear, honest sentence summarizing this Reel's core opportunity.",
  
  "creatorScores": {
    "hook": { "score": 8, "explanation": "Opening addresses viewer directly, but visual proof is delayed by 1.5 seconds." },
    "pacing": { "score": 6, "explanation": "The middle section stays on the same camera angle for 4 seconds without cut or movement." },
    "value": { "score": 9, "explanation": "The actionable tip is practical, easy to grasp, and directly relevant." },
    "visuals": { "score": 7, "explanation": "Good lighting and clear subject, but on-screen text sits close to the bottom interface." },
    "audio": { "score": 8, "explanation": "Your voice delivery is crisp and clear with well-balanced background music." },
    "ending": { "score": 5, "explanation": "Ends abruptly without a conversation-starting question or loop trigger." }
  },

  "whatsWorking": [
    {
      "title": "Clear and immediate topic promise",
      "whatAiNoticed": "What the AI noticed: Quote or cite the exact visual or opening spoken words in 0-3s.",
      "whyItHelps": "Why it helps: Explains how this immediately signals value to viewers."
    },
    {
      "title": "Natural vocal presence & energy",
      "whatAiNoticed": "What the AI noticed: Specific audio/spoken observation from this video.",
      "whyItHelps": "Why it helps: Builds immediate creator rapport and authenticity."
    },
    {
      "title": "Practical and actionable payoff",
      "whatAiNoticed": "What the AI noticed: The specific takeaway or demonstration shown.",
      "whyItHelps": "Why it helps: Gives viewers a compelling reason to bookmark and share."
    }
  ],

  "whatsHoldingItBack": [
    {
      "title": "Visual delay on the opening promise",
      "whatAiNoticed": "What I noticed: At 0:02, you state the core problem but the visual stays stationary.",
      "whyItMatters": "Why it matters: Viewers need visual confirmation in under 2 seconds or they swipe away.",
      "timestamp": "0:00–0:03"
    },
    {
      "title": "Mid-video visual plateau",
      "whatAiNoticed": "What I noticed: A 4-second stretch with no cut, angle change, or overlay.",
      "whyItMatters": "Why it matters: Causes an attention dip during the explanation.",
      "timestamp": "0:06–0:10"
    },
    {
      "title": "Passive closing call to action",
      "whatAiNoticed": "What I noticed: Ending with a generic or abrupt closing.",
      "whyItMatters": "Why it matters: Misses the chance to trigger comment debates and boost algorithmic engagement.",
      "timestamp": "End of video"
    }
  ],

  "top3Changes": [
    {
      "number": 1,
      "title": "Show the problem immediately in the first frame",
      "whatToChange": "What I'd change: Replace the stationary intro with immediate visual evidence of what you're discussing.",
      "tryThis": "Try this: Quote the exact improved spoken line or opening hook to say.",
      "visualAndTextChange": "Visual edit: Cut directly to the action shot. Text: Place 3-word bold title at 40% screen height."
    },
    {
      "number": 2,
      "title": "Tighten the explanation with a quick B-roll cut",
      "whatToChange": "What I'd change: Break up the middle monologue with a punch-in or b-roll overlay.",
      "tryThis": "Try this: Trim 1.5 seconds of dead air and deliver the second tip without pausing.",
      "visualAndTextChange": "Visual edit: 1.15x zoom cut at the transition point to reset viewer attention."
    },
    {
      "number": 3,
      "title": "Swap the generic ending for a specific debate question",
      "whatToChange": "What I'd change: Replace 'Follow for more' with a question directly tied to the topic.",
      "tryThis": "Try this: End with a specific question relevant to this Reel's core insight.",
      "visualAndTextChange": "Visual edit: Hold the final takeaway card for 0.8s so the video loops seamlessly back to the start."
    }
  ],

  "betterVersion": {
    "newHook": "Exact rewritten hook line preserving the creator's voice and personality.",
    "bodyStructure": "Concise 2-part structure that delivers the core takeaway without fluff.",
    "betterEnding": "Engaging question or prompt that sparks comments and loops naturally.",
    "notes": "Why this version retains attention better while sounding 100% natural."
  },

  "audioAndEditing": {
    "voice": "Vocal tone is confident; pace is slightly fast at ~140 WPM with clear articulation.",
    "music": "Background track sits nicely under the voice without drowning out words.",
    "soundEffects": "Adding a subtle whoosh or pop on the key takeaway text would heighten retention.",
    "pauses": "Trim the 0.6s silence between point 1 and point 2.",
    "cutsAndTransitions": "Use a 1.1x punch-in cut midway to reset visual focus.",
    "captions": "Raise text overlay 40px higher so it is not obstructed by the Instagram audio tag."
  },

  "beforeYouPostChecklist": [
    "Fix the opening: Show the visual subject within the first 1.5 seconds",
    "Tighten the middle: Trim the 0.6s pause during the main explanation",
    "Raise the caption overlay so it sits well above the bottom navigation",
    "Replace the closing CTA with a direct question to drive comments",
    "Ensure the final frame transitions smoothly into the first frame for replay loops"
  ],

  "nextReelIdeas": [
    {
      "title": "Natural Part 2 / Follow-up Idea",
      "concept": "A direct companion Reel that builds on this topic (e.g., 'The only 2 exceptions to this rule').",
      "whyItWorksNext": "Captures the audience already interested in this Reel's core concept."
    },
    {
      "title": "Contrarian / Behind-the-Scenes Angle",
      "concept": "Show the alternative approach or how you personally implemented this solution.",
      "whyItWorksNext": "Deepens authority and trust in this niche."
    }
  ],

  "performanceOutlook": {
    "creatorBaseline": "Your normal views",
    "potential": "Above your normal performance",
    "explanation": "With a tightened opening visual and the middle pacing trimmed, this topic has strong save and share dynamics.",
    "formatNote": "This format has high retention velocity in short-form feeds."
  },

  "analysisConfidence": "High",
  "analysisConfidenceReason": "Grounded in multimodal video and audio inspection",
  "whatAiNoticed": [
    "Opening observation citing detected spoken words or visual gesture",
    "Lighting and framing observation from this video",
    "Pacing and cut timing observation from this video",
    "Audio delivery and music balance observation from this video"
  ],
  "timelineBreakdown": [],
  "performanceInsights": {
    "creatorAverage": "5,000 views",
    "aiEstimatedRange": "5.5K – 11K views",
    "potentialUpside": "Up to 19K views",
    "explanation": "Analytical reasoning based on detected hook quality and pacing."
  },
  "contentDiagnosis": {
    "working": [
      {
        "category": "Hook & Value",
        "title": "Clear Topic Promise",
        "explanation": "The video establishes immediate value for the viewer.",
        "status": "positive",
        "microBadge": "👀 Topic Clarity"
      }
    ],
    "couldHurt": [
      {
        "category": "Retention & Pacing",
        "title": "Mid-Video Attention Dip",
        "explanation": "Pacing can be tightened to prevent viewer swiping.",
        "status": "warning",
        "microBadge": "⚠️ Pacing Friction"
      }
    ]
  },
  "beforeYouPost": [
    {
      "id": "rec_1",
      "number": "01",
      "title": "Tighten Opening Visual",
      "explanation": "Ensures viewer retention in the first 2 seconds.",
      "detectedIssue": "Slight visual delay on the promise.",
      "suggestedFix": "Cut straight to the action."
    }
  ],
  "postingIntelligence": {
    "bestDay": "Tuesday & Thursday",
    "bestTimeIST": "7:30 PM – 9:00 PM IST",
    "secondaryWindowIST": "12:45 PM – 2:00 PM IST",
    "reasoning": "Optimized for active scrolling windows."
  },
  "trendSignals": {
    "nicheAlignment": { "label": "Niche Alignment", "score": "92%", "status": "strong", "summary": "Direct fit for audience." },
    "topicRelevance": { "label": "Topic Relevance", "score": "88%", "status": "strong", "summary": "High curiosity trigger." },
    "contentSignals": { "label": "Format Signals", "score": "85%", "status": "strong", "summary": "Proven short-form structure." }
  },
  "summary": "1-2 sentence strategist verdict on this Reel's core strength and top change before posting."
};
  "postingIntelligence": {
    "bestDay": "Tuesday & Thursday",
    "bestTimeIST": "7:30 PM – 9:00 PM IST",
    "secondaryWindowIST": "12:45 PM – 2:00 PM IST",
    "reasoning": "Contextual reason for target audience in India"
  },
  "trendSignals": {
    "nicheAlignment": { "label": "Niche Alignment", "score": "92%", "status": "strong", "summary": "Niche relevance summary" },
    "topicRelevance": { "label": "Topic Relevance", "score": "88%", "status": "strong", "summary": "Audience interest summary" },
    "contentSignals": { "label": "Current Content Signals", "score": "84%", "status": "moderate", "summary": "Algorithmic signals summary" }
  },
  "analysisConfidence": "High",
  "analysisConfidenceReason": "Grounded in multimodal video and audio inspection",
  "summary": "1-2 sentence punchy executive summary of the Reel's core opportunity and top priority before posting"
}`;

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-user-session-id',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestPost(context: {
  request: Request;
  env: { GEMINI_API_KEY: string; SUPABASE_URL?: string; SUPABASE_ANON_KEY?: string };
}) {
  try {
    const payload = (await context.request.json().catch(() => null)) as RequestPayload | null;

    if (!payload || typeof payload !== 'object') {
      return Response.json(
        { error: 'Invalid request payload. Expected JSON object.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const hasVideo = typeof payload.videoBase64 === 'string' && payload.videoBase64.length > 0;
    const hasFrames = Array.isArray(payload.frames) && payload.frames.length > 0;

    if (!hasVideo && !hasFrames) {
      return Response.json(
        { error: 'No video data received for Reel analysis. A video file is required.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (hasVideo && payload.videoBase64.length > 80 * 1024 * 1024) {
      return Response.json(
        { error: 'Video payload exceeds maximum size limit (80MB). Please compress the video.' },
        { status: 413, headers: CORS_HEADERS }
      );
    }

    if (!context.env.GEMINI_API_KEY) {
      console.error('[CLOUDFLARE FUNCTION ERROR] GEMINI_API_KEY is not configured in environment variables.');
      return Response.json(
        { error: 'GEMINI_API_KEY is not configured on the server. Please check environment variables.' },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    const cleanFileName = payload.fileName ? String(payload.fileName).slice(0, 100) : 'uploaded_reel.mp4';
    const cleanFileSize = payload.fileSize ? String(payload.fileSize).slice(0, 20) : 'unknown size';

    // Safe debugging log (no keys, tokens, or base64)
    console.log(
      `[CLOUDFLARE FUNCTION] Reel Analysis Request: file="${cleanFileName}", size="${cleanFileSize}", duration=${payload.durationSec || 'unknown'}s, frames=${Array.isArray(payload.frames) ? payload.frames.length : 0}`
    );

    const parts: Record<string, unknown>[] = [
      { text: SYSTEM_PROMPT },
      {
        text: `Creator context — followers: ${payload.followers ?? '10,000'}, ` +
          `average views: ${payload.averageViews ?? '5,000'}, niche: ${payload.niche ?? 'Fitness'}, ` +
          `target audience: ${payload.targetAudience ?? 'Target Audience in India (IST timezone)'}. ` +
          `Reel File: ${cleanFileName} (${cleanFileSize}${payload.durationSec ? `, ${payload.durationSec}s` : ''}${payload.dimensions ? `, ${payload.dimensions}` : ''}).`,
      },
    ];

    if (hasVideo) {
      const cleanData = payload.videoBase64.replace(/^data:[a-zA-Z0-9/.-]+;base64,/, '');
      parts.push({
        inline_data: {
          mime_type: payload.mimeType || 'video/mp4',
          data: cleanData,
        },
      });
    }

    if (hasFrames) {
      for (const frame of payload.frames) {
        if (frame && frame.base64) {
          parts.push({ text: `Frame at ${frame.time.toFixed(1)}s — ${frame.label}:` });
          parts.push({
            inline_data: {
              mime_type: 'image/jpeg',
              data: frame.base64.replace(/^data:image\/\w+;base64,/, ''),
            },
          });
        }
      }
    }

    console.log(`[CLOUDFLARE FUNCTION] Sending multimodal request to Gemini 3.6 Flash API with ${parts.length} parts...`);

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${context.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.3 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('[CLOUDFLARE FUNCTION] Gemini API error:', geminiRes.status, errText);
      return Response.json(
        { error: 'Gemini AI analysis failed: ' + errText },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    const geminiData: any = await geminiRes.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error('[CLOUDFLARE FUNCTION] Empty Gemini response:', JSON.stringify(geminiData));
      return Response.json(
        { error: 'Empty response returned from Gemini' },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    const parsedResult = JSON.parse(rawText);

    return Response.json(
      { success: true, isAI: true, result: parsedResult },
      { headers: CORS_HEADERS }
    );
  } catch (err: any) {
    console.error('[CLOUDFLARE FUNCTION ERROR] analyze-reel function error:', err);
    return Response.json(
      { error: err?.message || 'Unknown server error during Reel analysis' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
