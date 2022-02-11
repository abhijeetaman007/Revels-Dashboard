const User = require('../../models/User');
const Event = require('../../models/Event');

const registerEvent = async (req, res) => {
    try {
        let { eventID } = req.body;
        let event = await Event.find({ eventID });
        if (!event)
            return res
                .status(400)
                .send({ success: false, msg: 'No Events Found' });

        let user = req.requestUser;
        if (user.regEvents.includes(event._id))
            return res
                .status(400)
                .send({ success: false, msg: 'Event is already registered' });

        user.regEvents.push(event._id);
        await user.save();
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
        let { user } = req.requestUser;
        let events = [];
        user.regEvents.forEach(async (id) => {
            let event = await Event.findById(id);
            events.push(event);
        });
        return res.status(200).send({ success: true, data: events });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { registerEvent, getUserEvents };
