import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any auth data (if applicable)
        navigate("/"); // Redirect to welcome page
    };

    return (
        <div 
            className="d-flex flex-column align-items-center justify-content-center min-vh-100"
            style={{ backgroundColor: "#F8E8EE", padding: "20px" }}
        >
            {/* Admin Welcome Box */}
            <div 
                className="text-center p-4 rounded shadow-lg"
                style={{
                    backgroundColor: "#B3E5FC", // Light blue box
                    width: "70%",
                    maxWidth: "1000px",
                }}
            >
                <h1 className="mb-3 text-dark">WELCOME, ADMIN</h1>
                <h2 className="text-muted">
                    Manage users, orders, and keep everything running smoothly.
                </h2>
            </div>

            {/* Action Buttons */}
            <div className="mt-4">
                <button className="btn btn-primary mx-2" onClick={() => navigate("/sign-in-logs")}>
                    Manage Users
                </button>
                <button className="btn btn-secondary mx-2" onClick={() => navigate("/adminorders")}>
                    Manage Orders
                </button>
            </div>

            {/* Logout and Welcome Page Buttons */}
            <div className="mt-4">
                <button className="btn btn-danger mx-2" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminHome;
