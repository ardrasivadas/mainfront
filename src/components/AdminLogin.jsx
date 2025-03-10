import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/admin-login', { username, password });
            localStorage.setItem('adminToken', res.data.token);
            alert('Login successful');
            window.location.href = '/admin-dashboard';
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
