import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from '../../redux/authSlice';
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaGlobeAsia, FaCity, FaHeart, FaCalendarCheck, FaMapMarkerAlt, FaUsers, FaRupeeSign, FaCalendarAlt } from "react-icons/fa";


const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authUser = useSelector((s) => s.auth && s.auth.user);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    city: "",
    avatar: "",
  });
  const [editMode, setEditMode] = useState(false);

  // Auth guard
  useEffect(() => {
    if (!authUser || !authUser.isLogged) {
      navigate('/login');
      return;
    }
    // fetch latest profile from server
    (async () => {
      try {
        const data = await api.get('/api/users/me');
        if (data) {
          setUser({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            gender: data.gender || '',
            country: data.country || '',
            city: data.city || '',
            avatar: data.avatar || '',
          });
          dispatch(setUser({ name: data.name || '', email: data.email || '', isLogged: true }));
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    })();
  }, [authUser, navigate, dispatch]);

  // Remove auto-writing to localStorage; save explicitly via handleSave to backend

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const email = user.email;
    if (!email) {
      toast.error('Not authenticated');
      return;
    }
    try {
      const data = await api.put(`/api/users/${encodeURIComponent(email)}`, { name: user.name, phone: user.phone, country: user.country, city: user.city, avatar: user.avatar });
      const updated = data && data.user;
      if (updated) {
        dispatch(setUser({ name: updated.name || '', email: updated.email, isLogged: true }));
        setUser(updated);
        setEditMode(false);
        toast.success('Profile updated');
      } else {
        toast.error('Failed to save profile');
      }
    } catch (err) {
      console.error('Profile save error', err);
      toast.error(err.message || 'Unable to reach server');
    }
  };

  const handleCancel = () => {
    // reset to last saved values by re-fetching
    (async () => {
      try {
        const data = await api.get('/api/users/me');
        if (data) {
          setUser({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            gender: data.gender || '',
            country: data.country || '',
            city: data.city || '',
            avatar: data.avatar || '',
          });
        }
      } catch (err) {
        console.error('Failed to refresh profile', err);
      }
    })();
    setEditMode(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUser({ ...user, avatar: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Stats and data
  const favouritesCount = useSelector((state) => state.favourites?.length || 0);
  const bookings = useSelector((state) => state.booking || []);
  const bookingsCount = bookings.length;

  // Trip helpers
  const extractDays = (item) => {
    if (typeof item?.days === 'number' && item.days > 0) return item.days;
    const dur = item?.package?.duration || '';
    const m = dur.match(/(\d+)D/i);
    if (m) return parseInt(m[1], 10);
    return 3; // default
  };
  const startDateOf = (b) => {
    const s = b?.booking?.startDate || b?.booking?.bookedAt || b?.bookedAt;
    return s ? new Date(s) : new Date();
  };
  const endDateOf = (b) => {
    const start = startDateOf(b);
    const days = extractDays(b);
    const end = new Date(start);
    end.setDate(end.getDate() + days);
    return end;
  };
  const now = new Date();
  const upcomingTrips = bookings.filter((b) => now <= endDateOf(b));
  const pastTrips = bookings.filter((b) => now > endDateOf(b));
  const fmtDate = (d) => d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
  const formatCurrencyOrFallback = (num, fallbackCost) => {
    if (typeof num === 'number' && Number.isFinite(num)) {
      return `₹${num.toLocaleString('en-IN')}`;
    }
    return fallbackCost || '₹-';
  };

  return (
    <div className="profile-container">
      {/* Hero */}
      <div className="profile-hero">
        <div className="hero-content">
          <label className="avatar-wrap">
            <img
              src={user.avatar || "https://i.pravatar.cc/120"}
              alt="Profile"
              className="avatar"
            />
            {editMode && <input type="file" onChange={handleImageChange} />}
          </label>
          <div className="hero-text">
            <h2>{user.name || "Your Name"}</h2>
            <p><FaEnvelope /> {user.email || "you@example.com"}</p>
          </div>

          <div className="hero-actions">
            {editMode ? (
              <>
                <button className="btn secondary" onClick={handleCancel}>Cancel</button>
                <button className="btn primary" onClick={handleSave}>Save changes</button>
              </>
            ) : (
              <button className="btn primary" onClick={() => setEditMode(true)}>Edit profile</button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bookings"><FaCalendarCheck /></div>
          <div className="stat-info">
            <div className="stat-value">{bookingsCount}</div>
            <div className="stat-label">Bookings</div>
          </div>
          <button className="stat-cta" onClick={() => navigate('/booked')}>View</button>
        </div>
        <div className="stat-card">
          <div className="stat-icon favs"><FaHeart /></div>
          <div className="stat-info">
            <div className="stat-value">{favouritesCount}</div>
            <div className="stat-label">Favourites</div>
          </div>
          <button className="stat-cta" onClick={() => navigate('/favourite')}>View</button>
        </div>
      </div>

      {/* Personal details */}
      <div className="profile-card">
        <h3>Personal Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label><FaUserCircle /> Full name</label>
            <input name="name" value={user.name} onChange={handleChange} readOnly={!editMode} placeholder="Your full name" />
          </div>
          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input name="email" value={user.email} onChange={handleChange} readOnly={!editMode} placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label><FaPhoneAlt /> Phone</label>
            <input name="phone" value={user.phone || ""} onChange={handleChange} readOnly={!editMode} placeholder="+91-XXXXXXXXXX" />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="profile-card">
        <h3>Address</h3>
        <div className="form-grid">
          <div className="form-group">
            <label><FaGlobeAsia /> Country</label>
            <input name="country" value={user.country || ""} onChange={handleChange} readOnly={!editMode} placeholder="India" />
          </div>
          <div className="form-group">
            <label><FaCity /> City/State</label>
            <input name="city" value={user.city || ""} onChange={handleChange} readOnly={!editMode} placeholder="City, State" />
          </div>
        </div>
      </div>

      {/* Trips */}
      <div className="profile-card trips-card">
        <h3>Your Trips</h3>
        <div className="trips-section">
          <div className="trips-column">
            <h4 className="trips-heading">Upcoming</h4>
            {upcomingTrips.length === 0 ? (
              <p className="empty-trip">No upcoming trips yet</p>
            ) : (
              <div className="trip-grid">
                {upcomingTrips.map((b, i) => {
                  const start = startDateOf(b);
                  const end = endDateOf(b);
                  const total = b?.booking?.total;
                  const people = b?.booking?.people ?? 1;
                  return (
                    <div className="trip-card" key={b.id || i}>
                      <img className="trip-image" src={b.image} alt={b.name} />
                      <div className="trip-info">
                        <h4 className="trip-title">{b.name}</h4>
                        <div className="trip-meta"><FaMapMarkerAlt /> {b.city}, {b.state}</div>
                        <div className="trip-dates"><FaCalendarAlt /> {fmtDate(start)} - {fmtDate(end)}</div>
                        <div className="trip-bottom">
                          <div className="trip-mini">
                            <span><FaUsers /> {people}</span>
                            <span><FaRupeeSign /> {formatCurrencyOrFallback(total, b?.package?.totalCost)}</span>
                          </div>
                          <button className="stat-cta" onClick={() => navigate('/booked')}>View Booking</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="trips-column">
            <h4 className="trips-heading">Previous</h4>
            {pastTrips.length === 0 ? (
              <p className="empty-trip">No past trips yet</p>
            ) : (
              <div className="trip-grid">
                {pastTrips.map((b, i) => {
                  const start = startDateOf(b);
                  const end = endDateOf(b);
                  const total = b?.booking?.total;
                  const people = b?.booking?.people ?? 1;
                  return (
                    <div className="trip-card" key={b.id || i}>
                      <img className="trip-image" src={b.image} alt={b.name} />
                      <div className="trip-info">
                        <h4 className="trip-title">{b.name}</h4>
                        <div className="trip-meta"><FaMapMarkerAlt /> {b.city}, {b.state}</div>
                        <div className="trip-dates"><FaCalendarAlt /> {fmtDate(start)} - {fmtDate(end)}</div>
                        <div className="trip-bottom">
                          <div className="trip-mini">
                            <span><FaUsers /> {people}</span>
                            <span><FaRupeeSign /> {formatCurrencyOrFallback(total, b?.package?.totalCost)}</span>
                          </div>
                          <button className="stat-cta" onClick={() => navigate('/booked')}>View Booking</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
