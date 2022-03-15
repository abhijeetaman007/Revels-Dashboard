// For Multiple Login
// 
const mongoose = require("mongoose");
const userTokenSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    token:{
        type:String,
        default:null
    }
})
module.exports = UserToken = mongoose.model("UserToken", userTokenSchema);

const adminTokenSchema = new mongoose.Schema({
    adminID:{
        type:mongoose.Types.ObjectId,
        ref:"Admin"
    },
    token:{
        type:String,
        default:null
    }
})

module.exports = AdminToken= mongoose.model("AdminToken", adminTokenSchema);