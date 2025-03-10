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

      <div className="container py-5">
        <h2 className="fw-bold text-light text-center py-3" 
            style={{ backgroundColor: "#2C3E50", borderRadius: "8px" }}>
          Your Wishlist
        </h2>
        
        <div className="d-flex justify-content-end mb-4">
          <Link to="/productlist" className="btn btn-secondary">
            Back to Shop
          </Link>
        </div>

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
    </>
  );
};

export default Wishlist;
