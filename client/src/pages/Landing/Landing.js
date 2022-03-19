import React from "react";
import "./Landing.scss"

import tree from "./../../assets/backgrounds/tree.svg"; 
import two from "./../../assets/backgrounds/two.svg";
import sun from "./../../assets/backgrounds/sun.svg";
import three from "./../../assets/backgrounds/three.svg";

const Landing  = () => {
  return (
    <div className="landing-wrapper">
      <div className="content-wrapper">
        <div className="landing-nav"></div>
        <div className="landing-title">
          <h1 className="font-antiga">AAGAZ</h1>
        </div>
      </div>
      <div className="svg-wrapper">
        <img src={three}></img>
        <img src={two}></img>
        <img src={tree}></img>
        <img src={sun}></img>
      </div>
    </div>
  );
}

export default Landing;