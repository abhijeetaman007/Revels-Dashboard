import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './../../components/EventCard/EventCard';
import { TOKEN_ID } from '../../utils/constants';
import Lottie from 'lottie-react';
import noEvents from '../../assets/noEvents.json';

const MyEvents = () => {
  const token = localStorage.getItem(TOKEN_ID);
  const [events, setEvents] = useState([]);
  const [tab, settab] = useState(0);
  useEffect(() => {
    const getRegEvents = async () => {
      try {
        const res = await axios.get('/api/user/event/getevents', {
          headers: {
            authorization: token,
          },
        });
        setEvents(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRegEvents();
    console.log(events);
  }, []);
  return (
    <div>
      <div className="d-flex flex-md-row flex-column align-items-center">
        <div className="tabs-wrapper font-medium">
          <div
            className={
              tab === 0
                ? 'taeb-switch left text-center'
                : 'taeb-switch right text-center'
            }
          >
            <div
              className={tab === 0 ? 'taeb active font-heavy' : 'taeb'}
              taeb-direction="left"
              onClick={() => settab(0)}
            >
              Sports
            </div>
            <div
              className={tab === 1 ? 'taeb active font-heavy' : 'taeb'}
              taeb-direction="right"
              onClick={() => settab(1)}
            >
              Cultural
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          flexWrap: 'wrap',
          gap: '10px',
          height: 'fit-content',
        }}
      >
        {events &&
          events
            .filter((event) => {
              console.log(event);
              return tab === 0
                ? event.event.eventType === 'Sports + Gaming'
                : event.event.eventType === 'CULTURAL';
            })
            .map((eventData, index) => {
              return (
                <EventCard
                  index={index}
                  data={eventData.event}
                  key={index}
                  isMyEvents={true}
                />
              );
            })}
        {events.filter((event) => {
          console.log(event);
          return tab === 0
            ? event.event.eventType === 'SPORTS'
            : event.event.eventType === 'CULTURAL';
        }).length === 0 && (
          <div className="py-5 w-md-100 w-50 mx-auto text-center d-flex flex-column justify-content-center align-items-center">
            <Lottie animationData={noEvents} loop />
            <h3
              className="font-heavy"
              style={{ color: '#c4515c', fontSize: '2rem' }}
            >
              NO EVENTS HERE!
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
