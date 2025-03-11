import React, { useEffect, useState } from "react";
import axios from "axios";

const SignInLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('adminToken');
        
                if (!token) {
                    setError("You are not logged in. Please log in as admin.");
                    setLoading(false);
                    return;
                }
        
                // Fetch user sign-in logs instead of admin logs
                const res = await axios.get("http://localhost:5000/sign-in-logs/users", { headers: { Authorization: `Bearer ${token}` } })
                ;
        
                setLogs(res.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching user logs", error);
                setError("Failed to fetch user logs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        

        fetchLogs();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = "/adminlogin";
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error}</div>
                <button 
                    className="btn btn-primary" 
                    onClick={() => window.location.href = "/adminlogin"}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="container-fluid mt-4">
            <div className="row mb-4">
                <div className="col-md-6">
                    <h2>User Sign-in Details</h2>
                </div>
                <div className="col-md-6 text-md-end">
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            
            {logs.length === 0 ? (
                <div className="alert alert-info">No sign-in logs found.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Login Time</th>
                                <th>IP Address</th>
                                <th>User Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, index) => (
                                <tr key={log._id || index}>
                                    <td>{index + 1}</td>
                                    <td>{log.username}</td>
                                    <td>{new Date(log.loginTime).toLocaleString()}</td>
                                    <td>{log.ipAddress}</td>
                                    <td>
                                        <div style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {log.userAgent || "Not available"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SignInLogs;