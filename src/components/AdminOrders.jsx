import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/orders");

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        let data = await response.json();
        console.log("Orders received:", data);

        // Sort orders by date in descending order (latest first)
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTotal = (items) => {
    if (!items || !items.length) return 0;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ 
      backgroundColor: "#E6E6FA",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "1200px",
        width: "100%",
        padding: "20px",
        backgroundColor: "#F0F8FF",
        minHeight: "100vh",
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>🛒 Orders</h1>
        <button
          onClick={handlePrint}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🖨 Print Report
        </button>

        <center>
          <button className="btn btn-secondary mx-2" onClick={() => navigate("/adminhome")}>
            Back
          </button>
        </center>
        <br />

        {loading ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>Loading orders...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red", fontSize: "18px" }}>{error}</p>
        ) : orders.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>No orders found.</p>
        ) : (
          <div id="printable-area" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "20px"
          }}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "#fff",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h3 style={{ color: "#333", marginBottom: "10px" }}>
                  🆔 Order ID: <span style={{ fontWeight: "normal" }}>{order._id}</span>
                </h3>
                <p style={{ fontSize: "16px", color: "#555", marginBottom: "10px" }}>
                  📅 <strong>Order Date:</strong> {formatDate(order.date)}
                </p>
                <div style={{ marginBottom: "10px", fontSize: "16px" }}>
                  <h4 style={{ margin: "10px 0", color: "#007BFF" }}>👤 Customer Details:</h4>
                  <p><strong>Name:</strong> {order.user?.name || "Unknown"}</p>
                  <p><strong>Email:</strong> {order.user?.email || "N/A"}</p>
                  <p><strong>Contact:</strong> {order.user?.contact || "N/A"}</p>
                </div>
                <h4 style={{ margin: "10px 0", color: "#28A745" }}>📦 Ordered Items:</h4>
                <ul style={{ listStyleType: "none", padding: "0" }}>
                  {order.items?.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        background: "#F8F9FA",
                        padding: "10px",
                        marginBottom: "8px",
                        borderRadius: "6px",
                      }}
                    >
                      <p><strong>🛍 Product:</strong> {item.name}</p>
                      <p><strong>🔢 Quantity:</strong> {item.quantity}</p>
                      <p><strong>💰 Price:</strong> ₹{item.price}</p>
                    </li>
                  ))}
                </ul>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#DC3545",
                    marginTop: "15px",
                  }}
                >
                  💵 Total Amount: ₹{order.totalAmount || calculateTotal(order.items)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
