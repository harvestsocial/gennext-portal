import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRegistrations, setRegistrationAccess, type RegistrationData } from "@/lib/registrationApi";
import "../index.scss";

interface Registration extends RegistrationData {}

const normalizeGenderStrict = (value?: string) => {
    const g = String(value || "").trim().toLowerCase();
    if (g === "male" || g === "m") return "Male";
    if (g === "female" || g === "f") return "Female";
    return "";
};

const StaffPortalPage: React.FC = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("staffAuthenticated");
        if (!isAuthenticated) {
            navigate("/staff/login");
            return;
        }

        void loadRegistrations(true);

        const intervalId = window.setInterval(() => {
            void loadRegistrations(false);
        }, 10000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [navigate]);

    const loadRegistrations = async (showLoader = false) => {
        try {
            if (showLoader) setLoading(true);
            const data = await getRegistrations();
            setRegistrations(data);
        } catch (error: any) {
            console.error("Error loading registrations:", error);
            alert(`Failed to load registrations: ${error?.message || "Unknown error."}`);
        } finally {
            if (showLoader) setLoading(false);
        }
    };

    const toggleAccess = async (id: string, currentStatus: boolean) => {
        try {
            const nextStatus = !currentStatus;
            await setRegistrationAccess(id, nextStatus);
            setRegistrations((prev) =>
                prev.map((reg) => (reg.id === id ? { ...reg, accessGranted: nextStatus } : reg))
            );
        } catch (error) {
            console.error("Error updating access:", error);
            alert("Failed to update status.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("staffAuthenticated");
        navigate("/staff/login");
    };

    const buildCsvValue = (value: string | boolean | undefined) => {
        const str = String(value ?? "");
        return `"${str.replace(/"/g, '""')}"`;
    };

    const handleExportCsv = () => {
        if (registrations.length === 0) {
            alert("No registrations to export.");
            return;
        }

        const headers = [
            "ID",
            "Title",
            "First Name",
            "Last Name",
            "Gender",
            "Church",
            "City",
            "Country",
            "Phone",
            "Email",
            "Access Granted",
            "Created At",
        ];

        const rows = registrations.map((reg) => [
            reg.id,
            reg.title,
            reg.firstName,
            reg.lastName,
            reg.gender,
            reg.church,
            reg.city,
            reg.country,
            reg.phone,
            reg.email,
            reg.accessGranted ? "Yes" : "No",
            reg.createdAt || "",
        ]);

        const csv = [
            headers.map((h) => buildCsvValue(h)).join(","),
            ...rows.map((row) => row.map((value) => buildCsvValue(value)).join(",")),
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const stamp = new Date().toISOString().slice(0, 10);
        link.href = url;
        link.download = `gennext-registrations-${stamp}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSearch = () => {
        setSearchTerm(searchInput.trim().toLowerCase());
    };

    const filteredRegistrations = registrations.filter((reg) => {
        if (!searchTerm) return true;
        const haystack = [
            reg.id,
            reg.title,
            reg.firstName,
            reg.lastName,
            normalizeGenderStrict(reg.gender),
            reg.church,
            reg.city,
            reg.country,
            reg.phone,
            reg.email,
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return haystack.includes(searchTerm);
    });

    if (loading) return <div className="text-center mt-5">Loading Portal...</div>;

    return (
        <div className="container-fluid mt-5 px-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>GenNext Staff Portal</h2>
                <div>
                    <button onClick={() => navigate("/staff/analytics")} className="btn btn-dark me-2">Live Analytics</button>
                    <button onClick={handlePrint} className="btn btn-outline-dark me-2">Print Records</button>
                    <button onClick={handleExportCsv} className="btn btn-outline-primary me-2">Export CSV</button>
                    <button onClick={() => void loadRegistrations(false)} className="btn btn-secondary me-2">Refresh Data</button>
                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
            </div>

            <div className="d-flex gap-2 mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by ID, name, church, phone or email"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                />
                <button onClick={handleSearch} className="btn btn-primary">Search</button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Church</th>
                            <th>Location</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRegistrations.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-4">
                                    {registrations.length === 0 ? "No registrations found." : "No matching registrations found."}
                                </td>
                            </tr>
                        ) : (
                            filteredRegistrations.map((reg) => (
                                <tr key={reg.id}>
                                    <td>
                                        <div className="fw-bold">{reg.title} {reg.firstName} {reg.lastName}</div>
                                        <small className="text-muted">{reg.id}</small>
                                    </td>
                                    <td>{normalizeGenderStrict(reg.gender)}</td>
                                    <td>{reg.church}</td>
                                    <td>
                                        <div>{reg.city}</div>
                                        <small className="text-muted">{reg.country}</small>
                                    </td>
                                    <td>
                                        <div>{reg.phone}</div>
                                        <small className="text-muted">{reg.email}</small>
                                    </td>
                                    <td>
                                        <span className={`badge ${reg.accessGranted ? "bg-success" : "bg-warning text-dark"}`}>
                                            {reg.accessGranted ? "Access Granted" : "Pending"}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${reg.accessGranted ? "btn-outline-danger" : "btn-success"}`}
                                            onClick={() => toggleAccess(reg.id, reg.accessGranted)}
                                        >
                                            {reg.accessGranted ? "Revoke" : "Grant Access"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffPortalPage;
