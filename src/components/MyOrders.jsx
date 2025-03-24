import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardNavbar from "./DashboardNavbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email) {
          setUser(parsedUser);
        } else {
          console.warn("⚠️ User data found but missing email.");
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    } else {
      console.warn("⚠️ No user found in localStorage.");
    }
  }, []);

  useEffect(() => {
    if (!user || !user.email) return;

    axios
      .get(`http://localhost:5000/myorders/${user.email}`)
      .then((response) => {
        console.log("Fetched Orders:", JSON.stringify(response.data, null, 2));
        setOrders(response.data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [user]);

  return (
    <>
      <DashboardNavbar />
      <div style={{ 
      backgroundColor: "#FAE1DD           ",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div className="container my-4">
        <h1 className="text-center mb-4">🛒 My Orders</h1>
        {orders.length === 0 ? (
          <div className="alert alert-info text-center">No orders placed yet.</div>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div className="col-md-6 col-lg-4 mb-4" key={order._id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Order ID: {order._id}</h5>
                    <p>
                      <strong>Total Amount:</strong> ₹{order.totalAmount} <br />
                      <strong>Date:</strong> {new Date(order.date).toLocaleString()} <br />
                    </p>
                    <h6>📦 Items:</h6>
                    <ul className="list-group list-group-flush">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <li key={index} className="list-group-item">
                            <strong>🛍 {item.name || "Unnamed Item"}</strong> <br />
                            <small>Quantity: {item.quantity || 1} | Price: ₹{item.price || "N/A"}</small>
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-muted">No items found in this order.</li>
                      )}
                    </ul>
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

export default MyOrders;