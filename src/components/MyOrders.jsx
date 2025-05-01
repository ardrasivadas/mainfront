import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardNavbar from "./DashboardNavbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!user || !user.email) return;
    axios
      .get(`http://localhost:5000/myorders/${user.email}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [user]);

  useEffect(() => {
    const now = new Date();
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.date);
      if (filter === "weekly") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return orderDate >= oneWeekAgo;
      } else if (filter === "monthly") {
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      } else if (filter === "yearly") {
        return orderDate.getFullYear() === now.getFullYear();
      } else {
        return true;
      }
    });
    setFilteredOrders(filtered);
  }, [orders, filter]);

  const graphData = filteredOrders.map((order) => ({
    date: new Date(order.date).toLocaleDateString(),
    amount: order.totalAmount,
  }));

  return (
  <>
    <DashboardNavbar />
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header Section */}
      <div className="text-center py-4" style={{
        backgroundColor: "#4CAF50",
        color: "white",
        borderRadius: "20px",
        marginBottom: "30px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}>
        <h1 style={{ fontWeight: 'bold' }}>
          FloraSnap 🌿 — Discover, Shop, and Care for Your Indoor Plants
        </h1>
      </div>

      {/* Search + Sort */}
      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        
        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>
      </div>

      {/* Bar Chart Section */}
      <div className="mb-5">
        <h5 className="text-center">📊 Order Amount Trend</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#2C3E50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Order Cards */}
      <div className="container">
        {filteredOrders.length === 0 ? (
          <div className="alert alert-info text-center">
            No orders found for selected range.
          </div>
        ) : (
          <div className="row">
            {filteredOrders.map((order) => (
              <div className="col-md-6 col-lg-4 mb-4" key={order._id}>
                <div className="card h-100 shadow-sm border-0 rounded-4">
                  <div className="card-body">
                    <h5 className="card-title">Order ID: {order._id}</h5>
                    <p className="mb-2">
                      <strong>Total Amount:</strong> ₹{order.totalAmount} <br />
                      <strong>Date:</strong> {new Date(order.date).toLocaleString()} <br />
                    </p>
                    <h6 className="mb-2">📦 Items:</h6>
                    <ul className="list-group list-group-flush">
                      {order.items?.length > 0 ? (
                        order.items.map((item, idx) => (
                          <li key={idx} className="list-group-item">
                            <strong>🛍 {item.name}</strong> <br />
                            <small>Qty: {item.quantity || 1} | ₹{item.price}</small>
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-muted">No items found.</li>
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
