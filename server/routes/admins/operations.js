// Operations - set Event Date,Time
//            - View Access to all added events
const Event = require('../../models/Event');

const setEventScheldule = async (req, res) => {
    try {
        let { eventID, eventDateTime, eventVenue } = req.body;
        let event = await Event.findOne({ eventID });
        console.log("event",event)
        if (!event)
            return res
                .status(404)
                .send({ success: false, msg: 'Event Not Found' });

        let dateTime = new Date(eventDateTime);
        eventDateTime = dateTime;
        if (eventDateTime.toString() == 'Invalid Date') {
            return res.status(400).send({
                success: false,
                msg: 'Valid DataTime in IST is required',
            });
        }
        console.log('Date Time is ', eventDateTime);
        let registrationDeadline = eventDateTime;

        await Event.updateOne(
            { eventID },
            {
                $set: {
                    eventDateTime,
                    eventVenue,
                    registrationDeadline
                },
            }
        );
        return res.status(200).send({success:true,msg:'Event Schedule set'})
    } catch (err) {
        console.log(err);
        return res
            .status(200)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { setEventScheldule };
