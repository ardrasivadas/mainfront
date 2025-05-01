import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart(); // Ensure clearCart is available
  const navigate = useNavigate();

  // Fetch user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Calculate total amount
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to proceed with checkout.");
      return;
    }
  
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/place-order", {
        email: user.email, // Fetch orders using email
        items: cart,
        totalAmount,
        date: new Date(),
      });
  
      if (response.status === 201) {
        clearCart(); // This will now clear both state and localStorage
        alert("Order placed successfully!");
        navigate("/checkout"); // Redirect to My Orders page
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Try again later.");
    }
  };
  

  return (
    <>
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
      Shopping Cart
    </div>

          <br></br>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div>
            <div className="row">
              {cart.map((item) => (
                <div key={item.id} className="col-md-4 mb-4">
                  <div className="card">
                    <img src={item.image} className="card-img-top" alt={item.name} style={{ height: "200px", objectFit: "contain" }} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p>Price: ${item.price}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn btn-sm btn-outline-secondary">-</button>
                          <span className="mx-2">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn btn-sm btn-outline-secondary">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="btn btn-danger btn-sm">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Display Total Amount & Checkout Button */}
            <div className="text-center mt-4">
              <h4>Total Amount: <span className="text-success">${totalAmount.toFixed(2)}</span></h4>
              <button onClick={handleCheckout} className="btn btn-success">Proceed to Checkout</button>
              <button onClick={() => navigate("/myorders")} className="btn btn-primary ms-2">View Orders</button>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Cart;
