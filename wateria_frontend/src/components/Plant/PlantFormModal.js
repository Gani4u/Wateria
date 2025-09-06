import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PlantFormModal = ({ show, onHide, onSubmit, plant }) => {
  const [formData, setFormData] = useState({ id: null, name: "", location: "" });

  useEffect(() => {
    if (plant) {
      setFormData({ id: plant.id || null, name: plant.name || "", location: plant.location || "" });
    } else {
      setFormData({ id: null, name: "", location: "" });
    }
  }, [plant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // parent handles API
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      enforceFocus={false}
      restoreFocus={false}
      style={{ zIndex: 1065 }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Edit Plant" : "Add Plant"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Plant Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PlantFormModal;
