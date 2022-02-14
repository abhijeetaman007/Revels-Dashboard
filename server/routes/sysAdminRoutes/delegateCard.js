const DelCard = require('../../models/DelegateCard');

const addDelegateCard = async (req, res) => {
    try {
        let { name, cardType, isProShow, price, description } = req.body;
        let delegateCard = await DelCard.findOne({ name });
        if (!name || !cardType || !isProShow || !price || !description)
            return res
                .status(400)
                .send({ success: false, msg: 'Please fill all the fields' });
        if (delegateCard)
            return res
                .status(400)
                .send({
                    success: false,
                    msg: 'Delegate Card/ProShow with same name already exists',
                });
        delegateCard = new DelCard({
            name,
            cardType,
            isProShow,
            price,
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
module.exports = {addDelegateCard,deleteDelegateCard}