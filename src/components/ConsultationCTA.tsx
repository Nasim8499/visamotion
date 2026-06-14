import { CalendarCheck2, MessageCircle, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function ConsultationCTA() {
  const { t } = useLanguage();
  return (
    <section id="consult" className="container py-16 no-print">
      <div className="relative overflow-hidden rounded-3xl bg-hero p-8 shadow-lift md:p-12">
        {/* decorative */}
        <svg className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-20" viewBox="0 0 200 200" aria-hidden>
          <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        </svg>

        <div className="relative max-w-2xl text-white">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            Visa Motion · Consultancy
          </span>
          <h3 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">{t("ctaTitle")}</h3>
          <p className="mt-3 text-white/85">{t("ctaSub")}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-xl bg-white text-primary shadow-soft hover:bg-white/95">
              <CalendarCheck2 className="mr-2 h-4 w-4" /> {t("bookConsult")}
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
              <MessageCircle className="mr-2 h-4 w-4" /> {t("whatsapp")}
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
              <Mail className="mr-2 h-4 w-4" /> {t("emailChecklist")}
            </Button>
          </div>

          <p className="mt-5 text-xs text-white/65">{t("ctaNote")}</p>
        </div>
      </div>
    </section>
  );
}
