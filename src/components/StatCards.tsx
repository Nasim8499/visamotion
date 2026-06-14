import { Globe2, FileStack, Link2, Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { COUNTRIES } from "@/data/countries";

export function StatCards() {
  const { t } = useLanguage();
  const stats = [
    { icon: Globe2, value: `${COUNTRIES.length}+`, label: t("statCountries"), color: "from-primary to-primary/70" },
    { icon: FileStack, value: "4", label: t("statCategories"), color: "from-accent to-teal" },
    { icon: Link2, value: `${COUNTRIES.length * 3}+`, label: t("statLinks"), color: "from-teal to-emerald" },
    { icon: Languages, value: "BN · EN", label: t("statBilingual"), color: "from-amber to-amber/70" },
  ];

  return (
    <section className="container -mt-10 relative z-10">
      <div className="grid gap-4 rounded-3xl border border-border bg-white p-4 shadow-lift sm:grid-cols-2 md:grid-cols-4 md:p-6">
        {stats.map((s, i) => (
          <div key={i} className="group rounded-2xl p-4 transition-smooth hover:bg-secondary/60">
            <div className={`mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-soft`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
