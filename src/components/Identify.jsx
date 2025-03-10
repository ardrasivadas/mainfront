import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Identify() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/signin");
          return;
        }
        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message || "Failed to fetch user data");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    
    <div
      style={{
        backgroundImage: "url('https://www.pixelstalk.net/wp-content/uploads/images6/Aesthetic-Wallpaper-For-Laptop-Wallpaper-High-Quality.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="d-flex justify-content-end mb-4">
              <Link to="/myorders" className="btn btn-secondary">
                my orders
              </Link>
              <Link to="/productlist" className="btn btn-secondary">
                shop
              </Link>
            </div>
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="shadow-lg p-4 text-center" style={{ width: "400px", borderRadius: "15px", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
          <Card.Body>
            <h2 className="mb-3" style={{ color: "#28a745" }}>🌿 FloraSnap</h2>
            <h4 className="mb-4">Identify Your Indoor Plants</h4>
            {error && <Alert variant="danger">{error}</Alert>}
            {user ? (
              <>
                <Card.Img variant="top" src="https://i.pinimg.com/736x/fb/32/e1/fb32e148281b78dac4b752f12c004836.jpg" className="rounded-circle mb-3" />
                <h5>Welcome, {user.name}!</h5>
                <p className="text-muted">{user.email}</p>
                <Button variant="success" className="mt-3 w-100" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Spinner animation="border" variant="success" />
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Identify;
