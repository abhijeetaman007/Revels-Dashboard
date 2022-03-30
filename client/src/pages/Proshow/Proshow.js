import React from "react";
import Layout from "../Layout/Layout";
import "./Proshow.scss";
import ProshowCard from "../../components/ProshowCard/ProshowCard";
import proshowdata from "../../utils/proshow.json";
const Proshow = () => {
  return (
    <div className="proshow">
      {proshowdata.map((data, ind) => {
        return (
          <ProshowCard data={data}/>
        );
      })}
    </div>
  );
};

export default Proshow;
