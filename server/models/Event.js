const mongoose = require('mongoose');
const Category = require('./Category');
const User = require('./User')

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
        ref: 'Category',
    },
    description: {
        type: String,
    },
    eventType: {
        type: String,
        enum: ['CULTURAL', 'SPORTS'],
    },
    mode: {
        type: String,
        enum: ['OFFLINE', 'ONLINE'],
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
    eventHeads: [
        {
            name: {
                type: String,
            },
            phoneNo: {
                type: Number,
            },
        },
    ],
    eventDateTime:{
        type:Date,
        required:true
    },
    eventVenue:{
        type:String,
        required:true
    },
    registrationDeadline:{
        type:Date,
        required:true
    },
    tags: [
        {
            type: String,
        },
    ],
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
});

module.exports = Event = mongoose.model('Event', EventSchema);
