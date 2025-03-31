import React from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      backgroundColor: "#FAE1DD           ",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        className="p-4 rounded shadow-lg text-center bg-white"
        style={{ width: "400px" }}
      >
        <h1 className="mb-4 text-primary">Scan to Pay</h1>
        <QRCodeCanvas
          value="upi://pay?pa=your_upi_id@upi&pn=YourName&am=100&cu=INR"
          size={250}
        />
        <h3 className="mt-3 text-success">Delivery within 4 days</h3>

        {/* Back to Cart Button */}
        <button
          className="btn btn-dark mt-4"
          onClick={() => navigate("/cart")}
        >
          Back to Cart
        </button>
      </div>
    </div>
    </div>
  );
};

export default Checkout;
