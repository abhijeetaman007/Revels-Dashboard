const Team = require("../../models/Team");
const Event = require("../../models/Event");
const { nanoid } = require("nanoid");

const teamRegister = async (req, res) => {
  try {
    const user = await User.findById(req.requestUser._id);
    const { eventID } = req.body;
    const event = await Event.findOne({ eventID: eventID });
    if (!event) return res.status(404).json({ msg: "Event not found" });
    // UNCOMMENT AFTER EVENT ROUTE MADE : if user is not registered for the event
    // if (!user.regEvents.includes(user._id)) {
    //   return res
    //     .status(400)
    //     .json({ msg: "Please register first to create a team" });
    // }
    const teams = await Team.find({ event: event._id });
    if (!teams) return res.status(404).json({ msg: "No teams found" });
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].members.length; j++) {
        console.log(teams[i].members[j]);
        if (teams[i].members[j] === req.userId) {
          return res.status(400).json({
            msg: "You are already registered for this event and cannot create a new team",
          });
        }
      }
    }
    // user is not in any team hence eligible to make a team
    let members = [req.requestUser._id];
    const teamID = nanoid(5);
    const team = new Team({
      teamID,
      event: event._id,
      members: members,
    });

    await team.save();

    user.teamList.push(team._id);
    await user.save();
    return res.json({
      success: true,
      msg: "Team registered successfully",
      teamID: teamID,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const joinTeam = async (req, res) => {
  try {
    const user = await User.findById(req.requestUser._id);
    const { eventID, inputTeamCode } = req.body;
    const event = await Event.find({ eventID: eventID });
    if (!event) return res.status(404).json({ msg: "Event not found" });
    // UNCOMMENT AFTER EVENT ROUTE MADE : if user is not registered for the event
    // if (!user.regEvents.includes(user._id)) {
    //   return res
    //     .status(400)
    //     .json({ msg: "Please register first to join a team" });
    // }
    const teams = await Team.find({ event: event._id });
    //check if user is already in a team
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].members.length; j++) {
        if (teams[i].members[j] === userId) {
          return res.status(400).json({
            msg: "You are already registered for this event.",
          });
        }
      }
    }
    //user not in any team
    const team = await Team.findOne({ teamID: inputTeamCode });
    if (!team) return res.status(404).json({ msg: "Team not found" });
    //check if team full
    if (team.members.length == event.maxTeamSize) {
      return res.status(400).json({
        msg: "Team is full",
      });
    }
    //add user to team with teamid as input
    team.members.push(user._id);
    await team.save();
    user.teamList.push(team._id);
    await user.save();
    return res.json({
      success: true,
      msg: "Team joined successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const leaveTeam = async (req, res) => {
  try {
    const user = await User.findById(req.requestUser._id);
    const { teamID } = req.body;
    const team = await Team.findOne({ teamID: teamID });
    if (!team) return res.status(404).json({ msg: "Team not found" });
    //check if user is in the team
    if (!team.members.includes(user._id))
      return res.status(400).json({ msg: "User not in team" });
    //remove user from members in team model
    await Team.updateOne({ teamID: teamID }, { $pull: { members: user._id } });

    //remove team form user model but still registered
    await User.updateOne({ _id: user._id }, { $pull: { teamList: team._id } });

    if (team.members.length === 0) {
      await Team.findByIdAndDelete(teamId);
      return res.json({
        success: true,
        msg: "Team successfully deleted",
      });
    }

    return res.json({
      success: true,
      msg: "User left team successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = { teamRegister, joinTeam, leaveTeam };
