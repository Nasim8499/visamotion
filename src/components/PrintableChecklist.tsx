import { useLanguage } from "@/lib/i18n";
import type { Country, BiText } from "@/data/countries";

type Category = "work" | "visit" | "business" | "trc";

interface Props {
  country: Country;
  category: Category;
  items: BiText[];
  state: boolean[];
  merged: { embassy: string; officialVisa: string; appointment: string };
}

/**
 * A4 printable checklist — visible only when printing.
 * Uses semantic structure with @page A4 + page-break rules from index.css.
 */
export function PrintableChecklist({ country, category, items, state, merged }: Props) {
  const { t, tx, lang } = useLanguage();
  const catLabels: Record<Category, string> = {
    work: t("workVisa"), visit: t("visitVisa"), business: t("businessVisa"), trc: t("trcCard"),
  };
  const done = state.filter(Boolean).length;
  const pct = items.length ? Math.round((done / items.length) * 100) : 0;
  const today = new Date().toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", {
    year: "numeric", month: "long", day: "numeric",
  });
  const bnClass = lang === "bn" ? "pdf-bn" : "";

  return (
    <div className="pdf-only" aria-hidden>
      <div className="pdf-page">
        {/* Header band */}
        <header className="pdf-header">
          <div className="pdf-brand">
            <div className="pdf-logo">VM</div>
            <div>
              <div className="pdf-brand-name">Visa Motion</div>
              <div className="pdf-brand-sub">{t("disclaimerShort")}</div>
            </div>
          </div>
          <div className="pdf-meta">
            <div className="pdf-meta-row"><span>{t("printDate")}:</span> <b>{today}</b></div>
            <div className="pdf-meta-row"><span>{t("language")}:</span> <b>{lang === "bn" ? "বাংলা" : "English"}</b></div>
          </div>
        </header>

        {/* Country block */}
        <section className="pdf-country">
          <div className="pdf-flag">{country.flag}</div>
          <div className="pdf-country-info">
            <h1 className={`pdf-title ${bnClass}`}>{tx(country.name)} — {catLabels[category]}</h1>
            <p className={`pdf-subtitle ${bnClass}`}>{tx(country.regionType)} · {t("approvalRate")}: {country.approvalRate}% · {t("processingTime")}: {tx(country.processing)}</p>
          </div>
        </section>

        {/* Progress strip */}
        <section className="pdf-progress">
          <div className={`pdf-progress-label ${bnClass}`}>
            {t("progress")}: <b>{done}/{items.length}</b> ({pct}%)
          </div>
          <div className="pdf-progress-bar"><div className="pdf-progress-fill" style={{ width: `${pct}%` }} /></div>
        </section>

        {/* Checklist */}
        <section className="pdf-section">
          <h2 className={`pdf-h2 ${bnClass}`}>{t("checklistHeader")}</h2>
          <ol className="pdf-list">
            {items.map((item, i) => (
              <li key={i} className="pdf-item">
                <span className="pdf-checkbox">{state[i] ? "✓" : ""}</span>
                <span className="pdf-item-num">{i + 1}.</span>
                <span className={`pdf-item-text ${bnClass}`}>{tx(item)}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Notes */}
        <section className="pdf-section">
          <h2 className={`pdf-h2 ${bnClass}`}>{t("importantNotes")}</h2>
          <ul className="pdf-notes">
            {country.notes.map((n, i) => (
              <li key={i} className={`pdf-note ${bnClass}`}>• {tx(n)}</li>
            ))}
          </ul>
        </section>

        {/* Official links */}
        <section className="pdf-section pdf-links">
          <h2 className={`pdf-h2 ${bnClass}`}>{t("officialLinks")}</h2>
          <table className="pdf-link-table">
            <tbody>
              <tr><td className={bnClass}>{t("embassyWebsite")}</td><td>{merged.embassy || "—"}</td></tr>
              <tr><td className={bnClass}>{t("officialVisaInfo")}</td><td>{merged.officialVisa || "—"}</td></tr>
              <tr><td className={bnClass}>{t("appointmentPortal")}</td><td>{merged.appointment || "—"}</td></tr>
            </tbody>
          </table>
        </section>

        {/* Footer disclaimer */}
        <footer className="pdf-footer">
          <p className={bnClass}>{t("disclaimerText")}</p>
          <p className="pdf-copy">visamotion.app · {t("copyright")}</p>
        </footer>
      </div>
    </div>
  );
}
