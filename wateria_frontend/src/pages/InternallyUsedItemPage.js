import React, { useEffect, useState } from "react";
import {
  getAllUsedItems,
  createUsedItem,
  updateUsedItem,
  deleteUsedItem,
} from "../api/InternallyUsedItemApi";
import { getAllItems } from "../api/ItemApi";
import InternallyUsedItemTable from "../components/InternallyUsedItem/InternallyUsedItemTable";
import InternallyUsedItemFormModal from "../components/InternallyUsedItem/InternallyUsedItemFormModal";
import ConfirmDialog from "../components/Plant/ConfirmDialog";
import { Button, Spinner } from "react-bootstrap";

const InternallyUsedItemPage = () => {
  const [usedItems, setUsedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const PAGE_SIZE = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [itemData] = await Promise.all([
      getAllItems(0, 100), // Fetch all items for dropdown
    ]);
    setItems(itemData.content);
    loadUsedItems(0);
  };

  const loadUsedItems = async (currentPage) => {
    const data = await getAllUsedItems(currentPage, PAGE_SIZE, "id");
    if (currentPage === 0) {
      setUsedItems(data.content);
    } else {
      setUsedItems((prev) => [...prev, ...data.content]);
    }
    setHasMore(currentPage + 1 < data.totalPages);
    setLoading(false);
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
    await deleteUsedItem(confirmDelete.id);
    setConfirmDelete({ open: false, id: null });
    loadUsedItems(0);
  };

  const handleSubmit = async (formData) => {
    if (formData.id) {
      await updateUsedItem(formData.id, formData);
    } else {
      await createUsedItem(formData);
    }
    setOpenModal(false);
    loadUsedItems(0);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadUsedItems(nextPage);
  };

  return (
    <div className="container mt-4">
      {/* Header row */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h2 className="mb-2 mb-md-0">Used Items</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Add Used Item
        </Button>
      </div>

      {/* Table */}
      <InternallyUsedItemTable
        usedItems={usedItems}
        onEdit={handleEdit}
        onDelete={(id) => setConfirmDelete({ open: true, id })}
      />

      {/* Loading */}
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

      {/* Form modal */}
      <InternallyUsedItemFormModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        internallyUsed={selectedItem}
        allItems={items}
      />

      {/* Confirm delete */}
      <ConfirmDialog
        open={confirmDelete.open}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        message="Are you sure you want to delete this used item?"
      />
    </div>
  );
};

export default InternallyUsedItemPage;
