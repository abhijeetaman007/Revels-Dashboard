const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    teamID: {
        type: Number,
        required: true,
        unique: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    teamCode: {
        type: String,
        required: true,
        unique: true,
    },
    members: [{ ref: 'User' }],
    timeStamp: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = Team = mongoose.model('Team', TeamSchema);
