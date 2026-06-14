import { useEffect, useState, useCallback } from "react";

const KEY = "visamotion.checklist.v1";

type Store = Record<string, Record<string, boolean>>; // countryId -> "category:index" -> done

function read(): Store {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function write(s: Store) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function useChecklistStore(countryId: string, category: string, total: number) {
  const [state, setState] = useState<boolean[]>(() => {
    const s = read();
    const arr = new Array(total).fill(false);
    const saved = s[countryId];
    if (saved) {
      for (let i = 0; i < total; i++) {
        if (saved[`${category}:${i}`]) arr[i] = true;
      }
    }
    return arr;
  });

  useEffect(() => {
    const s = read();
    const arr = new Array(total).fill(false);
    const saved = s[countryId];
    if (saved) {
      for (let i = 0; i < total; i++) {
        if (saved[`${category}:${i}`]) arr[i] = true;
      }
    }
    setState(arr);
  }, [countryId, category, total]);

  const toggle = useCallback((idx: number) => {
    setState((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      const s = read();
      s[countryId] = s[countryId] || {};
      s[countryId][`${category}:${idx}`] = next[idx];
      write(s);
      return next;
    });
  }, [countryId, category]);

  const reset = useCallback(() => {
    setState(new Array(total).fill(false));
    const s = read();
    if (s[countryId]) {
      for (let i = 0; i < total; i++) delete s[countryId][`${category}:${i}`];
      write(s);
    }
  }, [countryId, category, total]);

  const completed = state.filter(Boolean).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  return { state, toggle, reset, completed, total, percent };
}
