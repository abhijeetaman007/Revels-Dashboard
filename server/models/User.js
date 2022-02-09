const mongoose = require('mongoose');
const Event = require('./Event');
const DelCard = require('./DelegateCard')
const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'USER',
        enum: ['USER'],
    },
    token: {
        type: String,
        default: '',
    },
    passwordResetToken: {
        type: String,
        default: '',
    },
    timeStamp: {
        type: Date,
        default: Date.now(),
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
    registrationNumber:{
        type:String,
        required:true
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
        unique: true,
    },
    covidVaccinationLink: {
        type: String,
        required: true,
        unique: true,
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
    delegateCard:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'DelCard'
    }],
    QRCode:{
        type:String
    }
});

module.exports = User = mongoose.model('User', UserSchema);
