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
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const year  = new Date().getFullYear();
  const isMob = w < 640;
  const isMid = w < 900;

  // ── Real SVG icons ──────────────────────────────
  const GH  = <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
  const LI  = <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
  const WA  = <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
  const XI  = <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
  const ML  = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  const PIN = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  const PHN = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.27 1h3a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  const CLK = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
  const BRF = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;

  const socials = [
    { label:"GitHub",   href:"https://github.com/OBTECH100",                                      icon:GH,  color:"#ccc"    },
    { label:"LinkedIn", href:"https://www.linkedin.com/in/oluwasegun-boluwatife-9103a9289",        icon:LI,  color:"#0A66C2" },
    { label:"WhatsApp", href:"https://wa.me/2348119673231",                                         icon:WA,  color:"#25D366" },
    { label:"X",        href:"https://x.com/OBTECH100",                                            icon:XI,  color:"#fff"    },
    { label:"Email",    href:"mailto:obtech100@gmail.com",                                          icon:ML,  color:ORANGE    },
  ];

  const navLinks = [
    { label:"Home",     href:"/"         },
    { label:"About",    href:"/about"    },
    { label:"Skills",   href:"/skills"   },
    { label:"Projects", href:"/projects" },
    { label:"Contact",  href:"/contact"  },
  ];

  const services = [
    "Backend Engineering",
    "Frontend Development",
    "Mobile Applications",
    "AI & Machine Learning",
    "Computer Vision",
    "System Architecture",
  ];

  const contacts = [
    { icon:PIN, label:"Location",  val:"Ogun State, Nigeria",          href:null },
    { icon:ML,  label:"Email",     val:"obtech100@gmail.com",      href:"mailto:obtech100@gmail.com" },
    { icon:PHN, label:"Phone",     val:"+234 811 967 3231",        href:"tel:+2348119673231" },
    { icon:WA,  label:"WhatsApp",  val:"Chat on WhatsApp",         href:"https://wa.me/2348119673231" },
    { icon:BRF, label:"Available", val:"Open to Engagements",      href:null },
    { icon:CLK, label:"Response",  val:"Within 24 hours",          href:null },
  ];

  return (
    <footer style={{ background:"#080808", borderTop:"1px solid #161616", position:"relative", overflow:"hidden" }}>

      {/* Top orange glow line */}
      <div style={{ position:"absolute", top:0, left:"8%", right:"8%", height:1,
        background:`linear-gradient(90deg,transparent,${ORANGE}70,transparent)` }} />

      {/* Background glow orb */}
      <div style={{ position:"absolute", bottom:"-15%", left:"50%", transform:"translateX(-50%)",
        width:"55vw", height:"40vw",
        background:`radial-gradient(circle,${ORANGE}07,transparent 65%)`,
        pointerEvents:"none" }} />

      <div style={{ maxWidth:1120, margin:"0 auto",
        padding:`clamp(44px,6vw,72px) clamp(18px,4vw,24px) 0`,
        position:"relative", zIndex:1 }}>

        {/* ── 4-column grid ── */}
        <div style={{
          display:"grid",
          gridTemplateColumns: isMob
            ? "1fr"
            : isMid
            ? "1fr 1fr"
            : "1.6fr 1fr 1fr 1.4fr",
          gap: isMob ? "clamp(32px,6vw,44px)" : "clamp(28px,4vw,48px)",
          marginBottom:"clamp(36px,5vw,52px)",
        }}>

          {/* ── Col 1: Brand ── */}
          <div>
            {/* Logo */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
              <div style={{ width:46, height:46, borderRadius:"50%", background:ORANGE,
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:`0 0 22px ${ORANGE}55`, flexShrink:0 }}>
                <GearIcon size={22} />
              </div>
              <div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900,
                  fontSize:21, letterSpacing:"-0.03em", lineHeight:1 }}>
                  <span style={{ color:ORANGE }}>OB</span>
                  <span style={{ color:"#fff" }}>TECH</span>
                </div>
                <div style={{ fontSize:9, color:"#555", letterSpacing:"0.18em",
                  textTransform:"uppercase", marginTop:3 }}>Innovate and Dominate</div>
              </div>
            </div>

            <p style={{ fontSize:"clamp(12px,1.5vw,13px)", color:"#555", lineHeight:1.85,
              margin:"0 0 22px", maxWidth:270 }}>
              Building scalable software, AI-powered systems, and modern digital solutions that create real-world impact.
            </p>

            {/* Social icons — each with brand colour */}
            <div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>
              {socials.map(({ label, href, icon, color }) => {
                const [hov, setHov] = useState(false);
                return (
                  <a key={label} href={href} title={label}
                    target="_blank" rel="noopener noreferrer"
                    onMouseEnter={() => setHov(true)}
                    onMouseLeave={() => setHov(false)}
                    style={{
                      width:38, height:38, borderRadius:10, flexShrink:0,
                      border:`1px solid ${hov ? color+"60" : "#1e1e1e"}`,
                      background: hov ? `${color}16` : "#111",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color: hov ? color : "#555",
                      textDecoration:"none", transition:"all .22s",
                      transform: hov ? "translateY(-4px)" : "translateY(0)",
                      boxShadow: hov ? `0 6px 18px ${color}28` : "none",
                    }}
                  >{icon}</a>
                );
              })}
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div>
            <h4 style={{ fontSize:11, fontWeight:800, color:"#fff", margin:"0 0 20px",
              letterSpacing:"0.18em", textTransform:"uppercase",
              display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:16, height:2, background:ORANGE, borderRadius:99, display:"inline-block" }} />
              Navigation
            </h4>
            <ul style={{ listStyle:"none", padding:0, margin:0,
              display:"flex", flexDirection:"column", gap:11 }}>
              {navLinks.map(({ label, href }) => {
                const [hov, setHov] = useState(false);
                return (
                  <li key={label}>
                    <a href={href}
                      onMouseEnter={() => setHov(true)}
                      onMouseLeave={() => setHov(false)}
                      style={{ fontSize:"clamp(12px,1.5vw,13px)", color: hov ? ORANGE : "#666",
                        textDecoration:"none", display:"flex", alignItems:"center", gap:8,
                        transition:"all .2s", transform: hov ? "translateX(5px)" : "translateX(0)" }}>
                      <span style={{ width:4, height:4, borderRadius:"50%",
                        background: hov ? ORANGE : "#333", flexShrink:0, transition:"background .2s" }} />
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Col 3: Services ── */}
          <div>
            <h4 style={{ fontSize:11, fontWeight:800, color:"#fff", margin:"0 0 20px",
              letterSpacing:"0.18em", textTransform:"uppercase",
              display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:16, height:2, background:ORANGE, borderRadius:99, display:"inline-block" }} />
              Services
            </h4>
            <ul style={{ listStyle:"none", padding:0, margin:0,
              display:"flex", flexDirection:"column", gap:11 }}>
              {services.map(s => (
                <li key={s} style={{ display:"flex", alignItems:"center", gap:9 }}>
                  <span style={{ width:4, height:4, borderRadius:"50%", background:ORANGE,
                    flexShrink:0, opacity:.5 }} />
                  <span style={{ fontSize:"clamp(12px,1.5vw,13px)", color:"#666" }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact ── */}
          <div>
            <h4 style={{ fontSize:11, fontWeight:800, color:"#fff", margin:"0 0 20px",
              letterSpacing:"0.18em", textTransform:"uppercase",
              display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:16, height:2, background:ORANGE, borderRadius:99, display:"inline-block" }} />
              Get In Touch
            </h4>

            <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
              {contacts.map(({ icon, label, val, href }) => {
                const [hov, setHov] = useState(false);
                const Tag = href ? "a" : "div";
                return (
                  <Tag key={label} href={href || undefined}
                    target={href && !href.startsWith("mailto") && !href.startsWith("tel") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHov(true)}
                    onMouseLeave={() => setHov(false)}
                    style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none",
                      transition:"transform .2s",
                      transform: hov && href ? "translateX(4px)" : "translateX(0)" }}>
                    <div style={{ width:30, height:30, borderRadius:8, flexShrink:0,
                      background: hov ? `${ORANGE}18` : `${ORANGE}0E`,
                      border:`1px solid ${hov ? ORANGE+"45" : ORANGE+"20"}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:ORANGE, transition:"all .22s" }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize:9, color:"#383838", fontWeight:700,
                        letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:2 }}>{label}</div>
                      <div style={{ fontSize:"clamp(11px,1.4vw,12px)",
                        color: hov && href ? "#ccc" : "#666",
                        lineHeight:1.4, transition:"color .2s" }}>{val}</div>
                    </div>
                  </Tag>
                );
              })}
            </div>

            {/* Hire Me CTA */}
            <a href="/contact"
              style={{ display:"inline-flex", alignItems:"center", gap:7, marginTop:20,
                padding:"9px 20px", background:ORANGE, color:"#000", borderRadius:9,
                fontSize:12, fontWeight:800, textDecoration:"none",
                boxShadow:`0 0 16px ${ORANGE}40`, transition:"all .22s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 22px ${ORANGE}55`; }}
              onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=`0 0 16px ${ORANGE}40`; }}
            >Hire Me →</a>
          </div>
        </div>

        {/* ── Availability strip ── */}
        <div style={{ borderTop:"1px solid #141414", borderBottom:"1px solid #141414",
          padding:"clamp(13px,2.5vw,18px) 0", marginBottom:"clamp(18px,3vw,26px)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#00C864",
              boxShadow:"0 0 10px #00C864", flexShrink:0, animation:"blink 2s ease infinite" }} />
            <span style={{ fontSize:"clamp(11px,1.5vw,13px)", color:"#00C864", fontWeight:700 }}>
              Currently available for new projects
            </span>
          </div>
          <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
            {["Full-Stack","AI Engineering",,"Mobile"].map(t => (
              <span key={t} style={{ fontSize:10, fontWeight:700, color:ORANGE,
                background:`${ORANGE}12`, border:`1px solid ${ORANGE}28`,
                borderRadius:99, padding:"3px 10px", letterSpacing:"0.05em" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:10,
          paddingBottom:"clamp(20px,3.5vw,32px)",
          flexDirection: isMob ? "column" : "row",
          textAlign: isMob ? "center" : "left" }}>
          <p style={{ fontSize:"clamp(11px,1.3vw,12px)", color:"#2e2e2e", margin:0 }}>
            © {year}{" "}
            <span style={{ color:"#444" }}>Adekoya Oluwasegun Boluwatife</span>
            {" "}· All rights reserved.
          </p>
          <p style={{ fontSize:"clamp(10px,1.2vw,11px)", color:"#2e2e2e", margin:0 }}>
            <span style={{ color:ORANGE }}></span>
            {" "}· Designed by <span style={{ color:ORANGE }}>OBTECH</span>
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
