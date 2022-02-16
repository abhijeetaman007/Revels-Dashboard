import './App.css';
import './reset.css'
import React from 'react';
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './context/AuthContext';

import AuthPage from './pages/AuthPage';
import Landing from './pages/Landing';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route 
              exact
              path="/login"
              element={
                <AuthPage />
              } 
            />
            {/* <Route path="/admin/:category" element={}/> */}
            {/* <Route path="/admin/SYSADMIN" element={}/> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
