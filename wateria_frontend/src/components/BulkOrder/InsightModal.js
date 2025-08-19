import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { getBulkOrderStats } from "../../api/BulkOrderApi";

export default function InsightsModal({ show, onHide }) {
  const [range, setRange] = useState("week");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

 const getDateRange = () => {
  const now = new Date();
  let start = new Date(now); // make a copy
  let end = new Date(now);

  if (range === "week") {
    start.setDate(now.getDate() - 7);
  } else if (range === "month") {
    start.setMonth(now.getMonth() - 1);
  } else if (range === "year") {
    start.setFullYear(now.getFullYear() - 1);
  } else if (range === "custom" && customStart && customEnd) {
    start = new Date(customStart);
    end = new Date(customEnd);
  } else {
    start.setMonth(now.getMonth() - 1);
  }

  // Always clear time
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
};


  const fetchInsights = async () => {
    const { startDate, endDate } = getDateRange();
    setLoading(true);
    const data = await getBulkOrderStats(startDate, endDate);
    setInsights(data);
    setLoading(false);
  };

  useEffect(() => {
    if (show) {
      fetchInsights();
    }
  }, [show, range, customStart, customEnd]);

  return (
    <Modal show={show} onHide={onHide} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Bulk Order Insights</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
          <option value="custom">Custom Range</option>
        </Form.Select>

        {range === "custom" && (
          <div className="mt-2">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
            />
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
            />
          </div>
        )}

        <div className="mt-3">
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : insights ? (
            <>
              <p><strong>Pending Users:</strong> {insights.pendingUsers}</p>
              <p><strong>Total Cans Pending:</strong> {insights.totalCansPending}</p>
              <p><strong>Total Money Pending:</strong> ₹{insights.amountPending}</p>
              <p><strong>Total Cans Given:</strong> {insights.totalCansGiven}</p>
              <p><strong>Total Money Received:</strong> ₹{insights.totalAmount}</p>
            </>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
