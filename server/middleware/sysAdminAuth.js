const isSysAdmin = (req,res,next) =>{
    if(req.headers['authorization'] != 'sysadminisbest')
        return res.status(403).send({success:false,msg:'System Admin Access Required'})
    next()
}
module.exports = {isSysAdmin}