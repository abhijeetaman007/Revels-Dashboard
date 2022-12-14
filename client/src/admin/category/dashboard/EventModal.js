import React, { useEffect, useState } from 'react';
import moment from 'moment';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ADMIN_TOKEN_ID } from '../../../utils/constants';
import './EventTitle.css';
import Modal from 'react-modal';
import Tag from '../components/Tag/Tag';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const EventModal = ({ eventdata, deleteEvent, downloadTeams, category }) => {
  const [isChecked, setIsChecked] = useState(eventdata.teamDelegateCard);
  const [filteredDel, setFilteredDel] = useState([]);

  const handleChange = async (e) => {
    console.log('e', e);
    setFilteredDel(e);
  };

  const [delCards, setDelCards] = useState([]);

  const [options, setOptions] = useState([]);
  const convertTime = (time) => {
    let newtime = new Date(time);
    //return local date and time
    return newtime.toLocaleString();
    // return newtime.toLocaleTimeString();
  };
  const getDelCards = async () => {
    try {
      const res = await axios.get('/api/user/delegatecard/getall');
      // console.log('uhhhhhh', res.data.data);
      setDelCards(res.data.data);
      const arr = [];
      res.data.data.map((x) => {
        // console.log(x);
        arr.push({ value: x.cardID, label: x.name });
      });
      // console.log('arr', arr);
      setOptions(arr);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = () => {
    setIsChecked(!isChecked);
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
  useEffect(() => {
    getDelCards();
    // getParticipantsForOps();
    let filterArray = [];
    for (let i = 0; i < eventdata.delegateCards.length; i++) {
      filterArray.push({
        value: eventdata.delegateCards[i].cardID,
        label: eventdata.delegateCards[i].name,
      });
    }
    setFilteredDel(filterArray);
  }, []);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    // setT1('');
    // setT2('');
    // setT3('');
    // setT4('');

    setIsOpen(false);
  };
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('');
  const [t3, setT3] = useState('');
  const [t4, setT4] = useState('');
  const [head1N, setHead1N] = useState('');
  const [head2N, setHead2N] = useState('');
  const [head1E, setHead1E] = useState('');
  const [head2E, setHead2E] = useState('');
  const [head1P, setHead1P] = useState(0);
  const [head2P, setHead2P] = useState(0);
  const [headlen, setHeadlen] = useState(eventdata.eventHeads.length);
  const [numTags, setNumTags] = useState(
    eventdata.tags.length ? eventdata.tags.length : 1
  );

  const [data, setData] = useState({
    _id: eventdata._id,
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
    eventDateTime: new Date(eventdata.eventDateTime),
    registrationDeadline: new Date(eventdata.registrationDeadline),
    eventVenue: eventdata.eventVenue,
    tags: eventdata.tags,
    teamDelegateCard: isChecked,
    delegateCards: eventdata.delegateCards,
    // isActive: data.isActive,
  });
  const getParticipantsForOps = async () => {
    console.log(data);
    try {
      const path =
        '/api/admin/category/event/participants/' +
        data._id +
        '/' +
        data.eventID +
        '/' +
        data.name.split('/')[0] +
        '/' +
        data.maxMembers +
        '/' +
        localStorage.getItem(ADMIN_TOKEN_ID) +
        '/' +
        data.delegateCards[0]._id;
      const res = await axios.get(path);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const validateForm = () => {
    console.log(data);
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
      // data.participationCriteria === '' ||
      // data.prize === '' ||
      // data.eventDateTime === '' ||
      // data.eventVenue === ''
    ) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    // set tags data
    if (numTags > 0) {
      setT1(eventdata.tags[0]);
    }
    if (numTags > 1) {
      setT2(eventdata.tags[1]);
    }
    if (numTags > 2) {
      setT3(eventdata.tags[2]);
    }
    if (numTags > 3) {
      setT4(eventdata.tags[3]);
    }
    // set event head information
    if (headlen > 0) {
      setHead1N(eventdata.eventHeads[0].name);
      setHead1E(eventdata.eventHeads[0].email);
      setHead1P(eventdata.eventHeads[0].phoneNo);
    }
    if (headlen > 1) {
      setHead2N(eventdata.eventHeads[1].name);
      setHead2E(eventdata.eventHeads[1].email);
      setHead2P(eventdata.eventHeads[1].phoneNo);
    }
  }, []);
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const updateEvent = async () => {
    const toastId = toast.loading('Updating Event');
    const delArr = [];
    for (let i = 0; i < filteredDel.length; i++) {
      delArr.push({ cardID: filteredDel[i].value });
    }
    console.log('ooooooffff');
    console.log(delArr);
    let tagsarr = [];

    if (numTags.length !== 0) {
      if (t1 !== '' && t1 != undefined) tagsarr.push(t1.toUpperCase().trim());
      if (t2 !== '' && t2 != undefined) tagsarr.push(t2.toUpperCase().trim());
      if (t3 !== '' && t3 != undefined) tagsarr.push(t3.toUpperCase().trim());
      if (t4 !== '' && t4 != undefined) tagsarr.push(t4.toUpperCase().trim());
    }
    console.log(tagsarr);
    let headsarr = [];
    if (head1N !== '')
      headsarr.push({
        name: head1N.toUpperCase().trim(),
        phoneNo: head1P,
        email: head1E,
      });
    if (head2N !== '')
      headsarr.push({
        name: head2N.toUpperCase().trim(),
        phoneNo: head2P,
        email: head2E,
      });
    if (!validateForm()) {
      console.log('ok123');
      toast.error('Please fill in all the fields', {
        id: toastId,
      });
    }
    // else if (
    //   head1P.toString().length !== 10 ||
    //   (head2P.toString().length !== 0 && head2P.toString().length !== 10)
    // ) {
    //   toast.error('Please enter valid phone number');
    // } else if (validateEmail(head1E.toString()) === false) {
    //   toast.error('Please enter valid email for Head 1');
    // } else if (
    //   head2E.toString().length !== 0 &&
    //   validateEmail(head2E) === false
    // ) {
    //   toast.error('Please enter valid email for Head 2');
    // }
    else if (
      (head2E != '' && (head2P == '' || head2N == 0)) ||
      (head2N != 0 && (head2P == '' || head2E == '')) ||
      (head2P != '' && (head2E == '' || head2N == 0))
    ) {
      console.log('ok');
      toast.error("Please complete Event Head 2's details", {
        id: toastId,
      });
    } else {
      try {
        console.log(tagsarr);
        console.log('supppppppppppp');
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
          eventDateTime: new Date(data.eventDateTime),
          registrationDeadline: new Date(data.registrationDeadline),
          eventVenue: data.eventVenue,
          tags: tagsarr,
          teamDelegateCard: isChecked,
          delegateCards: delArr,
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
            registrationDeadline: eventData.registrationDeadline,
            eventVenue: eventData.eventVenue,
            tags: tagsarr,
            teamDelegateCard: isChecked,
            delegateCards: delArr,
          },
          {
            headers: {
              authorization: localStorage.getItem(ADMIN_TOKEN_ID),
            },
          }
        );

        if (res.data.success) {
          toast.success('Event updated successfully', {
            id: toastId,
          });

          closeModal();
          // window reload
          window.location.reload();
        } else {
          toast.error(res.data.msg, {
            id: toastId,
          });
        }
      } catch (err) {
        toast.error('Something Went Wrong', {
          id: toastId,
        });
      }
    }
  };
  const addTagElement = () => {
    setNumTags(numTags + 1);
  };
  const disabled = {
    disabled: Boolean(category?.categoryId === 'OPR') && true,
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Event Modal"
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
          {...disabled}
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Name Here"
          value={data.name}
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
              {...disabled}
              maxLength={100}
              className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
              placeholder="Minimum number of members"
              value={data.minMembers}
              onChange={(e) =>
                setData({ ...data, minMembers: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="w-md-50 w-100 mx-md-1">
            <label className="font-medium mt-2">
              Max Members<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="number"
              autoComplete="off"
              required
              {...disabled}
              maxLength={100}
              className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
              placeholder="Maximum number of members"
              value={data.maxMembers}
              onChange={(e) =>
                setData({ ...data, maxMembers: parseInt(e.target.value) })
              }
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
          {...disabled}
          maxLength={2000}
          className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event description Here"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <label className="font-medium mt-3">
          Delegate Cards Needed for Event
          <span style={{ color: 'red' }}>*</span>
        </label>
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated}
          isMulti
          options={options}
          value={filteredDel}
          onChange={(e) => handleChange(e)}
          {...disabled}
        />
        <div className="d-flex flex-md-row flex-column">
          <div className="w-md-50 w-100 mx-md-1">
            <label for="mode" className="font-medium mt-3">
              Event Type<span style={{ color: 'red' }}>*</span>
            </label>
            <select
              value={data.eventType}
              id="type"
              {...disabled}
              className="my-1 h-50 rounded mx-0 w-100 text-dark font-light"
              onChange={(e) => setData({ ...data, eventType: e.target.value })}
            >
              <option selected="true" disabled="disabled" value="">
                Select Option
              </option>
              <option value="CULTURAL">Cultural</option>
              <option value="SPORTS">Sports</option>
            </select>
          </div>
          <div className="w-md-50 w-100 mx-md-1">
            <label for="mode" className="font-medium mt-3">
              Mode<span style={{ color: 'red' }}>*</span>
            </label>
            <select
              value={data.mode}
              id="mode"
              {...disabled}
              className="my-1 h-50 rounded mx-0 w-100 text-dark font-light"
              onChange={(e) => setData({ ...data, mode: e.target.value })}
            >
              <option selected="true" disabled="disabled" value="">
                Select Option
              </option>
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
            </select>
          </div>
        </div>
        <div className="delcard">
          <label className="font-heavy mt-2 w-100">
            Delegate Card Required by only Team Leader?
          </label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleOnChange}
            {...disabled}
            value=""
          ></input>
        </div>

        <label className="font-medium mt-2">Prize</label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          {...disabled}
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event prize Here"
          value={data.prize}
          onChange={(e) =>
            setData({ ...data, prize: parseInt(e.target.value) })
          }
        />
        <label className="font-medium mt-2">Participation Criteria</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          maxLength={1000}
          {...disabled}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event participation criteria Here"
          value={data.participationCriteria}
          onChange={(e) =>
            setData({ ...data, participationCriteria: e.target.value })
          }
        />

        <label className="font-medium mt-2 w-100">
          Tags (no space in between a tag)
        </label>
        <Tag
          placeholder={'Tag 1'}
          setTag={setT1}
          value={t1}
          disabled={disabled.disabled}
        />
        {numTags >= 2 && (
          <Tag
            placeholder={'Tag 2'}
            setTag={setT2}
            value={t2}
            disabled={disabled.disabled}
          />
        )}
        {numTags >= 3 && (
          <Tag
            placeholder={'Tag 3'}
            setTag={setT3}
            value={t3}
            disabled={disabled.disabled}
          />
        )}
        {numTags >= 4 && (
          <Tag
            placeholder={'Tag 4'}
            setTag={setT4}
            value={t4}
            disabled={disabled.disabled}
          />
        )}
        {numTags !== 4 && (
          <i
            className="fa fa-plus-square"
            onClick={!disabled.disabled && addTagElement}
          ></i>
        )}

        <label className="font-medium mt-3 w-100">Event Date</label>
        <input
          type="datetime-local"
          name=""
          autoComplete="off"
          // value={data.eventDateTime}
          // required
          maxLength={100}
          className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Date"
          onChange={(e) =>
            setData({ ...data, eventDateTime: new Date(e.target.value) })
          }
        />
        <p>Previous selected date: {convertTime(eventdata.eventDateTime)}</p>
        <label className="font-medium mt-3 w-100">Registration Deadline</label>
        <input
          type="datetime-local"
          name=""
          autoComplete="off"
          maxLength={100}
          className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Date"
          {...disabled}
          onChange={(e) =>
            setData({ ...data, registrationDeadline: new Date(e.target.value) })
          }
        />
        <p>
          Previous selected date: {convertTime(eventdata.registrationDeadline)}
        </p>
        <label className="font-medium mt-3">Event Venue</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          // required
          maxLength={100}
          className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Venue"
          value={data.eventVenue}
          onChange={(e) => setData({ ...data, eventVenue: e.target.value })}
        />

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
          {...disabled}
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head name"
          value={head1N}
          onChange={(e) => setHead1N(e.target.value)}
        />
        <label className="font-medium mt-2">
          Phone Number<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          {...disabled}
          maxLength={10}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head phone number"
          value={head1P}
          onChange={(e) => setHead1P(parseInt(e.target.value))}
        />
        <label className="font-medium mt-2">
          Email ID<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="email"
          name=""
          autoComplete="off"
          required
          {...disabled}
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head email ID"
          value={head1E}
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
          {...disabled}
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head name"
          value={head2N}
          onChange={(e) => setHead2N(e.target.value)}
        />
        <label className="font-medium mt-2">phoneNo number</label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          {...disabled}
          maxLength={10}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head phone number"
          value={head2P}
          onChange={(e) => setHead2P(parseInt(e.target.value))}
        />
        <label className="font-medium mt-2">Email ID</label>
        <input
          type="email"
          name=""
          autoComplete="off"
          required
          {...disabled}
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head email ID"
          value={head2E}
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
        <div className="d-flex flex-row justify-content-between align-items-center">
          {data.name}&nbsp;
          <div className="d-flex align-items-center justify-content-center">
            <i
              onClick={openModal}
              className="edit fa fa-pencil"
              aria-hidden="true"
              style={{ marginRight: '1rem', color: '#F4737E' }}
            ></i>
            {category?.categoryId === 'OPR' && (
              <div className="text-danger" style={{ fontSize: '0.9rem' }}>
                <p>
                  {eventdata.teamCount} TEAM
                  {eventdata.teamCount === 1 ? '' : 'S'}
                </p>
              </div>
            )}
            {category?.categoryId !== 'OPR' && (
              <i
                onClick={() => deleteEvent(data.eventID)}
                className="edit fa fa-trash"
                aria-hidden="true"
                style={{ marginRight: '1rem', color: '#F4737E' }}
              ></i>
            )}
            {category?.categoryId !== 'OPR' && (
              <a
                href={
                  data.delegateCards.length > 0
                    ? 'https://revelsmit.in/api/admin/category/event/participants/' +
                      data._id +
                      '/' +
                      data.eventID +
                      '/' +
                      data.name.split('/')[0] +
                      '/' +
                      data.maxMembers +
                      '/' +
                      localStorage.getItem(ADMIN_TOKEN_ID) +
                      '/' +
                      data.delegateCards[0]._id
                    : 'https://revelsmit.in/api/admin/category/event/participants/' +
                      data._id +
                      '/' +
                      data.eventID +
                      '/' +
                      data.name.split('/')[0] +
                      '/' +
                      data.maxMembers +
                      '/' +
                      localStorage.getItem(ADMIN_TOKEN_ID) +
                      '/none'
                }
              >
                <i
                  className="edit fa fa-download"
                  aria-hidden="true"
                  style={{ marginRight: '1rem', color: '#F4737E' }}
                ></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
