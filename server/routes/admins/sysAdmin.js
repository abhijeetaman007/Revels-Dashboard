const { nanoid } = require('nanoid');
const DelCard = require('../../models/DelegateCard');
const Role = require('../../models/Role')

const addDelegateCard = async (req, res) => {
    try {
        let { name, isProShow, mahePrice,nonMahePrice, description } = req.body;
        console.log(name,isProShow,mahePrice,nonMahePrice,description)
        if (!name || !mahePrice || !nonMahePrice || !description)
            return res
                .status(400)
                .send({ success: false, msg: 'Please fill all the fields' });
        
        let cardID;
        while(true)
        {
            cardID = nanoid(5)
            let card = await DelCard.findOne({cardID})
            if(!card)
                break;
        }            
        let delegateCard = new DelCard({
            cardID,
            name,
            isProShow,
            mahePrice,
            nonMahePrice,
            nonMahePrice,
            description,
        });
        delegateCard = await delegateCard.save();
        return res
            .status(200)
            .send({
                success: true,
                msg: 'New DelegateCard/ProShow Added',
                data: delegateCard,
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const deleteDelegateCard = async(req,res) =>{
    try
    {
        let {delegateCard_id} = req.body
        let card = await DelCard.findOneAndDelete({_id:delegateCard_id})
        if(!card)
            return res.status(400).send({success:false,msg:'No Delegate-Card/ProShow exists'})
        return res.status(200).send({success:true,msg:'Delegate-Card/ProShow deleted',data:card})
    }
    catch(err)
    {
        console.log(err)
        return res.send(500).send({success:false,msg:'Internal Server Error'})
    }
}

const viewAllDelegateCards = async (req,res) =>{
    try
    {
        let delCards =await DelCard.find()
        return res.status(200).send({success:true,data:delCards})            
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send({success:false,msg:'Internal Server Error'})
    }
}

const addRole = async(req,res) =>{
    try
    {
        let {accessLevel,categoryId,type} = req.body
        let newRole = await new Role({
            accessLevel,
            categoryId,
            isActive:true,
            type
        })
        await newRole.save()
        return res.status(200).send({success:true,data:newRole,msg:'New Role Added'})            
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).send({success:false,msg:'Internal Server Error'})
    }
} 

module.exports = {addDelegateCard,deleteDelegateCard,viewAllDelegateCards,addRole}