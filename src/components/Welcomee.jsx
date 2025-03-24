import React from "react";
import { Container, Button, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Welcome = () => {
  // Background style
  const backgroundStyle = {
    backgroundImage: `url(https://img.freepik.com/premium-photo/small-succulent-plants-pots_641503-379441.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Moves content to the top
    alignItems: "center",
    color: "white",
    textAlign: "center",
    paddingTop: "100px", // Adds space from the top
    padding: "20px",
  };

  return (
    <>
      {/* Navbar */}
      {/* <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">FloraSnap 🌿</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/adminlogin">ADMIN</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}

      {/* Welcome Section with Background */}
      <div style={backgroundStyle}>
        <Container style={{ background: "rgba(0, 0, 0, 0.6)", padding: "30px", borderRadius: "10px", marginTop: "50px" }}>
          <h1 className="mb-3">Welcome to FloraSnap 🌿</h1>
          <p style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
            <strong>FloraSnap</strong> helps you <strong>identify indoor plants instantly</strong>,
            provides <strong>detailed care tips</strong>, and lets you 
            <strong> purchase plants and decorations with ease</strong>.
          </p>
          <div className="mt-4">
            <Link to="/signin">
              <Button variant="light" className="m-2">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" className="m-2">Sign Up</Button>
            </Link>
            <Link to="/adminlogin">
              <Button variant="success" className="m-2">ADMIN</Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Welcome;
