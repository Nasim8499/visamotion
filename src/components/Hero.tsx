import { Search, Bell, Menu, Shield, Plane, Briefcase, MapPin, Building2, IdCard, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { COUNTRIES } from "@/data/countries";

interface HeroProps {
  query: string;
  setQuery: (q: string) => void;
  onCta: () => void;
}

const services = [
  { id: "work", icon: Briefcase, key: "workVisa", tone: "from-[#0F766E] to-[#14B8A6]" },
  { id: "visit", icon: MapPin, key: "visitVisa", tone: "from-[#0D3B66] to-[#1e5a8a]" },
  { id: "business", icon: Building2, key: "businessVisa", tone: "from-[#9b4423] to-[#d4842a]" },
  { id: "trc", icon: IdCard, key: "trcCard", tone: "from-[#4f46e5] to-[#818cf8]" },
] as const;

export function Hero({ query, setQuery, onCta }: HeroProps) {
  const { t, lang } = useLanguage();

  return (
    <section className="relative no-print">
      {/* Blue app header */}
      <div className="relative overflow-hidden bg-[#0D3B66] pb-28 pt-5 text-white md:pb-32 md:pt-8">
        <div className="absolute inset-0 -z-0 opacity-50">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#14B8A6]/30 blur-3xl" />
          <div className="absolute -right-10 top-10 h-72 w-72 rounded-full bg-[#1e5a8a]/40 blur-3xl" />
        </div>

        <div className="container relative">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <button className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 backdrop-blur-md transition hover:bg-white/20" aria-label="menu">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
              <span className={`text-[15px] ${lang === "bn" ? "font-bn" : ""}`}>{t("appName")}</span>
              <span className="text-lg leading-none">🇧🇩</span>
            </div>
            <button className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/10 backdrop-blur-md transition hover:bg-white/20" aria-label="alerts">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#e85d3a] ring-2 ring-[#0D3B66]" />
            </button>
          </div>

          {/* Brand identity row */}
          <div className="mt-6 flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/20">
              <Plane className="h-6 w-6 -rotate-45" strokeWidth={2.4} />
            </div>
            <div className="min-w-0">
              <div className="text-[15px] font-bold leading-tight">Visa Motion</div>
              <div className={`truncate text-[11.5px] text-white/75 leading-tight ${lang === "bn" ? "font-bn" : ""}`}>
                {t("tagline")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping profile / search card */}
      <div className="container -mt-24 relative z-10 md:-mt-28">
        <div className="rounded-3xl bg-white p-5 shadow-lift ring-1 ring-black/5">
          <div className="flex items-start gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white shadow-soft">
              <Shield className="h-5 w-5" strokeWidth={2.4} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-bold text-primary">{t("heroEyebrow")}</div>
              <div className={`text-[12px] leading-snug text-muted-foreground ${lang === "bn" ? "font-bn" : ""}`}>
                {t("disclaimerShort")}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-secondary/70 px-3 ring-1 ring-border focus-within:ring-2 focus-within:ring-accent">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className={`w-full bg-transparent py-3 text-sm placeholder:text-muted-foreground focus:outline-none ${lang === "bn" ? "font-bn" : ""}`}
              aria-label={t("searchPlaceholder")}
            />
            <button
              onClick={onCta}
              className="rounded-xl bg-[#0D3B66] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0D3B66]/90"
            >
              {t("getStarted")}
            </button>
          </div>

          {/* Mini stats row */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <MiniStat value={`${COUNTRIES.length}+`} label={t("statCountries")} />
            <MiniStat value="4" label={t("statCategories")} />
            <MiniStat value="BN·EN" label={t("statBilingual")} />
          </div>
        </div>
      </div>

      {/* Service tiles — like the reference grid */}
      <div className="container mt-6">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className={`text-[15px] font-bold text-primary ${lang === "bn" ? "font-bn" : ""}`}>
            {t("categories")}
          </h2>
          <button onClick={onCta} className="flex items-center gap-1 text-xs font-semibold text-accent">
            {t("countries")} <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={onCta}
              className="group relative overflow-hidden rounded-2xl bg-white p-4 text-left shadow-card ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className={`mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.tone} text-white shadow-soft`}>
                <s.icon className="h-5 w-5" strokeWidth={2.3} />
              </div>
              <div className={`text-[13.5px] font-bold leading-tight text-primary ${lang === "bn" ? "font-bn" : ""}`}>
                {t(s.key as any)}
              </div>
              <div className="mt-1 text-[10.5px] uppercase tracking-wider text-muted-foreground">
                {COUNTRIES.length} {lang === "bn" ? "দেশ" : "countries"}
              </div>
              <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-black/0 to-black/[0.03] transition group-hover:scale-125" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-2.5 text-center">
      <div className="text-sm font-bold leading-tight text-primary">{value}</div>
      <div className="mt-0.5 line-clamp-1 text-[10px] leading-tight text-muted-foreground">{label}</div>
    </div>
  );
}
