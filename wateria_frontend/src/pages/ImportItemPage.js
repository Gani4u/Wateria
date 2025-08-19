// 📁 src/pages/ImportItemPage.js
import React, { useEffect, useState } from "react";
import {
  getAllImportItems,
  createImportItem,
  updateImportItem,
  deleteImportItem,
} from "../api/ImportItemApi";
import { getAllItems } from "../api/ItemApi";
import { getAllSuppliers } from "../api/SupplierApi";
import ImportItemTable from "../components/ImportItem/ImportItemTable";
import ImportItemFormModal from "../components/ImportItem/ImportItemFormModal";
import ConfirmDialog from "../components/Plant/ConfirmDialog";
import { Button, Spinner, Form } from "react-bootstrap";

const ImportItemPage = () => {
  const [importItems, setImportItems] = useState([]);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const PAGE_SIZE = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [itemData, supplierData] = await Promise.all([
      getAllItems(0, 100), // Fetch all for dropdown
      getAllSuppliers(0, 100),
    ]);
    setItems(itemData.content);
    setSuppliers(supplierData.content);
    loadImportItems(0);
  };

  const loadImportItems = async (currentPage, query = "") => {
    const data = await getAllImportItems(currentPage, PAGE_SIZE, "id", query);
    if (currentPage === 0) {
      setImportItems(data.content);
    } else {
      setImportItems((prev) => [...prev, ...data.content]);
    }
    setHasMore(currentPage + 1 < data.totalPages);
    setLoading(false);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setPage(0);
    loadImportItems(0, term);
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
    await deleteImportItem(confirmDelete.id);
    setConfirmDelete({ open: false, id: null });
    loadImportItems(0, searchTerm);
  };

  const handleSubmit = async (formData) => {
    if (formData.id) {
      await updateImportItem(formData.id, formData);
    } else {
      await createImportItem(formData);
    }
    setOpenModal(false);
    loadImportItems(0, searchTerm);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadImportItems(nextPage, searchTerm);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Import Items</h2>
        <Button variant="primary" onClick={handleAdd}>+ Add Import Item</Button>
      </div>

      <Form.Control
        type="text"
        placeholder="Search import items..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />

      <ImportItemTable
        importItems={importItems}
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

      <ImportItemFormModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        importItem={selectedItem}
        allItems={items}
        allSuppliers={suppliers}
      />

      <ConfirmDialog
        open={confirmDelete.open}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        message="Are you sure you want to delete this import item?"
      />
    </div>
  );
};

export default ImportItemPage;
