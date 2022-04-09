// Vigilance  - User profile on userID
//            - isEventRegistered
//            - hasDelegateCard
const Event = require("../../models/Event");
const DelCard = require("../../models/DelegateCard");
const Team = require("../../models/Team");
const User = require("../../models/User");

const getUserFromID = async (req, res) => {
  try {
    let { token } = req.params;
    let user = await User.findOne(
      { token },
      { password: 0, passwordResetToken: 0, token: 0 }
    ).populate("role delegateCards");
    if (!user)
      return res.status(400).send({ success: false, msg: "No user Found" });
    return res.send({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};
const isEventRegistered = async (req, res) => {
  try {
    let { token, eventID } = req.params;
    let user = await User.exists({ token});
    if (!user)
    return res.status(400).send({ success: false, msg: "User Not Found" });
    let event = await Event.findOne({ eventID }, { _id: 1 , delegateCards:1});
    user = await User.findOne({ token , delegateCards:  {$all:event.delegateCards}}, { _id: 1 });
    console.log("User ", user);
    if (!user)
      return res.status(400).send({ success: false, msg: "Delegate Card not purchased" });
    if (!event)
      return res.status(400).send({ success: false, msg: "No Event Found" });
    console.log("Event ", event);

    let team = await Team.findOne({
      event: event._id,
      "members.user": user._id,
    }).populate("members.user event", {
      password: 0,
      token: 0,
      passwordResetToken: 0,
      accommodation: 0,
    });
    if (!team)
      return res.status(400).send({ success: false, msg: "No Team Found" });
    console.log("Team ", team);
    return res.status(200).send({ success: true, data: team });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};
const hasDelegateCard = async (req, res) => {
  try {
    let { userID, cardID } = req.body;
    let delegateCard_ID = await DelCard.findOne({ cardID }, { _id: 1 });
    console.log(delegateCard_ID);
    if (!delegateCard_ID)
      return res
        .status(400)
        .send({ success: false, msg: "No Delegate Card Found" });
    let user = await User.findOne(
      { userID, delegateCards: delegateCard_ID },
      { password: 0, passwordResetToken: 0, token: 0 }
    );
    console.log("User ", user);
    if (!user)
      return res
        .status(400)
        .send({ success: false, msg: "Delegate Card not found" });
    return res
      .status(200)
      .send({ success: true, msg: "User has required Delegate Card/Ticket " });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { getUserFromID, isEventRegistered, hasDelegateCard };
