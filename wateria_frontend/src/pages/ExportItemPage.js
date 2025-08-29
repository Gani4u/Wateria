import React, { useEffect, useState } from "react";
import ExportItemTable from "../components/ExportItem/ExportItemTable";
import ExportItemFormModal from "../components/ExportItem/ExportItemFormModal";
import ConfirmDialog from "../components/Plant/ConfirmDialog";
import {
  getAllExportItems,
  createExportItem,
  updateExportItem,
  deleteExportItem
} from "../api/ExportItemApi";
import { getAllItems } from "../api/ItemApi";
import { Button, Spinner } from "react-bootstrap";

const ExportItemPage = () => {
  const [exportItems, setExportItems] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const PAGE_SIZE = 10;

  useEffect(() => {
    loadExportItems(0);
    loadItems();
  }, []);

  const loadExportItems = async (currentPage) => {
    setLoading(true);
    const data = await getAllExportItems(currentPage, PAGE_SIZE);
    if (currentPage === 0) {
      setExportItems(data.content);
    } else {
      setExportItems((prev) => [...prev, ...data.content]);
    }
    setHasMore(currentPage + 1 < data.totalPages);
    setLoading(false);
  };

  const loadItems = async () => {
    const data = await getAllItems();
    setItems(data.content);
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
    await deleteExportItem(confirmDelete.id);
    setConfirmDelete({ open: false, id: null });
    loadExportItems(0);
    setPage(0);
  };

  const handleSubmit = async (formData) => {
    if (formData.id) {
      await updateExportItem(formData.id, formData);
    } else {
      await createExportItem(formData);
    }
    setOpenModal(false);
    loadExportItems(0);
    setPage(0);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadExportItems(nextPage);
  };

  return (
    <div className="container mt-4">
      {/* Header row */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h2 className="mb-2 mb-md-0">Outward Item Management</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Add Outward Item
        </Button>
      </div>

      {/* Responsive table */}
      <ExportItemTable
        exportItems={exportItems}
        onEdit={handleEdit}
        onDelete={(id) => setConfirmDelete({ open: true, id })}
      />

      {/* Loading spinner */}
      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Load more */}
      {!loading && hasMore && (
        <div className="text-center mt-3">
          <Button variant="outline-primary" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}

      {/* Modals */}
      <ExportItemFormModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        exportItem={selectedItem}
        items={items}
      />

      <ConfirmDialog
        open={confirmDelete.open}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        message="Are you sure you want to delete this outward item?"
      />
    </div>
  );
};

export default ExportItemPage;
