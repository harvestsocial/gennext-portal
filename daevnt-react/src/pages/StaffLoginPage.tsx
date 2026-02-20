import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.scss"; // Ensure styles are available

import logo from "/assets/img/icon/logo.svg";

const StaffLoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "gennnxt2025" && password === "delineatingthefuture") {
            // successful login
            sessionStorage.setItem("staffAuthenticated", "true");
            localStorage.removeItem("staffAuthenticated");
            navigate("/staff/portal");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="text-center mb-4">
                    <img src={logo} alt="Generation Next" style={{ maxWidth: "200px" }} />
                </div>
                <h2 className="text-center mb-4">Staff Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StaffLoginPage;
