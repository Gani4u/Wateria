import { Link } from "react-router-dom";
import "./Dashboard.css"; // Optional custom styling

function Dashboard() {
  return (
    <div className="dashboard-container">
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
