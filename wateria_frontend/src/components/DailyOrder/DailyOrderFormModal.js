import React, { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { getPaginatedPlants, createPlant } from "../../api/PlantApi";
import { getAllCustomers, createCustomer } from "../../api/CustomerApi";
import PlantFormModal from "../Plant/PlantFormModal";
import CustomerFormModal from "../Customer/CustomerFormModal";

const DailyOrderFormModal = ({ show, onHide, onSubmit, order, readOnlyFields = [] }) => {
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
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  // Reset form when editing or adding
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

  // Load dropdown data
  useEffect(() => {
    getPaginatedPlants(0, 100).then((data) => setPlants(data.content));
    getAllCustomers(0, 100).then((data) => setCustomers(data.content || data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    updated.cansPending = parseInt(updated.cansGiven || 0) - parseInt(updated.cansReturned || 0);
    updated.pendingAmount = parseFloat(updated.totalAmount || 0) - parseFloat(updated.moneyReceived || 0);

    setFormData(updated);
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      cansPending: parseInt(formData.cansGiven || 0) - parseInt(formData.cansReturned || 0),
      pendingAmount: parseFloat(formData.totalAmount || 0) - parseFloat(formData.moneyReceived || 0),
    });
  };

  const isReadOnly = (field) => readOnlyFields.includes(field);

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Edit Daily Order" : "Add Daily Order"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Plant */}
            <Form.Group className="mb-3">
              <Form.Label>Plant</Form.Label>
              <InputGroup>
                <Form.Select
                  name="plantId"
                  value={formData.plantId}
                  onChange={handleChange}
                  disabled={isReadOnly("plantId")}
                  required
                >
                  <option value="">Select Plant</option>
                  {plants.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </Form.Select>
                <Button variant="outline-primary" onClick={() => setShowPlantModal(true)}>
                  +
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Customer */}
            <Form.Group className="mb-3">
              <Form.Label>Customer</Form.Label>
              <InputGroup>
                <Form.Select
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  disabled={isReadOnly("customerId")}
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.contactNumber})
                    </option>
                  ))}
                </Form.Select>
                <Button variant="outline-primary" onClick={() => setShowCustomerModal(true)}>
                  +
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Numbers */}
            <Form.Group className="mb-3">
              <Form.Label>Cans Given</Form.Label>
              <Form.Control type="number" name="cansGiven" value={formData.cansGiven} onChange={handleChange} min="0" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cans Returned</Form.Label>
              <Form.Control type="number" name="cansReturned" value={formData.cansReturned} onChange={handleChange} min="0" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cans Pending</Form.Label>
              <Form.Control type="number" value={formData.cansPending} readOnly plaintext />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Amount (₹)</Form.Label>
              <Form.Control type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} min="0" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Money Received (₹)</Form.Label>
              <Form.Control type="number" name="moneyReceived" value={formData.moneyReceived} onChange={handleChange} min="0" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pending Amount (₹)</Form.Label>
              <Form.Control type="number" value={formData.pendingAmount} readOnly plaintext />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Note</Form.Label>
              <Form.Control as="textarea" rows={2} name="note" value={formData.note} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Order
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Plant Modal */}
      <PlantFormModal
        show={showPlantModal}
        onHide={() => setShowPlantModal(false)}
        onSubmit={async (newPlant) => {
          const saved = await createPlant(newPlant);
          setPlants((prev) => [...prev, saved]);
          setFormData((prev) => ({ ...prev, plantId: saved.id }));
        }}
      />

      {/* Customer Modal */}
      <CustomerFormModal
        show={showCustomerModal}
        onHide={() => setShowCustomerModal(false)}
        onSubmit={async (newCustomer) => {
          const saved = await createCustomer(newCustomer);
          setCustomers((prev) => [...prev, saved]);
          setFormData((prev) => ({ ...prev, customerId: saved.id }));
        }}
      />
    </>
  );
};

export default DailyOrderFormModal;
