import { useState } from "react";
import { ChevronRight, TrendingUp, Clock, Star, ImageOff, RefreshCw } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Country } from "@/data/countries";

interface CountryCardProps {
  country: Country;
  onSelect: (c: Country) => void;
}

export function CountryCard({ country, onSelect }: CountryCardProps) {
  const { t, tx, lang } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [imgKey, setImgKey] = useState(0);

  const retry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgError(false);
    setImgKey((k) => k + 1);
  };

  return (
    <button
      id={`country-${country.slug}`}
      onClick={() => onSelect(country)}
      className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl bg-white p-3 text-left shadow-card ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* Thumbnail */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-card-fallback text-white">
            <ImageOff className="h-4 w-4 opacity-80" />
            <button onClick={retry} className="rounded-full bg-white/20 p-1 text-white" aria-label={t("retry")}>
              <RefreshCw className="h-2.5 w-2.5" />
            </button>
          </div>
        ) : (
          <img
            key={imgKey}
            src={country.image}
            alt={tx(country.name)}
            loading="lazy"
            onError={() => setImgError(true)}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 grid place-items-center bg-gradient-to-t from-black/55 to-transparent pb-0.5">
          <span className="text-base leading-none drop-shadow">{country.flag}</span>
        </div>
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <div className={`truncate text-[14.5px] font-bold text-primary ${lang === "bn" ? "font-bn" : ""}`}>
            {tx(country.name)}
          </div>
          {country.popular && (
            <Star className="h-3 w-3 shrink-0 fill-amber text-amber" />
          )}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className={`rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider ${
            country.schengen ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"
          }`}>
            {country.schengen ? t("schengen") : t("nonSchengen")}
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-3 text-[10.5px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-emerald" />
            <b className="text-emerald">{country.approvalRate}%</b>
          </span>
          <span className="inline-flex items-center gap-1 truncate">
            <Clock className="h-3 w-3" />
            <span className={`truncate ${lang === "bn" ? "font-bn" : ""}`}>{tx(country.processing)}</span>
          </span>
        </div>
      </div>

      {/* Chevron */}
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground transition group-hover:bg-[#0D3B66] group-hover:text-white">
        <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
      </div>
    </button>
  );
}
