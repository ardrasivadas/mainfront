import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert, Row, Col } from "react-bootstrap";
import DashboardNavbar from "./DashboardNavbar";
import ProfileModal from "./ProfileModal";


const PlantIdentification = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data); // Set user details
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

//   useEffect(() => {
//     console.log("User Data:", user); // Debugging
// }, [user]);

  // Handle Image Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null); // Reset error on new selection
    }
  };

  // Handle API Call
  const handleSubmit = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPrediction(response.data);
    } catch (err) {
      setError("Failed to get a prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Shopping Redirection
  const handleShopNow = () => {
    if (prediction) {
      navigate(`/PlantShop?q=${encodeURIComponent(prediction.plant)}`);
    }
  };
  

  return (
    <>
      <DashboardNavbar />

      <div style={{ backgroundColor: "#f4fafd", minHeight: "100vh", paddingBottom: "50px" }}>
        {/* Header */}
        <div
          style={{
            backgroundColor: "#4CAF50",
            padding: "20px",
            textAlign: "center",
            color: "white",
            fontSize: "32px",
            fontWeight: "bold",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          FloraSnap 🌿 — Identify Your Indoor Plants
        </div>

        {/* Main Content */}
        <Container className="mt-5 d-flex flex-column align-items-center">

          {/* Welcome Message */}
          <div
            style={{
              backgroundColor: "#b2ebf2",
              borderRadius: "15px",
              padding: "15px 30px",
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "30px",
              border: "2px solid #0288D1",
            }}
          >
            {user ? `Welcome ${user.name}!` : "Loading..."}
          </div>

          {/* Quick Stats Section */}
          <Row className="mb-5 w-100 justify-content-center">
          <Col md={4} className="mb-3">
  <Card className="text-center p-4 shadow" style={{ backgroundColor: "#e0f2f1", borderRadius: "1rem" }}>
    <h5>⚡ Quickest ID Time</h5>
    <h2>0.82 seconds</h2>
    <p className="text-muted">This is the fastest response time from FloraSnap, showcasing the app's efficiency and powerful processing speed in identifying plants.</p>
  </Card>
</Col>
<Col md={4} className="mb-3">
  <Card className="text-center p-4 shadow" style={{ backgroundColor: "#ffebee", borderRadius: "1rem" }}>
    <h5>💡 Plant Care Tip</h5>
    <h2>Water Your Plant When the Soil is Dry</h2>
    <p className="text-muted">A simple tip for healthy plants! Over-watering is just as bad as under-watering. Make sure your plant's soil is dry before watering.</p>
  </Card>
</Col>
<Col md={4} className="mb-3">
  <Card className="text-center p-4 shadow" style={{ backgroundColor: "#f1f8e9", borderRadius: "1rem" }}>
    <h5>💡 Top Identified</h5>
    <h2>🌟 Money Plant</h2>
    <p className="text-muted">The Money Plant has been the most identified plant in FloraSnap, demonstrating its popularity and prominence among indoor plants.</p>
  </Card>
</Col>


          </Row>

          {/* Identification Card */}
          <Card className="shadow" style={{ width: "500px", borderRadius: "15px", backgroundColor: "#ffffffdd" }}>
            <Card.Body className="text-center">
              <h2 className="mb-3 text-success">🌿 FloraSnap</h2>
              <h5 className="mb-4">Upload an image to identify your plant</h5>

              {/* Image Preview */}
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="img-thumbnail rounded mb-3"
                  style={{ width: "160px", height: "160px", objectFit: "cover" }}
                />
              ) : (
                <p className="text-muted">No image selected</p>
              )}

              {/* Upload Input */}
              <div className="mb-3">
                <label htmlFor="fileUpload" className="btn btn-outline-success">
                  📷 Choose an Image
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageChange}
                />
              </div>

              {/* Identify Button */}
              <Button
                onClick={handleSubmit}
                disabled={loading}
                variant="success"
                className="w-100"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Identifying...
                  </>
                ) : (
                  "🔍 Identify Plant"
                )}
              </Button>

              {/* Error */}
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

              {/* Result */}
              {prediction && (
                <div className="mt-4 p-3 border rounded bg-light">
                  <h5>Prediction Result:</h5>
                  <p><strong>Plant:</strong> {prediction.plant}</p>
                  <p><strong>Confidence:</strong> {prediction.confidence.toFixed(2)}%</p>
                </div>
              )}

              {/* Shop Now */}
              {prediction && (
                <Button onClick={handleShopNow} variant="primary" className="mt-3">
                  🛒 Buy {prediction.plant}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default PlantIdentification;