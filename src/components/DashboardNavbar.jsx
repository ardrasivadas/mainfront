import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const handleLogout = () => {
  localStorage.removeItem("token"); // Remove authentication token
  window.location.href = "/signin"; // Redirect user to login page
};


const DashboardNavbar = () => {
  return (
    <Navbar style={{ backgroundColor: "#333333" }} variant="dark" expand="lg" className="w-100">







  <Container fluid>
    <Navbar.Brand as={Link} to="/">FloraSnap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/plantidentification">Plant Identification</Nav.Link>
        <Nav.Link as={Link} to="/plantshop">Plants</Nav.Link>
        <Nav.Link as={Link} to="/productlist">Products</Nav.Link>
        <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>
        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
        <Nav.Link as={Link} to="/myorders">Orders</Nav.Link>
        {/* Logout Button */}
        <button
            onClick={handleLogout} // Add your logout function here
            style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
            }}
        >
            Logout
        </button>
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


  );
};

export default DashboardNavbar;
