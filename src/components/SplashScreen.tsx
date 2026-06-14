import { Plane } from "lucide-react";
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
      {/* Subtle world-map / route lines */}
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
        {/* Grid of latitude lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" x2="1200" y1={i * 100 + 50} y2={i * 100 + 50}
            stroke="white" strokeOpacity="0.06" strokeWidth="1" />
        ))}
        {/* Route paths */}
        <path d="M 100 600 Q 400 200 700 400 T 1150 250" fill="none" stroke="url(#route)" strokeWidth="2" className="route-dash" />
        <path d="M 50 300 Q 350 500 650 250 T 1180 500" fill="none" stroke="url(#route)" strokeWidth="1.5" className="route-dash" />
        {/* Dots / cities */}
        {[[100,600],[400,260],[700,400],[1150,250],[650,250],[1180,500]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="4" fill="hsl(173 80% 60%)" opacity="0.9" />
        ))}
      </svg>

      {/* Disclaimer pill */}
      <div className="absolute top-4 right-4 z-10 hidden md:block">
        <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
          {t("disclaimerShort")}
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="float-soft mb-6 flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-md">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-gradient shadow-glow">
            <Plane className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Visa Motion</span>
        </div>

        <h1 className="mb-3 max-w-2xl text-balance text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          {t("tagline")}
        </h1>
        <p className="mb-10 max-w-md text-base text-white/70 sm:text-lg">
          {t("chooseLang")}
        </p>

        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={() => choose("bn")}
            className="h-14 flex-1 rounded-2xl bg-white text-base font-semibold text-primary shadow-lift hover:bg-white/95 font-bn"
          >
            🇧🇩 বাংলায় চালিয়ে যান
          </Button>
          <Button
            size="lg"
            onClick={() => choose("en")}
            className="h-14 flex-1 rounded-2xl bg-teal-gradient text-base font-semibold text-white shadow-lift hover:opacity-95"
          >
            🇬🇧 Continue in English
          </Button>
        </div>

        <p className="mt-10 max-w-sm text-xs text-white/50 md:hidden">
          {t("disclaimerShort")}
        </p>
      </div>
    </div>
  );
}
