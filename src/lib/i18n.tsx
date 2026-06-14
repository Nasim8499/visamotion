import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Lang, BiText } from "@/data/countries";

const STORAGE_KEY = "visamotion.lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof STRINGS) => string;
  tx: (bi: BiText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STRINGS = {
  appName: { bn: "ভিসা মোশন", en: "Visa Motion" },
  tagline: { bn: "আপনার আন্তর্জাতিক ভিসা যাত্রার সঙ্গী", en: "Your international visa journey, simplified." },
  chooseLang: { bn: "ভাষা নির্বাচন করুন", en: "Choose your language" },
  continueBn: { bn: "বাংলায় চালিয়ে যান", en: "Continue in Bangla" },
  continueEn: { bn: "Continue in English", en: "Continue in English" },
  disclaimerShort: { bn: "এটি একটি পরামর্শক তথ্য টুল — সরকারি ওয়েবসাইট নয়।", en: "Informational consultancy tool — not an official government website." },

  // Header / nav
  countries: { bn: "দেশসমূহ", en: "Countries" },
  categories: { bn: "ভিসা ক্যাটাগরি", en: "Visa Categories" },
  about: { bn: "আমাদের সম্পর্কে", en: "About" },
  contact: { bn: "যোগাযোগ", en: "Contact" },

  // Hero
  heroEyebrow: { bn: "প্রিমিয়াম ভিসা কনসালটেন্সি", en: "Premium Visa Consultancy" },
  heroTitle: { bn: "যেকোনো দেশের ভিসা চেকলিস্ট — এক জায়গায়, দুই ভাষায়।", en: "Country-specific visa checklists — bilingual, beautiful, and built for travellers." },
  heroSub: { bn: "ওয়ার্ক, ভিজিট, বিজনেস ও TRC ভিসার জন্য পরিষ্কার ও আপডেটেড ডকুমেন্ট তালিকা। অফিসিয়াল এম্বাসি লিংকসহ।", en: "Clear, updated document lists for Work, Visit, Business and TRC visas. With official embassy links and consultancy support." },
  searchPlaceholder: { bn: "দেশ অনুসন্ধান করুন…", en: "Search a country…" },
  getStarted: { bn: "চেকলিস্ট দেখুন", en: "Explore Checklists" },

  // Filters
  filterAll: { bn: "সব", en: "All" },
  filterSchengen: { bn: "শেনজেন", en: "Schengen" },
  filterNonSchengen: { bn: "নন-শেনজেন", en: "Non-Schengen" },
  filterPopular: { bn: "জনপ্রিয়", en: "Popular" },

  // Stats
  statCountries: { bn: "কভার করা দেশ", en: "Countries Covered" },
  statCategories: { bn: "ভিসা ক্যাটাগরি", en: "Visa Categories" },
  statLinks: { bn: "অফিসিয়াল এম্বাসি লিংক", en: "Official Embassy Links" },
  statBilingual: { bn: "দ্বিভাষিক সাপোর্ট", en: "Bilingual Support" },

  // Cards
  approvalRate: { bn: "অনুমোদনের হার", en: "Approval Rate" },
  processingTime: { bn: "প্রসেসিং সময়", en: "Processing Time" },
  trcDuration: { bn: "TRC মেয়াদ", en: "TRC Duration" },
  popular: { bn: "জনপ্রিয়", en: "Popular" },
  schengen: { bn: "শেনজেন", en: "Schengen" },
  nonSchengen: { bn: "নন-শেনজেন", en: "Non-Schengen" },
  viewChecklist: { bn: "চেকলিস্ট দেখুন", en: "View Checklist" },

  // Detail
  back: { bn: "ফিরে যান", en: "Back" },
  workVisa: { bn: "ওয়ার্ক ভিসা", en: "Work Visa" },
  visitVisa: { bn: "ভিজিট ভিসা", en: "Visit Visa" },
  businessVisa: { bn: "বিজনেস ভিসা", en: "Business Visa" },
  trcCard: { bn: "TRC কার্ড", en: "TRC Card" },
  documentsTotal: { bn: "মোট ডকুমেন্ট", en: "Total Documents" },
  documentsDone: { bn: "সম্পন্ন", en: "Completed" },
  progress: { bn: "অগ্রগতি", en: "Progress" },
  copyChecklist: { bn: "চেকলিস্ট কপি", en: "Copy Checklist" },
  print: { bn: "প্রিন্ট", en: "Print" },
  downloadPdf: { bn: "PDF ডাউনলোড", en: "Download PDF" },
  share: { bn: "শেয়ার", en: "Share" },
  copied: { bn: "কপি হয়েছে!", en: "Copied to clipboard!" },

  // Sections
  importantNotes: { bn: "গুরুত্বপূর্ণ নোট", en: "Important Notes" },
  translationReq: { bn: "অনুবাদের প্রয়োজনীয়তা", en: "Translation Requirements" },
  translationDesc: { bn: "সকল ডকুমেন্ট ইংরেজিতে অনুবাদ এবং অনুমোদিত নোটারি কর্তৃক সত্যায়িত হতে হবে। অ্যাপোস্টিল লিগ্যালাইজেশন প্রয়োজন হতে পারে।", en: "All documents must be translated to English and notarised by a certified translator. Apostille legalisation may be required." },
  insuranceReq: { bn: "স্বাস্থ্য বীমা", en: "Insurance Requirements" },
  insuranceDesc: { bn: "শেনজেন ভিসার জন্য ন্যূনতম €30,000 কভারেজ সহ ট্রাভেল ও স্বাস্থ্য বীমা বাধ্যতামূলক। পুরো ভ্রমণকালীন সময়জুড়ে বৈধ থাকতে হবে।", en: "Travel and health insurance with minimum €30,000 coverage is mandatory for Schengen visas. Must be valid for the entire travel period." },
  appointmentReq: { bn: "অ্যাপয়েন্টমেন্ট গাইড", en: "Appointment Guidance" },
  appointmentDesc: { bn: "VFS Global বা সংশ্লিষ্ট ভিসা অ্যাপ্লিকেশন সেন্টারে অগ্রিম অ্যাপয়েন্টমেন্ট বুক করুন। বায়োমেট্রিক ডাটা সংগ্রহের জন্য সশরীরে উপস্থিতি প্রয়োজন।", en: "Book an appointment in advance at VFS Global or the relevant Visa Application Centre. Biometrics require in-person attendance." },
  timeline: { bn: "আবেদন প্রক্রিয়ার টাইমলাইন", en: "Application Timeline" },

  // Official Links
  officialLinks: { bn: "অফিসিয়াল লিংকসমূহ", en: "Official Links" },
  embassyWebsite: { bn: "এম্বাসি ওয়েবসাইট", en: "Embassy Website" },
  officialVisaInfo: { bn: "অফিসিয়াল ভিসা তথ্য", en: "Official Visa Information" },
  appointmentPortal: { bn: "অ্যাপয়েন্টমেন্ট পোর্টাল", en: "Appointment Portal (VFS)" },
  officialSource: { bn: "অফিসিয়াল উৎস", en: "Official source" },

  // Consultation CTA
  ctaTitle: { bn: "এই ভিসা ফাইল প্রস্তুতিতে সাহায্য দরকার?", en: "Need help preparing this visa file?" },
  ctaSub: { bn: "আমাদের অভিজ্ঞ ভিসা পরামর্শকরা আপনার সম্পূর্ণ ফাইল পর্যালোচনা ও প্রস্তুতিতে সহায়তা করবেন।", en: "Our experienced visa consultants help review, prepare and structure your complete application file." },
  bookConsult: { bn: "কনসালটেশন বুক করুন", en: "Book Consultation" },
  whatsapp: { bn: "WhatsApp সাপোর্ট", en: "WhatsApp Support" },
  emailChecklist: { bn: "Email চেকলিস্ট", en: "Email Checklist" },
  ctaNote: { bn: "এগুলো পরামর্শক সেবা — সরকারি সেবা নয়।", en: "These are consultancy services — not government services." },

  // Footer
  quickLinks: { bn: "কুইক লিংক", en: "Quick Links" },
  disclaimer: { bn: "ডিসক্লেইমার", en: "Disclaimer" },
  disclaimerText: { bn: "চেকলিস্টের প্রয়োজনীয়তা এম্বাসি, আবেদনকারীর প্রোফাইল, জাতীয়তা ও আপডেটেড অভিবাসন নিয়ম অনুসারে ভিন্ন হতে পারে। জমা দেওয়ার আগে সর্বদা অফিসিয়াল এম্বাসি বা ভিসা অ্যাপ্লিকেশন সেন্টারের সাথে যাচাই করুন।", en: "Checklist requirements may vary depending on the embassy, applicant profile, nationality, and updated immigration rules. Always verify with the official embassy or visa application centre before submission." },
  copyright: { bn: "© 2026 ভিসা মোশন। সর্বস্বত্ব সংরক্ষিত।", en: "© 2026 Visa Motion. All rights reserved." },

  // Empty / errors
  emptyTitle: { bn: "কোনো দেশ পাওয়া যায়নি", en: "No matching countries" },
  emptyForQuery: { bn: "এই অনুসন্ধানের জন্য কোনো ফলাফল নেই —", en: "No results found for" },
  emptyForFilter: { bn: "এই ফিল্টারের জন্য কোনো দেশ নেই।", en: "No countries match this filter." },
  clearSearch: { bn: "অনুসন্ধান মুছুন", en: "Clear search" },
  clearFilter: { bn: "ফিল্টার রিসেট", en: "Reset filter" },
  recommended: { bn: "জনপ্রিয় দেশগুলো দেখুন", en: "Try a popular destination" },
  imageUnavailable: { bn: "ছবি লোড করা যায়নি", en: "Image couldn't load" },
  retry: { bn: "আবার চেষ্টা করুন", en: "Retry" },

  // Edit links modal
  editLinks: { bn: "লিংক এডিট করুন", en: "Edit Links" },
  editLinksDesc: { bn: "এই দেশের অফিসিয়াল ভিসা ও অ্যাপয়েন্টমেন্ট লিংক যোগ বা আপডেট করুন। স্থানীয়ভাবে সংরক্ষিত হবে।", en: "Add or update the official visa and appointment links for this country. Saved locally on this device." },
  linksLocalNote: { bn: "এই পরিবর্তনসমূহ শুধু আপনার ডিভাইসে সংরক্ষিত হবে।", en: "Your changes are stored only on this device." },
  missingLinkTitle: { bn: "কিছু লিংক পাওয়া যায়নি", en: "Some links are missing" },
  missingLinkDesc: { bn: "এই দেশের অফিসিয়াল ভিসা বা অ্যাপয়েন্টমেন্ট লিংক যোগ করুন।", en: "Add the official visa or appointment link for this country." },
  addNow: { bn: "এখন যোগ করুন", en: "Add now" },
  customLink: { bn: "কাস্টম", en: "Custom" },
  notProvided: { bn: "প্রদান করা হয়নি", en: "Not provided" },
  invalidUrl: { bn: "অবৈধ URL", en: "Invalid URL" },
  linksSaved: { bn: "লিংক সংরক্ষিত হয়েছে", en: "Links saved" },
  linksReset: { bn: "ডিফল্টে রিসেট করা হয়েছে", en: "Reset to defaults" },
  save: { bn: "সংরক্ষণ", en: "Save" },
  cancel: { bn: "বাতিল", en: "Cancel" },
  reset: { bn: "রিসেট", en: "Reset" },

  // PDF / Print
  printDate: { bn: "প্রিন্টের তারিখ", en: "Generated" },
  language: { bn: "ভাষা", en: "Language" },
  checklistHeader: { bn: "ডকুমেন্ট চেকলিস্ট", en: "Document Checklist" },

  // Continue / Dashboard
  continueTitle: { bn: "যেখানে রেখেছিলেন", en: "Continue where you left off" },
  continueSub: { bn: "আপনার সংরক্ষিত অগ্রগতি", en: "Your saved checklists" },
  continueEmpty: { bn: "এখনো কোনো অগ্রগতি নেই — একটি দেশ নির্বাচন করুন।", en: "No saved progress yet — pick a country to begin." },
  resume: { bn: "চালিয়ে যান", en: "Resume" },

  // Featured slider
  featured: { bn: "ফিচারড গন্তব্য", en: "Featured destinations" },

  // Contact / FAQ
  contactTitle: { bn: "আমাদের সাথে কথা বলুন", en: "Talk to a visa specialist" },
  contactSub: { bn: "আপনার ফাইল প্রস্তুতি, ডকুমেন্ট পর্যালোচনা ও এম্বাসি অ্যাপয়েন্টমেন্টে সহায়তা।", en: "We help with file prep, document review and embassy appointment guidance." },
  faqTitle: { bn: "প্রায়শই জিজ্ঞাসিত প্রশ্ন", en: "Frequently asked questions" },
  faq1Q: { bn: "এটি কি সরকারি ওয়েবসাইট?", en: "Is this an official government website?" },
  faq1A: { bn: "না, এটি একটি বেসরকারি পরামর্শক তথ্য টুল। অফিসিয়াল লিংক যাচাই করুন।", en: "No — this is an independent consultancy tool. Always verify with official embassy links." },
  faq2Q: { bn: "চেকলিস্ট কতটা নির্ভুল?", en: "How accurate are the checklists?" },
  faq2A: { bn: "নিয়মিত আপডেট হয়, তবে এম্বাসি ও কেস অনুযায়ী পার্থক্য থাকতে পারে।", en: "We update regularly, but requirements vary by embassy and individual case." },
  faq3Q: { bn: "আমার ডেটা কোথায় সংরক্ষিত হয়?", en: "Where is my data stored?" },
  faq3A: { bn: "শুধু আপনার ডিভাইসে (লোকাল স্টোরেজ)। কোনো সার্ভারে পাঠানো হয় না।", en: "Only on your device (localStorage). Nothing is sent to a server." },
  faq4Q: { bn: "কনসালটেশন ফি কত?", en: "How much is a consultation?" },
  faq4A: { bn: "প্রথম পরিচিতি সেশন বিনামূল্যে। ফাইল রিভিউয়ের জন্য কাস্টম কোট দেওয়া হয়।", en: "First intro session is free. Custom quote for full file review." },
  backHome: { bn: "হোমে ফিরে যান", en: "Back to home" },

  // Onboarding
  skip: { bn: "এড়িয়ে যান", en: "Skip" },
  next: { bn: "পরবর্তী", en: "Next" },
  getStartedOnb: { bn: "শুরু করুন", en: "Get Started" },
  onb1Title: { bn: "প্রতিটি দেশের পরিষ্কার ভিসা গাইড", en: "Clear visa guides for every country" },
  onb1Sub: { bn: "ওয়ার্ক, ভিজিট, বিজনেস ও TRC — সবকিছু এক জায়গায়, দুই ভাষায়।", en: "Work, Visit, Business and TRC — everything in one place, in two languages." },
  onb2Title: { bn: "ডকুমেন্ট চেকলিস্ট ও অগ্রগতি ট্র্যাক করুন", en: "Track documents with smart checklists" },
  onb2Sub: { bn: "প্রতিটি ডকুমেন্ট চেক করুন, অগ্রগতি সংরক্ষিত থাকবে — যেকোনো সময় ফিরে আসুন।", en: "Tick each requirement; progress saves automatically — resume anytime." },
  onb3Title: { bn: "অফিসিয়াল লিংক ও বিশেষজ্ঞ সহায়তা", en: "Official links & expert guidance" },
  onb3Sub: { bn: "এম্বাসি, VFS অ্যাপয়েন্টমেন্ট এবং পরামর্শক সেবা — এক ক্লিকে।", en: "Embassy, VFS appointments and consultancy support — one tap away." },

  // Infographics
  approvalRing: { bn: "অনুমোদন রেট", en: "Approval rate" },
  lastYear: { bn: "গত বছর", en: "Last year" },
  exploreCountries: { bn: "সকল দেশ ঘুরে দেখুন", en: "Explore all destinations" },
} as const;


export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem(STORAGE_KEY) as Lang) || "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "bn" ? "bn" : "en";
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (key: keyof typeof STRINGS) => STRINGS[key][lang];
  const tx = (bi: BiText) => bi[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tx }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export const HAS_LANG_KEY = "visamotion.lang.chosen";
