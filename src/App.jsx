import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar   from "./components/Navbar";
import { globalStyles } from "./components/shared";
import Home     from "./pages/Home";
import About    from "./pages/About";
import Skills   from "./pages/Skills";
import Projects from "./pages/Projects";
import Journey  from "./pages/Journey";
import Contact  from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  return (
    <>
      <style>{globalStyles}</style>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/skills"   element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/journey"  element={<Journey />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
