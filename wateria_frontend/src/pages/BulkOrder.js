import React, { useEffect, useState } from "react";
import BulkOrderTable from "../components/BulkOrder/BulkOrderTable";
import BulkOrderFormModal from "../components/BulkOrder/BulkOrderFormModal";
import ConfirmDialog from "../components/Plant/ConfirmDialog";
import {
  getAllBulkOrders,
  createBulkOrder,
  updateBulkOrder,
  deleteBulkOrder,
  getBulkOrderStats,
} from "../api/BulkOrderApi";
import { Button, Form, Spinner } from "react-bootstrap";
import InsightsModal from "../components/BulkOrder/InsightModal";

const BulkOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });
  const [statusFilter, setStatusFilter] = useState("");

  // Insights modal state
  const [showInsights, setShowInsights] = useState(false);

  const PAGE_SIZE = 10;

  useEffect(() => {
    loadOrders(0);
  }, []);

  const loadOrders = async (currentPage, query = "", status = "") => {
    setLoading(true);
    const data = await getAllBulkOrders(currentPage, PAGE_SIZE, "id", query, status);
    if (currentPage === 0) {
      setOrders(data.content);
    } else {
      setOrders((prev) => [...prev, ...data.content]);
    }
    setHasMore(currentPage + 1 < data.totalPages);
    setLoading(false);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setPage(0);
    loadOrders(0, term, statusFilter);
  };

  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    setPage(0);
    loadOrders(0, searchTerm, value);
  };

  const handleAdd = () => {
    setSelectedOrder(null);
    setOpenModal(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    await deleteBulkOrder(confirmDelete.id);
    setConfirmDelete({ open: false, id: null });
    loadOrders(0, searchTerm);
    setPage(0);
  };

  const handleSubmit = async (formData) => {
    if (formData.id) {
      await updateBulkOrder(formData.id, formData);
    } else {
      await createBulkOrder(formData);
    }
    setOpenModal(false);
    loadOrders(0, searchTerm);
    setPage(0);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadOrders(nextPage, searchTerm, statusFilter);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-column flex-md-row">
        <h2 className="mb-2 mb-md-0">Bulk Order Management</h2>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={handleAdd}>
            + Add Bulk Order
          </Button>
          <Button variant="outline-secondary" onClick={() => setShowInsights(true)}>
            📊 Show Insights
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="d-flex gap-3 mb-3 flex-column flex-md-row">
            <Form.Control
              type="text"
              placeholder="Search by Customer..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-100 w-md-50"
            />

            <Form.Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="w-100 w-md-25"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </Form.Select>
          </div>

          <BulkOrderTable
            orders={orders}
            onEdit={handleEdit}
            onDelete={(id) => setConfirmDelete({ open: true, id })}
          />

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
        </div>
      </div>

      <BulkOrderFormModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        order={selectedOrder}
      />

      <InsightsModal
        show={showInsights}
        onHide={() => setShowInsights(false)}
      />

      <ConfirmDialog
        open={confirmDelete.open}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        message="Are you sure you want to delete this bulk order?"
      />
    </div>
  );
};

export default BulkOrderPage;
