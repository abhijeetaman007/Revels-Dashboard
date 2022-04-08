import React from "react";
import "./Landing.scss"
import "./Navbar.css";
import Helmet from "react-helmet";
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
      <Helmet>
        <title>Aagaz | Revels '22</title>
        <meta name='description' content='Aagaz | Revels 2022' />
        <meta name='theme-color' content='#FFFFFF' />
        <meta
          name='keywords'
          content='revels, revelsmit, manipal, manipal institute of technology, 2022, sports, cultural, fest, national, aagaz, beginnings'
        />
        <meta name='url' content='https://revelsmit.in' />
        <meta name='coverage' content='Worldwide' />
        <meta name='target' content='all' />
        <meta name='HandheldFriendly' content='True' />
        <link rel="canonical" href="https://revelsmit.in" />
        {/* OG meta tags */}
        <meta property="og:type" content="webpage" />
        <meta
          property="og:title"
          content="Aagaz | Revels '22"
        />
        <meta
          property="og:description"
          content="Aagaz | Revels '22"
        />
        <meta property="og:image" content='' />
        <meta property="og:url" content='https://revelsmit.in' />
        <meta
          property="og:site_name"
          content="Aagaz | Revels '22"
        />
        <meta
          name='twitter:title'
          content="Aagaz | Revels '22"
        />
        <meta
          name="twitter:description"
          content="The official website of Aagaz | Revels '22"
        />
      </Helmet>
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