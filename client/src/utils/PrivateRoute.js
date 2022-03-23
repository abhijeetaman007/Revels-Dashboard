import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  // change before push
  // return auth.user ? children : <Navigate to="/dashboard/profile" />;
  return auth.user ? children : <Navigate to="/" />;
}
