import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     localStorage.removeItem("adminToken");
    //     navigate("/admin-login");
    // };

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Welcome, Admin</h1>
            <div className="mt-4">
                <button className="btn btn-primary mx-2" onClick={() => navigate("/sign-in-logs")}>
                    Manage Users
                </button>
                <button className="btn btn-secondary mx-2" onClick={() => navigate("/adminorders")}>
                    Manage Orders
                </button>
            </div>
            {/* <button className="btn btn-danger mt-4" onClick={handleLogout}>
                Logout
            </button> */}
        </div>
    );
};

export default AdminHome;
