import { useLanguage } from "@/lib/i18n";
import { Plane, ArrowRight } from "lucide-react";
import { COUNTRIES } from "@/data/countries";
import { Link } from "react-router-dom";

export function Footer() {
  const { t, tx, lang } = useLanguage();
  // duplicate for seamless marquee
  const strip = [...COUNTRIES, ...COUNTRIES];

  return (
    <footer className="mt-20 bg-primary text-primary-foreground no-print">
      {/* Animated country card strip */}
      <div className="border-b border-primary-foreground/10 bg-gradient-to-b from-primary to-[#0a2d4f] py-8">
        <div className="container mb-5 flex items-end justify-between">
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-teal-300/80">
              {t("featured")}
            </div>
            <h3 className={`mt-1 text-xl font-bold ${lang === "bn" ? "font-bn" : ""}`}>
              {t("exploreCountries")}
            </h3>
          </div>
          <Link to="/" className="hidden items-center gap-1 text-xs font-semibold text-teal-200 hover:text-white sm:inline-flex">
            {t("countries")} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-3 animate-[scroll-x_38s_linear_infinite] group-hover:[animation-play-state:paused]">
            {strip.map((c, i) => (
              <Link
                key={`${c.id}-${i}`}
                to={`/country/${c.slug}/work`}
                className="group/card relative flex w-[200px] shrink-0 items-center gap-3 overflow-hidden rounded-2xl bg-white/8 p-3.5 ring-1 ring-white/15 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:ring-teal-300/40"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-teal-400/20 blur-2xl transition group-hover/card:scale-150" />
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-2xl ring-1 ring-white/20">
                  {c.flag}
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`truncate text-[13px] font-bold ${lang === "bn" ? "font-bn" : ""}`}>
                    {tx(c.name)}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
                    {c.approvalRate}% • {tx(c.regionType)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal-gradient">
                <Plane className="h-[1.125rem] w-[1.125rem] text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold">Visa Motion</span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              {t("tagline")}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">{t("quickLinks")}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#countries" className="text-primary-foreground/80 transition-smooth hover:text-teal">{t("countries")}</a></li>
              <li><a href="#categories" className="text-primary-foreground/80 transition-smooth hover:text-teal">{t("categories")}</a></li>
              <li><Link to="/contact" className="text-primary-foreground/80 transition-smooth hover:text-teal">{t("contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">{t("countries")}</h4>
            <ul className="space-y-2 text-sm">
              {COUNTRIES.slice(0, 7).map((c) => (
                <li key={c.id}>
                  <Link to={`/country/${c.slug}/work`} className="text-primary-foreground/80 transition-smooth hover:text-teal">
                    {c.flag} {tx(c.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">{t("disclaimer")}</h4>
            <p className="text-xs leading-relaxed text-primary-foreground/70">
              {t("disclaimerText")}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 md:flex-row md:items-center">
          <span>{t("copyright")}</span>
          <span>{t("disclaimerShort")}</span>
        </div>
      </div>
    </footer>
  );
}
