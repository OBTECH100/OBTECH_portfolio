import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageWrapper, Footer, useReveal } from "../components/shared";
import { ORANGE } from "../data";

// ── Icons ──────────────────────────────────────────
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const ArrowIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const ExternalIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const GITHUB_URL = "https://github.com/OBTECH100";

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

function Reveal({ children, delay = 0 }) {
  const [ref, vis] = useReveal(0.07);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ── Real projects with actual screenshots ─────────
const PROJECTS = [
  {
    id: 1,
    name: "P2P Enhanced Security",
    subtitle: "Encrypted File Transfer System",
    desc: "Peer-to-peer file transfer with end-to-end AES encryption, password protection, and serverless node communication — no central server required.",
    tags: ["Python", "Cryptography", "Sockets", "AES"],
    color: "#00C896",
    image: "/projects/p2p.jpg",
    github: GITHUB_URL,
    year: "2025",
  },
  {
    id: 2,
    name: "Seed Sowing Robot",
    subtitle: "Agricultural Automation System",
    desc: "Autonomous robot simulated in Webots that navigates sandy terrain, maintains row spacing, and sows seeds at precise intervals using Python controllers.",
    tags: ["Python", "Webots", "Robotics", "Simulation"],
    color: "#68A063",
    image: "/projects/seed.png",
    github: GITHUB_URL,
    year: "2025",
  },
  {
    id: 3,
    name: "Health Tracking App",
    subtitle: "Full-Stack Wellness Platform",
    desc: "Mobile health monitoring app tracking steps, calories, and daily goals with progress rings, streaks, and AI-powered personalised wellness insights.",
    tags: ["React Native", "Node.js", "Typescript", "MySQL"],
    color: "#E84393",
    image: "/projects/health.jpg",
    github: GITHUB_URL,
    year: "2025",
  },
  {
    id: 4,
    name: "Pest Detection System",
    subtitle: "Computer Vision AI Guard",
    desc: "AI pest detection system trained on 18,981 images across 18,982 classes. Identifies crop pests with 86.2%+ confidence using a custom CNN model.",
    tags: ["Python", "TensorFlow", "OpenCV", "CNN"],
    color: "#FF6B00",
    image: "/projects/pest.jpg",
    github: GITHUB_URL,
    year: "2025",
  },
];

// ── Project card with real screenshot ─────────────
function ProjectCard({ project, index }) {
  const [ref, vis] = useReveal(0.06);
  const [hov, setHov]       = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "translateY(-8px)" : "translateY(0)") : "translateY(40px)",
        transition: `opacity .6s ease ${index * 0.1}s, transform .3s ease, box-shadow .3s ease, border-color .3s ease`,
        background: "#0d0d0d",
        border: `1px solid ${hov ? project.color + "80" : "#1e1e1e"}`,
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hov ? `0 24px 60px ${project.color}25` : "0 4px 20px rgba(0,0,0,.4)",
        cursor: "pointer",
      }}
      onClick={() => window.open(project.github, "_blank")}
    >
      {/* Screenshot */}
      <div style={{ position: "relative", height: 220, overflow: "hidden", flexShrink: 0, background: `linear-gradient(145deg,${project.color}18,#090909)` }}>
        {!imgErr ? (
          <img
            src={project.image}
            alt={project.name}
            onError={() => setImgErr(true)}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              transition: "transform .5s ease",
              transform: hov ? "scale(1.06)" : "scale(1)",
              display: "block",
            }}
          />
        ) : (
          /* Fallback if image fails */
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>
            {project.id === 1 ? "🔐" : project.id === 2 ? "🌱" : project.id === 3 ? "❤️" : "🐛"}
          </div>
        )}

        {/* Dark overlay on hover */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,.85) 100%)`, transition: "opacity .3s", opacity: hov ? 1 : 0.6 }} />

        {/* Year badge top-left */}
        <div style={{ position: "absolute", top: 14, left: 14, fontSize: 10, fontWeight: 700, color: "#fff", background: "rgba(0,0,0,.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 99, padding: "4px 10px" }}>
          {project.year}
        </div>

        {/* GitHub icon top-right */}
        <div style={{ position: "absolute", top: 14, right: 14, width: 30, height: 30, borderRadius: 8, background: "rgba(0,0,0,.65)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", color: hov ? project.color : "#888", transition: "color .3s, transform .3s", transform: hov ? "scale(1.1)" : "scale(1)" }}>
          <GithubIcon size={14} />
        </div>

        {/* Subtitle on image bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 16px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: project.color, letterSpacing: "0.1em", textTransform: "uppercase", opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(6px)", transition: "all .3s" }}>
            {project.subtitle}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(16px,2.5vw,22px)", display: "flex", flexDirection: "column", flex: 1, gap: 12 }}>
        {/* Name */}
        <h3 style={{ fontSize: "clamp(15px,2vw,17px)", fontWeight: 800, color: "#fff", margin: 0, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.2 }}>
          {project.name}
        </h3>

        {/* Description */}
        <p style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "#666", lineHeight: 1.75, margin: 0, flex: 1 }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 99, background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}35` }}>
              {t}
            </span>
          ))}
        </div>

        {/* View on GitHub */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 4, borderTop: "1px solid #1a1a1a" }}>
          <GithubIcon size={13} />
          <span style={{ fontSize: 11, fontWeight: 700, color: hov ? project.color : "#555", letterSpacing: "0.06em", transition: "color .25s", flex: 1 }}>
            View on GitHub
          </span>
          <ArrowIcon size={13} />
        </div>
      </div>
    </div>
  );
}

// ── "View More" card ───────────────────────────────
function ViewMoreCard({ index }) {
  const [ref, vis] = useReveal(0.06);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => window.open(GITHUB_URL, "_blank")}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "translateY(-8px) scale(1.02)" : "translateY(0)") : "translateY(40px)",
        transition: `opacity .6s ease ${index * 0.1}s, transform .3s ease, border-color .3s ease, box-shadow .3s ease`,
        background: hov ? `${ORANGE}08` : "#0d0d0d",
        border: `1px solid ${hov ? ORANGE + "60" : "#1e1e1e"}`,
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 360,
        gap: 22,
        cursor: "pointer",
        boxShadow: hov ? `0 24px 60px ${ORANGE}18` : "0 4px 20px rgba(0,0,0,.4)",
        padding: "clamp(24px,4vw,40px)",
        position: "relative",
        textAlign: "center",
      }}
    >
      {/* Animated background rings */}
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          position: "absolute",
          width: `${i * 80}px`, height: `${i * 80}px`,
          borderRadius: "50%",
          border: `1px solid ${ORANGE}${hov ? "30" : "12"}`,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          transition: `all ${0.3 + i * 0.1}s ease`,
          opacity: hov ? 1 : 0.4,
        }} />
      ))}

      {/* Icon */}
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: hov ? `${ORANGE}18` : "#141414",
        border: `2px solid ${hov ? ORANGE : "#2a2a2a"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all .3s",
        boxShadow: hov ? `0 0 28px ${ORANGE}35` : "none",
        position: "relative", zIndex: 1,
      }}>
        <GithubIcon size={30} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 900, color: hov ? "#fff" : "#ccc", margin: "0 0 10px", fontFamily: "'Space Grotesk',sans-serif", transition: "color .3s" }}>
          View More Projects
        </h3>
        <p style={{ fontSize: "clamp(12px,1.5vw,13px)", color: hov ? "#888" : "#555", lineHeight: 1.7, margin: "0 0 20px", transition: "color .3s" }}>
          More projects, experiments, and open‑source work live on my GitHub profile.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: hov ? ORANGE : "#141414", border: `1px solid ${hov ? ORANGE : "#2a2a2a"}`, borderRadius: 10, fontSize: 13, fontWeight: 700, color: hov ? "#000" : "#666", transition: "all .3s" }}>
          <GithubIcon size={14} />
          github.com/OBTECH100
          <ExternalIcon size={13} />
        </div>
      </div>
    </div>
  );
}

// ── Stat card ──────────────────────────────────────
function StatCard({ num, label, color, index }) {
  const [ref, vis] = useReveal(0.15);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "clamp(16px,3vw,26px) clamp(10px,2vw,18px)", background: "#0d0d0d", border: `1px solid ${vis ? color + "35" : "#1a1a1a"}`, borderRadius: 16, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: `all .6s ease ${index * 0.1}s`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${color}10, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 900, color, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1, position: "relative" }}>{num}</div>
      <div style={{ fontSize: "clamp(10px,1.2vw,11px)", color: "#555", marginTop: 5, fontWeight: 600, position: "relative" }}>{label}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════
export default function Projects() {
  const w = useWindowWidth();

  return (
    <PageWrapper>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* ══ HERO ══ */}
      <div style={{ background: "#0a0a0a", position: "relative", overflow: "hidden", padding: "clamp(64px,9vw,110px) 0 clamp(48px,7vw,72px)" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(255,107,0,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,.025) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "50vw", height: "50vw", background: `radial-gradient(circle,${ORANGE}07,transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-15%", left: "-5%", width: "35vw", height: "35vw", background: `radial-gradient(circle,${ORANGE}04,transparent 60%)`, pointerEvents: "none" }} />

        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, animation: "fadeUp .5s ease forwards" }}>
            <Link to="/" style={{ fontSize: 12, color: "#3a3a3a", textDecoration: "none" }}>Home</Link>
            <span style={{ fontSize: 12, color: "#222" }}>/</span>
            <span style={{ fontSize: 12, color: ORANGE, fontWeight: 600 }}>Projects</span>
          </div>

          <div style={{ animation: "fadeUp .65s ease .06s both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: ORANGE, textTransform: "uppercase", padding: "4px 14px", border: `1px solid ${ORANGE}40`, borderRadius: 99, background: `${ORANGE}10` }}>
              Featured Work
            </div>
            <h1 style={{ fontSize: "clamp(28px,5vw,54px)", fontWeight: 900, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.08, margin: "0 0 18px", letterSpacing: "-0.03em", color: "#fff" }}>
              Projects &amp; <span style={{ color: ORANGE }}>Case Studies</span>
            </h1>
            <p style={{ fontSize: "clamp(14px,1.8vw,16px)", color: "#666", lineHeight: 1.85, maxWidth: 540, margin: "0 0 32px" }}>
              A selection of real projects I've built — from AI computer vision systems and autonomous robots to full-stack applications. All source code is available on GitHub.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "12px 26px", background: "#fff", color: "#000", borderRadius: 11, fontSize: "clamp(13px,1.6vw,14px)", fontWeight: 800, textDecoration: "none", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,255,255,.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <GithubIcon size={16} /> View All on GitHub
              </a>
              <Link to="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", background: `${ORANGE}14`, border: `1px solid ${ORANGE}40`, color: ORANGE, borderRadius: 11, fontSize: "clamp(13px,1.6vw,14px)", fontWeight: 700, textDecoration: "none", transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = `${ORANGE}22`}
                onMouseLeave={e => e.currentTarget.style.background = `${ORANGE}14`}
              >
                Hire Me →
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${w < 480 ? 2 : 4}, 1fr)`, gap: "clamp(10px,2vw,14px)", marginTop: "clamp(40px,6vw,60px)", animation: "fadeUp .75s ease .15s both" }}>
            {[
              { num: "6+",  label: "Projects Built",       color: ORANGE    },
              { num: "4",   label: "AI Systems",           color: "#A78BFA" },
              { num: "4+",  label: "Years Experience",     color: "#61DAFB" },
              { num: "86%", label: "Pest Detection Acc.",  color: "#00C896" },
            ].map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
          </div>
        </div>
      </div>

      {/* ══ PROJECT GRID ══ */}
      <div className="section-pad" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <Reveal>
            <div style={{ marginBottom: "clamp(28px,4vw,44px)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: ORANGE, textTransform: "uppercase", marginBottom: 8 }}>Featured Repositories</div>
              <h2 style={{ fontSize: "clamp(20px,3vw,30px)", fontWeight: 900, color: "#fff", margin: "0 0 8px", fontFamily: "'Space Grotesk',sans-serif" }}>
                Selected Projects
              </h2>
              <p style={{ fontSize: "clamp(12px,1.5vw,14px)", color: "#555", margin: 0, lineHeight: 1.7 }}>
                Click any project to view the full source code on GitHub.
              </p>
            </div>
          </Reveal>

          {/* 4 real projects + 1 "View More" card */}
          <div style={{
            display: "grid",
            gridTemplateColumns: w < 560 ? "1fr" : w < 900 ? "repeat(2,1fr)" : "repeat(3,1fr)",
            gap: "clamp(14px,2.5vw,22px)",
          }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
            {/* View More card sits in the 5th slot */}
            <ViewMoreCard index={PROJECTS.length} />
          </div>
        </div>
      </div>

      {/* ══ HIRE ME STRIP ══ */}
      <div style={{ background: "#0d0d0d", borderTop: "1px solid #141414" }}>
        <div className="container" style={{ padding: "clamp(28px,4vw,44px) clamp(16px,4vw,24px)" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div>
                <h3 style={{ fontSize: "clamp(16px,2.2vw,22px)", fontWeight: 800, color: "#fff", margin: "0 0 6px", fontFamily: "'Space Grotesk',sans-serif" }}>
                  Interested in working together?
                </h3>
                <p style={{ fontSize: "clamp(12px,1.5vw,14px)", color: "#555", margin: 0 }}>
                  I'm available for freelance projects, contracts, and full-time roles.
                </p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link to="/contact"
                  style={{ padding: "11px 24px", background: ORANGE, color: "#000", borderRadius: 10, fontSize: "clamp(12px,1.5vw,14px)", fontWeight: 700, textDecoration: "none", boxShadow: `0 0 18px ${ORANGE}40`, transition: "all .2s", display: "inline-block" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${ORANGE}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 0 18px ${ORANGE}40`; }}
                >Get In Touch →</Link>
                <a href="/resume.pdf"
                  style={{ padding: "11px 22px", background: "#111", border: "1px solid #2a2a2a", color: "#aaa", borderRadius: 10, fontSize: "clamp(12px,1.5vw,14px)", fontWeight: 700, textDecoration: "none", transition: "all .2s", display: "inline-block" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#444"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#aaa"; }}
                >Download CV</a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
