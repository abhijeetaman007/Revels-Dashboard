const mongoose = require('mongoose');
const Event = require('./Event');

const categorySchema = mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    token: {
        type: String,
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
});

module.exports = Category = mongoose.model('Category', categorySchema);
