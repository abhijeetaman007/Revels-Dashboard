import React from 'react';
import Layout from '../Layout/Layout';
import "./Proshow.scss";
import ProshowCard from '../../components/ProshowCard/ProshowCard';
const Proshow = () => {
  return (
    <Layout activeTab="proshow">
      <div className="proshow">
        <ProshowCard />
        <ProshowCard />
        <ProshowCard />
        <ProshowCard />
        <ProshowCard />
        <ProshowCard />
        <ProshowCard />
        <ProshowCard />
        <ProshowCard />
        <div className="button-bar font-medium">
            BUY TICKETS NOW
            <span className="mx-2"><i className="fa fa-arrow-right"></i></span>
        </div>
      </div>
    </Layout>
  );
};

export default Proshow;
