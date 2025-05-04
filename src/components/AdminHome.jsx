import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#e9f0f4", minHeight: "100vh", padding: "30px" }}>
      {/* FloraSnap Brand Header */}
      <div
        className="text-center mb-4 py-3 rounded shadow-sm"
        style={{
          backgroundColor: "#0288d1",
          color: "white",
          fontFamily: "Georgia, serif",
          letterSpacing: "1px",
        }}
      >
        <h1 className="m-0 fw-bold">FloraSnap</h1>
        <p className="m-0" style={{ fontSize: "14px" }}>Blossom your business with seamless admin control</p>
      </div>

      {/* Admin Header */}
      <div
        className="d-flex justify-content-between align-items-center p-4 rounded shadow-sm mb-4"
        style={{
          background: "linear-gradient(to right, #e0f7fa, #ffffff)",
          borderLeft: "5px solid #0288d1",
        }}
      >
        <div className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin Avatar"
            style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "15px" }}
          />
          <div>
            <h2 className="mb-1 fw-bold text-dark">Admin Dashboard</h2>
            <p className="mb-0 text-secondary">Monitor system and manage operations efficiently</p>
            <small className="text-muted">Welcome back, Admin! You can manage users and orders.</small>
          </div>
        </div>
        <button
          className="btn btn-outline-danger fw-semibold px-4 py-2 rounded-pill"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Stat Cards */}
      <div className="row mb-4">
  <div className="col-md-4">
    <div
      className="p-4 rounded text-white shadow-sm"
      style={{
        backgroundColor: "#1e88e5",
        transition: "transform 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    >
      <h5>Total Users</h5>
      <p className="fs-4">154</p>
      <p className="mb-0 small">Stay updated on the number of registered users in the system.</p>
    </div>
  </div>

  <div className="col-md-4">
    <div
      className="p-4 rounded text-white shadow-sm"
      style={{
        backgroundColor: "#2e7d32",
        transition: "transform 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    >
      <h5>Orders Processed</h5>
      <p className="fs-4">138</p>
      <p className="mb-0 small">Track all orders.</p>
    </div>
  </div>
</div>


      {/* Quick Actions */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="mb-3 fw-semibold">⚡ Quick Actions</h4>
        <p className="text-muted mb-4">
          Use these shortcuts to quickly navigate to user and order management sections.
          Make sure to regularly review sign-in logs and process pending orders.
        </p>
        <div className="d-flex flex-wrap gap-3">
          <button
            className="btn btn-primary px-4 py-2"
            onClick={() => navigate("/sign-in-logs")}
          >
            <i className="bi bi-person-lines-fill me-2"></i> Manage Users
          </button>
          <button
            className="btn btn-secondary px-4 py-2"
            onClick={() => navigate("/adminorders")}
          >
            <i className="bi bi-cart-check me-2"></i> Manage Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
