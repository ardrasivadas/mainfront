import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardNavbar from "./DashboardNavbar"; // Importing the Navbar

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <>
      {/* Navbar should be placed here */}
      <DashboardNavbar />
      <div style={{ 
  backgroundColor: "#F5F5F5",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  fontFamily: 'Roboto, sans-serif'
}}>

      <div className="container py-5">
        {/* Header */}
    <div style={{
      backgroundColor: "#4CAF50", // Subtle pastel green
      padding: "25px",
      color: "white",           // Deep green text for contrast
      fontSize: "32px",
      fontWeight: "bold",
      borderRadius: "15px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      Wishlist
    </div>
        <br></br>
        

        {wishlist.length === 0 ? (
          <p className="text-muted text-center">No items in wishlist.</p>
        ) : (
          <div className="row g-4">
            {wishlist.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4">
                <div className="card shadow-sm border-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="card-img-top" 
                    style={{ height: "200px", objectFit: "contain", padding: "10px", backgroundColor: "#f8f9fa" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="text-muted">Price: ${product.price}</p>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="btn btn-danger w-100"
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Wishlist;
