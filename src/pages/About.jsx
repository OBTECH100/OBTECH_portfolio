import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  PageWrapper, SectionHeading, Footer, useReveal,
  GithubIcon, LinkedInIcon, MailIcon,
} from "../components/shared";
import { ORANGE } from "../data";

// ── Devicon CDN URLs ───────────────────────────────
const DEVICONS = {
  JavaScript:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Python:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  React:       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  NodeJS:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  PHP:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Cplusplus:   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  VBNET:       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  MySQL:       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  TensorFlow:  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  OpenCV:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  ReactNative: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Tailwind:    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  HTML:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  SQL:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  Bootstrap:   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  Express:     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  Firebase:    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  Git:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Docker:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Keras:       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  NumPy:       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  Pandas:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  Sklearn:     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
};

const TECH_COLOR = {
  JavaScript:"#F7DF1E", Python:"#3776AB",    React:"#61DAFB",       NodeJS:"#68A063",
  PHP:"#8892BF",        Cplusplus:"#00599C",  VBNET:"#512BD4",       MySQL:"#00758F",
  TensorFlow:"#FF6F00", OpenCV:"#5C8DBC",    ReactNative:"#61DAFB",  Tailwind:"#06B6D4",
  HTML:"#E44D26",       CSS:"#1572B6",        SQL:"#336791",          Bootstrap:"#7952B3",
  Express:"#aaa",       Firebase:"#FFA000",   Git:"#F05033",          Docker:"#2496ED",
  Keras:"#D00000",      NumPy:"#4DABCF",      Pandas:"#E70488",       Sklearn:"#F7931E",
};

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

// ── DATA ───────────────────────────────────────────
const proficiencies = [
  { name:"JavaScript",   key:"JavaScript",  pct:88, cat:"Frontend"   },
  { name:"Python",       key:"Python",      pct:90, cat:"Backend/AI" },
  { name:"React",        key:"React",       pct:86, cat:"Frontend"   },
  { name:"Node.js",      key:"NodeJS",      pct:84, cat:"Backend"    },
  { name:"PHP",          key:"PHP",         pct:80, cat:"Backend"    },
  { name:"C++",          key:"Cplusplus",   pct:72, cat:"Systems"    },
  { name:"VB.NET",       key:"VBNET",       pct:70, cat:"Desktop"    },
  { name:"MySQL",        key:"MySQL",       pct:82, cat:"Database"   },
  { name:"TensorFlow",   key:"TensorFlow",  pct:78, cat:"AI/ML"      },
  { name:"OpenCV",       key:"OpenCV",      pct:80, cat:"AI/ML"      },
  { name:"React Native", key:"ReactNative", pct:75, cat:"Mobile"     },
  { name:"Tailwind CSS", key:"Tailwind",    pct:85, cat:"Frontend"   },
];

const toolCategories = [
  { label:"Programming Languages", icon:"💻", color:"#FFB800",
    tools:[{name:"JavaScript",key:"JavaScript"},{name:"Python",key:"Python"},
           {name:"PHP",key:"PHP"},{name:"C++",key:"Cplusplus"},
           {name:"VB.NET",key:"VBNET"},{name:"SQL",key:"SQL"},
           {name:"HTML",key:"HTML"},{name:"CSS",key:"CSS"}] },
  { label:"Frontend Development", icon:"🎨", color:"#61DAFB",
    tools:[{name:"React",key:"React"},{name:"Tailwind CSS",key:"Tailwind"},
           {name:"Bootstrap",key:"Bootstrap"},{name:"Framer Motion",key:"FramerMotion"}] },
  { label:"Backend Development", icon:"🔧", color:"#68A063",
    tools:[{name:"Node.js",key:"NodeJS"},{name:"Express.js",key:"Express"}] },
  { label:"Mobile App Development", icon:"📱", color:"#A78BFA",
    tools:[{name:"React Native",key:"ReactNative"},{name:"Firebase",key:"Firebase"}] },
  { label:"AI / Machine Learning", icon:"🤖", color:ORANGE,
    tools:[{name:"TensorFlow",key:"TensorFlow"},{name:"OpenCV",key:"OpenCV"},
           {name:"Scikit-learn",key:"Sklearn"},{name:"Keras",key:"Keras"},
           {name:"NumPy",key:"NumPy"},{name:"Pandas",key:"Pandas"},
           {name:"Matplotlib",key:"Matplotlib"}] },
  { label:"Databases", icon:"🗄️", color:"#00758F",
    tools:[{name:"MySQL",key:"MySQL"},{name:"Firebase",key:"Firebase"}] },
];

const aiExpertise = ["Machine Learning","Computer Vision","Image Processing","Deep Learning"];

const stats = [
  { num:4,  suffix:"+", label:"Years Professional Experience" },
  { num:10, suffix:"+", label:"Projects Delivered"             },
  { num:4,  suffix:"",  label:"Core Disciplines"               },
  { num:3,  suffix:"",  label:"AI Systems Built"               },
];

const timeline = [
  { year:"2020", title:"First Line of Code",
    body:"Wrote my first lines of HTML & CSS. Built static websites and discovered a genuine passion for software engineering.",
    color:"#68A063" },
  { year:"2021", title:"Backend Foundations",
    body:"Mastered PHP, SQL and MySQL. Delivered first dynamic, database-driven applications with user authentication systems.",
    color:"#8892BF" },
  { year:"2022", title:"Modern JavaScript & React",
    body:"Transitioned to modern frontend development. Built production React applications and integrated REST APIs professionally.",
     color:"#61DAFB" },
  { year:"2023", title:"Entering AI & Computer Vision",
    body:"Expanded into Python, TensorFlow and OpenCV. Designed and deployed first face recognition system used in production.",
     color:ORANGE },
  { year:"2024", title:"Full-Stack Production Projects",
    body:"Delivered multiple end-to-end products across healthcare and education sectors. Entered React Native mobile development.",
     color:"#A78BFA" },
  { year:"2025", title:"Working Professionally",
    body:"Advanced into backend architecture, ML pipeline engineering, and cross-platform mobile. Currently working professionally and open to new engagements.",
    icon:"✦", color:ORANGE, current:true },
];

const principles = [
  { num:"01", title:"Engineering Integrity",   desc:"Every system I design is secure by default, tested thoroughly, and documented clearly. Quality is not negotiable." },
  { num:"02", title:"Scalable by Design",      desc:"Architecture decisions are made with growth in mind. I build for today's requirements and tomorrow's scale." },
  { num:"03", title:"Clarity Over Complexity", desc:"The best solutions are the simplest ones that fully solve the problem. I favour code that communicates its intent." },
  { num:"04", title:"Continuous Improvement",  desc:"Software engineering is a discipline of perpetual learning. I invest consistently in deepening technical knowledge." },
];

// ── Helpers ────────────────────────────────────────
function Counter({ target, suffix="" }) {
  const [count, setCount] = useState(0);
  const [ref, vis] = useReveal(0.2);
  useEffect(() => {
    if (!vis) return;
    let v=0; const step=Math.ceil(target/45);
    const t=setInterval(()=>{ v+=step; if(v>=target){setCount(target);clearInterval(t);}else setCount(v); },30);
    return ()=>clearInterval(t);
  },[vis,target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Reveal({ children, delay=0, direction="up" }) {
  const [ref, vis] = useReveal(0.07);
  const map={ up:"translateY(24px)", left:"translateX(-28px)", right:"translateX(28px)" };
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translate(0)":map[direction], transition:`opacity .65s ease ${delay}s, transform .65s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ── Tool card ──────────────────────────────────────
function ToolCard({ name, logoKey, catColor, index }) {
  const [hov, setHov] = useState(false);
  const [ref, vis] = useReveal(0.04);
  const c = TECH_COLOR[logoKey] || catColor;
  const imgSrc = DEVICONS[logoKey];
  return (
    <div ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6,
        padding:"12px 10px", background:hov?`${c}14`:"#111",
        border:`1px solid ${hov?c+"70":"#1e1e1e"}`, borderRadius:12, cursor:"default",
        transition:"all .22s", transform:vis?(hov?"translateY(-4px) scale(1.04)":"translateY(0)"):"translateY(28px)",
        opacity:vis?1:0, transitionDelay:`${index*.04}s`,
        boxShadow:hov?`0 8px 22px ${c}20`:"none", minWidth:72, flex:"0 0 auto",
      }}>
      {imgSrc
        ? <img src={imgSrc} alt={name} width="28" height="28"
            style={{ width:28, height:28, objectFit:"contain", filter:logoKey==="Express"?"invert(.7)":"none" }} />
        : <div style={{ width:28, height:28, borderRadius:6, background:`${c}30`, display:"flex", alignItems:"center", justifyContent:"center", color:c, fontWeight:700, fontSize:12 }}>{name.slice(0,2)}</div>
      }
      <span style={{ fontSize:10, color:hov?"#fff":"#666", fontWeight:600, textAlign:"center", lineHeight:1.25, whiteSpace:"nowrap" }}>{name}</span>
    </div>
  );
}

function ToolCategory({ label, icon, color, tools, index }) {
  const [ref, vis] = useReveal(0.06);
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(28px)", transition:`all .6s ease ${index*.07}s` }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, flexWrap:"wrap" }}>
        <div style={{ width:32, height:32, borderRadius:8, background:`${color}18`, border:`1px solid ${color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{icon}</div>
        <h3 style={{ fontSize:"clamp(12px,1.6vw,14px)", fontWeight:800, color:"#fff", margin:0, fontFamily:"'Space Grotesk',sans-serif" }}>{label}</h3>
        <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${color}40,transparent)`, minWidth:20 }} />
        <span style={{ fontSize:10, color:"#444" }}>{tools.length} tools</span>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {tools.map((t,i)=><ToolCard key={t.key+i} name={t.name} logoKey={t.key} catColor={color} index={i} />)}
      </div>
    </div>
  );
}

// ── Animated Circular Skill Ring ──────────────────
function SkillRing({ name, logoKey, pct, cat, index }) {
  const outerRef = useRef(null);
  const [vis,     setVis]     = useState(false);
  const [count,   setCount]   = useState(0);
  const [hov,     setHov]     = useState(false);

  const c      = TECH_COLOR[logoKey] || ORANGE;
  const imgSrc = DEVICONS[logoKey];

  // Circumference math
  const R    = 38;
  const CIRC = 2 * Math.PI * R;
  const dash = vis ? CIRC - (pct / 100) * CIRC : CIRC;

  // IntersectionObserver
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Count-up after reveal
  useEffect(() => {
    if (!vis) return;
    // wait for arc transition to start
    const delay = setTimeout(() => {
      let v = 0;
      const step = Math.ceil(pct / 52);
      const t = setInterval(() => {
        v += step;
        if (v >= pct) { setCount(pct); clearInterval(t); }
        else setCount(v);
      }, 22);
      return () => clearInterval(t);
    }, 180 + index * 60);
    return () => clearTimeout(delay);
  }, [vis, pct, index]);

  return (
    <div
      ref={outerRef}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        padding: "clamp(14px,2.2vw,20px) clamp(10px,1.5vw,14px)",
        background: hov ? `${c}12` : "#0d0d0d",
        border: `1px solid ${hov ? c + "80" : "#1e1e1e"}`,
        borderRadius: 18,
        cursor: "default",
        transition: "all .28s ease",
        /* Reveal */
        opacity:   vis ? 1 : 0,
        transform: vis
          ? (hov ? "translateY(-7px) scale(1.04)" : "translateY(0)")
          : "translateY(40px)",
        transitionDelay: vis ? `${index * 0.055}s` : "0s",
        boxShadow: hov ? `0 18px 44px ${c}22` : "0 2px 12px rgba(0,0,0,.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow on hover */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 50% 40%, ${c}16, transparent 68%)`,
        opacity: hov ? 1 : 0,
        transition: "opacity .28s",
        pointerEvents: "none",
        borderRadius: 18,
      }} />

      {/* ── SVG Ring ── */}
      <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
        <svg
          width="100" height="100" viewBox="0 0 100 100"
          style={{ transform: "rotate(-90deg)", overflow: "visible" }}
        >
          {/* Track ring */}
          <circle
            cx="50" cy="50" r={R}
            fill="none"
            stroke="#1e1e1e"
            strokeWidth="6"
          />
          {/* Glow halo (wider, transparent) */}
          <circle
            cx="50" cy="50" r={R}
            fill="none"
            stroke={c}
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dash}
            opacity={hov ? 0.2 : 0.08}
            style={{
              transition: vis
                ? `stroke-dashoffset 1.35s cubic-bezier(.4,0,.2,1) ${index * 0.055}s, opacity .28s`
                : "none",
            }}
          />
          {/* Main arc */}
          <circle
            cx="50" cy="50" r={R}
            fill="none"
            stroke={c}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dash}
            style={{
              transition: vis
                ? `stroke-dashoffset 1.35s cubic-bezier(.4,0,.2,1) ${index * 0.055}s`
                : "none",
              filter: hov ? `drop-shadow(0 0 5px ${c})` : `drop-shadow(0 0 2px ${c}80)`,
            }}
          />
        </svg>

        {/* Centre: logo + % */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 3,
        }}>
          {/* Logo */}
          {imgSrc ? (
            <img
              src={imgSrc} alt={name}
              style={{
                width: 28, height: 28, objectFit: "contain",
                filter: logoKey === "Express" ? "invert(.65)" : "none",
                transition: "transform .28s",
                transform: hov ? "scale(1.15)" : "scale(1)",
              }}
            />
          ) : (
            <span style={{ fontSize: 16, fontWeight: 800, color: c, lineHeight: 1 }}>
              {name.slice(0, 2)}
            </span>
          )}
          {/* Live counter */}
          <span style={{
            fontSize: 11, fontWeight: 900, color: c,
            fontFamily: "'Space Grotesk',sans-serif",
            lineHeight: 1,
          }}>{count}%</span>
        </div>
      </div>

      {/* Name */}
      <div style={{
        fontSize: "clamp(10px,1.3vw,12px)", fontWeight: 800,
        color: hov ? "#fff" : "#ccc",
        fontFamily: "'Space Grotesk',sans-serif",
        textAlign: "center", lineHeight: 1.25,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        width: "100%", padding: "0 4px",
        transition: "color .28s",
      }}>{name}</div>

      {/* Category badge */}
      <div style={{
        fontSize: 9, fontWeight: 700,
        color: c, letterSpacing: "0.1em",
        textTransform: "uppercase", opacity: 0.85,
        background: `${c}14`, border: `1px solid ${c}35`,
        borderRadius: 99, padding: "2px 9px",
        transition: "background .28s, border-color .28s",
        ...(hov && { background: `${c}24`, borderColor: `${c}60` }),
      }}>{cat}</div>
    </div>
  );
}

// ── Timeline ───────────────────────────────────────
// Mobile: single left-aligned column
// Desktop (≥640px): alternating L/R with centre spine
function TimelineItem({ item, index }) {
  const [ref, vis] = useReveal(0.1);
  const [hov, setHov] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isLeft = index % 2 === 0;

  const Card = (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:hov?`${item.color}08`:"#111",
        border:`1px solid ${hov||item.current?item.color+"60":"#222"}`,
        borderRadius:16, padding:"clamp(14px,2.5vw,20px) clamp(14px,2.8vw,22px)",
        width:"100%", maxWidth: isMobile ? "100%" : "clamp(220px,36vw,330px)",
        transition:"all .35s", opacity:vis?1:0,
        transform: vis?(hov?"translateY(-4px)":"translateY(0)"):"translateY(32px)",
        transitionDelay:`${index*.1}s`,
        boxShadow:hov||item.current?`0 14px 40px ${item.color}18`:"none",
        position:"relative", overflow:"hidden",
      }}>
      {/* Top accent */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg,transparent,${item.color},transparent)`,
        opacity:hov||item.current?1:0, transition:"opacity .3s" }} />
      {/* Year badge */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:5,
          fontSize:10, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase",
          color:item.current?"#000":item.color,
          background:item.current?item.color:`${item.color}18`,
          border:`1px solid ${item.current?item.color:item.color+"40"}`,
          borderRadius:99, padding:"3px 10px" }}>
          {item.current && <span style={{ width:5, height:5, borderRadius:"50%", background:"#000", animation:"blink 1s step-start infinite" }} />}
          {item.year}
        </div>
        <span style={{ fontSize:15 }}>{item.icon}</span>
        {item.current && <span style={{ fontSize:10, color:"#00C864", fontWeight:700, marginLeft:2 }}>Now</span>}
      </div>
      <h4 style={{ fontSize:"clamp(13px,1.7vw,15px)", fontWeight:800, color:hov?"#fff":"#ddd",
        margin:"0 0 7px", fontFamily:"'Space Grotesk',sans-serif", transition:"color .3s" }}>{item.title}</h4>
      <p style={{ fontSize:"clamp(11px,1.4vw,13px)", color:hov?"#999":"#666",
        lineHeight:1.8, margin:0, transition:"color .3s" }}>{item.body}</p>
      {/* Side bar */}
      <div style={{ position:"absolute", top:0, bottom:0,
        [isMobile?"left":(isLeft?"right":"left")]: 0, width:3,
        borderRadius:"99px",
        background:`linear-gradient(180deg,${item.color},${item.color}20)`,
        opacity:hov||item.current?1:0, transition:"opacity .35s" }} />
    </div>
  );

  // ── MOBILE layout ──
  if (isMobile) return (
    <div ref={ref} style={{ display:"flex", gap:16, marginBottom:24, position:"relative" }}>
      {/* Left spine + dot */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0, width:32 }}>
        <div style={{ width:item.current?18:14, height:item.current?18:14, borderRadius:"50%",
          background:item.current?item.color:"#1a1a1a",
          border:`2px solid ${item.color}`,
          boxShadow:item.current?`0 0 0 4px ${item.color}30,0 0 20px ${item.color}80`:`0 0 10px ${item.color}50`,
          flexShrink:0, marginTop:16, position:"relative", zIndex:2,
          opacity:vis?1:0, transform:vis?"scale(1)":"scale(0)",
          transition:`transform .4s ease ${index*.1+.2}s, opacity .4s ease ${index*.1+.2}s` }}>
          {item.current && [1,2].map(k=>(
            <div key={k} style={{ position:"absolute", inset:-k*6, borderRadius:"50%",
              border:`1px solid ${item.color}`, animation:`pulse-ring ${1.5+k*.5}s ease-out ${k*.3}s infinite`, opacity:0 }} />
          ))}
        </div>
        {/* Pulse line down */}
        {index < timeline.length-1 && (
          <div style={{ width:2, flex:1, minHeight:20, position:"relative", overflow:"hidden", marginTop:4 }}>
            <div style={{ position:"absolute", inset:0, background:"#1e1e1e" }} />
            <div style={{ position:"absolute", left:0, right:0, height:"40%",
              background:`linear-gradient(180deg,transparent,${item.color}80,transparent)`,
              animation:vis?"pulseDown 2s ease-in-out infinite":"none",
              animationDelay:`${index*.3}s` }} />
          </div>
        )}
      </div>
      {/* Card */}
      <div style={{ flex:1, minWidth:0 }}>{Card}</div>
    </div>
  );

  // ── DESKTOP layout — alternating ──
  return (
    <div ref={ref} style={{ display:"grid", gridTemplateColumns:"1fr 56px 1fr",
      alignItems:"start", marginBottom:"clamp(20px,3vw,32px)" }}>

      {/* Left slot */}
      <div style={{ display:"flex", justifyContent:"flex-end", paddingRight:20 }}>
        {isLeft && Card}
      </div>

      {/* Centre: dot + pulse */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ width:item.current?20:15, height:item.current?20:15, borderRadius:"50%",
          background:item.current?item.color:"#1a1a1a",
          border:`2px solid ${item.color}`,
          boxShadow:item.current?`0 0 0 5px ${item.color}30,0 0 24px ${item.color}80`:`0 0 12px ${item.color}50`,
          marginTop:18, zIndex:3, flexShrink:0, position:"relative",
          opacity:vis?1:0, transform:vis?"scale(1)":"scale(0)",
          transition:`transform .45s ease ${index*.1+.22}s, opacity .45s ease ${index*.1+.22}s` }}>
          {item.current && [1,2].map(k=>(
            <div key={k} style={{ position:"absolute", inset:-k*7, borderRadius:"50%",
              border:`1px solid ${item.color}`, animation:`pulse-ring ${1.6+k*.5}s ease-out ${k*.35}s infinite`, opacity:0 }} />
          ))}
        </div>
        {index < timeline.length-1 && (
          <div style={{ width:2, flex:1, minHeight:40, position:"relative", overflow:"hidden", marginTop:4 }}>
            <div style={{ position:"absolute", inset:0, background:"#1e1e1e" }} />
            <div style={{ position:"absolute", left:0, right:0, height:"40%",
              background:`linear-gradient(180deg,transparent,${item.color}80,transparent)`,
              animation:vis?"pulseDown 2s ease-in-out infinite":"none",
              animationDelay:`${index*.3}s` }} />
          </div>
        )}
      </div>

      {/* Right slot */}
      <div style={{ display:"flex", justifyContent:"flex-start", paddingLeft:20 }}>
        {!isLeft && Card}
      </div>
    </div>
  );
}

// ── Principle card ─────────────────────────────────
function PrincipleCard({ num, title, desc, index }) {
  const [hov, setHov] = useState(false);
  const [ref, vis] = useReveal(0.07);
  return (
    <div ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"flex", gap:"clamp(12px,2vw,18px)", alignItems:"flex-start",
        padding:"clamp(16px,2.5vw,22px)", background:hov?`${ORANGE}06`:"#0d0d0d",
        border:`1px solid ${hov?ORANGE+"40":"#1e1e1e"}`, borderRadius:14,
        transition:"all .3s", transform:vis?"translateY(0)":"translateY(26px)",
        opacity:vis?1:0, transitionDelay:`${index*.08}s` }}>
      <div style={{ fontSize:"clamp(18px,2.8vw,26px)", fontWeight:900,
        color:hov?ORANGE:"#2a2a2a", fontFamily:"'Space Grotesk',sans-serif",
        lineHeight:1, flexShrink:0, transition:"color .3s", minWidth:28 }}>{num}</div>
      <div>
        <h4 style={{ fontSize:"clamp(13px,1.7vw,15px)", fontWeight:700, color:"#fff",
          margin:"0 0 6px", fontFamily:"'Space Grotesk',sans-serif" }}>{title}</h4>
        <p style={{ fontSize:"clamp(11px,1.4vw,13px)", color:"#666", lineHeight:1.75, margin:0 }}>{desc}</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════
export default function About() {
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 900;

  return (
    <PageWrapper>
      {/* Global styles for timeline pulse animation */}
      <style>{`
        @keyframes pulseDown { 0%{top:-42%} 100%{top:145%} }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={{ background:"#0a0a0a", position:"relative", overflow:"hidden",
        padding:`${isMobile?"60px":"clamp(60px,9vw,110px)"} 0 clamp(48px,7vw,80px)` }}>
        <div style={{ position:"absolute", inset:0,
          backgroundImage:`linear-gradient(rgba(255,107,0,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,.025) 1px,transparent 1px)`,
          backgroundSize:"70px 70px", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"-15%", right:"-5%", width:"45vw", height:"45vw",
          background:`radial-gradient(circle,${ORANGE}07,transparent 60%)`, pointerEvents:"none" }} />

        <div className="container">
          <div style={{ display:"flex", alignItems:"center", gap:"clamp(28px,5vw,64px)",
            flexDirection: isMobile?"column-reverse":"row",
            flexWrap:"wrap", justifyContent:"space-between" }}>

            {/* Text */}
            <div style={{ flex:"1 1 280px", minWidth:0, animation:"fade-up .75s ease forwards",
              textAlign: isMobile?"center":"left" }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20,
                justifyContent: isMobile?"center":"flex-start" }}>
                {["Backend","Frontend","Mobile","AI / ML"].map(t=>(
                  <span key={t} style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em",
                    textTransform:"uppercase", color:ORANGE, padding:"4px 11px",
                    border:`1px solid ${ORANGE}40`, borderRadius:99, background:`${ORANGE}10` }}>{t}</span>
                ))}
              </div>
              <h1 style={{ fontSize:"clamp(26px,5vw,54px)", fontWeight:900,
                fontFamily:"'Space Grotesk',sans-serif", lineHeight:1.08,
                margin:"0 0 8px", letterSpacing:"-0.03em", color:"#fff" }}>
                Adekoya Oluwasegun
              </h1>
              <h2 style={{ fontSize:"clamp(14px,2.5vw,22px)", fontWeight:600, color:ORANGE,
                margin:"0 0 20px", fontFamily:"'Space Grotesk',sans-serif" }}>
                Fullstack Developer | AI &amp; Mobile Innovator
              </h2>
              <p style={{ fontSize:"clamp(13px,1.7vw,15px)", color:"#888", lineHeight:1.85,
                maxWidth:540, margin: isMobile?"0 auto 12px":"0 0 12px" }}>
                A professionally experienced Software Developer with a proven track record across backend systems, frontend interfaces, mobile applications, and AI engineering. Based in Ogun State, Nigeria.
              </p>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:24,
                justifyContent: isMobile?"center":"flex-start" }}>
                <Link to="/projects" style={{ padding:"10px 20px", background:ORANGE, color:"#000",
                  borderRadius:10, fontSize:"clamp(12px,1.5vw,13px)", fontWeight:700,
                  textDecoration:"none", boxShadow:`0 0 16px ${ORANGE}45`, transition:"all .2s",
                  display:"inline-block" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 22px ${ORANGE}55`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 0 16px ${ORANGE}45`;}}
                >View Portfolio</Link>
                <a href="/resume.pdf" style={{ padding:"10px 20px", border:"1px solid #333",
                  borderRadius:10, fontSize:"clamp(12px,1.5vw,13px)", fontWeight:700, color:"#fff",
                  textDecoration:"none", background:"#141414", transition:"all .2s", display:"inline-block" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=ORANGE;e.currentTarget.style.color=ORANGE;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#333";e.currentTarget.style.color="#fff";}}
                >Download CV</a>
                <Link to="/contact" style={{ padding:"10px 20px", border:`1px solid ${ORANGE}40`,
                  borderRadius:10, fontSize:"clamp(12px,1.5vw,13px)", fontWeight:700, color:ORANGE,
                  textDecoration:"none", background:`${ORANGE}10`, transition:"all .2s", display:"inline-block" }}
                  onMouseEnter={e=>e.currentTarget.style.background=`${ORANGE}18`}
                  onMouseLeave={e=>e.currentTarget.style.background=`${ORANGE}10`}
                >Get In Touch</Link>
              </div>
              <div style={{ display:"flex", gap:9, flexWrap:"wrap", alignItems:"center",
                justifyContent: isMobile?"center":"flex-start" }}>
                <span style={{ fontSize:11, color:"#444" }}>Connect:</span>
                {[
                  {href:"https://github.com/OBTECH100",   icon:<GithubIcon size={14}/>,   label:"GitHub"},
                  {href:"https://linkedin.com/in/oluwasegun-boluwatife-9103a9289", icon:<LinkedInIcon size={14}/>, label:"LinkedIn"},
                  {href:"mailto:obtech100@gmail.com", icon:<MailIcon size={14}/>, label:"Email"},
                ].map(({href,icon,label})=>(
                  <a key={label} href={href} title={label} style={{ width:34, height:34, borderRadius:8,
                    border:"1px solid #2a2a2a", background:"#111", display:"flex", alignItems:"center",
                    justifyContent:"center", color:"#555", textDecoration:"none", transition:"all .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=ORANGE;e.currentTarget.style.color=ORANGE;e.currentTarget.style.background=`${ORANGE}10`;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.color="#555";e.currentTarget.style.background="#111";}}
                  >{icon}</a>
                ))}
              </div>
            </div>

            {/* Avatar */}
            <div style={{ flex:"0 0 auto", display:"flex", justifyContent:"center", animation:"fade-up .75s ease .15s both" }}>
              <div style={{ position:"relative",
                width:isMobile?"300px":"clamp(400px,22vw,240px)",
                height:isMobile?"300px":"clamp(400px,22vw,240px)" }}>
                {[1,2].map(i=>(
                  <div key={i} style={{ position:"absolute", inset:-i*10, borderRadius:"50%",
                    border:`1px solid ${ORANGE}`, animation:`pulse-ring ${1.8+i*.6}s ease-out ${i*.4}s infinite`, opacity:0 }} />
                ))}
                <div style={{ position:"absolute", inset:-8, borderRadius:"50%",
                  border:`2px dashed ${ORANGE}35`, animation:"spin-slow 14s linear infinite" }} />
                <div style={{ width:"100%", height:"100%", borderRadius:"50%",
                  background:`linear-gradient(135deg,${ORANGE}20,#1a1a1a)`, border:`3px solid ${ORANGE}`,
                  boxShadow:`0 0 32px ${ORANGE}38,0 0 64px ${ORANGE}12`, display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                  }}>
                    <img
                      src="/about.png"
                      alt="Adekoya Oluwasegun"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                    />
                  </div>
                
                <div style={{ position:"absolute", top:4, right:isMobile?"-8px":"-10px", background:"#111",
                  border:`1px solid ${ORANGE}`, borderRadius:8, padding:"4px 9px",
                  fontSize:10, fontWeight:700, color:ORANGE, boxShadow:`0 0 10px ${ORANGE}25`, whiteSpace:"nowrap" }}>✦ Working Professionally</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ STATS ══ */}
      <div style={{ background:"#0d0d0d", borderTop:"1px solid #1a1a1a", borderBottom:"1px solid #1a1a1a" }}>
        <div className="container" style={{ padding:"clamp(18px,3.5vw,36px) clamp(16px,4vw,24px)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))", gap:"clamp(8px,2vw,14px)" }}>
            {stats.map(({num,suffix,label},i)=>(
              <Reveal key={i} delay={i*.08}>
                <div style={{ textAlign:"center", padding:"clamp(10px,2vw,16px) 4px",
                  borderRight:i<stats.length-1?"1px solid #1e1e1e":"none" }}>
                  <div style={{ fontSize:"clamp(20px,3.5vw,34px)", fontWeight:900, color:ORANGE,
                    fontFamily:"'Space Grotesk',sans-serif", lineHeight:1 }}><Counter target={num} suffix={suffix}/></div>
                  <div style={{ fontSize:"clamp(9px,1.1vw,11px)", color:"#555", marginTop:5, fontWeight:500,
                    lineHeight:1.4, maxWidth:100, margin:"5px auto 0" }}>{label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══ PROFESSIONAL SUMMARY ══ */}
      <div className="section-pad" style={{ background:"#0a0a0a" }}>
        <div className="container">
          <Reveal><SectionHeading label="Professional Summary" title="Background & Experience"/></Reveal>
          <div style={{ display:"grid", gridTemplateColumns: isTablet?"1fr":"1fr 1fr",
            gap:"clamp(22px,4vw,46px)", alignItems:"start" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {[
                {h:"Professional Background", b:"I am a Software Developer with over four years of professional experience delivering end-to-end digital products across web, mobile, and AI platforms. My career has been characterised by a disciplined approach to engineering — combining strong technical fundamentals with a clear understanding of real-world business requirements."},
                {h:"Technical Breadth",        b:"My expertise spans four core disciplines: backend systems engineering, frontend interface development, cross-platform mobile application development, and artificial intelligence. This enables me to contribute at every layer of the stack — from database schema design to user-facing interfaces and intelligent systems."},
                {h:"AI & Intelligent Systems", b:"A significant dimension of my professional practice involves the design and deployment of AI-powered systems. I have built production-grade computer vision applications — including face recognition and sign language detection systems — using TensorFlow, Keras, OpenCV, and deep learning techniques."},
                {h:"Approach to Delivery",     b:"I adhere to a structured development methodology — emphasising clear requirements definition, iterative development, systematic testing, and thorough documentation. I communicate proactively, manage scope deliberately, and deliver against defined timelines without compromising standards."},
              ].map(({h,b},i)=>(
                <Reveal key={i} delay={i*.09}>
                  <div style={{ display:"flex", gap:13, alignItems:"flex-start" }}>
                    <div style={{ width:3, minHeight:44, background:`linear-gradient(180deg,${ORANGE},${ORANGE}20)`,
                      borderRadius:99, flexShrink:0, marginTop:2, alignSelf:"stretch" }} />
                    <div>
                      <h4 style={{ fontSize:"clamp(10px,1.3vw,12px)", fontWeight:700, color:ORANGE,
                        margin:"0 0 6px", textTransform:"uppercase", letterSpacing:"0.08em" }}>{h}</h4>
                      <p style={{ fontSize:"clamp(12px,1.4vw,14px)", color:"#777", lineHeight:1.85, margin:0 }}>{b}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <Reveal delay={.15}>
                <div style={{ background:"#0d0d0d", border:"1px solid #1e1e1e", borderRadius:16,
                  padding:"clamp(16px,2.5vw,24px)" }}>
                  <h4 style={{ fontSize:"clamp(12px,1.5vw,14px)", fontWeight:800, color:"#fff",
                    margin:"0 0 16px", fontFamily:"'Space Grotesk',sans-serif",
                    display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ width:3, height:13, background:ORANGE, display:"inline-block", borderRadius:99 }} />
                    Professional Profile
                  </h4>
                  {[
                    ["Full Name",    "Adekoya Oluwasegun Boluwatife"],
                    ["Title",        "Software Developer & AI Engineer"],
                    // ["Location",     "Ogun State, Nigeria"],
                    ["Status",       "Working Professionally"],
                    ["Availability", "Open to New Engagements"],
                    ["Experience",   "4+ Years"],
                    ["Disciplines",  "Backend · Frontend · Mobile · AI"],
                    ["Stack",        "Python · JS · React · Node.js"],
                    ["Languages",    "English"],
                    ["Response",     "Within 24 hours"],
                  ].map(([k,v])=>(
                    <div key={k} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"7px 0", borderBottom:"1px solid #181818" }}>
                      <span style={{ fontSize:"clamp(9px,1vw,10px)", color:"#444", textTransform:"uppercase",
                        letterSpacing:"0.07em", fontWeight:600, minWidth:76, flexShrink:0, paddingTop:1 }}>{k}</span>
                      <span style={{ fontSize:"clamp(11px,1.3vw,12px)", color:"#ccc", fontWeight:500, lineHeight:1.45 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={.25}>
                <div style={{ display:"flex", alignItems:"center", gap:11, padding:"clamp(11px,2vw,14px)",
                  background:"rgba(0,200,100,.06)", border:"1px solid rgba(0,200,100,.2)", borderRadius:11 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:"#00C864",
                    boxShadow:"0 0 10px #00C864", animation:"blink 2s ease infinite", flexShrink:0 }} />
                  <div>
                    <div style={{ fontSize:"clamp(11px,1.4vw,13px)", fontWeight:700, color:"#00C864" }}>Currently Available</div>
                    <div style={{ fontSize:"clamp(9px,1.1vw,11px)", color:"#555", marginTop:2 }}>Open to professional engagements, contracts & collaborations</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ══ TOOLS & TECHNOLOGIES ══ */}
      <div className="section-pad" style={{ background:"#0d0d0d" }}>
        <div className="container">
          <Reveal><SectionHeading label="Tools & Technologies" title="Tools I Work With"/></Reveal>
          <div style={{ display:"flex", flexDirection:"column", gap:"clamp(28px,4.5vw,48px)" }}>
            {toolCategories.map((cat,i)=>(
              <ToolCategory key={cat.label} {...cat} index={i} />
            ))}
            <Reveal delay={.1}>
              <div style={{ background:"#111", border:`1px solid ${ORANGE}30`, borderRadius:16,
                padding:"clamp(16px,3vw,24px)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, flexWrap:"wrap" }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:`${ORANGE}18`,
                    border:`1px solid ${ORANGE}40`, display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:16, flexShrink:0 }}>🎯</div>
                  <h3 style={{ fontSize:"clamp(12px,1.6vw,14px)", fontWeight:800, color:"#fff", margin:0,
                    fontFamily:"'Space Grotesk',sans-serif" }}>Areas of AI Expertise</h3>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {aiExpertise.map(area=>(
                    <div key={area} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 13px",
                      background:`${ORANGE}10`, border:`1px solid ${ORANGE}40`, borderRadius:99 }}>
                      <span style={{ width:5, height:5, borderRadius:"50%", background:ORANGE, flexShrink:0 }} />
                      <span style={{ fontSize:"clamp(11px,1.4vw,13px)", fontWeight:600, color:ORANGE }}>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>


      {/* ══ PROFESSIONAL TIMELINE ══ */}
      <div className="section-pad" style={{ background:"#0a0a0a", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
          width:"55vw", height:"55vw", background:`radial-gradient(circle,${ORANGE}04,transparent 65%)`,
          pointerEvents:"none" }} />
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <Reveal><SectionHeading label="Career Progression" title="Professional Timeline"/></Reveal>
          <div style={{ maxWidth:860, margin:"0 auto" }}>
            {timeline.map((item,i)=>(
              <TimelineItem key={i} item={item} index={i} />
            ))}
            {/* End marker */}
            <Reveal delay={0.6}>
              <div style={{ display:"flex", justifyContent: isMobile?"flex-start":"center",
                paddingLeft: isMobile?16:0, marginTop:4 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                  <div style={{ width:2, height:20, background:`linear-gradient(180deg,${ORANGE}60,transparent)` }} />
                  <div style={{ display:"flex", alignItems:"center", gap:7, padding:"5px 14px",
                    background:`${ORANGE}14`, border:`1px solid ${ORANGE}50`, borderRadius:99 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:ORANGE,
                      boxShadow:`0 0 8px ${ORANGE}`, animation:"blink 1.5s ease infinite" }} />
                    <span style={{ fontSize:10, fontWeight:800, color:ORANGE,
                      letterSpacing:"0.1em", textTransform:"uppercase" }}>Present — Working Professionally</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ══ ENGINEERING PRINCIPLES ══ */}
      <div className="section-pad" style={{ background:"#0a0a0a" }}>
        <div className="container">
          <Reveal><SectionHeading label="Work Philosophy" title="Engineering Principles"/></Reveal>
          <div style={{ display:"grid",
            gridTemplateColumns: isMobile?"1fr":"repeat(auto-fit,minmax(230px,1fr))",
            gap:"clamp(10px,1.8vw,14px)" }}>
            {principles.map((p,i)=><PrincipleCard key={i} {...p} index={i}/>)}
          </div>
        </div>
      </div>

      {/* ══ CTA BANNER ══ */}
      <div className="section-pad" style={{ background:"#0d0d0d" }}>
        <div className="container">
          <Reveal>
            <div style={{ background:`linear-gradient(135deg,${ORANGE}12,${ORANGE}05,#0a0a0a)`,
              border:`1px solid ${ORANGE}28`, borderRadius:20,
              padding:"clamp(32px,5vw,60px) clamp(20px,4vw,50px)",
              textAlign:"center", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
                width:"70%", height:"70%", background:`radial-gradient(circle,${ORANGE}07,transparent 65%)`,
                pointerEvents:"none" }} />
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:10, fontWeight:700,
                  letterSpacing:"0.18em", color:ORANGE, textTransform:"uppercase", marginBottom:16,
                  padding:"4px 12px", border:`1px solid ${ORANGE}40`, borderRadius:99, background:`${ORANGE}10` }}>
                  Open to New Engagements
                </div>
                <h2 style={{ fontSize:"clamp(20px,4vw,36px)", fontWeight:900, color:"#fff",
                  margin:"0 0 14px", fontFamily:"'Space Grotesk',sans-serif", lineHeight:1.15 }}>
                  Ready to Contribute to<br/><span style={{ color:ORANGE }}>Your Next Project.</span>
                </h2>
                <p style={{ fontSize:"clamp(12px,1.6vw,14px)", color:"#666", lineHeight:1.8,
                  maxWidth:490, margin:"0 auto 26px" }}>
                  Whether you require a backend engineer, a full-stack developer, or an AI systems specialist — I bring the experience, discipline, and technical depth to deliver results that meet professional standards.
                </p>
                <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                  <Link to="/contact" style={{ padding:"12px 24px", background:ORANGE, color:"#000",
                    borderRadius:10, fontSize:"clamp(12px,1.6vw,14px)", fontWeight:700,
                    textDecoration:"none", boxShadow:`0 0 20px ${ORANGE}45`, transition:"all .2s", display:"inline-block" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 24px ${ORANGE}55`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 0 20px ${ORANGE}45`;}}
                  >Initiate a Conversation →</Link>
                  <a href="/resume.pdf" style={{ padding:"12px 24px", border:"1px solid #2a2a2a",
                    borderRadius:10, fontSize:"clamp(12px,1.6vw,14px)", fontWeight:700, color:"#aaa",
                    textDecoration:"none", background:"#111", transition:"all .2s", display:"inline-block" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=ORANGE;e.currentTarget.style.color=ORANGE;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.color="#aaa";}}
                  >Download Full CV</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
