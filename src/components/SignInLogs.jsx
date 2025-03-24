import React, { useEffect, useState } from "react";
import axios from "axios";

const SignInLogs = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("adminToken");

            if (!token) {
                setError("You are not logged in. Please log in as admin.");
                setLoading(false);
                return;
            }

            const res = await axios.get("http://localhost:5000/users", { 
                headers: { Authorization: `Bearer ${token}` } 
            });

            setUsers(res.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError(err.response?.data?.message || "Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveUser = async (userId) => {
        if (!window.confirm("Are you sure you want to remove this user?")) {
            return;
        }

        try {
            const token = localStorage.getItem("adminToken");
            await axios.delete(`http://localhost:5000/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUsers(users.filter(user => user._id !== userId)); // Update UI
            alert("User removed successfully!");
        } catch (err) {
            console.error("Error removing user:", err);
            alert(err.response?.data?.message || "Failed to remove user.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
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
                <button className="btn btn-primary" onClick={() => window.location.href = "/adminlogin"}>
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-4">
                <h2>Registered Users</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>

            {users.length === 0 ? (
                <div className="alert alert-info">No registered users found.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.place}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleRemoveUser(user._id)}>
                                            Remove
                                        </button>
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
