import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Navbar, Nav, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url('https://cdn.monstera-app.com/p/f4dd4b2795dae990faa365ba3e04c4131e4cd862ef8d10a561a2f341e3501cd1.jpg/small-indoor-plants.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Navbar - Positioned at the top */}
      <Navbar
        bg="success"
        variant="dark"
        expand="lg"
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
        }}
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

      {/* Centered Sign-Up Form */}
      <Container
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          maxWidth: "400px",
          marginTop: "60px", // To avoid overlap with the navbar
        }}
      >
        <h2 className="text-center mb-3">Sign Up</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Row className="justify-content-center">
          <Col md={12}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" pattern="[0-9]{10}" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Place</Form.Label>
                <Form.Control type="text" name="place" value={formData.place} onChange={handleChange} placeholder="Enter your place" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
