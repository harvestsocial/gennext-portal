import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <section className="error-page" style={{ textAlign: "center" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="error-page__content" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h1 className="error-page__heading mb-3" style={{ fontSize: "3rem" }}>
              Registration Opens Tuesday
            </h1>
            <p className="mb-5 text-white-50" style={{ fontSize: "1.1rem" }}>
              Generation Next 2026 registration opens on <strong>19 May 2026</strong>.<br />
              Mark your calendar and come back then.
            </p>
            {time && (
              <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                {[["Days", time.days], ["Hours", time.hours], ["Minutes", time.minutes], ["Seconds", time.seconds]].map(
                  ([label, val]) => (
                    <div key={label as string} style={{ minWidth: "90px" }}>
                      <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#fff" }}>
                        {pad(val as number)}
                      </div>
                      <div className="text-white-50" style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        {label}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="tm-height-150 tm-height-lg-80"></div>
    </>
  );
};
import bgImage from "/assets/img/bg/error-page-bg-elements.svg";
import { allCountries } from "@/lib/countryList";
import { createPendingRegistration, buildPaynowUrl } from "@/lib/registrationApi";

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
    if (new Date() < REGISTRATION_OPEN_DATE) return <CountdownPage />;

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
            const { id, token } = await createPendingRegistration(formData);
            const paynowUrl = buildPaynowUrl(id, token, formData.firstName, formData.lastName);
            window.location.href = paynowUrl;
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Please try again.";
            setError(`Registration failed: ${msg}`);
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
                                        {submitting ? "Redirecting to Payment..." : "Proceed to Payment — $10"}
                                    </button>
                                </div>

                                <div className="tm-height-20 tm-height-lg-20" />

                                <div className="text-center">
                                    <Link to="/faq" className="text-white-50" style={{ fontSize: "0.95rem", textDecoration: "underline" }}>
                                        Have questions? View FAQs
                                    </Link>
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
