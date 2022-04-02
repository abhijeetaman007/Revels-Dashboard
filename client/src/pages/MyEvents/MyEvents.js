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
    const [catId, setCatId] = useState();
    const filterEvents = async (e) => {
        console.log(e.target.value)
        try {
            const res = await axios.get("/user/event/filter", {
                category_ID: catId
            });
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }
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
        <div>
          <div className="d-flex flex-md-row flex-column align-items-center">
          <div className="search-box font-medium">
            <button className="btn-search"><i className="fa fa-search"></i></button>
            <input type="text" className="input-search" onChange={(e) => filterEvents(e)} placeholder="Type to Search..." />
          </div>
          <div className="tabs-wrapper font-medium">
            <div className={ tab === 0 ? "taeb-switch left text-center" : "taeb-switch right text-center"}>
              <div className={tab === 0 ? "taeb active font-heavy" : "taeb"} taeb-direction="left" onClick={()=>settab(0)}>
                Sports
              </div>
              <div className={tab === 1 ? "taeb active font-heavy" : "taeb"} taeb-direction="right" onClick={()=>settab(1)}>
                Cultural
              </div>
            </div>
          </div>
        </div>
        {
            events.length > 0 
            ? events
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
                .filter((event)=>{
                    return tab === 0 ?  event.event.eventType === "SPORTS" :  event.event.eventType === "CULTURAL"
                })
                .map((eventData, index) => {
                return <EventCard index={index} data={eventData.event} key={index} isMyEvents={true} />;
            }): 
            <div className="py-5 w-md-100 w-50 mx-auto text-center d-flex flex-column justify-content-center align-items-center">
              <Lottie animationData={noEvents} loop/>
              <h3 className="font-heavy" style={{ color: "#c4515c", fontSize: "2rem" }}>REGISTRATIONS OPENING SOON!</h3>
            </div>
        }
        </div>
    );
};

export default MyEvents;
