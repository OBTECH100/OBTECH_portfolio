import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageWrapper } from "../components/shared";
import { ORANGE } from "../data";

// ── Icons ──────────────────────────────────────────
const GithubIcon    = ({ size=18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const LinkedInIcon  = ({ size=18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const MailIcon      = ({ size=18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const WhatsAppIcon  = ({ size=18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
const XIcon         = ({ size=18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

// ── Hook ───────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

// ── Floating tech particles ────────────────────────
const PARTICLES = [
  { icon:"⚛️", x:8,  y:20, d:0,   s:8,  sz:"18px" },
  { icon:"🧠", x:15, y:65, d:3,   s:9,  sz:"17px" },
  { icon:"🟩", x:78, y:70, d:0.8, s:11, sz:"14px" },
  { icon:"🐳", x:50, y:12, d:2,   s:7,  sz:"15px" },
  { icon:"🔀", x:92, y:55, d:4,   s:12, sz:"14px" },
  { icon:"💻", x:3,  y:45, d:1,   s:9,  sz:"16px" },
  { icon:"🌐", x:35, y:88, d:0.5, s:8,  sz:"14px" },

];

// ── Social button ──────────────────────────────────
function SocialBtn({ href, icon, label, hoverColor }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      title={label}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 42, height: 42, borderRadius: 11,
        border: `1px solid ${hov ? hoverColor + "60" : "#2a2a2a"}`,
        background: hov ? `${hoverColor}14` : "#111",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? hoverColor : "#666",
        textDecoration: "none",
        transition: "all .22s ease",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? `0 6px 18px ${hoverColor}22` : "none",
        flexShrink: 0,
      }}
    >
      {icon}
    </a>
  );
}

// ══════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════
export default function Home() {
  const w = useWindowWidth();
  const isMobile = w < 680;
  const isSmall  = w < 400;

  return (
    <PageWrapper>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes avatarIn {
          from { opacity:0; transform:scale(.88); }
          to   { opacity:1; transform:scale(1); }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0a",
      }}>

        {/* Grid background */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`linear-gradient(rgba(255,107,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,.04) 1px,transparent 1px)`,
          backgroundSize:"60px 60px" }} />

        {/* Central glow */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
          width:"75vw", height:"75vw", maxWidth:800,
          background:`radial-gradient(circle,${ORANGE}07,transparent 60%)`,
          pointerEvents:"none" }} />

        {/* Floating particles — hidden on mobile */}
        {!isMobile && (
          <div style={{ position:"absolute", inset:0, pointerEvents:"none" }} aria-hidden="true">
            {PARTICLES.map((p,i) => (
              <div key={i} style={{ position:"absolute", left:`${p.x}%`, top:`${p.y}%`, opacity:0,
                fontSize:p.sz, animation:`floatUp ${p.s}s ease-in-out ${p.d}s infinite`,
                userSelect:"none" }}>{p.icon}</div>
            ))}
          </div>
        )}

        {/* ── Main content ── */}
        <div className="container" style={{ width:"100%", padding: isMobile
          ? "100px 20px 60px"
          : "clamp(10px,12vw,20px) clamp(16px,4vw,24px) clamp(60px,8vw,80px)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(32px,5vw,64px)",
            flexDirection: isMobile ? "column-reverse" : "row",
            flexWrap: "wrap",
          }}>

            {/* ══ TEXT COLUMN ══ */}
            <div style={{
              flex: "1 1 300px",
              minWidth: 0,
              textAlign: isMobile ? "center" : "left",
              animation: "heroFadeUp .8s ease forwards",
            }}>

              {/* Availability badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: isSmall ? 10 : 11, fontWeight: 700,
                letterSpacing: "0.12em", color: ORANGE,
                textTransform: "uppercase", marginBottom: 20,
                padding: "5px 14px",
                border: `1px solid ${ORANGE}40`,
                borderRadius: 99, background: `${ORANGE}10`,
              }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:ORANGE,
                  flexShrink:0, animation:"blink 2s ease infinite",
                  boxShadow:`0 0 8px ${ORANGE}` }} />
                Software Developer 
              </div>

              {/* Name */}
              <h1 style={{
                fontSize: isSmall ? "28px" : "clamp(30px,6vw,66px)",
                fontWeight: 900,
                fontFamily: "'Space Grotesk',sans-serif",
                lineHeight: 1.07,
                margin: "0 0 16px",
                letterSpacing: "-0.03em",
                color: "#fff",
              }}>
                Hi, I'm{" "}
                <span style={{ color:ORANGE, textShadow:`0 0 32px ${ORANGE}60` }}>
                  Adekoya
                </span>
                <br />Oluwasegun
              </h1>

              {/* Title + tagline */}
              <p style={{ fontSize:"clamp(14px,2vw,18px)", color:"#fff", fontWeight:600, margin:"0 0 6px", lineHeight:1.5 }}>
                Fullstack developer | AI &amp; Mobile Innovator
              </p>
              <p style={{ fontSize:"clamp(13px,1.7vw,16px)", color:"#666", lineHeight:1.75,
                maxWidth:480, margin: isMobile ? "0 auto 0" : "0 0 0",
              }}>
                I specialize in building scalable software system, intelligent AI solutions, modern web platforms, and powerful mobile applications that drive innovation and real-world impact.
              </p>

              {/* CTA buttons */}
              <div style={{
                display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28,
                justifyContent: isMobile ? "center" : "flex-start",
              }}>
                <Link to="/projects"
                  style={{ fontSize:"clamp(12px,1.7vw,14px)", fontWeight:700, borderRadius:10,
                    padding:"11px clamp(14px,2.5vw,22px)", textDecoration:"none",
                    background:ORANGE, color:"#000", border:"none",
                    boxShadow:`0 0 22px ${ORANGE}50`, transition:"all .2s", display:"inline-block" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 28px ${ORANGE}60`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 0 22px ${ORANGE}50`;}}
                >View Projects</Link>

                <a href="/resume.pdf"
                  style={{ fontSize:"clamp(12px,1.7vw,14px)", fontWeight:700, borderRadius:10,
                    padding:"11px clamp(14px,2.5vw,22px)", textDecoration:"none",
                    background:"#141414", color:"#fff", border:"1px solid #333",
                    transition:"all .2s", display:"inline-block" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=ORANGE;e.currentTarget.style.color=ORANGE;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#333";e.currentTarget.style.color="#fff";}}
                >↓ Download CV</a>

                <Link to="/contact"
                  style={{ fontSize:"clamp(12px,1.7vw,14px)", fontWeight:700, borderRadius:10,
                    padding:"11px clamp(14px,2.5vw,22px)", textDecoration:"none",
                    background:`${ORANGE}12`, color:ORANGE, border:`1px solid ${ORANGE}50`,
                    transition:"all .2s", display:"inline-block" }}
                  onMouseEnter={e=>e.currentTarget.style.background=`${ORANGE}22`}
                  onMouseLeave={e=>e.currentTarget.style.background=`${ORANGE}12`}
                >Contact Me</Link>
              </div>

              {/* Stats */}
              <div style={{
                display: "flex", gap: "clamp(16px,3.5vw,32px)",
                flexWrap: "wrap", marginTop: 36,
                justifyContent: isMobile ? "center" : "flex-start",
              }}>
                {[["4+","Years Coding"],["14+","Projects Built"],["3","AI Systems"]].map(([n,l]) => (
                  <div key={l} style={{ textAlign: isMobile ? "center" : "left" }}>
                    <div style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:900, color:ORANGE,
                      fontFamily:"'Space Grotesk',sans-serif", lineHeight:1 }}>{n}</div>
                    <div style={{ fontSize:"clamp(10px,1.3vw,12px)", color:"#555", marginTop:4 }}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Social icons — GitHub, LinkedIn, WhatsApp, X, Email */}
              <div style={{
                display: "flex", gap: 8, flexWrap: "wrap", marginTop: 28,
                justifyContent: isMobile ? "center" : "flex-start",
                alignItems: "center",
              }}>
                <span style={{ fontSize:11, color:"#444", fontWeight:600, marginRight:2 }}>Connect:</span>
                <SocialBtn href="https://github.com/OBTECH100"        icon={<GithubIcon   size={17}/>} label="GitHub"    hoverColor="#ccc"     />
                <SocialBtn href="https://www.linkedin.com/in/oluwasegun-boluwatife-9103a9289" icon={<LinkedInIcon size={17}/>} label="LinkedIn"  hoverColor="#0A66C2" />
                <SocialBtn href="https://wa.me/2348119673231"          icon={<WhatsAppIcon size={17}/>} label="WhatsApp" hoverColor="#25D366"  />
                <SocialBtn href="https://x.com/OBTECH100"              icon={<XIcon        size={17}/>} label="X"        hoverColor="#fff"     />
        
              </div>
            </div>

            {/* ══ AVATAR COLUMN ══ */}
            <div style={{
              flex: "0 0 auto",
              display: "flex",
              justifyContent: "center",
              animation: "avatarIn .8s ease .15s both",
            }}>
              <div style={{ position:"relative",
                width:  isMobile ? "clamp(300px,55vw,220px)" : "clamp(400px,28vw,270px)",
                height: isMobile ? "clamp(300px,55vw,220px)" : "clamp(400px,28vw,270px)",
              }}>
                {/* Pulse rings */}
                {[1,2].map(i => (
                  <div key={i} style={{ position:"absolute", inset: -i*11, borderRadius:"50%",
                    border:`1px solid ${ORANGE}`, opacity:0,
                    animation:`pulse-ring ${1.8+i*.6}s ease-out ${i*.4}s infinite` }} />
                ))}
                {/* Spinning dashed ring */}
                <div style={{ position:"absolute", inset:-9, borderRadius:"50%",
                  border:`2px dashed ${ORANGE}40`, animation:"spin-slow 12s linear infinite" }} />

                {/* Avatar circle */}
                <div style={{
                  width:"100%", height:"100%", borderRadius:"50%",
                  background:`linear-gradient(135deg,${ORANGE}22,#1a1a1a)`,
                  border:`3px solid ${ORANGE}`,
                  boxShadow:`0 0 40px ${ORANGE}40,0 0 80px ${ORANGE}15`,

                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",  fontSize: isMobile ? "clamp(52px,18vw,80px)" : "clamp(58px,11vw,88px)",
                  }}>
                    <img
                      src="/profile.jpg"
                      alt="Adekoya Oluwasegun"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                    />
                  </div>
                {/* Available badge */}
                <div style={{
                  position:"absolute",
                  bottom: isMobile ? -2 : 4,
                  right: isMobile ? "-8px" : "-12px",
                  background:"#111",
                  border:`1px solid ${ORANGE}`,
                  borderRadius:10,
                  padding: isMobile ? "4px 9px" : "5px 12px",
                  fontSize: isMobile ? 10 : 11,
                  fontWeight:700, color:ORANGE,
                  boxShadow:`0 0 16px ${ORANGE}30`,
                  whiteSpace:"nowrap",
                }}>⚡ Available for Work</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
