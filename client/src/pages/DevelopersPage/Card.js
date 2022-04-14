import React from 'react';
import './Card.css';

const Card = ({ data }) => {
  return (
    <div className="proshow-card card-up">
      <div
        className="image-wrapper"
        style={{ backgroundImage: `url(${data.pic})` }}
      >
        <div className="gradient1">
          <div className="artist-name">
            <h2 className="font-heavy text-center">{data.name}</h2>
            {/* <p className="font-light text-center">{data.description}</p> */}
            <div className="icons">
              <a className="icon" href={data.github} target="__blank">
                <i className="fa fa-github icon"></i>
              </a>
              <a className="icon" href={data.instagram} target="__blank">
                <i className="fa fa-instagram icon" aria-hidden="true"></i>
              </a>
              <a className="icon" href={data.linkedin} target="__blank">
                <i className="fa fa-linkedin icon" aria-hidden="true"></i>{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
