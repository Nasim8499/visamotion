import { useEffect, useState } from "react";
import { Download, X, Smartphone, Sparkles, Apple, CheckCircle2, FolderOpen, ShieldCheck, AlertTriangle, Share2, Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const DISMISS_KEY = "visamotion.apkPrompt.dismissedUntil.v2";
const IMPRESSION_KEY = "visamotion.apkPrompt.impressions";
const DOWNLOAD_KEY = "visamotion.apkPrompt.downloads";
const APK_URL = "/visamotion.apk";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

type Platform = "android" | "ios";

function track(event: string, meta?: Record<string, unknown>) {
  try {
    const key = event === "install_prompt_impression" ? IMPRESSION_KEY : event === "apk_download_click" ? DOWNLOAD_KEY : null;
    if (key) {
      const n = Number(localStorage.getItem(key) || "0") + 1;
      localStorage.setItem(key, String(n));
    }
    window.dispatchEvent(new CustomEvent("visamotion:analytics", { detail: { event, meta, ts: Date.now() } }));
    // eslint-disable-next-line no-console
    console.info("[analytics]", event, meta || {});
  } catch {}
}

export function InstallAppPrompt() {
  const { lang } = useLanguage();
  const isBn = lang === "bn";
  const [show, setShow] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("android");
  const [apkAvailable, setApkAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const until = Number(localStorage.getItem(DISMISS_KEY) || "0");
    if (until && Date.now() < until) return;

    // Probe APK to fallback gracefully if missing
    let cancelled = false;
    fetch(APK_URL, { method: "HEAD" })
      .then((r) => {
        if (cancelled) return;
        const ok = r.ok && !String(r.headers.get("content-type") || "").includes("text/html");
        setApkAvailable(ok);
      })
      .catch(() => !cancelled && setApkAvailable(false));

    const t = setTimeout(() => {
      setShow(true);
      track("install_prompt_impression");
    }, 1200);
    const t2 = setTimeout(() => setPulse(true), 1800);
    return () => { cancelled = true; clearTimeout(t); clearTimeout(t2); };
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + SEVEN_DAYS_MS));
    setShow(false);
    track("install_prompt_dismiss");
  };

  const openInstructions = (p: Platform) => {
    setPlatform(p);
    setOpen(true);
    track("install_instructions_open", { platform: p });
  };

  const handleDownload = () => {
    track("apk_download_click", { available: apkAvailable });
    if (apkAvailable) {
      const a = document.createElement("a");
      a.href = APK_URL;
      a.download = "visamotion.apk";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  if (!show || apkAvailable === false) return null;

  return (
    <>
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
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
              animation: "shine 3.5s ease-in-out infinite",
            }}
          />
          <div className="relative rounded-[calc(1.5rem-1.5px)] bg-white/95 p-3.5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
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

              <div className="min-w-0 flex-1">
                <div className={`text-[13.5px] font-bold leading-tight text-[#0D3B66] ${isBn ? "font-bn" : ""}`}>
                  {isBn ? "Visa Motion অ্যাপ ইনস্টল করুন" : "Install Visa Motion App"}
                </div>
                <div className={`mt-0.5 text-[11.5px] leading-snug text-muted-foreground ${isBn ? "font-bn" : ""}`}>
                  {isBn ? "Android ও iPhone উভয়ের জন্য উপলব্ধ" : "Available for Android & iPhone"}
                </div>
              </div>

              <button
                onClick={dismiss}
                aria-label={isBn ? "৭ দিনের জন্য বন্ধ করুন" : "Dismiss for 7 days"}
                className="ml-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => openInstructions("android")}
                className="group inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] px-3 py-2.5 text-[12px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(15,118,110,0.8)] transition hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="h-3.5 w-3.5 transition group-hover:translate-y-0.5" strokeWidth={2.6} />
                {isBn ? "Android APK" : "Android APK"}
              </button>
              <button
                onClick={() => openInstructions("ios")}
                className="group inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-br from-[#0D3B66] to-[#10518f] px-3 py-2.5 text-[12px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(13,59,102,0.8)] transition hover:-translate-y-0.5 active:translate-y-0"
              >
                <Apple className="h-3.5 w-3.5" strokeWidth={2.6} />
                {isBn ? "iPhone" : "iPhone"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <InstructionsModal
        open={open}
        onOpenChange={setOpen}
        platform={platform}
        isBn={isBn}
        apkAvailable={!!apkAvailable}
        onDownload={handleDownload}
      />
    </>
  );
}

function InstructionsModal({
  open, onOpenChange, platform, isBn, apkAvailable, onDownload,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  platform: Platform;
  isBn: boolean;
  apkAvailable: boolean;
  onDownload: () => void;
}) {
  const androidSteps = [
    { icon: ShieldCheck, en: "Allow installs from unknown sources in Settings → Security.", bn: "Settings → Security এ গিয়ে Unknown Sources থেকে ইনস্টল অনুমতি দিন।" },
    { icon: Download, en: "Tap Download APK below to save the file.", bn: "নিচে Download APK তে ট্যাপ করে ফাইলটি সেভ করুন।" },
    { icon: FolderOpen, en: "Open the downloaded visamotion.apk file.", bn: "ডাউনলোড হওয়া visamotion.apk ফাইলটি খুলুন।" },
    { icon: CheckCircle2, en: "Tap Install and launch Visa Motion.", bn: "Install ট্যাপ করে Visa Motion চালু করুন।" },
  ];
  const iosSteps = [
    { icon: Share2, en: "Open this site in Safari and tap the Share button.", bn: "Safari তে এই সাইট খুলে Share বাটনে ট্যাপ করুন।" },
    { icon: Plus, en: "Choose Add to Home Screen from the menu.", bn: "মেনু থেকে Add to Home Screen নির্বাচন করুন।" },
    { icon: CheckCircle2, en: "Tap Add — Visa Motion will appear like an app.", bn: "Add ট্যাপ করুন — Visa Motion অ্যাপের মতো হোম স্ক্রিনে আসবে।" },
  ];
  const steps = platform === "android" ? androidSteps : iosSteps;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-0 overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#0D3B66] via-[#10518f] to-[#0F766E] p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-md">
              {platform === "android" ? <Smartphone className="h-5 w-5" /> : <Apple className="h-5 w-5" />}
            </div>
            <DialogHeader className="space-y-0.5 text-left">
              <DialogTitle className={`text-[16px] font-bold ${isBn ? "font-bn" : ""}`}>
                {platform === "android"
                  ? isBn ? "Android এ ইনস্টল করুন" : "Install on Android"
                  : isBn ? "iPhone এ যোগ করুন" : "Add to iPhone"}
              </DialogTitle>
              <DialogDescription className={`text-[12px] text-white/80 ${isBn ? "font-bn" : ""}`}>
                {isBn ? "নিচের সহজ ধাপগুলো অনুসরণ করুন" : "Follow the simple steps below"}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="space-y-3 p-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl bg-secondary/60 p-3 ring-1 ring-border"
              style={{ animation: `fade-up 360ms ${i * 80}ms cubic-bezier(0.22,1,0.36,1) both` }}
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white shadow-soft">
                <s.icon className="h-4 w-4" strokeWidth={2.4} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {isBn ? `ধাপ ${i + 1}` : `Step ${i + 1}`}
                </div>
                <div className={`text-[13px] font-medium leading-snug text-primary ${isBn ? "font-bn" : ""}`}>
                  {isBn ? s.bn : s.en}
                </div>
              </div>
            </div>
          ))}

          {platform === "android" && !apkAvailable && (
            <div className="flex items-start gap-2 rounded-2xl bg-destructive/10 p-3 text-destructive ring-1 ring-destructive/20">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <div className={`text-[12px] leading-snug ${isBn ? "font-bn" : ""}`}>
                {isBn
                  ? "APK ফাইল পাওয়া যায়নি। শীঘ্রই উপলব্ধ হবে।"
                  : "APK file isn't available yet. Please check back soon."}
              </div>
            </div>
          )}

          {platform === "android" && (
            <button
              onClick={onDownload}
              disabled={!apkAvailable}
              className={`mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-10px_rgba(15,118,110,0.8)] transition ${
                apkAvailable
                  ? "bg-gradient-to-br from-[#0F766E] to-[#14B8A6] hover:-translate-y-0.5"
                  : "cursor-not-allowed bg-muted-foreground/40"
              }`}
            >
              <Download className="h-4 w-4" strokeWidth={2.6} />
              {isBn ? "APK ডাউনলোড করুন" : "Download APK"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
