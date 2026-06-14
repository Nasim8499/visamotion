import { useState } from "react";
import { ArrowRight, TrendingUp, Clock, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Country } from "@/data/countries";

interface CountryCardProps {
  country: Country;
  onSelect: (c: Country) => void;
}

export function CountryCard({ country, onSelect }: CountryCardProps) {
  const { t, tx } = useLanguage();
  const [imgError, setImgError] = useState(false);

  return (
    <button
      id={`country-${country.slug}`}
      onClick={() => onSelect(country)}
      className="group block overflow-hidden rounded-3xl border border-border bg-card text-left shadow-card transition-smooth hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
    >
      <div className="relative h-48 overflow-hidden">
        {imgError ? (
          <div className="absolute inset-0 bg-card-fallback" />
        ) : (
          <img
            src={country.image}
            alt={tx(country.name)}
            loading="lazy"
            onError={() => setImgError(true)}
            className="absolute inset-0 h-full w-full object-cover transition-smooth duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary shadow-soft backdrop-blur">
            {country.schengen ? t("schengen") : t("nonSchengen")}
          </span>
          {country.popular && (
            <span className="flex items-center gap-1 rounded-full bg-amber px-3 py-1 text-xs font-semibold text-white shadow-soft">
              <Star className="h-3 w-3 fill-current" /> {t("popular")}
            </span>
          )}
        </div>

        {/* Country header overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <div className="text-3xl leading-none">{country.flag}</div>
            <div className="mt-1 text-xl font-bold">{tx(country.name)}</div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-secondary/70 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5" /> {t("approvalRate")}
            </div>
            <div className="mt-1 text-lg font-bold text-emerald">{country.approvalRate}%</div>
          </div>
          <div className="rounded-xl bg-secondary/70 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {t("processingTime")}
            </div>
            <div className="mt-1 text-xs font-semibold text-primary">{tx(country.processing)}</div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold text-accent transition-smooth group-hover:gap-2">
          {t("viewChecklist")}
          <ArrowRight className="h-4 w-4 transition-smooth group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}
