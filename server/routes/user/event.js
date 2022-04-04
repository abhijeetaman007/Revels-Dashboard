const User = require('../../models/User');
const Event = require('../../models/Event');
const Team = require('../../models/Team');
const { nanoid } = require('nanoid');
const { categories } = require('../../utils/categories');

const registerEvent = async (req, res) => {
    try {
        let { eventID } = req.body;
        let event = await Event.findOne(
            { eventID },
            { delegateCards: 1, isActive: 1, registrationDeadline: 1 }
        );

        if (!event)
            return res
                .status(400)
                .send({ success: false, msg: 'No Events Found' });

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
        if (
            event.isActive &&
            event.registrationDeadline - currentDateTime <= 0
        ) {
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
                .send({ success: false, msg: 'Registration Closed' });

        let user = req.requestUser;

        let team = await Team.exists({
            event: event._id,
            'members.user': user._id,
        });
        if (team)
            return res.send({ success: false, msg: 'Already registered' });

        // Check on delegate cards
        let flag = 0;
        event.delegateCards.forEach((delCard) => {
            
            if ((user.delegateCards.indexOf(delCard) == -1)&&(user.pendingDelegateCards.indexOf(delCard) == -1)) {
                flag = 1;
            }
            
        });
        if(flag==1)return res.status(400).send({
            success: false,
            msg: 'Please buy event specific delegate card(s)',
        });
        if(flag == 1)
        return res.status(400).send({
            success: false,
            msg: 'Please buy event specific delegate card(s)',
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

        console.log('Registered New Event');
        return res.status(200).send({
            success: true,
            data: team,
            msg: 'Event Registered Successfully',
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const getUserTeams = async (req, res) => {
    try {
        let user = req.requestUser;
        let teams = await Team.find({ 'members.user': user._id }).populate({
            path:'event',
            populate:{
                path:'category',
            }}
        ).populate('members.user requestedMembers').select({pasword:0});
        // let events = [];
        // teams.forEach((team) => {
        //   events.push(team.event);
        // });
        return res.status(200).send({ success: true, data: teams });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};
const getAllEvents = async (req, res) => {
    try {
        let events = await Event.find().populate('category delegateCards');
        return res.status(200).send({ success: false, data: events });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const getEventById = async (req, res) => {
    try {
        let { event_Id } = req.body;
        console.log(event_Id);
        let event = await Event.findOne({ _id: event_Id }).populate('category delegateCards');
        console.log('event', event);
        if (!event)
            return res
                .status(400)
                .send({ success: false, msg: 'Invalid Event ID' });
        return res.status(200).send({ data: event, success: true });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ msg: 'Internal Server Error', success: false });
    }
};

const getEventTags = async (req, res) => {
    try {
        let { event_Id } = req.body;
        let event = await Event.findOne({ _id: event_Id }, { tags: 1 });
        if (!event)
            return res
                .status(400)
                .send({ success: false, msg: 'Invalid Event ID' });
        return res.status(200).send({ data: event, success: true });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ msg: 'Internal Server Error', success: false });
    }
};

const getEventStatus = async (req, res) => {
    try {
        let { event_Id } = req.body;
        let user = req.requestUser;
        let team = await Team.findOne({
            'members.user': user._id,
            event: event_Id,
        });
        if (!team)
            return res
                .status(400)
                .send({ success: false, msg: 'Event Not registered' });

        return res
            .status(400)
            .send({ success: true, data: team, msg: 'Event Not registered' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ msg: 'Internal Server Error', success: false });
    }
};

const filterEvents = async(req,res) =>{
    try
    {
        let {category_ID,mode,eventType} = req.body
        let condition={};
        if(category_ID)
            condition.category_ID = category_ID 
        if(eventType)
            condition.eventType = eventType
        if(mode)
            condition.mode = mode
        let events =  await Event.find(condition)
        return res.status(200).send({data:events,success:false})
    }
    catch(err)
    {
        console.log(err)
        return res.send({success:false,msg:'Internal Server Error'})
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
};
