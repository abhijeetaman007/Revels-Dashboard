const DelCard = require('../../models/DelegateCard');
const Transaction = require('../../models/Transaction')

const getMyDelegateCards = async (req,res) =>{
    try
    {
        let delegateCards = await Transaction.find({user:req.requestUser._id,isPaymentConfirmed:true},{delegateCards:1}).populate('delegateCard')
        return res.status(200).send({success:true,data:delegateCards})        
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send({success:false,msg:'Internal Server Error'})
    }
}

const getAllDelegateCards = async (req,res) =>{
    try
    {
        let delCards = await DelCard.find()
        return res.status(200).send({success:true,data:delCards})            
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send({success:false,msg:'Internal Server Error'})
    }
}

const getAllMyTransactions = async(req,res) =>{
    try
    {
        let transactions = await Transaction.find({user:req.requestUser._id}).populate('delegateCard')
        return res.status(200).send({success:true,data:transactions})
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send({success:false,msg:'Internal Server Error'})   
    }
}

module.exports = {getAllDelegateCards,getMyDelegateCards,getAllMyTransactions}