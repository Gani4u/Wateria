import { Table, Button } from "react-bootstrap";

const CustomerTable = ({ customers, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Contact Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.contactNumber}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => onEdit(customer)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(customer.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomerTable;
