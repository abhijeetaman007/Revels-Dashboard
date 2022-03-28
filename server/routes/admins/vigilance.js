// Vigilance  - User profile on userID
//            - isEventRegistered
//            - hasDelegateCard
const Event = require('../../models/Event');
const DelCard = require('../../models/DelegateCard');
const Team = require('../../models/Team');
const User = require('../../models/User')

const getUserFromID = async(req,res) =>{
    try
    {
        let {userID} = req.body
        let user = await User.findOne({userID},{password:0,passwordResetToken:0,token:0})
        if(!user)
            return res.status(400).send({success:false,msg:'No user Found'})
        return res.send({success:true,data:user}) 
    }
    catch(err)
    {
        console.log(err)
        return res.send({success:false,msg:'Internal Server Error'})
    }
}
const isEventRegistered = async(req,res) =>{
    try
    {
        let {userID,eventID} = req.body;
        let user = await User.findOne({userID},{_id:1})
        console.log("User ",user)
        if(!user)
            return res.status(400).send({success:false,msg:'No user Found'})
        let event = await Event.findOne({eventID},{_id:1})
        if(!event)
            return res.status(400).send({success:false,msg:'No Event Found'})
        console.log("Event ",event)

        let team = await Team.findOne({event:event._id,'members.user':user._id})
        if(!team)
            return res.status(400).send({success:false,msg:'No Team Found'})
        console.log("Team ",team)
        return res.status(200).send({success:true,data:team}) 
    }
    catch(err)
    {
        console.log(err)
        return res.send({success:false,msg:'Internal Server Error'})
    }
}
const hasDelegateCard = async(req,res) =>{
    try
    {
        let {userID,delegateCard_ID} = req.body
        let user = await User.findOne({userID,'delegateCards':delegateCard_ID},{password:0,passwordResetToken:0,token:0})
    }
    catch(err)
    {
        console.log(err)
        return res.send({success:false,msg:'Internal Server Error'})
    }
}


module.exports = { getUserFromID,isEventRegistered,hasDelegateCard};
