import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function RequireAdmin({ children }) {
  const user = useSelector((s) => s.auth && s.auth.user);

  if (!user || !user.isLogged) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />;

  return children;
}
