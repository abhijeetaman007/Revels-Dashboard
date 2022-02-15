const Event = require("../../models/Event");
const moment = require("moment");

const addEvent = async (req, res) => {
  console.log("ok");
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
      eventDateTime,
      eventVenue,
      tags,
    } = req.body;
    let eventName = await Event.findOne({ name });
    if (eventName)
      return res.status(400).send({
        success: false,
        msg: "Event with same name is already registered",
      });

    let ids = await Event.find({}, { eventID: 1, _id: 0 })
      .sort({ eventID: -1 })
      .limit(1);
    let eventID = 5001;
    if (ids[0]) {
      eventID = ids[0].eventID + 1;
    }
    if (
      // !eventVenue ||
      // !eventDateTime ||
      !name ||
      !eventType ||
      !mode ||
      !participationCriteria ||
      !minMembers ||
      !maxMembers
    ) {
      return res
        .status(400)
        .send({ success: false, msg: "Please fill required fields" });
    }

    let dateTime = new Date(eventDateTime);
    eventDateTime = dateTime;
    if (eventDateTime.toString() == "Invalid Date") {
      return res.status(400).send({
        success: false,
        msg: "Valid DataTime in IST is required",
      });
    }
    console.log("Date Time is ", eventDateTime);

    //registrationDeadline is same as event Start Time by default
    let registrationDeadline = eventDateTime;
    let newEvent = new Event({
      eventID,
      name,
      category: req.requestCategory._id,
      description,
      eventType,
      mode,
      participationCriteria,
      prize,
      minMembers,
      maxMembers,
      eventHeads,
      eventDateTime,
      eventVenue,
      registrationDeadline,
      tags,
    });

    await newEvent.save();
    return res
      .status(200)
      .send({ success: true, msg: "Event Added", data: newEvent });
  } catch (err) {
    console.log(err.name);
    console.log(err);
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
};
const getCategoryEvent = async (req, res) => {
  try {
    let category_Id = req.requestCategory._id;
    let events = await Event.find({ category: category_Id }).populate(
      "participants"
    );
    return res.status(200).send({ success: true, data: events });
  } catch {
    console.log(err);
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
};

const updateEvent = async (req, res) => {
  try {
    console.log("Event update");
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
      eventDateTime,
      eventVenue,
      tags,
    } = req.body;

    let event = await Event.findOne({ eventID });
    if (!event)
      return res.status(400).send({
        success: false,
        msg: "Invalid Event ID",
      });
    if (name) {
      let events = await Event.find({ name });
      if (events.length > 0) {
        console.log(events);
        if (!(events[0].name == name) && events[0].eventID == eventID)
          return res.status(400).send({
            success: false,
            msg: "Event with same name is already registered",
          });
      }
    }
    if (eventDateTime) {
      let dateTime = new Date(eventDateTime);
      eventDateTime = dateTime;
      registrationDeadline = eventDateTime;
      if (eventDateTime.toString() == "Invalid Date") {
        return res.status(400).send({
          success: false,
          msg: "Valid DataTime in IST is required",
        });
      }
    }

    //Check for more validations

    let updatedEvent = await Event.findOneAndUpdate(
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
        eventDateTime,
        eventVenue,
        registrationDeadline,
        tags,
      }
    );
    console.log(updatedEvent);
    return res.status(200).send({ success: true, msg: "Event Updated" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    console.log("Event delete");
    let eventID = req.body.eventID;
    let event = await Event.findOneAndDelete({ eventID });
    if (!event)
      return res.status(400).send({ success: false, msg: "Event Not Found" });
    return res.status(200).send({ success: true, msg: "Event Deleted" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { addEvent, getCategoryEvent, updateEvent, deleteEvent };
