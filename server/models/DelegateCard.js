const mongoose = require('mongoose');

const DelCardSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    cardType: {
        type: String,
        enum: ['MAHE', 'NONMAHE'],
    },
    mahePrice: {
        type: String,
    },
    nonMahePrice: {
        type: String,
    },
    active: {
        type: Boolean,
    },
});

module.exports = DelCard = mongoose.model('DelCard', DelCardSchema);
