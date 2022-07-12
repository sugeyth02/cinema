import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ redirectPath }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={redirectPath} />;
  }
  return <Outlet />;
}
