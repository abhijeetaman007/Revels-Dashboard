import React, { useEffect } from "react"
import "./Landing.css"
import "./TextPop.css"
import logoMoon from "./../../assets/logo_moon.png"
import aagaz from "./../../assets/aagaz.png"
import GridBackground from "../../components/GridBackground/GridBackground"
import Parallax from "parallax-js"

const Landing = () => {

    useEffect(() => {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const countDown = new Date("04/13/2022 5:00:00").getTime();
        setInterval(() => {    
          const now = new Date().getTime(),
                distance = countDown - now;
            document.getElementById("days").innerText = Math.floor(distance / (day));
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour));
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute));
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
        }, 0);
        new Parallax(document.getElementById("scene"));
    }, [])

    return (
        <GridBackground>
            <div className="theme-wrapper">
                <img alt="Aagaz Logo" src={aagaz} className="aagaz-text"></img>
                <div className="line"></div>
                <h4>BEYOND LEGACIES</h4>
            </div>
            <div className="content-wrapper">
                <div className="logo-wrapper">
                    <div className="logo-box" id="scene">
                        <img alt="Revels Logo" data-depth="0.7" id="logo-moon" className="logo-moon" src={logoMoon}></img>
                    </div>
                    <div className="text-area">
                        {/* <p className="revels-22">REVELS '22</p>
                        <p className="years-40">Celebrating 40 years</p> */}
                        <div id="countdown">
                          <ul>
                            <li><span id="days"></span>days</li>
                            <li><span id="hours"></span>Hours</li>
                            <li><span id="minutes"></span>Minutes</li>
                            <li><span id="seconds"></span>Seconds</li>
                          </ul>
                        </div>
                    </div>
                </div>
                <div className="nav-wrapper">
                    <a className="nav-link popout" href="/">
                        <span>L</span>
                        <span>O</span>
                        <span>G</span>
                        <span>I</span>
                        <span>N</span>
                    </a>
                    <a className="nav-link popout" href="/">
                        <span>E</span>
                        <span>V</span>
                        <span>E</span>
                        <span>N</span>
                        <span>T</span>
                        <span>S</span>
                    </a>
                    <a className="nav-link popout" href="/">
                        <span>T</span>
                        <span>S</span>
                        <span>H</span>
                        <span>I</span>
                        <span>R</span>
                        <span>T</span>
                        <span>S</span>
                    </a>
                    <a className="nav-link popout" href="/">
                        <span>S</span>
                        <span>C</span>
                        <span>H</span>
                        <span>E</span>
                        <span>D</span>
                        <span>U</span>
                        <span>L</span>
                        <span>E</span>
                    </a>
                </div>
            </div>
        </GridBackground>
    )
}

export default Landing