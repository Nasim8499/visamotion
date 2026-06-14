import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { COUNTRIES, type Country } from "@/data/countries";
import { CountryCard } from "./CountryCard";
import { Search } from "lucide-react";

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

  return (
    <section id="countries" className="container py-16 md:py-20">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {t("countries")}
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">{t("heroSub")}</p>
        </div>

        {/* Search (mobile-friendly) */}
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 shadow-soft md:w-80">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-transparent py-3 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Filter pills */}
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
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          {t("searchPlaceholder")}
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
