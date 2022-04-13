// Vigilance  - User profile on userID
//            - isEventRegistered
//            - hasDelegateCard
const Event = require('../../models/Event');
const DelCard = require('../../models/DelegateCard');
const Team = require('../../models/Team');
const User = require('../../models/User');

const getUserFromID = async (req, res) => {
    try {
        let { token } = req.params;
        if (token.length >= 20) {
            let user = await User.findOne(
                { token },
                { password: 0, passwordResetToken: 0, token: 0 }
            ).populate('role delegateCards');
            if (!user)
                return res
                    .status(400)
                    .send({ success: false, msg: 'No user Found' });
            return res.send({ success: true, data: user });
        } else {
            console.log('vig token');
            console.log(token);
            let userID = '',
                userToken = '',
                flag = 0;
            for (let i = 0; i < token.length; i++) {
                if (flag == 0 && token[i] == '_') {
                    flag = 1;
                    continue;
                }
                if (flag == 1) userToken = userToken + token[i];
                else userID = userID + token[i];
            }
            console.log('user', userID);
            console.log('token', userToken);
            userID = Number(userID);
            let user = await User.findOne(
                { userID },
                { password: 0, passwordResetToken: 0 }
            ).populate('role delegateCards');
            if (!user)
                return res
                    .status(400)
                    .send({ msg: 'User Not Found', success: false });
            if (user.token.slice(-10) != userToken)
                return res
                    .status(400)
                    .send({ success: false, msg: 'Invalid QR Code' });
            return res.status(200).send({ success: true, data: user });
        }
    } catch (err) {
        console.log(err);
        return res.send({ success: false, msg: 'Internal Server Error' });
    }
};
const isEventRegistered = async (req, res) => {
    try {
        console.log("Event Check")
        let { token, eventID } = req.params;
        // let eventID = 101
        // let token = '159_UaoiSSwXXY'
        let userID = '',
            userToken = '',
            flag = 0;
        let user;
        
        console.log("TOken",token)
        if (token.length >= 20) {
            userToken = token;
            user = await User.findOne({token})
            if (!user)
            return res
                .status(400)
                .send({ success: false, msg: 'User Not Found' });
            userID = user.userID
        } else {
            console.log("token",token)
            for (let i = 0; i < token.length; i++) {
                if (flag == 0 && token[i] == '_') {
                    flag = 1;
                    continue;
                }
                if (flag == 1) userToken = userToken + token[i];
                else userID = userID + token[i];
              } 
                console.log("USer ID",userID);
                console.log("User Token",userToken);
                user = await User.findOne({ userID });
                if (!user)
                    return res
                        .status(400)
                        .send({ success: false, msg: 'User Not Found' });
                if (user.token.slice(-10) != userToken)
                    return res
                        .status(400)
                        .send({ success: false, msg: 'Invalid QR Code' });
            
        }
        console.log("Event Check UserID",userID)
        console.log(userToken)
        let event = await Event.findOne(
            { eventID }
            // { delegateCards }
        );

        console.log(userToken);
        // user = await User.findOne(
        //     { token: userToken }
        //     // { _id: 1 }
        // );
        console.log('User ', user);
        let testGeneralDelCard = '624603fe950a69cc464ff72c';
        let testFlagshipDelCard = '62460435950a69cc464ff730';
        let prodGeneralDelCard = '624603fe950a69cc464ff72c';
        let prodFlagshipDelCard = '62460435950a69cc464ff730';

        flag = 0;
        console.log("Userrr",user)
        console.log(user.delegateCards)

        event.delegateCards.forEach((delCard) => {
            console.log('del card check', delCard.toString());
            console.log(user.delegateCards)
            if (
                delCard.toString() == testGeneralDelCard ||
                delCard.toString() == prodGeneralDelCard
            ) {
                console.log("User delca",user.delegateCards)
                if (
                    user.delegateCards.indexOf(testFlagshipDelCard) != -1 ||
                    user.pendingDelegateCards.indexOf(prodFlagshipDelCard) != -1
                ) {
                    console.log('Here flagship passed');
                    return;
                }
            }
            console.log("test")
            console.log(user.delegateCards)
            console.log('1 ', user.delegateCards.indexOf(delCard));
            console.log('2 ', user.pendingDelegateCards.indexOf(delCard));
            if (
                user.delegateCards.indexOf(delCard) == -1 &&
                user.pendingDelegateCards.indexOf(delCard) == -1
            ) {
                console.log('Not found');
                flag = 1;
                // delCard;
            }
        });
        console.log('flag ', flag);
        if (flag == 1)
            return res.status(400).send({
                success: false,
                msg: 'Please buy event specific delegate card(s)',
            });
        console.log('User ', user);
        // if (!user)
        //     return res
        //         .status(400)
        //         .send({ success: false, msg: 'Delegate Card not purchased' });
        if (!event)
            return res
                .status(400)
                .send({ success: false, msg: 'No Event Found' });
        console.log('Event ', event);

        console.log('event:', event._id);
        console.log('members.user', user._id);
        let team = await Team.findOne({
            event: event._id,
            'members.user': user._id,
        }).populate('members.user event', {
            // password: 0,
            // token: 0,
            // passwordResetToken: 0,
            // accommodation: 0,
        });
        console.log('team', team);
        if (!team)
            return res
                .status(400)
                .send({ success: false, msg: 'No Team Found' });
        console.log('Team ', team);
        return res.status(200).send({ success: true, data: team });
    } catch (err) {
        console.log(err);
        return res.send({ success: false, msg: 'Internal Server Error' });
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
                .send({ success: false, msg: 'No Delegate Card Found' });
        let user = await User.findOne(
            { userID, delegateCards: delegateCard_ID },
            { password: 0, passwordResetToken: 0, token: 0 }
        );
        console.log('User ', user);
        if (!user)
            return res
                .status(400)
                .send({ success: false, msg: 'Delegate Card not found' });
        return res.status(200).send({
            success: true,
            msg: 'User has required Delegate Card/Ticket ',
        });
    } catch (err) {
        console.log(err);
        return res.send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { getUserFromID, isEventRegistered, hasDelegateCard };
