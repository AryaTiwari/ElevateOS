export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/analyze-reel") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
          status: 405,
        });
      }

      try {
        const body = await request.json();

        const prompt = `
You are Elevate OS Reel Analyzer, an expert AI strategist for Instagram Reels.

Analyze the creator's Reel using the provided video/frame information.

Creator information:
- Followers: ${body.followers}
- Average views: ${body.averageViews}
- Niche: ${body.niche}
- Target audience: ${body.targetAudience}

Video:
- Filename: ${body.fileName}
- Duration: ${body.durationSec} seconds
- Dimensions: ${body.dimensions}
- Aspect ratio: ${body.aspectRatio}

Frame information:
${JSON.stringify(body.frames)}

Give a genuinely evidence-based analysis.

Do NOT invent observations that cannot be supported by the supplied frames.

Return ONLY valid JSON with this structure:

{
  "summary": "",
  "analysisConfidence": "",
  "analysisConfidenceReason": "",
  "whatAiNoticed": [],
  "timelineBreakdown": [],
  "performanceInsights": {
    "creatorAverage": "",
    "aiEstimatedRange": "",
    "potentialUpside": "",
    "explanation": ""
  },
  "contentDiagnosis": {
    "working": [],
    "couldHurt": []
  },
  "beforeYouPost": [],
  "postingIntelligence": {
    "bestDay": "",
    "bestTimeIST": "",
    "secondaryWindowIST": "",
    "reasoning": ""
  },
  "trendSignals": {
    "nicheAlignment": {},
    "topicRelevance": {},
    "contentSignals": {}
  }
}
`;

        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=" +
            encodeURIComponent(env.GEMINI_API_KEY),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
              generationConfig: {
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();

          return new Response(
            JSON.stringify({
              error: "Gemini API request failed",
              details: errorText,
            }),
            {
              status: 502,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }

        const geminiData = await response.json();

        const text =
          geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
          return new Response(
            JSON.stringify({
              error: "Gemini returned no analysis",
            }),
            {
              status: 502,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }

        let result;

        try {
          result = JSON.parse(text);
        } catch {
          return new Response(
            JSON.stringify({
              error: "Gemini returned invalid JSON",
              raw: text,
            }),
            {
              status: 502,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }

        return new Response(
          JSON.stringify({
            result,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({
            error: "Analysis failed",
            details: String(error),
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
};
