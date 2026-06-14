import { ExternalLink, Building2, FileText, CalendarCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Country } from "@/data/countries";

export function OfficialLinks({ country }: { country: Country }) {
  const { t } = useLanguage();
  const items = [
    { key: "embassy", label: t("embassyWebsite"), icon: Building2, url: country.links.embassy, color: "from-primary to-primary/80" },
    { key: "officialVisa", label: t("officialVisaInfo"), icon: FileText, url: country.links.officialVisa, color: "from-accent to-teal" },
    { key: "appointment", label: t("appointmentPortal"), icon: CalendarCheck, url: country.links.appointment, color: "from-teal to-emerald" },
  ];

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8 no-print">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-primary md:text-2xl">{t("officialLinks")}</h3>
        <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">{t("officialSource")}</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((it) => {
          const disabled = !it.url;
          const Tag: any = disabled ? "div" : "a";
          return (
            <Tag
              key={it.key}
              {...(!disabled && { href: it.url, target: "_blank", rel: "noopener noreferrer" })}
              className={`group flex items-center justify-between rounded-2xl border border-border p-4 transition-smooth ${
                disabled ? "opacity-50" : "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${it.color} text-white shadow-soft`}>
                  <it.icon className="h-[1.125rem] w-[1.125rem]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary">{it.label}</div>
                  <div className="text-xs text-muted-foreground">{disabled ? "—" : new URL(it.url).hostname}</div>
                </div>
              </div>
              {!disabled && <ExternalLink className="h-4 w-4 text-muted-foreground transition-smooth group-hover:text-accent" />}
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
