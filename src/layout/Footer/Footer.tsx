import React from "react";

const socialLinks = [
  {
    href: "https://www.facebook.com/gennextoffcial",
    label: "Facebook",
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>,
  },
  {
    href: "https://www.instagram.com/gennextofficial/",
    label: "Instagram",
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>,
  },
  {
    href: "https://www.youtube.com/@gennextofficial/",
    label: "YouTube",
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>,
  },
];

const Footer: React.FC = () => (
  <footer style={{ background: "#0d1128", color: "#fff", paddingTop: "60px" }}>
    <div className="container">
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", textAlign: "center", gap: "2rem" }}>

        <div style={{ flex: "1", minWidth: "180px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#fff" }}>Address</h3>
          <p style={{ color: "#aab0cc", lineHeight: "1.8", margin: 0 }}>
            HHICC, Stand No. 19742<br />
            Selbourne Park,<br />
            Bulawayo, Zimbabwe
          </p>
        </div>

        <div style={{ flex: "1", minWidth: "180px" }}>
          <img
            src="/assets/images/gennext/logos/logo.png"
            alt="Generation Next"
            style={{ width: "150px", maxWidth: "150px", display: "block", margin: "0 auto 20px" }}
          />
          <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
            {socialLinks.map(({ href, label, svg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "8px", background: "#1a1f3a", color: "rgba(255,255,255,0.7)", transition: "background 0.3s, color 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#2133e4"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#1a1f3a"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
              >
                {svg}
              </a>
            ))}
          </div>
        </div>

        <div style={{ flex: "1", minWidth: "180px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#fff" }}>Contact Us</h3>
          <p style={{ color: "#aab0cc", lineHeight: "1.8", margin: 0 }}>
            0787 963 720<br />
            0771 982 116<br />
            0774 562 455
          </p>
        </div>

      </div>
    </div>

    <div style={{ borderTop: "1px solid #1e2547", marginTop: "48px", padding: "20px 0", textAlign: "center" }}>
      <div className="container">
        <p style={{ color: "#6b7399", margin: 0, fontSize: "14px" }}>
          Copyright 2026 — Generation Next. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
