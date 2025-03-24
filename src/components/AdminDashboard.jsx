import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin-login');
            return;
        }

        axios.get('http://localhost:5000/admin-dashboard', {
            headers: { Authorization: token }
        })
        .then((res) => setMessage(res.data.message))
        .catch(() => navigate('/admin-login'));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
    };

    return (
        <div className="container text-center mt-5">
            <h2>{message}</h2>
            <div className="mt-4">
                <button className="btn btn-primary mx-2" onClick={() => navigate('/manage-users')}>Manage Users</button>
                <button className="btn btn-secondary mx-2" onClick={() => navigate('/manage-orders')}>Manage Orders</button>
            </div>
            <button className="btn btn-danger mt-4" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
