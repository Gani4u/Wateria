import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CustomerFormModal = ({ show, onHide, onSubmit, customer }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    contactNumber: ""
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        id: customer.id || null,
        name: customer.name || "",
        contactNumber: customer.contactNumber || ""
      });
    } else {
      setFormData({ id: null, name: "", contactNumber: "" });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    await onSubmit(formData); // parent saves API
    onHide(); // close modal
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Edit Customer" : "Add Customer"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter name"
            />
            <Form.Control.Feedback type="invalid">
              Name is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              pattern="^\d{10}$"
              placeholder="Enter 10-digit number"
            />
            <Form.Control.Feedback type="invalid">
              Contact number must be exactly 10 digits
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CustomerFormModal;
