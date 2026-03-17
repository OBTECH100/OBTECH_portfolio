import { Link } from "react-router-dom";
import { PageWrapper, GithubIcon, LinkedInIcon, MailIcon } from "../components/shared";
import { ORANGE } from "../data";

const particles = [
  { icon:"⚛️", x:8,  y:20, d:0,   s:8,  sz:"20px" },
  { icon:"🐍", x:88, y:30, d:1.5, s:10, sz:"17px" },
  { icon:"🧠", x:15, y:65, d:3,   s:9,  sz:"19px" },
  { icon:"🟩", x:78, y:70, d:0.8, s:11, sz:"15px" },
  { icon:"🐳", x:50, y:15, d:2,   s:7,  sz:"17px" },
  { icon:"🔀", x:92, y:55, d:4,   s:12, sz:"15px" },
  { icon:"💻", x:3,  y:45, d:1,   s:9,  sz:"17px" },
  { icon:"🤖", x:60, y:80, d:2.5, s:10, sz:"20px" },
  { icon:"🌐", x:35, y:88, d:0.5, s:8,  sz:"15px" },
  { icon:"👁️", x:70, y:10, d:3.5, s:11, sz:"17px" },
];

export default function Home() {
  return (
    <PageWrapper>
      <div style={{ minHeight:"90vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }}>
        {/* Grid bg */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(255,107,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,0.04) 1px,transparent 1px)`, backgroundSize:"60px 60px", pointerEvents:"none" }} />
        {/* Glow */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"70vw", height:"70vw", background:`radial-gradient(circle,${ORANGE}07 0%,transparent 60%)`, pointerEvents:"none" }} />
        {/* Particles — hidden on small screens for perf */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }} aria-hidden="true">
          {particles.map((p,i) => (
            <div key={i} style={{ position:"absolute", left:`${p.x}%`, top:`${p.y}%`, opacity:0, fontSize:p.sz, animation:`floatUp ${p.s}s ease-in-out ${p.d}s infinite`, userSelect:"none" }}>{p.icon}</div>
          ))}
        </div>

        <div className="container" style={{ width:"100%", padding:"clamp(40px,12vw,40px) clamp(16px,4vw,24px) clamp(48px,8vw,80px)" }}>
          <div className="hero-inner">

            {/* ── Text ── */}
            <div className="hero-text" style={{ animation:"fade-up .8s ease forwards" }}>
              {/* Badge */}
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:11, fontWeight:700, letterSpacing:"0.15em", color:ORANGE, textTransform:"uppercase", marginBottom:20, padding:"5px 14px", border:`1px solid ${ORANGE}40`, borderRadius:99, background:`${ORANGE}10` }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:ORANGE, display:"inline-block", boxShadow:`0 0 8px ${ORANGE}` }} />
                Software Developer
              </div>

              <h1 style={{ fontSize:"clamp(32px,6vw,68px)", fontWeight:900, fontFamily:"'Space Grotesk',sans-serif", lineHeight:1.05, margin:"0 0 16px", letterSpacing:"-0.03em" }}>
                Hi, I'm{" "}
                <span style={{ color:ORANGE, textShadow:`0 0 32px ${ORANGE}60` }}>Adekoya</span>
                <br />Oluwasegun
              </h1>

              <p style={{ fontSize:"clamp(15px,2vw,18px)", color:"#aaa", lineHeight:1.6, maxWidth:500, margin:"0 0 6px" }}>
                <span style={{ color:"#fff", fontWeight:600 }}>Software Developer | Backend Engineer | AI & Mobile App Innovator</span>
              </p>
              <p style={{ fontSize:"clamp(14px,1.8vw,16px)", color:"#666", lineHeight:1.7, maxWidth:500, margin:"0 0 0" }}>
                I specialize in building scalable software systems, intelligent AI solutions,
                modern web platforms, and powerful mobile applications that drive innovation
                and real-world impact.
              </p>

              {/* CTAs */}
              <div className="cta-row">
                {[
                  { to:"/projects", label:"View Projects", filled:true },
                  { href:"/resume.pdf", label:"↓ Download CV", filled:false },
                  { to:"/contact", label:"Contact Me", outline:true },
                ].map((btn,i) => {
                  const shared = { fontSize:"clamp(13px,1.8vw,15px)", fontWeight:700, borderRadius:10, padding:"11px clamp(16px,3vw,24px)", textDecoration:"none", display:"inline-block", transition:"all .2s", cursor:"pointer" };
                  if (btn.filled) return (
                    <Link key={i} to={btn.to} style={{ ...shared, background:ORANGE, color:"#000", border:"none", boxShadow:`0 0 22px ${ORANGE}50` }}
                      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 28px ${ORANGE}60`;}}
                      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 0 22px ${ORANGE}50`;}}
                    >{btn.label}</Link>
                  );
                  if (btn.outline) return (
                    <Link key={i} to={btn.to} style={{ ...shared, background:`${ORANGE}12`, color:ORANGE, border:`1px solid ${ORANGE}50` }}
                      onMouseEnter={e=>e.currentTarget.style.background=`${ORANGE}22`}
                      onMouseLeave={e=>e.currentTarget.style.background=`${ORANGE}12`}
                    >{btn.label}</Link>
                  );
                  return (
                    <a key={i} href={btn.href} style={{ ...shared, background:"#141414", color:"#fff", border:"1px solid #333" }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=ORANGE;e.currentTarget.style.color=ORANGE;}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="#333";e.currentTarget.style.color="#fff";}}
                    >{btn.label}</a>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="stat-row">
                {[["4+","Years Coding"],["40+","Projects Built"],["6+","AI & Rbotics Systems"]].map(([n,l])=>(
                  <div key={l}>
                    <div style={{ fontSize:"clamp(22px,3vw,28px)", fontWeight:900, color:ORANGE, fontFamily:"'Space Grotesk',sans-serif" }}>{n}</div>
                    <div style={{ fontSize:"clamp(11px,1.4vw,12px)", color:"#555", marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="social-row">
                {[
                  { href:"https://github.com",    icon:<GithubIcon size={17} />,   label:"GitHub" },
                  { href:"https://linkedin.com",  icon:<LinkedInIcon size={17} />, label:"LinkedIn" },
                  { href:"mailto:obtech100@gmail.com", icon:<MailIcon size={17} />, label:"Email" },
                ].map(({href,icon,label})=>(
                  <a key={label} href={href} title={label} style={{ width:40, height:40, borderRadius:10, border:"1px solid #2a2a2a", background:"#111", display:"flex", alignItems:"center", justifyContent:"center", color:"#666", textDecoration:"none", transition:"all .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=ORANGE;e.currentTarget.style.color=ORANGE;e.currentTarget.style.background=`${ORANGE}12`;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.color="#666";e.currentTarget.style.background="#111";}}
                  >{icon}</a>
                ))}
              </div>
            </div>

            {/* ── Avatar ── */}
            <div className="hero-avatar" style={{ animation:"fade-up .8s ease .15s both" }}>
              <div style={{ position:"relative", width:"clamp(420px,30vw,280px)", height:"clamp(420px,30vw,280px)" }}>
                {[1,2].map(i=>(
                  <div key={i} style={{ position:"absolute", inset:-i*12, borderRadius:"50%", border:`1px solid ${ORANGE}`, animation:`pulse-ring ${1.8+i*.6}s ease-out ${i*.4}s infinite`, opacity:0 }} />
                ))}
                <div style={{ position:"absolute", inset:-10, borderRadius:"50%", border:`2px dashed ${ORANGE}40`, animation:"spin-slow 12s linear infinite" }} />
                <div style={{
                  width:"100%", height:"100%", borderRadius:"50%",
                  background:`linear-gradient(135deg,${ORANGE}22,#1a1a1a)`,
                  border:`3px solid ${ORANGE}`,
                  boxShadow:`0 0 40px ${ORANGE}40,0 0 80px ${ORANGE}15`,
                 display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
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
                <div style={{ position:"absolute", bottom:4, right:"-10px", background:"#111", border:`1px solid ${ORANGE}`, borderRadius:10, padding:"5px 12px", fontSize:11, fontWeight:700, color:ORANGE, boxShadow:`0 0 16px ${ORANGE}30`, whiteSpace:"nowrap" }}>
                  ⚡ Available for Work
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
