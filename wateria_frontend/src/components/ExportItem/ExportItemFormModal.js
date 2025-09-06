import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ExportItemFormModal = ({ show, onHide, onSubmit, exportItem, items }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerContact: "",
    itemId: "",
    quantity: "",
    pricePerItem: "",
    moneyReceived: "",
    note: ""
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (exportItem) {
      setFormData({
        id: exportItem.id || null,
        customerName: exportItem.customerName || "",
        customerContact: exportItem.customerContact || "",
        itemId: exportItem.itemId || "",
        quantity: exportItem.quantity || "",
        pricePerItem: exportItem.pricePerItem || "",
        moneyReceived: exportItem.moneyReceived || "",
        note: exportItem.note || ""
      });
    } else {
      setFormData({
        id: null,
        customerName: "",
        customerContact: "",
        itemId: "",
        quantity: "",
        pricePerItem: "",
        moneyReceived: "",
        note: ""
      });
    }
    setFormError(""); // Clear previous error when modal opens
  }, [exportItem, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormError(""); // Clear error if success
    } catch (error) {
      // Try to parse message from backend
      const message = error?.response?.data?.message || error?.response?.data || "Something went wrong";
      setFormError(message);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{exportItem ? "Edit Export Item" : "Add Export Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && (
            <Alert variant="danger">
              {formError}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              placeholder="Enter customer name"
            />
          </Form.Group>

          <Form.Group controlId="formContact" className="mt-3">
            <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="customerContact"
                value={formData.contactNumber}
                onChange={(e) => /^\d*$/.test(e.target.value) && setFormData({ ...formData, contactNumber: e.target.value })}
                placeholder="Enter contact number"
                maxLength={10}
                isInvalid={formData.contactNumber && formData.contactNumber.length !== 10}
              />
            <Form.Control.Feedback type="invalid">
              Man enter 10 digit number😃
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Item</Form.Label>
            <Form.Select
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              required
            >
              <option value="">Select Item</option>
              {items.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="Enter quantity"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price Per Item</Form.Label>
            <Form.Control
              name="pricePerItem"
              type="number"
              value={formData.pricePerItem}
              onChange={handleChange}
              required
              placeholder="Enter price per item"
              ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Money Received</Form.Label>
            <Form.Control
              name="moneyReceived"
              type="number"
              value={formData.moneyReceived}
              onChange={handleChange}
              required
              placeholder="Enter amount"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Note</Form.Label>
            <Form.Control
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Optional note"
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

export default ExportItemFormModal;
