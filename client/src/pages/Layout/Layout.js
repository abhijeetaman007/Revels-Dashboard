import React, { useEffect, useState } from 'react';
import './Layout.scss';
import { useNavigate } from 'react-router-dom';
import aagaz from './../../assets/aagaz.png';
import events from './../../assets/icons/events.svg';
import myEvents from './../../assets/icons/myEvents.svg';
import proshow from './../../assets/icons/proshow.svg';
import delegateCard from './../../assets/icons/delegateCard.svg';
import logoWhite from './.././../assets/logos/logo_white.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './../Loader/Loader';

const Layout = ({ children, isAagazVisible = false, activeTab }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.user;

  const [active, setActive] = useState(activeTab);
  const [loading, setLoading] = useState(true);

  // handles hamburger click on mobiles
  const handleHamburger = () => {
    document.querySelector('.dash-wrapper').classList.toggle('active');
  };
  const handleBell = () => {
    document.querySelector('.notif-wrapper').classList.toggle('active');
  };
  useEffect(() => {
    if (!auth.loading) {
      setLoading(false);
      if (!auth.user) {
        navigate('/');
      }
    }
    if (!loading)
      document.querySelector(`#${activeTab}`).classList.toggle('active');
  }, [auth.loading]);

  return loading ? (
    <Loader />
  ) : (
    <div className="layout-wrapper">
      <nav className="layout-navbar">
        <div className="brand">
          <i className="fa fa-bars" onClick={handleHamburger}></i>
          <img alt="Revels Logo" src={logoWhite}></img>
          <div>
            <h4 className="font-medium">REVELS '22</h4>
            <p className="font-light">Welcome back</p>
          </div>
        </div>
        {/* <i className="fa fa-bell" onClick={handleBell}></i> */}
      </nav>
      <div className="dash-wrapper">
        {/* <div className="notif-wrapper">
          <div className="notif-box">
            <NotifTile />
          </div>
        </div> */}
        <div className="sidebar">
          <div className="cross">
            <i className="fa fa-times" onClick={handleHamburger}></i>
          </div>
          <div className="side-nav font-medium">
            <Link to="/dashboard/events" onClick={handleHamburger}>
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
            <Link to="/dashboard/myevents" onClick={handleHamburger}>
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
            <Link to="/dashboard/proshow" onClick={handleHamburger}>
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
            <Link to="/dashboard/delegatecard" onClick={handleHamburger}>
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
            <Link to="/developers" onClick={handleHamburger}>
              <div
                className={`side-nav-link ${
                  active === 'developers' ? 'active' : ''
                }`}
                id="developers"
                onClick={() => setActive('developers')}
              >
                <span>
                  <img src={myEvents} alt="Developers"></img>
                </span>
                System Admins
              </div>
            </Link>
          </div>
          <div className="px-2 pb-4 d-flex justify-content-center">
            <Link
              to="/schedule"
              onClick={handleHamburger}
              style={{ textDecoration: 'none' }}
            >
              <div className="text-muted">
                <span>
                  <i className="fa fa-sort-numeric-asc mr-2"></i>
                </span>
                Schedule
              </div>
            </Link>
            <p className="mx-2">{' | '}</p>
            <Link
              to="/rulebook"
              onClick={handleHamburger}
              style={{ textDecoration: 'none' }}
            >
              <div className="text-muted">
                <span>
                  <i className="fa fa-book mr-2"></i>
                </span>
                Rulebook
              </div>
            </Link>
          </div>
          <div className="side-footer">
            <h4 className="font-medium">{user.name}</h4>
            <h5 className="font-light">{user.college}</h5>
            <div className="buttons font-medium">
              <button
                className="bg-white"
                onClick={() => navigate(`/dashboard/profile`)}
              >
                Profile
              </button>
              <button className="bg-white" onClick={auth.userLogout}>
                Logout
              </button>
            </div>
            {/* <a
              href="../../developers"
              className="font-light w-auto text-center mt-5"
              style={{ textDecoration: 'none' }}
            >
              <div className="text-light" style={{ fontSize: '12px' }}>
                Made with{' '}
                <i
                  className="fa fa-heart mx-1"
                  style={{ fontSize: '13px', color: 'red' }}
                ></i>{' '}
                by SysAdmin and Web '22
              </div>
              <div className="text-secondary" style={{ fontSize: '13px' }}>
                sysadrevels22@gmail.com
              </div>
            </a> */}
          </div>
        </div>
        <div className="content-area">
          {isAagazVisible ? (
            <div className="aagaz-wrapper">
              <img src={aagaz} alt="Aagaz"></img>
            </div>
          ) : (
            <></>
          )}
          {children}
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
