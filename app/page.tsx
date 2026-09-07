"use client";

import { useMemo, useState } from "react";
import { detect, diagnoses, symptomOptions, type Bucket } from "../lib/diagnoses";

const SITE_URL = "https://sandeshl702.github.io/why-is-my-pf-stuck/";
type Mode = "paste" | "symptom";

type CopyButtonProps = {
  label: string;
  value: string;
  copied: string;
  onCopy: (value: string, label: string) => void;
};

function copyText(value: string, onCopied: (label: string) => void, label: string) {
  navigator.clipboard?.writeText(value);
  onCopied(label);
  window.setTimeout(() => onCopied(""), 1800);
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("paste");
  const [text, setText] = useState("");
  const [picked, setPicked] = useState<Bucket | null>(null);
  const [result, setResult] = useState<Bucket | null>(null);
  const [copied, setCopied] = useState("");
  const [launchOpen, setLaunchOpen] = useState(false);

  const diagnosis = useMemo(() => diagnoses[result ?? "unclear"], [result]);

  const startOver = () => {
    setResult(null);
    setPicked(null);
    setText("");
    setMode("paste");
    setLaunchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getFix = () => {
    setResult(mode === "paste" ? detect(text) : picked ?? "unclear");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shareResult = async () => {
    const shareData = { title: "Why is my PF stuck?", text: diagnosis.share, url: SITE_URL };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        copyText(`${diagnosis.share}\n${SITE_URL}`, setCopied, "Share text copied");
      }
    } catch {
      // Closing the native share sheet is not an error to show the user.
    }
  };

  return (
    <div className="site-shell">
      <Header />
      {!result ? (
        <Landing
          mode={mode}
          setMode={setMode}
          text={text}
          setText={setText}
          picked={picked}
          setPicked={setPicked}
          getFix={getFix}
          copied={copied}
          setCopied={setCopied}
        />
      ) : (
        <Result
          diagnosis={diagnosis}
          copied={copied}
          setCopied={setCopied}
          shareResult={shareResult}
          startOver={startOver}
          launchOpen={launchOpen}
          setLaunchOpen={setLaunchOpen}
        />
      )}
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/why-is-my-pf-stuck/" aria-label="Why is my PF stuck? home">
        <span className="brand-mark">PF</span>
        <span>Why is my PF stuck?</span>
      </a>
      <nav className="header-nav" aria-label="Main navigation">
        <a href="#how-it-works">How it works</a>
        <a href="https://www.epfindia.gov.in/site_en/For_Employees.php" target="_blank" rel="noreferrer">
          EPFO resources <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}

function Landing({
  mode,
  setMode,
  text,
  setText,
  picked,
  setPicked,
  getFix,
  copied,
  setCopied,
}: {
  mode: Mode;
  setMode: (mode: Mode) => void;
  text: string;
  setText: (text: string) => void;
  picked: Bucket | null;
  setPicked: (bucket: Bucket) => void;
  getFix: () => void;
  copied: string;
  setCopied: (value: string) => void;
}) {
  const launchPost = "My PF claim was stuck because I was looking at the wrong thing. This free tool helped me identify the blocker and gave me a ready HR email + EPFiGMS draft. No login, no UAN. Try it: " + SITE_URL;

  return (
    <main>
      <section className="hero-section">
        <div className="container hero-content">
          <p className="eyebrow">A clear next step for an unclear EPFO status</p>
          <h1>Why is my PF stuck?</h1>
          <p className="hero-copy">Paste the message you see in EPFO, or choose the closest symptom. Get a plain-English fix you can act on today.</p>

          <div className="diagnostic-card">
            <div className="diagnostic-card-header">
              <div>
                <p className="card-eyebrow">Start here</p>
                <h2>Tell us what is happening</h2>
              </div>
              <span className="no-login">No login needed</span>
            </div>
            <div className="mode-switch" role="tablist" aria-label="Choose how to describe your issue">
              <button className={mode === "paste" ? "mode-tab active" : "mode-tab"} onClick={() => setMode("paste")} role="tab" aria-selected={mode === "paste"}>
                Paste EPFO message
              </button>
              <button className={mode === "symptom" ? "mode-tab active" : "mode-tab"} onClick={() => setMode("symptom")} role="tab" aria-selected={mode === "symptom"}>
                Pick a symptom
              </button>
            </div>

            {mode === "paste" ? (
              <div className="mode-panel" role="tabpanel">
                <label htmlFor="status-text">What does EPFO say?</label>
                <textarea
                  id="status-text"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Example: Claim rejected — date of exit is not available"
                  rows={5}
                />
                <p className="field-hint">Paste only the status. Remove your UAN, Aadhaar, bank details and OTPs.</p>
              </div>
            ) : (
              <div className="mode-panel" role="tabpanel">
                <p className="field-label">Which sounds closest?</p>
                <div className="symptom-grid">
                  {symptomOptions.map((option) => (
                    <button
                      key={option.bucket}
                      className={picked === option.bucket ? "symptom-option selected" : "symptom-option"}
                      onClick={() => setPicked(option.bucket)}
                      aria-pressed={picked === option.bucket}
                    >
                      <span className="symptom-radio" aria-hidden="true">{picked === option.bucket ? "✓" : ""}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button className="primary-button" onClick={getFix}>Get my fix <span aria-hidden="true">→</span></button>
          </div>
          <p className="privacy-line"><span aria-hidden="true">●</span> Your text stays in this browser. We never ask for your UAN, password or OTP.</p>
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Simple by design</p>
            <h2>From stuck to sorted in three steps.</h2>
          </div>
          <div className="steps-grid">
            <Step number="01" title="Share the clue" text="Paste the exact EPFO line, or choose the symptom that fits best." />
            <Step number="02" title="See the likely blocker" text="Get a short explanation, practical next steps and a documents checklist." />
            <Step number="03" title="Make the right ask" text="Copy a ready HR email or an EPFiGMS grievance without starting from zero." />
          </div>
        </div>
      </section>

      <section className="launch-section container">
        <details className="launch-details">
          <summary><span>Launch kit</span><span className="summary-note">Share the tool when it helps someone else <span aria-hidden="true">＋</span></span></summary>
          <div className="launch-content">
            <div>
              <p className="card-eyebrow">LinkedIn copy</p>
              <p className="launch-copy">{launchPost}</p>
            </div>
            <CopyButton label="Copy post" value={launchPost} copied={copied} onCopy={(value, label) => copyText(value, setCopied, label)} />
          </div>
        </details>
      </section>
    </main>
  );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <article className="step-card">
      <span className="step-number">{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Result({
  diagnosis,
  copied,
  setCopied,
  shareResult,
  startOver,
  launchOpen,
  setLaunchOpen,
}: {
  diagnosis: (typeof diagnoses)[Bucket];
  copied: string;
  setCopied: (value: string) => void;
  shareResult: () => Promise<void>;
  startOver: () => void;
  launchOpen: boolean;
  setLaunchOpen: (open: boolean) => void;
}) {
  return (
    <main className="result-main">
      <section className="result-hero">
        <div className="container">
          <button className="back-link" onClick={startOver}><span aria-hidden="true">←</span> Diagnose another issue</button>
          <p className="eyebrow">Your likely starting point</p>
          <h1>{diagnosis.title}</h1>
          <p className="result-summary">{diagnosis.summary}</p>
          <div className="official-links" aria-label="Official EPFO links">
            <a className="secondary-button" href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/" target="_blank" rel="noreferrer">Open EPFO member portal <span aria-hidden="true">↗</span></a>
            <a className="secondary-button" href="https://epfigms.gov.in/" target="_blank" rel="noreferrer">Open EPFiGMS <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="container result-content">
        <div className="result-grid">
          <div className="result-column">
            <section className="result-block">
              <p className="block-eyebrow">01 · Next steps</p>
              <h2>Do this next</h2>
              <ol className="next-steps">
                {diagnosis.steps.map((step, index) => (
                  <li key={step}><span>{index + 1}</span><p>{step}</p></li>
                ))}
              </ol>
            </section>

            <section className="result-block checklist-block">
              <p className="block-eyebrow">02 · Keep ready</p>
              <h2>Documents checklist</h2>
              <ul className="checklist">
                {diagnosis.docs.map((doc) => <li key={doc}><span aria-hidden="true">□</span>{doc}</li>)}
              </ul>
              <p className="checklist-note">Share masked copies only. Never send passwords, OTPs or full account numbers.</p>
            </section>
          </div>

          <div className="result-column">
            <section className="copy-section">
              <p className="block-eyebrow">03 · Make the ask</p>
              <h2>Ready-to-send messages</h2>
              <CopyCard title="Email to HR" value={diagnosis.hr} copied={copied} setCopied={setCopied} />
              <CopyCard title="EPFiGMS grievance" value={diagnosis.grievance} copied={copied} setCopied={setCopied} />
            </section>
          </div>
        </div>

        <div className="share-row">
          <div><strong>Useful? Pass it on.</strong><span>Share a clean starting point with someone whose PF is stuck.</span></div>
          <button className="outline-button" onClick={shareResult}><span aria-hidden="true">↗</span> Share result</button>
        </div>

        <details className="launch-details result-launch" open={launchOpen} onToggle={(event) => setLaunchOpen(event.currentTarget.open)}>
          <summary><span>Launch kit</span><span className="summary-note">LinkedIn copy, kept out of the way <span aria-hidden="true">＋</span></span></summary>
          <div className="launch-content">
            <p className="launch-copy">{diagnosis.share}</p>
            <CopyButton label="Copy LinkedIn post" value={diagnosis.share} copied={copied} onCopy={(value, label) => copyText(value, setCopied, label)} />
          </div>
        </details>
      </section>
    </main>
  );
}

function CopyCard({ title, value, copied, setCopied }: { title: string; value: string; copied: string; setCopied: (value: string) => void }) {
  const label = `${title} copied`;
  return (
    <article className="copy-card">
      <div className="copy-card-header"><h3>{title}</h3><CopyButton label="Copy" value={value} copied={copied} onCopy={(text, buttonLabel) => copyText(text, setCopied, buttonLabel === "Copy" ? label : buttonLabel)} /></div>
      <pre>{value}</pre>
      {copied === label && <p className="copied-note" role="status">Copied to clipboard</p>}
    </article>
  );
}

function CopyButton({ label, value, copied, onCopy }: CopyButtonProps) {
  const isCopied = copied === label || (label === "Copy" && copied.includes("copied"));
  return <button className="copy-button" onClick={() => onCopy(value, label)}>{isCopied ? "Copied" : label}</button>;
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>Why is my PF stuck?</span>
        <span>Independent utility · Not affiliated with EPFO</span>
      </div>
    </footer>
  );
}
