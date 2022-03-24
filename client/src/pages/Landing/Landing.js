import React from "react";
import "./Landing.scss"
import "./Navbar.css";

import tree from "./../../assets/backgrounds/tree.png"; 
import two from "./../../assets/backgrounds/two.png";
import sun from "./../../assets/backgrounds/sun.png";
import birds from "./../../assets/backgrounds/birds.png";
import three from "./../../assets/backgrounds/three.png";
import topCloud from "./../../assets/backgrounds/topCloud.svg";
import bottomCloud from "./../../assets/backgrounds/bottomCloud.svg";
import four from "./../../assets/backgrounds/four.svg";
import aagaz from "./../../assets/aagaz.png"
import Navbar from "../../components/Navbar/Navbar";

const Landing  = () => {
  return (
    <div className="landing-wrapper">
      <div className="content-wrapper">
        <Navbar />
        <div className="font-antiga landing-title">
          <h5>CELEBRATING 40 YEARS</h5>
          <img src={aagaz} alt="Aagaz 2022"></img>
          <h5>BEYOND LEGACIES</h5>
        </div>
      </div>
      <div className="svg-wrapper">
        <img src={three} alt="Layer Three"></img>
        <img src={two} alt="Layer Two"></img>
        <img src={tree} alt="Trees layer"></img>
        <img src={sun} alt="This is the sun"></img>
        <img src={birds} alt="These are the birds"></img>
        <img src={topCloud} alt="These are the clouds"></img>
        <img src={four} alt="This is layer four"></img>
        <img src={bottomCloud} alt="Cloud"></img>
      </div>
    </div>
  );
}

export default Landing;