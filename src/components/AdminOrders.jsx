import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";


ChartJS.register(BarElement, CategoryScale, LinearScale);

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/orders");
        const data = await res.json();
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedData);
        setFilteredOrders(sortedData);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.date);
      if (filter === "week" && selectedDate) {
        const startOfWeek = new Date(selectedDate);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return orderDate >= startOfWeek && orderDate <= endOfWeek;
      } else if (filter === "month" && selectedDate) {
        const [year, month] = selectedDate.split("-");
        return (
          orderDate.getMonth() === parseInt(month) - 1 &&
          orderDate.getFullYear() === parseInt(year)
        );
      } else if (filter === "year" && selectedDate) {
        return orderDate.getFullYear() === parseInt(selectedDate);
      }
      return true; // for "all"
    });
    setFilteredOrders(filtered);
  }, [filter, orders, selectedDate]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const calculateTotal = (items) =>
    items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  

  const handlePDFDownload = () => {
    const tableHTML = `
      <html>
        <head>
          <title>Orders Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Orders Report</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${filteredOrders.map(order => `
                <tr>
                  <td>${order._id}</td>
                  <td>${formatDate(order.date)}</td>
                  <td>${order.user?.name || "N/A"}</td>
                  <td>${order.user?.email || "N/A"}</td>
                  <td>${order.user?.contact || "N/A"}</td>
                  <td>₹${order.totalAmount || calculateTotal(order.items)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const barData = {
    labels: filteredOrders.map((o) => formatDate(o.date)),
    datasets: [
      {
        label: "Order Amount (₹)",
        data: filteredOrders.map((o) => o.totalAmount || calculateTotal(o.items)),
        backgroundColor: "#4B9CD3",
      },
    ],
  };

  return (
    <div className="container py-4" style={{ background: "#f0f8ff" }}>
      <h1 className="text-center mb-4">📊 Admin Orders</h1>

      <div className="d-flex flex-wrap justify-content-center align-items-center mb-3">
        <select
          className="form-select w-auto mx-2"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setSelectedDate("");
          }}
        >
          <option value="all">All</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>

        
        <button className="btn btn-danger mx-2" onClick={handlePDFDownload}>
          🧾 Download PDF
        </button>
        <button className="btn btn-dark mx-2" onClick={() => navigate("/adminhome")}>
          Back
        </button>
      </div>

      {(filter === "week" || filter === "month" || filter === "year") && (
        <div className="d-flex justify-content-center mb-3">
          {filter === "week" && (
            <input
              type="date"
              className="form-control w-auto"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          )}
          {filter === "month" && (
            <input
              type="month"
              className="form-control w-auto"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          )}
          {filter === "year" && (
            <input
              type="number"
              className="form-control w-auto"
              placeholder="Enter year (e.g., 2024)"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min="2000"
              max={new Date().getFullYear()}
            />
          )}
        </div>
      )}

      <div className="mb-5">
        <Bar data={barData} height={100} />
      </div>

      <div className="row">
        {filteredOrders.map((order) => (
          <div className="col-md-6 col-lg-4 mb-4" key={order._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🆔 Order ID: {order._id}</h5>
                <p>
                  <strong>Date:</strong> {formatDate(order.date)} <br />
                  <strong>Total:</strong> ₹{order.totalAmount || calculateTotal(order.items)}
                </p>
                <p>
                  <strong>👤 {order.user?.name || "N/A"}</strong> <br />
                  {order.user?.email} <br />
                  📞 {order.user?.contact || "N/A"}
                </p>
                <ul className="list-group list-group-flush">
                  {order.items?.map((item, i) => (
                    <li className="list-group-item" key={i}>
                      🛍 {item.name} | Qty: {item.quantity} | ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
