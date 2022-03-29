import React from 'react';
import './EventCard.scss';
import { Link } from 'react-router-dom';
const EventCard = ({ data }) => {
  console.log(data)
  const [eventPath, setEventPath] = React.useState(
    `/dashboard/event/${data._id}`
  );
  return (
    <div className="event-card-wrapper card-up">
      <div className="event-content">
        <div className="event-header">
          <div className="event-area">
            <p className="font-heavy">{data.category.category}</p>
            <h3 className="font-light">{data.name}</h3>
          </div>
          <div className="button-area">
            <button className="font-heavy">
              {data.mode === 'OFFLINE' ? 'Offline' : 'Online'} Event
            </button>
            {/* <Link to={eventPath} className="font-medium">
              <button className="font-medium">Details</button>
            </Link> */}
          </div>
        </div>
        <div className="tags-line">
          {data.tags != undefined
            ? data.tags.map((val, index) => {
                return (
                  <p key={index} className="font-light">
                    {val}
                    {index !== data.tags.length - 1 ? ' ◦' : ''}
                  </p>
                );
              })
            : null}
        </div>
        <div className="description font-medium">{data.description}</div>
        <div className="data-area">
          {data.maxMembers > 1 ? (
            <div className="box">
              <p className="font-heavy">TEAM SIZE</p>
              <h3 className="font-light">
                {data.minMembers} - {data.maxMembers}
              </h3>
            </div>
          ) : (
            <div className="box">
              <p className="font-heavy">TEAM SIZE</p>
              <h3 className="font-light">1</h3>
            </div>
          )}
          <div className="box">
            <p className="font-heavy">DATE</p>
            <h3 className="font-light">
              {new Date(data.eventDateTime).getDate()}/
              {new Date(data.eventDateTime).getMonth()}/
              {new Date(data.eventDateTime).getFullYear()}
            </h3>
          </div>
          <div className="box">
            <p className="font-heavy">VENUE</p>
            <h3 className="font-light">{data.eventVenue}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
