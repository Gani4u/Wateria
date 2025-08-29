import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import apiClient from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await apiClient.post("/api/auth/logout", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  return (
    <div className="dashboard-container">
      {/* Logout in top-right */}
      <div style={{ textAlign: "right" }}>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <h1>Wateria Dashboard</h1>

      <div className="card-grid">
        <Link to="/plants" className="dashboard-card">
          <h2>🌿 Manage Plants</h2>
          <p>View and manage plant details</p>
        </Link>
        <Link to="/items" className="dashboard-card">
          <h2>🧴 Manage Items</h2>
          <p>View and manage item details</p>
        </Link>
        <Link to="/customers" className="dashboard-card">
          <h2>👤 Manage Customers</h2>
          <p>View and manage customer details</p>
        </Link>
        <Link to="/bulk-orders" className="dashboard-card">
          <h2>📦 Manage Bulk Orders</h2>
          <p>Track and manage bulk orders</p>
        </Link>
        <Link to="/daily-orders" className="dashboard-card">
          <h2>📦 Manage Daily Orders</h2>
          <p>Track and manage daily orders</p>
        </Link>
        <Link to="/import-item" className="dashboard-card">
          <h2>📥 Manage Your Inward</h2>
          <p>Track and manage your Inward</p>
        </Link>
        <Link to="/supplier" className="dashboard-card">
          <h2>👷 Manage Your Suppliers</h2>
          <p>Track and manage your Suppliers</p>
        </Link>
        <Link to="/export-item" className="dashboard-card">
          <h2>📤 Manage Your Outward</h2>
          <p>Track and manage your Outward</p>
        </Link>
        <Link to="/internal-used" className="dashboard-card">
          <h2>📋 Manage Your Internal Used Items</h2>
          <p>Track and manage your Internals</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
