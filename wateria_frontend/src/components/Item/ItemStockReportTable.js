import React from "react";
import { Table } from "react-bootstrap";

const ItemStockReportTable = ({ report }) => {
  if (!report) return null;

  return (
    <div className="table-responsive mt-4">
      <h4>Item Stock Report</h4>
      <Table striped bordered hover>
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Total Imported</th>
            <th>Total Exported</th>
            <th>Total Used</th>
            <th>In Stock</th>
            <th>Actual Cost</th>
            <th>Sales Value</th>
          </tr>
        </thead>
        <tbody>
          {report.length > 0 ? (
            report.map((row) => (
              <tr key={row.id}>
                <td>{row.itemId}</td>
                <td>{row.itemName}</td>
                <td>{row.totalImported}</td>
                <td>{row.totalSold}</td>
                <td>{row.totalUsed}</td>
                <td>{row.currentStock}</td>
                <td>{row.actualCost?.toFixed(2)}</td>
                <td>{row.salesValue?.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No report data.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemStockReportTable;
