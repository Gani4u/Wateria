import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CustomerFormModal = ({ show, onHide, onSubmit, customer }) => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({ name: "", contactNumber: "" });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? "Edit" : "Add"} Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group controlId="formContact" className="mt-3">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {formData.id ? "Update" : "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerFormModal;
