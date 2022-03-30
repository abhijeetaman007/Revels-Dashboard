import React from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from '../pages/Loader/Loader';

export default function AdminPrivateRoute({ children }) {
  const auth = useAuth();
  return auth.admin ? children : <Loader />;
}
