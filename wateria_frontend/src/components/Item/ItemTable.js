// 📁 src/components/Item/ItemTable.js
import React from "react";
import { Table, Button } from "react-bootstrap";

const ItemTable = ({ items, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.unit}</td>
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

export default ItemTable;
