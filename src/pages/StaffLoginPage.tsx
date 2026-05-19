import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffLoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (username === "gennnxt2025" && password === "delineatingthefuture") {
      sessionStorage.setItem("staffAuthenticated", "true");
      navigate("/staff/portal");
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#101435", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "Manrope, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <img src="/assets/images/gennext/logos/logo.png" alt="Generation Next" style={{ width: "140px" }} />
        </div>

        {/* Card */}
        <div style={{ background: "#1A1E42", borderRadius: "12px", padding: "40px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginBottom: "8px", textAlign: "center" }}>Staff Login</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", textAlign: "center", marginBottom: "32px" }}>
            Generation Next staff portal
          </p>

          {error && (
            <div style={{ background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.4)", borderRadius: "6px", padding: "12px 16px", marginBottom: "20px", color: "#ff6b7a", fontSize: "0.875rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", padding: "14px 16px", color: "#fff", fontSize: "0.95rem", fontFamily: "Manrope, sans-serif", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", padding: "14px 16px", color: "#fff", fontSize: "0.95rem", fontFamily: "Manrope, sans-serif", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: loading ? "rgba(33,51,228,0.5)" : "#2133e4", color: "#fff", border: "none", borderRadius: "6px", padding: "16px", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Manrope, sans-serif", transition: "background 0.3s ease" }}
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default StaffLoginPage;
