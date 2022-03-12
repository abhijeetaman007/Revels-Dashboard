const User = require('../../models/User');
const Event = require('../../models/Event');
const Team = require('../../models/Team');
const { nanoid } = require('nanoid');

const registerEvent = async (req, res) => {
    try {
        let { eventID } = req.body;
        let event = await Event.findOne({ eventID });

        if (!event)
            return res
                .status(400)
                .send({ success: false, msg: 'No Events Found' });

        //TODO: Check Date
        // const date = new Date();
        // offset = (60 * 5 + 30) * 60 * 1000;
        // var currentDateTime = new Date(date.getTime() + offset);
        // console.log(event.registrationDeadline);
        // console.log(currentDateTime);
        // console.log(typeof event.deadline);
        if (event.registrationDeadline - currentDateTime <= 0) {
            return res
                .status(400)
                .send({ success: false, msg: 'Registration Closed' });
        }
        // Check isActive


        let user = req.requestUser;

        let team = await Team.findOne({ event:event._id, members: { $in: user._id } });
        if (team)
            return res
                .status(400)
                .send({ success: false, msg: 'Already registered' });

        // Check on delegate cards
        event.delegateCards.forEach((delCard)=>{
            if(user.delegateCards.indexOf(delCard) == -1)
            {
                return res.status(400).send({success:false,msg:'Please buy event specific delegate card(s)'})
            }
        })


        // TODO:Check on collision of nanoids
        let teamID = nanoid(8);
        team = await new Team({
            teamID,
            event: event._id,
            members: [user._id],
        });
        await team.save();

        // push to registeredEvents
        await User.updateOne({_id:user._id},{
            $push:{
                "regEvents":{
                    event:event._id
                }
            }
        })

        console.log('Registered New Event');
        return res
            .status(200)
            .send({ success: true, msg: 'Event Registered Successfully' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const getUserEvents = async (req, res) => {
    try {
        let user = req.requestUser;
        let teams = await Team.find({ members: { $in: user._id } }).populate(
            'event'
        );
        let events = []
        teams.forEach((team)=>{
            events.push(team.event)
        })
        return res.status(200).send({ success: true, data: events });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const getAllEvents = async (req, res) => {
    try {
        let events = await Event.find().populate('category');
        return res.status(200).send({ success: false, data: events });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { registerEvent, getUserEvents, getAllEvents };
