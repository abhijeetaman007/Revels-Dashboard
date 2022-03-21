import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../pages/Loader/Loader";

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(auth.loading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [auth.loading])
  return (loading ? <Loader /> : (auth.user && !auth.loading)) ? children : <Navigate to="/" />;
}
