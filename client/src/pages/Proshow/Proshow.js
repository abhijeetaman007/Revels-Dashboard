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
      </div>
    </Layout>
  );
};

export default Proshow;
