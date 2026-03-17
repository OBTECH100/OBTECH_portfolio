import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PageWrapper, Footer, useReveal } from "../components/shared";
import { ORANGE, projects } from "../data";

// ── Icons ──────────────────────────────────────────
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const ExternalIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const StarIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const LayersIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

// ── useWindowWidth ─────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

// ── Extended project data ──────────────────────────
const PROJECT_DATA = [
  {
    id: 1,
    title: "Face Recognition Student System",
    subtitle: "AI-Powered Attendance Platform",
    desc: "An end-to-end AI system that automates student attendance using facial recognition technology. Reduces manual check-in errors by 95% and saves educators 3+ hours per week.",
    longDesc: "Built with a deep learning pipeline using TensorFlow and OpenCV, this system captures real-time video, detects faces, and matches them against a database of enrolled students. Features include real-time attendance dashboards, automated report generation, and admin controls.",
    tech: ["Python", "OpenCV", "TensorFlow", "Flask", "MySQL"],
    color: "#FF6B00",
    emoji: "👤",
    github: "#",
    demo: "#",
    category: "AI / ML",
    status: "Completed",
    year: "2023",
    highlights: ["95% accuracy rate", "Real-time processing", "Auto report generation"],
    featured: true,
  },
  {
    id: 2,
    title: "Smart Health Tracking App",
    subtitle: "Full-Stack Health Intelligence Platform",
    desc: "A comprehensive health monitoring platform that tracks vitals, generates AI-powered insights, and delivers personalised wellness recommendations based on user data patterns.",
    longDesc: "Combines a React frontend with a Node.js/Python backend to collect and analyse health metrics. The AI layer uses ML models to detect trends, flag anomalies, and generate personalised health recommendations.",
    tech: ["React", "Node.js", "Python", "MongoDB", "ML"],
    color: "#00C896",
    emoji: "❤️",
    github: "#",
    demo: "#",
    category: "Full-Stack",
    status: "Completed",
    year: "2023",
    highlights: ["AI health insights", "Real-time vitals", "Personalised plans"],
    featured: true,
  },
  {
    id: 3,
    title: "Sign Language Recognition System",
    subtitle: "Computer Vision Communication Bridge",
    desc: "Real-time sign language interpreter powered by computer vision and deep learning. Bridges the communication gap for the hearing impaired using MediaPipe hand tracking.",
    longDesc: "Uses a custom-trained CNN model on top of MediaPipe's hand landmark detection to recognise ASL gestures in real time. Achieves 87% accuracy on live video streams with sub-100ms inference time.",
    tech: ["Python", "OpenCV", "TensorFlow", "MediaPipe", "CNN"],
    color: "#7B61FF",
    emoji: "🤟",
    github: "#",
    demo: "#",
    category: "AI / ML",
    status: "Completed",
    year: "2022",
    highlights: ["87% live accuracy", "Sub-100ms latency", "ASL recognition"],
    featured: true,
  },
  {
    id: 4,
    title: "Church Educational Website",
    subtitle: "Community Learning Platform",
    desc: "A modern, fully-responsive educational platform for a local church community — featuring course management, event scheduling, and a live community bulletin board.",
    longDesc: "Built with React on the frontend and PHP/MySQL on the backend. Features include role-based access control, content management, event registration, multimedia lessons, and an interactive community forum.",
    tech: ["React", "PHP", "MySQL", "CSS3", "Node.js"],
    color: "#FFB800",
    emoji: "📚",
    github: "#",
    demo: "#",
    category: "Full-Stack",
    status: "Live",
    year: "2022",
    highlights: ["Role-based access", "Course management", "Community forum"],
    featured: false,
  },
];

// Filter options
const FILTERS = ["All", "AI / ML", "Full-Stack", "Python", "React"];

// Category colours
const CAT_COLORS = {
  "AI / ML":    "#FF6B00",
  "Full-Stack": "#61DAFB",
  "Mobile":     "#A78BFA",
  "Backend":    "#68A063",
};

// ── Featured banner project card ───────────────────
function FeaturedCard({ project, index }) {
  const [ref, vis] = useReveal(0.08);
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const w = useWindowWidth();
  const isRow = w >= 768;

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(36px)",
        transition: `opacity .65s ease ${index * 0.1}s, transform .65s ease ${index * 0.1}s`,
      }}
    >
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: "#0d0d0d",
          border: `1px solid ${hov ? project.color + "70" : "#1a1a1a"}`,
          borderRadius: 22,
          overflow: "hidden",
          transition: "all .35s ease",
          boxShadow: hov ? `0 24px 64px ${project.color}20` : "0 4px 20px rgba(0,0,0,.4)",
          display: "flex",
          flexDirection: isRow ? "row" : "column",
        }}
      >
        {/* Visual panel */}
        <div style={{
          width: isRow ? "clamp(220px,32%,320px)" : "100%",
          minHeight: isRow ? "auto" : 200,
          flexShrink: 0,
          background: `linear-gradient(145deg, ${project.color}22, ${project.color}08, #0a0a0a)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          borderRight: isRow ? `1px solid ${hov ? project.color + "40" : "#1a1a1a"}` : "none",
          borderBottom: !isRow ? `1px solid ${hov ? project.color + "40" : "#1a1a1a"}` : "none",
          transition: "border-color .35s",
        }}>
          {/* Grid texture */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `linear-gradient(${project.color}08 1px,transparent 1px),linear-gradient(90deg,${project.color}08 1px,transparent 1px)`,
            backgroundSize: "24px 24px",
          }} />
          {/* Glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "80%", height: "80%",
            background: `radial-gradient(circle, ${project.color}25, transparent 70%)`,
            opacity: hov ? 1 : 0.5, transition: "opacity .35s",
          }} />
          {/* Emoji */}
          <span style={{
            fontSize: "clamp(56px,8vw,80px)",
            position: "relative", zIndex: 1,
            filter: `drop-shadow(0 0 16px ${project.color}80)`,
            transform: hov ? "scale(1.1)" : "scale(1)",
            transition: "transform .35s ease",
            display: "block",
          }}>{project.emoji}</span>

          {/* Status badge */}
          <div style={{
            position: "absolute", top: 14, left: 14,
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)",
            border: `1px solid ${project.color}40`,
            borderRadius: 99, padding: "4px 10px",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.status === "Live" ? "#00C864" : project.color, boxShadow: `0 0 6px ${project.status === "Live" ? "#00C864" : project.color}`, flexShrink: 0, animation: project.status === "Live" ? "blink 2s ease infinite" : "none" }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: "#ccc", letterSpacing: "0.08em", textTransform: "uppercase" }}>{project.status}</span>
          </div>

          {/* Year */}
          <div style={{
            position: "absolute", bottom: 14, right: 14,
            fontSize: 10, fontWeight: 700, color: `${project.color}90`,
            fontFamily: "'Space Grotesk',sans-serif",
          }}>{project.year}</div>
        </div>

        {/* Content panel */}
        <div style={{ flex: 1, padding: "clamp(20px,3vw,32px)", display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: project.color,
                letterSpacing: "0.1em", textTransform: "uppercase",
                marginBottom: 4,
              }}>{project.subtitle}</div>
              <h3 style={{
                fontSize: "clamp(16px,2.2vw,22px)", fontWeight: 900, color: "#fff",
                margin: 0, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.2,
                overflow: "hidden", textOverflow: "ellipsis",
              }}>{project.title}</h3>
            </div>
            {/* Category badge */}
            <span style={{
              fontSize: 10, fontWeight: 700, color: CAT_COLORS[project.category] || ORANGE,
              background: `${CAT_COLORS[project.category] || ORANGE}14`,
              border: `1px solid ${CAT_COLORS[project.category] || ORANGE}40`,
              borderRadius: 99, padding: "4px 12px",
              whiteSpace: "nowrap", flexShrink: 0,
            }}>{project.category}</span>
          </div>

          {/* Description */}
          <p style={{
            fontSize: "clamp(13px,1.6vw,14px)", color: "#777",
            lineHeight: 1.8, margin: "0 0 16px",
          }}>{expanded ? project.longDesc : project.desc}</p>

          {/* Highlights */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
            {project.highlights.map(h => (
              <div key={h} style={{
                display: "flex", alignItems: "center", gap: 5,
                fontSize: 11, color: "#aaa",
                background: "#141414", border: "1px solid #2a2a2a",
                borderRadius: 99, padding: "3px 10px",
              }}>
                <StarIcon size={10} />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {project.tech.map(t => (
              <span key={t} style={{
                fontSize: 11, fontWeight: 700,
                padding: "3px 10px", borderRadius: 99,
                background: `${project.color}12`,
                color: project.color,
                border: `1px solid ${project.color}40`,
                letterSpacing: "0.04em",
              }}>{t}</span>
            ))}
          </div>

          {/* Action row */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "auto", alignItems: "center" }}>
            <a href={project.github} style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 10,
              border: "1px solid #2a2a2a", background: "#111",
              fontSize: 13, fontWeight: 700, color: "#bbb",
              textDecoration: "none", transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = project.color; e.currentTarget.style.color = project.color; e.currentTarget.style.background = `${project.color}10`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#bbb"; e.currentTarget.style.background = "#111"; }}
            ><GithubIcon size={15} /> View Code</a>

            <a href={project.demo} style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 10,
              background: project.color,
              fontSize: 13, fontWeight: 700, color: "#000",
              textDecoration: "none", transition: "all .2s",
              boxShadow: `0 0 16px ${project.color}40`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 20px ${project.color}60`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 0 16px ${project.color}40`; }}
            ><ExternalIcon size={14} /> Live Demo</a>

            <button onClick={() => setExpanded(e => !e)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 14px", borderRadius: 10,
              border: `1px solid #2a2a2a`, background: "transparent",
              fontSize: 12, fontWeight: 600, color: "#555",
              cursor: "pointer", transition: "all .2s",
              marginLeft: "auto",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.borderColor = "#444"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#2a2a2a"; }}
            >
              <LayersIcon size={13} />
              {expanded ? "Less" : "More details"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Compact grid card ──────────────────────────────
function CompactCard({ project, index }) {
  const [ref, vis] = useReveal(0.08);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#0d0d0d",
        border: `1px solid ${hov ? project.color + "70" : "#1a1a1a"}`,
        borderRadius: 18,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "all .3s ease",
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "translateY(-6px)" : "translateY(0)") : "translateY(40px)",
        transitionDelay: `${index * 0.08}s`,
        boxShadow: hov ? `0 16px 48px ${project.color}22` : "0 4px 16px rgba(0,0,0,.3)",
      }}
    >
      {/* Image */}
      <div style={{
        height: 140,
        background: `linear-gradient(145deg, ${project.color}20, ${project.color}06, #0a0a0a)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        borderBottom: `1px solid ${hov ? project.color + "40" : "#1a1a1a"}`,
        flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${project.color}07 1px,transparent 1px),linear-gradient(90deg,${project.color}07 1px,transparent 1px)`,
          backgroundSize: "20px 20px",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${project.color}20, transparent 65%)`,
          opacity: hov ? 1 : 0.4, transition: "opacity .3s",
        }} />
        <span style={{
          fontSize: 52, position: "relative", zIndex: 1,
          filter: `drop-shadow(0 0 12px ${project.color}70)`,
          transform: hov ? "scale(1.08)" : "scale(1)",
          transition: "transform .3s",
          display: "block",
        }}>{project.emoji}</span>

        {/* Top badges */}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, color: project.color,
            background: "rgba(0,0,0,.75)", backdropFilter: "blur(6px)",
            border: `1px solid ${project.color}40`,
            borderRadius: 99, padding: "3px 9px",
            letterSpacing: "0.06em", textTransform: "uppercase",
          }}>{project.category}</span>
        </div>
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <span style={{
            fontSize: 9, fontWeight: 700,
            color: project.status === "Live" ? "#00C864" : "#aaa",
            background: "rgba(0,0,0,.75)", backdropFilter: "blur(6px)",
            border: `1px solid ${project.status === "Live" ? "#00C86440" : "#2a2a2a"}`,
            borderRadius: 99, padding: "3px 9px",
          }}>{project.status}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(16px,2.5vw,22px)", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 10, color: project.color, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{project.year} · {project.subtitle}</div>
        <h3 style={{ fontSize: "clamp(14px,1.8vw,17px)", fontWeight: 800, color: "#fff", margin: "0 0 8px", fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.2 }}>{project.title}</h3>
        <p style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "#666", lineHeight: 1.7, margin: "0 0 14px", flex: 1 }}>{project.desc}</p>

        {/* Tech pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 700, padding: "2px 8px",
              borderRadius: 99, background: `${project.color}10`,
              color: project.color, border: `1px solid ${project.color}35`,
            }}>{t}</span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          <a href={project.github} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "8px 12px", borderRadius: 9, border: "1px solid #222",
            background: "#111", fontSize: 12, fontWeight: 700, color: "#888",
            textDecoration: "none", transition: "all .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = project.color; e.currentTarget.style.color = project.color; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#888"; }}
          ><GithubIcon size={13} />Code</a>
          <a href={project.demo} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "8px 12px", borderRadius: 9,
            background: project.color,
            fontSize: 12, fontWeight: 700, color: "#000",
            textDecoration: "none", transition: "opacity .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          ><ExternalIcon size={12} />Demo</a>
        </div>
      </div>
    </div>
  );
}

// ── Stat pill ──────────────────────────────────────
function StatPill({ num, label, color }) {
  const [ref, vis] = useReveal(0.2);
  return (
    <div ref={ref} style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "clamp(16px,2.5vw,24px) clamp(12px,2vw,20px)",
      background: "#0d0d0d", border: `1px solid ${vis ? color + "40" : "#1a1a1a"}`,
      borderRadius: 16, textAlign: "center",
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: "all .6s ease",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${color}10, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 900, color, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1, position: "relative" }}>{num}</div>
      <div style={{ fontSize: "clamp(10px,1.3vw,11px)", color: "#555", marginTop: 5, fontWeight: 600, position: "relative" }}>{label}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════
export default function Projects() {
  const [filter,   setFilter]   = useState("All");
  const [viewMode, setViewMode] = useState("featured"); // "featured" | "grid"
  const w = useWindowWidth();

  const filtered = filter === "All"
    ? PROJECT_DATA
    : PROJECT_DATA.filter(p =>
        p.category === filter ||
        p.tech.some(t => t.toLowerCase().includes(filter.toLowerCase()))
      );

  const featured = filtered.filter(p => p.featured);
  const others   = filtered.filter(p => !p.featured);

  return (
    <PageWrapper>
      <style>{`@keyframes fadeSlideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* ══ HERO ══ */}
      <div style={{
        background: "#0a0a0a", position: "relative", overflow: "hidden",
        padding: "clamp(64px,9vw,110px) 0 clamp(40px,6vw,64px)",
      }}>
        {/* Grid bg */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(255,107,0,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,.03) 1px,transparent 1px)`,
          backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "50vw", height: "50vw",
          background: `radial-gradient(circle,${ORANGE}07,transparent 60%)`, pointerEvents: "none" }} />

        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, animation: "fadeSlideUp .55s ease forwards" }}>
            <span style={{ fontSize: 12, color: "#444" }}>Portfolio</span>
            <span style={{ fontSize: 12, color: "#2a2a2a" }}>/</span>
            <span style={{ fontSize: 12, color: ORANGE, fontWeight: 600 }}>Projects</span>
          </div>

          <div style={{ animation: "fadeSlideUp .65s ease .05s both" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16,
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: ORANGE,
              textTransform: "uppercase", padding: "4px 14px",
              border: `1px solid ${ORANGE}40`, borderRadius: 99, background: `${ORANGE}10`,
            }}>Featured Work</div>

            <h1 style={{
              fontSize: "clamp(28px,5vw,56px)", fontWeight: 900,
              fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.08,
              margin: "0 0 16px", letterSpacing: "-0.03em", color: "#fff",
            }}>
              Projects &amp; <span style={{ color: ORANGE }}>Case Studies</span>
            </h1>
            <p style={{
              fontSize: "clamp(14px,1.8vw,17px)", color: "#666", lineHeight: 1.8,
              maxWidth: 580, margin: 0,
            }}>
              A curated selection of production-grade software I've built — spanning AI systems,
              full-stack web applications, and mobile platforms that solve real problems.
            </p>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${w < 480 ? 2 : 4}, 1fr)`,
            gap: "clamp(10px,2vw,16px)",
            marginTop: "clamp(36px,5vw,52px)",
            animation: "fadeSlideUp .75s ease .12s both",
          }}>
            {[
              { num: `${PROJECT_DATA.length}+`, label: "Projects Built",       color: ORANGE    },
              { num: "3",                        label: "AI Systems Deployed",  color: "#A78BFA" },
              { num: "4+",                       label: "Years of Experience",  color: "#61DAFB" },
              { num: "100%",                     label: "Delivered on Time",    color: "#00C896" },
            ].map((s, i) => <StatPill key={s.label} {...s} />)}
          </div>
        </div>
      </div>

      {/* ══ FILTER + VIEW BAR ══ */}
      <div style={{
        background: "#0d0d0d", borderTop: "1px solid #161616",
        borderBottom: "1px solid #161616",
        position: "sticky", top: 64, zIndex: 50,
      }}>
        <div className="container" style={{ padding: "clamp(10px,1.8vw,14px) clamp(16px,4vw,24px)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            {/* Filters */}
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "#3a3a3a", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginRight: 3, flexShrink: 0 }}>Filter:</span>
              {FILTERS.map(f => {
                const active = filter === f;
                return (
                  <button key={f} onClick={() => setFilter(f)} style={{
                    padding: "5px 13px", borderRadius: 99, cursor: "pointer",
                    fontSize: "clamp(11px,1.3vw,12px)", fontWeight: 700,
                    border: `1px solid ${active ? ORANGE : "#2a2a2a"}`,
                    background: active ? `${ORANGE}18` : "#111",
                    color: active ? ORANGE : "#666",
                    transition: "all .2s", whiteSpace: "nowrap",
                  }}>{f}</button>
                );
              })}
            </div>

            {/* View toggle */}
            <div style={{ display: "flex", gap: 4, background: "#111", border: "1px solid #1e1e1e", borderRadius: 10, padding: 3 }}>
              {[
                { mode: "featured", label: "Featured" },
                { mode: "grid",     label: "Grid"     },
              ].map(({ mode, label }) => (
                <button key={mode} onClick={() => setViewMode(mode)} style={{
                  padding: "5px 12px", borderRadius: 8, cursor: "pointer",
                  fontSize: 11, fontWeight: 700,
                  background: viewMode === mode ? `${ORANGE}20` : "transparent",
                  border: `1px solid ${viewMode === mode ? ORANGE + "50" : "transparent"}`,
                  color: viewMode === mode ? ORANGE : "#555",
                  transition: "all .2s",
                }}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ PROJECTS ══ */}
      <div className="section-pad" style={{ background: "#0a0a0a" }}>
        <div className="container">

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#444" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <p style={{ fontSize: 16, fontWeight: 600 }}>No projects match this filter.</p>
            </div>
          ) : viewMode === "featured" ? (
            /* ── Featured list view ── */
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,2.5vw,24px)" }}>
              {filtered.map((p, i) => <FeaturedCard key={p.id} project={p} index={i} />)}
            </div>
          ) : (
            /* ── Grid view ── */
            <div style={{
              display: "grid",
              gridTemplateColumns: w < 560 ? "1fr" : w < 900 ? "repeat(2,1fr)" : "repeat(3,1fr)",
              gap: "clamp(14px,2.5vw,22px)",
            }}>
              {filtered.map((p, i) => <CompactCard key={p.id} project={p} index={i} />)}
            </div>
          )}
        </div>
      </div>

      {/* ══ GITHUB CTA ══ */}
      <div className="section-pad" style={{ background: "#0d0d0d" }}>
        <div className="container">
          <div style={{
            background: `linear-gradient(135deg, ${ORANGE}10, ${ORANGE}04, #0a0a0a)`,
            border: `1px solid ${ORANGE}25`,
            borderRadius: 20,
            padding: "clamp(32px,5vw,56px) clamp(24px,4vw,48px)",
            textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", height: "60%", background: `radial-gradient(circle,${ORANGE}07,transparent 65%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>
                <GithubIcon size={44} />
              </div>
              <h2 style={{ fontSize: "clamp(20px,3.5vw,32px)", fontWeight: 900, color: "#fff", margin: "0 0 12px", fontFamily: "'Space Grotesk',sans-serif" }}>
                See All My Work on GitHub
              </h2>
              <p style={{ fontSize: "clamp(13px,1.6vw,15px)", color: "#555", lineHeight: 1.75, maxWidth: 460, margin: "0 auto 28px" }}>
                More experiments, open-source contributions, and works-in-progress live on my GitHub profile.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://github.com" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "12px 28px", background: "#fff", color: "#000",
                  borderRadius: 10, fontSize: "clamp(13px,1.6vw,14px)", fontWeight: 700,
                  textDecoration: "none", transition: "all .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,255,255,.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                ><GithubIcon size={16} /> View GitHub Profile</a>
                <Link to="/contact" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "12px 28px", background: ORANGE, color: "#000",
                  borderRadius: 10, fontSize: "clamp(13px,1.6vw,14px)", fontWeight: 700,
                  textDecoration: "none", boxShadow: `0 0 20px ${ORANGE}40`, transition: "all .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${ORANGE}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 0 20px ${ORANGE}40`; }}
                >Hire Me →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
