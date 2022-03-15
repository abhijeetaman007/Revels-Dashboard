const College = require('../../models/College')

const getAllColleges = async(req,res) =>
{
    try
    {
        let colleges = await College.find()
        return res.status(200).send({success:true,data:colleges})
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send({success:false,msg:'Internal Server Error'})
    }
}

module.exports = {getAllColleges}