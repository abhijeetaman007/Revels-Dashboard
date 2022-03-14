import React from 'react';
import Layout from '../../pages/Layout/Layout';
import ArrowVector from '../../assets/right-arrow.png';
const ProshowCard = () => {
  return (
    <Layout>
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

export default ProshowCard;
