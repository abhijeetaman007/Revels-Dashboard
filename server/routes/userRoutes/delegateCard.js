const DelCard = require('../../models/DelegateCard');

// const getMyDelegateCards = async (req,res) =>{
//     try
//     {
        
//     }
//     catch(err)
//     {
//         console.log(err)
//         return res.status(500).send({success:false,msg:'Internal Server Error'})
//     }
// }

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

module.exports = {getAllDelegateCards}