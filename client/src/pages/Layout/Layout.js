import React, { useEffect } from 'react';
import './Layout.scss';
import aagaz from './../../assets/aagaz.png';
import events from './../../assets/icons/events.svg';
import myEvents from './../../assets/icons/myEvents.svg';
import proshow from './../../assets/icons/proshow.svg';
import delegateCard from './../../assets/icons/delegateCard.svg';
import logoWhite from './.././../assets/logo_white.png';
import { Link } from 'react-router-dom';

const Layout = ({ children, isAagazVisible = false, activeTab }) => {
  const handleHamburger = () => {
    document.querySelector('.dash-wrapper').classList.toggle('active');
  };

  const handleSideClick = (id) => {
    let ids = ['events', 'my-events', 'proshow', 'delegate-card'];
    for (let i = 0; i < ids.length; i++) {
      document.querySelector(`#${ids[i]}`).classList.remove('active');
    }
    document.querySelector(`#${id}`).classList.toggle('active');
  };

  useEffect(() => {
    document.querySelector(`#${activeTab}`).classList.toggle('active');
  }, []);

  return (
    <div className="layout-wrapper">
      <nav className="navbar">
        <div className="brand">
          <i className="fa fa-bars" onClick={handleHamburger}></i>
          <img alt="Revels Logo" src={logoWhite}></img>
          <div>
            <h4 className="font-medium">REVELS '22</h4>
            <p className="font-light">Welcome back John Doe</p>
          </div>
        </div>
        <i className="fa fa-bell"></i>
      </nav>
      <div className="dash-wrapper">
        <div className="sidebar">
          <div className="cross">
            <i className="fa fa-times" onClick={handleHamburger}></i>
          </div>
          <div className="side-nav font-medium">
            <Link to="/dashboard/events">
              <div
                className="side-nav-link"
                id="events"
                onClick={() => handleSideClick('events')}
              >
                <span>
                  <img src={events}></img>
                </span>
                Events
              </div>
            </Link>
            <Link to="/dashboard/myevents">
              <div
                className="side-nav-link"
                id="my-events"
                onClick={() => handleSideClick('my-events')}
              >
                <span>
                  <img src={myEvents}></img>
                </span>
                My Events
              </div>
            </Link>
            <Link to="/dashboard/proshow">
              <div
                className="side-nav-link"
                id="proshow"
                onClick={() => handleSideClick('proshow')}
              >
                <span>
                  <img src={proshow}></img>
                </span>
                Proshow
              </div>
            </Link>
            <Link to="/dashboard/delegatecard">
              <div
                className="side-nav-link"
                id="delegate-card"
                onClick={() => handleSideClick('delegate-card')}
              >
                <span>
                  <img src={delegateCard}></img>
                </span>
                Delegate Cards
              </div>
            </Link>
          </div>
          <div className="side-footer">
            <h4 className="font-medium">John Doe</h4>
            <h5 className="font-light">Manipal institute of Technology</h5>
            <div className="buttons font-medium">
              <Link to="/dashboard/profile" className="font-medium">
                <button>Profile</button>
              </Link>

              <button>Logout</button>
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
