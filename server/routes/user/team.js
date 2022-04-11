const Team = require('../../models/Team');
const Event = require('../../models/Event');
const User = require('../../models/User');

const joinTeam = async (req, res) => {
    try {
        const user = req.requestUser;
        console.log('user', user);
        const { eventID, teamID } = req.body;
        console.log(req.body);
        let event = await Event.findOne(
            { eventID },
            {
                delegateCards: 1,
                isActive: 1,
                registrationDeadline: 1,
                teamDelegateCard: 1,
                maxMembers: 1,
            }
        );
        if (!event)
            return res
                .status(404)
                .json({ success: false, msg: 'Event not found' });
        console.log('event', event);
        console.log(event._id);
        //User is not registered for the event
        let team = await Team.findOne(
            { event: event._id, 'members.user': user._id },
            { teamID: 1 }
        );
        console.log('teamM12', team);
        if (team)
            return res.status(400).send({
                success: false,
                msg: 'User Already in a team!!',
            });
        let newTeam = await Team.findOne({ event: event._id, teamID }).populate(
            'createdBy'
        );
        console.log('newteam', newTeam);
        if (!newTeam) {
            return res.status(400).send({
                success: false,
                msg: 'Team not found',
            });
        }
        if (newTeam.createdBy._id.toString() == req.requestUser._id.toString())
            return res.status(200).send({
                success: false,
                msg: 'Already in Team',
            });

        // Invalid Team Code
        if (!newTeam)
            return res
                .status(400)
                .send({ success: false, msg: 'Request Team Code Invalid' });
        // if (team && teamID == team.teamID)
        //   return res.status(400).send({ success: false, msg: 'Already in team' });

        // if (team)
        //   return res.status(400).send({
        //     success: false,
        //     msg: 'User Already Registered !!',
        //   });

        console.log(event);
        // Team Size Full
        if (event.maxMembers == newTeam.members.length)
            return res
                .status(400)
                .send({ success: false, msg: 'Team is full' });

        if (!event.teamDelegateCard) {
            // Check on delegate cards
            let flag = 0;
            let testGeneralDelCard = '624603fe950a69cc464ff72c';
            let testFlagshipDelCard = '62460435950a69cc464ff730';
            let prodGeneralDelCard = '624603fe950a69cc464ff72c';
            let prodFlagshipDelCard = '62460435950a69cc464ff730';
            event.delegateCards.forEach((delCard) => {
                console.log('del card check', delCard);
                if (
                    delCard.toString() == testGeneralDelCard ||
                    delCard.toString() == prodGeneralDelCard
                ) {
                    if (
                        user.delegateCards.indexOf(testFlagshipDelCard) != -1 ||
                        user.pendingDelegateCards.indexOf(
                            prodFlagshipDelCard
                        ) != -1
                    ) {
                        console.log('Here flagship passed');
                        return;
                    }
                }
                console.log('1 ', user.delegateCards.indexOf(delCard));
                console.log('2 ', user.pendingDelegateCards.indexOf(delCard));
                if (
                    user.delegateCards.indexOf(delCard) == -1 &&
                    user.pendingDelegateCards.indexOf(delCard) == -1
                ) {
                    console.log('Not found');
                    flag = 1;
                    delCard;
                }
            });
            if (flag == 1)
                return res.status(400).send({
                    success: false,
                    msg: 'Please buy event specific delegate card(s)',
                });
        }

        // console.log("team details");
        // console.log(team.members.length);
        // console.log(team.members);
        // console.log(user._id);
        // if (
        //   team.members.length == 1 &&
        //   String(team.members[0]) == String(user._id)
        // ) {
        //   // Delete Team - when user is only member in team
        //   console.log("Delete");
        //   await Team.findByIdAndDelete(team._id);
        // } else {
        //   //Remove From Existing Team
        //   console.log("Team ", team.teamID);
        //   console.log("User ", user._id);
        //   await Team.updateOne(
        //     { teamID: team.teamID },
        //     { $pull: { members: user._id } }
        //   );
        // }

        //Register To new Team
        // await Team.updateOne(
        //   { teamID: newTeam.teamID },
        //   { $push: { members: user._id } }
        // );
        // newTeam.members.push(user._id);
        // await newTeam.save();

        let gameDelCardsProd = [
            '624604b6950a69cc464ff7f5',
            '624604bb950a69cc464ff7f9',
            '62499b8eacdf8b9307b7b52e',
            '62499becacdf8b9307b7b532',
            '62499c1facdf8b9307b7b536',
            '624604b6950a69cc464ff7fa',
            '624b365c4fda25e0e4990ed1',
        ];
        let gameDelCardsTest = [
            '624604b6950a69cc464ff7f5',
            '624604bb950a69cc464ff7f9',
        ];
        let gamingEvent = false;
        for (let i = 0; i < event.delegateCards.length; i++) {
            console.log('Here : ', event.delegateCards[i]);
            if (
                gameDelCardsProd.indexOf(event.delegateCards[i] != -1) ||
                gameDelCardsTest.indexOf(event.delegateCards[i] != -1)
            ) {
                gamingEvent = true;
                console.log('Gaming Event Found');
                break;
            }
        }

        //Checking GameEvent -- no condition on college
        if (!gamingEvent) {
            // check that teammembers are from same college -- for non gaming
            console.log(user.college);
            console.log(newTeam.createdBy.college);
            console.log('User isMahe is ', user.isMahe);
            console.log('new Team isMahe is ', newTeam.createdBy.isMahe);
            if (
                !(
                    (user.isMahe == 1 && newTeam.createdBy.isMahe == 1) ||
                    user.college.toString() ==
                        newTeam.createdBy.college.toString()
                )
            ) {
                return res.status(400).send({
                    success: false,
                    msg: 'User is not from same college as team creator',
                });
            }
        }

        //Sending Team Request
        team = await Team.findOneAndUpdate(
            {
                // eventID,
                teamID,
            },
            {
                $addToSet: { requestedMembers: user._id },
            },
            { new: true }
        );
        //TODO: Send Mail

        return res.status(200).send({
            success: true,
            msg: 'Request to Join team sent',
            data: team,
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
};

const addToTeam = async (req, res) => {
    try {
        const user = req.requestUser;
        const { eventID, teamID, user_ID } = req.body;
        console.log(req.body);
        // const member = await User.findByID({ userID }, { userID: 1 });
        const member = await User.findById(user_ID);
        if (!member) {
            return res
                .status(400)
                .send({ success: false, msg: 'User does not exist' });
        }
        let event = await Event.findOne(
            { eventID },
            {
                delegateCards: 1,
                isActive: 1,
                registrationDeadline: 1,
                teamDelegateCard: 1,
                maxMembers: 1,
            }
        );
        if (!event) return res.status(404).json({ msg: 'Event not found' });

        let team = await Team.findOne(
            {
                event: event._id,
                'members.user': member._id,
            },
            {
                teamID: 1,
            }
        );
        console.log('Found Team', team);

        if (team) return res.send({ success: false, msg: 'Already in a team' });
        let newTeam = await Team.findOne({ eventID, teamID }).populate(
            'createdBy'
        );
        console.log(newTeam.createdBy.college);
        //User is not registered for the event
        if (!newTeam)
            return res
                .status(400)
                .send({ success: false, msg: 'Team Code Invalid' });

        // Team Size Full
        if (event.maxMembers == newTeam.members.length)
            return res
                .status(400)
                .send({ success: false, msg: 'Request Team is full' });
        if (newTeam.createdBy._id.toString() != user._id.toString())
            return res
                .status(400)
                .send({ success: false, msg: 'Access Denied' });
        if (!event.teamDelegateCard) {
            // Check on delegate cards
            let flag = 0;
            let testGeneralDelCard = '624603fe950a69cc464ff72c';
            let testFlagshipDelCard = '62460435950a69cc464ff730';
            let prodGeneralDelCard = '624603fe950a69cc464ff72c';
            let prodFlagshipDelCard = '62460435950a69cc464ff730';
            event.delegateCards.forEach((delCard) => {
                console.log('del card check', delCard);
                if (
                    delCard.toString() == testGeneralDelCard ||
                    delCard.toString() == prodGeneralDelCard
                ) {
                    if (
                        user.delegateCards.indexOf(testFlagshipDelCard) != -1 ||
                        user.pendingDelegateCards.indexOf(
                            prodFlagshipDelCard
                        ) != -1
                    ) {
                        console.log('Here flagship passed');
                        return;
                    }
                }
                
                console.log('1 ', user.delegateCards.indexOf(delCard));
                console.log('2 ', user.pendingDelegateCards.indexOf(delCard));
                if (
                    user.delegateCards.indexOf(delCard) == -1 &&
                    user.pendingDelegateCards.indexOf(delCard) == -1
                ) {
                    console.log('Not found');
                    flag = 1;
                    delCard;
                }
            });
            if (flag == 1)
                return res.status(400).send({
                    success: false,
                    msg: 'Please buy event specific delegate card(s)',
                });
        }
        let gameDelCardsProd = [
            '624604b6950a69cc464ff7f5',
            '624604bb950a69cc464ff7f9',
            '62499b8eacdf8b9307b7b52e',
            '62499becacdf8b9307b7b532',
            '62499c1facdf8b9307b7b536',
            '624604b6950a69cc464ff7fa',
            '624b365c4fda25e0e4990ed1',
        ];
        let gameDelCardsTest = [
            '624604b6950a69cc464ff7f5',
            '624604bb950a69cc464ff7f9',
        ];
        let gamingEvent = false;
        for (let i = 0; i < event.delegateCards.length; i++) {
            console.log('Here : ', event.delegateCards[i]);
            if (
                gameDelCardsProd.indexOf(event.delegateCards[i] != -1) ||
                gameDelCardsTest.indexOf(event.delegateCards[i] != -1)
            ) {
                gamingEvent = true;
                console.log('Gaming Event Found');
                break;
            }
        }

        //check that teammembers are from same college

        if (!gamingEvent) {
            console.log(member.college);
            console.log(newTeam.createdBy.college);
            if (
                !(
                    (user.isMahe == 1 && newTeam.createdBy.isMahe == 1) ||
                    (user.college == newTeam.createdBy.college)
                )
            ) {
                return res.status(400).send({
                    success: false,
                    msg: 'User is not from same college as team creator',
                });
            }
        }

        //Add To Team
        team = await Team.findOneAndUpdate(
            { teamID: teamID },
            {
                $addToSet: {
                    members: {
                        user: member._id,
                        attendance: [{ roundNumber: 1, isPresent: false }],
                    },
                },
                $pull: { requestedMembers: member._id },
            },
            { new: true }
        );

        // Delete All Other Request
        await Team.updateMany(
            {},
            {
                $pull: {
                    requestedMembers: user_ID,
                },
            }
        );
        console.log('here123456789');
        return res
            .status(200)
            .send({ success: true, msg: 'User Added to Team', data: team });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
};

const leaveTeam = async (req, res) => {
    try {
        let { teamID } = req.body;
        let user = req.requestUser;
        const team = await Team.findOne({ teamID, 'members.user': user._id });
        console.log(user._id, team);
        if (!team)
            return res.status(404).json({ msg: 'Unable to leave the team.' });
        if (team.createdBy.toString() == user._id.toString()) {
            await Team.deleteOne({ teamID });
            return res
                .status(200)
                .send({ success: true, data: team, msg: 'Team Deleted' });
        }
        await Team.findOneAndUpdate(
            { teamID: teamID },
            { $pull: { members: { user: user._id } } },
            { new: true }
        );
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
const removeFromTeam = async (req, res) => {
    try {
        let { teamID, user_ID } = req.body;
        const member = await User.findById(user_ID);
        // const member = await User.findOne({ userID }, { userID: 1 });
        let user = req.requestUser;
        let team = await Team.findOne({ teamID, 'members.user': member._id });
        if (!team) return res.status(404).json({ msg: 'Team not found' });
        console.log(team.createdBy.toString(), user._id.toString());
        if (team.createdBy.toString() != user._id.toString()) {
            return res
                .status(200)
                .send({ success: true, data: team, msg: 'Cannot Remove' });
        }
        team = await Team.findOneAndUpdate(
            { teamID: teamID },
            { $pull: { members: { user: member._id } } },
            { new: true }
        );
        return res.status(200).send({
            success: true,
            data: team,
            msg: 'User removed from the team',
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const getEventTeam = async (req, res) => {
    try {
        console.log('Get Team Called');
        let { event_ID } = req.body;
        console.log(event_ID);
        console.log(req.requestUser._id);
        // let team = await Team.findOne({
        // event: event_ID,
        // 'members.user': req.requestUser._id,
        // }).populate('members.user requestedMembers', { name: 1 });

        let team = await Team.findOne({
            event: event_ID,
            'members.user': req.requestUser._id,
        })
            .populate({
                path: 'event',
                populate: {
                    path: 'category',
                },
            })
            .populate('members.user requestedMembers')
            .select({ pasword: 0 });

        console.log('team', team);
        if (!team)
            return res
                .status(400)
                .send({ success: false, msg: 'Invalid Team' });
        console.log("success")
        return res.status(200).send({ success: true, data: team });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ msg: 'Internal Server Error', success: false });
    }
};

const deleteTeamRequest = async (req, res) => {
    try {
        let { teamID, user_ID } = req.body;
        let team = await Team.findOne({ teamID });
        if (!team)
            return res
                .status(400)
                .send({ success: false, msg: 'Invalid Team' });
        if (user_ID.toString() == req.requestUser._id.toString())
            return res
                .status(400)
                .send({ success: false, msg: 'Cannot Delete' });
        if (team.createdBy.toString() != req.requestUser._id.toString())
            return res
                .status(400)
                .send({ success: false, msg: 'Access Denied' });

        await Team.updateOne(
            { teamID },
            {
                $pull: {
                    requestedMembers: user_ID,
                },
            }
        );
        return res.status(200).send({ success: true, msg: 'Request Deleted' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};
module.exports = {
    addToTeam,
    joinTeam,
    leaveTeam,
    removeFromTeam,
    getEventTeam,
    deleteTeamRequest,
};

//edge cases
//user getting added into team multiple times
//if no user in team deleete team(done)
