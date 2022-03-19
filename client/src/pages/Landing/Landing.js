import React from "react";
import "./Landing.scss"
import Navbar from './Navbar/navbar.js'

import tree from "./../../assets/backgrounds/tree.svg"; 
import two from "./../../assets/backgrounds/two.svg";
import sun from "./../../assets/backgrounds/sun.svg";
import birds from "./../../assets/backgrounds/birds.svg";
import three from "./../../assets/backgrounds/three.svg";
import clouds_top from "./../../assets/backgrounds/clouds_top.svg";
import four from "./../../assets/backgrounds/four.svg";

const Landing  = () => {
  return (
    <div className="landing-wrapper">
      <div className="content-wrapper">
        <div className="landing-nav ">
          <Navbar />
        </div>
        <div className="font-antiga landing-title">
          <h5 className="subtitle1">CELEBRATING 40 YEARS OF REVELRY</h5>
          <h1 className="title">AAGAZ</h1>
          <h5 className="subtitle2">BEYOND LEGACIES</h5>
        </div>
      </div>
      <div className="svg-wrapper">
        <img src={three}></img>
        <img src={two}></img>
        <img src={tree}></img>
        <img src={sun}></img>
        <img src={birds}></img>
        <img src={clouds_top}></img>
        <img src={four}></img>
      </div>
    </div>
  );
}

export default Landing;