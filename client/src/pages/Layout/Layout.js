import React from "react";
import "./Layout.scss";
import logoWhite from "./.././../assets/logo_white.png";

const Layout = ({ children }) => {
    return (
        <div className="layout-wrapper">
            <nav className="navbar">
                <div className="brand">
                    <img alt="Revels Logo" src={logoWhite}></img>
                    <div>
                        <h4 className="font-medium">REVELS '22</h4>
                        <p className="font-light">Welcome back John Doe</p>
                    </div>
                </div>
                <i className="fa-solid fa-bell"></i>
            </nav>
            <div className="dash-wrapper">
                <div className="sidebar">
                    <div className="side-nav">
                        <div className="side-nav-link">
                            Events
                        </div>
                        <div className="side-nav-link">
                            My Events
                        </div>
                        <div className="side-nav-link">
                            Proshow
                        </div>
                        <div className="side-nav-link">
                            Delegate Cards
                        </div>
                    </div>
                    <div className="side-footer">
                        <h4 className="font-medium">John Doe</h4>
                        <h5 className="font-light">Manipal institute of Technology</h5>
                        <div className="buttons font-medium">
                            <button>Profile</button>
                            <button>Logout</button>
                        </div>
                    </div>
                </div>
                <div className="content-area">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;