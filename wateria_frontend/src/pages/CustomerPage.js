import React, { useEffect, useState } from "react";
import CustomerTable from "../components/Customer/CustomerTable";
import CustomerFormModal from "../components/Customer/CustomerFormModal";
import ConfirmDialog from "../components/Plant/ConfirmDialog";
import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/CustomerApi";
import { Button, Form, Spinner } from "react-bootstrap";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const PAGE_SIZE = 10;

  useEffect(() => {
    loadCustomers(0);
  }, []);

  const loadCustomers = async (currentPage, query = "") => {
    setLoading(true);
    const data = await getAllCustomers(currentPage, PAGE_SIZE, "id", query);
    if (currentPage === 0) {
      setCustomers(data.content);
    } else {
      setCustomers((prev) => [...prev, ...data.content]);
    }
    setHasMore(currentPage + 1 < data.totalPages);
    setLoading(false);
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setPage(0);
    loadCustomers(0, term);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setOpenModal(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    await deleteCustomer(confirmDelete.id);
    setConfirmDelete({ open: false, id: null });
    loadCustomers(0, searchTerm);
    setPage(0);
  };

  const handleSubmit = async (formData) => {
    if (formData.id) {
      await updateCustomer(formData.id, formData);
    } else {
      await createCustomer(formData);
    }
    setOpenModal(false);
    loadCustomers(0, searchTerm);
    setPage(0);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadCustomers(nextPage, searchTerm);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Customer Management</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Add Customer
        </Button>
      </div>

      <Form.Control
        type="text"
        placeholder="Search by customer name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />

      <CustomerTable
        customers={customers}
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

      <CustomerFormModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        customer={selectedCustomer}
      />

      <ConfirmDialog
        open={confirmDelete.open}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        message="Are you sure you want to delete this customer?"
      />
    </div>
  );
};

export default CustomerPage;
