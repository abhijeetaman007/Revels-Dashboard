const mongoose = require('mongoose');
const Event = require('./Event')

const categorySchema = mongoose.Schema({
    categoryId: {
        type: String,
        // required: true,
        unique: true,
    },
    name: {
        type: String,
        // required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    token:{
        type:String,
    },
    events: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    }],
});

module.exports = Category = mongoose.model('Category', categorySchema);
