// functions/api/usage.ts
// Cloudflare Pages Function — handles GET /api/usage

export async function onRequestGet(context: {
  request: Request;
  env: { SUPABASE_URL?: string; SUPABASE_ANON_KEY?: string };
}) {
  const url = new URL(context.request.url);
  const userId = url.searchParams.get('userId') || context.request.headers.get('x-user-session-id') || 'guest';
  const currentMonthYear = new Date().toISOString().slice(0, 7);

  if (context.env?.SUPABASE_URL && context.env?.SUPABASE_ANON_KEY) {
    try {
      const res = await fetch(
        `${context.env.SUPABASE_URL}/rest/v1/usage_tracking?user_id=eq.${encodeURIComponent(userId)}&month_year=eq.${encodeURIComponent(currentMonthYear)}&select=count`,
        {
          headers: {
            apikey: context.env.SUPABASE_ANON_KEY,
            Authorization: `Bearer ${context.env.SUPABASE_ANON_KEY}`,
          },
        }
      );
      if (res.ok) {
        const rows: any = await res.json();
        const used = rows?.[0]?.count || 0;
        return Response.json({
          used,
          limit: 5,
          monthYear: currentMonthYear,
          canAnalyze: used < 5,
        });
      }
    } catch (e) {
      console.warn('Supabase usage query error:', e);
    }
  }

  return Response.json({
    used: 0,
    limit: 5,
    monthYear: currentMonthYear,
    canAnalyze: true,
  });
}
