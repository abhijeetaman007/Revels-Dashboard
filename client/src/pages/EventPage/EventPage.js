import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard/EventCard';
import Lottie from 'lottie-react';
import noEvents from '../../assets/noEvents.json';
import Loader from '../Loader/Loader';

const Events = () => {
  const [events, setEvents] = useState([]);
  const getAllEvents = async () => {
    try {
      const res = await axios.get('/api/user/event/getallevents');
      setEvents(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: "center",
        flexWrap: 'wrap',
        gap: '10px',
        height: 'fit-content',
      }}
    >
      {events
        ? events.map((eventData, index) => {
            return <EventCard key={index} index={index} data={eventData} />;
          })
        : 
        <Loader />
      }
      {events.length === 0 && 
      <div className="py-5 w-md-100 w-50 mx-auto text-center d-flex flex-column justify-content-center align-items-center">
          <Lottie animationData={noEvents} loop/>
          <h3 className="font-heavy" style={{ color: "#c4515c", fontSize: "2rem" }}>NO EVENTS FOUND!</h3>
        </div>}
    </div>
  );
};

export default Events;
