const Team = require('../../models/Team');
const Event = require('../../models/Event');
const { nanoid } = require('nanoid');

const teamRegister = async (req, res) => {
    try {
        const user = await User.findById(req.requestUser._id);
        const { eventID } = req.body;
        const event = await Event.findOne({ eventID: eventID });
        if (!event) return res.status(404).json({ msg: 'Event not found' });
        //  if user is not registered for the event
        let flag = 0;
        for (let i = 0; i < user.regEvents.length; i++) {
            if (user.regEvents[i]._id.toString() == event._id.toString()) {
                flag = 1;
                break;
            }
        }
        if (flag == 0) {
            return res
                .status(400)
                .json({
                    msg: 'Please register to event first then create a team',
                });
        }
        //teams of that event
        const teams = await Team.find({ event: event._id });
        if (!teams) return res.status(404).json({ msg: 'No teams found' });
        for (let i = 0; i < teams.length; i++) {
            for (let j = 0; j < teams[i].members.length; j++) {
                console.log(teams[i].members[j]);
                if (teams[i].members[j].toString() === user._id.toString()) {
                    return res.status(400).json({
                        msg: 'You are already registered for this event and cannot create a new team',
                    });
                }
            }
        }
        // user is not in any team hence eligible to make a team
        let members = [user._id];
        const teamID = nanoid(8);
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
            msg: 'Team registered successfully',
            teamID: teamID,
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
};

const joinTeam = async (req, res) => {
    try {
        const user = await User.findById(req.requestUser._id);
        const { eventID, inputTeamCode } = req.body;
        const event = await Event.findOne({ eventID: eventID });
        if (!event) return res.status(404).json({ msg: 'Event not found' });
        //  if user is not registered for the event
        let flag = 0;
        for (let i = 0; i < user.regEvents.length; i++) {
            if (user.regEvents[i]._id.toString() == event._id.toString()) {
                flag = 1;
                break;
            }
        }
        if (flag == 0) {
            return res
                .status(400)
                .json({
                    msg: 'Please register to event first then join a team',
                });
        }
        //teams of that event
        const teams = await Team.find({ event: event._id });
        //check if user is already in a team
        for (let i = 0; i < teams.length; i++) {
            for (let j = 0; j < teams[i].members.length; j++) {
                if (teams[i].members[j].toString() === user._id.toString()) {
                    return res.status(400).json({
                        msg: 'You are already in a team for this event.',
                    });
                }
            }
        }
        //user not in any team
        const team = await Team.findOne({ teamID: inputTeamCode });
        if (!team)
            return res
                .status(404)
                .json({ msg: 'Team not found with given code' });
        //check if team full
        if (team.members.length == event.maxTeamSize) {
            return res.status(400).json({
                msg: 'Team is full',
            });
        }
        //add user to team with teamid as input
        team.members.push(user._id);
        await team.save();
        user.teamList.push(team._id);
        await user.save();
        return res.json({
            success: true,
            msg: 'Team joined successfully',
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
};

const leaveTeam = async (req, res) => {
    try {
        const user = await User.findById(req.requestUser._id);
        const { teamID } = req.body;
        const team = await Team.findOne({ teamID: teamID });
        if (!team) return res.status(404).json({ msg: 'Team not found' });
        //check if user is in the team
        if (!team.members.includes(user._id))
            return res.status(400).json({ msg: 'User not in team' });
        //remove user from members in team model
        await Team.updateOne(
            { teamID: teamID },
            { $pull: { members: user._id } }
        );
        await team.save();
        //remove team form user model but still registered
        await User.updateOne(
            { _id: user._id },
            { $pull: { teamList: team._id } }
        );
        await user.save();
        console.log(team.members.length);
        if (team.members.length == 1) {
            await Team.findByIdAndDelete(team._id);
            return res.json({
                success: true,
                msg: 'Team successfully deleted',
            });
        }

        return res.json({
            success: true,
            msg: 'User left team successfully',
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { teamRegister, joinTeam, leaveTeam };

//edge cases
//user getting added into team multiple times
//if no user in team deleete team
