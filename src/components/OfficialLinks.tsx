import { useEffect, useState } from "react";
import { ExternalLink, Building2, FileText, CalendarCheck, Pencil, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Country } from "@/data/countries";
import { getOverrides } from "@/lib/links-store";
import { Button } from "@/components/ui/button";
import { EditLinksDialog } from "./EditLinksDialog";

function safeHost(u: string) {
  try { return new URL(u).hostname; } catch { return ""; }
}

export function OfficialLinks({ country }: { country: Country }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.countryId === country.id) setVersion((v) => v + 1);
    };
    window.addEventListener("visamotion:links-updated", handler);
    return () => window.removeEventListener("visamotion:links-updated", handler);
  }, [country.id]);

  const overrides = getOverrides(country.id);
  void version;
  const merged = {
    embassy: country.links.embassy,
    officialVisa: overrides.officialVisa ?? country.links.officialVisa,
    appointment: overrides.appointment ?? country.links.appointment,
  };

  const items = [
    { key: "embassy", label: t("embassyWebsite"), icon: Building2, url: merged.embassy, color: "from-primary to-primary/80", editable: false },
    { key: "officialVisa", label: t("officialVisaInfo"), icon: FileText, url: merged.officialVisa, color: "from-accent to-teal", editable: true, overridden: !!overrides.officialVisa },
    { key: "appointment", label: t("appointmentPortal"), icon: CalendarCheck, url: merged.appointment, color: "from-teal to-emerald", editable: true, overridden: !!overrides.appointment },
  ];

  const hasMissing = !merged.officialVisa || !merged.appointment;

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8 no-print">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-primary md:text-2xl">{t("officialLinks")}</h3>
          <span className="rounded-full bg-emerald/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald">{t("officialSource")}</span>
        </div>
        <Button size="sm" variant="outline" onClick={() => setOpen(true)} className="rounded-xl">
          <Pencil className="mr-1.5 h-3.5 w-3.5" /> {t("editLinks")}
        </Button>
      </div>

      {hasMissing && (
        <div className="mb-4 flex gap-3 rounded-2xl border border-amber/30 bg-amber/5 p-3 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
          <div className="flex-1">
            <p className="font-semibold text-primary">{t("missingLinkTitle")}</p>
            <p className="text-xs text-muted-foreground">{t("missingLinkDesc")}</p>
          </div>
          <Button size="sm" variant="ghost" onClick={() => setOpen(true)} className="h-auto px-2 text-xs">{t("addNow")}</Button>
        </div>
      )}

      <div className="grid gap-3">
        {items.map((it) => {
          const disabled = !it.url;
          const Tag: any = disabled ? "div" : "a";
          return (
            <Tag
              key={it.key}
              {...(!disabled && { href: it.url, target: "_blank", rel: "noopener noreferrer" })}
              className={`group flex items-center justify-between rounded-2xl border border-border p-4 transition-smooth ${
                disabled ? "opacity-60" : "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${it.color} text-white shadow-soft`}>
                  <it.icon className="h-[1.125rem] w-[1.125rem]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    {it.label}
                    {it.overridden && <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">{t("customLink")}</span>}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{disabled ? t("notProvided") : safeHost(it.url) || it.url}</div>
                </div>
              </div>
              {!disabled ? (
                <ExternalLink className="ml-3 h-4 w-4 shrink-0 text-muted-foreground transition-smooth group-hover:text-accent" />
              ) : (
                it.editable && (
                  <button
                    onClick={(e) => { e.preventDefault(); setOpen(true); }}
                    className="ml-3 shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-accent hover:bg-accent hover:text-white transition-smooth"
                  >{t("addNow")}</button>
                )
              )}
            </Tag>
          );
        })}
      </div>

      <EditLinksDialog country={country} open={open} onOpenChange={setOpen} />
    </section>
  );
}
