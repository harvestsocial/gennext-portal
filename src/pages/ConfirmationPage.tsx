import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { confirmPayment, getRegistrationById, type RegistrationData } from "@/lib/registrationApi";
import eventData from "@/jsonData/eventInfoContact.json";

interface EventData { details: { title: string; items: { label?: string; value: string }[] }; venue: { title: string; items: { label?: string; value: string }[] } }
const ed = eventData as EventData;
const eventDate = ed.details.items.find(i => i.label?.toUpperCase() === "DATE")?.value || "July 16–18, 2026";
const eventTime = ed.details.items.find(i => i.label?.toUpperCase() === "TIME")?.value || "9:00 AM";
const eventVenue = ed.venue.items.find(i => i.label?.toUpperCase() === "LOCATION")?.value || "Celebration Centre, Borrowdale, Harare";

const ConfirmationPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<RegistrationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [shareMsg, setShareMsg] = useState("");
    const [confetti, setConfetti] = useState(false);
    const navigate = useNavigate();

    const registrationId = searchParams.get("id");
    const confirmToken = searchParams.get("token") ?? undefined;

    useEffect(() => {
        if (!registrationId) { navigate("/"); return; }
        (async () => {
            try {
                let reg: RegistrationData | null = null;
                if (confirmToken) {
                    try { reg = await confirmPayment(registrationId, confirmToken); }
                    catch { navigate("/"); return; }
                } else {
                    reg = await getRegistrationById(registrationId);
                    if (!reg) { navigate("/"); return; }
                }
                setData(reg);
                if (reg?.paymentStatus === "confirmed") setConfetti(true);
            } catch { navigate("/"); }
            finally { setLoading(false); }
        })();
    }, [registrationId]);

    const handleShare = async () => {
        setShareMsg("");
        const url = window.location.href;
        const text = `My Generation Next 2026 ticket — ID: ${data?.id}`;
        if (navigator.share) {
            try { await navigator.share({ title: "GenNext Ticket", text, url }); return; }
            catch (e: any) { if (e?.name === "AbortError") return; }
        }
        try {
            await navigator.clipboard.writeText(`${text}\n${url}`);
            setShareMsg("Link copied to clipboard.");
        } catch { setShareMsg(`Copy: ${url}`); }
    };

    if (loading) return (
        <div style={{ minHeight: "100vh", background: "#101435", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope, sans-serif", color: "rgba(255,255,255,0.5)" }}>
            Loading ticket…
        </div>
    );
    if (!data) return null;

    const confirmed = data.paymentStatus === "confirmed";
    const qrValue = `GENNEXT2026|ID:${data.id}|${data.firstName} ${data.lastName}|${eventVenue}`;

    const confettiDots = Array.from({ length: 30 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1.5}s`,
        color: ["#2133e4", "#4ade80", "#fbbf24", "#f472b6", "#818cf8"][i % 5],
        size: `${6 + Math.random() * 8}px`,
    }));

    return (
        <div style={{ minHeight: "100vh", background: "#0d1128", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 16px", fontFamily: "Manrope, sans-serif", position: "relative", overflow: "hidden" }}>

            <style>{`
                @keyframes fall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
                @keyframes shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
                @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
                @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(74,222,128,0.4)} 70%{box-shadow:0 0 0 12px rgba(74,222,128,0)} 100%{box-shadow:0 0 0 0 rgba(74,222,128,0)} }
                @media print {
                    body * { visibility: hidden !important; }
                    .ticket-print-root, .ticket-print-root * { visibility: visible !important; }
                    .ticket-print-root { position: absolute !important; inset: 0 !important; padding: 12mm !important; background: #fff !important; }
                    .ticket-actions { display: none !important; }
                }
            `}</style>

            {/* Confetti */}
            {confetti && confettiDots.map((d, i) => (
                <div key={i} style={{ position: "fixed", top: "-10px", left: d.left, width: d.size, height: d.size, borderRadius: "2px", background: d.color, animation: `fall 2.5s ${d.delay} ease-in forwards`, zIndex: 0, pointerEvents: "none" }} />
            ))}

            <div className="ticket-print-root" style={{ width: "100%", maxWidth: "560px", animation: "fadeUp 0.6s ease-out", position: "relative", zIndex: 1 }}>

                {/* ── Ticket card ── */}
                <div style={{ borderRadius: "16px", overflow: "hidden", background: "linear-gradient(135deg, #1A1E42 0%, #101435 100%)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}>

                    {/* Header banner */}
                    <div style={{ background: "linear-gradient(90deg, #2133e4, #1d0bb5)", padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <img src="/assets/images/gennext/logos/logo.png" alt="Generation Next" style={{ height: "36px", objectFit: "contain" }} />
                        </div>
                        <div style={{ textAlign: "right" }}>
                            {confirmed ? (
                                <span style={{ background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.5)", color: "#4ade80", borderRadius: "100px", padding: "5px 14px", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "6px", animation: "pulse-ring 2s infinite" }}>
                                    <span style={{ width: "6px", height: "6px", background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
                                    CONFIRMED
                                </span>
                            ) : (
                                <span style={{ background: "rgba(251,191,36,0.2)", border: "1px solid rgba(251,191,36,0.4)", color: "#fbbf24", borderRadius: "100px", padding: "5px 14px", fontSize: "0.75rem", fontWeight: 800 }}>
                                    ⚠ PAYMENT PENDING
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Event title strip */}
                    <div style={{ padding: "16px 28px 0", background: "rgba(33,51,228,0.08)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>Generation Next 2026</p>
                        <h2 style={{ color: "#fff", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 800, margin: "0 0 14px", lineHeight: 1.2 }}>Raising the Next Generation of Leaders</h2>
                    </div>

                    {/* Main body — left info + right QR */}
                    <div style={{ display: "flex", alignItems: "stretch" }}>

                        {/* Left — attendee + event info */}
                        <div style={{ flex: 1, padding: "24px 28px" }}>
                            <div style={{ marginBottom: "20px" }}>
                                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 4px" }}>Attendee</p>
                                <p style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>{data.title} {data.firstName} {data.lastName}</p>
                                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", margin: "4px 0 0" }}>{data.church}</p>
                            </div>

                            {[
                                { icon: "📅", label: "Date", val: eventDate },
                                { icon: "🕘", label: "Check-in", val: eventTime },
                                { icon: "📍", label: "Venue", val: eventVenue },
                                { icon: "🌍", label: "Origin", val: `${data.city}, ${data.country}` },
                            ].map(({ icon, label, val }) => (
                                <div key={label} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                                    <span style={{ fontSize: "0.9rem", marginTop: "1px" }}>{icon}</span>
                                    <div>
                                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>{label}</span>
                                        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", fontWeight: 600 }}>{val}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Perforated divider */}
                        <div style={{ width: "1px", background: "repeating-linear-gradient(to bottom, transparent, transparent 6px, rgba(255,255,255,0.15) 6px, rgba(255,255,255,0.15) 12px)", margin: "16px 0", flexShrink: 0 }} />

                        {/* Right — QR code stub */}
                        <div style={{ width: "160px", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px", gap: "12px" }}>
                            <div style={{ background: "#fff", borderRadius: "10px", padding: "10px", boxShadow: "0 4px 20px rgba(33,51,228,0.3)" }}>
                                <QRCode value={qrValue} size={110} bgColor="#ffffff" fgColor="#101435" level="H" />
                            </div>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0, textAlign: "center" }}>Scan at entry</p>
                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", fontFamily: "monospace", margin: 0, textAlign: "center", wordBreak: "break-all" }}>{data.id}</p>
                        </div>
                    </div>

                    {/* Footer strip */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.15)" }}>
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontFamily: "monospace" }}>gennextmovement.com</span>
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>Malachi 4:6</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="ticket-actions" style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                    <button onClick={() => void handleShare()} style={{ flex: 1, background: "#2133e4", color: "#fff", border: "none", borderRadius: "8px", padding: "14px", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Manrope, sans-serif" }}>
                        Share Ticket
                    </button>
                    <button onClick={() => window.print()} style={{ flex: 1, background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "14px", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", fontFamily: "Manrope, sans-serif" }}>
                        Download / Print
                    </button>
                </div>

                {shareMsg && <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", textAlign: "center", marginTop: "10px" }}>{shareMsg}</p>}

                <button onClick={() => navigate("/")} style={{ display: "block", margin: "14px auto 0", background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", cursor: "pointer", fontFamily: "Manrope, sans-serif" }}>
                    ← Back to Home
                </button>
            </div>
        </div>
    );
};

export default ConfirmationPage;
