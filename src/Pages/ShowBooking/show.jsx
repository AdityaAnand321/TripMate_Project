import React from 'react';
import { useSelector } from 'react-redux';

const Show = () => {
  const bookings = useSelector(state => state.booking);

  return (
    <div>
      <h2>Booked Places</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((place, index) => (
          <div key={place.id || index}>
            <h3>{place.name}</h3>
            <p>{place.city}, {place.state}</p>
            <img src={place.image} alt={place.name} width="200" />
          </div>
        ))
      )}
    </div>
  );
};

export default Show;
