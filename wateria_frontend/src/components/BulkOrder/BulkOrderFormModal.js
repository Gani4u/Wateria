import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getPaginatedPlants } from "../../api/PlantApi";

const BulkOrderFormModal = ({ show, onHide, onSubmit, order }) => {
  const [formData, setFormData] = useState({
    id: null,
    customerName: "",
    contactNumber: "",
    plantId: "",
    cansGiven: 0,
    cansReturned: 0,
    cansPending: 0,
    totalAmount: 0.0,
    pendingAmount: 0.0,
    moneyReceived: 0.0,
    note: "",
    status: "PENDING", // Default status
  });

  const [plants, setPlants] = useState([]);

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      setFormData({
        id: null,
        customerName: "",
        contactNumber: "",
        plantId: "",
        cansGiven: 0,
        cansReturned: 0,
        cansPending: 0,
        totalAmount: 0.0,
        pendingAmount: 0.0,
        moneyReceived: 0.0,
        note: "",
        status: "PENDING",
      });
    }
  }, [order]);

  useEffect(() => {
    getPaginatedPlants(0, 100).then((data) => setPlants(data.content));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
  const updatedPending = parseFloat(formData.totalAmount) - parseFloat(formData.moneyReceived);
  const updatedCansPending = parseInt(formData.cansGiven) - parseInt(formData.cansReturned);
  onSubmit({ ...formData, pendingAmount: updatedPending });
};

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? "Edit" : "Add"} Bulk Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* ✅ PLANT SELECT */}
          <Form.Group controlId="plantId" className="mb-3">
            <Form.Label>Plant</Form.Label>
            <Form.Select
              name="plantId"
              value={formData.plantId}
              onChange={handleChange}
              required
            >
              <option value="">Select Plant</option>
              {plants.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* ✅ Customer Name */}
          <Form.Group controlId="customerName" className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* ✅ Contact Number */}
          <Form.Group controlId="contactNumber" className="mb-3">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="cansGiven" className="mb-3">
            <Form.Label>Cans Given</Form.Label>
            <Form.Control
              type="number"
              name="cansGiven"
              value={formData.cansGiven}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="cansReturned" className="mb-3">
            <Form.Label>Cans Returned</Form.Label>
            <Form.Control
              type="number"
              name="cansReturned"
              value={formData.cansReturned}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="cansPending" className="mb-3">
            <Form.Label>Cans Pending</Form.Label>
            <Form.Control
              type="number"
              name="cansPending"
              value={formData.cansGiven - formData.cansReturned}
              readOnly
              required
            />
          </Form.Group>
          <Form.Group controlId="moneyReceived" className="mb-3">
            <Form.Label>Money Received</Form.Label>
            <Form.Control
              type="number"
              name="moneyReceived"
              value={formData.moneyReceived}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="totalAmount" className="mb-3">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="pendingAmount" className="mb-3">
            <Form.Label>Pending Amount</Form.Label>
            <Form.Control
              name="pendingAmount"
              value={formData.totalAmount - formData.moneyReceived}
              readOnly
              required
            />
          </Form.Group>
          <Form.Group controlId="note" className="mb-3">
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </Form.Group>

          {/* ✅ Status Select */}
          {/* <Form.Group controlId="status" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="PENDING">PENDING</option>
              <option value="COMPLETED">COMPLETED</option>
              //<option value="CANCELLED">CANCELLED</option>
            </Form.Select>
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BulkOrderFormModal;
