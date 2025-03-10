import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarStyle = {
    background: "rgba(255, 255, 255, 0.1)", // Glass effect
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)", // For Safari
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    padding: "10px 20px",
    position: "fixed",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%",
    zIndex: "1000",
  };

  const brandStyle = {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#1e5631", // Green shade
    fontFamily: "Poppins, sans-serif",
    transition: "transform 0.2s ease-in-out",
  };

  const linkStyle = {
    fontSize: "1.2rem",
    fontWeight: "500",
    color: "white",
    padding: "8px 15px",
    borderRadius: "8px",
    transition: "all 0.3s ease-in-out",
    textDecoration: "none",
    margin: "0 10px",
  };

  const linkHoverStyle = {
    background: "rgba(255, 255, 255, 0.3)",
    color: "white",
    transform: "translateY(-2px)",
  };

  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={brandStyle}>
          🌿 FloraSnap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              style={linkStyle} 
              onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)} 
              onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
            >
              Welcome
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/plantshop" 
              style={linkStyle} 
              onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)} 
              onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
            >
              Plant Shop
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar;
