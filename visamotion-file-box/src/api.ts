type ApiResult<T> = { data: T };
async function request<T>(path: string, body: unknown): Promise<ApiResult<T>> {
  const response = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || data.message || 'Request failed');
  return { data };
}
export const api = { post: request };