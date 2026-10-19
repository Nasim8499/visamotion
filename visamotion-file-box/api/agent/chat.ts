const SYSTEM = 'You are VisaMotion Admin AI, a Bengali-first visa agency assistant. Reply in natural Bangla unless the user requests another language. Help draft country and visa-purpose document checklists, applicant profile text, file organization plans, and A4 dossier content for Australia, Serbia, Turkey, Singapore, Malaysia and Bahrain. Never guarantee visa approval, claim an application was submitted, or invent official rules. Label outputs as drafts and tell users to verify current requirements with official immigration or embassy sources. Never claim to have read uploaded files unless their actual contents are provided. Protect passport and client personal data.';
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const message = String(req.body?.message || '').trim();
  if (!message) return res.status(400).json({ error: 'Message is required' });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(503).json({ error: 'Gemini is not configured. Add GEMINI_API_KEY in Vercel Project Settings → Environment Variables.' });
  const country = String(req.body?.country || 'not selected');
  const purpose = String(req.body?.purpose || 'not selected');
  const applicant = String(req.body?.applicant || 'not provided');
  const history = Array.isArray(req.body?.history) ? req.body.history.slice(-8).map((m: any) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: String(m.text || '').slice(0, 2500) }] })) : [];
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(key), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: SYSTEM + '\\nCase context: country=' + country + '; purpose=' + purpose + '; applicant=' + applicant + '. Treat all outputs as drafts.' }] }, contents: [...history, { role: 'user', parts: [{ text: message }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 1200 } })
    });
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: data?.error?.message || 'Gemini request failed' });
    const reply = (data?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || '').join('').trim();
    return res.status(200).json({ reply: reply || 'আবার চেষ্টা করুন।' });
  } catch { return res.status(502).json({ error: 'AI service is temporarily unavailable. Please retry.' }); }
}