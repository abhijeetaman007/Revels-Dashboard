import React from 'react';
import './EventCard.scss';
import { Link } from 'react-router-dom';
const EventCard = ({ data, index, isMyEvents, isPublic }) => {
  const eventPath = isMyEvents
    ? `/dashboard/myevents/${data._id}`
    : isPublic
    ? `/events/${data._id}`
    : `/dashboard/event/${data._id}`;
  const eventCardColours = ['event-back-1', 'event-back-2'];
  return (
    <div
      className={`event-card-wrapper card-up ${eventCardColours[index % 2]}`}
    >
      <div className="event-content">
        <div className="event-header">
          <div className="event-area">
            {/* <p className="font-heavy">{data.category.category}</p> */}
            <h3 className="font-light">{data.name}</h3>
          </div>
          <div className="button-area">
            <button className="mode">
              {data.mode === 'OFFLINE' ? 'Offline' : 'Online'}
            </button>
            <Link to={eventPath}>
              <button className="det">Details</button>
            </Link>
          </div>
        </div>
        <div className="tags-line flex-wrap mt-1">
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
          <div className="box-wrapper">
            <div className="box">
              <p className="font-heavy">TEAM SIZE</p>
              <h3 className="font-light">
                {data.minMembers === 1 && data.maxMembers === 1 ? (
                  'Individual'
                ) : (
                  <>
                    {data.minMembers === data.maxMembers
                      ? data.maxMembers
                      : data.minMembers + ' - ' + data.maxMembers}
                  </>
                )}
              </h3>
            </div>
            {data.eventDateTime && (
              <div className="box">
                <p className="font-heavy">DATE</p>
                <h3 className="font-light">
                  {new Date(data.eventDateTime).getDate()}/
                  {new Date(data.eventDateTime).getMonth() + 1}/
                  {new Date(data.eventDateTime).getFullYear()}
                </h3>
              </div>
            )}
            {data.eventDateTime && (
              <div className="box">
                <p className="font-heavy">TIME</p>
                <h3 className="font-light">
                  {new Date(data.eventDateTime).getHours()}:{' '}
                  {new Date(data.eventDateTime).getMinutes()}
                </h3>
              </div>
            )}
            {data.eventVenue && (
              <div className="box">
                <p className="font-heavy">VENUE</p>
                <h3 className="font-light">{data.eventVenue}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
