import React, { useEffect, useState } from "react";
import PlantTable from "../components/Plant/PlantTable";
import PlantFormModal from "../components/Plant/PlantFormModal";
import ConfirmDialog from "../components/Plant/ConfirmDialog";
import {
  getPaginatedPlants,
  createPlant,
  updatePlant,
  deletePlant,
} from "../api/PlantApi";
import { Button, Spinner, Form } from "react-bootstrap";

const PlantPage = () => {
  const [plants, setPlants] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const PAGE_SIZE = 10;

  useEffect(() => {
    loadPlants(0, searchTerm);
  }, []);

  const loadPlants = async (currentPage, query = "") => {
    setLoading(true);
    const data = await getPaginatedPlants(currentPage, PAGE_SIZE, "id", query);
    if (currentPage === 0) {
      setPlants(data.content);
    } else {
      setPlants((prev) => [...prev, ...data.content]);
    }
    setHasMore(currentPage + 1 < data.totalPages);
    setLoading(false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPlants(nextPage, searchTerm);
  };

  const handleAdd = () => {
    setSelectedPlant(null);
    setOpenModal(true);
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setPage(0);
    loadPlants(0, term);
  };

  const handleEdit = (plant) => {
    setSelectedPlant(plant);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    await deletePlant(confirmDelete.id);
    setConfirmDelete({ open: false, id: null });
    setPage(0);
    loadPlants(0, searchTerm);
  };

  const handleSubmit = async (formData) => {
    if (formData.id) {
      await updatePlant(formData.id, formData);
    } else {
      await createPlant(formData);
    }
    setOpenModal(false);
    setPage(0);
    loadPlants(0, searchTerm);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Plant Management</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Add Plant
        </Button>
      </div>

      <Form.Control
        type="text"
        placeholder="Search by plant name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />

      <PlantTable
        plants={plants}
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

      <PlantFormModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        plant={selectedPlant}
      />
      <ConfirmDialog
        open={confirmDelete.open}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        message="Are you sure you want to delete this plant?"
      />
    </div>
  );
};

export default PlantPage;
