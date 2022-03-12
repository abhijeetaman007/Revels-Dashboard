import React from "react"
import EventCard from "../../components/EventCard/EventCard"
import Layout from "../Layout/Layout"

const Events = () => {
    return (
        <Layout activeTab="events" className="events-page">
            <EventCard />
            <EventCard />
            <EventCard />
        </Layout>
    )
}

export default Events