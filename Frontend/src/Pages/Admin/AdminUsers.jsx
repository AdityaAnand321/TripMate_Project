import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../Api/client';
import './AdminDashboard.css';
import { BarChart3, Users as UsersIcon, Plane, Calendar, CreditCard, FileText, MapPin, Download, Plus, Edit, Eye, Trash2, ChevronLeft, ChevronRight, ChevronDown, Lock, Unlock } from 'lucide-react';

function timeAgo(d) {
  if (!d) return '-';
  const t = typeof d === 'string' ? new Date(d).getTime() : (d?.getTime?.() || d);
  if (!t) return '-';
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`;
  const dys = Math.floor(h / 24); if (dys < 30) return `${dys}d ago`;
  const mo = Math.floor(dys / 30); if (mo < 12) return `${mo}mo ago`;
  const y = Math.floor(mo / 12); return `${y}y ago`;
}

function toCsv(rows, headers) {
  const esc = (v) => {
    const s = v == null ? '' : String(v);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  const lines = [];
  lines.push(headers.map(h => esc(h.label)).join(','));
  for (const r of rows) {
    lines.push(headers.map(h => esc(typeof h.get === 'function' ? h.get(r) : r[h.key])).join(','));
  }
  return lines.join('\n');
}

export default function AdminUsers() {
  const user = useSelector((s) => s.auth && s.auth.user);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('all'); // all | admin | user
  const [status, setStatus] = useState('all'); // all | active | inactive | suspended | banned | pending
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await api.get('/api/users');
        setUsers(Array.isArray(resp) ? resp : []);
        setError('');
      } catch (e) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function setBlocked(email, blocked) {
    try {
      await api.put(`/api/admin/users/${encodeURIComponent(email)}/blocked`, { blocked });
      setUsers((prev) => prev.map((u) => u.email === email ? { ...u, isBlocked: !!blocked } : u));
    } catch (e) {
      setError(blocked ? 'Failed to suspend user' : 'Failed to activate user');
    }
  }

  const filtered = useMemo(() => {
    let list = users.map(u => ({
      ...u,
      username: (u.email || '').split('@')[0],
      roleLabel: u.isAdmin ? 'Admin' : 'User',
      statusLabel: u.isBlocked ? 'Suspended' : 'Active',
      joinedAt: u.createdAt || null,
      lastActive: u.lastLogin || null,
    }));
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(u =>
        (u.name || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q) ||
        (u.username || '').toLowerCase().includes(q)
      );
    }
    if (role !== 'all') list = list.filter(u => (role === 'admin' ? u.isAdmin : !u.isAdmin));
    if (status !== 'all') {
      const map = {
        active: (u) => !u.isBlocked,
        inactive: (u) => false, // no field yet
        suspended: (u) => !!u.isBlocked,
        banned: (u) => false,
        pending: (u) => false,
      };
      list = list.filter(map[status] || (()=>true));
    }
    return list;
  }, [users, query, role, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const pageSafe = Math.min(page, totalPages);
  const visible = useMemo(() => {
    const start = (pageSafe - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, pageSafe, rowsPerPage]);

  function exportCsv() {
    const headers = [
      { key: 'name', label: 'Full Name' },
      { key: 'email', label: 'Email' },
      { key: 'username', label: 'Username' },
      { key: 'statusLabel', label: 'Status' },
      { key: 'roleLabel', label: 'Role' },
      { label: 'Joined Date', get: (r) => r.joinedAt ? new Date(r.joinedAt).toISOString() : '' },
      { label: 'Last Active', get: (r) => r.lastActive ? new Date(r.lastActive).toISOString() : '' },
    ];
    const csv = toCsv(filtered, headers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    URL.revokeObjectURL(url);
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

      <main className="admin-content user-mgmt">
        <div className="topbar">
          <div />
          <span className="badge-soft">Admin</span>
        </div>

        <div className="user-mgmt-header">
          <h1>User Management</h1>
          <p>Manage all users in one place. Control access, assign roles, and monitor activity.</p>
        </div>

        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search"><MapPin size={16} className="icon"/><input value={query} onChange={(e)=>{setQuery(e.target.value); setPage(1);}} placeholder="Search"/></div>
            <div className="dropdown" onClick={(e)=>e.currentTarget.classList.toggle('open')}>
              <button className="btn-outline"><span>Role</span><ChevronDown size={14}/></button>
              <div className="menu">
                {['all','admin','user'].map(r=> (
                  <button key={r} onClick={()=>{setRole(r); setPage(1);}} className={role===r?'active':''}>{r[0].toUpperCase()+r.slice(1)}</button>
                ))}
              </div>
            </div>
            <div className="dropdown" onClick={(e)=>e.currentTarget.classList.toggle('open')}>
              <button className="btn-outline"><span>Status</span><ChevronDown size={14}/></button>
              <div className="menu">
                {['all','active','suspended','inactive','banned','pending'].map(s=> (
                  <button key={s} onClick={()=>{setStatus(s); setPage(1);}} className={status===s?'active':''}>{s[0].toUpperCase()+s.slice(1)}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="toolbar-right">
            <button className="btn-outline" onClick={exportCsv}><Download size={16}/> <span>Export</span></button>
            <button className="btn-primary" onClick={() => navigate('/signup')}><Plus size={16}/> <span>Add User</span></button>
          </div>
        </div>

        <div className="card">
          {loading && <div className="loading">Loading users…</div>}
          {error && <div className="error-text">{error}</div>}
          {!loading && !error && (
            <div className="table-wrap">
              <table className="user-table">
                <thead>
                  <tr>
                    <th style={{width:28}}><input type="checkbox" aria-label="Select all"/></th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Joined Date</th>
                    <th>Last Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((u) => (
                    <tr key={u._id}>
                      <td><input type="checkbox" aria-label={`Select ${u.name || u.email}`}/></td>
                      <td>{u.name || '-'}</td>
                      <td className="mono">{u.email}</td>
                      <td className="mono">{(u.email||'').split('@')[0]}</td>
                      <td>
                        <span className={`chip ${u.isBlocked ? 'chip-warn' : 'chip-success'}`}>{u.isBlocked ? 'Suspended' : 'Active'}</span>
                      </td>
                      <td>{u.isAdmin ? 'Admin' : 'User'}</td>
                      <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}</td>
                      <td>{timeAgo(u.lastLogin)}</td>
                      <td>
                        <button className="icon-btn" title="View" onClick={() => navigate(`/admin/users/${encodeURIComponent(u.email)}`)}><Eye size={16}/></button>
                        <button className="icon-btn" title="Edit"><Edit size={16}/></button>
                        {u.isBlocked ? (
                          <button className="icon-btn" title="Activate user" onClick={() => setBlocked(u.email, false)}><Unlock size={16}/></button>
                        ) : (
                          <button className="icon-btn" title="Suspend user" onClick={() => setBlocked(u.email, true)}><Lock size={16}/></button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {visible.length === 0 && (
                    <tr><td colSpan={9} className="empty">No users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className="pager">
            <div className="rows">
              <span>Rows per page</span>
              <select value={rowsPerPage} onChange={(e)=>{setRowsPerPage(Number(e.target.value)); setPage(1);}}>
                {[10,20,50].map(n=> <option key={n} value={n}>{n}</option>)}
              </select>
              <span>of {filtered.length} rows</span>
            </div>
            <div className="pages">
              <button className="icon-btn" onClick={()=>setPage(1)} disabled={pageSafe===1}>{'«'}</button>
              <button className="icon-btn" onClick={()=>setPage(Math.max(1,pageSafe-1))} disabled={pageSafe===1}><ChevronLeft size={16}/></button>
              <span className="page-indicator">{pageSafe} / {totalPages}</span>
              <button className="icon-btn" onClick={()=>setPage(Math.min(totalPages,pageSafe+1))} disabled={pageSafe===totalPages}><ChevronRight size={16}/></button>
              <button className="icon-btn" onClick={()=>setPage(totalPages)} disabled={pageSafe===totalPages}>{'»'}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
