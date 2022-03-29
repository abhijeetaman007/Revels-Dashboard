import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import EventCard from './../../components/EventCard/EventCard';
import { TOKEN_ID } from '../../utils/constants';
import Lottie from 'lottie-react';
import noEvents from '../../assets/noEvents.json';

const MyEvents = () => {
    const token = localStorage.getItem(TOKEN_ID);
    const [events, setEvents] = useState([]);
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
    }, []);
    return (
        <Layout activeTab='my-events'>
            {
                events.length > 0 
                ? events.map((eventData, index) => {
                    return <EventCard data={eventData.event} key={index} />;
                }): 
                <div className="py-5 w-md-100 w-50 mx-auto text-center d-flex flex-column justify-content-center align-items-center">
                  <Lottie animationData={noEvents} loop/>
                  <h3 className="font-heavy" style={{ color: "#c4515c", fontSize: "2rem" }}>REGISTRATIONS OPENING SOON!</h3>
                </div>
            }
        </Layout>
    );
};

export default MyEvents;
