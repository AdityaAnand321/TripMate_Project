import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../redux/authSlice';
import api from '../Api/client';

export default function AuthGate({ children }) {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await api.get('/api/users/me');
        const u = resp && resp.user;
        if (mounted && u && u.email) {
          dispatch(setUser({
            name: u.name || '',
            email: u.email,
            isAdmin: !!u.isAdmin,
            isLogged: true,
          }));
        }
      } catch (_e) {
        if (mounted) dispatch(clearUser());
      } finally {
        if (mounted) setChecking(false);
      }
    })();
    return () => { mounted = false; };
  }, [dispatch]);

  if (checking) {
    return (
      <div style={{display:'grid',placeItems:'center',minHeight:'100vh',color:'#6b7280'}}>
        <div>Loading…</div>
      </div>
    );
  }

  return children;
}
