import React from "react";

const ConfirmDialog = ({ open, onConfirm, onCancel, message }) => {
  if (!open) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center">
          <div className="modal-body">
            <p>{message}</p>
            <div className="d-flex justify-content-center gap-2 mt-4">
              <button className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
