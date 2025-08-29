import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

const BulkOrderTable = ({ orders, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return <Badge bg="secondary">Pending</Badge>;
      case "COMPLETED":
        return <Badge bg="success">Completed</Badge>;
      case "CANCELLED":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="warning">Unknown</Badge>;
    }
  };

  return (
    <>
      {/* Desktop & Tablet View */}
      <div className="d-none d-sm-block table-responsive">
        <Table striped bordered hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Customer</th>
              <th>Plant</th>
              <th>Cans Given</th>
              <th>Cans Returned</th>
              <th>Cans Pending</th>
              <th>Total Amount</th>
              <th>Money Received</th>
              <th>Pending Money</th>
              <th>Note</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>{order.customerName}</strong>
                  <div className="text-muted small">{order.contactNumber}</div>
                </td>
                <td>{order.plantName}</td>
                <td>{order.cansGiven}</td>
                <td>{order.cansReturned}</td>
                <td className={order.cansGiven - order.cansReturned !== 0 ? "text-danger" : ""}>
                  {order.cansGiven - order.cansReturned}
                </td>
                <td>{order.totalAmount}</td>
                <td>{order.moneyReceived}</td>
                <td>{order.totalAmount - order.moneyReceived}</td>
                <td>{order.note || "-"}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button size="sm" variant="warning" onClick={() => onEdit(order)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => onDelete(order.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="d-block d-sm-none">
        {orders.map((order) => (
          <div key={order.id} className="card mb-3">
            <div className="card-body">
              <h6 className="card-title">
                {order.customerName} - {order.contactNumber}
              </h6>
              <div><strong>Plant:</strong>{order.plantName}</div>
              <div><strong>Cans Given:</strong> {order.cansGiven}</div>
              <div><strong>Cans Returned:</strong> {order.cansReturned}</div>
              <div className={order.cansGiven - order.cansReturned !== 0 ? "text-danger" : ""}>
                <strong>Pending Cans:</strong> {order.cansGiven - order.cansReturned}
              </div>
              <div><strong>Total:</strong> ₹{order.totalAmount}</div>
              <div><strong>Received:</strong> ₹{order.moneyReceived}</div>
              <div><strong>Pending:</strong> ₹{order.totalAmount - order.moneyReceived}</div>
              {order.note && <div><strong>Note:</strong> {order.note}</div>}
              <div><strong>Status:</strong> {getStatusBadge(order.status)}</div>
              <div><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</div>
              <div className="mt-2 d-flex gap-2">
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => onEdit(order)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(order.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BulkOrderTable;
