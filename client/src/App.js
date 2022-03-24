import "./styles/index.scss";
import React from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

import AuthPage from "./pages/AuthPages/AuthPage";
import DelegatePage from "./pages/DelegatePage/DelegatePage";
import Landing from "./pages/Landing/Landing";
import PrivateRoute from "./utils/PrivateRoute";
import ResetPassword from "./pages/ResetPassword";

import Profile from "./pages/ProfilePage/Profile";
import Events from "./pages/EventPage/EventPage";
import MyEvents from "./pages/MyEvents/MyEvents";
import Proshow from "./pages/Proshow/Proshow";
import InsideEvent from "./components/InsideEvent/InsideEvent";
import VerifyAnimation from "./components/VerifyAnimation/VerifyAnimation";
import NotFound from "./components/NotFound";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import OpenComingSoon from "./pages/OpenComingSoon";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path="/login" element={<AuthPage />} />
            <Route
              exact
              path="/dashboard/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/dashboard/proshow"
              element={
                <PrivateRoute>
                  <Proshow />
                </PrivateRoute>
              }
            />
            <Route exact path="/dashboard/events" element={<Events />} />
            <Route
              exact
              path="/dashboard/myevents"
              element={
                <PrivateRoute>
                  <MyEvents />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/dashboard/event/:eventid"
              element={
                <PrivateRoute>
                  <InsideEvent />
                </PrivateRoute>
              }
            />
            <Route path="/dashboard/delegatecard" element={<DelegatePage />} />
            <Route
              exact
              path="/dashboard"
              element={<Navigate to="/dashboard/profile" />}
            />
            <Route
              exact
              path="/forgetpass/:passtoken"
              element={<ResetPassword />}
            />
            <Route path="/verify/:token" element={<VerifyEmail />} />
            <Route path="/verified" element={<VerifyAnimation />} />
            <Route path="/events" element={<OpenComingSoon />} />
            <Route path="/tshirts" element={<OpenComingSoon />} />
            <Route path="/schedule" element={<OpenComingSoon />} />
            {/* <Route path="/admin/:category" element={}/> */}
            {/* <Route path="/admin/SYSADMIN" element={}/> */}
            <Route exact path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
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
