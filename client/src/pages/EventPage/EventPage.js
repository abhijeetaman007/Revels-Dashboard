import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard/EventCard';
import Layout from '../Layout/Layout';
import Lottie from 'lottie-react';
import noEvents from '../../assets/noEvents.json';

const Events = () => {
  const [events, setEvents] = useState([]);
  const getAllEvents = async () => {
    try {
      const res = await axios.get('/api/user/event/getallevents');
      setEvents(res.data.data);
      console.log(events);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <Layout activeTab="events">
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          height: 'fit-content',
        }}
      >
        {events.length > 0
          ? events.map((eventData, index) => {
              return <EventCard key={index} data={eventData} />;
            })
          : 
          <div className="py-5 w-md-100 w-50 mx-auto text-center d-flex flex-column justify-content-center align-items-center">
            <Lottie animationData={noEvents} loop/>
            <h3 className="font-heavy" style={{ color: "#c4515c", fontSize: "2rem" }}>NO EVENTS FOUND!</h3>
          </div>
        }
      </div>
    </Layout>
  );
};

export default Events;
