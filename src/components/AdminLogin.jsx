import React, { useState } from "react";
import axios from "axios";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [redirecting, setRedirecting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/adminlogin", {
                username,
                password,
            });
            localStorage.setItem("adminToken", res.data.token);
            setRedirecting(true);
            
            setTimeout(() => {
                window.location.href = "/adminhome";
            }, 1500); // 1.5-second delay before redirection
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: "url('https://techround.co.uk/wp-content/uploads/fly-images/99860/annie-spratt-S7viz8JWxwY-unsplash-1-1600x1067.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >

            {/* Navbar - Positioned at the top */}
            <Navbar
                bg="dark"
                variant="dark"
                expand="lg"
                style={{ position: "absolute", top: 0, width: "100%" }}
            >
                <Container>
                    <Navbar.Brand as={Link} to="/">FloraSnap 🌿</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                        <Nav.Link as={Link} to="/adminlogin">Admin</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div
                className="card shadow-lg p-4 text-white"
                style={{
                    width: "350px",
                    background: "rgba(0, 0, 0, 0.7)", 
                    borderRadius: "15px",
                    backdropFilter: "blur(10px)", 
                }}
            >
                <h3 className="text-center mb-3">Admin Login</h3>
                {redirecting ? (
                    <p className="text-info text-center">Redirecting...</p>
                ) : (
                    error && <p className="text-danger text-center">{error}</p>
                )}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={redirecting}>
                        {redirecting ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
