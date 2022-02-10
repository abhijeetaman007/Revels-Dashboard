const Team = require("../../models/Team");
const Event = require("../../models/Event");
const nanoid = require("nanoid");

const teamRegister = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    const teams = await Team.find({ event: eventId });
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].members.length; j++) {
        if (teams[i].members[j] === req.userId) {
          return res.status(400).json({
            msg: "You are already registered for this event and cannot create a new team",
          });
        }
      }
    }

    // user is not in any team hence eligible to make a team
    const team = new Team({
      teamID: nanoid(5),
      event: eventId,
      members: [req.userId],
    });

    await team.save();
    return res.json({
      success: true,
      msg: "Team registered successfully",
      teamCode: teamCode,
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
    const { eventId, inputTeamCode } = req.body;
    const event = await Event.findById(eventId);
    const teams = await Team.find({ event: eventId });
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
    if (team.members.length >= event.maxTeamSize) {
      return res.status(400).json({
        msg: "Team is full",
      });
    }
    //add user to team with teamid as input
    team.members.push(req.userId);
    await team.save();
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
    const { teamId } = req.body;
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ msg: "Team not found" });
    //check if user is in the team
    if (!team.members.includes(req.userId))
      return res.status(400).json({ msg: "User not in team" });
    //remove user from team
    team.members = team.members.filter((member) => member !== req.userId);
    await team.save();

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
