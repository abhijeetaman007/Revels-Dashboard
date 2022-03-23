import React, { useEffect, useState } from 'react';
import './Layout.scss';
<<<<<<< HEAD
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
=======
import {useLocation, useNavigate } from 'react-router-dom';
>>>>>>> d761d6ecd740bde5a9a30ba319ff5ee3825e0135
import aagaz from './../../assets/aagaz.png';
import events from './../../assets/icons/events.svg';
import myEvents from './../../assets/icons/myEvents.svg';
import proshow from './../../assets/icons/proshow.svg';
import delegateCard from './../../assets/icons/delegateCard.svg';
import logoWhite from './.././../assets/logos/logo_white.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotifTile from '../../components/NotifTile';
<<<<<<< HEAD
import ComingSoon from '../../components/ComingSoon/ComingSoon';
import Loader from './../Loader/Loader';
=======
import Loader from "./../Loader/Loader";
>>>>>>> d761d6ecd740bde5a9a30ba319ff5ee3825e0135
import ComingSoonDash from '../../components/ComingSoon/ComingSoon2';

const Layout = ({ children, isAagazVisible = false, activeTab }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.user;

  const location = useLocation();
  const [active, setActive] = useState(activeTab);
  const [loading, setLoading] = useState(true);

  // handles hamburger click on mobiles
  const handleHamburger = () => {
    document.querySelector('.dash-wrapper').classList.toggle('active');
  };
  const handleBell = () => {
<<<<<<< HEAD
    document.querySelector('.notif-wrapper').classList.toggle('active');
  };
  // handle sidebar nav click
  const handleSideClick = (id) => {
    let ids = ['events', 'my-events', 'proshow', 'delegate-card'];
    for (let i = 0; i < ids.length; i++) {
      document.querySelector(`#${ids[i]}`).classList.remove('active');
    }
    document.querySelector(`#${id}`).classList.toggle('active');
  };

  useEffect(() => {
    if (!auth.loading) {
      setLoading(false);
=======
    document.querySelector(".notif-wrapper").classList.toggle('active');
  }
  useEffect(() => {
    if(!auth.loading) {
      setLoading(false);
      if (!auth.user) {
        navigate('/');
      }  
>>>>>>> d761d6ecd740bde5a9a30ba319ff5ee3825e0135
    }
    if (!loading)
      document.querySelector(`#${activeTab}`).classList.toggle('active');
<<<<<<< HEAD
  }, [auth.loading]);

  return loading ? (
    <Loader />
  ) : (
=======
  },[auth.loading])
  
  return (
    loading ? <Loader /> :
>>>>>>> d761d6ecd740bde5a9a30ba319ff5ee3825e0135
    <div className="layout-wrapper">
      <nav className="layout-navbar">
        <div className="brand">
          <i className="fa fa-bars" onClick={handleHamburger}></i>
          <img alt="Revels Logo" src={logoWhite}></img>
          <div>
            <h4 className="font-medium">REVELS '22</h4>
            <p className="font-light">Welcome back {user.name}</p>
          </div>
        </div>
        <i className="fa fa-bell" onClick={handleBell}></i>
      </nav>
      <div className="dash-wrapper">
        <div className="notif-wrapper">
          <div className="notif-box">
            <NotifTile />
          </div>
        </div>
        <div className="sidebar">
          <div className="cross">
            <i className="fa fa-times" onClick={handleHamburger}></i>
          </div>
          <div className="side-nav font-medium">
            <Link to="/dashboard/events">
              <div
                className={`side-nav-link ${
                  active === 'events' ? 'active' : ''
                }`}
                id="events"
                onClick={() => setActive('events')}
              >
                <span>
                  <img src={events} alt="Events Icons"></img>
                </span>
                Events
              </div>
            </Link>
            <Link to="/dashboard/myevents">
              <div
                className={`side-nav-link ${
                  active === 'my-events' ? 'active' : ''
                }`}
                id="my-events"
                onClick={() => setActive('my-events')}
              >
                <span>
                  <img src={myEvents} alt="my Events Icon"></img>
                </span>
                My Events
              </div>
            </Link>
            <Link to="/dashboard/proshow">
              <div
                className={`side-nav-link ${
                  active === 'proshow' ? 'active' : ''
                }`}
                id="proshow"
                onClick={() => setActive('proshow')}
              >
                <span>
                  <img src={proshow} alt="Proshow Icon"></img>
                </span>
                Proshow
              </div>
            </Link>
            <Link to="/dashboard/delegatecard">
              <div
                className={`side-nav-link ${
                  active === 'delegate-card' ? 'active' : ''
                }`}
                id="delegate-card"
                onClick={() => setActive('delegate-card')}
              >
                <span>
                  <img src={delegateCard} alt="Delegate Card Icon"></img>
                </span>
                Delegate Cards
              </div>
            </Link>
          </div>
          <div className="side-footer">
            <h4 className="font-medium">{user.name}</h4>
            <h5 className="font-light">{user.college}</h5>
            <div className="buttons font-medium">
              <button onClick={() => navigate(`/dashboard/profile`)}>
                Profile
              </button>
              <button onClick={auth.userLogout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="content-area">
          {isAagazVisible ? (
            <div className="aagaz-wrapper">
              <img src={aagaz}></img>
            </div>
          ) : (
            <></>
          )}
          {/* change before pushing code */}
          {children}
          {/* <ComingSoonDash /> */}
        </div>
        {/* uncomment for proshow */}
        {/* {
          activeTab.toUpperCase() === "PROSHOW" 
          ?
          <div className="button-bar font-medium">
            BUY TICKETS NOW
            <span className="mx-2"><i className="fa fa-arrow-right"></i></span>
          </div>
          : <> </>
        } */}
      </div>
    </div>
  );
};

export default Layout;
