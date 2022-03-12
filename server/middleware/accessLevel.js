// Access Level Middleware:(All Portals)
// - hasReadAccess
// - hasReadWriteAccess
// - hasCategorySuperAdminAccess
// - hasSuperAdminAccess

const User = require('../models/User');

const hasReadAccess = async(req,res) =>{
    try
    {
        let user = req.requestAdmin;
        if(user.role.accessLevel == 1)
            next()
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send({success:false,msg:'Internal Server Error'})
    }
}

const hasReadWriteAccess = async(req,res) =>{
    try
    {
        let user = req.requestAdmin;
        if(user.role.accessLevel >= 2)
            next()
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send({success:false,msg:'Internal Server Error'})
    }
}

const hasCategorySuperAdminAccess = async(req,res) =>{
    try
    {
        let user = req.requestAdmin;
        if(user.role.accessLevel >= 3)
            next()
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send({success:false,msg:'Internal Server Error'})
    }
}

const hasSuperAdminAccess = async(req,res) =>{
    try
    {
        let user = req.requestAdmin;
        if(user.role.accessLevel >= 4)
            next()
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send({success:false,msg:'Internal Server Error'})
    }
}

module.exports = (hasReadAccess,hasReadWriteAccess,hasCategorySuperAdminAccess,hasSuperAdminAccess)

