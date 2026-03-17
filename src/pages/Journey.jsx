import { PageWrapper, SectionHeading, useReveal, Footer } from "../components/shared";
import { ORANGE, journey } from "../data";

function TimelineCard({ item, index }) {
  const [ref, vis] = useReveal(0.1);
  const left = index % 2 === 0;
  return (
    <div
      ref={ref}
      className={`tl-item ${left ? "left" : "right"}`}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : `translateX(${left ? -30 : 30}px)`,
        transition:`all .6s ease ${index * .08}s`,
      }}
    >
      {/* Dot */}
      <div className="tl-dot" style={{
        width:14, height:14, borderRadius:"50%",
        background: item.current ? ORANGE : "#1e1e1e",
        border:`2px solid ${item.current ? ORANGE : "#444"}`,
        boxShadow: item.current ? `0 0 18px ${ORANGE}80` : "none",
      }} />

      {/* Card */}
      <div style={{
        background:"#111",
        border:`1px solid ${item.current ? ORANGE+"50" : "#222"}`,
        borderRadius:16,
        padding:"clamp(16px,2.5vw,22px) clamp(18px,3vw,26px)",
        maxWidth:"clamp(260px,38vw,340px)",
        width:"100%",
        boxShadow: item.current ? `0 0 28px ${ORANGE}15` : "none",
      }}>
        <div style={{ display:"inline-block", fontSize:11, fontWeight:800, letterSpacing:"0.1em", color:ORANGE, textTransform:"uppercase", background:`${ORANGE}14`, border:`1px solid ${ORANGE}40`, borderRadius:99, padding:"3px 10px", marginBottom:10 }}>{item.year}</div>
        <h4 style={{ fontSize:"clamp(14px,2vw,17px)", fontWeight:800, color:"#fff", margin:"0 0 8px", fontFamily:"'Space Grotesk',sans-serif" }}>{item.title}</h4>
        <p style={{ fontSize:"clamp(12px,1.5vw,14px)", color:"#666", lineHeight:1.7, margin:0 }}>{item.desc}</p>
        {item.current && (
          <div style={{ marginTop:12, display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, color:ORANGE }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:ORANGE, animation:"blink 1s step-start infinite" }} />
            Currently here
          </div>
        )}
      </div>
    </div>
  );
}

const statItems = [
  { num:"2019", label:"Started Coding",   icon:"🚀" },
  { num:"6+",   label:"Years Learning",   icon:"📅" },
  { num:"10+",  label:"Projects Shipped", icon:"📦" },
  { num:"3",    label:"AI Systems Built", icon:"🧠" },
  { num:"4",    label:"Tech Stacks",      icon:"⚡" },
  { num:"∞",    label:"Still Growing",    icon:"🌱" },
];

export default function Journey() {
  return (
    <PageWrapper>
      <div className="section-pad" style={{ background:"#0a0a0a" }}>
        <div className="container">
          <SectionHeading label="My Story" title="Development Journey" />

          {/* Timeline */}
          <div className="tl-wrap" style={{ marginBottom:"clamp(48px,7vw,80px)" }}>
            <div className="tl-line" />
            {journey.map((item,i)=><TimelineCard key={i} item={item} index={i} />)}
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ marginBottom:"clamp(48px,7vw,80px)" }}>
            {statItems.map(({ num, label, icon })=>(
              <div key={label} style={{ background:"#0d0d0d", border:"1px solid #1e1e1e", borderRadius:16, padding:"clamp(18px,3vw,24px) clamp(14px,2vw,20px)", textAlign:"center", transition:"border-color .25s, transform .25s", cursor:"default" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=`${ORANGE}50`;e.currentTarget.style.transform="translateY(-4px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#1e1e1e";e.currentTarget.style.transform="";}}
              >
                <div style={{ fontSize:"clamp(22px,3vw,28px)", marginBottom:8 }}>{icon}</div>
                <div style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:900, color:ORANGE, fontFamily:"'Space Grotesk',sans-serif" }}>{num}</div>
                <div style={{ fontSize:"clamp(11px,1.3vw,12px)", color:"#555", marginTop:4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
