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
          fontSize: '2rem',
          letterSpacing: '0.4rem',
        }}
      >
        MEET THE DEVELOPERS
      </h1>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {data.map((data, ind) => {
          return <Card key={ind} data={data} />;
        })}
      </div>
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
