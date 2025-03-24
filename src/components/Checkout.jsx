import React from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1>Scan to Pay</h1>
      <div className="d-flex flex-column align-items-center">
        <QRCodeCanvas value="upi://pay?pa=your_upi_id@upi&pn=YourName&am=100&cu=INR" size={250} />
        <h3>Delivery within 4 days</h3>
        
        {/* Back to Cart Button */}
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/cart")}>
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Checkout;
