import React from 'react';
import Layout from '../Layout/Layout';
import ArrowVector from '../../assets/right-arrow.png';
const Proshow = () => {
  return (
    <Layout activeTab="proshow">
      <div className="proshow">
        <div className="card">
          <button>
            Buy Ticket
            <img
              style={{ height: '20px', marginLeft: '5px', marginTop: '3px' }}
              src={ArrowVector}
            ></img>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Proshow;
