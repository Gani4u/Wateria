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
import { Button, Spinner, Form, Alert } from "react-bootstrap";

const PlantPage = () => {
  const [plants, setPlants] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // error handler
  const [searchTerm, setSearchTerm] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const PAGE_SIZE = 10;

  useEffect(() => {
    fetchPlants(0, searchTerm);
    // ✅ fixed missing dependency warning
  }, [searchTerm]);

  // Centralized fetch with error handling
  const fetchPlants = async (currentPage, query = "") => {
    try {
      setLoading(true);
      setError(null);

      const data = await getPaginatedPlants(currentPage, PAGE_SIZE, "id", query);

      if (currentPage === 0) {
        setPlants(data.content || []);
      } else {
        setPlants((prev) => [...prev, ...(data.content || [])]);
      }

      setHasMore(currentPage + 1 < (data.totalPages || 0));
    } catch (err) {
      setError("Failed to load plants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPlants(nextPage, searchTerm);
  };

  const handleAdd = () => {
    setSelectedPlant(null);
    setOpenModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleEdit = (plant) => {
    setSelectedPlant(plant);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deletePlant(confirmDelete.id);
      setConfirmDelete({ open: false, id: null });
      fetchPlants(0, searchTerm);
    } catch (err) {
      setError("Failed to delete plant, may be record is linked somewhere check and delete that first.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (formData.id) {
        await updatePlant(formData.id, formData);
      } else {
        await createPlant(formData);
      }
      setOpenModal(false);
      fetchPlants(0, searchTerm);
    } catch (err) {
      setError("Failed to save plant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Plant Management</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Add Plant
        </Button>
      </div>

      {/* ✅ Error alert with close (X button) */}
      {error && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setError(null)}
          className="mt-2"
        >
          {error}
        </Alert>
      )}

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
        show={openModal}
        onHide={() => setOpenModal(false)}
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
