const User = require("../../models/User");
const Event = require("../../models/Event");
const Team = require("../../models/Team");
const { nanoid } = require("nanoid");
const { categories } = require("../../utils/categories");
const createSheet = require("../../utils/createSheet");
const Admin = require("../../models/Admin");
var jwt = require("jsonwebtoken");
const registerEvent = async (req, res) => {
  try {
    let { eventID } = req.body;
    let event = await Event.findOne(
      { eventID },
      { delegateCards: 1, isActive: 1, registrationDeadline: 1 }
    );

    if (!event)
      return res.status(400).send({ success: false, msg: "No Events Found" });

    //TODO: Check Date
    const date = new Date();
    // offset = (60 * 5 + 30) * 60 * 1000;
    // var currentDateTime = new Date(date.getTime() + offset);
    var currentDateTime = new Date(date.getTime());
    // console.log(event.registrationDeadline);
    // console.log(currentDateTime);
    // console.log(typeof event.deadline);

    // Check isActive
    var eventOpen = true;
    if (event.isActive && event.registrationDeadline - currentDateTime <= 0) {
      eventOpen = true;
    } else if (
      event.registrationDeadline - currentDateTime <= 0 ||
      !event.isActive
    ) {
      eventOpen = false;
    }

    if (!eventOpen)
      return res
        .status(400)
        .send({ success: false, msg: "Registration Closed" });

    let user = req.requestUser;

    let team = await Team.exists({
      event: event._id,
      "members.user": user._id,
    });
    if (team) return res.send({ success: false, msg: "Already registered" });

    // Check on delegate cards
    let flag = 0;
    let testGeneralDelCard = "624603fe950a69cc464ff72c";
    let testFlagshipDelCard = "62460435950a69cc464ff730";
    let prodGeneralDelCard = "624603fe950a69cc464ff72c";
    let prodFlagshipDelCard = "62460435950a69cc464ff730";
    event.delegateCards.forEach((delCard) => {
      if (
        delCard.toString() == testGeneralDelCard ||
        delCard.toString() == prodGeneralDelCard
      ) {
        if (
          user.delegateCards.indexOf(testFlagshipDelCard) != -1 ||
          user.pendingDelegateCards.indexOf(prodFlagshipDelCard) != -1
        ) {
          // console.log("Here flagship passed")
          return;
        }
      }
      if (
        user.delegateCards.indexOf(delCard) == -1 &&
        user.pendingDelegateCards.indexOf(delCard) == -1
      ) {
        flag = 1;
      }
    });
    if (flag == 1)
      return res.status(400).send({
        success: false,
        msg: "Please buy event specific delegate card(s)",
      });

    // TODO:Check on collision of nanoids
    let teamID = nanoid(8);
    team = await new Team({
      teamID,
      event: event._id,
      members: [
        {
          user: user._id,
          attendance: [{ roundNumber: 1, isPresent: false }],
        },
      ],
      createdBy: user._id,
    });
    await team.save();

    // push to registeredEvents
    // await User.updateOne(
    //   { _id: user._id },
    //   {
    //     $push: {
    //       regEvents: {
    //         event: event._id,
    //       },
    //     },
    //   }
    // );

    console.log("Registered New Event");
    return res.status(200).send({
      success: true,
      data: team,
      msg: "Event Registered Successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const getUserTeams = async (req, res) => {
  try {
    let user = req.requestUser;
    let teams = await Team.find({ "members.user": user._id })
      .populate({
        path: "event",
        populate: {
          path: "category",
        },
        populate: {
          path: "delegateCards",
        },
      })
      .populate("members.user requestedMembers")
      .select({ pasword: 0 });
    // let events = [];
    // teams.forEach((team) => {
    //   events.push(team.event);
    // });
    return res.status(200).send({ success: true, data: teams });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
const getAllEvents = async (req, res) => {
  try {
    let events = await Event.find().populate("category delegateCards");
     
    let teams = await Team.find();
    let map = new Map();
    for(let i=0;i<teams.length;i++)
    {
      if(!map[teams[i].event] || (map[teams[i].event == undefined]))
      {
        map[teams[i].event] = 0;
      }
      map[teams[i].event]++;
    }
    for(let i=0;i<events.length;i++)
    {
      let count = 0;
      if(map[events[i]._id])
      {
        count = map[events[i]._id];
        // console.log("Count Here",count)
      }
      newEvent = {
        _id:events[i]._id,
        eventID:events[i].eventID,
        name:events[i].name,
        category:events[i].category,
        description:events[i].description,
        eventType:events[i].eventType,
        mode:events[i].mode,
        participationCriteria:events[i].participationCriteria,
        prize:events[i].prize,
        minMembers:events[i].minMembers,
        maxMembers:events[i].maxMembers,
        eventHeads:events[i].eventHeads,
        tags:events[i].tags,        
        isActive:events[i].isActive,
        teamDelegateCard:events[i].teamDelegateCard,
        delegateCards:events[i].delegateCards,
        rounds:events[i].rounds,
        eventDateTime:events[i].eventDateTime,
        eventVenue:events[i].eventVenue,
        registrationDeadline:events[i].registrationDeadline,
        teamCount:count
      }
      events[i] = newEvent
    }
    // console.log(events[0].count)
    // console.log(events[0])
    return res.status(200).send({ success: false, data: events });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const getEventById = async (req, res) => {
  try {
    let { event_Id } = req.body;
    console.log(event_Id);
    let event = await Event.findOne({ _id: event_Id }).populate(
      "category delegateCards"
    );
    console.log("event", event);
    if (!event)
      return res.status(400).send({ success: false, msg: "Invalid Event ID" });
    return res.status(200).send({ data: event, success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ msg: "Internal Server Error", success: false });
  }
};

const getEventTags = async (req, res) => {
  try {
    let { event_Id } = req.body;
    let event = await Event.findOne({ _id: event_Id }, { tags: 1 });
    if (!event)
      return res.status(400).send({ success: false, msg: "Invalid Event ID" });
    return res.status(200).send({ data: event, success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ msg: "Internal Server Error", success: false });
  }
};

const getEventStatus = async (req, res) => {
  try {
    let { event_Id } = req.body;
    let user = req.requestUser;
    let team = await Team.findOne({
      "members.user": user._id,
      event: event_Id,
    });
    if (!team)
      return res
        .status(400)
        .send({ success: false, msg: "Event Not registered" });

    return res
      .status(400)
      .send({ success: true, data: team, msg: "Event Not registered" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ msg: "Internal Server Error", success: false });
  }
};

const filterEvents = async (req, res) => {
  try {
    let { category_ID, mode, eventType } = req.body;
    let condition = {};
    if (category_ID) condition.category_ID = category_ID;
    if (eventType) condition.eventType = eventType;
    if (mode) condition.mode = mode;
    let events = await Event.find(condition);
    return res.status(200).send({ data: events, success: false });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};

const getAllParticipants = async (req, res) => {
  try {
    let { event, name, id, token, max, delCard } = req.params;

    if (typeof token !== "undefined") {
      let payload = await jwt.verify(token, process.env.JWT_SECRET);
      console.log("Payload ", payload);
      if (payload) {
        console.log("id:", payload.admin_Id);
        let admin = await Admin.findOne({
          _id: payload.admin_Id,
          token,
        }).populate("role");
        //console.log('here ', admin);
        if (!admin) {
          return res.status(401).send({
            success: false,
            msg: "Token Invalid,Please Login",
          });
        }
      } else {
        return res.status(401).send({
          success: false,
          msg: "Token Expired,Please Login",
        });
      }
    } else {
      return res.status(401).send({
        success: false,
        msg: "Token Invalid,Please Login",
      });
    }
    if (delCard == "none") delCard = null;
    let teams = await Team.find({ event: event }).populate(
      "members.user",
      "name userID delegateCards pendingDelegateCards college email mobileNumber"
    );
    console.log(teams);
    if (teams) {
      createSheet(teams, name, id, max, delCard).then((file) => {
        return file.write(id + "_teams.xlsx", res);
      });
    }

    // return res.status(200).send({ data: teams, success: true });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};

const changeEventRegStatus  = async(req,res) =>{
  try
  {
    let {eventType,status} = req.body;
    // let event =await Event.findOne({_id:eventType});
    let event = await Event.updateMany({eventType},{
      isActive:status
    },{
      new:true,
    });
    return res.status(200).send({msg:'Event isActive upadated',data:event,success:true});
  }
  catch(err)
  {
    console.log(err);
    return res.status(500).send({msg:'Internal Error Server'})
  }
}


module.exports = {
  registerEvent,
  getUserTeams,
  getAllEvents,
  getEventById,
  getEventStatus,
  getEventTags,
  filterEvents,
  getAllParticipants,
  changeEventRegStatus,
};
