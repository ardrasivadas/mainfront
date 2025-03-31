import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
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
    <DashboardNavbar /> {/* Move inside the fragment or div */}
    
    {/* Welcome Heading at the Top */}
    <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FAE1DD", // Pink Background
      padding: "20px",
    }}
  >
      {/* GIFs and Content in a Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
>
  <div
    style={{
      width: "400px", // Set desired width
      height: "400px", // Set desired height
      backgroundImage: "url('https://media1.tenor.com/m/2I6zLMb4iLwAAAAC/cute-after-effects.gif')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      
    }}
  ></div>
  
  
    
      
      <Container className="d-flex flex-column align-items-center">
        {/* Card Container */}
       {/* Heading at the Top */}
       <div
      style={{
        backgroundColor: "#B3E5FC", // Green Background
        padding: "15px",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
        borderRadius: "10px",
        width: "75%",
        marginBottom: "20px",
        border: "2px solid black", 
      }}
    >
    {user ? `Welcome ${user.name}!` : "Loading..."}
  </div>

  

        <Card className="shadow-lg p-4 text-center" style={{ width: "450px", borderRadius: "15px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
          <Card.Body>
            <h2 className="mb-3" style={{ color: "#28a745" }}>🌿 FloraSnap</h2>
            <h4 className="mb-4">Identify Your Indoor Plants</h4>

            {/* Image Preview */}
            {preview ? (
              <div className="text-center mb-3">
                <img src={preview} alt="Preview" className="img-thumbnail rounded" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
              </div>
            ) : (
              <p className="text-muted">No image selected</p>
            )}

            {/* Image Upload Button */}
            <div className="mb-3">
              <label htmlFor="fileUpload" className="btn btn-outline-success">
                Choose an Image
              </label>
              <input id="fileUpload" type="file" accept="image/*" className="d-none" onChange={handleImageChange} />
            </div>

            {/* Identify Button */}
            <Button onClick={handleSubmit} disabled={loading} variant="success" className="w-100">
              {loading ? <><Spinner animation="border" size="sm" /> Identifying...</> : "Identify Plant"}
            </Button>

            {/* Error Message */}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {/* Prediction Result */}
            {prediction && (
              <div className="mt-4 p-3 border rounded bg-light">
                <h5 className="fw-semibold">Prediction Result:</h5>
                <p><strong>Plant:</strong> {prediction.plant}</p>
                <p><strong>Confidence:</strong> {prediction.confidence.toFixed(2)}%</p>
              </div>
            )}

          </Card.Body>
        </Card>

         

        {prediction && (
  <Button onClick={handleShopNow} variant="success" className="mt-3 px-3 py-2" style={{ fontSize: "14px", width: "auto" }}>
  🛒 Buy {prediction.plant}
</Button>
)}
      </Container>

      {/* Right GIF */}
      <div
        style={{
          width: "400px",
          height: "400px",
          backgroundImage: "url('https://media1.tenor.com/m/2I6zLMb4iLwAAAAC/cute-after-effects.gif')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      
  </div>
    </div>
    

    </>
  );
};

export default PlantIdentification;
