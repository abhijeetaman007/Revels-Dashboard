import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard/EventCard';
import Lottie from 'lottie-react';
import noEvents from '../../assets/noEvents.json';
import Loader from '../Loader/Loader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './EventPage.css';

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
   <div className='page-wrapper'>
        <Tabs className='w-100'>
        <TabList className='w-100 d-flex justify-content-center align-items-center my-4'>
        <Tab className="btn m-2 font-medium">
              Sports
          </Tab>
          <Tab className="btn m-2 font-medium">
              Cultural
          </Tab>
        </TabList>
        <TabPanel>
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
              if(eventData.eventType==='SPORTS')
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
        </TabPanel>
        <TabPanel>
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
              if(eventData.eventType==='CULTURAL')
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
        </TabPanel>
      </Tabs>
     </div>
  );
};

export default Events;
