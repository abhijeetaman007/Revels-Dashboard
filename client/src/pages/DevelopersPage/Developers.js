import React from 'react';
import CC from './Card';
import data from "./data.json";
import './Developers.css';

const Developers = () => {
  return (
    <div className='d-flex justify-content-center align-items-center flex-column' style={{padding: '0 10rem'}} >
      <h1 className="dtitle font-heavy text-center text-white pb-2" style={{fontSize:'2rem', marginTop:'10rem', letterSpacing:'0.4rem'}}>MEET THE DEVELOPERS</h1>
      <div className='d-flex flex-wrap justify-content-center align-items-center'>
      {data.map((data, ind) => {
          return (
            <CC key={ind} data={data}/>
          );
        })}
      </div>
    </div>
  );
};

export default Developers;
