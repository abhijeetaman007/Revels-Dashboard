const Event = require('../../models/Event');

const addEvent = async (req, res) => {
    try {
        let {
            eventID,
            name,
            category,
            description,
            eventType,
            mode,
            participationCriteria,
            prize,
            minMembers,
            maxMembers,
            eventHead,
            deadline,
        } = req.body;
        let event = new Event({
            eventID,
            name,
            category,
            description,
            eventType,
            mode,
            participationCriteria,
            prize,
            minMembers,
            maxMembers,
            eventHead,
            deadline,
        });
        await event.save();
        console.log(event);
        return res.status(200).send({ success: true, msg: 'Event Added' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
};
const getCategoryEvent = async (req, res) => {
    try {
        let category_Id = req.params.category_Id;
        let events = await Event.find({ category: category_Id }).populate(
            'category'
        );
        return res.send({ success: true, data: events });
    } catch {
        console.log(err);
        res.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { addEvent, getCategoryEvent };
