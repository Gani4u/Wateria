import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getPaginatedPlants } from "../../api/PlantApi";
import { getAllCustomers } from "../../api/CustomerApi";

const DailyOrderFormModal = ({
  show,
  onHide,
  onSubmit,
  order,
  readOnlyFields = [],
}) => {
  const [formData, setFormData] = useState({
    id: null,
    plantId: "",
    customerId: "",
    cansGiven: 0,
    cansReturned: 0,
    cansPending: 0,
    moneyReceived: 0.0,
    totalAmount: 0.0,
    pendingAmount: 0.0,
    note: "",
    status: "PENDING",
  });

  const [plants, setPlants] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      setFormData({
        id: null,
        plantId: "",
        customerId: "",
        cansGiven: 0,
        cansReturned: 0,
        cansPending: 0,
        moneyReceived: 0.0,
        totalAmount: 0.0,
        pendingAmount: 0.0,
        note: "",
        status: "PENDING",
      });
    }
  }, [order]);

  useEffect(() => {
    getPaginatedPlants(0, 100).then((data) => setPlants(data.content));
    getAllCustomers().then((data) => setCustomers(data.content || data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    // Recalculate dependent fields
    updatedForm.cansPending =
      parseInt(updatedForm.cansGiven) - parseInt(updatedForm.cansReturned);
    updatedForm.pendingAmount =
      parseFloat(updatedForm.totalAmount) -
      parseFloat(updatedForm.moneyReceived);

    setFormData(updatedForm);
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      // Ensure recalculated fields are correct
      cansPending:
        parseInt(formData.cansGiven) - parseInt(formData.cansReturned),
      pendingAmount:
        parseFloat(formData.totalAmount) - parseFloat(formData.moneyReceived),
    });
  };

  const isFieldReadOnly = (fieldName) => readOnlyFields.includes(fieldName);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {formData.id ? "Edit/Add-Up" : "Add"} Daily Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Plant Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>Plant</Form.Label>
            <Form.Select
              name="plantId"
              value={formData.plantId}
              onChange={handleChange}
              required
              disabled={isFieldReadOnly("plantId")}
            >
              <option value="">Select Plant</option>
              {plants.map((plant) => (
                <option key={plant.id} value={plant.id}>
                  {plant.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Customer Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Form.Select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
              disabled={isFieldReadOnly("customerId")}
            >
              <option value="">Select Customer</option>
              {Array.isArray(customers) &&
                customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ({customer.contactNumber})
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          {/* Cans Given */}
          <Form.Group className="mb-3">
            <Form.Label>Cans Given</Form.Label>
            <Form.Control
              type="number"
              name="cansGiven"
              value={formData.cansGiven}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Cans Returned */}
          <Form.Group className="mb-3">
            <Form.Label>Cans Returned</Form.Label>
            <Form.Control
              type="number"
              name="cansReturned"
              value={formData.cansReturned}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Cans Pending (Calculated) */}
          <Form.Group className="mb-3">
            <Form.Label>Cans Pending</Form.Label>
            <Form.Control
              type="number"
              readOnly
              value={formData.cansPending}
            />
          </Form.Group>

          {/* Total Amount */}
          <Form.Group className="mb-3">
            <Form.Label>Total Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Money Received */}
          <Form.Group className="mb-3">
            <Form.Label>Money Received (₹)</Form.Label>
            <Form.Control
              type="number"
              name="moneyReceived"
              value={formData.moneyReceived}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Pending Amount (Calculated) */}
          <Form.Group className="mb-3">
            <Form.Label>Pending Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              readOnly
              value={formData.pendingAmount}
            />
          </Form.Group>

          {/* Note */}
          <Form.Group className="mb-3">
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </Form.Group>
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

export default DailyOrderFormModal;
