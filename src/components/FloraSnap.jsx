import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FloraSnap = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    const formData = new FormData();
    formData.append("file", selectedFile); 

    try {
      const response = await axios.post(
        "https://plant-identify.onrender.com/predict/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setPrediction(response.data);
    } catch (err) {
      setError("Error identifying the plant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data (POST request)
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      try {
        const response = await fetch("https://plant-identify.onrender.com/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
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
          setUserError(data.message || "Failed to fetch user data");
        }
      } catch (err) {
        setUserError("Something went wrong. Please try again.");
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
      <Container className="d-flex flex-column align-items-center">
        {/* Navigation Links */}
        <div className="d-flex justify-content-end mb-3">
          <Link to="/myorders" className="btn btn-secondary me-2">My Orders</Link>
          <Link to="/productlist" className="btn btn-secondary">Shop</Link>
        </div>

        {/* FloraSnap Card */}
        <Card className="shadow-lg p-4 text-center" style={{ width: "450px", borderRadius: "15px", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
          <Card.Body>
            <h2 className="mb-3" style={{ color: "#28a745" }}>🌿 FloraSnap</h2>
            <h4 className="mb-4">Identify Your Indoor Plants</h4>
            
            {/* User Section */}
            {userError && <Alert variant="danger">{userError}</Alert>}
            {user ? (
              <>
                <Card.Img variant="top" src="https://i.pinimg.com/736x/fb/32/e1/fb32e148281b78dac4b752f12c004836.jpg" className="rounded-circle mb-3" style={{ width: "150px" }} />
                <h5>Welcome, {user.name}!</h5>
                <p className="text-muted">{user.email}</p>
                <Button variant="success" className="mt-3" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Spinner animation="border" variant="success" />
            )}

            {/* Plant Identification Form */}
            <form onSubmit={handleSubmit} className="flex flex-column gap-3 mt-4">
              <input type="file" accept="image/*" onChange={handleFileChange} className="form-control mb-3" />

              <button type="submit" className="btn btn-success w-100" size="sm" disabled={loading}>
                {loading ? "Identifying..." : "Identify Plant"}
              </button>
            </form>

            {/* Error Message */}
            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}

            {/* Prediction Result */}
            {prediction && (
              <div className="mt-4 p-2 border rounded bg-light">
                <h5 className="fw-semibold">Prediction:</h5>
                <p><strong>Plant:</strong> {prediction.name || "Unknown"}</p>
                <p><strong>Description:</strong> {prediction.description || "No description available."}</p>
                <p><strong>Care Tips:</strong> {prediction.care_tips || "No care tips available."}</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default FloraSnap;
