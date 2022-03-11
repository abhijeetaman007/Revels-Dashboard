import React from "react";
import "./Layout.scss";
import aagaz from "./../../assets/aagaz.png";
import logoWhite from "./.././../assets/logo_white.png";

const Layout = ({ children, isAagazVisible=false }) => {

    const handleHamburger = () => {
        document.querySelector(".dash-wrapper").classList.toggle("active");
    }

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
                <i class="fa fa-bell"></i>
            </nav>
            <div className="dash-wrapper">
                <div className="sidebar">
                    <div className="cross">
                        <i class="fa fa-times" onClick={handleHamburger}></i>
                    </div>
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
                    {
                        isAagazVisible 
                        ?
                        <div className="aagaz-wrapper">
                            <img src={aagaz}></img>
                        </div>
                        : <></>
                    }
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;