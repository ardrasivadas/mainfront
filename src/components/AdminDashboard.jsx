import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = '/admin-login';
            return;
        }

        axios.get('http://localhost:5000/admin-dashboard', {
            headers: { Authorization: token }
        })
        .then((res) => setMessage(res.data.message))
        .catch(() => window.location.href = '/admin-login');
    }, []);

    return (
        <div>
            <h2>{message}</h2>
            <button onClick={() => { localStorage.removeItem('adminToken'); window.location.href = '/admin-login'; }}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
