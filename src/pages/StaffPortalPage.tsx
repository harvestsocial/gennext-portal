import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRegistrations, setRegistrationAccess, type RegistrationData } from "@/lib/registrationApi";

interface Registration extends RegistrationData {}

const normalizeGender = (v?: string) => {
  const g = String(v || "").trim().toLowerCase();
  if (g === "male" || g === "m") return "Male";
  if (g === "female" || g === "f") return "Female";
  return "";
};

const StaffPortalPage: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "error" | "success" } | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const showToast = (msg: string, type: "error" | "success" = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("staffAuthenticated")) {
      navigate("/staff/login");
      return;
    }
    void loadRegistrations(true);
    const id = window.setInterval(() => void loadRegistrations(false), 10000);
    return () => window.clearInterval(id);
  }, [navigate]);

  useEffect(() => {
    const clear = () => {
      sessionStorage.removeItem("staffAuthenticated");
      localStorage.removeItem("staffAuthenticated");
    };
    window.addEventListener("beforeunload", clear);
    window.addEventListener("pagehide", clear);
    return () => { window.removeEventListener("beforeunload", clear); window.removeEventListener("pagehide", clear); };
  }, []);

  const loadRegistrations = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      setRegistrations(await getRegistrations());
    } catch (e: unknown) {
      showToast(`Failed to load registrations: ${e instanceof Error ? e.message : "Unknown error"}`);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const toggleAccess = async (id: string, current: boolean) => {
    setUpdatingId(id);
    try {
      await setRegistrationAccess(id, !current);
      setRegistrations(prev => prev.map(r => r.id === id ? { ...r, accessGranted: !current } : r));
      showToast(!current ? "Access granted." : "Access revoked.", "success");
    } catch {
      showToast("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCsv = () => {
    if (!registrations.length) { showToast("No registrations to export."); return; }
    const headers = ["ID","Title","First Name","Last Name","Gender","Church","City","Country","Phone","Email","Access Granted","Created At"];
    const rows = registrations.map(r => [r.id,r.title,r.firstName,r.lastName,r.gender,r.church,r.city,r.country,r.phone,r.email,r.accessGranted?"Yes":"No",r.createdAt||""]);
    const csv = [headers, ...rows].map(row => row.map(v => `"${String(v??'').replace(/"/g,'""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    a.download = `gennext-registrations-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  const confirmed = registrations.filter(r =>
    r.paymentStatus === "confirmed" && (r.firstName || r.lastName)
  );

  const filtered = confirmed.filter(r => {
    if (!searchTerm) return true;
    return [r.id,r.title,r.firstName,r.lastName,r.church,r.city,r.country,r.phone,r.email].filter(Boolean).join(" ").toLowerCase().includes(searchTerm);
  });

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#101435", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope, sans-serif" }}>
      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>Loading portal…</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0d1128", fontFamily: "Manrope, sans-serif", color: "#fff" }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999, background: toast.type === "success" ? "rgba(34,197,94,0.15)" : "rgba(220,53,69,0.15)", border: `1px solid ${toast.type === "success" ? "rgba(34,197,94,0.4)" : "rgba(220,53,69,0.4)"}`, borderRadius: "8px", padding: "14px 20px", color: toast.type === "success" ? "#4ade80" : "#ff6b7a", fontSize: "0.875rem", maxWidth: "360px" }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ background: "#101435", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, color: "#fff" }}>GenNext Staff Portal</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", margin: "4px 0 0" }}>{confirmed.length} confirmed registrations</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { label: "Live Analytics", action: () => navigate("/staff/analytics"), style: { background: "#2133e4" } },
            { label: "Export CSV", action: handleExportCsv, style: { background: "transparent", border: "1px solid rgba(255,255,255,0.2)" } },
            { label: "Refresh", action: () => void loadRegistrations(false), style: { background: "transparent", border: "1px solid rgba(255,255,255,0.2)" } },
            { label: "Logout", action: () => { sessionStorage.removeItem("staffAuthenticated"); navigate("/staff/login"); }, style: { background: "rgba(220,53,69,0.2)", border: "1px solid rgba(220,53,69,0.4)", color: "#ff6b7a" } },
          ].map(({ label, action, style }) => (
            <button key={label} onClick={action} style={{ padding: "9px 18px", borderRadius: "6px", border: "none", color: "#fff", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", fontFamily: "Manrope, sans-serif", transition: "opacity 0.2s", ...style }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "20px 32px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by ID, name, church, phone or email"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && setSearchTerm(searchInput.trim().toLowerCase())}
          style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", padding: "12px 16px", color: "#fff", fontSize: "0.9rem", fontFamily: "Manrope, sans-serif", outline: "none" }}
        />
        <button onClick={() => setSearchTerm(searchInput.trim().toLowerCase())} style={{ background: "#2133e4", color: "#fff", border: "none", borderRadius: "6px", padding: "12px 24px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", fontFamily: "Manrope, sans-serif" }}>
          Search
        </button>
      </div>

      {/* Table */}
      <div style={{ padding: "0 32px 40px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ background: "#101435", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              {["Name", "Gender", "Church", "Location", "Contact", "Status", "Action"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "rgba(255,255,255,0.35)" }}>
                  {registrations.length === 0 ? "No registrations yet." : "No matching registrations."}
                </td>
              </tr>
            ) : filtered.map((reg, i) => (
              <tr key={reg.id} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{reg.title} {reg.firstName} {reg.lastName}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "2px" }}>{reg.id}</div>
                </td>
                <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.75)" }}>{normalizeGender(reg.gender)}</td>
                <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.75)" }}>{reg.church}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ color: "rgba(255,255,255,0.75)" }}>{reg.city}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{reg.country}</div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ color: "rgba(255,255,255,0.75)" }}>{reg.phone}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{reg.email}</div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700, background: reg.accessGranted ? "rgba(34,197,94,0.15)" : "rgba(250,189,0,0.15)", color: reg.accessGranted ? "#4ade80" : "#fbbf24", border: `1px solid ${reg.accessGranted ? "rgba(34,197,94,0.3)" : "rgba(250,189,0,0.3)"}` }}>
                    {reg.accessGranted ? "Access Granted" : "Pending"}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <button
                    disabled={updatingId === reg.id}
                    onClick={() => void toggleAccess(reg.id, reg.accessGranted)}
                    style={{ padding: "7px 14px", borderRadius: "6px", border: "none", fontSize: "0.78rem", fontWeight: 700, cursor: updatingId === reg.id ? "not-allowed" : "pointer", fontFamily: "Manrope, sans-serif", transition: "opacity 0.2s", opacity: updatingId === reg.id ? 0.5 : 1, background: reg.accessGranted ? "rgba(220,53,69,0.15)" : "rgba(33,51,228,0.2)", color: reg.accessGranted ? "#ff6b7a" : "#818cf8", border: `1px solid ${reg.accessGranted ? "rgba(220,53,69,0.3)" : "rgba(33,51,228,0.4)"}` as unknown as undefined }}
                  >
                    {updatingId === reg.id ? "…" : reg.accessGranted ? "Revoke" : "Grant Access"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPortalPage;
