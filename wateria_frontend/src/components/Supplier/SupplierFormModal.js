// 📁 src/components/Supplier/SupplierFormModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SupplierFormModal = ({ show, onHide, onSubmit, supplier }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    contact: ""
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        id: supplier.id || null,
        name: supplier.name || "",
        contact: supplier.contact || ""
      });
    } else {
      setFormData({
        id: null,
        name: "",
        contact: ""
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass to parent: create or update logic is handled there
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Edit Supplier" : "Add Supplier"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Supplier Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter supplier name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
            />
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

export default SupplierFormModal;
