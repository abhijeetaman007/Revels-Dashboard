const mongoose = require('mongoose');
const Category = require('./Category');

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
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
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
        type: String,
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
        type: Date,
    },
    tags: [
        {
            type: String,
        },
    ],
    results: [
        {
            round: {
                type: Number,
                required:true
            },
            candidate: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required:true
            },
            position: {
                type: Number,
            },
        }
    ],
});

module.exports = Event = mongoose.model('Event', EventSchema);
