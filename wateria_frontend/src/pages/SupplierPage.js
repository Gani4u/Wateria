// 📁 src/pages/ItemPage.js
import React, { useEffect, useState } from "react";
import SupplierTable from "../components/Supplier/SupplierTable";
import SupplierFormModal from "../components/Supplier/SupplierFormModal";
import ConfirmDialog from "../components/Plant/ConfirmDialog";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../api/SupplierApi";
import { Button, Form, Spinner } from "react-bootstrap";

const SupplierPage = () => {
  const [suppliers, setSupplier] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedSupplie, setSelectedSupplie] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const PAGE_SIZE = 10;

  useEffect(() => {
    loadSupplie(0);
  }, []);

  const loadSupplie = async (currentPage, query = "") => {
    setLoading(true);
    const data = await getAllSuppliers(currentPage, PAGE_SIZE, "id", query);
    if (currentPage === 0) {
      setSupplier(data.content);
    } else {
      setSupplier((prev) => [...prev, ...data.content]);
    }
    setHasMore(currentPage + 1 < data.totalPages);
    setLoading(false);
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setPage(0);
    loadSupplie(0, term);
  };

  const handleAdd = () => {
    setSelectedSupplie(null);
    setOpenModal(true);
  };

  const handleEdit = (item) => {
    setSelectedSupplie(item);
    setOpenModal(true);
  };

  const handleDelete = async () => {
  try {
    await deleteSupplier(confirmDelete.id);
    setConfirmDelete({ open: false, id: null });
    loadSupplie(0, searchTerm);
    setPage(0);
  } catch (error) {
    alert(
      error.response?.data || "Error deleting supplier. They might be linked to import items."
    );
    setConfirmDelete({ open: false, id: null });
  }
};

  const handleSubmit = async (formData) => {
    if (formData.id) {
      await updateSupplier(formData.id, formData);
    } else {
      await createSupplier(formData);
    }
    setOpenModal(false);
    loadSupplie(0, searchTerm);
    setPage(0);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadSupplie(nextPage, searchTerm);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Supplier Management</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Add Suppliee
        </Button>
      </div>

      <Form.Control
        type="text"
        placeholder="Search by supplier name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />

      <SupplierTable
        suppliers={suppliers}
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

      <SupplierFormModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        supplier={selectedSupplie}
      />

      <ConfirmDialog
        open={confirmDelete.open}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        message="Are you sure you want to delete this suppplier?"
      />
    </div>
  );
};

export default SupplierPage;
