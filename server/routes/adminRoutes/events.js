const Event = require('../../models/Event');
const moment = require('moment')

const addEvent = async (req, res) => {
    try {
        //TODO : Add validations
        let {name,description,eventType,mode,participationCriteria,prize,minMembers,maxMembers,eventHeads,eventDate,eventTime,eventVenue,tags} = req.body
        let eventName = await Event.findOne({name})
        if(eventName)
            return res.status(400).send({success:false,msg:'Event with same name is already registered'})

        let ids = await Event.find({}, { eventID: 1, _id: 0 })
            .sort({ eventID: -1 })
            .limit(1);
        let eventID = 5001;
        if (ids[0]) {
            eventID = ids[0].eventID + 1;
        }
 
        let newEvent = new Event({
            eventID,
            name,
            category:req.requestCategory._id,
            description,
            eventType,
            mode,
            participationCriteria,
            prize,
            minMembers,
            maxMembers,
            eventHeads,
            eventSchedule:{
                date:eventDate,
                time:eventTime,
                venue:eventVenue
            },
            tags
        })

        await newEvent.save();
        return res.status(200).send({ success: true, msg: 'Event Added',data:newEvent });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
};
const getCategoryEvent = async (req, res) => {
    try {
        let category_Id = req.requestCategory._id;
        let events = await Event.find({ category: category_Id })
        return res.send({ success: true, data: events });
    } catch {
        console.log(err);
        res.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { addEvent, getCategoryEvent };
