import { useEffect, useState } from "react";
import { FileText, Fingerprint, Search, Stamp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const ICONS = [FileText, Fingerprint, Search, Stamp];

export function AnimatedTimeline() {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);

  const steps = lang === "bn"
    ? ["আবেদন", "বায়োমেট্রিক্স", "পর্যালোচনা", "সিদ্ধান্ত"]
    : ["Application", "Biometrics", "Review", "Decision"];

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % (steps.length + 1)), 900);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className={`text-sm font-bold text-primary ${lang === "bn" ? "font-bn" : ""}`}>
          {lang === "bn" ? "প্রক্রিয়া টাইমলাইন" : "Process timeline"}
        </h3>
        <span className="rounded-full bg-teal/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal">
          Live
        </span>
      </div>

      <div className="relative">
        {/* base line */}
        <div className="absolute left-5 right-5 top-5 h-1 rounded-full bg-secondary" />
        {/* fill line */}
        <div
          className="absolute left-5 top-5 h-1 rounded-full bg-gradient-to-r from-teal to-emerald transition-all duration-700"
          style={{ width: `calc(${(active / (steps.length - 1)) * 100}% - 40px)` }}
        />

        <ol className="relative grid grid-cols-4 gap-1">
          {steps.map((label, i) => {
            const Icon = ICONS[i];
            const reached = i <= active;
            return (
              <li key={i} className="flex flex-col items-center">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-full ring-4 transition-all duration-500 ${
                    reached
                      ? "bg-gradient-to-br from-teal to-emerald text-white ring-teal/15 scale-105"
                      : "bg-secondary text-muted-foreground ring-border/30"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.4} />
                  {i === active && (
                    <span className="absolute h-10 w-10 animate-ping rounded-full bg-teal/30" />
                  )}
                </div>
                <div className={`mt-2 text-center text-[11px] font-semibold leading-tight ${
                  reached ? "text-primary" : "text-muted-foreground"
                } ${lang === "bn" ? "font-bn" : ""}`}>
                  {label}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
