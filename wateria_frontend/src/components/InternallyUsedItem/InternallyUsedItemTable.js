// 📁 src/components/ImportItem/ImportItemTable.js
import React from "react";
import { Table, Button } from "react-bootstrap";

const InternallyUsedTable = ({ usedItems, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price/Item</th>
          <th>Note</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {usedItems.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.itemId}</td>
            <td>{item.quantityUsed}</td>
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

export default InternallyUsedTable;
