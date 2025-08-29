import React from "react";
import { Table, Button } from "react-bootstrap";

const ExportItemTable = ({ exportItems, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Customer Name</th>
            <th>Contact</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price/Item</th>
            <th>Money Received</th>
            <th>Note</th>
            <th>Created At</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exportItems.length > 0 ? (
            exportItems.map((item) => (
              <tr key={item.id}>
                <td>{item.customerName}</td>
                <td>{item.customerContact}</td>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.pricePerItem}</td>
                <td>{item.moneyReceived}</td>
                <td>{item.note}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td className="text-center">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No outward items found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ExportItemTable;
