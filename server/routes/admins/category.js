const Event = require('../../models/Event');
const jwt = require('jsonwebtoken');
const DelCard = require('../../models/DelegateCard');
const Category = require('../../models/Category');

const addEvent = async (req, res) => {
  console.log('Adding Event');
  console.log(req.body);
  try {
    //TODO : Add validations
    let {
      name,
      description,
      eventType,
      mode,
      participationCriteria,
      prize,
      minMembers,
      maxMembers,
      eventHeads,
      delegateCards, //List of all needed delegate card IDs
      //   eventDateTime, (To be set by operations)
      //   eventVenue,
      tags,
      teamDelegateCardWorks, //If team leader delegate Card is sufficient for registration
    } = req.body;

    let eventName = await Event.exists({ name });
    if (eventName)
      return res.status(400).send({
        success: false,
        msg: 'Event with same name is already registered',
      });

    let ids = await Event.find({}, { eventID: 1, _id: 0 })
      .sort({ eventID: -1 })
      .limit(1);
    let eventID = 101;
    if (ids[0]) {
      eventID = ids[0].eventID + 1;
    }
    if (
      //   !eventVenue ||
      //   !eventDateTime ||
      !name ||
      !eventType ||
      !mode ||
      // !participationCriteria ||
      !minMembers ||
      !maxMembers
    ) {
      return res
        .status(400)
        .send({ success: false, msg: 'Please fill required fields' });
    }
    console.log(minMembers + ',' + maxMembers);
    if (Number(minMembers) > Number(maxMembers) || Number(minMembers) < 1)
      return res.send({ success: false, msg: 'Invalid Members' });
    // let dateTime = new Date(eventDateTime);
    // eventDateTime = dateTime;
    // if (eventDateTime.toString() == 'Invalid Date') {
    //   return res.status(400).send({
    //     success: false,
    //     msg: 'Valid DataTime in IST is required',
    //   });
    // }
    // console.log('Date Time is ', eventDateTime);

    //registrationDeadline is same as event Start Time by default
    // let registrationDeadline = eventDateTime;
    let delCards = [];
    if (!delegateCards) delegateCards = [];
    for (let i = 0; i < delegateCards.length; i++) {
      let validCard = await DelCard.findOne(
        { cardID: delegateCards[i] },
        { _id: 1 }
      );
      if (!validCard) {
        return res
          .status(400)
          .send({ success: false, msg: 'Invalid Delegate Card' });
      }
      delCards.push(validCard._id);
    }
    // console.log("test: ",req.requestAdmin.role.categoryId)
    // console.log("Test DelCard",delCards)
    let newEvent = new Event({
      eventID,
      name,
      category: req.requestAdmin.role.categoryId, //Change
      description,
      eventType,
      mode,
      participationCriteria,
      prize,
      minMembers,
      maxMembers,
      eventHeads,
      //   eventDateTime,
      //   eventVenue,
      //   registrationDeadline,
      tags,
      teamDelegateCardWorks,
      delegateCards: delCards, //TODO: Check on delegate Cards
    });

    await newEvent.save();
    return res
      .status(200)
      .send({ success: true, msg: 'Event Added', data: newEvent });
  } catch (err) {
    console.log(err.name);
    console.log(err);
    res.status(500).send({ success: false, msg: 'Internal Server Error' });
  }
};
const getCategoryEvent = async (req, res) => {
  try {
    let category_Id = req.requestAdmin.role.categoryId;
    console.log('catid', category_Id);
    let events = await Event.find({ category: category_Id });
    console.log('events', events);
    return res.status(200).send({ success: true, data: events });
  } catch {
    console.log(err);
    res.status(500).send({ success: false, msg: 'Internal Server Error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    console.log('Event update');
    let {
      eventID,
      name,
      description,
      eventType,
      mode,
      participationCriteria,
      prize,
      minMembers,
      maxMembers,
      eventHeads,
      teamDelegateCardWorks,
      delegateCards, //List of Delegate CardIDs
      // eventDateTime,
      // eventVenue,
      tags,
    } = req.body;
    let event = await Event.exists({ eventID });
    console.log(event);
    if (!event)
      return res.status(400).send({
        success: false,
        msg: 'Invalid Event ID',
      });
    if (name) {
      let event = await Event.findOne({ name }, { name, eventID });
      if (event) {
        if (event.name == name && event.eventID != eventID)
          return res.status(400).send({
            success: false,
            msg: 'Event with same name is already registered',
          });
      }
    }
    if (Number(minMembers) > Number(maxMembers) || Number(minMembers) < 1)
      return res.send({ success: false, msg: 'Invalid Members' });
    // if (eventDateTime) {
    //   let dateTime = new Date(eventDateTime);
    //   eventDateTime = dateTime;
    //   registrationDeadline = eventDateTime;
    //   if (eventDateTime.toString() == 'Invalid Date') {
    //     return res.status(400).send({
    //       success: false,
    //       msg: 'Valid DataTime in IST is required',
    //     });
    //   }
    // }

    //Check for more validations
    let newDelegateCards = [];
    for (let i = 0; delegateCards && i < delegateCards.length; i++) {
      let card = await DelCard.findOne({ cardID: delegateCards[i].cardID });
      if (!card)
        return res
          .status(400)
          .send({ success: false, msg: 'Invalid Delegate Card' });
      newDelegateCards.push(card._id);
    }

    console.log('Sending ', newDelegateCards);

    await Event.findOneAndUpdate(
      { eventID },
      {
        name,
        description,
        eventType,
        mode,
        participationCriteria,
        prize,
        minMembers,
        maxMembers,
        eventHeads,
        // eventDateTime,
        // eventVenue,
        // registrationDeadline,
        tags,
        delegateCards: newDelegateCards,
        teamDelegateCardWorks,
      }
    );
    return res.status(200).send({ success: true, msg: 'Event Updated' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: 'Internal Server Error' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    console.log('Event delete');
    let eventID = req.body.eventID;
    let event = await Event.findOneAndDelete({ eventID });
    if (!event)
      return res.status(400).send({ success: false, msg: 'Event Not Found' });
    return res.status(200).send({ success: true, msg: 'Event Deleted' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: 'Internal Server Error' });
  }
};
const getCategory = async (req, res) => {
  try {
    let category_Id = req.requestAdmin.role.categoryId;
    console.log('catid', category_Id);
    let category = await Category.findById(category_Id);
    console.log('category', category);
    return res.status(200).send({ success: true, data: category });
  } catch {
    console.log(err);
    res.status(500).send({ success: false, msg: 'Internal Server Error' });
  }
};
module.exports = {
  addEvent,
  getCategoryEvent,
  updateEvent,
  deleteEvent,
  getCategory,
};
