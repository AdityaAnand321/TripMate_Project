import React from "react";
import "./confirm.css";

export default function Confirm({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{color:"black"}}>{title}</h2>
        <p style={{color:"black"}}>{message}</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Yes, Confirm
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
