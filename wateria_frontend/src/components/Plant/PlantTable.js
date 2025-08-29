import React from "react";

const PlantTable = ({ plants, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => (
            <tr key={plant.id}>
              <td>{plant.name}</td>
              <td>{plant.location}</td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => onEdit(plant)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(plant.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlantTable;
