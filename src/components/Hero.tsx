import { Search, ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

interface HeroProps {
  query: string;
  setQuery: (q: string) => void;
  onCta: () => void;
}

export function Hero({ query, setQuery, onCta }: HeroProps) {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroImg} alt="" className="h-full w-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
      </div>

      <div className="container relative pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="max-w-3xl text-primary-foreground animate-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-teal" />
            {t("heroEyebrow")}
          </div>
          <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            {t("heroSub")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-lift">
              <Search className="ml-3 h-5 w-5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:w-72"
                aria-label={t("searchPlaceholder")}
              />
              <Button size="sm" onClick={onCta} className="rounded-xl bg-teal-gradient text-white hover:opacity-95">
                {t("getStarted")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
