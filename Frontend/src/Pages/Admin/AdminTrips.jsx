import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import api from '../../Api/client';
import './AdminDashboard.css';
import { BarChart3, Users as UsersIcon, Plane, Calendar, CreditCard, FileText, MapPin } from 'lucide-react';

export default function AdminTrips() {
  const user = useSelector((s) => s.auth && s.auth.user);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tripForm, setTripForm] = useState({ destination:'', price:'', duration:'', seatsAvailable:'', description:'', image:'' });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await api.get('/api/admin/trips');
        setTrips(Array.isArray(resp) ? resp : []);
        setError('');
      } catch (e) {
        setError('Failed to load trips');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function addTrip(e) {
    e.preventDefault();
    try {
      const body = {
        destination: tripForm.destination,
        price: Number(tripForm.price) || 0,
        duration: tripForm.duration,
        seatsAvailable: Number(tripForm.seatsAvailable) || 0,
        description: tripForm.description,
        image: tripForm.image,
      };
      const resp = await api.post('/api/admin/trips', body);
      const created = resp && resp.trip;
      if (created) setTrips((prev) => [created, ...prev]);
      setTripForm({ destination:'', price:'', duration:'', seatsAvailable:'', description:'', image:'' });
    } catch (err) {
      console.error('Create trip failed', err);
      setError('Create trip failed');
    }
  }

  async function deleteTrip(id) {
    try {
      await api.del(`/api/admin/trips/${encodeURIComponent(id)}`);
      setTrips((prev) => prev.filter((t) => String(t._id) !== String(id)));
    } catch (err) {
      console.error('Delete trip failed', err);
      setError('Delete trip failed');
    }
  }

  async function setCompleted(id, completed) {
    try {
      const resp = await api.put(`/api/admin/trips/${encodeURIComponent(id)}`, { completed });
      const updated = resp && resp.trip;
      if (updated) {
        setTrips((prev) => prev.map((t) => String(t._id) === String(id) ? updated : t));
      }
    } catch (err) {
      console.error('Update trip status failed', err);
      setError('Failed to update trip status');
    }
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">TripMate</div>
        <ul className="sidebar-nav">
          <li><NavLink to="/admin/dashboard" className={({isActive})=>isActive?'active':''} end><BarChart3 size={18}/> <span>Dashboard</span></NavLink></li>
          <li><NavLink to="/admin/trips" className={({isActive})=>isActive?'active':''}><Plane size={18}/> <span>Trips</span></NavLink></li>
          <li><NavLink to="/admin/users" className={({isActive})=>isActive?'active':''}><UsersIcon size={18}/> <span>Users</span></NavLink></li>
          <li><a className="disabled" title="Coming soon"><CreditCard size={18}/> <span>Payments</span></a></li>
          <li><a className="disabled" title="Coming soon"><FileText size={18}/> <span>Reports</span></a></li>
          <li><a className="disabled" title="Coming soon"><Calendar size={18}/> <span>Calendar</span></a></li>
        </ul>
        <div className="sidebar-user">
          <div className="avatar" aria-hidden="true">{(user?.name || 'A').slice(0,1)}</div>
          <div className="user-meta">
            <div className="user-name">{user?.name || 'Admin'}</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </aside>

      <main className="admin-content">
        <div className="topbar">
          <div className="search">
            <MapPin size={18} className="icon"/>
            <input placeholder="Search anything" />
          </div>
          <span className="badge-soft">Admin</span>
        </div>

        <div className="admin-header">
          <div>
            <h1>Trips</h1>
            <p className="admin-subtitle">Create and manage trips</p>
          </div>
        </div>

        <div className="admin-section">
          <div className="section-header"><h2>Add New Trip</h2></div>
          <div style={{ padding: 16 }}>
            <form onSubmit={addTrip} className="trip-form">
              <div className="form-row">
                <input placeholder="Destination" value={tripForm.destination} onChange={(e)=>setTripForm({ ...tripForm, destination: e.target.value })} required />
                <input type="number" placeholder="Price" value={tripForm.price} onChange={(e)=>setTripForm({ ...tripForm, price: e.target.value })} required />
                <input placeholder="Duration (e.g., 3N/4D)" value={tripForm.duration} onChange={(e)=>setTripForm({ ...tripForm, duration: e.target.value })} required />
                <input type="number" placeholder="Seats" value={tripForm.seatsAvailable} onChange={(e)=>setTripForm({ ...tripForm, seatsAvailable: e.target.value })} />
              </div>
              <div className="form-row">
                <input placeholder="Image URL" value={tripForm.image} onChange={(e)=>setTripForm({ ...tripForm, image: e.target.value })} />
              </div>
              <div className="form-row">
                <textarea placeholder="Description" value={tripForm.description} onChange={(e)=>setTripForm({ ...tripForm, description: e.target.value })} />
              </div>
              <button type="submit" className="btn-primary">Add Trip</button>
            </form>
          </div>
        </div>

        <div className="admin-section" style={{ marginTop: 16 }}>
          <div className="section-header"><h2>All Trips</h2></div>
          {loading && <div className="loading">Loading trips…</div>}
          {error && <div className="error-text">{error}</div>}
          {!loading && !error && (
            <div className="table-wrap" style={{ marginTop: 12 }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Destination</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Seats</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((t) => (
                    <tr key={t._id}>
                      <td>{t.destination}</td>
                      <td>₹{Number(t.price).toLocaleString()}</td>
                      <td>{t.duration}</td>
                      <td>{t.seatsAvailable}</td>
                      <td>
                        <span className={`chip ${t.completed ? 'chip-warn' : 'chip-success'}`}>{t.completed ? 'Completed' : 'Active'}</span>
                      </td>
                      <td>
                        {t.completed ? (
                          <button className="btn-outline" onClick={() => setCompleted(t._id, false)}>Mark Active</button>
                        ) : (
                          <button className="btn-outline" onClick={() => setCompleted(t._id, true)}>Mark Completed</button>
                        )}
                        <button className="btn-danger" style={{marginLeft:8}} onClick={() => deleteTrip(t._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {trips.length === 0 && (
                    <tr>
                      <td colSpan={6} className="empty">No trips found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
