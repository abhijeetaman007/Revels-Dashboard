import React from 'react';
import Layout from '../Layout/Layout';
import ArrowVector from '../../assets/right-arrow.png';
import imgg from '../../assets/blue.png';
const Proshow = () => {
  return (
    <Layout activeTab="proshow">
      <div className="proshow">
        <div className="card">
          <img src={imgg}></img>
          <center>
            <button>
              Buy Ticket
              <img
                style={{ height: '20px', marginLeft: '5px', marginTop: '3px' }}
                src={ArrowVector}
              ></img>
            </button>
          </center>
        </div>
        <div className="card">
          <img src={imgg}></img>
          <center>
            <button>
              Buy Ticket
              <img
                style={{ height: '20px', marginLeft: '5px', marginTop: '3px' }}
                src={ArrowVector}
              ></img>
            </button>
          </center>
        </div>
        <div className="card">
          <img src={imgg}></img>
          <center>
            <button>
              Buy Ticket
              <img
                style={{ height: '20px', marginLeft: '5px', marginTop: '3px' }}
                src={ArrowVector}
              ></img>
            </button>
          </center>
        </div>
        <div className="card">
          <img src={imgg}></img>
          <center>
            <button>
              Buy Ticket
              <img
                style={{ height: '20px', marginLeft: '5px', marginTop: '3px' }}
                src={ArrowVector}
              ></img>
            </button>
          </center>
        </div>
        <div className="card">
          <img src={imgg}></img>
          <center>
            <button>
              Buy Ticket
              <img
                style={{ height: '20px', marginLeft: '5px', marginTop: '3px' }}
                src={ArrowVector}
              ></img>
            </button>
          </center>
        </div>
        <div className="card">
          <img src={imgg}></img>
          <center>
            <button>
              Buy Ticket
              <img
                style={{ height: '20px', marginLeft: '5px', marginTop: '3px' }}
                src={ArrowVector}
              ></img>
            </button>
          </center>
        </div>
      </div>
    </Layout>
  );
};

export default Proshow;
