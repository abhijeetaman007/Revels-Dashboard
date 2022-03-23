<<<<<<< HEAD
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  // change before push
  // return auth.user ? children : <Navigate to="/dashboard/profile" />;
  return auth.user ? children : <Navigate to="/" />;
=======
import React from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../pages/Loader/Loader";

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Loader />;
>>>>>>> d761d6ecd740bde5a9a30ba319ff5ee3825e0135
}
