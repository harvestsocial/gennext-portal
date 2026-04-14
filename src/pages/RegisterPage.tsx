import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "/assets/img/bg/error-page-bg-elements.svg";
import { allCountries } from "@/lib/countryList";
import { createRegistration } from "@/lib/registrationApi";

const REGISTRATION_OPEN_DATE = new Date("2026-05-01T00:00:00");

function getTimeRemaining() {
    const now = new Date();
    const diff = REGISTRATION_OPEN_DATE.getTime() - now.getTime();
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
}

const CountdownPage: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = getTimeRemaining();
            setTimeLeft(remaining);
            if (!remaining) clearInterval(timer);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const pad = (n: number) => String(n).padStart(2, "0");

    return (
        <>
            <div className="tm-height-150 tm-height-lg-80"></div>
            <section className="error-page">
                <img
                    src={bgImage}
                    alt="Background elements"
                    className="error-page__bg-img"
                    style={{ zIndex: 0 }}
                />
                <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                    <div className="error-page__content" style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <h1
                            className="error-page__heading mb-3"
                            style={{ fontSize: "2.8rem", letterSpacing: "0.02em" }}
                        >
                            Registration Opening Soon
                        </h1>
                        <p className="mb-5 text-white-50" style={{ fontSize: "1.15rem" }}>
                            Registration for Generation Next opens on <strong style={{ color: "#fff" }}>1st May 2025</strong>. Check back then!
                        </p>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "1.5rem",
                                flexWrap: "wrap",
                                marginBottom: "3rem",
                            }}
                        >
                            {timeLeft ? (
                                [
                                    { label: "Days", value: timeLeft.days },
                                    { label: "Hours", value: pad(timeLeft.hours) },
                                    { label: "Minutes", value: pad(timeLeft.minutes) },
                                    { label: "Seconds", value: pad(timeLeft.seconds) },
                                ].map(({ label, value }) => (
                                    <div
                                        key={label}
                                        style={{
                                            background: "rgba(255,255,255,0.08)",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            borderRadius: "12px",
                                            padding: "1.5rem 2rem",
                                            minWidth: "120px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "3.5rem",
                                                fontWeight: 700,
                                                lineHeight: 1,
                                                color: "#fff",
                                                fontVariantNumeric: "tabular-nums",
                                            }}
                                        >
                                            {value}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "0.85rem",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.12em",
                                                color: "rgba(255,255,255,0.5)",
                                                marginTop: "0.5rem",
                                            }}
                                        >
                                            {label}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white" style={{ fontSize: "1.3rem" }}>
                                    Registration is now open!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="tm-height-150 tm-height-lg-80"></div>
            </section>
        </>
    );
};

const titles = [
    "Bishop",
    "Apostle",
    "Prophet",
    "Prophetess",
    "Overseer",
    "Snr Reverend",
    "Reverend",
    "Snr. Pastor",
    "Pastor",
    "Evangelist",
    "Minister",
    "Shephered",
    "Doctor",
    "Congregant",
];

// Sort in reverse alphabetical order
const countries = allCountries
    .sort((a, b) => a.name.localeCompare(b.name));

const knownCityToCountry: Record<string, string> = {
    harare: "Zimbabwe",
    bulawayo: "Zimbabwe",
    chitungwiza: "Zimbabwe",
    mutare: "Zimbabwe",
    gweru: "Zimbabwe",
    kadoma: "Zimbabwe",
    johannesburg: "South Africa",
    pretoria: "South Africa",
    "cape town": "South Africa",
    durban: "South Africa",
    lusaka: "Zambia",
    ndola: "Zambia",
    kitwe: "Zambia",
    lilongwe: "Malawi",
    blantyre: "Malawi",
    gaborone: "Botswana",
    francistown: "Botswana",
    maputo: "Mozambique",
    beira: "Mozambique",
    nairobi: "Kenya",
    kampala: "Uganda",
    kigali: "Rwanda",
    "dar es salaam": "Tanzania",
    london: "United Kingdom",
    "new york": "United States",
};

const normalizeCity = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .replace(/\./g, "")
        .replace(/\s+/g, " ");

interface FormData {
    firstName: string;
    lastName: string;
    gender: string;
    title: string;
    church: string;
    city: string;
    country: string;
    phone: string;
    email: string;
}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        gender: "",
        title: "",
        church: "",
        city: "",
        country: "",
        phone: "",
        email: "",
    });

    if (new Date() < REGISTRATION_OPEN_DATE) {
        return <CountdownPage />;
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "country") {
            const selectedCountry = countries.find((c) => c.name === value);
            setFormData((prev) => ({
                ...prev,
                country: value,
                phone: selectedCountry ? selectedCountry.code : prev.phone,
            }));
        } else if (name === "city") {
            const normalizedCity = normalizeCity(value);
            const detectedCountryName = knownCityToCountry[normalizedCity];
            const detectedCountry = detectedCountryName
                ? countries.find((c) => c.name.toLowerCase() === detectedCountryName.toLowerCase())
                : null;

            setFormData((prev) => ({
                ...prev,
                city: value,
                country: detectedCountry ? detectedCountry.name : prev.country,
                phone:
                    detectedCountry && !prev.phone.trim()
                        ? detectedCountry.code
                        : prev.phone,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            console.log("Submitting registration...", formData);
            const id = await createRegistration(formData);

            console.log("Registration created with ID: ", id);
            navigate(`/confirmation?id=${id}`);
        } catch (e: any) {
            console.error("Error adding document: ", e);
            setError(`Registration failed: ${e.message || "Please try again."}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="tm-height-150 tm-height-lg-80"></div>
            <section className="error-page">
                <img
                    src={bgImage}
                    alt="Background elements"
                    className="error-page__bg-img"
                    style={{ zIndex: 0 }}
                />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="error-page__content" style={{ maxWidth: "900px" }}>
                        <h1 className="error-page__heading mb-3" style={{ fontSize: "3.5rem" }}>Register Here</h1>
                        <p className="mb-5 text-white-50" style={{ fontSize: "1.2rem" }}> Join us for Generation Next. Fill in your details below.</p>

                        <div className="contact-form">
                            <form onSubmit={handleSubmit}>
                                <div className="form-inputs">
                                    <div className="type_1">
                                        <select
                                            className="csame"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>Select Title *</option>
                                            {titles.map((title) => (
                                                <option key={title} value={title}>
                                                    {title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="type_1">
                                        <select
                                            className="csame"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>Select Gender *</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-inputs">
                                    <div className="type_1">
                                        <input
                                            type="text"
                                            className="csame"
                                            placeholder="Enter Your First name..."
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="type_1">
                                        <input
                                            type="text"
                                            className="csame"
                                            placeholder="Enter Your Last name..."
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-inputs">
                                    <div className="type_1">
                                        <input
                                            type="email"
                                            className="csame"
                                            placeholder="Enter Your Email..."
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="type_1">
                                        <input
                                            type="tel"
                                            className="csame"
                                            placeholder="Enter Your Phone Number..."
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-inputs">
                                    <div className="type_1">
                                        <input
                                            type="text"
                                            className="csame"
                                            placeholder="Church/Organization *"
                                            name="church"
                                            value={formData.church}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="type_1">
                                        <input
                                            type="text"
                                            className="csame"
                                            placeholder="City *"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-inputs">
                                    <div className="type_1">
                                        <select
                                            className="csame"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>Select Country *</option>
                                            {countries.map((country) => (
                                                <option key={country.name} value={country.name}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {error && (
                                    <div className="form-inputs">
                                        <div className="type_1">
                                            <p className="error-msg text-danger mb-0">{error}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="tm-height-40 tm-height-lg-40" />

                                <div>
                                    <button type="submit" className="primary__btn style2 w-100" disabled={submitting}>
                                        {submitting ? "Processing..." : "Submit Registration"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="tm-height-150 tm-height-lg-80"></div>
            </section>
        </>
    );
};

export default RegisterPage;
