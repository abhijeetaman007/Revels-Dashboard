const mongoose = require('mongoose');
const Event = require('./Event');
const DelCard = require('./DelegateCard');
const UserSchema = new mongoose.Schema({
    //userID: will be used as ID in frontend for each user not mongo's _id
    userID: {
        type: Number,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: 'USER',
        enum: ['USER'],
    },
    token: {
        type: String,
        default: '',
        unique: true,
    },
    passwordResetToken: {
        type: String,
        default: '',
        unique: true,
    },
    timeStamp: {
        date: String,
        time: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        default: '',
    },
    college: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    isMahe: {
        type: Boolean,
        required: true,
    },
    accommodationRequired: {
        type: Boolean,
        default: false,
    },
    IDCardLink: {
        type: String,
        required: true,
    },
    covidVaccinationLink: {
        type: String,
        required: true,
    },
    verified: {
        type: String,
        enum: ['VERIFIED', 'REJECTED', 'UNVERIFIED'],
        default: 'UNVERIFIED',
    },
    regEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
    teamList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
    ],
    //Stores all types of delegate Card/Tickets
    // NOTE: Each user should have max one delegate card of each type
    delegateCard: [
        {
            cardType: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DelCard',
            },
            //QR Code With each generated Delegate Card/Ticket -- For easy verification by vigilance team
            QRCode: {
                type: String,
            },
        },
    ],
    //User Identity QRCode
    QRCode: {
        type: String,
    },
});

module.exports = User = mongoose.model('User', UserSchema);
