const Team = require('../../models/Team');
const Event = require('../../models/Event');
const {nanoid} = require('nanoid');

const joinTeam = async (req, res) => {
    try {
        const user = req.requestUser;
        const { eventID, teamID } = req.body;
        const event = await Event.findOne({ eventID: eventID });
        if (!event) return res.status(404).json({ msg: 'Event not found' });

        let team = await Team.findOne({ eventID, members: { $in: user._id } });
        let newTeam = await Team.findOne({ eventID, teamID }).populate('event');
        //User is not registered for the event
        if (!team)
            return res.status(400).send({
                success: false,
                msg: 'Event Not Registered,Please Register Event',
            });
        // Invalid Team Code
        if (!newTeam)
            return res
                .status(400)
                .send({ success: false, msg: 'Request Team Code Invalid' });
        if (newTeam.teamID == team.teamID)
            return res
                .status(400)
                .send({ success: false, msg: 'Already in team' });

        // Team Size Full
        if (newTeam.event.maxMembers == newTeam.members.length)
            return res
                .status(400)
                .send({ success: false, msg: 'Request Team is full' });

        console.log('team details');
        console.log(team.members.length);
        console.log(team.members);
        console.log(user._id);
        if (
            team.members.length == 1 &&
            String(team.members[0]) == String(user._id)
        ) {
            // Delete Team - when user is only member in team
            console.log('Delete');
            await Team.findByIdAndDelete(team._id);
        } else {
            //Remove From Existing Team
            console.log('Team ', team.teamID);
            console.log('User ', user._id);
            await Team.updateOne(
                { teamID: team.teamID },
                { $pull: { members: user._id } }
            );
        }

        //Register To new Team
        await Team.updateOne(
            { teamID: newTeam.teamID },
            { $push: { members: user._id } }
        );
        // newTeam.members.push(user._id);
        // await newTeam.save();

        //Final Team
        team = await Team.findOne({ eventID, members: { $in: user._id } });

        return res
            .status(200)
            .send({ success: true, msg: 'Team Registered', data: team });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
};

const leaveTeam = async (req, res) => {
    try {
        let { eventID } = req.body;
        let user = req.requestUser;
        const event = await Event.findOne({ eventID: eventID });
        if (!event) return res.status(404).json({ msg: 'Event not found' });
        let currentTeam = await Team.findOne({
            event: event._id,
            members: { $in: user._id },
        });
        console.log('Current Team', currentTeam);
        if (!currentTeam)
            return res
                .status(400)
                .send({ success: false, msg: 'Event Not registered' });
        console.log('Current Team ', currentTeam);
        if (
            currentTeam.members.length == 1 &&
            String(currentTeam.members[0]) == String(user._id)
        )
            return res.status(400).send({
                success: false,
                msg: 'Not in Team',
            });
        await Team.updateOne(
            { teamID: currentTeam.teamID },
            { $pull: { members: user._id } }
        );

        let teamID = nanoid(8);
        let team = new Team({
            event: event._id,
            teamID,
            members: [user._id],
        });
        await team.save();
        return res
            .status(200)
            .send({ success: true, data: team, msg: 'Team Left' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { joinTeam, leaveTeam };

//edge cases
//user getting added into team multiple times
//if no user in team deleete team(done)
