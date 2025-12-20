import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import api from '../../Api/client';
import './AdminDashboard.css';
import { BarChart3, Users as UsersIcon, Plane, Calendar, CreditCard, FileText, MapPin, ArrowLeft } from 'lucide-react';

export default function AdminUserDetail() {
  const { email } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((s) => s.auth && s.auth.user);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await api.get(`/api/admin/users/${encodeURIComponent(email)}`);
        setUser(resp && resp.user);
        setError('');
      } catch (e) {
        setError('Failed to load user');
      } finally {
        setLoading(false);
      }
    })();
  }, [email]);

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
          <div className="avatar" aria-hidden="true">{(currentUser?.name || 'A').slice(0,1)}</div>
          <div className="user-meta">
            <div className="user-name">{currentUser?.name || 'Admin'}</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </aside>

      <main className="admin-content user-detail">
        <div className="topbar">
          <button className="btn-outline" onClick={()=>navigate(-1)}><ArrowLeft size={16}/> <span>Back</span></button>
          <span className="badge-soft">Admin</span>
        </div>

        <div className="user-detail-header">
          <h1>User Details</h1>
          <p>View profile, favourites, and bookings.</p>
        </div>

        <div className="grid-2">
          <div className="profile-card">
            {loading && <div className="loading">Loading user…</div>}
            {error && <div className="error-text">{error}</div>}
            {!loading && !error && user && (
              <div className="profile">
                <div className="avatar-lg">{(user.name || user.email || 'U').slice(0,1).toUpperCase()}</div>
                <div className="profile-meta">
                  <div className="name">{user.name || '-'}</div>
                  <div className="email mono">{user.email}</div>
                  <div className="meta-row">
                    <span className={`chip ${user.isBlocked ? 'chip-warn' : 'chip-success'}`}>{user.isBlocked ? 'Suspended' : 'Active'}</span>
                    <span className="chip">{user.isAdmin ? 'Admin' : 'User'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="stats-card">
            {!loading && !error && user && (
              <div className="stats">
                <div className="stat"><div className="stat-value">{(user.favourites || []).length}</div><div className="stat-label">Favourites</div></div>
                <div className="stat"><div className="stat-value">{(user.bookings || []).length}</div><div className="stat-label">Bookings</div></div>
              </div>
            )}
          </div>
        </div>

        {!loading && !error && user && (
          <div className="grid-2">
            <div className="card">
              <div className="section-header"><h2>Favourites</h2></div>
              <div className="table-wrap">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(user.favourites || []).map((f, i) => (
                      <tr key={i}>
                        <td className="mono">{i+1}</td>
                        <td>{typeof f === 'string' ? f : (f?.destination || f?.name || 'Favourite')}</td>
                        <td className="mono">{f?.notes || '-'}</td>
                      </tr>
                    ))}
                    {(user.favourites || []).length === 0 && (
                      <tr><td colSpan={3} className="empty">No favourites</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <div className="section-header"><h2>Bookings</h2></div>
              <div className="table-wrap">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th>Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(user.bookings || []).map((b, i) => (
                      <tr key={b.id || i}>
                        <td className="mono">{b.id || i+1}</td>
                        <td>{b.status || 'pending'}</td>
                        <td>{typeof b.price === 'number' ? `₹${b.price.toLocaleString()}` : '-'}</td>
                        <td>{b.paid ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                    {(user.bookings || []).length === 0 && (
                      <tr><td colSpan={4} className="empty">No bookings</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
