import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import place from '../../Api/detail';
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaTags, FaStar, FaUmbrellaBeach, FaWater, FaFish, FaUtensils, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './Details.css';
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import Confirm from '../../Components/ConfirmBooking/confirm';
import {add} from "../../../src/redux/Boooking";


export default function Details() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [btn,]

  const [showModal, setShowModal] = useState(false);

  const dispatch=useDispatch();
  
  const handleBooking = () => {
    toast.success("Booked Successfully!");
    setShowModal(false);
    dispatch(add(data));
  };



  useEffect(() => {
    try {
      // Simulate API call with timeout
      setLoading(true);
      setTimeout(() => {
        const result = place.find(place => place.id === id);
        if (result) {
          setData(result);
        } else {
          setError(`Destination with ID "${id}" not found`);
        }
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to load destination details');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="beach-loader">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="sand"></div>
          <div className="palm-tree">
            <div className="trunk"></div>
            <div className="leaves"></div>
          </div>
          <p>Loading paradise details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <FaExclamationTriangle className="error-icon" />
          <h2>Destination Not Found</h2>
          <p>{error}</p>
          <p>We couldn't find the paradise you're looking for.</p>
          <button className="home-btn" onClick={() => window.location.href = '/'}>
            Return to Beaches
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="beach-details-container">
      {/* Hero Section */}
      <div className="hero-section" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${data.image})`}}>
        <div className="hero-content">
          <h1><FaUmbrellaBeach /> {data.name}</h1>
          <div className="location-rating">
            <div className="location">
              <FaMapMarkerAlt /> {data.city}, {data.state}
            </div>
            <div className="rating">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> 4.9
            </div>
          </div>
          <div className="hero-tag">{data.city} Best Location</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="description-section">
          <div className="section-header">
            <div className="icon-circle">
              <FaWater />
            </div>
            <h2>About this Paradise</h2>
          </div>
          <p className="description-text">{data.description}</p>
          <p className="additional-info">
            Nestled on Havelock Island, Radhanagar Beach boasts over 2 kilometers of pristine white sand 
            and crystal-clear turquoise waters. This award-winning destination offers the perfect tropical 
            escape with stunning sunsets, vibrant marine life, and lush surrounding greenery.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaWater />
              </div>
              <h3>Crystal Waters</h3>
              <p>Perfect for swimming & snorkeling</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaFish />
              </div>
              <h3>Marine Life</h3>
              <p>Vibrant coral reefs & tropical fish</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaUtensils />
              </div>
              <h3>Beach Dining</h3>
              <p>Fresh seafood & tropical cocktails</p>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="package-section">
          <div className="section-header">
            <div className="icon-circle">
              <FaTags />
            </div>
            <h2>Package Details</h2>
          </div>

          <div className="package-card">
            <div className="package-header">
              <div className="duration">
                <FaCalendarAlt /> {data.package.duration}
              </div>
              <div className="price1">{data.package.totalCost}</div>
            </div>

            <div className="inclusions">
              <h3>What's Included</h3>
              <ul>
                {data.package.inclusions.map((item, index) => (
                  <li key={index}>
                    <FaCheckCircle /> {item}
                  </li>
                ))}
                <li><FaCheckCircle /> Sunset Cruise</li>
                <li><FaCheckCircle /> Snorkeling Equipment</li>
              </ul>
            </div>

            <div className="emi-section">
              <FaMoneyBillWave />
              <p>Easy EMI Option: <strong>{data.package.emi}</strong></p>
            </div>

      <button className="book-now-btn" onClick={() => {setShowModal(true)}}>
        Book Your Beach Getaway
      </button>

      {showModal && (
        <Confirm
          title="Confirm Booking"
          message="Are you sure you want to book this trip?"
          onConfirm={handleBooking}
          onCancel={() => setShowModal(false)}
        />
      )}
          </div>
        </div>
      </div>

      <div className="id-tag">
        Destination ID: {data.id}
      </div>
    </div>
  );
}