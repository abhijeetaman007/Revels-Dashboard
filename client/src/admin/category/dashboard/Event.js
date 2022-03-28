import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { ADMIN_TOKEN_ID } from '../../../utils/constants';
import './EventTitle.css';
import Modal from 'react-modal';

export default Event = ({ eventdata }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '40vmax',
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  const auth = useAuth();
  const header = {
    authorization: localStorage.getItem(ADMIN_TOKEN_ID),
  };

  //update state for all the fields in data
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('');
  const [t3, setT3] = useState('');
  const [t4, setT4] = useState('');

  const [head1N, setHead1N] = useState('');
  const [head2N, setHead2N] = useState('');
  const [head1E, setHead1E] = useState('');
  const [head2E, setHead2E] = useState('');
  const [head1P, setHead1P] = useState('');
  const [head2P, setHead2P] = useState('');

  const [data, setData] = useState({
    eventID: eventdata.eventID,
    name: eventdata.name,
    description: eventdata.description,
    eventType: eventdata.eventType,
    mode: eventdata.mode,
    participationCriteria: eventdata.participationCriteria,
    prize: eventdata.prize,
    minMembers: eventdata.minMembers,
    maxMembers: eventdata.maxMembers,
    eventHeads: eventdata.eventHeads,
    eventDateTime: eventdata.eventDateTime,
    eventVenue: eventdata.eventVenue,
    tags: eventdata.tags,
    // isActive: data.isActive,
  });
  const validateForm = () => {
    if (
      data.name === '' ||
      data.description === '' ||
      data.eventType === '' ||
      data.mode === '' ||
      data.participationCriteria === '' ||
      data.prize === '' ||
      data.minMembers === '' ||
      data.maxMembers === '' ||
      data.eventDateTime === '' ||
      data.eventVenue === ''
    ) {
      return false;
    }
    return true;
  };
  const updateEvent = async () => {
    let tagsarr = [];
    console.log('t1', t1);
    console.log(t2);
    console.log(t3);
    if (t1 != '') tagsarr.push(t1.toUpperCase().trim());
    if (t2 != '') tagsarr.push(t2.toUpperCase().trim());
    if (t3 != '') tagsarr.push(t3.toUpperCase().trim());
    if (t4 != '') tagsarr.push(t4.toUpperCase().trim());
    let headsarr = [];
    console.log(head1N);
    if (head1N != '')
      headsarr.push({
        name: head1N.toUpperCase().trim(),
        phoneNo: head1P,
        email: head1E,
      });
    if (head2N != '')
      headsarr.push({
        name: head2N.toUpperCase().trim(),
        phoneNo: head2P,
        email: head2E,
      });
    console.log(t1);
    console.log(tagsarr);
    console.log(headsarr);
    if (!validateForm()) {
      toast.error('Please fill in all the fields');
    } else {
      try {
        const eventData = {
          eventID: data.eventID,
          name: data.name,
          description: data.description,
          eventType: data.eventType,
          mode: data.mode,
          participationCriteria: data.participationCriteria,
          prize: data.prize,
          minMembers: data.minMembers,
          maxMembers: data.maxMembers,
          eventHeads: headsarr,
          eventDateTime: data.eventDateTime,
          eventVenue: data.eventVenue,
          tags: tagsarr,
          // registeration deadline put later
          //isActive later
          // teamDelegateCard
        };
        console.log('eventdata', eventData);
        const res = await axios.post(
          '/api/admin/category/event/update',
          {
            eventID: eventData.eventID,
            name: eventData.name,
            description: eventData.description,
            eventType: eventData.eventType,
            mode: eventData.mode,
            participationCriteria: eventData.participationCriteria,
            prize: eventData.prize,
            minMembers: eventData.minMembers,
            maxMembers: eventData.maxMembers,
            eventHeads: headsarr,
            eventDateTime: eventData.eventDateTime,
            eventVenue: eventData.eventVenue,
            tags: tagsarr,
          },
          {
            headers: {
              authorization: localStorage.getItem(ADMIN_TOKEN_ID),
            },
          }
        );
        console.log('eeeeeeeeee', res);
        //clear eventdata array
        // setData({
        //   eventID: '',
        //   name: '',
        //   description: '',
        //   eventType: '',
        //   mode: '',
        //   participationCriteria: '',
        //   prize: '',
        //   minMembers: '',
        //   maxMembers: '',
        //   // eventHeads: [],
        //   teamDelegateCardWorks: '',
        //   delegateCards: '',
        //   eventDateTime: '',
        //   eventVenue: '',
        //   // tags: [],});
        // });
        //reload window
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="overlay"
      >
        <div className="cross" onClick={closeModal}>
          X
        </div>
        <label className="font-medium mt-2">Event Name</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Name Here"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label className="font-medium mt-2">Min Members</label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Name Here"
          value={data.minMembers}
          onChange={(e) => setData({ ...data, minMembers: e.target.value })}
        />
        <label className="font-medium mt-2">Max Members</label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Name Here"
          value={data.maxMembers}
          onChange={(e) => setData({ ...data, maxMembers: e.target.value })}
        />

        <label className="font-medium mt-3">Event Description</label>
        <textarea
          rows="4"
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={2000}
          className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event description Here"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />

        <label for="mode" className="font-medium mt-3">
          Event Type
        </label>
        <select
          name=""
          id="mode"
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          onChange={(e) => setData({ ...data, eventType: e.target.value })}
        >
          <option selected="true" disabled="disabled" value="">
            Select Option
          </option>
          <option value="CULTURAL">Cultural</option>
          <option value="SPORTS">Sports</option>
          <option value="MISC">Miscellaneous</option>
        </select>
        <label for="mode" className="font-medium mt-3">
          Mode
        </label>
        <select
          name=""
          id="mode"
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          onChange={(e) => setData({ ...data, mode: e.target.value })}
        >
          <option selected="true" disabled="disabled" value="">
            Select Option
          </option>
          <option value="ONLINE">Online</option>
          <option value="OFFLINE">Offline</option>
        </select>

        <label className="font-medium mt-2">Prize</label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event prize Here"
          onChange={(e) => setData({ ...data, prize: e.target.value })}
        />
        <label className="font-medium mt-2">Participation Criteria</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          maxLength={1000}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event participation criteria Here"
          onChange={(e) =>
            setData({ ...data, participationCriteria: e.target.value })
          }
        />

        <label className="font-medium mt-2 w-100">Tags</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          maxLength={100}
          className="m-1 h-25 rounded mx-0 text-dark font-light"
          placeholder="Tag 1"
          style={{ width: '20%' }}
          onChange={(e) => setT1(e.target.value)}
        />
        <input
          type="text"
          name=""
          autoComplete="off"
          maxLength={100}
          className="m-1 h-25 rounded mx-0 text-dark font-light"
          placeholder="Tag 2"
          style={{ width: '20%' }}
          onChange={(e) => setT2(e.target.value)}
        />
        <input
          type="text"
          name=""
          autoComplete="off"
          maxLength={100}
          className="m-1 h-25 rounded mx-0 text-dark font-light"
          placeholder="Tag 3"
          style={{ width: '20%' }}
          onChange={(e) => setT3(e.target.value)}
        />
        <input
          type="text"
          name=""
          autoComplete="off"
          maxLength={100}
          className="m-1 h-25 rounded mx-0 text-dark font-light"
          placeholder="Tag 4"
          style={{ width: '20%' }}
          onChange={(e) => setT4(e.target.value)}
        />

        <label className="font-medium mt-3 w-100">Event Date</label>
        <input
          type="date"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="13/04/2022"
          onChange={(e) => setData({ ...data, eventDateTime: e.target.value })}
        />

        <label className="font-medium mt-3">Event Venue</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="AB5 203"
          onChange={(e) => setData({ ...data, eventVenue: e.target.value })}
        />

        <div className="font-heavy mt-4 h5">Event Head details:</div>
        <div className="font-heavy mt-4 h6">Event Head 1:</div>
        <label className="font-medium mt-2">Name</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head Name Here"
          onChange={(e) => setHead1N(e.target.value)}
        />
        <label className="font-medium mt-2">Phone number</label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          maxLength={10}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head phone number Here"
          onChange={(e) => setHead1P(e.target.value)}
        />
        <label className="font-medium mt-2">Email ID</label>
        <input
          type="email"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head Email ID Here"
          onChange={(e) => setHead1E(e.target.value)}
        />
        {/* event head 2 */}
        <div className="font-heavy mt-4 h6">Event Head 2:</div>
        <label className="font-medium mt-2">Name</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head Name Here"
          onChange={(e) => setHead2N(e.target.value)}
        />
        <label className="font-medium mt-2">Phone number</label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          maxLength={10}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head phone number Here"
          onChange={(e) => setHead2P(e.target.value)}
        />
        <label className="font-medium mt-2">Email ID</label>
        <input
          type="email"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head Email ID Here"
          onChange={(e) => setHead2E(e.target.value)}
        />

        <button
          type="button"
          className="btn my-2 w-100 text-light"
          style={{ backgroundColor: '#100B1B' }}
          onClick={updateEvent}
        >
          Save
        </button>
      </Modal>
      <div className="main-wrapper font-light text-white m-1 rounded p-4">
        <div className="dy-flex flex-row justify-content-between align-items-center">
          {data.name}&nbsp;
          <i
            onClick={openModal}
            className="edit fa fa-pencil"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  );
};
