import { useLanguage } from "@/lib/i18n";
import { FileSearch, FileCheck2, Fingerprint, Stamp, Plane } from "lucide-react";

export function ProcessingTimeline() {
  const { t, lang } = useLanguage();
  const steps = lang === "bn"
    ? [
        { icon: FileSearch, t: "ডকুমেন্ট প্রস্তুতি", d: "১–২ সপ্তাহ" },
        { icon: FileCheck2, t: "আবেদন জমা", d: "১ দিন" },
        { icon: Fingerprint, t: "বায়োমেট্রিক্স", d: "VAC-এ ১ দিন" },
        { icon: Stamp, t: "এম্বাসি প্রসেসিং", d: "১৫–৩০ দিন" },
        { icon: Plane, t: "ভিসা সংগ্রহ ও ভ্রমণ", d: "ইস্যুর পর" },
      ]
    : [
        { icon: FileSearch, t: "Document preparation", d: "1–2 weeks" },
        { icon: FileCheck2, t: "Application submission", d: "1 day" },
        { icon: Fingerprint, t: "Biometrics at VAC", d: "1 day" },
        { icon: Stamp, t: "Embassy processing", d: "15–30 days" },
        { icon: Plane, t: "Collect visa & travel", d: "After issue" },
      ];

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
      <h3 className="mb-6 text-xl font-bold text-primary md:text-2xl">{t("timeline")}</h3>

      <div className="relative">
        <div className="absolute left-5 top-5 bottom-5 w-px bg-border md:left-0 md:right-0 md:top-1/2 md:h-px md:w-auto" />
        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <div key={i} className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
              <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-gradient text-white shadow-soft">
                <s.icon className="h-[1.125rem] w-[1.125rem]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-primary">{s.t}</div>
                <div className="text-xs text-muted-foreground">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
