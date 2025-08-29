import React from "react";
import { Table, Button } from "react-bootstrap";

const ImportItemTable = ({ importItems, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Supplier</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price/Item</th>
            <th>Note</th>
            <th>Created At</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {importItems.length > 0 ? (
            importItems.map((item) => (
              <tr key={item.id}>
                <td>{item.supplier?.name}</td>
                <td>{item.item?.name}</td>
                <td>{item.quantity}</td>
                <td>{item.pricePerItem}</td>
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
              <td colSpan="8" className="text-center">
                No inward items found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ImportItemTable;
