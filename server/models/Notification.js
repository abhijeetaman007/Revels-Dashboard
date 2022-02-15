const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    message:{
        type:String,
    },
    seen:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
})
module.exports = Notification = mongoose.model('Notification', NotificationSchema);