import React, { useState, useEffect  } from "react";
import { Form, Button, Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom"; // ✅ Using useNavigate instead of useHistory
import axios from "axios";


function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
        const response = await axios.post("http://localhost:5000/login", {
            email: formData.email,
            password: formData.password,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId); // Store userId
    } catch (error) {
        console.error("Login failed", error);
    }
};

useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  if (storedCart) {
      setCart(storedCart); // Restore cart state
  }
}, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // ✅ Use formData
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); 
        navigate("/plantidentification");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
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
        flexDirection: "column", // Stack items vertically
        backgroundImage: `url('https://techround.co.uk/wp-content/uploads/fly-images/99860/annie-spratt-S7viz8JWxwY-unsplash-1-1600x1067.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Navbar - Positioned at the top */}
      <Navbar
        bg="dark"
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

      {/* Centered Sign-In Form */}
      <Container
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          maxWidth: "350px",
          marginTop: "60px", // To push it down from the navbar
        }}
      >
        <Row className="justify-content-center">
          <Col md={12}>
            <h2 className="text-center mb-4">Sign In</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>
              
              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignIn;
