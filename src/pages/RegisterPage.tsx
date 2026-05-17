import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { allCountries } from "@/lib/countryList";
import { createPendingRegistration, buildPaynowUrl } from "@/lib/registrationApi";

const REGISTRATION_OPEN_DATE = new Date("2026-05-19T00:00:00+02:00");

function getTimeRemaining() {
  const diff = REGISTRATION_OPEN_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const CountdownPage: React.FC = () => {
  const [time, setTime] = useState(getTimeRemaining());
  const pad = (n: number) => String(n).padStart(2, "0");

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={heroStyle}>
      <div style={heroBlobStyle} />
      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "100px 20px" }}>
        <div style={subtitleTagStyle}>Generation Next 2026</div>
        <h1 style={{ color: "#fff", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, marginBottom: "16px", lineHeight: 1.1 }}>
          Registration Opens Tuesday
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.1rem", marginBottom: "56px", maxWidth: "520px", margin: "0 auto 56px" }}>
          Generation Next 2026 opens on <strong style={{ color: "#fff" }}>19 May 2026</strong>.<br />
          Mark your calendar and come back then.
        </p>
        {time && (
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(16px, 4vw, 48px)", flexWrap: "wrap" }}>
            {([["Days", time.days], ["Hours", time.hours], ["Minutes", time.minutes], ["Seconds", time.seconds]] as [string, number][]).map(
              ([label, val]) => (
                <div key={label} style={countdownBoxStyle}>
                  <div style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                    {pad(val)}
                  </div>
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#2133e4", marginTop: "10px", fontWeight: 700 }}>
                    {label}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const titles = [
  "Bishop", "Apostle", "Prophet", "Prophetess", "Overseer",
  "Snr Reverend", "Reverend", "Snr. Pastor", "Pastor",
  "Evangelist", "Minister", "Elder", "Doctor",
];

const countries = allCountries.sort((a, b) => a.name.localeCompare(b.name));

const knownCityToCountry: Record<string, string> = {
  harare: "Zimbabwe", bulawayo: "Zimbabwe", chitungwiza: "Zimbabwe",
  mutare: "Zimbabwe", gweru: "Zimbabwe", kadoma: "Zimbabwe",
  johannesburg: "South Africa", pretoria: "South Africa",
  "cape town": "South Africa", durban: "South Africa",
  lusaka: "Zambia", ndola: "Zambia", kitwe: "Zambia",
  lilongwe: "Malawi", blantyre: "Malawi",
  gaborone: "Botswana", francistown: "Botswana",
  maputo: "Mozambique", beira: "Mozambique",
  nairobi: "Kenya", kampala: "Uganda", kigali: "Rwanda",
  "dar es salaam": "Tanzania", london: "United Kingdom", "new york": "United States",
};

const normalizeCity = (v: string) => v.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, " ");

interface FormData {
  firstName: string; lastName: string; gender: string; title: string;
  church: string; city: string; country: string; phone: string; email: string;
}

const RegisterPage: React.FC = () => {
  if (new Date() < REGISTRATION_OPEN_DATE) return <CountdownPage />;

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", gender: "", title: "",
    church: "", city: "", country: "", phone: "", email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "country") {
      const c = countries.find(c => c.name === value);
      setFormData(p => ({ ...p, country: value, phone: c ? c.code : p.phone }));
    } else if (name === "city") {
      const detected = countries.find(c => c.name.toLowerCase() === (knownCityToCountry[normalizeCity(value)] ?? "").toLowerCase());
      setFormData(p => ({
        ...p, city: value,
        country: detected ? detected.name : p.country,
        phone: detected && !p.phone.trim() ? detected.code : p.phone,
      }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { id, token } = await createPendingRegistration(formData);
      window.location.href = buildPaynowUrl(id, token, formData.firstName, formData.lastName);
    } catch (e: unknown) {
      setError(`Registration failed: ${e instanceof Error ? e.message : "Please try again."}`);
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Hero banner ── */}
      <section style={heroStyle}>
        <div style={heroBlobStyle} />
        <div className="container" style={{ position: "relative", zIndex: 1, padding: "100px 20px 80px" }}>
          <div style={subtitleTagStyle}>Generation Next 2026</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 800, marginBottom: "24px", lineHeight: 1.05 }}>
            Register Now
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
            <div style={metaItemStyle}>
              <span style={metaIconStyle}>📅</span>
              <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>16 – 18 July 2026</span>
            </div>
            <div style={metaItemStyle}>
              <span style={metaIconStyle}>📍</span>
              <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Celebration Centre, Borrowdale, Harare</span>
            </div>
            <div style={metaItemStyle}>
              <span style={metaIconStyle}>💳</span>
              <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>$10 Registration Fee</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form section ── */}
      <section style={{ background: "#0d1128", padding: "80px 0 100px" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>

            <div style={{ marginBottom: "48px" }}>
              <div style={subtitleTagStyle}>Fill in your details</div>
              <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "12px", lineHeight: 1.1 }}>
                Secure Your Spot
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", lineHeight: 1.7 }}>
                Complete the form below and proceed to payment to confirm your registration.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Title + Gender */}
              <div className="form-inputs" style={rowStyle}>
                <div className="type_1" style={fieldStyle}>
                  <label style={labelStyle}>Title *</label>
                  <select className="csame" name="title" value={formData.title} onChange={handleInputChange} required style={inputStyle}>
                    <option value="" disabled>Select Title</option>
                    {titles.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="type_1" style={fieldStyle}>
                  <label style={labelStyle}>Gender *</label>
                  <select className="csame" name="gender" value={formData.gender} onChange={handleInputChange} required style={inputStyle}>
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* First + Last name */}
              <div style={rowStyle}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>First Name *</label>
                  <input style={inputStyle} type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First name" required />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Last Name *</label>
                  <input style={inputStyle} type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" required />
                </div>
              </div>

              {/* Email + Phone */}
              <div style={rowStyle}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Email</label>
                  <input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email address" />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Phone *</label>
                  <input style={inputStyle} type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone number" required />
                </div>
              </div>

              {/* Church + City */}
              <div style={rowStyle}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Church / Organization *</label>
                  <input style={inputStyle} type="text" name="church" value={formData.church} onChange={handleInputChange} placeholder="Church or organisation" required />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>City *</label>
                  <input style={inputStyle} type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required />
                </div>
              </div>

              {/* Country */}
              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Country *</label>
                <select name="country" value={formData.country} onChange={handleInputChange} required style={{ ...inputStyle, width: "100%" }}>
                  <option value="" disabled>Select Country</option>
                  {countries.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              {error && (
                <div style={{ background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.4)", borderRadius: "6px", padding: "14px 18px", marginBottom: "24px", color: "#ff6b7a", fontSize: "0.9rem" }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={submitting} style={submitBtnStyle(submitting)}>
                {submitting ? "Redirecting to Payment…" : "Proceed to Payment — $10"}
              </button>

              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Link to="/faq" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textDecoration: "underline" }}>
                  Have questions? View FAQs
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

/* ── Shared styles ── */

const heroStyle: React.CSSProperties = {
  background: "#101435",
};

const heroBlobStyle: React.CSSProperties = { display: "none" };

const subtitleTagStyle: React.CSSProperties = { display: "none" };

const metaItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const metaIconStyle: React.CSSProperties = {
  fontSize: "1.1rem",
};

const countdownBoxStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  padding: "28px 36px",
  minWidth: "110px",
  textAlign: "center",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "24px",
  marginBottom: "24px",
  flexWrap: "wrap",
};

const fieldStyle: React.CSSProperties = {
  flex: 1,
  minWidth: "220px",
  display: "flex",
  flexDirection: "column",
};

const labelStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.55)",
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "8px",
};

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "6px",
  color: "#fff",
  padding: "14px 16px",
  fontSize: "0.95rem",
  outline: "none",
  width: "100%",
  fontFamily: "Manrope, sans-serif",
  transition: "border-color 0.2s ease",
};

const submitBtnStyle = (disabled: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "18px 24px",
  background: disabled ? "rgba(33,51,228,0.5)" : "#2133e4",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "0.85rem",
  fontWeight: 800,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "background 0.3s ease",
  fontFamily: "Manrope, sans-serif",
  marginBottom: "16px",
});

export default RegisterPage;
