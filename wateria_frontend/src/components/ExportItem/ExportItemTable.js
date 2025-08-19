import React from "react";
import { Table, Button } from "react-bootstrap";

const ExportItemTable = ({ exportItems, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer Name</th>
          <th>Contact</th>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Price/Item</th>
          <th>Money Received</th>
          <th>Note</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exportItems.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.customerName}</td>
            <td>{item.customerContact}</td>
            <td>{item.itemName}</td>
            <td>{item.quantity}</td>
            <td>{item.pricePerItem}</td>
            <td>{item.moneyReceived}</td>
            <td>{item.note}</td>
            <td>{item.createdAt}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => onEdit(item)} className="me-2">Edit</Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(item.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExportItemTable;
