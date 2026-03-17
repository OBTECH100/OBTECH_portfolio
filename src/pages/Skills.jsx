import { useState, useEffect, useRef } from "react";
import { PageWrapper, Footer, useReveal } from "../components/shared";
import { ORANGE } from "../data";

// ── Devicon URLs ───────────────────────────────────
const ICONS = {
  // Languages
  JavaScript:    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Python:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  PHP:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "C++":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "VB.NET":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  SQL:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  HTML:          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  // Frontend
  React:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  Bootstrap:     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Framer Motion":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  // Backend
  "Node.js":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js":  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  // Mobile
  "React Native":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Firebase:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  // AI / ML
  TensorFlow:    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  OpenCV:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  "Scikit-learn":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  Keras:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  NumPy:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  Pandas:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  Matplotlib:    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
  // Databases
  MySQL:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  // Tools
  Git:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  GitHub:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  Docker:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "VS Code":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
};

// ── Brand colour per skill ─────────────────────────
const COLORS = {
  JavaScript:"#F7DF1E", Python:"#3776AB",    React:"#61DAFB",
  "Node.js":"#68A063",  PHP:"#8892BF",        "C++":"#00599C",
  "VB.NET":"#512BD4",   MySQL:"#00758F",      SQL:"#336791",
  HTML:"#E44D26",       CSS:"#1572B6",         TensorFlow:"#FF6F00",
  OpenCV:"#5C8DBC",     "Scikit-learn":"#F7931E", Keras:"#D00000",
  NumPy:"#4DABCF",      Pandas:"#E70488",     Matplotlib:"#11557C",
  Firebase:"#FFA000",   "React Native":"#61DAFB", "Tailwind CSS":"#06B6D4",
  Bootstrap:"#7952B3",  "Express.js":"#aaa",  Git:"#F05033",
  GitHub:"#ccc",        Docker:"#2496ED",     "VS Code":"#007ACC",
  "Framer Motion":"#0055FF",
};

// ── Full skills data ───────────────────────────────
const ALL_SKILLS = {
  "Programming Languages": {
    color: "#FFB800", icon: "💻",
    desc: "Core languages powering every project",
    skills: ["JavaScript","Python","PHP","C++","VB.NET","SQL","HTML","CSS"],
  },
  "Frontend Development": {
    color: "#61DAFB", icon: "🎨",
    desc: "Building responsive, interactive user interfaces",
    skills: ["React","Tailwind CSS","Bootstrap","Framer Motion"],
  },
  "Backend Development": {
    color: "#68A063", icon: "🔧",
    desc: "Scalable server-side systems and APIs",
    skills: ["Node.js","Express.js"],
  },
  "Mobile Development": {
    color: "#A78BFA", icon: "📱",
    desc: "Cross-platform mobile applications",
    skills: ["React Native","Firebase"],
  },
  "AI / Machine Learning": {
    color: ORANGE, icon: "🤖",
    desc: "Intelligent systems and computer vision",
    skills: ["TensorFlow","OpenCV","Scikit-learn","Keras","NumPy","Pandas","Matplotlib"],
  },
  "Databases": {
    color: "#00758F", icon: "🗄️",
    desc: "Data storage and management",
    skills: ["MySQL","Firebase"],
  },
  "Tools & DevOps": {
    color: "#7B61FF", icon: "🛠️",
    desc: "Development workflow and infrastructure",
    skills: ["Git","GitHub","Docker","VS Code"],
  },
};

// Proficiency data with devicon logos
const PROFICIENCIES = [
  { name:"Python",         pct:90, cat:"Backend/AI"  },
  { name:"JavaScript",     pct:88, cat:"Frontend"    },
  { name:"React",          pct:86, cat:"Frontend"    },
  { name:"Node.js",        pct:84, cat:"Backend"     },
  { name:"PHP",            pct:80, cat:"Backend"     },
  { name:"MySQL",          pct:82, cat:"Database"    },
  { name:"TensorFlow",     pct:78, cat:"AI/ML"       },
  { name:"OpenCV",         pct:80, cat:"AI/ML"       },
  { name:"C++",            pct:72, cat:"Systems"     },
  { name:"VB.NET",         pct:70, cat:"Desktop"     },
  { name:"React Native",   pct:75, cat:"Mobile"      },
  { name:"Tailwind CSS",   pct:85, cat:"Frontend"    },
];

// useWindowWidth
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

// ── Animated count-up ──────────────────────────────
function useCountUp(target, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0;
    const step = Math.ceil(target / 50);
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(v);
    }, 20);
    return () => clearInterval(t);
  }, [active, target]);
  return count;
}

// ── Skill Logo ─────────────────────────────────────
function SkillLogo({ name, size = 32 }) {
  const src = ICONS[name];
  if (!src) return (
    <div style={{ width: size, height: size, borderRadius: 6,
      background: `${COLORS[name] || "#444"}30`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.45, fontWeight: 800, color: COLORS[name] || "#aaa" }}>
      {name.slice(0, 2)}
    </div>
  );
  return (
    <img src={src} alt={name} width={size} height={size}
      style={{ width: size, height: size, objectFit: "contain",
        filter: name === "GitHub" ? "invert(.8)" : name === "Express.js" ? "invert(.6)" : "none" }} />
  );
}

// ── Skill pill card ────────────────────────────────
function SkillPill({ name, index }) {
  const [hov, setHov] = useState(false);
  const [ref, vis]    = useReveal(0.05);
  const c = COLORS[name] || "#aaa";
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px",
        background: hov ? `${c}14` : "#111",
        border: `1px solid ${hov ? c + "80" : "#1e1e1e"}`,
        borderRadius: 12,
        cursor: "default",
        transition: "all .22s ease",
        opacity:   vis ? 1 : 0,
        transform: vis ? (hov ? "translateY(-3px)" : "translateY(0)") : "translateY(24px)",
        transitionDelay: `${index * 0.04}s`,
        boxShadow: hov ? `0 8px 24px ${c}18` : "none",
      }}
    >
      <SkillLogo name={name} size={28} />
      <span style={{
        fontSize: "clamp(11px,1.4vw,13px)", fontWeight: 700,
        color: hov ? "#fff" : "#bbb",
        transition: "color .22s",
        whiteSpace: "nowrap",
      }}>{name}</span>
      {/* Accent dot */}
      <div style={{
        width: 5, height: 5, borderRadius: "50%",
        background: c, marginLeft: "auto", flexShrink: 0,
        boxShadow: hov ? `0 0 8px ${c}` : "none",
        opacity: hov ? 1 : 0.35,
        transition: "all .22s",
      }} />
    </div>
  );
}

// ── Category section ───────────────────────────────
function CategorySection({ catName, data, index }) {
  const [ref, vis] = useReveal(0.07);
  const { color, icon, desc, skills } = data;
  return (
    <div
      ref={ref}
      style={{
        opacity:   vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .6s ease ${index * 0.08}s, transform .6s ease ${index * 0.08}s`,
        background: "#0d0d0d",
        border: `1px solid #1a1a1a`,
        borderRadius: 20,
        padding: "clamp(20px,3vw,32px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: -30, right: -30, width: 120, height: 120,
        background: `radial-gradient(circle, ${color}20, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `${color}18`, border: `1px solid ${color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, flexShrink: 0,
        }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <h3 style={{
              fontSize: "clamp(14px,1.8vw,17px)", fontWeight: 800, color: "#fff",
              margin: 0, fontFamily: "'Space Grotesk',sans-serif",
            }}>{catName}</h3>
            <span style={{
              fontSize: 10, fontWeight: 700, color: color,
              background: `${color}18`, border: `1px solid ${color}40`,
              borderRadius: 99, padding: "2px 9px",
              letterSpacing: "0.06em",
            }}>{skills.length} skills</span>
          </div>
          <p style={{ fontSize: "clamp(11px,1.3vw,12px)", color: "#555", margin: "4px 0 0", lineHeight: 1.5 }}>{desc}</p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: `linear-gradient(90deg, ${color}40, transparent)`, marginBottom: 18 }} />

      {/* Skills grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(clamp(130px,18vw,160px), 1fr))",
        gap: "clamp(8px,1.5vw,12px)",
      }}>
        {skills.map((s, i) => <SkillPill key={s} name={s} index={i} />)}
      </div>
    </div>
  );
}

// ── Proficiency row ────────────────────────────────
function ProficiencyRow({ name, pct, cat, index }) {
  const [ref, vis] = useReveal(0.08);
  const count = useCountUp(pct, vis);
  const c = COLORS[name] || ORANGE;

  return (
    <div
      ref={ref}
      style={{
        opacity:   vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(16px)",
        transition: `opacity .5s ease ${index * 0.05}s, transform .5s ease ${index * 0.05}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        {/* Logo */}
        <SkillLogo name={name} size={22} />
        {/* Name */}
        <span style={{ fontSize: "clamp(12px,1.5vw,14px)", fontWeight: 700, color: "#ccc", flex: 1 }}>{name}</span>
        {/* Category badge */}
        <span style={{
          fontSize: 9, fontWeight: 700, color: c,
          background: `${c}14`, border: `1px solid ${c}35`,
          borderRadius: 99, padding: "2px 8px",
          letterSpacing: "0.08em", textTransform: "uppercase",
        }}>{cat}</span>
        {/* Percentage */}
        <span style={{ fontSize: 13, fontWeight: 900, color: c,
          fontFamily: "'Space Grotesk',sans-serif", minWidth: 38, textAlign: "right" }}>
          {count}%
        </span>
      </div>
      {/* Bar */}
      <div style={{ height: 5, background: "#161616", borderRadius: 99, overflow: "hidden",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,.5)" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          width: vis ? `${pct}%` : "0%",
          background: `linear-gradient(90deg, ${c}dd, ${c})`,
          transition: vis ? "width 1.2s cubic-bezier(.4,0,.2,1)" : "none",
          boxShadow: `0 0 8px ${c}70`,
          position: "relative", overflow: "hidden",
        }}>
          {/* Shimmer */}
          {vis && (
            <div style={{
              position: "absolute", top: 0, bottom: 0, width: "30%",
              background: "linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)",
              animation: "profShimmer 1.8s ease-out 1.2s 1 forwards",
            }} />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Hero stat card ─────────────────────────────────
function StatCard({ num, label, color, index }) {
  const [ref, vis] = useReveal(0.2);
  const count = useCountUp(num, vis);
  return (
    <div ref={ref} style={{
      textAlign: "center",
      padding: "clamp(18px,3vw,28px) clamp(12px,2vw,20px)",
      background: "#0d0d0d",
      border: `1px solid ${vis ? color + "40" : "#1a1a1a"}`,
      borderRadius: 18,
      opacity:   vis ? 1 : 0,
      transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(.97)",
      transition: `all .6s ease ${index * 0.1}s`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 18,
        background: `radial-gradient(circle at 50% 0%, ${color}12, transparent 65%)`,
        opacity: vis ? 1 : 0, transition: "opacity .6s", pointerEvents: "none" }} />
      <div style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, color,
        fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1, position: "relative" }}>
        {count}<span style={{ fontSize: ".5em", opacity: .7 }}>+</span>
      </div>
      <div style={{ fontSize: "clamp(10px,1.3vw,12px)", color: "#555",
        marginTop: 6, fontWeight: 600, position: "relative" }}>{label}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════
export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("All");
  const w = useWindowWidth();

  const filters = ["All", ...Object.keys(ALL_SKILLS)];
  const filtered = activeFilter === "All"
    ? ALL_SKILLS
    : { [activeFilter]: ALL_SKILLS[activeFilter] };

  // Total skills count
  const totalSkills = Object.values(ALL_SKILLS).reduce((a, c) => a + c.skills.length, 0);

  return (
    <PageWrapper>
      <style>{`
        @keyframes profShimmer { from{left:-35%} to{left:120%} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={{
        background: "#0a0a0a", position: "relative", overflow: "hidden",
        padding: "clamp(64px,9vw,110px) 0 clamp(40px,6vw,64px)",
      }}>
        {/* Grid bg */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`linear-gradient(rgba(255,107,0,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,.03) 1px,transparent 1px)`,
          backgroundSize:"60px 60px" }} />
        {/* Glow */}
        <div style={{ position:"absolute", top:"-10%", right:"-5%", width:"50vw", height:"50vw",
          background:`radial-gradient(circle,${ORANGE}08,transparent 60%)`, pointerEvents:"none" }} />

        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24,
            animation:"fadeSlideUp .6s ease forwards" }}>
            <span style={{ fontSize:12, color:"#444" }}>Portfolio</span>
            <span style={{ fontSize:12, color:"#2a2a2a" }}>/</span>
            <span style={{ fontSize:12, color:ORANGE, fontWeight:600 }}>Skills</span>
          </div>

          {/* Title */}
          <div style={{ animation:"fadeSlideUp .7s ease .05s both" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:16,
              fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:ORANGE,
              textTransform:"uppercase", padding:"4px 14px",
              border:`1px solid ${ORANGE}40`, borderRadius:99, background:`${ORANGE}10` }}>
              Technical Expertise
            </div>
            <h1 style={{ fontSize:"clamp(28px,5vw,56px)", fontWeight:900,
              fontFamily:"'Space Grotesk',sans-serif", lineHeight:1.08,
              margin:"0 0 16px", letterSpacing:"-0.03em", color:"#fff" }}>
              Skills &amp; <span style={{ color:ORANGE }}>Technologies</span>
            </h1>
            <p style={{ fontSize:"clamp(14px,1.8vw,17px)", color:"#666", lineHeight:1.8,
              maxWidth:580, margin:0 }}>
              A comprehensive overview of the technologies, frameworks, and tools I use to build
              production-grade software — from intelligent AI systems to scalable web applications.
            </p>
          </div>

          {/* Stats row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${w < 480 ? 2 : 4}, 1fr)`,
            gap: "clamp(10px,2vw,16px)",
            marginTop: "clamp(36px,5vw,56px)",
            animation: "fadeSlideUp .8s ease .15s both",
          }}>
            {[
              { num:7,          label:"Technology Domains", color:ORANGE     },
              { num:totalSkills,label:"Total Skills",       color:"#61DAFB"  },
              { num:4,          label:"Years Experience",   color:"#68A063"  },
              { num:3,          label:"AI Systems Built",   color:"#A78BFA"  },
            ].map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
          </div>
        </div>
      </div>

      {/* ══ FILTER BAR ══ */}
      <div style={{ background:"#0d0d0d", borderTop:"1px solid #1a1a1a",
        borderBottom:"1px solid #1a1a1a", position:"sticky", top:64, zIndex:50 }}>
        <div className="container" style={{ padding:"clamp(12px,2vw,16px) clamp(16px,4vw,24px)" }}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
            <span style={{ fontSize:11, color:"#444", fontWeight:600,
              letterSpacing:"0.08em", textTransform:"uppercase", marginRight:4, flexShrink:0 }}>
              Filter:
            </span>
            {filters.map(f => {
              const isActive = activeFilter === f;
              const catColor = ALL_SKILLS[f]?.color || ORANGE;
              return (
                <button key={f} onClick={() => setActiveFilter(f)} style={{
                  padding: "6px 14px", borderRadius: 99, cursor: "pointer",
                  fontSize: "clamp(11px,1.4vw,12px)", fontWeight: 700,
                  border: `1px solid ${isActive ? catColor : "#2a2a2a"}`,
                  background: isActive ? `${catColor}18` : "#111",
                  color: isActive ? catColor : "#666",
                  transition: "all .2s",
                  whiteSpace: "nowrap",
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = "#444"; e.currentTarget.style.color = "#ccc"; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#666"; }}}
                >{f}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ SKILLS CATEGORIES ══ */}
      <div className="section-pad" style={{ background:"#0a0a0a" }}>
        <div className="container">
          <div style={{ display:"flex", flexDirection:"column", gap:"clamp(16px,2.5vw,22px)" }}>
            {Object.entries(filtered).map(([catName, data], i) => (
              <CategorySection key={catName} catName={catName} data={data} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ PROFICIENCY LEVELS ══ */}
      <div className="section-pad" style={{ background:"#0d0d0d" }}>
        <div className="container">
          {/* Section header */}
          <div style={{ marginBottom:"clamp(32px,4vw,48px)" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:12,
              fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:ORANGE,
              textTransform:"uppercase", padding:"4px 14px",
              border:`1px solid ${ORANGE}40`, borderRadius:99, background:`${ORANGE}10` }}>
              Proficiency
            </div>
            <h2 style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:900, color:"#fff",
              margin:"0 0 10px", fontFamily:"'Space Grotesk',sans-serif", lineHeight:1.15 }}>
              Skill Proficiency Levels
            </h2>
            <p style={{ fontSize:"clamp(12px,1.5vw,14px)", color:"#555", margin:0, lineHeight:1.7 }}>
              Self-assessed proficiency based on years of professional use and project delivery.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: w < 768 ? "1fr" : "1fr 1fr",
            gap: "clamp(18px,3vw,32px) clamp(32px,5vw,64px)",
            alignItems: "start",
          }}>
            {PROFICIENCIES.map((p, i) => (
              <ProficiencyRow key={p.name} {...p} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ AI EXPERTISE BANNER ══ */}
      <div className="section-pad" style={{ background:"#0a0a0a" }}>
        <div className="container">
          <div style={{
            background: `linear-gradient(135deg, ${ORANGE}12, ${ORANGE}05, #0d0d0d)`,
            border: `1px solid ${ORANGE}30`,
            borderRadius: 22,
            padding: "clamp(28px,4vw,48px) clamp(24px,4vw,48px)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
              width:"60%", height:"60%", background:`radial-gradient(circle,${ORANGE}08,transparent 65%)`,
              pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1, display:"flex",
              alignItems:"center", gap:"clamp(24px,4vw,48px)", flexWrap:"wrap" }}>
              <div style={{ flex:"1 1 260px", minWidth:0 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:12,
                  fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:ORANGE,
                  textTransform:"uppercase", padding:"4px 14px",
                  border:`1px solid ${ORANGE}40`, borderRadius:99, background:`${ORANGE}10` }}>
                  Specialisation
                </div>
                <h3 style={{ fontSize:"clamp(18px,3vw,28px)", fontWeight:900, color:"#fff",
                  margin:"0 0 12px", fontFamily:"'Space Grotesk',sans-serif", lineHeight:1.2 }}>
                  AI &amp; Machine Learning<br/>
                  <span style={{ color:ORANGE }}>Areas of Expertise</span>
                </h3>
                <p style={{ fontSize:"clamp(12px,1.5vw,14px)", color:"#666",
                  lineHeight:1.8, margin:0, maxWidth:400 }}>
                  Deep practical experience in computer vision, deep learning architectures, and deploying
                  AI-powered systems into real-world production environments.
                </p>
              </div>
              <div style={{ flex:"0 1 auto", display:"flex", flexWrap:"wrap",
                gap:10, justifyContent: w < 640 ? "flex-start" : "flex-end" }}>
                {["Machine Learning","Computer Vision","Deep Learning","Image Processing",
                  "Neural Networks","Model Deployment"].map(tag => (
                  <div key={tag} style={{
                    display:"flex", alignItems:"center", gap:7,
                    padding:"8px 16px",
                    background:"#111", border:`1px solid ${ORANGE}35`,
                    borderRadius:99,
                  }}>
                    <span style={{ width:6, height:6, borderRadius:"50%",
                      background:ORANGE, boxShadow:`0 0 6px ${ORANGE}`, flexShrink:0 }} />
                    <span style={{ fontSize:"clamp(11px,1.4vw,13px)", fontWeight:600, color:"#ccc" }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
