// 📁 src/components/Item/ItemFormModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ItemFormModal = ({ show, onHide, onSubmit, item }) => {
  const [formData, setFormData] = useState({ name: "", unit: "" });

  useEffect(() => {
    if (item) {
      setFormData({ id: item.id, name: item.name, unit: item.unit });
    } else {
      setFormData({ name: "", unit: "" });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{item ? "Edit Item" : "Add Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter item name"
            />
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>Unit</Form.Label>
            <Form.Control
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
              placeholder="Enter unit (e.g., kg, litre)"
            />
          </Form.Group> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ItemFormModal;
