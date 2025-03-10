import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


  );
};

export default DashboardNavbar;
