import { Plane, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

interface SplashScreenProps {
  onContinue: () => void;
}

export function SplashScreen({ onContinue }: SplashScreenProps) {
  const { setLang, t } = useLanguage();
  const choose = (l: "bn" | "en") => {
    setLang(l);
    localStorage.setItem("visamotion.lang.chosen", "1");
    onContinue();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-splash">
      {/* Animated routes */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="route" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(173 80% 60%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(174 77% 40%)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" x2="1200" y1={i * 100 + 50} y2={i * 100 + 50}
            stroke="white" strokeOpacity="0.06" strokeWidth="1" />
        ))}
        <path d="M 100 600 Q 400 200 700 400 T 1150 250" fill="none" stroke="url(#route)" strokeWidth="2" className="route-dash" />
        <path d="M 50 300 Q 350 500 650 250 T 1180 500" fill="none" stroke="url(#route)" strokeWidth="1.5" className="route-dash" />
        {[[100,600],[400,260],[700,400],[1150,250],[650,250],[1180,500]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="4" fill="hsl(173 80% 60%)" opacity="0.9" />
        ))}
      </svg>

      <div className="absolute top-4 right-4 z-10 hidden md:block">
        <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
          {t("disclaimerShort")}
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-12">
        {/* Layered card stack */}
        <div className="relative w-full max-w-md">
          {/* Back decorative cards (offset for depth) */}
          <div className="absolute inset-x-8 -top-3 h-24 rounded-3xl bg-white/5 backdrop-blur-md ring-1 ring-white/10" />
          <div className="absolute inset-x-4 -top-1.5 h-28 rounded-3xl bg-white/8 backdrop-blur-md ring-1 ring-white/15" />

          {/* Front glass card */}
          <div
            className="relative rounded-[2rem] border border-white/15 bg-white/10 p-7 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
            style={{ animation: "fade-up 600ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            {/* Centered brand */}
            <div className="flex flex-col items-center text-center">
              <div className="float-soft mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-teal-gradient shadow-glow ring-1 ring-white/30">
                <Plane className="h-7 w-7 -rotate-45 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-2xl font-bold tracking-tight text-white">Visa Motion</div>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-200/90">
                <Sparkles className="h-3 w-3" /> Premium Consultancy
              </div>
            </div>

            <h1
              className="mt-6 text-balance text-center text-2xl font-bold leading-tight text-white sm:text-3xl"
              style={{ animation: "fade-up 700ms 80ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              {t("tagline")}
            </h1>
            <p
              className="mt-2 text-center text-sm text-white/70"
              style={{ animation: "fade-up 700ms 160ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              {t("chooseLang")}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                size="lg"
                onClick={() => choose("bn")}
                className="h-14 w-full rounded-2xl bg-white text-base font-semibold text-primary shadow-lift hover:bg-white/95 font-bn"
                style={{ animation: "fade-up 600ms 240ms cubic-bezier(0.22,1,0.36,1) both" }}
              >
                🇧🇩 বাংলায় চালিয়ে যান
              </Button>
              <Button
                size="lg"
                onClick={() => choose("en")}
                className="h-14 w-full rounded-2xl bg-teal-gradient text-base font-semibold text-white shadow-lift hover:opacity-95"
                style={{ animation: "fade-up 600ms 320ms cubic-bezier(0.22,1,0.36,1) both" }}
              >
                🇬🇧 Continue in English
              </Button>
            </div>

            <div
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-[11px] text-white/70 ring-1 ring-white/10"
              style={{ animation: "fade-up 600ms 400ms cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-teal-200" />
              <span>{t("disclaimerShort")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
