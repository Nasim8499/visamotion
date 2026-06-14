import { useEffect, useState, useCallback } from "react";

const KEY = "visamotion.checklist.v1";

type Store = Record<string, Record<string, boolean>>; // countryId -> "category:index" -> done

function read(): Store {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}

export interface ProgressEntry {
  countryId: string;
  category: "work" | "visit" | "business" | "trc";
  completed: number;
  total: number;
  percent: number;
  lastUpdated?: number;
}

export function getAllProgress(totals: (id: string, cat: ProgressEntry["category"]) => number): ProgressEntry[] {
  const s = read();
  const out: ProgressEntry[] = [];
  for (const countryId of Object.keys(s)) {
    const entries = s[countryId];
    const seenCats = new Set<ProgressEntry["category"]>();
    for (const k of Object.keys(entries)) {
      const [cat] = k.split(":");
      if (["work","visit","business","trc"].includes(cat)) seenCats.add(cat as ProgressEntry["category"]);
    }
    for (const cat of seenCats) {
      const total = totals(countryId, cat);
      if (!total) continue;
      let completed = 0;
      for (let i = 0; i < total; i++) if (entries[`${cat}:${i}`]) completed++;
      if (completed === 0) continue;
      out.push({ countryId, category: cat, completed, total, percent: Math.round((completed/total)*100) });
    }
  }
  return out.sort((a,b) => b.percent - a.percent);
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
