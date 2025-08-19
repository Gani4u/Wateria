import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ImportItemFormModal = ({ show, onHide, onSubmit, importItem, allItems, allSuppliers }) => {
  const [formData, setFormData] = useState({
    id: null,
    itemId: "",
    supplierId: "",
    quantity: 0,
    pricePerItem: 0,
    note: "",
    createdAt: new Date().toISOString()
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (importItem) {
      setFormData({
        id: importItem.id,
        itemId: importItem.item?.id || importItem.itemId || "",
        supplierId: importItem.supplier?.id || importItem.supplierId || "",
        quantity: importItem.quantity || 0,
        pricePerItem: importItem.pricePerItem || 0,
        note: importItem.note || "",
        createdAt: importItem.createdAt || new Date().toISOString()
      });
    } else {
      setFormData({
        id: null,
        itemId: "",
        supplierId: "",
        quantity: 0,
        pricePerItem: 0,
        note: "",
        createdAt: new Date().toISOString()
      });
    }
    setFormError(""); // Clear error when modal opens
  }, [importItem, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({
        ...formData,
        quantity: parseInt(formData.quantity),
        pricePerItem: parseFloat(formData.pricePerItem)
      });
      setFormError(""); // clear error on success
    } catch (error) {
      const message = error?.response?.data?.message || error?.response?.data || "Something went wrong";
      setFormError(message);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Edit Import Item" : "Add Import Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && (
            <Alert variant="danger">{formError}</Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Item</Form.Label>
            <Form.Select name="itemId" value={formData.itemId} onChange={handleChange} required>
              <option value="">Select item</option>
              {allItems.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Supplier</Form.Label>
            <Form.Select name="supplierId" value={formData.supplierId} onChange={handleChange} required>
              <option value="">Select supplier</option>
              {allSuppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price per Item</Form.Label>
            <Form.Control type="number" step="0.01" name="pricePerItem" value={formData.pricePerItem} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Note</Form.Label>
            <Form.Control name="note" value={formData.note} onChange={handleChange} />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ImportItemFormModal;
