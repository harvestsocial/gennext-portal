import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { getRegistrationById, type RegistrationData } from "@/lib/registrationApi";
import eventData from "@/jsonData/eventInfoContact.json";
import logo from "/assets/img/icon/logo.svg";
import "../index.scss";

interface EventItem {
    label?: string;
    value: string;
}

interface EventSection {
    title: string;
    items: EventItem[];
}

interface EventData {
    details: EventSection;
    venue: EventSection;
}

const data = eventData as EventData;
const eventDate = data.details.items.find((item) => item.label?.toUpperCase() === "DATE")?.value || "July 16-18, 2026";
const eventTime = data.details.items.find((item) => item.label?.toUpperCase() === "TIME")?.value || "09:00 AM";
const eventVenue = data.venue.items.find((item) => item.label?.toUpperCase() === "LOCATION")?.value || "Celebration Centre, Borrowdale, Harare";

const EVENT_DETAILS = {
    name: "Generation Next Conference",
    date: eventDate,
    venue: eventVenue,
    checkIn: eventTime,
};

const ConfirmationPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<RegistrationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [paymentFailed, setPaymentFailed] = useState(false);
    const [shareMessage, setShareMessage] = useState("");
    const navigate = useNavigate();

    const registrationId = searchParams.get("id");

    useEffect(() => {
        if (!registrationId) { navigate("/"); return; }
        void fetchRegistration();
    }, [registrationId]);

    // Poll interval ref so we can clear it on unmount or when confirmed
    const pollRef = React.useRef<number | null>(null);

    useEffect(() => {
        return () => { if (pollRef.current) window.clearInterval(pollRef.current); };
    }, []);

    const fetchRegistration = async () => {
        if (!registrationId) return;
        try {
            const registration = await getRegistrationById(registrationId);
            if (!registration) { navigate("/"); return; }
            setData(registration);

            // If still pending, poll every 4s for up to 60s waiting for webhook
            if (registration.paymentStatus !== "confirmed") {
                let attempts = 0;
                pollRef.current = window.setInterval(async () => {
                    attempts++;
                    try {
                        const latest = await getRegistrationById(registrationId);
                        if (latest) setData(latest);
                        if (latest?.paymentStatus === "confirmed") {
                            if (pollRef.current) window.clearInterval(pollRef.current);
                        } else if (attempts >= 15) {
                            // 60s elapsed — payment was not received
                            if (pollRef.current) window.clearInterval(pollRef.current);
                            setPaymentFailed(true);
                        }
                    } catch { /* silent */ }
                }, 4000);
            }
        } catch (error) {
            console.error("Error fetching ticket:", error);
        } finally {
            setLoading(false);
        }
    };

    const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

    const handleDownloadTicket = () => {
        window.print();
    };

    const copyTextLegacy = (text: string) => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, text.length);
        let copied = false;
        try {
            copied = document.execCommand("copy");
        } catch (_error) {
            copied = false;
        }
        document.body.removeChild(textarea);
        return copied;
    };

    const handleShare = async () => {
        setShareMessage("");
        const url = window.location.href;
        const sharePayload = {
            title: "GenNext Registration Ticket",
            text: `Check out my registration ticket for GenNext! Code: ${data?.id}`,
            url,
        };

        if (canShare) {
            try {
                await navigator.share(sharePayload);
                setShareMessage("Ticket shared successfully.");
                return;
            } catch (error: any) {
                // If user canceled the share sheet, don't show an error.
                if (error?.name === "AbortError") return;
            }
        }

        const fallbackText = `${sharePayload.text}\n${url}`;
        try {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
                await navigator.clipboard.writeText(fallbackText);
                setShareMessage("Share link copied to clipboard.");
                return;
            }
        } catch (_error) {
            // continue to legacy copy fallback
        }

        const copied = copyTextLegacy(fallbackText);
        if (copied) {
            setShareMessage("Share link copied to clipboard.");
            return;
        }

        setShareMessage(`Copy this link and share: ${url}`);
    };

    if (loading) return <div className="text-center mt-5">Loading Ticket...</div>;
    if (!data) return null;

    // Payment failed — show error screen
    if (paymentFailed || (data.paymentStatus !== "confirmed" && !loading)) {
        return (
            <div style={{ minHeight: "100vh", background: "#101435", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", fontFamily: "Manrope, sans-serif" }}>
                <div style={{ maxWidth: "460px", width: "100%", textAlign: "center" }}>
                    <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(220,53,69,0.15)", border: "2px solid rgba(220,53,69,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "2rem" }}>✕</div>
                    <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.6rem", marginBottom: "12px" }}>Payment Not Completed</h2>
                    <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "8px" }}>
                        Your registration was not confirmed because the payment was not received.
                        Your spot has <strong style={{ color: "#fff" }}>not</strong> been reserved.
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginBottom: "32px" }}>
                        If you believe this is an error, please contact us at <strong style={{ color: "rgba(255,255,255,0.7)" }}>0787 963 720</strong>.
                    </p>
                    <a href="https://www.gennextmovement.com/registration" style={{ display: "inline-block", background: "#2133e4", color: "#fff", padding: "14px 36px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                        Try Again
                    </a>
                </div>
            </div>
        );
    }

    const qrValue = [
        "GENNEXT_TICKET",
        `ID:${data.id}`,
        `NAME:${data.firstName} ${data.lastName}`,
        `EVENT:${EVENT_DETAILS.name}`,
        `VENUE:${EVENT_DETAILS.venue}`,
    ].join("\n");

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-5 ticket-print-root">
            <style>{`
                @media print {
                    body * {
                        visibility: hidden !important;
                    }
                    .ticket-print-root,
                    .ticket-print-root * {
                        visibility: visible !important;
                    }
                    .ticket-print-root {
                        position: absolute !important;
                        inset: 0 !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        margin: 0 !important;
                        padding: 12mm !important;
                        display: block !important;
                        background: #ffffff !important;
                    }
                    .ticket-actions,
                    .ticket-back-home {
                        display: none !important;
                    }
                    .ticket-print-card {
                        box-shadow: none !important;
                        border: 1px solid #d1d5db !important;
                        width: 100% !important;
                        max-width: 180mm !important;
                        margin: 0 auto !important;
                    }
                    body {
                        background: #fff !important;
                    }
                    @page {
                        size: A4;
                        margin: 10mm;
                    }
                }
            `}</style>
            <div className="card shadow-lg p-4 ticket-print-card" style={{ maxWidth: "500px", width: "100%", borderTop: "5px solid #d4af37" }}>
                <div className="text-center mb-4">
                    <img src={logo} alt="Generation Next" style={{ width: "220px", maxWidth: "100%" }} />
                </div>

                {/* Event title strip */}
                <div style={{ background: "#101435", borderRadius: "8px", padding: "14px 18px", marginBottom: "16px" }}>
                    <p style={{ color: "#818cf8", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>Generation Next 2026</p>
                    <p style={{ color: "#fff", fontSize: "1rem", fontWeight: 800, margin: 0, lineHeight: 1.3 }}>Raising the Next Generation of Leaders</p>
                </div>

                <div className="mb-4 p-3 rounded bg-light">
                    <h6 className="fw-bold mb-2" style={{ color: "#111827" }}>Event Details</h6>
                    <div className="small"><strong>Event:</strong> {EVENT_DETAILS.name}</div>
                    <div className="small"><strong>Date:</strong> {EVENT_DETAILS.date}</div>
                    <div className="small"><strong>Venue:</strong> {EVENT_DETAILS.venue}</div>
                    <div className="small"><strong>Check-in:</strong> {EVENT_DETAILS.checkIn}</div>
                </div>

                <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ color: "#111827" }}>
                        {data.paymentStatus === "confirmed" ? "Registration Confirmed" : "Payment Pending"}
                    </h2>
                    {data.paymentStatus === "confirmed" ? (
                        <span style={{ display: "inline-block", background: "#16a34a", color: "#fff", fontSize: "0.8rem", fontWeight: 600, padding: "3px 12px", borderRadius: "999px", letterSpacing: "0.05em", marginBottom: "8px" }}>
                            ✓ Payment Confirmed — $10.00
                        </span>
                    ) : (
                        <span style={{ display: "inline-block", background: "#ef4444", color: "#fff", fontSize: "0.8rem", fontWeight: 600, padding: "3px 12px", borderRadius: "999px", letterSpacing: "0.05em", marginBottom: "8px" }}>
                            ⚠ Payment Not Received — Please complete payment
                        </span>
                    )}
                    <p className="text-muted">
                        {data.paymentStatus === "confirmed"
                            ? "Present this ticket at the entrance."
                            : "Your registration is reserved but not confirmed until payment is received."}
                    </p>
                </div>

                <div className="text-center mb-4">
                    <div className="p-3 bg-light d-inline-block rounded">
                        <QRCode value={qrValue} size={200} />
                    </div>
                    <p className="mt-2 text-monospace small">ID: {data.id}</p>
                </div>

                <div className="mb-4">
                    <div className="row mb-2">
                        <div className="col-4 text-muted">Name:</div>
                        <div className="col-8 fw-bold">{data.title} {data.firstName} {data.lastName}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4 text-muted">Church:</div>
                        <div className="col-8">{data.church}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4 text-muted">Country:</div>
                        <div className="col-8">{data.country}</div>
                    </div>
                </div>

                <div className="ticket-actions d-grid gap-2">
                    <button onClick={() => void handleShare()} className="btn btn-primary w-100 btn-lg">
                        Share Ticket
                    </button>
                    <button onClick={handleDownloadTicket} className="btn btn-outline-secondary w-100 btn-lg">
                        Download / Print Ticket
                    </button>
                </div>
                {shareMessage ? <div className="small text-center text-muted mt-2">{shareMessage}</div> : null}

                <button onClick={() => navigate("/")} className="btn btn-link w-100 mt-2 ticket-back-home">
                    Back to Home
                </button>

                {/* Footer strip */}
                <div style={{ borderTop: "1px solid #e5e7eb", marginTop: "16px", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#9ca3af", fontSize: "0.7rem" }}>gennextmovement.com</span>
                    <span style={{ color: "#9ca3af", fontSize: "0.7rem", fontStyle: "italic" }}>Malachi 4:6</span>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
