import React, { useEffect } from "react"
import "./Landing.css"
import "./TextPop.css"
import logoMoon from "./../../assets/logo_moon.png"
import logo from "./../../assets/logo_white.png"
import GridBackground from "../../components/GridBackground/GridBackground"
import Parallax from "parallax-js"
import Helmet from "react-helmet"
import { Link } from "react-router-dom";

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
            <Helmet>
                <title>Aagaz | Revels '22</title>
                <meta name='description' content="Aagaz—Beyond Legacies | Revels '22" />
                <meta
                  name='keywords'
                  content='revels, revelsmit, mit, manipal, aagaz, 2022, fest, cultural, sports, MAHE, beyond, legacies'
                />
                <meta name='url' content='https://revelsmit.in/' />
                <meta name='coverage' content='Worldwide' />
                <meta name='target' content='all' />
                <meta name='HandheldFriendly' content='True' />
                <link rel="canonical" href="https://revelsmit.in/" />
                {/* OG meta tags */}
                <meta property="og:type" content="webpage" />
                <meta
                  property="og:title"
                  content="Aagaz—Beyond Legacies | Revels '22"
                />
                <meta
                  property="og:description"
                  content="Aagaz—Beyond Legacies | Revels '22"
                />
                <meta property="og:image" content='' />
                <meta property="og:url" content='https://revelsmit.in/' />
                <meta
                  property="og:site_name"
                  content="Aagaz—Beyond Legacies | Revels '22"
                />
                <meta
                  name='twitter:title'
                  content="Aagaz—Beyond Legacies | Revels '22"
                />
                <meta
                  name="twitter:description"
                  content="Aagaz—Beyond Legacies | Revels '22"
                />
                <meta name="twitter:image" content="" />
                <meta name="twitter:site" content="@RevelsMIT" />
                <meta name="twitter:creator" content="@RevelsMIT" />
            </Helmet>
            <div className="moon-back">
                <img className="back-moon" alt="Revels '22 Logo" src={logoMoon}></img>
                <div className="theme-wrapper">
                    <img alt="Revels '22 Logo Moon" className="brand" src={logo}></img>
                    <h1 className="revels-brand font-light">Revels '22</h1>
                </div>
                <div className="content-wrapper">
                    <div className="countdown-wrapper">
                        <h4 className="font-medium">CELEBRATING</h4>
                        <h1 className="font-heavy">40 YEARS</h1>
                        <div id="countdown" className="font-medium">
                          <ul>
                            <li><span id="days"></span>days</li>
                            <li><span id="hours"></span>Hours</li>
                            <li><span id="minutes"></span>Minutes</li>
                            <li><span id="seconds"></span>Seconds</li>
                          </ul>
                        </div>
                    </div>
                    <div className="nav-wrapper">
                        <Link to="/login">
                          <p className="nav-link popout font-medium">
                              <span>L</span>
                              <span>O</span>
                              <span>G</span>
                              <span>I</span>
                              <span>N</span>
                          </p>
                        </Link>
                        <a className="nav-link popout font-medium" href="/">
                            <span>E</span>
                            <span>V</span>
                            <span>E</span>
                            <span>N</span>
                            <span>T</span>
                            <span>S</span>
                        </a>
                        <a className="nav-link popout font-medium" href="/">
                            <span>T</span>
                            <span>S</span>
                            <span>H</span>
                            <span>I</span>
                            <span>R</span>
                            <span>T</span>
                            <span>S</span>
                        </a>
                        <a className="nav-link popout font-medium" href="/">
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
                <div className="revelry font-light" id="scene">
                    <p data-depth="0.2">LET THE REVELRY BEGIN</p>
                </div>
            </div>
        </GridBackground>
    )
}

export default Landing