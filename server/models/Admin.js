const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['OPERATIONS', 'SC','OM','JUDGES','VIGILANCE','CNP','INF','CATEGORY'],
    },
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    // Only for Category type
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
});
module.exports = Admin = mongoose.model('Admin', adminSchema);
