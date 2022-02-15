const User = require("../../models/User");
const Event = require("../../models/Event");
const { getUserFromToken } = require("../userRoutes/user");

const registerEvent = async (req, res) => {
  try {
    let { eventID } = req.body;
    let event = await Event.findOne({ eventID });

    if (!event)
      return res.status(400).send({ success: false, msg: "No Events Found" });

    const date = new Date();
    offset = (60 * 5 + 30) * 60 * 1000;
    var currentDateTime = new Date(date.getTime() + offset);
    console.log(event.registrationDeadline);
    console.log(currentDateTime);
    console.log(typeof event.deadline);
    if (event.registrationDeadline - currentDateTime <= 0) {
      return res
        .status(400)
        .send({ success: false, msg: "Registration Closed" });
    }
    let user = req.requestUser;
    for (let i = 0; i < user.regEvents.length; i++) {
      if (String(user.regEvents[i]._id) == String(event._id)) {
        return res.status(400).send({
          success: false,
          msg: "You are already registered for this event",
        });
      }
    }

    user.regEvents.push(event._id);
    await user.save();
    event.participants.push(user._id);
    await event.save();
    console.log("Registered New Event");
    return res
      .status(200)
      .send({ success: true, msg: "Event Registered Successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const getUserEvents = async (req, res) => {
  try {
    let user = req.requestUser;
    let events = await Event.find({ participants: user._id });
    return res.status(200).send({ success: true, data: events });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    let events = await Event.find();
    return res.status(200).send({ success: false, data: events });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { registerEvent, getUserEvents, getAllEvents };
