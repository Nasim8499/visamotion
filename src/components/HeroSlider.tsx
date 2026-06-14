import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { COUNTRIES } from "@/data/countries";

export function HeroSlider() {
  const navigate = useNavigate();
  const { t, tx, lang } = useLanguage();
  const slides = COUNTRIES.filter((c) => c.popular).slice(0, 5);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % slides.length), 4200);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("featured")}
      className="container mt-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-3 flex items-end justify-between px-1">
        <h2 className={`text-[15px] font-bold text-primary ${lang === "bn" ? "font-bn" : ""}`}>{t("featured")}</h2>
        <div className="flex gap-1.5" role="tablist" aria-label="Slide selector">
          {slides.map((_, k) => (
            <button
              key={k}
              role="tab"
              aria-selected={k === i}
              aria-label={`Go to slide ${k + 1}`}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-5 bg-[#0D3B66]" : "w-1.5 bg-border"}`}
            />
          ))}
        </div>
      </div>

      <div className="relative h-44 overflow-hidden rounded-3xl shadow-card ring-1 ring-border md:h-56">
        {slides.map((c, k) => (
          <div
            key={c.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${k + 1} of ${slides.length}: ${tx(c.name)}`}
            aria-hidden={k !== i}
            className={`absolute inset-0 transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0D3B66]/95 via-[#0D3B66]/55 to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-5 text-white">
              <div className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold backdrop-blur">
                <Sparkles className="h-3 w-3 text-[#14B8A6]" /> {t("popular")}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl leading-none drop-shadow">{c.flag}</span>
                <h3 className={`text-2xl font-bold drop-shadow ${lang === "bn" ? "font-bn" : ""}`}>{tx(c.name)}</h3>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/85">
                <span>{c.approvalRate}% {t("approvalRate")}</span>
                <span className="opacity-60">·</span>
                <span className={lang === "bn" ? "font-bn" : ""}>{tx(c.processing)}</span>
              </div>
              <button
                onClick={() => navigate(`/country/${c.slug}/work`)}
                className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#0D3B66] shadow-soft transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {t("viewChecklist")} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
