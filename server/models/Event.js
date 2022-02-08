const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventID: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    eventType: {
        type: String,
    },
    mode: {
        type: String,
    },
    participationCriteria: {
        type: String,
    },
    prize: {
        type: Number,
    },
    minMembers: {
        type: Number,
    },
    maxMembers: {
        type: Number,
    },
    eventHead: [
        {
            name: {
                type: String,
            },
            phoneNo: {
                type: Number,
            },
        },
    ],
    deadline: {
        type: String,
    },
    tags: [
        {
            type: String,
        },
    ],
});

module.exports = Event = mongoose.model('Event', EventSchema);
