import React from "react";
import { Table, Button } from "react-bootstrap";

const InternallyUsedItemTable = ({ usedItems, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price/Item</th>
            <th>Note</th>
            <th>Created At</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usedItems.length > 0 ? (
            usedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantityUsed}</td>
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
              <td colSpan="7" className="text-center">
                No used items found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default InternallyUsedItemTable;
