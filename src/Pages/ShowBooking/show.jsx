import React, { useState } from 'react';
import './show.css';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../../redux/Boooking';
import { FaMapMarkerAlt, FaUsers, FaRupeeSign, FaClock } from 'react-icons/fa';
import Modal from '../../Components/common/Modal';


const Show = () => {
  const bookings = useSelector(state => state.booking);
  const dispatch = useDispatch();

  const formatCurrency = (num, fallback) => {
    if (typeof num === 'number' && Number.isFinite(num)) {
      return `₹${num.toLocaleString('en-IN')}`;
    }
    return fallback ?? '-';
  };

  const parsePrice = (val) => {
    if (val == null) return null;
    const cleaned = String(val).replace(/[^0-9.]/g, '');
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : null;
  };

  const formatDateTime = (iso) => {
    try {
      if (!iso) return '-';
      const d = new Date(iso);
      if (isNaN(d.getTime())) return '-';
      return d.toLocaleString('en-IN', {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return '-';
    }
  };

  const [cancelOpen, setCancelOpen] = useState(false);
  const [toCancelId, setToCancelId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsItem, setDetailsItem] = useState(null);

  const openCancel = (id) => { setToCancelId(id); setCancelOpen(true); };
  const confirmCancel = () => {
    if (toCancelId) {
      dispatch(remove(toCancelId));
    }
    setCancelOpen(false);
    setToCancelId(null);
  };
  const openDetails = (item) => { setDetailsItem(item); setDetailsOpen(true); };

  return (
    <div className="main-content22">
      <h2 className="heading">Booked Places</h2>

      {bookings.length === 0 ? (
        <p className="empty-text">No bookings yet.</p>

      ) : (
        <div className="bookings-row">
          {bookings.map((place, index) => {
            const totalNumber =
              place?.booking?.total ?? place.total ?? parsePrice(place?.package?.totalCost);
            const totalDisplay = formatCurrency(totalNumber, place?.package?.totalCost ?? place.totalCost);
            const people = place?.booking?.people ?? place.people ?? 1;
            const bookedAt = formatDateTime(place?.booking?.bookedAt ?? place.bookedAt);

            return (
              <div className="booking-card" key={place.id || index}>
                <img
                  src={place.image}
                  alt={place.name}
                  className="booking-image"
                />
                <div className="booking-info">
                  <h3 className="booking-title">{place.name}</h3>
                  <p className="booking-location">
                    <FaMapMarkerAlt />
                    <span>{place.city}, {place.state}</span>
                  </p>

                  <div className="booking-meta">
                    <div className="meta-row">
                      <FaUsers className="meta-icon" />
                      <span>{people} {people === 1 ? 'person' : 'people'}</span>
                    </div>
                    <div className="meta-row">
                      <FaRupeeSign className="meta-icon" />
                      <span>Total: {totalDisplay}</span>
                    </div>
                    <div className="meta-row">
                      <FaClock className="meta-icon" />
                      <span>{bookedAt}</span>
                    </div>
                  </div>

                  <div className="actions-row">
                    <button
                      className="details-btn"
                      onClick={() => openDetails(place)}
                    >
                      Details
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => openCancel(place.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel confirmation modal */}
      <Modal
        isOpen={cancelOpen}
        title="Cancel Booking"
        onClose={() => setCancelOpen(false)}
        actions={(
          <>
            <button className="btn btn-secondary" onClick={() => setCancelOpen(false)}>No</button>
            <button className="btn btn-danger" onClick={confirmCancel}>Yes, Cancel</button>
          </>
        )}
      >
        Are you sure you want to cancel this trip?
      </Modal>

      {/* Details modal */}
      <Modal
        isOpen={detailsOpen}
        title="Booking Details"
        onClose={() => setDetailsOpen(false)}
        actions={(<button className="btn" onClick={() => setDetailsOpen(false)}>Close</button>)}
      >
        {detailsItem && (
          <div className="details-content">
            <div className="details-row"><strong>Destination:</strong> <span>{detailsItem.name}</span></div>
            <div className="details-row"><strong>Location:</strong> <span>{detailsItem.city}, {detailsItem.state}</span></div>
            <div className="details-row"><strong>People:</strong> <span>{(detailsItem?.booking?.people ?? detailsItem.people ?? 1)}</span></div>
            <div className="details-row"><strong>Total:</strong> <span>{formatCurrency(detailsItem?.booking?.total ?? detailsItem.total ?? parsePrice(detailsItem?.package?.totalCost), detailsItem?.package?.totalCost)}</span></div>
            <div className="details-row"><strong>Booked At:</strong> <span>{formatDateTime(detailsItem?.booking?.bookedAt ?? detailsItem.bookedAt)}</span></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Show;
