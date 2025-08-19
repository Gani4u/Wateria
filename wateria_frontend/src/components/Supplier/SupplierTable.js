// 📁 src/components/Item/ItemTable.js
import React from "react";
import { Table, Button } from "react-bootstrap";

const SupplierTable = ({ suppliers, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier) => (
          <tr key={supplier.id}>
            <td>{supplier.id}</td>
            <td>{supplier.name}</td>
            <td>{supplier.contact}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => onEdit(supplier)} className="me-2">
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(supplier.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SupplierTable;
