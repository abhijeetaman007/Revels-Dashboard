import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import { TOKEN_ID } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const restoreUser = async () => {
    const token = localStorage.getItem(TOKEN_ID);
    if (token) {
      try {
        const token = localStorage.getItem(TOKEN_ID);
        const res = await axios.get(`/admin/category/${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          console.log("from 30");

          setUser(res.data.data);
          setLoading(false);
          navigate(`/admin/${res.data.data.category}`);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  // method to handle user registration
  const userRegister = async (
        name,
        email,
        password,
        mobileNumber,
        registrationNumber,
        branch,
        college,
        state,
        isMahe
    ) => {
    try {
      const res = await axios.post("/api/user/register", {
        name,
        email,
        password,
        mobileNumber,
        registrationNumber,
        branch,
        college,
        state,
        isMahe
      });
      if (!res.data.success) return res.data;
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // method to handle user login
  const userLogin = async (email, password) => {
    try {
      const res = await axios.post("/api/user/login", {
        email,
        password,
      });
      if (!res.data.success) return res.data;

      localStorage.setItem(TOKEN_ID, res.data.data.token);
      restoreUser();
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // method to handle user logout
  const userLogout = async () => {
    try {
      setUser(null);
      localStorage.removeItem(TOKEN_ID);
    } catch (err) {
      throw err;
    }
  };

  // method to handle category login
  const categoryLogin = async (categoryId, password) => {
    try {
      const res = await axios.post("/category/login", {
        categoryId,
        password,
      });
      if (!res.data.success) return res.data;

      localStorage.setItem(TOKEN_ID, res.data.data.token);
      restoreUser();
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const value = {
    category: user,
    userRegister: userRegister,
    userLogout: userLogout,
    userLogin: userLogin,
    categoryLogin: categoryLogin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
