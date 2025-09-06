// 📁 src/pages/SupplierPage.js
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
import { Button, Form, Spinner, Alert } from "react-bootstrap";

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const PAGE_SIZE = 10;

  useEffect(() => {
    loadSuppliers(0);
  }, []);

  const loadSuppliers = async (currentPage, query = "") => {
    setLoading(true);
    try {
      const data = await getAllSuppliers(currentPage, PAGE_SIZE, "id", query);
      if (currentPage === 0) {
        setSuppliers(data.content);
      } else {
        setSuppliers((prev) => [...prev, ...data.content]);
      }
      setHasMore(currentPage + 1 < data.totalPages);
    } catch {
      setError("Failed to load suppliers.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setPage(0);
    loadSuppliers(0, term);
  };

  const handleAdd = () => {
    setSelectedSupplier(null);
    setOpenModal(true);
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteSupplier(confirmDelete.id);
      setConfirmDelete({ open: false, id: null });
      loadSuppliers(0, searchTerm);
      setPage(0);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Error deleting supplier. They might be linked to items."
      );
      setConfirmDelete({ open: false, id: null });
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (formData.id) {
        await updateSupplier(formData.id, formData);
      } else {
        await createSupplier(formData);
      }
      setOpenModal(false);
      loadSuppliers(0, searchTerm);
      setPage(0);
    } catch {
      setError("Error saving supplier.");
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadSuppliers(nextPage, searchTerm);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Supplier Management</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Add Supplier
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

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
        supplier={selectedSupplier}
      />

      <ConfirmDialog
        open={confirmDelete.open}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        message="Are you sure you want to delete this supplier?"
      />
    </div>
  );
};

export default SupplierPage;
