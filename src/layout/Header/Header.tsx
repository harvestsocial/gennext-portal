import React, { useState, useEffect } from "react";

const navLinks = [
  { title: "Home",       href: "https://www.gennextmovement.com/" },
  { title: "About",      href: "https://www.gennextmovement.com/about" },
  { title: "Why Attend", href: "https://www.gennextmovement.com/why-attend" },
  { title: "Speakers",   href: "https://www.gennextmovement.com/speakers" },
  { title: "Program",    href: "https://www.gennextmovement.com/schedule" },
  { title: "Venue",      href: "https://www.gennextmovement.com/venue" },
  { title: "FAQ",        href: "https://www.gennextmovement.com/faq" },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      background: scrolled ? "rgba(16,20,53,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "background 0.3s ease, border 0.3s ease",
      padding: "0 0",
    }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>

          {/* Logo */}
          <a href="https://www.gennextmovement.com/" style={{ flexShrink: 0 }}>
            <img src="/assets/images/gennext/logos/logo.png" alt="Generation Next" style={{ width: "120px", objectFit: "contain" }} />
          </a>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: "28px", alignItems: "center" }} className="d-none d-lg-flex">
            {navLinks.map(({ title, href }) => (
              <a key={title} href={href} style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", fontWeight: 700, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#2133e4")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
              >{title}</a>
            ))}
          </nav>

          {/* Register button + mobile toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span className="d-none d-lg-inline-flex" style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", fontWeight: 700 }}>
              Registration
            </span>
            <button
              className="d-lg-none"
              onClick={() => setMenuOpen(o => !o)}
              style={{ background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer", padding: "4px" }}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav style={{ paddingBottom: "20px", background: "rgba(16,20,53,0.97)" }} className="d-lg-none">
            {navLinks.map(({ title, href }) => (
              <a key={title} href={href} style={{ display: "block", color: "rgba(255,255,255,0.85)", padding: "10px 0", fontSize: "15px", fontWeight: 700, textDecoration: "none" }}>
                {title}
              </a>
            ))}
            <a href="https://www.gennextmovement.com/registration" style={{ display: "inline-block", marginTop: "12px", background: "#2133e4", color: "#fff", padding: "12px 24px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              Register Now
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
