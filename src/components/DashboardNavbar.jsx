import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const handleLogout = () => {
  localStorage.removeItem("token"); // Remove authentication token
  window.location.href = "/signin"; // Redirect user to login page
};


const DashboardNavbar = () => {
  return (
    <Navbar expand="lg" className="w-100" style={{
      backgroundColor: '#e8f5e9', // Soft pastel green
      padding: '12px 20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.06)',
      borderBottom: '1px solid #c8e6c9'
    }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#2e7d32' // Deep green for brand
        }}>
          FloraSnap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {[
              { path: "/", label: "Home" },
              { path: "/plantidentification", label: "Plant Identification" },
              { path: "/plantshop", label: "Plants" },
              { path: "/productlist", label: "Products" },
              { path: "/wishlist", label: "Wishlist" },
              { path: "/cart", label: "Cart" },
              { path: "/myorders", label: "Orders" },
            ].map(link => (
              <Nav.Link
                key={link.path}
                as={Link}
                to={link.path}
                style={{ color: '#388e3c', fontWeight: '500', marginRight: '12px' }}
              >
                {link.label}
              </Nav.Link>
            ))}

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#66bb6a",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                marginLeft: '12px',
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#558b2f"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#66bb6a"}
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
