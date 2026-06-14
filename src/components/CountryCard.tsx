import { useState } from "react";
import { ArrowRight, TrendingUp, Clock, Star, ImageOff, RefreshCw } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Country } from "@/data/countries";

interface CountryCardProps {
  country: Country;
  onSelect: (c: Country) => void;
}

export function CountryCard({ country, onSelect }: CountryCardProps) {
  const { t, tx } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [imgKey, setImgKey] = useState(0);

  const retry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgError(false);
    setImgKey((k) => k + 1);
  };

  return (
    <article
      id={`country-${country.slug}`}
      className="group block overflow-hidden rounded-3xl border border-border bg-card text-left shadow-card transition-smooth hover:-translate-y-1 hover:shadow-lift"
    >
      <button
        onClick={() => onSelect(country)}
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
      >
        <div className="relative h-48 overflow-hidden">
          {imgError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card-fallback text-white">
              <ImageOff className="h-7 w-7 opacity-80" />
              <p className="text-xs font-medium opacity-90">{t("imageUnavailable")}</p>
              <button
                onClick={retry}
                className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur transition-smooth hover:bg-white/30"
              >
                <RefreshCw className="h-3 w-3" /> {t("retry")}
              </button>
            </div>
          ) : (
            <img
              key={imgKey}
              src={country.image}
              alt={tx(country.name)}
              loading="lazy"
              onError={() => setImgError(true)}
              className="absolute inset-0 h-full w-full object-cover transition-smooth duration-700 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />

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

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <div className="text-3xl leading-none drop-shadow">{country.flag}</div>
              <div className="mt-1 text-xl font-bold drop-shadow">{tx(country.name)}</div>
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
    </article>
  );
}
