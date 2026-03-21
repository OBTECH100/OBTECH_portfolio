import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PageWrapper, Footer } from "../components/shared";
import { ORANGE } from "../data";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID    = "service_j21vfl7";
const EMAILJS_TEMPLATE_ID   = "template_sred8ef";
const EMAILJS_AUTOREPLY_ID  = "template_3sn48ka";
const EMAILJS_PUBLIC_KEY    = "JnNVS5XUsZwFcXnoU";

// ── Validation helpers ─────────────────────────────

// Levenshtein distance algorithm — measures edit distance between two strings
const levenshtein = (a, b) => {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
};

// Gmail-specific explicit extras (levenshtein alone misses these)
const GMAIL_EXTRA = new Set(["gmail.net", "gmail.org", "gmail.io"]);

// Catches ALL misspellings of gmail.com algorithmically (301+ variants)
const isGmailTypo = domain => {
  if (domain === "gmail.com") return false;
  if (GMAIL_EXTRA.has(domain)) return true;
  const dotIdx   = domain.lastIndexOf(".");
  const name     = domain.slice(0, dotIdx);
  const tld      = domain.slice(dotIdx + 1);
  const nameDist = levenshtein(name, "gmail");
  const tldDist  = levenshtein(tld, "com");
  return (nameDist <= 2 && tldDist <= 1) ||
         (nameDist === 0 && tldDist <= 2) ||
         (nameDist <= 1 && tld === "com");
};

// Typo map for other major providers
const PROVIDER_TYPOS = {
  // yahoo
  "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com", "yhaoo.com": "yahoo.com",
  "yaoo.com": "yahoo.com", "yahoo.co": "yahoo.com", "yahoo.cm": "yahoo.com",
  "yahoo.con": "yahoo.com", "yahoo.c": "yahoo.com", "yhoo.com": "yahoo.com",
  // hotmail
  "hotmai.com": "hotmail.com", "hotmial.com": "hotmail.com", "hotmal.com": "hotmail.com",
  "hotmali.com": "hotmail.com", "homail.com": "hotmail.com", "hotmil.com": "hotmail.com",
  "hotmail.co": "hotmail.com", "hotmail.c": "hotmail.com", "hotmil.com": "hotmail.com",
  // outlook
  "outlok.com": "outlook.com", "outloo.com": "outlook.com", "outloook.com": "outlook.com",
  "outlook.co": "outlook.com", "outlook.c": "outlook.com", "outlookk.com": "outlook.com",
  // icloud
  "iclod.com": "icloud.com", "icoud.com": "icloud.com",
  "iclould.com": "icloud.com", "icloud.co": "icloud.com",
};

// Blocked disposable / throwaway domains
const BLOCKED_DOMAINS = new Set([
  "mailinator.com","guerrillamail.com","tempmail.com","throwam.com",
  "sharklasers.com","guerrillamailblock.com","grr.la","guerrillamail.info",
  "spam4.me","trashmail.com","trashmail.me","yopmail.com","maildrop.cc",
  "dispostable.com","fakeinbox.com","temp-mail.org","getairmail.com",
  "mohmal.com","mintemail.com","discard.email","mailnull.com","spamgourmet.com",
  "mail.com","email.com","usa.com","myself.com","inbox.com",
]);

// Other known providers for fuzzy matching
const OTHER_PROVIDERS = [
  "yahoo.com","hotmail.com","outlook.com","icloud.com","live.com","protonmail.com","me.com",
];

const isValidEmail = v => {
  const raw = v.trim();

  // 1. Block any uppercase letters
  if (raw !== raw.toLowerCase()) {
    return { valid: false, msg: "Email must be in lowercase. Please remove uppercase letters." };
  }

  const email = raw.toLowerCase();

  // 2. Basic format — must match user@domain.tld
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, msg: "Please enter a valid email address." };
  }

  const [user, domain] = email.split("@");
  const tld = domain.split(".").pop();

  // 3. TLD must be 2+ real letters, not digits-only
  if (tld.length < 2 || /^[0-9]+$/.test(tld)) {
    return { valid: false, msg: "Please enter a valid email address." };
  }

  // 4. Blocked / disposable domain
  if (BLOCKED_DOMAINS.has(domain)) {
    return { valid: false, msg: "Disposable email addresses are not accepted. Please use your real email." };
  }

  // 5. Gmail typo check — catches ALL 301+ misspellings algorithmically
  if (isGmailTypo(domain)) {
    return { valid: false, msg: `Did you mean ${user}@gmail.com?` };
  }

  // 6. Other provider typo map
  if (PROVIDER_TYPOS[domain]) {
    return { valid: false, msg: `Did you mean ${user}@${PROVIDER_TYPOS[domain]}?` };
  }

  // 7. Fuzzy match other providers (1 edit away)
  for (const known of OTHER_PROVIDERS) {
    if (domain !== known && levenshtein(domain, known) === 1) {
      return { valid: false, msg: `Did you mean ${user}@${known}?` };
    }
  }

  return { valid: true, msg: "" };
};

const isValidName = v => v.trim().length >= 2;

// ── Icons ──────────────────────────────────────────
const I = {
  mail:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  pin:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  briefcase:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  phone:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.27 1h3a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  github:   <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  whatsapp: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  twitter:  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  send:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  check:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrow:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  plus:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
};

const Icon = ({ name, size = 18 }) => (
  <span style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    {I[name]}
  </span>
);

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Input({ label, value, onChange, placeholder, type = "text", required, span }) {
  const [foc, setFoc]     = useState(false);
  const [dirty, setDirty] = useState(false);

  let errMsg = "";
  if (dirty && required && !value.trim()) {
    errMsg = "This field is required.";
  } else if (dirty && type === "email" && value.trim()) {
    const check = isValidEmail(value);
    if (!check.valid) errMsg = check.msg;
  } else if (dirty && type === "text" && required && value.trim() && !isValidName(value)) {
    errMsg = "Name must be at least 2 characters.";
  }

  const hasErr = !!errMsg;
  const isGood = dirty && value.trim() && !hasErr;

  return (
    <div style={{ gridColumn: span ? "1 / -1" : undefined }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: foc ? ORANGE : hasErr ? "#ff4d4d" : "#4a4a4a", marginBottom: 9, transition: "color .2s" }}>
        {label}{required && <span style={{ color: ORANGE, marginLeft: 2 }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={type} value={value} placeholder={placeholder} required={required}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFoc(true)}
          onBlur={() => { setFoc(false); setDirty(true); }}
          style={{
            width: "100%", padding: "14px 40px 14px 16px", boxSizing: "border-box",
            background: foc ? "#131313" : "#0f0f0f",
            border: `1px solid ${hasErr ? "#ff4d4d55" : isGood ? "#00C86455" : foc ? ORANGE + "60" : "#232323"}`,
            borderRadius: 12, color: "#fff", fontSize: 14,
            outline: "none", transition: "all .2s", fontFamily: "inherit",
            boxShadow: foc ? `0 0 0 3px ${ORANGE}12` : hasErr ? "0 0 0 3px #ff4d4d12" : isGood ? "0 0 0 3px #00C86412" : "none",
          }}
        />
        {dirty && value.trim() && (
          <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, pointerEvents: "none", color: hasErr ? "#ff4d4d" : "#00C864", fontWeight: 700 }}>
            {hasErr ? "✕" : "✓"}
          </span>
        )}
      </div>
      {hasErr && <p style={{ fontSize: 11, color: "#ff4d4d", margin: "6px 0 0" }}>⚠ {errMsg}</p>}
    </div>
  );
}

function Select({ label, value, onChange, options, required, span }) {
  const [foc, setFoc] = useState(false);
  return (
    <div style={{ gridColumn: span ? "1 / -1" : undefined }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: foc ? ORANGE : "#4a4a4a", marginBottom: 9, transition: "color .2s" }}>
        {label}{required && <span style={{ color: ORANGE, marginLeft: 2 }}>*</span>}
      </label>
      <select value={value} onChange={e => onChange(e.target.value)} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
        style={{
          width: "100%", padding: "14px 40px 14px 16px", fontFamily: "inherit",
          background: foc ? "#131313" : "#0f0f0f",
          border: `1px solid ${foc ? ORANGE + "60" : "#232323"}`,
          borderRadius: 12, color: value ? "#fff" : "#555", fontSize: 14,
          outline: "none", transition: "all .2s", cursor: "pointer", appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
          boxShadow: foc ? `0 0 0 3px ${ORANGE}12` : "none",
        }}>
        {options.map(o => <option key={o.v} value={o.v} style={{ background: "#111", color: o.v ? "#fff" : "#555" }}>{o.l}</option>)}
      </select>
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, required }) {
  const [foc, setFoc]     = useState(false);
  const [dirty, setDirty] = useState(false);

  const tooShort = dirty && required && value.trim().length > 0 && value.trim().length < 10;
  const empty    = dirty && required && !value.trim();
  const hasErr   = tooShort || empty;
  const isGood   = !hasErr && value.trim().length >= 10;
  const errMsg   = empty ? "Message is required." : tooShort ? "Please write at least 10 characters." : "";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: foc ? ORANGE : hasErr ? "#ff4d4d" : "#4a4a4a", transition: "color .2s" }}>
          {label}{required && <span style={{ color: ORANGE, marginLeft: 2 }}>*</span>}
        </label>
        <span style={{ fontSize: 10, color: value.length > 420 ? ORANGE : value.length >= 10 ? "#00C864" : "#333", transition: "color .2s" }}>
          {value.length} / 500{value.length > 0 && value.length < 10 ? " (min 10)" : ""}
        </span>
      </div>
      <textarea
        rows={6} maxLength={500} value={value} placeholder={placeholder} required={required}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFoc(true)} onBlur={() => { setFoc(false); setDirty(true); }}
        style={{
          width: "100%", padding: "14px 16px", fontFamily: "inherit",
          background: foc ? "#131313" : "#0f0f0f",
          border: `1px solid ${hasErr ? "#ff4d4d55" : isGood ? "#00C86455" : foc ? ORANGE + "60" : "#232323"}`,
          borderRadius: 12, color: "#fff", fontSize: 14,
          outline: "none", transition: "all .2s", resize: "vertical",
          lineHeight: 1.8, minHeight: 150,
          boxShadow: foc ? `0 0 0 3px ${ORANGE}12` : hasErr ? "0 0 0 3px #ff4d4d12" : isGood ? "0 0 0 3px #00C86412" : "none",
        }}
      />
      {hasErr && <p style={{ fontSize: 11, color: "#ff4d4d", margin: "6px 0 0" }}>⚠ {errMsg}</p>}
    </div>
  );
}

function FAQ({ q, a, index }) {
  const [open, setOpen] = useState(false);
  const [ref, vis] = useInView(0.1);
  return (
    <div ref={ref} style={{ borderBottom: "1px solid #1a1a1a", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: `all .5s ease ${index * .07}s` }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontSize: "clamp(13px,1.6vw,14px)", fontWeight: 600, color: open ? "#fff" : "#aaa", lineHeight: 1.5, transition: "color .2s" }}>{q}</span>
        <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, background: open ? `${ORANGE}18` : "#141414", border: `1px solid ${open ? ORANGE + "50" : "#2a2a2a"}`, display: "flex", alignItems: "center", justifyContent: "center", color: open ? ORANGE : "#444", transform: open ? "rotate(45deg)" : "rotate(0)", transition: "all .25s" }}>
          <Icon name="plus" size={10} />
        </div>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height .38s cubic-bezier(.4,0,.2,1)" }}>
        <p style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "#666", lineHeight: 1.9, paddingBottom: 18, margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

const PROJECT_TYPES = [
  { v: "",             l: "Select project type…"         },
  { v: "backend",      l: "Backend / API Development"     },
  { v: "fullstack",    l: "Full-Stack Web Application"    },
  { v: "mobile",       l: "Mobile App Development"        },
  { v: "ai",           l: "AI / Machine Learning System"  },
  { v: "cv",           l: "Computer Vision Project"       },
  { v: "consultation", l: "Technical Consultation"        },
  { v: "other",        l: "Other"                         },
];

const BUDGETS = [
  { v: "",        l: "Select budget range…" },
  { v: "sub1k",   l: "Under $1,000"         },
  { v: "1k-5k",   l: "$1,000 – $5,000"      },
  { v: "5k-10k",  l: "$5,000 – $10,000"     },
  { v: "10k-25k", l: "$10,000 – $25,000"    },
  { v: "25k+",    l: "$25,000+"             },
  { v: "discuss", l: "Prefer to discuss"    },
];

const FAQS = [
  { q: "What types of projects do you take on?",        a: "I work on backend systems, full-stack web apps, mobile applications, and AI/ML systems — including REST APIs, React frontends, React Native apps, and computer vision pipelines." },
  { q: "What is your typical response time?",           a: "I respond to all enquiries within 24 hours on business days. For urgent matters, please mention it in your message and I will prioritise accordingly." },
  { q: "Are you available for remote work?",            a: "Yes — fully set up for remote collaboration across time zones. Also open to on-site engagements in Ogun State, Nigeria." },
  { q: "Do you work with international clients?",       a: "Absolutely. I work with clients globally and am comfortable with async communication, scheduled video calls, and cross-timezone project management." },
  { q: "What does your development process look like?", a: "Requirements gathering → scope definition → iterative development with regular check-ins → QA & testing → deployment and handover. I use Git throughout and provide clear documentation." },
  { q: "Do you offer post-launch support?",             a: "Yes — standard 30-day post-launch support for bug fixes is included. Ongoing maintenance and feature development can be arranged as a separate engagement." },
];

export default function Contact() {
  const w      = useWindowWidth();
  const wide   = w >= 968;
  const twoCol = w >= 560;

  const [form,    setForm]    = useState({ name: "", email: "", company: "", type: "", budget: "", message: "" });
  const [step,    setStep]    = useState(1);
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const f       = k => v => setForm(p => ({ ...p, [k]: v }));
  const step1OK = isValidName(form.name) && isValidEmail(form.email).valid && form.type;
  const step2OK = form.message.trim().length >= 10;

  const submit = async e => {
    e.preventDefault();
    if (!step2OK) return;
    setLoading(true);
    setError("");

    // Final server-side-style guard before sending
    const emailCheck = isValidEmail(form.email);
    if (!emailCheck.valid) {
      setError(emailCheck.msg);
      setLoading(false);
      return;
    }

    const projectLabel = PROJECT_TYPES.find(o => o.v === form.type)?.l || form.type;
    const budgetLabel  = BUDGETS.find(o => o.v === form.budget)?.l || "Not specified";
    try {
      // Email 1 — notify Adekoya
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          company:      form.company || "Not provided",
          project_type: projectLabel,
          budget:       budgetLabel,
          message:      form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      // Email 2 — branded auto-reply to sender
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          project_type: projectLabel,
          budget:       budgetLabel,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again or email me directly at obtech100@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSent(false); setStep(1);
    setForm({ name: "", email: "", company: "", type: "", budget: "", message: "" });
    setError("");
  };

  return (
    <PageWrapper>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn  { 0%{transform:scale(.8);opacity:0} 70%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes drift  { 0%,100%{transform:translate(0,0)} 33%{transform:translate(6px,-8px)} 66%{transform:translate(-5px,5px)} }
        ::placeholder { color: #383838; }
      `}</style>

      {/* HERO */}
      <div style={{ background: "#080808", position: "relative", overflow: "hidden", padding: "clamp(72px,10vw,120px) 0 clamp(52px,7vw,80px)" }}>
        <div style={{ position: "absolute", top: "10%", right: "8%", width: "clamp(280px,38vw,480px)", height: "clamp(280px,38vw,480px)", background: `radial-gradient(circle,${ORANGE}0A,transparent 65%)`, borderRadius: "50%", animation: "drift 8s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "5%", width: "clamp(200px,28vw,340px)", height: "clamp(200px,28vw,340px)", background: `radial-gradient(circle,${ORANGE}06,transparent 65%)`, borderRadius: "50%", animation: "drift 11s ease-in-out infinite reverse", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${ORANGE}08 1px,transparent 1px),linear-gradient(90deg,${ORANGE}08 1px,transparent 1px)`, backgroundSize: "48px 48px", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, animation: "fadeUp .5s ease forwards" }}>
            <Link to="/" style={{ fontSize: 12, color: "#3a3a3a", textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color="#888"} onMouseLeave={e => e.currentTarget.style.color="#3a3a3a"}>Home</Link>
            <span style={{ fontSize: 12, color: "#222" }}>/</span>
            <span style={{ fontSize: 12, color: ORANGE, fontWeight: 600 }}>Contact</span>
          </div>

          <div style={{ display: "flex", alignItems: wide ? "center" : "flex-start", gap: "clamp(40px,6vw,80px)", flexDirection: wide ? "row" : "column", flexWrap: "wrap" }}>

            <div style={{ flex: "1 1 300px", minWidth: 0, animation: "fadeUp .7s ease .06s both" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: ORANGE, textTransform: "uppercase", padding: "5px 14px", border: `1px solid ${ORANGE}35`, borderRadius: 99, background: `${ORANGE}0E` }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: ORANGE, animation: "pulse 2s ease infinite" }} />
                Get In Touch
              </div>
              <h1 style={{ fontSize: "clamp(32px,5.5vw,60px)", fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-0.04em", color: "#fff" }}>
                Let's Build<br /><span style={{ color: ORANGE }}>Something</span><br />Great Together.
              </h1>
              <p style={{ fontSize: "clamp(14px,1.8vw,17px)", color: "#5a5a5a", lineHeight: 1.85, maxWidth: 460, margin: "0 0 36px" }}>
                Have a project in mind? Need a backend system, AI pipeline, or full-stack application? Reach out — I respond within 24 hours.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: "mail",      label: "Email",     val: "obtech100@gmail.com",     href: "mailto:obtech100@gmail.com" },
                  { icon: "phone",     label: "Phone",     val: "+234 811 967 3231",        href: "tel:+2348119673231" },
                  { icon: "pin",       label: "Location",  val: "Ogun State, Nigeria",      href: null },
                  { icon: "clock",     label: "Response",  val: "Within 24 hours",          href: null },
                  { icon: "briefcase", label: "Available", val: "Open for new engagements", href: null },
                ].map(({ icon, label, val, href }) => {
                  const [hov, setHov] = useState(false);
                  const Tag = href ? "a" : "div";
                  return (
                    <Tag key={label} href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: hov ? `${ORANGE}0A` : "#0e0e0e", border: `1px solid ${hov ? ORANGE+"40" : "#1e1e1e"}`, borderRadius: 13, textDecoration: "none", transition: "all .22s", transform: hov ? "translateX(5px)" : "translateX(0)" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: hov ? `${ORANGE}18` : `${ORANGE}0E`, border: `1px solid ${hov ? ORANGE+"50" : ORANGE+"20"}`, display: "flex", alignItems: "center", justifyContent: "center", color: ORANGE }}>
                        <Icon name={icon} size={17} />
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#3a3a3a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: "clamp(12px,1.5vw,13px)", color: hov ? "#fff" : "#aaa", fontWeight: 600, transition: "color .22s" }}>{val}</div>
                      </div>
                    </Tag>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
                {[
                  { icon: "github",   label: "GitHub",   href: "https://github.com/OBTECH100",                                    c: "#ccc"    },
                  { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/oluwasegun-boluwatife-9103a9289",     c: "#0A66C2" },
                  { icon: "whatsapp", label: "WhatsApp", href: "https://wa.me/2348119673231",                                     c: "#25D366" },
                  { icon: "twitter",  label: "X",        href: "https://x.com/OBTECH100",                                        c: "#fff"    },
                  { icon: "mail",     label: "Email",    href: "mailto:obtech100@gmail.com",                                      c: ORANGE    },
                ].map(({ icon, label, href, c }) => {
                  const [hov, setHov] = useState(false);
                  return (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", background: hov ? `${c}12` : "#0e0e0e", border: `1px solid ${hov ? c+"50" : "#1e1e1e"}`, borderRadius: 10, color: hov ? c : "#555", textDecoration: "none", fontSize: 13, fontWeight: 600, transition: "all .22s", transform: hov ? "translateY(-2px)" : "translateY(0)" }}>
                      <span style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{I[icon]}</span>
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>

            {wide && (
              <div style={{ flex: "0 0 auto", animation: "fadeUp .7s ease .15s both" }}>
                <div style={{ background: "#0e0e0e", border: "1px solid #1e1e1e", borderRadius: 20, padding: "28px 28px 24px", width: 240, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: `radial-gradient(circle,${ORANGE}10,transparent 70%)`, pointerEvents: "none" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "8px 14px", background: "rgba(0,200,100,.07)", border: "1px solid rgba(0,200,100,.18)", borderRadius: 99 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C864", boxShadow: "0 0 10px #00C864", flexShrink: 0, animation: "pulse 2s ease infinite" }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#00C864" }}>Available Now</span>
                  </div>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg,${ORANGE}30,#1a1a1a)`, border: `2px solid ${ORANGE}`, overflow: "hidden", marginBottom: 16, boxShadow: `0 0 24px ${ORANGE}30` }}>
                    <img src="/profile.jpg" alt="Adekoya Oluwasegun" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", fontFamily: "'Space Grotesk',sans-serif", marginBottom: 4 }}>Adekoya Oluwasegun</div>
                  <div style={{ fontSize: 11, color: ORANGE, fontWeight: 600, marginBottom: 16 }}>Software Dev & AI Engineer</div>
                  {[["4+", "Years Exp."], ["6+", "Projects"], ["24h", "Response"]].map(([n, l]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #161616" }}>
                      <span style={{ fontSize: 11, color: "#555" }}>{l}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: ORANGE, fontFamily: "'Space Grotesk',sans-serif" }}>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FORM + PROCESS */}
      <div className="section-pad" style={{ background: "#080808" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: wide ? "1fr 380px" : "1fr", gap: "clamp(32px,5vw,64px)", alignItems: "start" }}>

            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 22, overflow: "hidden" }}>
              <div style={{ padding: "clamp(20px,3vw,28px) clamp(22px,3.5vw,32px)", borderBottom: "1px solid #141414", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 800, color: "#fff", margin: "0 0 3px", fontFamily: "'Space Grotesk',sans-serif" }}>
                    {sent ? "Message Received ✓" : step === 1 ? "Project Details" : "Describe Your Project"}
                  </h2>
                  <p style={{ fontSize: 11, color: "#333", margin: 0 }}>
                    {sent ? "I'll be in touch shortly." : step === 1 ? "Tell me about your project" : "The more detail, the better"}
                  </p>
                </div>
                {!sent && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {[1, 2].map((n, i) => (
                      <div key={n} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {i > 0 && <div style={{ width: 24, height: 1, background: step > 1 ? `${ORANGE}60` : "#252525", transition: "background .3s" }} />}
                        <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: step > n ? `${ORANGE}1A` : step === n ? ORANGE : "#111", border: `1px solid ${step >= n ? ORANGE : "#2a2a2a"}`, color: step === n ? "#000" : step > n ? ORANGE : "#444", fontSize: 11, fontWeight: 800, transition: "all .3s" }}>
                          {step > n ? <Icon name="check" size={12} /> : n}
                        </div>
                      </div>
                    ))}
                    <span style={{ fontSize: 10, color: "#333", marginLeft: 6 }}>Step {step} / 2</span>
                  </div>
                )}
              </div>

              <div style={{ padding: "clamp(22px,3.5vw,32px)" }}>
                {sent ? (
                  <div style={{ textAlign: "center", padding: "clamp(28px,5vw,52px) 0", animation: "popIn .5s ease forwards" }}>
                    <div style={{ width: 76, height: 76, borderRadius: "50%", background: `${ORANGE}14`, border: `2px solid ${ORANGE}50`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", color: ORANGE }}>
                      <Icon name="check" size={30} />
                    </div>
                    <h3 style={{ fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 900, color: "#fff", margin: "0 0 10px", fontFamily: "'Space Grotesk',sans-serif" }}>Message Sent!</h3>
                    <p style={{ fontSize: "clamp(13px,1.5vw,14px)", color: "#555", lineHeight: 1.8, maxWidth: 320, margin: "0 auto 28px" }}>
                      Thanks, <strong style={{ color: "#bbb" }}>{form.name.split(" ")[0]}</strong>. I've received your message and will respond within 24 hours.
                    </p>
                    <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                      <button onClick={reset} style={{ padding: "10px 20px", background: `${ORANGE}14`, border: `1px solid ${ORANGE}40`, borderRadius: 10, fontSize: 13, fontWeight: 700, color: ORANGE, cursor: "pointer" }}>Send Another</button>
                      <Link to="/projects" style={{ padding: "10px 20px", background: "#111", border: "1px solid #242424", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "#aaa", textDecoration: "none" }}>View Projects</Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submit}>
                    {step === 1 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        <div style={{ display: "grid", gridTemplateColumns: twoCol ? "1fr 1fr" : "1fr", gap: 16 }}>
                          <Input label="Full Name"     value={form.name}  onChange={f("name")}  placeholder="Adekoya Boluwatife" required />
                          <Input label="Email Address" value={form.email} onChange={f("email")} placeholder="you@example.com"    type="email" required />
                        </div>
                        <Input label="Company / Organisation" value={form.company} onChange={f("company")} placeholder="Optional — your company name" span />
                        <div style={{ display: "grid", gridTemplateColumns: twoCol ? "1fr 1fr" : "1fr", gap: 16 }}>
                          <Select label="Project Type" value={form.type}   onChange={f("type")}   options={PROJECT_TYPES} required />
                          <Select label="Budget Range" value={form.budget} onChange={f("budget")} options={BUDGETS} />
                        </div>
                        <div style={{ height: 1, background: "#161616" }} />
                        <button type="button" disabled={!step1OK} onClick={() => step1OK && setStep(2)}
                          style={{ padding: "clamp(12px,2vw,15px)", background: step1OK ? ORANGE : "#161616", border: "none", borderRadius: 13, fontSize: "clamp(13px,1.6vw,14px)", fontWeight: 800, color: step1OK ? "#000" : "#333", cursor: step1OK ? "pointer" : "not-allowed", boxShadow: step1OK ? `0 0 24px ${ORANGE}30` : "none", transition: "all .25s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                          onMouseEnter={e => { if (step1OK) { e.currentTarget.style.transform = "translateY(-2px)"; } }}
                          onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
                        >
                          Continue <Icon name="arrow" size={15} />
                        </button>
                        <p style={{ fontSize: 11, color: "#272727", textAlign: "center", margin: 0 }}>Fields marked <span style={{ color: ORANGE }}>*</span> are required to proceed.</p>
                      </div>
                    )}

                    {step === 2 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "12px 16px", background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, flexWrap: "wrap" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${ORANGE}18`, border: `1px solid ${ORANGE}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: ORANGE, flexShrink: 0 }}>
                              {form.name.slice(0, 1).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 700, color: "#ddd" }}>{form.name}</div>
                              <div style={{ fontSize: 10, color: "#444" }}>{form.email} · {PROJECT_TYPES.find(o => o.v === form.type)?.l}</div>
                            </div>
                          </div>
                          <button type="button" onClick={() => setStep(1)} style={{ fontSize: 11, fontWeight: 700, color: ORANGE, background: `${ORANGE}0E`, border: `1px solid ${ORANGE}30`, borderRadius: 7, padding: "4px 10px", cursor: "pointer" }}>Edit</button>
                        </div>

                        <Textarea label="Your Message" value={form.message} onChange={f("message")} placeholder="Describe your project, goals, timeline, and any specific requirements…" required />

                        <div style={{ height: 1, background: "#161616" }} />

                        {error && (
                          <div style={{ padding: "12px 16px", background: "#ff4d4d10", border: "1px solid #ff4d4d40", borderRadius: 11, fontSize: 13, color: "#ff6b6b", lineHeight: 1.6 }}>
                            ⚠️ {error}
                          </div>
                        )}

                        <div style={{ display: "flex", gap: 10 }}>
                          <button type="button" onClick={() => setStep(1)}
                            style={{ padding: "clamp(12px,2vw,14px) 18px", background: "transparent", border: "1px solid #222", borderRadius: 13, fontSize: 13, fontWeight: 700, color: "#555", cursor: "pointer", transition: "all .2s" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "#3a3a3a"; e.currentTarget.style.color = "#aaa"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#555"; }}
                          >← Back</button>
                          <button type="submit" disabled={loading || !step2OK}
                            style={{ flex: 1, padding: "clamp(12px,2vw,14px) 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, background: loading ? "#141414" : ORANGE, border: "none", borderRadius: 13, fontSize: "clamp(13px,1.6vw,14px)", fontWeight: 800, color: loading ? "#444" : "#000", cursor: loading || !step2OK ? "not-allowed" : "pointer", transition: "all .25s", opacity: !step2OK ? .45 : 1 }}
                            onMouseEnter={e => { if (!loading && step2OK) e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
                          >
                            {loading
                              ? <><div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #333", borderTopColor: ORANGE, animation: "spin .7s linear infinite" }} /> Sending…</>
                              : <><Icon name="send" size={15} /> Send Message</>
                            }
                          </button>
                        </div>
                        <p style={{ fontSize: 11, color: "#252525", textAlign: "center", margin: 0 }}>By submitting, your details may be used to respond to your enquiry.</p>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 18, padding: "clamp(20px,3vw,28px)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, background: `radial-gradient(circle,${ORANGE}0E,transparent 70%)`, pointerEvents: "none" }} />
                <h3 style={{ fontSize: "clamp(14px,1.8vw,16px)", fontWeight: 800, color: "#fff", margin: "0 0 20px", fontFamily: "'Space Grotesk',sans-serif" }}>What Happens Next</h3>
                {[
                  { n: "01", t: "I read your message", d: "Every enquiry reviewed personally — no auto-replies." },
                  { n: "02", t: "Response within 24h", d: "A detailed reply within one business day." },
                  { n: "03", t: "Discovery call",      d: "A short call to align on scope and goals." },
                  { n: "04", t: "Proposal & kickoff",  d: "Clear deliverables agreed before any work begins." },
                ].map(({ n, t, d }, i) => (
                  <div key={n} style={{ display: "flex", gap: 14, marginBottom: i < 3 ? 18 : 0, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: `${ORANGE}12`, border: `1px solid ${ORANGE}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: ORANGE }}>{n}</div>
                    <div>
                      <div style={{ fontSize: "clamp(12px,1.5vw,13px)", fontWeight: 700, color: "#ccc", marginBottom: 3 }}>{t}</div>
                      <div style={{ fontSize: "clamp(11px,1.3vw,12px)", color: "#444", lineHeight: 1.6 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 18, padding: "clamp(18px,2.5vw,24px)" }}>
                <h3 style={{ fontSize: "clamp(13px,1.6vw,15px)", fontWeight: 800, color: "#fff", margin: "0 0 16px", fontFamily: "'Space Grotesk',sans-serif" }}>Connect Online</h3>
                {[
                  { icon: "github",   label: "GitHub",      sub: "github.com/OBTECH100",                  href: "https://github.com/OBTECH100",                                  c: "#ddd"    },
                  { icon: "linkedin", label: "LinkedIn",    sub: "linkedin.com/in/oluwasegun-boluwatife",  href: "https://www.linkedin.com/in/oluwasegun-boluwatife-9103a9289",   c: "#0A66C2" },
                  { icon: "whatsapp", label: "WhatsApp",    sub: "+234 811 967 3231",                      href: "https://wa.me/2348119673231",                                   c: "#25D366" },
                  { icon: "twitter",  label: "X (Twitter)", sub: "x.com/OBTECH100",                       href: "https://x.com/OBTECH100",                                      c: "#fff"    },
                  { icon: "mail",     label: "Email",       sub: "obtech100@gmail.com",                    href: "mailto:obtech100@gmail.com",                                    c: ORANGE    },
                  { icon: "phone",    label: "Phone",       sub: "+234 811 967 3231",                      href: "tel:+2348119673231",                                            c: "#00C896" },
                ].map(({ icon, label, sub, href, c }) => {
                  const [hov, setHov] = useState(false);
                  return (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", marginBottom: 8, background: hov ? `${c}0E` : "#111", border: `1px solid ${hov ? c+"40" : "#1e1e1e"}`, borderRadius: 11, textDecoration: "none", transition: "all .22s", transform: hov ? "translateX(4px)" : "translateX(0)" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 9, background: hov ? `${c}18` : `${c}10`, border: `1px solid ${hov ? c+"45" : c+"20"}`, display: "flex", alignItems: "center", justifyContent: "center", color: c, flexShrink: 0, fontSize: 16 }}>
                        {I[icon]}
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: hov ? "#fff" : "#aaa" }}>{label}</div>
                        <div style={{ fontSize: 10, color: "#3a3a3a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</div>
                      </div>
                      <Icon name="arrow" size={12} />
                    </a>
                  );
                })}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "clamp(14px,2.5vw,18px)", background: "rgba(0,200,100,.05)", border: "1px solid rgba(0,200,100,.15)", borderRadius: 14 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00C864", boxShadow: "0 0 12px #00C864", flexShrink: 0, animation: "pulse 2s ease infinite" }} />
                <div>
                  <div style={{ fontSize: "clamp(12px,1.5vw,13px)", fontWeight: 700, color: "#00C864" }}>Currently Available</div>
                  <div style={{ fontSize: "clamp(10px,1.2vw,11px)", color: "#3a3a3a", marginTop: 2 }}>Open to projects, contracts &amp; collaborations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="section-pad" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: w >= 840 ? "280px 1fr" : "1fr", gap: "clamp(32px,5vw,64px)", alignItems: "start" }}>
            <div style={{ position: w >= 840 ? "sticky" : "static", top: 88 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: ORANGE, textTransform: "uppercase", padding: "4px 13px", border: `1px solid ${ORANGE}35`, borderRadius: 99, background: `${ORANGE}0E` }}>FAQ</div>
              <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, color: "#fff", margin: "0 0 12px", fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.2 }}>Frequently Asked Questions</h2>
              <p style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "#444", lineHeight: 1.8, margin: "0 0 22px" }}>Don't see your question? Email me directly.</p>
              <a href="mailto:obtech100@gmail.com"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 17px", background: `${ORANGE}0E`, border: `1px solid ${ORANGE}30`, borderRadius: 9, fontSize: 13, fontWeight: 700, color: ORANGE, textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.background = `${ORANGE}1C`}
                onMouseLeave={e => e.currentTarget.style.background = `${ORANGE}0E`}
              >
                <Icon name="mail" size={14} /> Email Me
              </a>
            </div>
            <div>
              {FAQS.map((faq, i) => <FAQ key={i} {...faq} index={i} />)}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
