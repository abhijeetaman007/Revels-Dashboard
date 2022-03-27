import React from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from '../pages/Loader/Loader';

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Loader />;
}
