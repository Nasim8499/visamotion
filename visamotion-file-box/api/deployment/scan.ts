export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const repo = String(req.body?.githubRepo || '').trim();
  if (!repo) return res.status(400).json({ message: 'Enter GitHub owner/repository first.' });
  if (!/^[A-Za-z0-9_.-]+\\/[A-Za-z0-9_.-]+$/.test(repo)) return res.status(400).json({ error: 'Use owner/repository format.' });
  const env = (name: string) => Boolean(process.env[name]);
  return res.status(200).json({ ok: true, repository: repo, message: 'Repository format validated. This is a configuration scan, not a GitHub push or Vercel deployment.', checks: { githubTokenConfigured: env('GITHUB_TOKEN'), vercelTokenConfigured: env('VERCEL_TOKEN'), supabaseUrlConfigured: env('SUPABASE_URL'), supabaseServiceKeyConfigured: env('SUPABASE_SERVICE_ROLE_KEY'), geminiApiKeyConfigured: env('GEMINI_API_KEY'), browserUseApiKeyConfigured: env('BROWSER_USE_API_KEY'), base44ApiKeyConfigured: env('BASE44_API_KEY') } });
}