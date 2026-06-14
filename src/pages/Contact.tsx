import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarCheck2, MessageCircle, Mail, ShieldAlert, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { AppHeader } from "@/components/AppHeader";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export default function Contact() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const bn = lang === "bn" ? "font-bn" : "";

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader onHome={() => navigate("/")} />

      {/* Blue header */}
      <header className="relative overflow-hidden bg-[#0D3B66] pb-12 pt-5 text-white md:pb-16 md:pt-8">
        <div className="absolute -left-20 -top-20 -z-0 h-64 w-64 rounded-full bg-[#14B8A6]/30 blur-3xl" />
        <div className="absolute -right-10 top-10 -z-0 h-72 w-72 rounded-full bg-[#1e5a8a]/40 blur-3xl" />
        <div className="container relative">
          <button
            onClick={() => navigate("/")}
            aria-label={t("backHome")}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft className="h-4 w-4" /> {t("backHome")}
          </button>
          <h1 className={`mt-5 text-3xl font-bold leading-tight md:text-4xl ${bn}`}>{t("contactTitle")}</h1>
          <p className={`mt-2 max-w-xl text-sm text-white/85 md:text-base ${bn}`}>{t("contactSub")}</p>
        </div>
      </header>

      <main className="container -mt-6 pb-12">
        {/* Disclaimer card */}
        <div className="rounded-3xl bg-white p-5 shadow-lift ring-1 ring-border">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber/10 text-amber">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className={`text-sm font-bold text-primary ${bn}`}>{t("disclaimer")}</div>
              <p className={`mt-1 text-xs leading-relaxed text-muted-foreground ${bn}`}>{t("disclaimerText")}</p>
            </div>
          </div>
        </div>

        {/* Contact methods */}
        <section aria-labelledby="contact-ways" className="mt-6">
          <h2 id="contact-ways" className="sr-only">Contact methods</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <a
              href="https://wa.me/8801700000000"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white shadow-soft">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-bold text-primary ${bn}`}>{t("whatsapp")}</div>
                <div className="text-[11px] text-muted-foreground">+880 1700-000000</div>
              </div>
            </a>
            <a
              href="mailto:hello@visamotion.app"
              className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0D3B66] to-[#1e5a8a] text-white shadow-soft">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-bold text-primary ${bn}`}>{t("emailChecklist")}</div>
                <div className="truncate text-[11px] text-muted-foreground">hello@visamotion.app</div>
              </div>
            </a>
            <a
              href="tel:+8801700000000"
              className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#818cf8] text-white shadow-soft">
                <Phone className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-bold text-primary ${bn}`}>{lang === "bn" ? "ফোন" : "Phone"}</div>
                <div className="text-[11px] text-muted-foreground">+880 1700-000000</div>
              </div>
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-hero p-6 text-white shadow-lift md:p-8">
          <h3 className={`text-2xl font-bold leading-tight md:text-3xl ${bn}`}>{t("ctaTitle")}</h3>
          <p className={`mt-2 max-w-xl text-sm text-white/85 ${bn}`}>{t("ctaSub")}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button className="rounded-xl bg-white text-primary hover:bg-white/90">
              <CalendarCheck2 className="mr-2 h-4 w-4" /> {t("bookConsult")}
            </Button>
            <Button variant="outline" className="rounded-xl border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <MapPin className="mr-2 h-4 w-4" /> Dhaka, Bangladesh
            </Button>
          </div>
          <p className={`mt-4 text-xs text-white/65 ${bn}`}>{t("ctaNote")}</p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mt-8 rounded-3xl bg-white p-6 shadow-card ring-1 ring-border md:p-8">
          <h2 id="faq-heading" className={`mb-4 text-xl font-bold text-primary ${bn}`}>{t("faqTitle")}</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className={`text-left text-sm font-semibold text-primary hover:no-underline ${bn}`}>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className={`text-sm text-muted-foreground ${bn}`}>
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
