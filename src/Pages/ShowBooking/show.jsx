import React from 'react';
import './show.css';
import { useSelector,useDispatch } from 'react-redux';
import { remove } from '../../redux/Boooking';


const Show = () => {
  const bookings = useSelector(state => state.booking);
  const dispatch=useDispatch();

  return (
    <div className="main-content22">
      <h2 className="heading">Booked Places</h2>

      {bookings.length === 0 ? (
        <p className="empty-text">No bookings yet.</p>

      ) : (
        <div className="bookings-row">
          {bookings.map((place, index) => (
            <div className="booking-card" key={place.id || index}>
              <img
                src={place.image}
                alt={place.name}
                className="booking-image"
              />
              <div className="booking-info">
                <h3 className="booking-title">{place.name}</h3>
                <p className="booking-location">
                  {place.city}, {place.state}
                </p>
                <button className="cancel-btn" onClick={()=>dispatch(remove(place.id))}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Show;
