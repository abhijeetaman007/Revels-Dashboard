import React from "react";
import "./Proshow.scss";
import ProshowCard from "../../components/ProshowCard/ProshowCard";
import proshowdata from "../../utils/proshow.json";
const Proshow = ({ isPublicProshow=false }) => {
  return (
    <div className="proshow-wrapper pb-4">
      {
        isPublicProshow &&
        <div className="d-flex align-items-center">
          <h1 className="font-light flicker w-50">PROSHOW '22</h1>
          <div className="bg-white w-100" style={{ height: 10 }}></div>
        </div>
      }
      <div className="proshow-cards">
        {proshowdata.map((data, ind) => {
          return (
            <ProshowCard key={ind} data={data}/>
          );
        })}
      </div>
      <a style={{textDecoration:'none'}}href="./delegatecard" className="buy-now font-medium">BUY TICKETS NOW</a>
    </div>
  );
};

export default Proshow;
