import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plants" element={<PlantPage />} />
        <Route path="/items" element={<ItemPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/bulk-orders" element={<BulkOrderPage />} />
        <Route path="/daily-orders" element={<DailyOrderPage />} />
        <Route path="/import-item" element={<ImportItemPage/>}/>
        <Route path="/supplier" element={<SupplierPage/>} />
        <Route path="/export-item" element={<ExportItemPage/>}/>
        <Route path="/internal-used" element={<InternallyUsedItemPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
