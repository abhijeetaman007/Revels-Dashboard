const Team = require('../../models/Team');
const Event = require('../../models/Event');

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

                console.log("team details")
                console.log(team.members.length)
                console.log(team.members)
                console.log(user._id)
        if (team.members.length == 1 && String(team.members[0]) == String(user._id)) {
            // Delete Team - when user is only member in team
            console.log("Delete")
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
        newTeam.members.push(user._id);
        await newTeam.save();

        //Final Team
        team = await Team.findOne({ eventID, members: { $in: user._id } })

        return res.status(200).send({ success: true, msg: 'Team Registered',data:team });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { joinTeam };

//edge cases
//user getting added into team multiple times
//if no user in team deleete team(done)
