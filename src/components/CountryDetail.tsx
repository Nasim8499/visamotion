import { useState, useMemo } from "react";
import { ArrowLeft, Check, Copy, Printer, Download, Share2, TrendingUp, Clock, IdCard, AlertCircle, Languages, Shield, CalendarCheck2, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Country, BiText } from "@/data/countries";
import { useChecklistStore } from "@/lib/checklist-store";
import { Button } from "@/components/ui/button";
import { OfficialLinks } from "./OfficialLinks";
import { ProcessingTimeline } from "./ProcessingTimeline";
import { toast } from "sonner";

type Category = "work" | "visit" | "business" | "trc";

interface Props {
  country: Country;
  onBack: () => void;
}

export function CountryDetail({ country, onBack }: Props) {
  const { t, tx, lang } = useLanguage();
  const [category, setCategory] = useState<Category>("work");
  const [imgError, setImgError] = useState(false);

  const tabs: { id: Category; label: string }[] = [
    { id: "work", label: t("workVisa") },
    { id: "visit", label: t("visitVisa") },
    { id: "business", label: t("businessVisa") },
    { id: "trc", label: t("trcCard") },
  ];

  const items: BiText[] = useMemo(() => country[category], [country, category]);
  const { state, toggle, completed, total, percent } = useChecklistStore(country.id, category, items.length);

  const handleCopy = async () => {
    const header = `${tx(country.name)} — ${tabs.find(x=>x.id===category)?.label}\n${"=".repeat(40)}\n\n`;
    const body = items.map((it, i) => `${i + 1}. ${state[i] ? "[x]" : "[ ]"} ${tx(it)}`).join("\n");
    try {
      await navigator.clipboard.writeText(header + body);
      toast.success(t("copied"));
    } catch {
      toast.error("Copy failed");
    }
  };

  const handlePrint = () => window.print();

  const handleShare = async () => {
    const url = window.location.href;
    const text = `${tx(country.name)} — Visa Motion`;
    if (navigator.share) {
      try { await navigator.share({ title: text, url }); } catch {}
    } else {
      navigator.clipboard.writeText(url);
      toast.success(t("copied"));
    }
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {imgError ? (
            <div className="absolute inset-0 bg-card-fallback" />
          ) : (
            <img src={country.image} alt={tx(country.name)} onError={() => setImgError(true)} className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>

        <div className="container relative pb-16 pt-8 text-primary-foreground md:pb-24 md:pt-12">
          <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-smooth hover:bg-white/25 no-print">
            <ArrowLeft className="h-4 w-4" /> {t("back")}
          </button>

          <div className="flex items-start gap-4">
            <div className="text-6xl leading-none drop-shadow-lg md:text-7xl">{country.flag}</div>
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary">{tx(country.regionType)}</span>
                {country.popular && (
                  <span className="flex items-center gap-1 rounded-full bg-amber px-3 py-1 text-xs font-semibold text-white">
                    <Star className="h-3 w-3 fill-current" /> {t("popular")}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{tx(country.name)}</h1>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 max-w-3xl">
            <Stat icon={TrendingUp} label={t("approvalRate")} value={`${country.approvalRate}%`} />
            <Stat icon={Clock} label={t("processingTime")} value={tx(country.processing)} />
            <Stat icon={IdCard} label={t("trcDuration")} value={tx(country.trcDuration)} />
          </div>
        </div>
      </section>

      <div className="container -mt-8 grid gap-8 pb-16 lg:grid-cols-3 print-container">
        {/* Main column */}
        <div className="space-y-8 lg:col-span-2">
          {/* Tabs + checklist card */}
          <div className="rounded-3xl border border-border bg-card shadow-card print-card">
            <div className="flex flex-wrap gap-1 border-b border-border p-2 no-print">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCategory(tab.id)}
                  className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-smooth min-w-[120px] ${
                    category === tab.id
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:bg-secondary hover:text-primary"
                  }`}
                >{tab.label}</button>
              ))}
            </div>

            <div className="p-6 md:p-8">
              {/* Progress */}
              <div className="mb-6 rounded-2xl bg-secondary/50 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-primary">
                    {tabs.find(x=>x.id===category)?.label} — {t("progress")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">{completed}</span> / {total} · {percent}%
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-teal-gradient transition-smooth"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground md:grid-cols-3">
                  <span>{t("documentsTotal")}: <b className="text-primary">{total}</b></span>
                  <span>{t("documentsDone")}: <b className="text-emerald">{completed}</b></span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mb-6 flex flex-wrap gap-2 no-print">
                <Button size="sm" variant="outline" onClick={handleCopy} className="rounded-xl"><Copy className="mr-1.5 h-3.5 w-3.5" /> {t("copyChecklist")}</Button>
                <Button size="sm" variant="outline" onClick={handlePrint} className="rounded-xl"><Printer className="mr-1.5 h-3.5 w-3.5" /> {t("print")}</Button>
                <Button size="sm" variant="outline" onClick={handlePrint} className="rounded-xl"><Download className="mr-1.5 h-3.5 w-3.5" /> {t("downloadPdf")}</Button>
                <Button size="sm" variant="outline" onClick={handleShare} className="rounded-xl"><Share2 className="mr-1.5 h-3.5 w-3.5" /> {t("share")}</Button>
              </div>

              {/* Checklist items */}
              <ul className="space-y-2.5">
                {items.map((item, i) => (
                  <li key={i}>
                    <button
                      onClick={() => toggle(i)}
                      className={`group flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-smooth ${
                        state[i]
                          ? "border-emerald/30 bg-emerald/5"
                          : "border-border bg-card hover:border-accent/30 hover:bg-secondary/40"
                      }`}
                    >
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold transition-smooth ${
                        state[i] ? "bg-emerald text-white" : "bg-secondary text-primary"
                      }`}>
                        {state[i] ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                      </span>
                      <span className={`flex-1 text-sm leading-relaxed ${state[i] ? "text-muted-foreground line-through" : "text-foreground"} ${lang === "bn" ? "font-bn" : ""}`}>
                        {tx(item)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <ProcessingTimeline />

          {/* Important notes */}
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard icon={AlertCircle} title={t("importantNotes")} tone="amber">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {country.notes.map((n, i) => (
                  <li key={i} className={`flex gap-2 ${lang === "bn" ? "font-bn" : ""}`}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    {tx(n)}
                  </li>
                ))}
              </ul>
            </InfoCard>
            <InfoCard icon={Languages} title={t("translationReq")} tone="teal">
              <p className={`text-sm leading-relaxed text-muted-foreground ${lang === "bn" ? "font-bn" : ""}`}>{t("translationDesc")}</p>
            </InfoCard>
            <InfoCard icon={Shield} title={t("insuranceReq")} tone="emerald">
              <p className={`text-sm leading-relaxed text-muted-foreground ${lang === "bn" ? "font-bn" : ""}`}>{t("insuranceDesc")}</p>
            </InfoCard>
            <InfoCard icon={CalendarCheck2} title={t("appointmentReq")} tone="primary">
              <p className={`text-sm leading-relaxed text-muted-foreground ${lang === "bn" ? "font-bn" : ""}`}>{t("appointmentDesc")}</p>
            </InfoCard>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <OfficialLinks country={country} />
        </aside>
      </div>

      <ConsultationCTAInline />
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-1 text-base font-bold text-white">{value}</div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, tone, children }: { icon: any; title: string; tone: "amber"|"teal"|"emerald"|"primary"; children: React.ReactNode }) {
  const toneClass = {
    amber: "bg-amber/10 text-amber",
    teal: "bg-teal/10 text-teal",
    emerald: "bg-emerald/10 text-emerald",
    primary: "bg-primary/10 text-primary",
  }[tone];
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="mb-3 flex items-center gap-3">
        <div className={`grid h-9 w-9 place-items-center rounded-xl ${toneClass}`}>
          <Icon className="h-[1.125rem] w-[1.125rem]" />
        </div>
        <h4 className="text-base font-bold text-primary">{title}</h4>
      </div>
      {children}
    </div>
  );
}

// Inline consultation re-used inside detail
import { ConsultationCTA } from "./ConsultationCTA";
function ConsultationCTAInline() { return <ConsultationCTA />; }
