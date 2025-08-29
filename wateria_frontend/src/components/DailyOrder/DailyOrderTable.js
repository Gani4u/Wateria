import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

const DailyOrderTable = ({ orders, onEdit, onDelete, onAddUp }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return <Badge bg="secondary">Pending</Badge>;
      case "COMPLETED":
        return <Badge bg="success">Completed</Badge>;
      default:
        return <Badge bg="warning">Unknown</Badge>;
    }
  };

  return (
    <>
      {/* ✅ Desktop & Tablet */}
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
              <th>Pending Amount</th>
              <th>Status</th>
              <th>Note</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>{order.customerName || "-"}</strong>
                  <div className="text-muted small">{order.customerContact}</div>
                </td>
                <td>{order.plantName}</td>
                <td>{order.cansGiven}</td>
                <td>{order.cansReturned}</td>
                <td className={order.cansPending !== 0 ? "text-danger" : ""}>
                  {order.cansPending}
                </td>
                <td>{order.totalAmount}</td>
                <td>{order.moneyReceived}</td>
                <td>{order.pendingAmount}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>{order.note || "-"}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button size="sm" variant="warning" onClick={() => onEdit(order)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => onDelete(order.id)}>
                      Delete
                    </Button>
                    <Button size="sm" variant="info" onClick={() => onAddUp(order)}>
                      ➕ Add-Up
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* ✅ Mobile View */}
      <div className="d-block d-sm-none">
        {orders.map((order) => (
          <div key={order.id} className="card mb-3">
            <div className="card-body">
              <h6 className="card-title">
                {order.customerName} - {order.customerContact}
              </h6>

              <div><strong>Plant:</strong> {order.plantName}</div>
              <div><strong>Cans Given:</strong> {order.cansGiven}</div>
              <div><strong>Cans Returned:</strong> {order.cansReturned}</div>
              <div className={order.cansPending !== 0 ? "text-danger" : ""}>
                <strong>Pending Cans:</strong> {order.cansPending}
              </div>
              <div><strong>Total Amount:</strong> ₹{order.totalAmount}</div>
              <div><strong>Money Received:</strong> ₹{order.moneyReceived}</div>
              <div><strong>Pending Amount:</strong> ₹{order.pendingAmount}</div>
              {order.note && <div><strong>Note:</strong> {order.note}</div>}
              <div><strong>Status:</strong> {getStatusBadge(order.status)}</div>
              <div><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</div>

              <div className="mt-2 d-flex gap-2 flex-wrap">
                <Button size="sm" variant="warning" onClick={() => onEdit(order)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(order.id)}>
                  Delete
                </Button>
                <Button size="sm" variant="info" onClick={() => onAddUp(order)}>
                  ➕ Add-Up
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DailyOrderTable;
