import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { COUNTRIES, type Country } from "@/data/countries";
import { CountryCard } from "./CountryCard";
import { Search, SearchX, X } from "lucide-react";
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
    <section id="countries" className="container py-16 md:py-20">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">{t("countries")}</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">{t("heroSub")}</p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 shadow-soft md:w-80">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-transparent py-3 text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="rounded-full p-1 text-muted-foreground hover:bg-secondary" aria-label={t("clearSearch")}>
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${
              filter === f.id
                ? "border-transparent bg-primary text-primary-foreground shadow-soft"
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary"
            }`}
          >{f.label}</button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center shadow-soft animate-fade-up">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-muted-foreground">
            <SearchX className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-primary">{t("emptyTitle")}</h3>
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

          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("recommended")}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSuggestions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setQuery(""); setFilter("all"); onSelect(c); }}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-primary shadow-soft transition-smooth hover:-translate-y-0.5 hover:border-accent hover:shadow-card"
                >
                  <span className="text-base">{c.flag}</span> {tx(c.name)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <CountryCard key={c.id} country={c} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}
