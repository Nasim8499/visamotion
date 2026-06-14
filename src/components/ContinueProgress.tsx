import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Trash2, BookmarkCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { COUNTRIES, getCountryBySlug } from "@/data/countries";
import { getAllProgress } from "@/lib/checklist-store";

const categoryLabelKey = {
  work: "workVisa", visit: "visitVisa", business: "businessVisa", trc: "trcCard",
} as const;

export function ContinueProgress() {
  const navigate = useNavigate();
  const { t, tx, lang } = useLanguage();

  const entries = useMemo(() => {
    return getAllProgress((countryId, cat) => {
      const c = COUNTRIES.find((x) => x.id === countryId);
      if (!c) return 0;
      return c[cat].length;
    }).slice(0, 6);
  }, []);

  if (entries.length === 0) return null;

  return (
    <section
      aria-labelledby="continue-heading"
      className="container mt-6"
    >
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-accent">
            <BookmarkCheck className="h-3 w-3" /> {t("continueSub")}
          </div>
          <h2 id="continue-heading" className={`text-[15px] font-bold text-primary ${lang === "bn" ? "font-bn" : ""}`}>
            {t("continueTitle")}
          </h2>
        </div>
      </div>

      <div
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
      >
        {entries.map((e) => {
          const country = getCountryBySlug(e.countryId.replace(/_/g, "-")) ?? COUNTRIES.find((c) => c.id === e.countryId);
          if (!country) return null;
          const catLabel = t(categoryLabelKey[e.category] as any);
          return (
            <button
              key={`${e.countryId}-${e.category}`}
              role="listitem"
              onClick={() => navigate(`/country/${country.slug}/${e.category}`)}
              aria-label={`${tx(country.name)} — ${catLabel}, ${e.percent}% complete. Resume.`}
              className="group relative w-[230px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white p-4 text-left shadow-card ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl leading-none">{country.flag}</span>
                <div className="min-w-0">
                  <div className={`truncate text-[13.5px] font-bold text-primary ${lang === "bn" ? "font-bn" : ""}`}>
                    {tx(country.name)}
                  </div>
                  <div className={`truncate text-[10.5px] text-muted-foreground ${lang === "bn" ? "font-bn" : ""}`}>{catLabel}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[10.5px] font-semibold text-muted-foreground">
                  <span>{e.completed} / {e.total}</span>
                  <span className="text-primary">{e.percent}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6] transition-all" style={{ width: `${e.percent}%` }} />
                </div>
              </div>

              <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-accent">
                {t("resume")} <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
