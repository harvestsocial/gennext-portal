import React, { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRegistrations, type RegistrationData } from "@/lib/registrationApi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../index.scss";
import "./StaffAnalyticsPage.scss";

type AnalyticsTab = "overview" | "demographics" | "location" | "positions" | "board";
type AnalyticsTabDef = { key: AnalyticsTab; label: string };

interface Registration extends RegistrationData { }
interface StaffAnalyticsPageProps {
    tvMode?: boolean;
}

const normalizeGender = (value?: string) => {
    const g = String(value || "").trim().toLowerCase();
    if (g === "male" || g === "m") return "Male";
    if (g === "female" || g === "f") return "Female";
    return "";
};

const TABS: AnalyticsTabDef[] = [
    { key: "overview", label: "Overview" },
    { key: "demographics", label: "Demographics" },
    { key: "location", label: "Location Map" },
    { key: "positions", label: "Positions" },
    { key: "board", label: "Board Analytics" },
];

const BOARD_CHURCHES = [
    {
        members: "Bishop Dr. Colin Nyathi and Bishop Dr. Sarah Nyathi",
        church: "Harvest House International Church",
    },
    {
        members: "Apostle Bangira",
        church: "Living In Victory International Church",
    },
    {
        members: "Reverend Ntobeko Mhlanga",
        church: "Glory Temple Ministries",
    },
    {
        members: "Bishop Elison Shava",
        church: "Oneness Pentecostal Church",
    },
    {
        members: "Dr. Innocent Maja",
        church: "I Am Fellowship International",
    },
    {
        members: "Bishop Joshua Nyava",
        church: "House of Prayer Generation International",
    },
    {
        members: "Pastor Yasha Chiriseri",
        church: "His Presence Ministries International",
    },
    {
        members: "Reverend Hilton Moyo",
        church: "Fellowship of the God Kind Church",
    },
] as const;

const normalizeText = (value?: string) =>
    String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

const normalizeChurchForBoardMatch = (value?: string) => {
    const raw = String(value || "").toLowerCase();
    const stripped = raw
        .replace(/\b(hq|city\s*hub|branch|main\s*branch|campus|assembly|center|centre|local|zone|district)\b/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    return normalizeText(stripped);
};

const locationCoordinates: Record<string, { lat: number; lng: number }> = {
    Zimbabwe: { lat: -19.0154, lng: 29.1549 },
    "South Africa": { lat: -30.5595, lng: 22.9375 },
    Zambia: { lat: -13.1339, lng: 27.8493 },
    Botswana: { lat: -22.3285, lng: 24.6849 },
    Mozambique: { lat: -18.6657, lng: 35.5296 },
    Malawi: { lat: -13.2543, lng: 34.3015 },
    Kenya: { lat: -0.0236, lng: 37.9062 },
    Uganda: { lat: 1.3733, lng: 32.2903 },
    Rwanda: { lat: -1.9403, lng: 29.8739 },
    Tanzania: { lat: -6.369, lng: 34.8888 },
    Harare: { lat: -17.8249, lng: 31.0492 },
    Bulawayo: { lat: -20.1325, lng: 28.6265 },
    Mutare: { lat: -18.9707, lng: 32.6709 },
    Gweru: { lat: -19.4553, lng: 29.8167 },
    Johannesburg: { lat: -26.2041, lng: 28.0473 },
    Pretoria: { lat: -25.7479, lng: 28.2293 },
    "Cape Town": { lat: -33.9249, lng: 18.4241 },
    Durban: { lat: -29.8587, lng: 31.0218 },
    Lusaka: { lat: -15.3875, lng: 28.3228 },
    Ndola: { lat: -12.9587, lng: 28.6366 },
    Gaborone: { lat: -24.6282, lng: 25.9231 },
    Maputo: { lat: -25.9692, lng: 32.5732 },
};

const MetricIcon: React.FC<{ type: string }> = ({ type }) => {
    const paths: Record<string, React.ReactNode> = {
        total: <path d="M4 7a3 3 0 1 1 6 0v1h2v10H2V8h2V7Zm2 0v1h2V7a1 1 0 1 0-2 0Zm-2 3v6h6v-6H4Z" />,
        checkin: <path d="M12 3h8v8h-2V6.41l-8.29 8.3-4-4L7.12 9.3l2.59 2.58L16.59 5H12V3Z" />,
        pending: <path d="M11 2a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm1 5h-2v5l4 2 1-1.73-3-1.52V7Z" />,
        rate: <path d="M3 17h18v2H3v-2Zm3-3h3v3H6v-3Zm5-5h3v8h-3V9Zm5-4h3v12h-3V5Z" />,
        city: <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z" />,
        male: <path d="M14 3h7v7h-2V6.41l-3.62 3.62A6 6 0 1 1 14 8.62L17.59 5H14V3ZM9 10a4 4 0 1 0 .01 8.01A4 4 0 0 0 9 10Z" />,
        female: <path d="M11 2a6 6 0 0 1 1 11.92V17h3v2h-3v3h-2v-3H7v-2h3v-3.08A6 6 0 0 1 11 2Zm0 2a4 4 0 1 0 .01 8.01A4 4 0 0 0 11 4Z" />,
        other: <path d="M12 2a5 5 0 0 1 5 5v2h3v2h-3v2a5 5 0 1 1-10 0v-2H4V9h3V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3Z" />,
    };

    return (
        <span className={`metric-icon metric-icon--${type}`} aria-hidden="true">
            <svg viewBox="0 0 24 24">{paths[type] || paths.total}</svg>
        </span>
    );
};

const RingMetric: React.FC<{
    label: string;
    value: number;
    total: number;
    color: string;
}> = ({ label, value, total, color }) => {
    const targetPercentage = total > 0 ? Math.round((value / total) * 100) : 0;
    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    useEffect(() => {
        // Reset to empty on mount/tab change, then animate to target.
        setAnimatedPercentage(0);
        const frame = window.requestAnimationFrame(() => {
            setAnimatedPercentage(targetPercentage);
        });
        return () => window.cancelAnimationFrame(frame);
    }, [targetPercentage, label, value, total]);

    const circumference = 2 * Math.PI * 30;
    const offset = circumference - (animatedPercentage / 100) * circumference;
    const centerValueSize = String(value).length > 3 ? "9" : "11";

    return (
        <div className="ring-metric">
            <svg viewBox="0 0 80 80" className="ring-metric__svg">
                <circle cx="40" cy="40" r="30" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
                <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="transparent"
                    stroke={color}
                    strokeWidth="7"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                    style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
                />
                <text x="40" y="40" textAnchor="middle" dy="0.35em" fill="#fff" fontSize={centerValueSize} fontWeight="700">
                    {value}
                </text>
                <text x="40" y="54" textAnchor="middle" fill="rgba(226,232,240,0.85)" fontSize="6.3">
                    {animatedPercentage}%
                </text>
            </svg>
            <div className="ring-metric__label">{label}</div>
        </div>
    );
};

const StaffAnalyticsPage: React.FC<StaffAnalyticsPageProps> = ({ tvMode = false }) => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<AnalyticsTab>("overview");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mapCountry, setMapCountry] = useState("Global Reach");
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const cleanMode = tvMode && new URLSearchParams(location.search).get("clean") === "1";
    const initialTab = new URLSearchParams(location.search).get("tab") as AnalyticsTab | null;

    useGSAP(() => {
        gsap.from(".analytics-card", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });

        gsap.to(".ai-analyst-section", {
            borderColor: "rgba(168, 85, 247, 0.8)",
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut"
        });
    }, { scope: containerRef, dependencies: [activeTab, loading] });

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("staffAuthenticated");
        if (!isAuthenticated) {
            navigate("/staff/login");
            return;
        }
        void loadRegistrations(true);
        const intervalId = window.setInterval(() => void loadRegistrations(false), 10000);
        return () => window.clearInterval(intervalId);
    }, [navigate]);

    useEffect(() => {
        if (!initialTab) return;
        if (TABS.some((t) => t.key === initialTab)) {
            setActiveTab(initialTab);
        }
    }, [initialTab]);

    useEffect(() => {
        if (!tvMode) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (document.fullscreenElement && document.exitFullscreen) void document.exitFullscreen();
                if (cleanMode) navigate("/staff/analytics");
                return;
            }
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            setActiveTab((prev) => {
                const currentIndex = TABS.findIndex((t) => t.key === prev);
                const nextIndex = e.key === "ArrowRight"
                    ? (currentIndex + 1) % TABS.length
                    : (currentIndex - 1 + TABS.length) % TABS.length;
                return TABS[nextIndex].key;
            });
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [tvMode, cleanMode, navigate]);

    useEffect(() => {
        const closeMenuOnDesktop = () => {
            if (window.innerWidth >= 992) setIsMobileMenuOpen(false);
        };
        window.addEventListener("resize", closeMenuOnDesktop);
        return () => window.removeEventListener("resize", closeMenuOnDesktop);
    }, []);

    const loadRegistrations = async (showLoader = false) => {
        try {
            if (showLoader) setLoading(true);
            const data = await getRegistrations();
            setRegistrations(data);
        } catch (error: any) {
            console.error("Error loading analytics:", error);
        } finally {
            if (showLoader) setLoading(false);
        }
    };

    const metrics = useMemo(() => {
        const total = registrations.length;
        const checkedIn = registrations.filter((r) => r.accessGranted).length;
        const countryCount: Record<string, number> = {};
        const cityCount: Record<string, number> = {};
        const titleCount: Record<string, number> = {};
        const countryCities: Record<string, Record<string, number>> = {};
        const cityGenderBreakdown: Record<string, { Male: number; Female: number }> = {};
        const genderCount = { Male: 0, Female: 0 };

        registrations.forEach((r) => {
            const country = r.country || "Unspecified";
            countryCount[country] = (countryCount[country] || 0) + 1;
            const city = r.city || "Unspecified";
            cityCount[city] = (cityCount[city] || 0) + 1;
            if (!countryCities[country]) countryCities[country] = {};
            countryCities[country][city] = (countryCities[country][city] || 0) + 1;
            const title = r.title || "Attendee";
            titleCount[title] = (titleCount[title] || 0) + 1;
            const g = normalizeGender(r.gender);
            if (g === "Male" || g === "Female") {
                genderCount[g]++;
                if (!cityGenderBreakdown[city]) {
                    cityGenderBreakdown[city] = { Male: 0, Female: 0 };
                }
                cityGenderBreakdown[city][g]++;
            }
        });

        const topGenderCities = Object.entries(cityGenderBreakdown)
            .map(([city, values]) => ({
                city,
                male: values.Male,
                female: values.Female,
                total: values.Male + values.Female,
            }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 8);

        return {
            total,
            checkedIn,
            checkInRate: total > 0 ? Math.round((checkedIn / total) * 100) : 0,
            male: genderCount.Male,
            female: genderCount.Female,
            topCountries: Object.entries(countryCount).sort((a, b) => b[1] - a[1]).slice(0, 10),
            topCities: Object.entries(cityCount).sort((a, b) => b[1] - a[1]).slice(0, 10),
            topTitles: Object.entries(titleCount).sort((a, b) => b[1] - a[1]).slice(0, 8),
            countryCities,
            topGenderCities,
        };
    }, [registrations]);

    const mapPoints = useMemo(() => {
        if (mapCountry === "Global Reach") {
            return metrics.topCountries.slice(0, 8).map(([country, count]) => ({
                label: country,
                count,
                query: country,
                coords: locationCoordinates[country],
            }));
        }

        const cities = Object.entries(metrics.countryCities[mapCountry] || {})
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8);

        if (cities.length > 0) {
            return cities.map(([city, count]) => ({
                label: city,
                count,
                query: `${city}, ${mapCountry}`,
                coords: locationCoordinates[city] || locationCoordinates[mapCountry],
            }));
        }

        return [{
            label: mapCountry,
            count: 0,
            query: mapCountry,
            coords: locationCoordinates[mapCountry],
        }];
    }, [mapCountry, metrics.topCountries, metrics.countryCities]);

    const attendedCityCircles = useMemo(() => {
        const cityRows =
            mapCountry === "Global Reach"
                ? metrics.topCities.slice(0, 10)
                : Object.entries(metrics.countryCities[mapCountry] || {})
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10);

        return cityRows
            .map(([name, count]) => {
                const coords = locationCoordinates[name];
                if (!coords) return null;

                // Scale radius by attendance volume, clamped for readability.
                const radiusKm = Math.max(6, Math.min(24, 6 + count * 2));

                return {
                    name,
                    lat: coords.lat,
                    lng: coords.lng,
                    count,
                    radiusKm,
                };
            })
            .filter((item): item is { name: string; lat: number; lng: number; count: number; radiusKm: number } => Boolean(item));
    }, [mapCountry, metrics.topCities, metrics.countryCities]);

    const mapConfig = useMemo(() => {
        const availableCoords = mapPoints
            .map((p) => p.coords)
            .filter((c): c is { lat: number; lng: number } => Boolean(c));

        if (availableCoords.length === 0) {
            return {
                center: { lat: -17.8249, lng: 31.0492 },
                zoom: 2,
            };
        }

        const latValues = availableCoords.map((c) => c.lat);
        const lngValues = availableCoords.map((c) => c.lng);
        const minLat = Math.min(...latValues);
        const maxLat = Math.max(...latValues);
        const minLng = Math.min(...lngValues);
        const maxLng = Math.max(...lngValues);
        const latSpan = Math.abs(maxLat - minLat);
        const lngSpan = Math.abs(maxLng - minLng);
        const center = {
            lat: availableCoords.reduce((acc, c) => acc + c.lat, 0) / availableCoords.length,
            lng: availableCoords.reduce((acc, c) => acc + c.lng, 0) / availableCoords.length,
        };

        let zoom = 2;
        const maxSpan = Math.max(latSpan, lngSpan);
        if (maxSpan < 5) zoom = 8;
        else if (maxSpan < 10) zoom = 7;
        else if (maxSpan < 20) zoom = 6;
        else if (maxSpan < 35) zoom = 5;
        else if (maxSpan < 60) zoom = 4;
        else zoom = 2;

        return { center, zoom };
    }, [mapPoints]);

    const locationCityMetrics = useMemo(() => {
        if (mapCountry === "Global Reach") {
            return {
                total: metrics.total,
                items: metrics.topCities.slice(0, 4),
                title: "Top Cities (Global)",
            };
        }

        const entries = Object.entries(metrics.countryCities[mapCountry] || {})
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4);
        const total = entries.reduce((acc, [, count]) => acc + count, 0);

        return {
            total,
            items: entries,
            title: `Top Cities (${mapCountry})`,
        };
    }, [mapCountry, metrics.countryCities, metrics.topCities, metrics.total]);

    const mapIframeHtml = useMemo(() => {
        const points = mapPoints
            .filter((p) => p.coords)
            .map((p) => ({
                label: p.label,
                count: p.count,
                lat: p.coords!.lat,
                lng: p.coords!.lng,
            }));
        const pointsJson = JSON.stringify(points);
        const attendedJson = JSON.stringify(attendedCityCircles);
        const markerColor = "#7dd3fc";

        return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body { margin: 0; padding: 0; height: 100%; width: 100%; background: #0b1220; }
    #map { height: 100%; width: 100%; }
    .leaflet-control-attribution { background: rgba(8, 12, 22, 0.75); color: #cbd5e1; }
    .leaflet-popup-content-wrapper, .leaflet-popup-tip { background: #0f172a; color: #e2e8f0; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const points = ${pointsJson};
    const attended = ${attendedJson};
    const defaultCenter = [${mapConfig.center.lat}, ${mapConfig.center.lng}];
    const map = L.map('map', { zoomControl: true }).setView(defaultCenter, ${mapConfig.zoom});

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap contributors &copy; Stadia Maps'
    }).addTo(map);

    if (points.length > 1) {
      const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds.pad(0.25));
    }

    attended.forEach((c) => {
      L.circle([c.lat, c.lng], {
        radius: c.radiusKm * 1000,
        fillColor: "#7dd3fc",
        fillOpacity: 0.45,
        color: "#7dd3fc",
        weight: 1
      }).addTo(map).bindPopup('<strong>' + c.name + '</strong> (Attended)<br/>Count: ' + c.count);
    });

    points.forEach((p) => {
      L.circleMarker([p.lat, p.lng], {
        radius: 14,
        color: '${markerColor}',
        fillColor: '${markerColor}',
        fillOpacity: 0.92,
        weight: 3
      }).addTo(map).bindPopup('<strong>' + p.label + '</strong><br/>Count: ' + p.count);
    });
  </script>
</body>
</html>`;
    }, [attendedCityCircles, mapConfig.center.lat, mapConfig.center.lng, mapConfig.zoom, mapCountry, mapPoints]);

    const boardChurchProgress = useMemo(() => {
        return BOARD_CHURCHES.map((entry) => {
            const targetChurch = normalizeChurchForBoardMatch(entry.church);
            const targetBase = targetChurch.replace(/(international|church|ministries|ministry|fellowship)$/g, "");
            const matched = registrations.filter((r) => {
                const source = normalizeChurchForBoardMatch(r.church);
                const sourceBase = source.replace(/(international|church|ministries|ministry|fellowship)$/g, "");

                // Handles common naming variations like:
                // "Harvest House International Church HQ" / "City Hub" / "Main Branch"
                return (
                    source.includes(targetChurch) ||
                    targetChurch.includes(source) ||
                    (targetBase.length > 6 && source.includes(targetBase)) ||
                    (sourceBase.length > 6 && targetChurch.includes(sourceBase))
                );
            });
            const registered = matched.length;
            const attended = matched.filter((r) => r.accessGranted).length;
            const progress = registered > 0 ? Math.round((attended / registered) * 100) : 0;

            return {
                ...entry,
                registered,
                attended,
                progress,
                pending: Math.max(registered - attended, 0),
            };
        });
    }, [registrations]);

    const renderOverview = () => (
        <div className="row g-4">
            <div className="col-md-4">
                <div className="card analytics-card">
                    <div className="metric-head">
                        <MetricIcon type="total" />
                        <h6 className="metric-title">Total Registrations</h6>
                    </div>
                    <h3 className="metric-value">{metrics.total}</h3>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card analytics-card">
                    <div className="metric-head">
                        <MetricIcon type="checkin" />
                        <h6 className="metric-title">Total Attendance</h6>
                    </div>
                    <h3 className="metric-value" style={{ color: "var(--success-accent)" }}>{metrics.checkedIn}</h3>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card analytics-card">
                    <div className="metric-head">
                        <MetricIcon type="rate" />
                        <h6 className="metric-title">Presence Rate</h6>
                    </div>
                    <h3 className="metric-value" style={{ color: "var(--info-accent)" }}>{metrics.checkInRate}%</h3>
                </div>
            </div>
            <div className="col-12">
                <div className="card analytics-card">
                    <h6 className="metric-title mb-4">Top Countries of Origin</h6>
                    <div className="row g-4 analytics-ring-grid">
                        {metrics.topCountries.slice(0, 6).map(([country, count]) => (
                            <div className="col-xl-6 col-md-6" key={country}>
                                <RingMetric
                                    label={country}
                                    value={count}
                                    total={metrics.total}
                                    color="var(--primary-accent)"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDemographics = () => (
        <div className="row g-4">
            <div className="col-12">
                <div className="card analytics-card">
                    <h6 className="metric-title mb-4">Gender Distribution</h6>
                    <div className="row g-4 analytics-ring-grid">
                        <div className="col-xl-6 col-md-6">
                            <RingMetric
                                label="Men"
                                value={metrics.male}
                                total={metrics.total}
                                color="var(--primary-accent)"
                            />
                        </div>
                        <div className="col-xl-6 col-md-6">
                            <RingMetric
                                label="Women"
                                value={metrics.female}
                                total={metrics.total}
                                color="#ec4899"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card analytics-card">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="metric-title mb-0">Gender by City</h6>
                        <div className="gender-city-legend">
                            <span><i className="swatch swatch-male" />Men</span>
                            <span><i className="swatch swatch-female" />Women</span>
                        </div>
                    </div>
                    <div className="gender-city-chart">
                        {metrics.topGenderCities.length === 0 ? (
                            <p className="mb-0 text-center">No city gender data yet.</p>
                        ) : (
                            metrics.topGenderCities.map((item) => {
                                const maxValue = Math.max(
                                    ...metrics.topGenderCities.map((c) => Math.max(c.male, c.female)),
                                    1
                                );
                                const maleHeight = Math.max(8, Math.round((item.male / maxValue) * 170));
                                const femaleHeight = Math.max(8, Math.round((item.female / maxValue) * 170));

                                return (
                                    <div className="gender-city-col" key={item.city}>
                                        <div className="gender-city-lines">
                                            <div className="line-wrap">
                                                <div className="line line-male" style={{ height: `${maleHeight}px` }} />
                                                <span className="line-value">{item.male}</span>
                                            </div>
                                            <div className="line-wrap">
                                                <div className="line line-female" style={{ height: `${femaleHeight}px` }} />
                                                <span className="line-value">{item.female}</span>
                                            </div>
                                        </div>
                                        <div className="gender-city-name">{item.city}</div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLocation = () => (
        <div className="row g-4">
            <div className="col-md-4">
                <div className="card analytics-card h-100">
                    <h6 className="metric-title mb-3">Geographic Reach</h6>
                    <button
                        className={`btn w-100 text-start analytics-chip mb-2 ${mapCountry === "Global Reach" ? 'is-active' : ''}`}
                        onClick={() => setMapCountry("Global Reach")}
                    >
                        <span>Global Reach</span>
                        <strong>{metrics.topCountries.length}</strong>
                    </button>
                    {metrics.topCountries.map(([country, count]) => (
                        <button
                            key={country}
                            className={`btn w-100 text-start analytics-chip mb-2 ${mapCountry === country ? 'is-active' : ''}`}
                            onClick={() => setMapCountry(country)}
                        >
                            <span>{country}</span>
                            <strong>{count}</strong>
                        </button>
                    ))}
                    <div className="map-highlight-list mt-3">
                        <h6 className="metric-title mb-2">
                            {mapCountry === "Global Reach" ? "Highlighted Regions" : `Highlighted Cities in ${mapCountry}`}
                        </h6>
                        {mapPoints.slice(0, 6).map((point) => (
                            <div key={point.label} className="map-highlight-item">
                                <span className="dot" />
                                <span className="name">{point.label}</span>
                                <strong>{point.count}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card analytics-card location-map-card h-100 p-0 border-0 overflow-hidden">
                    <iframe
                        title="map"
                        srcDoc={mapIframeHtml}
                        className="dark-map-frame"
                        style={{ minHeight: '500px' }}
                    />
                </div>
            </div>
            <div className="col-12">
                <div className="card analytics-card">
                    <h6 className="metric-title mb-3">{locationCityMetrics.title}</h6>
                    <div className="row g-3 location-city-stats">
                        {locationCityMetrics.items.map(([city, count]) => (
                            <div className="col-md-6 col-xl-4" key={city}>
                                <div className="analytics-card city-stat-card">
                                    <div className="metric-head mb-3">
                                        <MetricIcon type="city" />
                                        <h6 className="metric-title city-title">{city}</h6>
                                    </div>
                                    <h3 className="metric-value city-value">{count}</h3>
                                    <p className="city-percent mb-0">
                                        {Math.round((count / (locationCityMetrics.total || 1)) * 100)}% of selected region
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPositions = () => (
        <div className="row g-4">
            <div className="col-12">
                <div className="card analytics-card">
                    <h6 className="metric-title mb-4">Professional Breakdown</h6>
                    <div className="row g-5">
                        {metrics.topTitles.map(([title, count]) => (
                            <div className="col-xl-4 col-md-6" key={title}>
                                <RingMetric
                                    label={title}
                                    value={count}
                                    total={metrics.total}
                                    color="var(--secondary-accent)"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderBoard = () => (
        <div className="row g-4">
            <div className="col-12">
                <div className="card analytics-card">
                    <h6 className="metric-title mb-2">Board Member Church Attendance Progress</h6>
                    <p className="mb-4">Tracking registered vs attended participants for each board-member church.</p>
                    <div className="row g-3">
                        {boardChurchProgress.map((item) => (
                            <div className="col-xl-6" key={item.church}>
                                <div className="board-progress-card">
                                    <div className="board-progress-card__head">
                                        <h5 className="board-progress-card__church">{item.church}</h5>
                                        <span className="board-progress-card__percent">{item.progress}%</span>
                                    </div>
                                    <p className="board-progress-card__members mb-2">{item.members}</p>
                                    <div className="board-progress-card__stats">
                                        <span>Registered: <strong>{item.registered}</strong></span>
                                        <span>Attended: <strong>{item.attended}</strong></span>
                                        <span>Pending: <strong>{item.pending}</strong></span>
                                    </div>
                                    <div className="board-progress-track mt-2">
                                        <div
                                            className="board-progress-fill"
                                            style={{ width: `${item.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) return <div className="text-center mt-5">Loading Analytics...</div>;

    const displayModeLabel = tvMode ? "Exit Display Mode" : "Display Mode";
    const handleDisplayMode = () => navigate(tvMode ? "/staff/analytics" : "/staff/analytics/tv");
    const shareUrl = `${window.location.origin}${window.location.pathname}?tab=${activeTab}${cleanMode ? "&clean=1" : ""}`;

    const handleSharePage = async () => {
        const payload = {
            title: `GenNext Analytics - ${TABS.find((t) => t.key === activeTab)?.label || "Dashboard"}`,
            text: `View this analytics screen: ${TABS.find((t) => t.key === activeTab)?.label || ""}`,
            url: shareUrl,
        };
        if (navigator.share) {
            try {
                await navigator.share(payload);
                return;
            } catch (error: any) {
                if (error?.name === "AbortError") return;
            }
        }
        try {
            await navigator.clipboard.writeText(shareUrl);
            return;
        } catch (_error) {
            window.prompt("Copy this analytics link:", shareUrl);
        }
    };

    const handlePrintPage = () => window.print();

    return (
        <div ref={containerRef} className={`container-fluid staff-analytics-page ${tvMode ? "tv-mode" : ""} ${cleanMode ? "clean-mode" : ""}`}>
            {!cleanMode && (
                <div className="analytics-topbar mb-5">
                    <div className="analytics-topbar__title">
                        <h2>Generation Next <span className="fw-light">Dashboard</span></h2>
                        <p className="text-muted">Live data analysis from GenNext 2026 registration system</p>
                    </div>

                    <div className="analytics-topbar__desktop-controls">
                        <div className="nav nav-pills">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    className={`btn ${activeTab === tab.key ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setActiveTab(tab.key)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={handleDisplayMode}>
                                {displayModeLabel}
                            </button>
                        </div>
                        <div className="analytics-actions">
                            <button className="btn btn-outline-primary" onClick={() => void handleSharePage()}>
                                Share
                            </button>
                            <button className="btn btn-outline-primary" onClick={handlePrintPage}>
                                Print
                            </button>
                        </div>
                    </div>

                    <div className="analytics-topbar__mobile-controls">
                        <button
                            className="btn btn-primary analytics-menu-toggle"
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="analytics-mobile-menu"
                        >
                            {isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                        </button>
                        <div
                            id="analytics-mobile-menu"
                            className={`analytics-mobile-menu ${isMobileMenuOpen ? "is-open" : ""}`}
                        >
                            {TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    className={`btn ${activeTab === tab.key ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => {
                                        setActiveTab(tab.key);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    handleDisplayMode();
                                }}
                            >
                                {displayModeLabel}
                            </button>
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    void handleSharePage();
                                }}
                            >
                                Share
                            </button>
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    handlePrintPage();
                                }}
                            >
                                Print
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="analytics-screen">
                {activeTab === "overview" && renderOverview()}
                {activeTab === "demographics" && renderDemographics()}
                {activeTab === "location" && renderLocation()}
                {activeTab === "positions" && renderPositions()}
                {activeTab === "board" && renderBoard()}
            </div>
        </div>
    );
};

export default StaffAnalyticsPage;
