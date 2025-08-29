// 📁 src/pages/ItemPage.js
import React, { useEffect, useState } from "react";
import ItemTable from "../components/Item/ItemTable";
import ItemFormModal from "../components/Item/ItemFormModal";
import ConfirmDialog from "../components/Plant/ConfirmDialog";
import ItemStockReportTable from "../components/Item/ItemStockReportTable";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  getItemStockReport,
  getItemStockSummary
} from "../api/ItemApi";
import { Button, Form, Spinner } from "react-bootstrap";

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });
  const [stockReport, setStockReport] = useState([]);
  const [showInsight, setShowInsight] = useState(false);
  const [insightData, setInsightData] = useState({ totalActualCost: 0, totalSalesValue: 0 });


  const PAGE_SIZE = 10;

  useEffect(() => {
    loadItems(0);
    loadStockReport();
  }, []);

  const loadItems = async (currentPage, query = "") => {
    setLoading(true);
    const data = await getAllItems(currentPage, PAGE_SIZE, "id", query);
    if (currentPage === 0) {
      setItems(data.content);
    } else {
      setItems((prev) => [...prev, ...data.content]);
    }
    setHasMore(currentPage + 1 < data.totalPages);
    setLoading(false);
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setPage(0);
    loadItems(0, term);
  };

  const loadStockReport = async () => {
  const data = await getItemStockReport();
  setStockReport(data);
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setOpenModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

 const handleDelete = async () => {
  try {
    await deleteItem(confirmDelete.id);
    setConfirmDelete({ open: false, id: null });
    loadItems(0, searchTerm);
    loadStockReport();
    setPage(0);
  } catch (error) {
    alert(
      error.response?.data || "Cannot delete item — it is linked to import records."
    );
    setConfirmDelete({ open: false, id: null });
  }
};

  const handleSubmit = async (formData) => {
    if (formData.id) {
      await updateItem(formData.id, formData);
    } else {
      await createItem(formData);
    }
    setOpenModal(false);
    loadItems(0, searchTerm);
    loadStockReport(); 
    setPage(0);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadItems(nextPage, searchTerm);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Item Management</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Add Item
        </Button>
      </div>
      <Button variant="info" className="mb-3 float-end" onClick={async () => {
        const data = await getItemStockSummary();
          setInsightData(data);
          setShowInsight(true);
        }}>
            📊 Insight
      </Button>


      <Form.Control
        type="text"
        placeholder="Search by item name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />

       <ItemTable 
         items={items}
        onEdit={handleEdit}
        onDelete={(id) => setConfirmDelete({ open: true, id })} 
      />
      <ItemStockReportTable report={stockReport} />

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {!loading && hasMore && (
        <div className="text-center mt-3">
          <Button variant="outline-primary" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}

      <ItemFormModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        item={selectedItem}
      />

      <ConfirmDialog
        open={confirmDelete.open}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        message="Are you sure you want to delete this item?"
      />

      {showInsight && (
  <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Stock Report Insight</h5>
          <button type="button" className="close" onClick={() => setShowInsight(false)}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p><strong>Total Actual Cost:</strong> ₹{insightData.totalActualCost.toFixed(2)}</p>
          <p><strong>Total Sales Value:</strong> ₹{insightData.totalSalesValue.toFixed(2)}</p>
          <p><strong>Total Inventory Value:</strong> ₹{insightData.inventoryValue.toFixed(2)}</p>
        </div>
        <div className="modal-footer">
          <Button variant="secondary" onClick={() => setShowInsight(false)}>Close</Button>
        </div>
      </div>
    </div>
  </div>
)}

      
    </div>
  );
};

export default ItemPage;
