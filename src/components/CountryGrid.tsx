import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { COUNTRIES, type Country } from "@/data/countries";
import { CountryCard } from "./CountryCard";
import { SearchX, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Filter = "all" | "schengen" | "non" | "popular";

interface Props {
  query: string;
  setQuery: (q: string) => void;
  onSelect: (c: Country) => void;
}

export function CountryGrid({ query, setQuery, onSelect }: Props) {
  const { t, tx } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t("filterAll") },
    { id: "schengen", label: t("filterSchengen") },
    { id: "non", label: t("filterNonSchengen") },
    { id: "popular", label: t("filterPopular") },
  ];

  const visible = useMemo(() => {
    return COUNTRIES.filter((c) => {
      if (filter === "schengen" && !c.schengen) return false;
      if (filter === "non" && c.schengen) return false;
      if (filter === "popular" && !c.popular) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!tx(c.name).toLowerCase().includes(q) && !c.name.en.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [filter, query, tx]);

  const popularSuggestions = useMemo(() => COUNTRIES.filter((c) => c.popular).slice(0, 4), []);
  const hasActiveFilter = query.trim().length > 0 || filter !== "all";

  return (
    <section id="countries" className="container py-8 md:py-12">
      <div className="mb-4 flex items-end justify-between px-1">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-primary md:text-2xl">{t("countries")}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">{COUNTRIES.length} destinations</p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="mb-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
              filter === f.id
                ? "bg-[#0D3B66] text-white shadow-soft"
                : "bg-white text-muted-foreground ring-1 ring-border hover:text-primary"
            }`}
          >{f.label}</button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center shadow-soft animate-fade-up">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-muted-foreground">
            <SearchX className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-primary">{t("emptyTitle")}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {query ? `${t("emptyForQuery")} "${query}".` : t("emptyForFilter")}
          </p>

          {hasActiveFilter && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {query && (
                <Button variant="outline" size="sm" onClick={() => setQuery("")} className="rounded-xl">
                  <X className="mr-1 h-3.5 w-3.5" /> {t("clearSearch")}
                </Button>
              )}
              {filter !== "all" && (
                <Button variant="outline" size="sm" onClick={() => setFilter("all")} className="rounded-xl">
                  {t("clearFilter")}
                </Button>
              )}
            </div>
          )}

          <div className="mt-6 border-t border-border pt-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("recommended")}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSuggestions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setQuery(""); setFilter("all"); onSelect(c); }}
                  className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary ring-1 ring-border transition hover:-translate-y-0.5 hover:ring-accent"
                >
                  <span className="text-base">{c.flag}</span> {tx(c.name)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <CountryCard key={c.id} country={c} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}
