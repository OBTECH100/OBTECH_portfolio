import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageWrapper, Footer, useReveal } from "../components/shared";
import { ORANGE } from "../data";

// ── Icons ──────────────────────────────────────────
const MailIcon     = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const PhoneIcon    = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.27 1h3a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const PinIcon      = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const ClockIcon    = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const GithubIcon   = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const LinkedInIcon = ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const CheckIcon    = ({ s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const SendIcon     = ({ s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const ArrowIcon    = ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const fn = () => setW(window.innerWidth); window.addEventListener("resize", fn); return () => window.removeEventListener("resize", fn); }, []);
  return w;
}

// ── Input field ────────────────────────────────────
function Field({ label, value, onChange, placeholder, type = "text", required, span }) {
  const [foc, setFoc] = useState(false);
  const [touched, setTouched] = useState(false);
  const invalid = touched && required && !value.trim();
  return (
    <div style={{ gridColumn: span ? "1 / -1" : "auto" }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: foc ? ORANGE : invalid ? "#E44D26" : "#4a4a4a", marginBottom: 8, transition: "color .2s" }}>
        {label}{required && <span style={{ color: ORANGE, marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type} value={value} placeholder={placeholder} required={required}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFoc(true)}
        onBlur={() => { setFoc(false); setTouched(true); }}
        style={{
          width: "100%", padding: "13px 16px",
          background: foc ? "#141414" : "#0f0f0f",
          border: `1px solid ${invalid ? "#E44D26" : foc ? ORANGE : "#242424"}`,
          borderRadius: 10, color: "#fff", fontSize: 14,
          outline: "none", transition: "all .2s", fontFamily: "inherit",
          boxShadow: foc ? `0 0 0 3px ${ORANGE}15` : "none",
        }}
      />
      {invalid && <p style={{ fontSize: 11, color: "#E44D26", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>Required field</p>}
    </div>
  );
}

// ── Select field ───────────────────────────────────
function SelectField({ label, value, onChange, options, required, span }) {
  const [foc, setFoc] = useState(false);
  return (
    <div style={{ gridColumn: span ? "1 / -1" : "auto" }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: foc ? ORANGE : "#4a4a4a", marginBottom: 8, transition: "color .2s" }}>
        {label}{required && <span style={{ color: ORANGE, marginLeft: 3 }}>*</span>}
      </label>
      <select value={value} onChange={e => onChange(e.target.value)} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
        style={{
          width: "100%", padding: "13px 40px 13px 16px",
          background: foc ? "#141414" : "#0f0f0f",
          border: `1px solid ${foc ? ORANGE : "#242424"}`,
          borderRadius: 10, color: value ? "#fff" : "#555", fontSize: 14,
          outline: "none", transition: "all .2s", fontFamily: "inherit",
          cursor: "pointer", appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
          boxShadow: foc ? `0 0 0 3px ${ORANGE}15` : "none",
        }}>
        {options.map(o => <option key={o.value} value={o.value} style={{ background: "#111", color: o.value ? "#fff" : "#555" }}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ── Textarea ───────────────────────────────────────
function Textarea({ label, value, onChange, placeholder, rows = 6, required }) {
  const [foc, setFoc] = useState(false);
  const [touched, setTouched] = useState(false);
  const invalid = touched && required && !value.trim();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: foc ? ORANGE : invalid ? "#E44D26" : "#4a4a4a", transition: "color .2s" }}>
          {label}{required && <span style={{ color: ORANGE, marginLeft: 3 }}>*</span>}
        </label>
        <span style={{ fontSize: 10, color: value.length > 400 ? ORANGE : "#333" }}>{value.length}/500</span>
      </div>
      <textarea value={value} rows={rows} maxLength={500} placeholder={placeholder} required={required}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFoc(true)} onBlur={() => { setFoc(false); setTouched(true); }}
        style={{
          width: "100%", padding: "13px 16px",
          background: foc ? "#141414" : "#0f0f0f",
          border: `1px solid ${invalid ? "#E44D26" : foc ? ORANGE : "#242424"}`,
          borderRadius: 10, color: "#fff", fontSize: 14,
          outline: "none", transition: "all .2s", fontFamily: "inherit",
          resize: "vertical", lineHeight: 1.75, minHeight: 140,
          boxShadow: foc ? `0 0 0 3px ${ORANGE}15` : "none",
        }}
      />
      {invalid && <p style={{ fontSize: 11, color: "#E44D26", marginTop: 5 }}>Please write your message.</p>}
    </div>
  );
}

// ── Contact info row ───────────────────────────────
function InfoRow({ icon, label, value, href, index }) {
  const [ref, vis] = useReveal(0.1);
  const [hov, setHov] = useState(false);
  const Tag = href ? "a" : "div";
  return (
    <Tag ref={ref} href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 18px",
        background: hov ? `${ORANGE}08` : "#0d0d0d",
        border: `1px solid ${hov ? ORANGE + "45" : "#1a1a1a"}`,
        borderRadius: 12, textDecoration: "none",
        transition: "all .25s",
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "translateX(4px)" : "translateX(0)") : "translateX(-18px)",
        transitionDelay: `${index * 0.07}s`,
      }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: hov ? `${ORANGE}18` : `${ORANGE}10`, border: `1px solid ${hov ? ORANGE + "50" : ORANGE + "25"}`, display: "flex", alignItems: "center", justifyContent: "center", color: ORANGE, transition: "all .25s" }}>
        {icon}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#3a3a3a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: "clamp(12px,1.5vw,13px)", color: hov ? "#fff" : "#aaa", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color .25s" }}>{value}</div>
      </div>
      {href && <ArrowIcon s={13} />}
    </Tag>
  );
}

// ── FAQ accordion ──────────────────────────────────
function FAQ({ q, a, index }) {
  const [open, setOpen] = useState(false);
  const [ref, vis] = useReveal(0.08);
  return (
    <div ref={ref} style={{ borderBottom: "1px solid #161616", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: `all .5s ease ${index * 0.07}s` }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "clamp(14px,2vw,18px) 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontSize: "clamp(13px,1.6vw,14px)", fontWeight: 700, color: open ? ORANGE : "#ccc", lineHeight: 1.4, transition: "color .2s" }}>{q}</span>
        <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, border: `1px solid ${open ? ORANGE + "50" : "#242424"}`, background: open ? `${ORANGE}12` : "#111", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s", transform: open ? "rotate(45deg)" : "rotate(0)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={open ? ORANGE : "#555"} strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
        <p style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "#666", lineHeight: 1.85, paddingBottom: "clamp(14px,2vw,18px)", margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

// ── Data ───────────────────────────────────────────
const PROJECT_TYPES = [
  { value: "",             label: "Select a project type…"       },
  { value: "backend",      label: "Backend / API Development"     },
  { value: "fullstack",    label: "Full-Stack Web Application"    },
  { value: "mobile",       label: "Mobile App (React Native)"     },
  { value: "ai",           label: "AI / Machine Learning System"  },
  { value: "cv",           label: "Computer Vision Project"       },
  { value: "consultation", label: "Technical Consultation"        },
  { value: "other",        label: "Other"                         },
];

const BUDGETS = [
  { value: "",         label: "Select budget range…"   },
  { value: "sub1k",    label: "Under $1,000"           },
  { value: "1k-5k",    label: "$1,000 – $5,000"        },
  { value: "5k-10k",   label: "$5,000 – $10,000"       },
  { value: "10k-25k",  label: "$10,000 – $25,000"      },
  { value: "25k+",     label: "$25,000+"               },
  { value: "discuss",  label: "Prefer to discuss"      },
];

const FAQS = [
  { q: "What types of projects do you take on?",   a: "I work on backend systems, full-stack web applications, mobile apps, and AI/ML systems — including REST API development, database architecture, React frontends, React Native mobile apps, and computer vision pipelines." },
  { q: "What is your typical response time?",      a: "I respond to all enquiries within 24 hours on business days. For urgent matters, please mention it in the subject and I will prioritise accordingly." },
  { q: "Are you available for remote work?",       a: "Yes — I am fully set up for remote work and collaborate comfortably across time zones. I am also open to on-site engagements in Lagos, Nigeria." },
  { q: "Do you work with international clients?",  a: "Absolutely. I work with clients globally and am comfortable with async communication, scheduled video calls, and cross-timezone project management." },
  { q: "What does your development process look like?", a: "My process: requirements gathering → scope definition → iterative development with regular check-ins → QA and testing → deployment and handover. I use Git throughout and provide clear documentation." },
  { q: "Do you offer post-launch support?",        a: "Yes. I offer a standard 30-day post-launch support period for bug fixes. Ongoing maintenance and feature development can be arranged as a separate engagement." },
];

// ══════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════
export default function Contact() {
  const w = useWindowWidth();
  const wide = w >= 960;
  const twoColForm = w >= 560;

  const [form, setForm]     = useState({ name:"", email:"", company:"", type:"", budget:"", message:"" });
  const [step, setStep]     = useState(1);
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const set = k => v => setForm(p => ({ ...p, [k]: v }));

  const step1Valid = form.name.trim() && form.email.trim() && form.type;
  const step2Valid = form.message.trim();

  const handleSubmit = e => {
    e.preventDefault();
    if (!step2Valid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1600);
  };

  return (
    <PageWrapper>
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn   { 0%{transform:scale(.85)} 60%{transform:scale(1.06)} 100%{transform:scale(1)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={{ background:"#0a0a0a", position:"relative", overflow:"hidden", padding:"clamp(64px,9vw,108px) 0 clamp(40px,6vw,60px)" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(255,107,0,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,.025) 1px,transparent 1px)`, backgroundSize:"60px 60px" }} />
        <div style={{ position:"absolute", top:"-12%", right:"-6%", width:"48vw", height:"48vw", background:`radial-gradient(circle,${ORANGE}08,transparent 60%)`, pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-18%", left:"-4%", width:"34vw", height:"34vw", background:`radial-gradient(circle,${ORANGE}05,transparent 60%)`, pointerEvents:"none" }} />

        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:22, animation:"fadeUp .5s ease forwards" }}>
            <Link to="/" style={{ fontSize:12, color:"#3a3a3a", textDecoration:"none" }}>Home</Link>
            <span style={{ fontSize:12, color:"#222" }}>/</span>
            <span style={{ fontSize:12, color:ORANGE, fontWeight:600 }}>Contact</span>
          </div>

          <div style={{ animation:"fadeUp .65s ease .06s both" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:18, fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:ORANGE, textTransform:"uppercase", padding:"4px 14px", border:`1px solid ${ORANGE}40`, borderRadius:99, background:`${ORANGE}10` }}>
              Get In Touch
            </div>
            <h1 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, fontFamily:"'Space Grotesk',sans-serif", lineHeight:1.1, margin:"0 0 18px", letterSpacing:"-0.03em", color:"#fff" }}>
              Let's Build Something<br/>
              <span style={{ color:ORANGE }}>Remarkable Together.</span>
            </h1>
            <p style={{ fontSize:"clamp(14px,1.8vw,16px)", color:"#666", lineHeight:1.85, maxWidth:520, margin:"0 0 28px" }}>
              Whether you have a project in mind, need technical consultation, or want to discuss a collaboration — I'm here. Fill in the form and I'll respond within 24 hours.
            </p>
            {/* Availability pill */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"9px 18px", background:"rgba(0,200,100,.07)", border:"1px solid rgba(0,200,100,.2)", borderRadius:99 }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#00C864", boxShadow:"0 0 10px #00C864", flexShrink:0, animation:"blink 2s ease infinite" }} />
              <span style={{ fontSize:"clamp(12px,1.5vw,13px)", fontWeight:700, color:"#00C864" }}>Currently available for new engagements</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <div className="section-pad" style={{ background:"#0a0a0a" }}>
        <div className="container">
          <div style={{ display:"grid", gridTemplateColumns: wide ? "380px 1fr" : "1fr", gap:"clamp(32px,5vw,60px)", alignItems:"start" }}>

            {/* ── LEFT PANEL ── */}
            <div style={{ display:"flex", flexDirection:"column", gap:32 }}>

              {/* Contact details */}
              <div>
                <h2 style={{ fontSize:"clamp(15px,1.9vw,18px)", fontWeight:800, color:"#fff", margin:"0 0 18px", fontFamily:"'Space Grotesk',sans-serif", display:"flex", alignItems:"center", gap:9 }}>
                  <span style={{ width:3, height:16, background:ORANGE, display:"inline-block", borderRadius:99, flexShrink:0 }} />
                  Contact Information
                </h2>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  <InfoRow icon={<MailIcon  s={17}/>} label="Email"     value="adekoyaboluwatife@gmail.com" href="mailto:adekoyaboluwatife@gmail.com" index={0} />
                  <InfoRow icon={<PinIcon   s={17}/>} label="Location"  value="Lagos, Nigeria"              href={null}                               index={1} />
                  <InfoRow icon={<ClockIcon s={17}/>} label="Response"  value="Within 24 business hours"   href={null}                               index={2} />
                  <InfoRow icon={<PhoneIcon s={17}/>} label="Available" value="Remote & On-site (Lagos)"   href={null}                               index={3} />
                </div>
              </div>

              {/* Social profiles */}
              <div>
                <h2 style={{ fontSize:"clamp(15px,1.9vw,18px)", fontWeight:800, color:"#fff", margin:"0 0 16px", fontFamily:"'Space Grotesk',sans-serif", display:"flex", alignItems:"center", gap:9 }}>
                  <span style={{ width:3, height:16, background:ORANGE, display:"inline-block", borderRadius:99, flexShrink:0 }} />
                  Professional Profiles
                </h2>
                {[
                  { icon:<GithubIcon s={16}/>,   label:"GitHub",   sub:"github.com/obtech",        href:"https://github.com",   c:"#ccc"    },
                  { icon:<LinkedInIcon s={16}/>,  label:"LinkedIn", sub:"linkedin.com/in/obtech",   href:"https://linkedin.com", c:"#0A66C2" },
                  { icon:<MailIcon s={16}/>,      label:"Email",    sub:"adekoyaboluwatife@gmail.com", href:"mailto:adekoyaboluwatife@gmail.com", c:ORANGE },
                ].map(({ icon, label, sub, href, c }) => {
                  const [hov, setHov] = useState(false);
                  return (
                    <a key={label} href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                      style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", marginBottom:8, background: hov?`${c}10`:"#0d0d0d", border:`1px solid ${hov?c+"50":"#1a1a1a"}`, borderRadius:11, textDecoration:"none", transition:"all .22s", transform: hov?"translateY(-2px)":"translateY(0)", boxShadow: hov?`0 6px 18px ${c}18`:"none" }}>
                      <div style={{ width:36, height:36, borderRadius:9, background: hov?`${c}20`:`${c}12`, border:`1px solid ${hov?c+"50":c+"25"}`, display:"flex", alignItems:"center", justifyContent:"center", color:c, flexShrink:0, transition:"all .22s" }}>{icon}</div>
                      <div style={{ minWidth:0 }}>
                        <div style={{ fontSize:11, color: hov?"#fff":"#aaa", fontWeight:700, transition:"color .22s" }}>{label}</div>
                        <div style={{ fontSize:10, color:"#3a3a3a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{sub}</div>
                      </div>
                      <ArrowIcon s={13} />
                    </a>
                  );
                })}
              </div>

              {/* Process steps */}
              <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:16, padding:"clamp(18px,2.5vw,24px)", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-24, right:-24, width:100, height:100, background:`radial-gradient(circle,${ORANGE}12,transparent 70%)`, pointerEvents:"none" }} />
                <h3 style={{ fontSize:"clamp(13px,1.6vw,15px)", fontWeight:800, color:"#fff", margin:"0 0 18px", fontFamily:"'Space Grotesk',sans-serif" }}>What Happens Next</h3>
                {[
                  { n:"01", t:"I read your message",    d:"Every enquiry is reviewed personally." },
                  { n:"02", t:"Response within 24h",    d:"A detailed reply within one business day." },
                  { n:"03", t:"Discovery call",         d:"A short call to align on scope and goals." },
                  { n:"04", t:"Proposal & kickoff",     d:"Clear deliverables before any work begins." },
                ].map(({ n, t, d }) => (
                  <div key={n} style={{ display:"flex", gap:12, marginBottom:14, alignItems:"flex-start" }}>
                    <div style={{ width:26, height:26, borderRadius:"50%", flexShrink:0, background:`${ORANGE}14`, border:`1px solid ${ORANGE}35`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:ORANGE }}>{n}</div>
                    <div>
                      <div style={{ fontSize:"clamp(12px,1.4vw,13px)", fontWeight:700, color:"#ccc", marginBottom:2 }}>{t}</div>
                      <div style={{ fontSize:"clamp(11px,1.2vw,12px)", color:"#444", lineHeight:1.55 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT PANEL — Form ── */}
            <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:20, overflow:"hidden" }}>

              {/* Form header */}
              <div style={{ padding:"clamp(18px,2.8vw,26px) clamp(20px,3vw,32px)", borderBottom:"1px solid #141414", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, background:"#0a0a0a" }}>
                <div>
                  <h2 style={{ fontSize:"clamp(15px,2vw,19px)", fontWeight:800, color:"#fff", margin:"0 0 3px", fontFamily:"'Space Grotesk',sans-serif" }}>
                    {sent ? "Message Received" : step === 1 ? "Project Details" : "Your Message"}
                  </h2>
                  <p style={{ fontSize:11, color:"#3a3a3a", margin:0 }}>
                    {sent ? "I'll be in touch shortly." : step === 1 ? "Tell me about your project" : "Describe what you need"}
                  </p>
                </div>

                {/* Step indicator */}
                {!sent && (
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    {[1,2].map((n,i) => (
                      <div key={n} style={{ display:"flex", alignItems:"center", gap:6 }}>
                        {i > 0 && <div style={{ width:22, height:1, background: step > 1 ? ORANGE+"60" : "#222" }} />}
                        <div style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .3s", background: step > n ? `${ORANGE}20` : step === n ? ORANGE : "#111", border:`1px solid ${step >= n ? ORANGE : "#2a2a2a"}` }}>
                          {step > n
                            ? <CheckIcon s={13} />
                            : <span style={{ fontSize:11, fontWeight:800, color: step === n ? "#000" : "#444" }}>{n}</span>
                          }
                        </div>
                      </div>
                    ))}
                    <span style={{ fontSize:10, color:"#444", marginLeft:4 }}>Step {step} of 2</span>
                  </div>
                )}
              </div>

              {/* Form body */}
              <div style={{ padding:"clamp(20px,3vw,32px)" }}>

                {/* ── SUCCESS ── */}
                {sent ? (
                  <div style={{ textAlign:"center", padding:"clamp(28px,5vw,52px) 0", animation:"popIn .5s ease forwards" }}>
                    <div style={{ width:72, height:72, borderRadius:"50%", background:`${ORANGE}16`, border:`2px solid ${ORANGE}55`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 22px", boxShadow:`0 0 32px ${ORANGE}28`, color:ORANGE }}>
                      <CheckIcon s={28} />
                    </div>
                    <h3 style={{ fontSize:"clamp(18px,2.5vw,22px)", fontWeight:900, color:"#fff", margin:"0 0 10px", fontFamily:"'Space Grotesk',sans-serif" }}>Message Sent!</h3>
                    <p style={{ fontSize:"clamp(13px,1.5vw,14px)", color:"#666", lineHeight:1.75, maxWidth:320, margin:"0 auto 28px" }}>
                      Thank you, <strong style={{ color:"#aaa" }}>{form.name.split(" ")[0]}</strong>. I've received your message and will respond within 24 hours.
                    </p>
                    <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                      <button onClick={() => { setSent(false); setStep(1); setForm({ name:"",email:"",company:"",type:"",budget:"",message:"" }); }}
                        style={{ padding:"9px 20px", background:`${ORANGE}14`, border:`1px solid ${ORANGE}45`, borderRadius:9, fontSize:13, fontWeight:700, color:ORANGE, cursor:"pointer" }}>
                        Send Another
                      </button>
                      <Link to="/projects" style={{ padding:"9px 20px", background:"#111", border:"1px solid #242424", borderRadius:9, fontSize:13, fontWeight:700, color:"#aaa", textDecoration:"none" }}>
                        View Projects
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>

                    {/* ── STEP 1 ── */}
                    {step === 1 && (
                      <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                        <div style={{ display:"grid", gridTemplateColumns: twoColForm ? "1fr 1fr" : "1fr", gap:16 }}>
                          <Field label="Full Name"     value={form.name}    onChange={set("name")}    placeholder="Adekoya Boluwatife"     required />
                          <Field label="Email Address" value={form.email}   onChange={set("email")}   placeholder="you@example.com"        type="email" required />
                        </div>
                        <Field label="Company / Organisation" value={form.company} onChange={set("company")} placeholder="Your company (optional)" span />
                        <div style={{ display:"grid", gridTemplateColumns: twoColForm ? "1fr 1fr" : "1fr", gap:16 }}>
                          <SelectField label="Project Type"  value={form.type}   onChange={set("type")}   options={PROJECT_TYPES} required />
                          <SelectField label="Budget Range"  value={form.budget} onChange={set("budget")} options={BUDGETS} />
                        </div>

                        {/* Divider */}
                        <div style={{ height:1, background:"#161616", margin:"4px 0" }} />

                        <button type="button" disabled={!step1Valid}
                          onClick={() => step1Valid && setStep(2)}
                          style={{ padding:"clamp(12px,2vw,14px)", background: step1Valid ? ORANGE : "#1a1a1a", border:"none", borderRadius:11, fontSize:"clamp(13px,1.6vw,14px)", fontWeight:700, color: step1Valid ? "#000" : "#444", cursor: step1Valid ? "pointer" : "not-allowed", boxShadow: step1Valid ? `0 0 20px ${ORANGE}35` : "none", transition:"all .25s", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
                          onMouseEnter={e => { if (step1Valid) { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${ORANGE}50`; }}}
                          onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=step1Valid?`0 0 20px ${ORANGE}35`:"none"; }}
                        >
                          Continue <ArrowIcon s={15} />
                        </button>
                        <p style={{ fontSize:11, color:"#2e2e2e", textAlign:"center", margin:0 }}>Fields marked <span style={{ color:ORANGE }}>*</span> are required to proceed.</p>
                      </div>
                    )}

                    {/* ── STEP 2 ── */}
                    {step === 2 && (
                      <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                        {/* Summary pill */}
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", background:"#111", border:"1px solid #1e1e1e", borderRadius:10, flexWrap:"wrap", gap:8 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <div style={{ width:32, height:32, borderRadius:"50%", background:`${ORANGE}18`, border:`1px solid ${ORANGE}35`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:ORANGE, fontWeight:800, flexShrink:0 }}>
                              {form.name.slice(0,1).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{form.name}</div>
                              <div style={{ fontSize:10, color:"#444" }}>{form.email} · {PROJECT_TYPES.find(o => o.value === form.type)?.label}</div>
                            </div>
                          </div>
                          <button type="button" onClick={() => setStep(1)} style={{ fontSize:11, fontWeight:700, color:ORANGE, background:`${ORANGE}10`, border:`1px solid ${ORANGE}35`, borderRadius:7, padding:"4px 10px", cursor:"pointer" }}>
                            Edit details
                          </button>
                        </div>

                        <Textarea label="Your Message" value={form.message} onChange={set("message")} placeholder="Describe your project, goals, timeline, and any specific requirements…" rows={7} required />

                        <div style={{ height:1, background:"#161616" }} />

                        <div style={{ display:"flex", gap:10 }}>
                          <button type="button" onClick={() => setStep(1)}
                            style={{ padding:"clamp(11px,1.8vw,13px) 18px", background:"transparent", border:"1px solid #222", borderRadius:11, fontSize:13, fontWeight:700, color:"#555", cursor:"pointer", transition:"all .2s" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor="#3a3a3a"; e.currentTarget.style.color="#aaa"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor="#222"; e.currentTarget.style.color="#555"; }}
                          >← Back</button>

                          <button type="submit" disabled={loading || !step2Valid}
                            style={{ flex:1, padding:"clamp(11px,1.8vw,13px) 20px", display:"flex", alignItems:"center", justifyContent:"center", gap:9, background: loading ? "#141414" : ORANGE, border:"none", borderRadius:11, fontSize:"clamp(13px,1.6vw,14px)", fontWeight:700, color: loading ? "#555" : "#000", cursor: loading || !step2Valid ? "not-allowed" : "pointer", boxShadow: loading ? "none" : `0 0 20px ${ORANGE}35`, transition:"all .2s", opacity: !step2Valid ? 0.5 : 1 }}
                            onMouseEnter={e => { if (!loading && step2Valid) { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${ORANGE}50`; }}}
                            onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=loading?"none":`0 0 20px ${ORANGE}35`; }}
                          >
                            {loading
                              ? <><div style={{ width:16, height:16, borderRadius:"50%", border:`2px solid #333`, borderTopColor:ORANGE, animation:"spin .7s linear infinite" }} /> Sending…</>
                              : <><SendIcon s={15} /> Send Message</>
                            }
                          </button>
                        </div>

                        <p style={{ fontSize:11, color:"#2a2a2a", textAlign:"center", margin:0, lineHeight:1.6 }}>
                          By submitting, you agree your details may be used to respond to your enquiry.
                        </p>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ FAQ ══ */}
      <div className="section-pad" style={{ background:"#0d0d0d" }}>
        <div className="container">
          <div style={{ display:"grid", gridTemplateColumns: w >= 840 ? "300px 1fr" : "1fr", gap:"clamp(32px,5vw,64px)", alignItems:"start" }}>

            {/* Left sticky heading */}
            <div style={{ position: w >= 840 ? "sticky" : "static", top:88 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14, fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:ORANGE, textTransform:"uppercase", padding:"4px 14px", border:`1px solid ${ORANGE}40`, borderRadius:99, background:`${ORANGE}10` }}>FAQ</div>
              <h2 style={{ fontSize:"clamp(20px,3vw,30px)", fontWeight:900, color:"#fff", margin:"0 0 12px", fontFamily:"'Space Grotesk',sans-serif", lineHeight:1.2 }}>Frequently Asked Questions</h2>
              <p style={{ fontSize:"clamp(12px,1.5vw,14px)", color:"#555", lineHeight:1.8, margin:"0 0 22px" }}>
                Don't see your question? Send me a direct email.
              </p>
              <a href="mailto:adekoyaboluwatife@gmail.com"
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"9px 18px", background:`${ORANGE}10`, border:`1px solid ${ORANGE}35`, borderRadius:9, fontSize:13, fontWeight:700, color:ORANGE, textDecoration:"none", transition:"all .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = `${ORANGE}20`}
                onMouseLeave={e => e.currentTarget.style.background = `${ORANGE}10`}
              ><MailIcon s={14} /> Email Me</a>
            </div>

            {/* Right accordion */}
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
