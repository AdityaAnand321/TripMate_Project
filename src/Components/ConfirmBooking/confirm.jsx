import React from "react";
import "./confirm.css";

export default function Confirm({
  title,
  message,
  onConfirm,
  onCancel,
  // Optional booking enhancers
  showPeople = false,
  people = 1,
  onIncrease,
  onDecrease,
  unitPrice, // number (per person)
  currencySymbol = "₹",
}) {
  const total = typeof unitPrice === "number" ? unitPrice * people : undefined;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        {message && <p className="modal-message">{message}</p>}

        {showPeople && (
          <div className="people-section">
            <label className="people-label">Number of People</label>
            <div className="people-controls">
              <button
                className="qty-btn"
                onClick={onDecrease}
                aria-label="Decrease people"
              >
                −
              </button>
              <span className="people-count">{people}</span>
              <button
                className="qty-btn"
                onClick={onIncrease}
                aria-label="Increase people"
              >
                +
              </button>
            </div>

            {typeof total === "number" && (
              <div className="price-summary">
                <div className="row">
                  <span>Price per person</span>
                  <strong>
                    {currencySymbol}
                    {unitPrice.toLocaleString("en-IN")}
                  </strong>
                </div>
                <div className="row">
                  <span>Total</span>
                  <strong className="total">
                    {currencySymbol}
                    {total.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Confirm Booking
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
