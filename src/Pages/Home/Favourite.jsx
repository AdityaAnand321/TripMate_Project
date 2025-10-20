import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import './Favourite.css'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { toggleFavourite } from '../../redux/favouritesSlice';
import { toast } from 'react-toastify';

export default function Favourite() {
  const favourites = useSelector((state) => state.favourites);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!favourites || favourites.length === 0) {
    return (
      <div className="favourites-page">
        <div className="empty-fav">
          <h2>No favourites yet ❤️</h2>
          <p>Add some trips you love and they’ll appear here.</p>
          <button className="fav-btn" onClick={() => navigate('/')}>Discover trips</button>
        </div>
      </div>
    );
  }

  const removeFromFav = (place) => {
    dispatch(toggleFavourite(place));
    toast.error('Removed from favourites');
  };

  const formatPrice = (str) => str || '-';

  return (
    <div className="favourites-page">
      <h2 className="fav-heading">Your Favourites</h2>

      <div className="fav-grid">
        {favourites.map((place) => (
          <div className="fav-card" key={place.id}>
            <img src={place.image} alt={place.name} className="fav-image" />

            <div className="fav-info">
              <div className="fav-title-row">
                <h3 className="fav-title">{place.name}</h3>
                {place?.package?.duration && (
                  <span className="fav-duration-badge">{place.package.duration}</span>
                )}
              </div>

              <p className="fav-location"><FaMapMarkerAlt/> {place.city}, {place.state}</p>

              <div className="fav-meta">
                {place?.package?.emi && (
                  <div className="meta-chip">{place.package.emi}</div>
                )}
                {place?.package?.totalCost && (
                  <div className="meta-chip">Total: {formatPrice(place.package.totalCost)}</div>
                )}
              </div>

              <div className="fav-actions">
                <button className="fav-btn" onClick={() => navigate(`/details/${place.id}`)}>Details</button>
                <button className="fav-btn danger" onClick={() => removeFromFav(place)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
