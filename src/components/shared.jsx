import { useRef, useState, useEffect } from "react";
import { ORANGE } from "../data";

export const GearIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
export const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
export const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
export const MailIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
export const ExternalLinkIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
export const MenuIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
export const CloseIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6"  y1="6" x2="18" y2="18"/>
  </svg>
);

export function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return w;
}

export function PageWrapper({ children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 30); }, []);
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      minHeight: "calc(100vh - 64px)",
      paddingTop: 64,
    }}>{children}</div>
  );
}

export function SectionHeading({ label, title, align = "center" }) {
  return (
    <div style={{ textAlign: align, marginBottom: "clamp(32px,5vw,56px)" }}>
      <span style={{
        display: "inline-block", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.2em", textTransform: "uppercase", color: ORANGE,
        marginBottom: 12, padding: "4px 14px",
        border: `1px solid ${ORANGE}40`, borderRadius: 99, background: `${ORANGE}10`,
      }}>{label}</span>
      <h2 style={{
        fontSize: "clamp(22px,4vw,44px)", fontWeight: 800, color: "#fff",
        margin: 0, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.15,
      }}>{title}</h2>
      <div style={{
        width: 48, height: 3,
        background: `linear-gradient(90deg,${ORANGE},transparent)`,
        margin: align === "center" ? "16px auto 0" : "16px 0 0", borderRadius: 99,
      }} />
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "Home",     href: "/" },
    { label: "About",    href: "/about" },
    { label: "Skills",   href: "/skills" },
    { label: "Projects", href: "/projects" },
    { label: "Journey",  href: "/journey" },
    { label: "Contact",  href: "/contact" },
  ];

  const services = [
    "Backend Engineering",
    "Frontend Development",
    "Mobile Applications",
    "AI & Machine Learning",
    "Computer Vision",
    "System Architecture",
  ];

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:adekoyaboluwatife@gmail.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
  ];

  return (
    <footer style={{ background: "#080808", borderTop: "1px solid #161616", position: "relative", overflow: "hidden" }}>

      {/* Top glow line */}
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${ORANGE}60, transparent)` }} />

      {/* Ambient background glow */}
      <div style={{ position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "40vw", background: `radial-gradient(circle, ${ORANGE}06, transparent 65%)`, pointerEvents: "none" }} />

      {/* ── Main grid ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(48px,7vw,80px) clamp(16px,4vw,24px) 0", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(32px,5vw,48px)", marginBottom: "clamp(40px,6vw,64px)" }}>

          {/* ── Brand column ── */}
          <div style={{ gridColumn: "span 1" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${ORANGE}50`, flexShrink: 0 }}>
                <GearIcon size={20} />
              </div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: 20, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  <span style={{ color: ORANGE }}>OB</span><span style={{ color: "#fff" }}>TECH</span>
                </div>
                <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 3 }}>Innovate and Dominate</div>
              </div>
            </div>

            <p style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "#555", lineHeight: 1.8, margin: "0 0 24px", maxWidth: 260 }}>
              Building scalable software, AI-powered systems, and modern digital solutions that create real-world impact.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map(({ label, href, icon }) => (
                <a key={label} href={href} title={label}
                  style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid #1e1e1e", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", textDecoration: "none", transition: "all .2s", flexShrink: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE; e.currentTarget.style.background = `${ORANGE}12`; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 6px 16px ${ORANGE}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.color = "#555"; e.currentTarget.style.background = "#111"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* ── Navigation column ── */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: "#fff", margin: "0 0 20px", letterSpacing: "0.16em", textTransform: "uppercase" }}>Navigation</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                    style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "#555", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = ORANGE; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.transform = ""; }}
                  >
                    <span style={{ width: 5, height: 1, background: "currentColor", flexShrink: 0, opacity: .5 }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services column ── */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: "#fff", margin: "0 0 20px", letterSpacing: "0.16em", textTransform: "uppercase" }}>Services</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {services.map(s => (
                <li key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: ORANGE, flexShrink: 0, opacity: .6 }} />
                  <span style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "#555" }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ── */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: "#fff", margin: "0 0 20px", letterSpacing: "0.16em", textTransform: "uppercase" }}>Get In Touch</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "📍", label: "Location",  val: "Lagos, Nigeria" },
                { icon: "📧", label: "Email",     val: "adekoyaboluwatife@gmail.com" },
                { icon: "💼", label: "Status",    val: "Open to Engagements" },
                { icon: "⚡", label: "Response",  val: "Within 24 hours" },
              ].map(({ icon, label, val }) => (
                <div key={label} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 9, color: "#3a3a3a", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: "clamp(11px,1.4vw,12px)", color: "#666", lineHeight: 1.4 }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, padding: "9px 18px", background: ORANGE, color: "#000", borderRadius: 9, fontSize: 12, fontWeight: 700, textDecoration: "none", boxShadow: `0 0 16px ${ORANGE}40`, transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 22px ${ORANGE}55`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 0 16px ${ORANGE}40`; }}
            >
              Hire Me →
            </a>
          </div>

        </div>

        {/* ── Availability banner ── */}
        <div style={{ borderTop: "1px solid #141414", borderBottom: "1px solid #141414", padding: "clamp(14px,2.5vw,20px) 0", marginBottom: "clamp(20px,3vw,28px)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C864", boxShadow: "0 0 10px #00C864", flexShrink: 0, animation: "blink 2s ease infinite" }} />
            <span style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "#00C864", fontWeight: 700 }}>Currently available for new projects and collaborations</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Full-Stack", "AI Engineering", "Backend", "Mobile"].map(t => (
              <span key={t} style={{ fontSize: 10, fontWeight: 700, color: ORANGE, background: `${ORANGE}12`, border: `1px solid ${ORANGE}30`, borderRadius: 99, padding: "3px 10px", letterSpacing: "0.06em" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingBottom: "clamp(24px,4vw,36px)" }}>
          <p style={{ fontSize: "clamp(11px,1.3vw,12px)", color: "#2e2e2e", margin: 0 }}>
            © {year} <span style={{ color: "#444" }}>Adekoya Oluwasegun Boluwatife</span> · All rights reserved.
          </p>
          <p style={{ fontSize: "clamp(10px,1.2vw,11px)", color: "#2e2e2e", margin: 0 }}>
            Built with <span style={{ color: ORANGE }}>React</span> · Designed by <span style={{ color: ORANGE }}>OBTECH</span>
          </p>
        </div>

      </div>
    </footer>
  );
}

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0a0a0a; color: #fff; font-family: 'DM Sans','Segoe UI',sans-serif; overflow-x: hidden; }
  img  { max-width: 100%; display: block; }
  ::selection { background: rgba(255,107,0,0.3); color: #fff; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #FF6B00; border-radius: 99px; }

  @keyframes floatUp   { 0%{opacity:0;transform:translateY(0) rotate(0deg)} 20%{opacity:.5} 80%{opacity:.3} 100%{opacity:0;transform:translateY(-70px) rotate(12deg)} }
  @keyframes pulse-ring{ 0%{transform:scale(1);opacity:.5} 100%{transform:scale(1.55);opacity:0} }
  @keyframes spin-slow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fade-up    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slide-down { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }

  /* ── Layout helpers ── */
  .container { max-width: 1100px; margin: 0 auto; padding: 0 clamp(16px,4vw,24px); }
  .section-pad { padding: clamp(48px,8vw,80px) 0; }

  /* Hero */
  .hero-inner { display:flex; align-items:center; gap:clamp(32px,5vw,64px); flex-wrap:wrap; justify-content:space-between; }
  .hero-text   { flex:1 1 300px; min-width:0; }
  .hero-avatar { flex:0 0 auto; }
  .cta-row    { display:flex; gap:10px; flex-wrap:wrap; margin-top:28px; }
  .stat-row   { display:flex; gap:clamp(20px,4vw,36px); flex-wrap:wrap; margin-top:36px; }
  .social-row { display:flex; gap:10px; margin-top:28px; flex-wrap:wrap; }

  @media(max-width:768px){
    .hero-inner  { flex-direction:column-reverse; align-items:center; text-align:center; }
    .hero-text   { display:flex; flex-direction:column; align-items:center; }
    .hero-avatar { margin-bottom:8px; }
    .cta-row, .stat-row, .social-row { justify-content:center; }
  }

  /* About */
  .about-flex { display:flex; gap:clamp(32px,5vw,56px); align-items:flex-start; flex-wrap:wrap; }
  .about-image-col { flex:0 1 300px; width:100%; }
  .about-text-col  { flex:1 1 320px; min-width:0; }
  @media(max-width:768px){
    .about-flex { flex-direction:column; align-items:center; }
    .about-image-col { max-width:280px; }
    .about-text-col  { text-align:center; }
    .about-text-col .tag-row { justify-content:center; }
  }

  /* Skills */
  .skill-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:12px; }
  @media(max-width:480px){ .skill-grid { grid-template-columns:repeat(2,1fr); } }

  /* Projects */
  .project-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); gap:22px; }
  @media(max-width:640px){ .project-grid { grid-template-columns:1fr; } }

  /* Timeline */
  .tl-wrap { position:relative; max-width:800px; margin:0 auto; }
  .tl-line { position:absolute; left:50%; top:0; bottom:0; width:2px; transform:translateX(-50%); background:linear-gradient(180deg,transparent,#FF6B0060 20%,#FF6B0060 80%,transparent); }
  .tl-item { display:flex; margin-bottom:40px; position:relative; }
  .tl-item.left  { justify-content:flex-end;   padding-right:calc(50% + 32px); }
  .tl-item.right { justify-content:flex-start; padding-left: calc(50% + 32px); }
  .tl-dot { position:absolute; left:50%; top:22px; transform:translateX(-50%); width:14px; height:14px; border-radius:50%; z-index:2; }
  @media(max-width:600px){
    .tl-line { left:18px; }
    .tl-item.left, .tl-item.right { padding-left:52px !important; padding-right:0 !important; justify-content:flex-start !important; }
    .tl-dot  { left:12px !important; transform:none !important; }
  }

  /* Contact */
  .contact-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:48px; align-items:start; }
  @media(max-width:860px){ .contact-grid { grid-template-columns:1fr; gap:32px; } }
  .form-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:500px){ .form-row-2 { grid-template-columns:1fr; } }

  /* Stats grid */
  .stats-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:14px; }

  /* Values grid */
  .values-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:18px; }

  /* Filter row */
  .filter-row { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:40px; }

  /* Nav */
  .nav-desktop { display:flex; align-items:center; gap:4px; }
  .nav-mobile-btn { display:none; background:none; border:none; color:#fff; cursor:pointer; padding:4px; }
  @media(max-width:820px){
    .nav-desktop    { display:none !important; }
    .nav-mobile-btn { display:flex !important; }
  }
`;
