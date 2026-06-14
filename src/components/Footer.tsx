import { useLanguage } from "@/lib/i18n";
import { Plane } from "lucide-react";
import { COUNTRIES } from "@/data/countries";

export function Footer() {
  const { t, tx } = useLanguage();
  return (
    <footer className="mt-24 bg-primary text-primary-foreground no-print">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal-gradient">
                <Plane className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
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
              <li><a href="#consult" className="text-primary-foreground/80 transition-smooth hover:text-teal">{t("contact")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">{t("countries")}</h4>
            <ul className="space-y-2 text-sm">
              {COUNTRIES.slice(0, 7).map((c) => (
                <li key={c.id}>
                  <a href={`#country-${c.slug}`} className="text-primary-foreground/80 transition-smooth hover:text-teal">
                    {c.flag} {tx(c.name)}
                  </a>
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
