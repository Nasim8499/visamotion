const KEY = "visamotion.links.v1";

export interface LinkOverride { officialVisa?: string; appointment?: string; }
type Store = Record<string, LinkOverride>;

function read(): Store {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function write(s: Store) { localStorage.setItem(KEY, JSON.stringify(s)); }

export function getOverrides(countryId: string): LinkOverride {
  return read()[countryId] || {};
}

export function setOverrides(countryId: string, override: LinkOverride) {
  const s = read();
  s[countryId] = { ...s[countryId], ...override };
  // strip empties
  if (!s[countryId].officialVisa) delete s[countryId].officialVisa;
  if (!s[countryId].appointment) delete s[countryId].appointment;
  if (Object.keys(s[countryId]).length === 0) delete s[countryId];
  write(s);
  window.dispatchEvent(new CustomEvent("visamotion:links-updated", { detail: { countryId } }));
}
