import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar/Navbar';
import Tag from '../components/Tag/Tag';
import axios from 'axios';
import { ADMIN_TOKEN_ID } from '../../../utils/constants';
import './EventTitle.css';
import Modal from 'react-modal';
import Event from './Event';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Loader from '../../../pages/Loader/Loader';
const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const validateForm = () => {
    if (
      data.name === '' ||
      data.minMembers === 0 ||
      data.maxMembers === 0 ||
      data.description === '' ||
      data.eventType === '' ||
      data.mode === '' ||
      head1N === '' ||
      head1P === 0 ||
      head1E === ''
    ) {
      return false;
    }
    return true;
  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setNumTags(1);
    setT1('');
    setT2('');
    setT3('');
    setT4('');
    setIsOpen(false);
  }
  const header = {
    authorization: localStorage.getItem(ADMIN_TOKEN_ID),
  };
  const [category, setCategory] = useState({});
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const getEvents = async () => {
    try {
      const res = await axios.get('/api/admin/category/event/getevents', {
        headers: header,
      });
      setEvents(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategory = async () => {
    try {
      const res = await axios.get('/api/admin/category', {
        headers: header,
      });
      if (res.data.success) {
        setCategory(res.data.data);
      } else {
        toast.error('Error setting category!');
      }
    } catch (err) {
      console.log(err);
    }
  };
  //add state for all the fields in data
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
  const [numTags, setNumTags] = useState(1);

  const [data, setData] = useState({
    eventID: '',
    name: '',
    description: '',
    eventType: '',
    mode: '',
    participationCriteria: '',
    prize: '',
    minMembers: 0,
    maxMembers: 0,
    eventHeads: [],
    teamDelegateCardWorks: '',
    delegateCards: '',
    tags: [],
  });
  const addTagElement = () => {
    setNumTags(numTags + 1);
  };
  const addEvent = async () => {
    let tagsarr = [];
    if (t1 != '') tagsarr.push(t1.toUpperCase().trim());
    if (t2 != '') tagsarr.push(t2.toUpperCase().trim());
    if (t3 != '') tagsarr.push(t3.toUpperCase().trim());
    if (t4 != '') tagsarr.push(t4.toUpperCase().trim());
    let headsarr = [];
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
    if (!validateForm()) {
      toast.error('Please fill in all the fields');
    } else {
      try {
        const eventData = {
          name: data.name,
          description: data.description,
          eventType: data.eventType,
          mode: data.mode,
          participationCriteria: data.participationCriteria,
          prize: data.prize,
          minMembers: data.minMembers,
          maxMembers: data.maxMembers,
          eventHeads: headsarr,
          tags: tagsarr,
        };
        const res = await axios.post(
          '/api/admin/category/event/add',
          {
            name: eventData.name,
            description: eventData.description,
            eventType: eventData.eventType,
            mode: eventData.mode,
            participationCriteria: eventData.participationCriteria,
            prize: eventData.prize,
            minMembers: eventData.minMembers,
            maxMembers: eventData.maxMembers,
            eventHeads: headsarr,
            tags: tagsarr,
          },
          {
            headers: {
              authorization: localStorage.getItem(ADMIN_TOKEN_ID),
            },
          }
        );
        if (res.data.success) {
          setData({
            eventID: '',
            name: '',
            description: '',
            eventType: '',
            mode: '',
            participationCriteria: '',
            prize: '',
            minMembers: 0,
            maxMembers: 0,
            eventHeads: [],
            teamDelegateCardWorks: '',
            delegateCards: '',
            tags: [],
          });
          closeModal();
          toast.success('Event added successfully');
        } else {
          toast.error(res.data.msg);
        }
      } catch (err) {
        toast.error('err');
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getCategory();
    getEvents();
  }, [events]);

  return (
    <div>
      <Navbar />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="overlay"
      >
        <div className="cross" onClick={closeModal}>
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <label className="font-medium mt-2">
          Event Name<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <div className="d-flex flex-md-row flex-column">
          <div className="w-md-50 w-100 mx-md-1">
            <label className="font-medium mt-2">
              Min Members<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="number"
              name=""
              autoComplete="off"
              required
              maxLength={100}
              className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
              placeholder="Minimum number of members"
              onChange={(e) => setData({ ...data, minMembers: e.target.value })}
            />
          </div>
          <div className="w-md-50 w-100 mx-md-1">
            <label className="font-medium mt-2">
              Max Members<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="number"
              name=""
              autoComplete="off"
              required
              maxLength={100}
              className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
              placeholder="Maximum number of members"
              onChange={(e) => setData({ ...data, maxMembers: e.target.value })}
            />
          </div>
        </div>
        <label className="font-medium mt-3">
          Event Description<span style={{ color: 'red' }}>*</span>
        </label>
        <textarea
          rows="4"
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={2000}
          className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event description"
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />

        <label for="mode" className="font-medium mt-3">
          Event Type<span style={{ color: 'red' }}>*</span>
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
        </select>
        <label for="mode" className="font-medium mt-3">
          Mode<span style={{ color: 'red' }}>*</span>
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
          placeholder="Event prize"
          onChange={(e) => setData({ ...data, prize: e.target.value })}
        />
        <label className="font-medium mt-2">Participation Criteria</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          maxLength={1000}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event participation criteria"
          onChange={(e) =>
            setData({ ...data, participationCriteria: e.target.value })
          }
        />

        <label className="font-medium mt-2 w-100">Tags (optional)</label>
        <Tag placeholder={'Tag 1'} setTag={setT1} value={t1} />
        {numTags >= 2 && (
          <Tag placeholder={'Tag 2'} setTag={setT2} value={t2} />
        )}
        {numTags >= 3 && (
          <Tag placeholder={'Tag 3'} setTag={setT3} value={t3} />
        )}
        {numTags >= 4 && (
          <Tag placeholder={'Tag 4'} setTag={setT4} value={t4} />
        )}
        {numTags !== 4 && (
          <i className="fa fa-plus-square" onClick={addTagElement}></i>
        )}
        <div className="font-heavy mt-4 h5">Event Head details</div>
        <div className="font-heavy mt-4 h6">Event Head 1</div>
        <label className="font-medium mt-2">
          Name<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head Name"
          onChange={(e) => setHead1N(e.target.value)}
        />
        <label className="font-medium mt-2">
          Phone number<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          maxLength={10}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head phone number"
          onChange={(e) => setHead1P(e.target.value)}
        />
        <label className="font-medium mt-2">
          Email ID<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="email"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head Email ID "
          onChange={(e) => setHead1E(e.target.value)}
        />
        {/* event head 2 */}
        <div className="font-heavy mt-4 h6">Event Head 2 (optional)</div>
        <label className="font-medium mt-2">Name</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head name"
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
          placeholder="Event Head phone number"
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
          placeholder="Event Head Email ID"
          onChange={(e) => setHead2E(e.target.value)}
        />

        <button
          type="button"
          className="btn my-2 w-100 text-light"
          style={{ backgroundColor: '#100B1B' }}
          onClick={addEvent}
        >
          Save
        </button>
      </Modal>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="font-heavy text-light my-3 px-5 d-flex align-items-center">
          <div style={{ fontSize: '2rem' }}>{category.category}</div>
          <div
            className="text-secondary pl-3 ml-3 border-left"
            style={{ fontSize: '1.2rem' }}
          >
            {events.length} events
          </div>
        </div>
        <div
          className="font-light border border-light rounded text-light p-2 text-center"
          style={{ width: '70%' }}
        >
          {category.description}
        </div>

        <button
          type="button"
          className="btn m-2 text-white"
          style={{ backgroundColor: '#F4737E', width: '200px' }}
          onClick={openModal}
        >
          Create Event
        </button>
        <div className="d-flex flex-wrap" style={{ margin: '4rem 5rem' }}>
          {events.map((eventdata) => (
            <Event eventdata={eventdata} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
