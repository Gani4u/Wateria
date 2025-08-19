// 📁 src/components/ImportItem/ImportItemTable.js
import React from "react";
import { Table, Button } from "react-bootstrap";

const ImportItemTable = ({ importItems, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Supplier</th>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Price/Item</th>
          <th>Note</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {importItems.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.supplier.name}</td>
            <td>{item.item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.pricePerItem}</td>
            <td>{item.note}</td>
            <td>{new Date(item.createdAt).toLocaleString()}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => onEdit(item)} className="me-2">
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(item.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ImportItemTable;
