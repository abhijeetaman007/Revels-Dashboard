import './styles/index.scss';
import React from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthContext';

import AuthPage from './pages/AuthPages/AuthPage';
import DelegatePage from './pages/DelegatePage/DelegatePage';
import Landing from './pages/Landing/Landing';
import PrivateRoute from './utils/PrivateRoute';
import ResetPassword from './pages/ResetPassword';

import Profile from './pages/ProfilePage/Profile';
import Events from './pages/EventPage/EventPage';
import MyEvents from './pages/MyEvents/MyEvents';
import Proshow from './pages/Proshow/Proshow';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route exact path="/login" element={<AuthPage />} />
            <Route
              exact
              path="/dashboard/profile"
              element={
                // <PrivateRoute>
                <Profile />
                // </PrivateRoute>
              }
            />
            <Route
              exact
              path="/dashboard/events"
              element={
                // <PrivateRoute>
                <Events />
                // </PrivateRoute>
              }
            />
            <Route
              exact
              path="/dashboard/myevents"
              element={
                // <PrivateRoute>
                <MyEvents />
                // </PrivateRoute>
              }
            />
            <Route
              exact
              path="/dashboard/proshow"
              element={
                // <PrivateRoute>
                <Proshow />
                // </PrivateRoute>
              }
            />
            <Route path="/dashboard/delegatecard" element={<DelegatePage />} />
            <Route
              exact
              path="/forgetpass/:passtoken"
              element={<ResetPassword />}
            />
            {/* <Route path="/admin/:category" element={}/> */}
            {/* <Route path="/admin/SYSADMIN" element={}/> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </div>
  );
  // return (
  //   <div className="App">
  //     <BrowserRouter>
  //       <AuthProvider>
  //         <Routes>
  //           <Route path="/" element={<Landing />} />
  //           <Route
  //             exact
  //             path="/login"
  //             element={
  //               <AuthPage />
  //             }
  //           />
  //           <Route
  //             exact
  //             path="/dashboard"
  //             element={
  //               <PrivateRoute>
  //                 <Dashboard />
  //               </PrivateRoute>
  //             }
  //           />
  //           <Route
  //             exact
  //             path="/forgetpass/:passtoken"
  //             element={
  //               <ResetPassword />
  //             }
  //           />
  //           {/* <Route path="/admin/:category" element={}/> */}
  //           {/* <Route path="/admin/SYSADMIN" element={}/> */}
  //         </Routes>
  //       </AuthProvider>
  //     </BrowserRouter>
  //     <Toaster />
  //   </div>
  // );
}

export default App;
