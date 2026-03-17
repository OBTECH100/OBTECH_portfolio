import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GearIcon, MenuIcon, CloseIcon } from "./shared";
import { ORANGE } from "../data";

const links = [
  { label: "Home",     path: "/" },
  { label: "About",    path: "/about" },
  { label: "Skills",   path: "/skills" },
  { label: "Projects", path: "/projects" },
  { label: "Contact",  path: "/contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (p) => p === "/" ? pathname === "/" : pathname === p;

  return (
    <>
      <style>{`
        .nav-link-item { position:relative; transition:color .2s; text-decoration:none; }
        .nav-link-item::after { content:''; position:absolute; bottom:-4px; left:0; right:0; height:2px; background:${ORANGE}; border-radius:99px; transform:scaleX(0); transform-origin:center; transition:transform .25s ease; }
        .nav-link-item:hover::after, .nav-link-item.active::after { transform:scaleX(1); }
        .mobile-menu { animation: slide-down .25s ease forwards; }
        .hire-btn:hover { opacity:.85; transform:translateY(-1px); }
        .hire-btn { transition: opacity .2s, transform .2s; }
      `}</style>

      {/* ── Main bar ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 64,
        background: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.75)",
        backdropFilter: "blur(18px)",
        borderBottom: `1px solid ${scrolled ? "#1e1e1e" : "transparent"}`,
        transition: "background .3s, border-color .3s",
        padding: "0 clamp(16px,4vw,24px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0 }}>
          <div style={{
            width:38, height:38, borderRadius:"50%", background:ORANGE,
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 0 16px ${ORANGE}60`,
          }}>
            <span style={{ color:"#fff", display:"flex"}}><GearIcon size={28} /></span>
          </div>
          <div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:17, letterSpacing:"-0.03em", lineHeight:1.1 }}>
              <span style={{ color:ORANGE }}>OB</span><span style={{ color:"#fff" }}>TECH</span>
            </div>
            <div style={{ fontSize:9, color:"#555", letterSpacing:"0.15em", textTransform:"uppercase" }}>Innovate & Dominate</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop">
          {links.map(({ label, path }) => (
            <Link
              key={path} to={path}
              className={`nav-link-item ${isActive(path) ? "active" : ""}`}
              style={{
                fontSize:14, fontWeight:500,
                color: isActive(path) ? ORANGE : "#aaa",
                padding:"6px 12px", borderRadius:8,
                background: isActive(path) ? `${ORANGE}12` : "transparent",
                transition:"all .2s",
              }}
              onMouseEnter={e => { if (!isActive(path)) e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { if (!isActive(path)) e.currentTarget.style.color="#aaa"; }}
            >{label}</Link>
          ))}
          <Link to="/contact" className="hire-btn" style={{
            marginLeft:8, padding:"8px 18px",
            background:ORANGE, color:"#000", borderRadius:8,
            fontSize:13, fontWeight:700, textDecoration:"none",
            boxShadow:`0 0 14px ${ORANGE}40`, display:"inline-block",
          }}>Hire Me →</Link>
        </div>

        {/* Hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </nav>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position:"fixed", inset:0, zIndex:198, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }}
          />
          {/* Drawer */}
          <div className="mobile-menu" style={{
            position:"fixed", top:64, left:0, right:0, zIndex:199,
            background:"#0f0f0f",
            borderBottom:"1px solid #2a2a2a",
            padding:"8px 0 24px",
            maxHeight:"calc(100vh - 64px)",
            overflowY:"auto",
          }}>
            {links.map(({ label, path }) => (
              <Link
                key={path} to={path}
                style={{
                  display:"flex", alignItems:"center",
                  padding:"15px clamp(16px,4vw,24px)",
                  fontSize:16, fontWeight:600,
                  color: isActive(path) ? ORANGE : "#ccc",
                  textDecoration:"none",
                  borderLeft: isActive(path) ? `3px solid ${ORANGE}` : "3px solid transparent",
                  background: isActive(path) ? `${ORANGE}08` : "transparent",
                  transition:"all .2s",
                }}
              >{label}</Link>
            ))}
            <div style={{ padding:`16px clamp(16px,4vw,24px) 0` }}>
              <Link to="/contact" style={{
                display:"block", padding:"14px", textAlign:"center",
                background:ORANGE, color:"#000", borderRadius:10,
                fontSize:15, fontWeight:700, textDecoration:"none",
                boxShadow:`0 0 20px ${ORANGE}40`,
              }}>Hire Me →</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
