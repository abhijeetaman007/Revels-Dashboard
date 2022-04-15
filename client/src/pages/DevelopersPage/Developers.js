import React from 'react';
import Card from './Card';
import data from './data.json';
import './Developers.css';
import { Link } from 'react-router-dom';
const Developers = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ padding: '0 10rem', marginTop: '10rem' }}
    >
      <h1
        className="dtitle font-heavy text-center text-white pb-2"
        style={{
          fontSize: '2.5rem',
          letterSpacing: '0.4rem',
        }}
      >
        Team Behind Revels'22
      </h1>

      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {data.map((data, ind) => {
          return <Card key={ind} data={data} />;
        })}
      </div>
      <a
        href="../../developers"
        className="font-light w-auto text-center mt-5"
        style={{ textDecoration: 'none' }}
      >
        <div className="text-light" style={{ fontSize: '12px' }}>
          Made with{' '}
          <i
            className="fa fa-heart mx-1"
            style={{ fontSize: '13px', color: 'red' }}
          ></i>{' '}
          by SysAdmin and Web '22
        </div>
        <div className="text-secondary" style={{ fontSize: '13px' }}>
          sysadrevels22@gmail.com
        </div>
      </a>
      <br></br>
    </div>
  );
};

export default Developers;
// {
//       "name": "Anmol Agarwal",
//       "github": "https://github.com/anmolag10",
//       "linkedin": "https://www.linkedin.com/in/anmolag10",
//       "instagram": "https://www.instagram.com/anmolag10/",
//       "pic":"https://ik.imagekit.io/zfpktdjtq/Anmol_L7TktQNqN.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1649965031917"
//     }
