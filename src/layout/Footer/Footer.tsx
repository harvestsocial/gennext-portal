import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={{ background: "#0d1128", color: "#fff", paddingTop: "60px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "center",
                gap: "2rem",
              }}
            >
              {/* Address */}
              <div style={{ flex: "1", minWidth: "180px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px", color: "#fff" }}>
                  Address
                </h3>
                <p style={{ color: "#aab0cc", lineHeight: "1.8" }}>
                  HHICC, Stand No. 19742<br />
                  Selbourne Park,<br />
                  Bulawayo, Zimbabwe
                </p>
              </div>

              {/* Logo + Social */}
              <div style={{ flex: "1", minWidth: "180px" }}>
                <img
                  src="/assets/img/logos/logo.png"
                  alt="Generation Next"
                  style={{ width: "140px", marginBottom: "20px" }}
                />
                <div style={{ display: "flex", justifyContent: "center", gap: "14px" }}>
                  <a
                    href="https://www.facebook.com/gennextoffcial"
                    target="_blank"
                    rel="noreferrer"
                    style={iconStyle}
                  >
                    <i className="flaticon-facebook" />
                  </a>
                  <a
                    href="https://www.instagram.com/gennextofficial/"
                    target="_blank"
                    rel="noreferrer"
                    style={iconStyle}
                  >
                    <i className="flaticon-instagram" />
                  </a>
                  <a
                    href="https://www.youtube.com/@gennextofficial/"
                    target="_blank"
                    rel="noreferrer"
                    style={iconStyle}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 576 512">
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div style={{ flex: "1", minWidth: "180px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px", color: "#fff" }}>
                  Contact Us
                </h3>
                <p style={{ color: "#aab0cc", lineHeight: "1.8" }}>
                  0787 963 720<br />
                  0771 982 116<br />
                  0774 562 455
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subfooter */}
      <div style={{ borderTop: "1px solid #1e2547", marginTop: "48px", padding: "20px 0", textAlign: "center" }}>
        <div className="container">
          <p style={{ color: "#6b7399", margin: 0, fontSize: "14px" }}>
            Copyright 2026 &mdash; Generation Next. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const iconStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  border: "1px solid #2133e4",
  color: "#fff",
  fontSize: "15px",
  transition: "all 0.3s ease",
};

export default Footer;
