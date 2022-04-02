import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../components/EventCard/EventCard";
import Lottie from "lottie-react";
import noEvents from "../../assets/noEvents.json";
import Loader from "../Loader/Loader";
import "./TabSwitch.css";
import "./search.scss"
const Events = () => {
  const [events, setEvents] = useState([]);
  const [tab, settab] = useState(0);
  const [isShuffle, setIsShuffle] = useState(true);
  // method to fetch all the events
  const getAllEvents = async () => {
    try {
      const res = await axios.get("/api/user/event/getallevents");
      setEvents(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEvents();
  }, []);
  // method to filter the array
  const filterEvents = async (e, category, name) => {
    setIsShuffle(false);
    if(e.target.value === "") {
      getAllEvents();
      setIsShuffle(true);
    }
    let filteredEvents = events.filter(
      (event) => event.category.category.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setEvents(filteredEvents)
  }
  // method to shuffle the events array 
  const shuffleArray = (array) => {
    return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .filter((event)=>{
      return tab === 0 ?  event.eventType === "SPORTS" :  event.eventType === "CULTURAL"
    })
  }
  return (
    <>
      <div className="d-flex flex-md-row flex-column align-items-center">
        <div class="search-box font-medium">
          <button class="btn-search"><i class="fa fa-search text-white"></i></button>
          <input type="text" class="input-search" onChange={(e) => filterEvents(e)} placeholder="Type to Search..." />
        </div>
        <div className="tabs-wrapper font-medium">
          <div className={tab === 0 ? "taeb-switch left text-center" : "taeb-switch right text-center"}>
            <div className={tab === 0 ? "taeb active font-heavy" : "taeb"} taeb-direction="left" onClick={()=>settab(0)}>
              Sports
            </div>
            <div className={tab === 1 ? "taeb active font-heavy" : "taeb"} taeb-direction="right" onClick={()=>settab(1)}>
              Cultural
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: "start",
          flexWrap: 'wrap',
          gap: '10px',
          height: 'fit-content',
        }}
      >
      {events
        ? (isShuffle ? shuffleArray(events).map((eventData, index) => {
            return (
              <EventCard key={index} index={index} data={eventData} isMyEvents={false} />
            );
          }) : 
            events.filter((event)=>{
              return tab === 0 ?  event.eventType === "SPORTS" :  event.eventType === "CULTURAL"
            }).map((eventData, index) => {
            return (
              <EventCard key={index} index={index} data={eventData} isMyEvents={false} />
            );
          })
        ): 
        <Loader />
      }
      {events.length === 0 && 
      <div className="py-5 w-md-100 w-50 mx-auto text-center d-flex flex-column justify-content-center align-items-center">
          <Lottie animationData={noEvents} loop/>
          <h3 className="font-heavy" style={{ color: "#c4515c", fontSize: "2rem" }}>NO EVENTS FOUND!</h3>
        </div>}
    </div>
    </>
  );
};

export default Events;
