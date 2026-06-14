import { useState } from "react";
import { Plane, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const ONB_KEY = "visamotion.onboarded.v1";

interface Props { onDone: () => void; }

export function Onboarding({ onDone }: Props) {
  const { t, lang, setLang } = useLanguage();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: t("onb1Title"),
      sub: t("onb1Sub"),
      art: <PassportArt />,
      tone: "from-[#0D3B66] via-[#15518a] to-[#0F766E]",
    },
    {
      title: t("onb2Title"),
      sub: t("onb2Sub"),
      art: <GlobeArt />,
      tone: "from-[#0F766E] via-[#14B8A6] to-[#4f46e5]",
    },
    {
      title: t("onb3Title"),
      sub: t("onb3Sub"),
      art: <BadgeArt />,
      tone: "from-[#4f46e5] via-[#6366f1] to-[#0D3B66]",
    },
  ];

  const finish = () => {
    try { localStorage.setItem(ONB_KEY, "1"); } catch {}
    onDone();
  };

  const next = () => (step < 2 ? setStep(step + 1) : finish());
  const current = steps[step];

  return (
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${current.tone} text-white transition-all duration-700`}>
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Top bar: brand + progress + lang + skip */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur-md ring-1 ring-white/20">
            <Plane className="h-4 w-4 -rotate-45" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold tracking-tight">Visa Motion</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold backdrop-blur-md ring-1 ring-white/20 transition hover:bg-white/20"
          >
            {lang === "bn" ? "EN" : "বাং"}
          </button>
          <button
            onClick={finish}
            className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold backdrop-blur-md ring-1 ring-white/20 transition hover:bg-white/20"
          >
            {t("skip")}
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="relative z-10 mx-5 mt-5 flex gap-1.5">
        {steps.map((_, i) => (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: i < step ? "100%" : i === step ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <main className="relative z-10 flex flex-1 flex-col items-center px-6 pb-10 pt-6">
        <div key={step} className="flex w-full max-w-md flex-1 flex-col items-center animate-fade-in">
          <div className="relative my-6 grid h-64 w-64 place-items-center sm:h-72 sm:w-72">
            <div className="absolute inset-0 rounded-[2.5rem] bg-white/10 backdrop-blur-xl ring-1 ring-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]" />
            <div className="relative">{current.art}</div>
          </div>

          <div className="mt-2 text-center">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider ring-1 ring-white/20">
              <span>{String(step + 1).padStart(2, "0")}</span>
              <span className="opacity-50">/</span>
              <span className="opacity-70">03</span>
            </div>
            <h1 className={`text-balance text-3xl font-bold leading-tight sm:text-4xl ${lang === "bn" ? "font-bn" : ""}`}>
              {current.title}
            </h1>
            <p className={`mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/80 sm:text-base ${lang === "bn" ? "font-bn" : ""}`}>
              {current.sub}
            </p>
          </div>
        </div>

        {/* Dots + CTA */}
        <div className="mt-6 flex w-full max-w-md flex-col items-center gap-5">
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to step ${i + 1}`}
                onClick={() => setStep(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? "w-8 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={next}
            size="lg"
            className="group h-14 w-full rounded-2xl bg-white text-base font-semibold text-primary shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] hover:bg-white/95"
          >
            {step < 2 ? t("next") : t("getStartedOnb")}
            {step < 2 ? (
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
            ) : (
              <Check className="ml-2 h-4 w-4" strokeWidth={3} />
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}

/* ---------------- SVG illustrations ---------------- */

function PassportArt() {
  return (
    <svg viewBox="0 0 220 220" className="h-52 w-52 drop-shadow-2xl">
      <defs>
        <linearGradient id="pp" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#0D3B66" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
      </defs>
      {/* passport */}
      <rect x="40" y="40" width="120" height="160" rx="14" fill="url(#pp)" />
      <rect x="40" y="40" width="120" height="160" rx="14" fill="none" stroke="#ffffff" strokeOpacity="0.25" />
      <circle cx="100" cy="100" r="22" fill="none" stroke="#FFD166" strokeWidth="2.5" />
      <path d="M78 100 H122 M100 78 V122 M82 88 Q100 100 118 88 M82 112 Q100 100 118 112" stroke="#FFD166" strokeWidth="1.5" fill="none" />
      <rect x="60" y="142" width="80" height="6" rx="3" fill="#ffffff" opacity="0.4" />
      <rect x="60" y="154" width="56" height="6" rx="3" fill="#ffffff" opacity="0.25" />
      <rect x="60" y="166" width="68" height="6" rx="3" fill="#ffffff" opacity="0.25" />
      {/* plane */}
      <g transform="translate(140 30) rotate(20)">
        <path d="M0 22 L40 14 L52 0 L46 26 L72 30 L66 38 L42 36 L36 60 L28 56 L30 36 L4 30 Z" fill="#14B8A6" stroke="#fff" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function GlobeArt() {
  return (
    <svg viewBox="0 0 220 220" className="h-52 w-52 drop-shadow-2xl">
      <defs>
        <radialGradient id="g" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="#5cbdb9" />
          <stop offset="100%" stopColor="#0F766E" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="110" r="80" fill="url(#g)" />
      <ellipse cx="110" cy="110" rx="80" ry="32" fill="none" stroke="#fff" strokeOpacity="0.5" />
      <ellipse cx="110" cy="110" rx="40" ry="80" fill="none" stroke="#fff" strokeOpacity="0.35" />
      <path d="M50 90 Q90 70 130 100 T190 100" fill="none" stroke="#fff" strokeOpacity="0.5" />
      {/* checklist card */}
      <g transform="translate(118 110)">
        <rect width="76" height="86" rx="10" fill="#fff" stroke="#0D3B66" strokeOpacity="0.1" />
        <rect x="10" y="14" width="14" height="14" rx="3" fill="#14B8A6" />
        <path d="M13 21 l4 4 l6 -8" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="30" y="18" width="36" height="5" rx="2" fill="#0D3B66" opacity="0.7" />
        <rect x="10" y="38" width="14" height="14" rx="3" fill="#14B8A6" />
        <path d="M13 45 l4 4 l6 -8" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="30" y="42" width="30" height="5" rx="2" fill="#0D3B66" opacity="0.7" />
        <rect x="10" y="62" width="14" height="14" rx="3" fill="#e2e8f0" />
        <rect x="30" y="66" width="40" height="5" rx="2" fill="#94a3b8" />
      </g>
      {/* pins */}
      <circle cx="70" cy="78" r="5" fill="#FFD166" stroke="#fff" />
      <circle cx="56" cy="130" r="4" fill="#e85d3a" stroke="#fff" />
      <circle cx="92" cy="160" r="4" fill="#FFD166" stroke="#fff" />
    </svg>
  );
}

function BadgeArt() {
  return (
    <svg viewBox="0 0 220 220" className="h-52 w-52 drop-shadow-2xl">
      <defs>
        <linearGradient id="bd" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFD166" />
          <stop offset="100%" stopColor="#e8a73a" />
        </linearGradient>
      </defs>
      {/* approval card */}
      <rect x="32" y="56" width="156" height="104" rx="14" fill="#fff" />
      <rect x="32" y="56" width="156" height="22" rx="14" fill="#0D3B66" />
      <rect x="32" y="70" width="156" height="8" fill="#0D3B66" />
      <rect x="48" y="96" width="56" height="6" rx="3" fill="#0D3B66" opacity="0.75" />
      <rect x="48" y="110" width="92" height="6" rx="3" fill="#94a3b8" />
      <rect x="48" y="124" width="72" height="6" rx="3" fill="#94a3b8" />
      <rect x="48" y="138" width="44" height="10" rx="3" fill="#14B8A6" />
      {/* gold seal */}
      <g transform="translate(150 130)">
        <polygon points="0,-30 8,-9 30,-9 12,4 19,26 0,12 -19,26 -12,4 -30,-9 -8,-9" fill="url(#bd)" stroke="#fff" strokeWidth="1.5" />
        <circle r="14" fill="#0D3B66" />
        <path d="M-6 0 l4 4 l8 -8" stroke="#FFD166" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* sparkles */}
      <circle cx="46" cy="46" r="3" fill="#FFD166" />
      <circle cx="186" cy="180" r="3" fill="#FFD166" />
      <circle cx="32" cy="180" r="2" fill="#fff" opacity="0.7" />
    </svg>
  );
}

export { ONB_KEY };
