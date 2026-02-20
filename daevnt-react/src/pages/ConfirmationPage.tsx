import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { getRegistrationById, type RegistrationData } from "@/lib/registrationApi";
import logo from "/assets/img/icon/logo.svg";
import "../index.scss";

const EVENT_DETAILS = {
    name: "Generation Next Conference",
    date: "Saturday, 12 December 2026",
    venue: "Grace Centre, 5XH6+XR9, Harare",
    checkIn: "08:00 AM",
};

const ConfirmationPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<RegistrationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [shareMessage, setShareMessage] = useState("");
    const navigate = useNavigate();

    const registrationId = searchParams.get("id");

    useEffect(() => {
        if (!registrationId) {
            alert("No registration ID found.");
            navigate("/");
            return;
        }
        fetchRegistration();
    }, [registrationId]);

    const fetchRegistration = async () => {
        try {
            if (registrationId) {
                const registration = await getRegistrationById(registrationId);
                if (registration) {
                    setData(registration);
                } else {
                    alert("Registration not found!");
                    navigate("/");
                }
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

                <div className="mb-4 p-3 rounded bg-light">
                    <h6 className="fw-bold mb-2" style={{ color: "#111827" }}>Event Details</h6>
                    <div className="small"><strong>Event:</strong> {EVENT_DETAILS.name}</div>
                    <div className="small"><strong>Date:</strong> {EVENT_DETAILS.date}</div>
                    <div className="small"><strong>Venue:</strong> {EVENT_DETAILS.venue}</div>
                    <div className="small"><strong>Check-in:</strong> {EVENT_DETAILS.checkIn}</div>
                </div>

                <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ color: "#111827" }}>Registration Confirmed</h2>
                    <p className="text-muted">Present this ticket at the entrance.</p>
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
            </div>
        </div>
    );
};

export default ConfirmationPage;
