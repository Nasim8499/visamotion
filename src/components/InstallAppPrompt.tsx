import { useEffect, useState } from "react";
import { Download, X, Smartphone, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const DISMISS_KEY = "visamotion.apkPrompt.dismissed.v1";
const APK_URL = "/visamotion.apk"; // Drop the APK file into /public/visamotion.apk

export function InstallAppPrompt() {
  const { lang } = useLanguage();
  const [show, setShow] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const t = setTimeout(() => setShow(true), 1200);
    const t2 = setTimeout(() => setPulse(true), 1800);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  };

  if (!show) return null;

  const isBn = lang === "bn";

  return (
    <div
      className="fixed left-1/2 z-[60] w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 px-1 no-print"
      style={{
        bottom: "calc(env(safe-area-inset-bottom) + 88px)",
        animation: "fade-up 480ms cubic-bezier(0.22,1,0.36,1) both",
      }}
      role="dialog"
      aria-live="polite"
      aria-label={isBn ? "অ্যাপ ইনস্টল করুন" : "Install app"}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D3B66] via-[#10518f] to-[#0F766E] p-[1.5px] shadow-[0_24px_60px_-20px_rgba(13,59,102,0.7)]">
        {/* Animated sheen */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            animation: "shine 3.5s ease-in-out infinite",
          }}
        />
        <div className="relative flex items-center gap-3 rounded-[calc(1.5rem-1.5px)] bg-white/95 p-3.5 backdrop-blur-xl">
          {/* Icon */}
          <div className="relative shrink-0">
            <div
              className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white shadow-[0_10px_24px_-8px_rgba(15,118,110,0.6)] ${
                pulse ? "animate-[wiggle_1.6s_ease-in-out_infinite]" : ""
              }`}
            >
              <Smartphone className="h-[22px] w-[22px]" strokeWidth={2.4} />
            </div>
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#e85d3a] text-white ring-2 ring-white">
              <Sparkles className="h-3 w-3" strokeWidth={2.6} />
            </span>
            <span className="absolute inset-0 -z-0 rounded-2xl bg-[#14B8A6]/40 blur-xl" />
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            <div className={`text-[13.5px] font-bold leading-tight text-[#0D3B66] ${isBn ? "font-bn" : ""}`}>
              {isBn ? "Visa Motion অ্যাপ ইনস্টল করুন" : "Install Visa Motion App"}
            </div>
            <div className={`mt-0.5 text-[11.5px] leading-snug text-muted-foreground ${isBn ? "font-bn" : ""}`}>
              {isBn
                ? "হোম স্ক্রিনে যোগ করুন — APK ডাউনলোড করুন"
                : "Add to your home screen — download the APK"}
            </div>
          </div>

          {/* CTA */}
          <a
            href={APK_URL}
            download
            onClick={() => sessionStorage.setItem(DISMISS_KEY, "1")}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] px-3.5 py-2.5 text-[12px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(15,118,110,0.8)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download className="h-3.5 w-3.5 transition group-hover:translate-y-0.5" strokeWidth={2.6} />
            {isBn ? "ডাউনলোড" : "Download"}
          </a>

          {/* Dismiss */}
          <button
            onClick={dismiss}
            aria-label={isBn ? "বন্ধ করুন" : "Dismiss"}
            className="ml-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
