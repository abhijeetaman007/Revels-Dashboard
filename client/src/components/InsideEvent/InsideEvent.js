import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../pages/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import './InsideEvent.scss';
const InsideEvent = () => {
  const { eventid } = useParams();
  const [event, setEvent] = React.useState({});
  const formatDate = (str) => {
    // var str = '2011-04-11T10:20:30Z';
    var date = moment(str);
    var dateComponent = date.utc().format('DD-MM-YY');
    var timeComponent = date.utc().format('HH:mm');
    return dateComponent + ' , ' + timeComponent;
  };
  const callEventByID = async () => {
    const res = await axios.get('/api/user/getevent/' + eventid);
    console.log(res.data.data);
    setEvent(res.data.data);
  };
  useEffect(() => {
    callEventByID();
  }, []);
  const createTeam = () => {
    console.log('!');
  };
  const joinTeam = () => {
    console.log('!');
  };
  return (
    <Layout activeTab={'events'}>
      <div className="event-details">
        <div className="ele">
          <p className="font-heavy">{event.eventType}</p>
          <p className="font-light">{event.name}</p>
        </div>
        <div className="event-grp ele">
          <div className="compo">
            <p className="font-heavy">Team Size</p>
            <p className="font-light">
              {event.minMembers}&nbsp;-&nbsp;{event.maxMembers}
            </p>
          </div>
          <div className="compo">
            <p className="font-heavy">Date</p>
            <p className="font-light">{formatDate(event.eventDateTime)}</p>
          </div>
          <div className="compo ">
            <p className="font-heavy">Venue</p>
            <p className="font-light">{event.eventVenue}</p>
          </div>
        </div>
        <div className="ele font-light">{event.description}</div>
        <div className="ele">
          <button onClick={createTeam}>Create Team</button>
          <button onClick={joinTeam}>Join Team</button>
        </div>
      </div>
    </Layout>
  );
};

export default InsideEvent;
