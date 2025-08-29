import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import PlantPage from "./pages/PlantPage";
import ItemPage from "./pages/ItemPage";
import CustomerPage from "./pages/CustomerPage";
import BulkOrderPage from "./pages/BulkOrder";
import DailyOrderPage from "./pages/DailyOrderPage";
import ImportItemPage from "./pages/ImportItemPage";
import SupplierPage from "./pages/SupplierPage";
import ExportItemPage from "./pages/ExportItemPage";
import InternallyUsedItemPage from "./pages/InternallyUsedItemPage";
import Login from "./components/Login";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/plants" element={<PrivateRoute><PlantPage /></PrivateRoute>} />
        <Route path="/items" element={<PrivateRoute><ItemPage /></PrivateRoute>} />
        <Route path="/customers" element={<PrivateRoute><CustomerPage /></PrivateRoute>} />
        <Route path="/bulk-orders" element={<PrivateRoute><BulkOrderPage /></PrivateRoute>} />
        <Route path="/daily-orders" element={<PrivateRoute><DailyOrderPage /></PrivateRoute>} />
        <Route path="/import-item" element={<PrivateRoute><ImportItemPage /></PrivateRoute>} />
        <Route path="/supplier" element={<PrivateRoute><SupplierPage /></PrivateRoute>} />
        <Route path="/export-item" element={<PrivateRoute><ExportItemPage /></PrivateRoute>} />
        <Route path="/internal-used" element={<PrivateRoute><InternallyUsedItemPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
