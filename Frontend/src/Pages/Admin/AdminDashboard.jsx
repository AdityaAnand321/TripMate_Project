import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../Api/client';
import './AdminDashboard.css';
import { BarChart3, Calendar, CreditCard, Users as UsersIcon, Plane, MapPin, FileText } from 'lucide-react';
import { NavLink } from 'react-router-dom';
 

export default function AdminDashboard() {
  const user = useSelector((s) => s.auth && s.auth.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ totalUsers: 0, totalTrips: 0, totalBookings: 0, totalRevenue: 0 });
  const [trips, setTrips] = useState([]);
  const [tripForm, setTripForm] = useState({ destination:'', price:'', duration:'', seatsAvailable:'', description:'', image:'' });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [usersResp, statsResp, tripsResp] = await Promise.all([
          api.get('/api/users'),
          api.get('/api/admin/stats'),
          api.get('/api/admin/trips'),
        ]);
        setUsers(Array.isArray(usersResp) ? usersResp : []);
        setStats(statsResp || { totalUsers: 0, totalTrips: 0, totalBookings: 0, totalRevenue: 0 });
        setTrips(Array.isArray(tripsResp) ? tripsResp : []);
        setError('');
      } catch (err) {
        console.error('Failed to load admin data', err);
        setError('Failed to load admin data');
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

  const totalUsers = stats.totalUsers || users.length;
  const totalAdmins = users.filter((u) => u.isAdmin).length;

  // No chart on dashboard per request

  const recentUsers = useMemo(() => {
    const list = Array.isArray(users) ? [...users] : [];
    // Prefer createdAt desc if present, else by name/email
    list.sort((a,b) => {
      const ta = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (tb !== ta) return tb - ta;
      const sa = (a?.name || a?.email || '').toLowerCase();
      const sb = (b?.name || b?.email || '').toLowerCase();
      return sa.localeCompare(sb);
    });
    return list.slice(0,5);
  }, [users]);

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="brand">TripMate</div>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/admin/dashboard" className={({isActive}) => isActive ? 'active' : ''} end>
              <BarChart3 size={18}/> <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/trips" className={({isActive}) => isActive ? 'active' : ''}>
              <Plane size={18}/> <span>Trips</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={({isActive}) => isActive ? 'active' : ''}>
              <UsersIcon size={18}/> <span>Users</span>
            </NavLink>
          </li>
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

      {/* Content */}
      <main className="admin-content" id="overview">
        {/* Topbar */}
        <div className="topbar">
          <div className="search">
            <MapPin size={18} className="icon"/>
            <input placeholder="Search anything" />
          </div>
          <div className="topbar-right">
            <span className="badge-soft">Admin</span>
          </div>
        </div>

        <div className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p className="admin-subtitle">Overview of your platform metrics</p>
          </div>
        </div>

        {/* Quick access cards */}
        <div className="quick-grid">
          <div className="quick-card grad-blue">
            <div className="quick-title">Bookings</div>
            <div className="quick-value">{stats.totalBookings}</div>
          </div>
          <div className="quick-card grad-orange">
            <div className="quick-title">Trips</div>
            <div className="quick-value">{stats.totalTrips}</div>
          </div>
          <div className="quick-card grad-pink">
            <div className="quick-title">Users</div>
            <div className="quick-value">{totalUsers}</div>
          </div>
          <div className="quick-card grad-purple">
            <div className="quick-title">Revenue</div>
            <div className="quick-value">₹{(stats.totalRevenue || 0).toLocaleString()}</div>
          </div>
        </div>

        {/* Chart removed per request */}

        {/* Stats cards */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-value">{totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalAdmins}</div>
            <div className="stat-label">Admins</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalTrips}</div>
            <div className="stat-label">Total Trips</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalBookings}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">₹{(stats.totalRevenue || 0).toLocaleString()}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>

      {/* Users section moved to /admin/users */}

      {/* Trips management moved to /admin/trips */}

        {/* Recent Users preview */}
        <div className="card" style={{marginTop:16}}>
          <div className="section-header">
            <h2>Recent Users</h2>
            <NavLink to="/admin/users" className="btn-outline">View all</NavLink>
          </div>
          <div className="table-wrap">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u._id || u.email}>
                    <td>{u.name || '-'}</td>
                    <td className="mono">{u.email}</td>
                    <td><span className={`chip ${u.isBlocked ? 'chip-warn' : 'chip-success'}`}>{u.isBlocked ? 'Suspended' : 'Active'}</span></td>
                    <td>{u.isAdmin ? 'Admin' : 'User'}</td>
                    <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}</td>
                    <td>
                      <NavLink className="btn-outline" to={`/admin/users/${encodeURIComponent(u.email)}`}>View</NavLink>
                    </td>
                  </tr>
                ))}
                {recentUsers.length === 0 && (
                  <tr><td colSpan={6} className="empty">No users yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
