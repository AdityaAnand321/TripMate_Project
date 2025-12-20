import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import place from '../../Api/detail';
import Header from './header';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTags,
  FaStar,
  FaUmbrellaBeach,
  FaWater,
  FaFish,
  FaUtensils,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import './Details.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Confirm from '../../Components/ConfirmBooking/confirm';
import { add } from "../../../src/redux/Boooking";
import Footer from '../../Components/layout/Footer';

export default function Details() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [people, setPeople] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth && s.auth.user);

  const parsePrice = (priceStr) => {
    // expects format like "₹50,000" => 50000 number
    if (!priceStr) return 0;
    const n = parseInt(String(priceStr).replace(/[^0-9]/g, ''), 10);
    return isNaN(n) ? 0 : n;
  };

  const handleBooking = () => {
    const unit = parsePrice(data?.package?.totalCost);
    const total = unit * people;
    const bookedAt = new Date().toISOString();

    const payload = {
      ...data,
      booking: {
        people,
        unitPrice: unit,
        total,
        bookedAt,
      },
    };

    dispatch(add(payload));
    toast.success("Booked Successfully!");
    setShowModal(false);
  };

  const handleBookClick = () => {
    if (!user || !user.isLogged) {
      toast.error("Please login to continue booking");
      navigate("/login");
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        const result = place.find((place) => place.id === id);
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
      <>
        <Header user={user} />
        <div className="beach-details-container">
          {/* Hero Skeleton */}
          <div className="hero-section skeleton hero-skeleton"></div>

          {/* Content Skeleton */}
          <div className="content-wrapper">
            <div className="description-section">
              <div className="section-header">
                <div className="skeleton skeleton-circle icon-circle"></div>
                <div style={{ flex: 1 }}>
                  <div className="skeleton skeleton-text skeleton-text-lg" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="skeleton skeleton-text skeleton-text-md" style={{ width: '90%' }}></div>
              <div className="skeleton skeleton-text skeleton-text-md" style={{ width: '85%' }}></div>
              <div className="skeleton skeleton-text skeleton-text-md" style={{ width: '80%' }}></div>

              <div className="features-grid" style={{ marginTop: 20 }}>
                <div className="skeleton card-skeleton"></div>
                <div className="skeleton card-skeleton"></div>
                <div className="skeleton card-skeleton"></div>
              </div>
            </div>

            <div className="package-section">
              <div className="skeleton package-skeleton"></div>
              <div className="skeleton skeleton-text" style={{ width: '70%', marginTop: 16 }}></div>
              <div className="skeleton skeleton-text" style={{ width: '50%' }}></div>
              <div className="skeleton skeleton-button" style={{ width: 180, marginTop: 12 }}></div>
            </div>
          </div>
        </div>
      </>
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
          <button
            className="home-btn"
            onClick={() => (window.location.href = '/')}
          >
            Return to Beaches
          </button>
        </div>
      </div>
    );
  }

  return (
    // </Header>
    <>
  <Header user={user} />
      <div className="beach-details-container">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${data.image})`,
        }}
      >
        <div className="hero-content">
          <h1>
            <FaUmbrellaBeach /> {data.name}
          </h1>
          <div className="location-rating">
            <div className="location">
              <FaMapMarkerAlt /> {data.city}, {data.state}
            </div>
            <div className="rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar /> 4.9
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
                <li>
                  <FaCheckCircle /> Sunset Cruise
                </li>
                <li>
                  <FaCheckCircle /> Snorkeling Equipment
                </li>
              </ul>
            </div>

            <div className="emi-section">
              <FaMoneyBillWave />
              <p>
                Easy EMI Option: <strong>{data.package.emi}</strong>
              </p>
            </div>

            <button className="book-now-btn" onClick={handleBookClick}>
              Book Your Beach Getaway
            </button>

            {showModal && (
              <div className="confirm">
                <Confirm
                  title="Confirm Booking"
                  message="Review your booking details before confirming."
                  showPeople
                  people={people}
                  onIncrease={() => setPeople((p) => Math.min(10, p + 1))}
                  onDecrease={() => setPeople((p) => Math.max(1, p - 1))}
                  unitPrice={parsePrice(data?.package?.totalCost)}
                  onConfirm={handleBooking}
                  onCancel={() => setShowModal(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="id-tag">Destination ID: {data.id}</div>
    </div>
    <Footer />
    </>
  );
}
