import { Search, Bell, Menu, Shield, Plane, Briefcase, MapPin, Building2, IdCard, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { COUNTRIES } from "@/data/countries";
import type { ComponentType, SVGProps } from "react";

interface HeroProps {
  query: string;
  setQuery: (q: string) => void;
  onCta: () => void;
}

/* ---------- Animated SVG graphics for each visa category ---------- */
function WorkArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 80" fill="none" {...props}>
      <defs>
        <linearGradient id="wA" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset="1" stopColor="#fff" stopOpacity=".55" />
        </linearGradient>
      </defs>
      {/* briefcase */}
      <rect x="22" y="30" width="76" height="40" rx="6" fill="url(#wA)" />
      <rect x="48" y="22" width="24" height="10" rx="3" fill="#fff" opacity=".9" />
      <rect x="22" y="44" width="76" height="4" fill="#0D3B66" opacity=".25" />
      {/* floating coins */}
      <circle cx="30" cy="18" r="4" fill="#FBBF24" opacity=".9">
        <animate attributeName="cy" values="18;14;18" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="92" cy="14" r="3" fill="#FBBF24" opacity=".85">
        <animate attributeName="cy" values="14;10;14" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="105" cy="26" r="2.5" fill="#fff" opacity=".7">
        <animate attributeName="cy" values="26;22;26" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
function VisitArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 80" fill="none" {...props}>
      {/* globe */}
      <circle cx="60" cy="44" r="26" fill="#fff" opacity=".9" />
      <ellipse cx="60" cy="44" rx="26" ry="10" fill="none" stroke="#0D3B66" strokeOpacity=".35" strokeWidth="1.4" />
      <path d="M34 44h52M60 18v52" stroke="#0D3B66" strokeOpacity=".35" strokeWidth="1.4" />
      <path d="M48 22c-6 12-6 32 0 44M72 22c6 12 6 32 0 44" stroke="#0D3B66" strokeOpacity=".35" strokeWidth="1.4" fill="none" />
      {/* plane orbit */}
      <g style={{ transformOrigin: "60px 44px", animation: "spin 9s linear infinite" }}>
        <path d="M60 12l4 6-4 2-4-2z" fill="#FBBF24" />
      </g>
      {/* pin */}
      <circle cx="78" cy="32" r="3" fill="#e85d3a">
        <animate attributeName="r" values="3;4;3" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
function BusinessArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 80" fill="none" {...props}>
      {/* skyline */}
      <rect x="20" y="36" width="14" height="34" rx="2" fill="#fff" opacity=".9" />
      <rect x="38" y="24" width="16" height="46" rx="2" fill="#fff" opacity=".95" />
      <rect x="58" y="32" width="18" height="38" rx="2" fill="#fff" opacity=".88" />
      <rect x="80" y="20" width="14" height="50" rx="2" fill="#fff" opacity=".95" />
      {[40, 44, 48, 52, 56, 60].map((y, i) => (
        <rect key={i} x="41" y={y} width="3" height="3" fill="#0D3B66" opacity=".5" />
      ))}
      {/* chart arrow */}
      <path d="M22 18 L46 30 L70 22 L98 10" stroke="#FBBF24" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="3s" repeatCount="indefinite" />
      </path>
      <circle cx="98" cy="10" r="3" fill="#FBBF24" />
    </svg>
  );
}
function TrcArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 80" fill="none" {...props}>
      {/* card */}
      <rect x="18" y="20" width="84" height="48" rx="6" fill="#fff" opacity=".95" />
      <circle cx="34" cy="40" r="8" fill="#a78bfa" opacity=".8" />
      <rect x="48" y="34" width="40" height="4" rx="2" fill="#0D3B66" opacity=".5" />
      <rect x="48" y="42" width="28" height="3" rx="1.5" fill="#0D3B66" opacity=".35" />
      <rect x="26" y="56" width="68" height="3" rx="1.5" fill="#0D3B66" opacity=".3" />
      {/* sheen */}
      <rect x="18" y="20" width="84" height="48" rx="6" fill="url(#sheenT)" opacity=".5" />
      <defs>
        <linearGradient id="sheenT" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
          <animate attributeName="x1" values="-1;1" dur="3s" repeatCount="indefinite" />
          <animate attributeName="x2" values="0;2" dur="3s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      {/* check */}
      <circle cx="96" cy="24" r="8" fill="#10B981" />
      <path d="M92 24l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const services: Array<{
  id: string; icon: ComponentType<SVGProps<SVGSVGElement>>; art: ComponentType<SVGProps<SVGSVGElement>>;
  key: string; tone: string; shadow: string;
}> = [
  { id: "work", icon: Briefcase, art: WorkArt, key: "workVisa", tone: "from-[#0F766E] via-[#14B8A6] to-[#5cbdb9]", shadow: "shadow-[0_18px_40px_-18px_rgba(15,118,110,0.65)]" },
  { id: "visit", icon: MapPin, art: VisitArt, key: "visitVisa", tone: "from-[#0D3B66] via-[#1e5a8a] to-[#3b6fa0]", shadow: "shadow-[0_18px_40px_-18px_rgba(13,59,102,0.7)]" },
  { id: "business", icon: Building2, art: BusinessArt, key: "businessVisa", tone: "from-[#9b4423] via-[#d4842a] to-[#e8b84a]", shadow: "shadow-[0_18px_40px_-18px_rgba(212,132,42,0.6)]" },
  { id: "trc", icon: IdCard, art: TrcArt, key: "trcCard", tone: "from-[#4f46e5] via-[#6366f1] to-[#a78bfa]", shadow: "shadow-[0_18px_40px_-18px_rgba(79,70,229,0.6)]" },
];


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
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={onCta}
              style={{ animation: `fade-up 500ms ${i * 80}ms cubic-bezier(0.22,1,0.36,1) both` }}
              className={`group relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br ${s.tone} p-4 text-left text-white ring-1 ring-white/20 ${s.shadow} transition-all duration-300 hover:-translate-y-1 hover:shadow-lift`}
            >
              {/* Highlight + ambient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10" />
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-2xl transition group-hover:scale-150" />
              <div className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-black/10 blur-2xl" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur-md ring-1 ring-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                  <s.icon className="h-5 w-5" strokeWidth={2.4} />
                </div>
                <div>
                  <div className={`text-[14px] font-bold leading-tight drop-shadow ${lang === "bn" ? "font-bn" : ""}`}>
                    {t(s.key as any)}
                  </div>
                  <div className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-white/80">
                    {COUNTRIES.length} {lang === "bn" ? "দেশ" : "countries"}
                  </div>
                </div>
              </div>
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
