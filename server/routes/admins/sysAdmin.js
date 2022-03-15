const { nanoid, customAlphabet } = require('nanoid');
const DelCard = require('../../models/DelegateCard');
const Role = require('../../models/Role');
const Category = require('../../models/Category');
const Admin = require('../../models/Admin');
const College = require('../../models/College');

const addDelegateCard = async (req, res) => {
    try {
        let { name, type, mahePrice, nonMahePrice, description } = req.body;
        console.log(name, type, mahePrice, nonMahePrice, description);
        if (!name || !mahePrice || !nonMahePrice || !description || !type)
            return res
                .status(400)
                .send({ success: false, msg: 'Please fill all the fields' });

        let card = DelCard.exists({ name });
        if (card)
            return res
                .status(400)
                .send({
                    success: false,
                    msg: 'Delegate with same name exists',
                });

        let cardID;
        while (true) {
            const nanoid = customAlphabet(
                '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                4
            );
            cardID = nanoid();
            let card = await DelCard.findOne({ cardID });
            if (!card) break;
        }
        let delegateCard = new DelCard({
            cardID,
            name,
            type,
            mahePrice,
            nonMahePrice,
            nonMahePrice,
            description,
        });
        delegateCard = await delegateCard.save();
        return res.status(200).send({
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

const deleteDelegateCard = async (req, res) => {
    try {
        let { cardID } = req.body;
        let card = await DelCard.findOneAndDelete({ cardID });
        if (!card)
            return res.status(400).send({
                success: false,
                msg: 'No Delegate-Card/ProShow exists',
            });
        return res.status(200).send({
            success: true,
            msg: 'Delegate-Card/ProShow deleted',
            data: card,
        });
    } catch (err) {
        console.log(err);
        return res
            .send(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const viewAllDelegateCards = async (req, res) => {
    try {
        let delCards = await DelCard.find();
        return res.status(200).send({ success: true, data: delCards });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const addRole = async (req, res) => {
    try {
        let { accessLevel, categoryId, type } = req.body;
        if (categoryId) {
            let category = await Category.findOne({ categoryId }, { _id: 1 });
            if (!category)
                return res
                    .status(400)
                    .send({ msg: 'Category Not Found', success: false });
        }
        categoryId = categoryId == null ? null : category._id
        let newRole = await new Role({
            accessLevel,
            categoryId,
            isActive: true,
            type,
        });
        await newRole.save();
        return res
            .status(200)
            .send({ success: true, data: newRole, msg: 'New Role Added' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const addCategories = async (req, res) => {
    try {
        let categories = req.body;
        let flag = false;
        for (let i = 0; i < categories.length; i++) {
            let { categoryId, category, description, type } = categories[0];
            let newCategory = new Category({
                categoryId,
                category,
                description,
                type,
            });
            await newCategory.save();
        }
        return res.status(200).send({ success: true, msg: 'Categories Added' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const registerAdmin = async (req, res) => {
    try {
        let { name, type, accessLevel, categoryId, email, phoneNo } = req.body;
        let category = await Category.findOne({ categoryId }, { _id: 1 });
        if (!category)
            return res
                .status(400)
                .send({ success: false, msg: 'Category does not exists' });
        let role = await Role.findOne(
            { accessLevel, type, category: category._id },
            { _id: 1 }
        );
        if (!role)
            return res
                .status(400)
                .send({ success: false, msg: 'Role does not exists' });

        const pass = Math.random().toString(36).substring(1, 9);
        let newAdmin = new Admin({
            name,
            password: pass,
            role: role._id,
            email,
            phoneNo,
        });
        await newAdmin.save();
        return res
            .status(200)
            .send({ success: true, msg: 'New Admin Registered' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const addCollege = async (req, res) => {
    try {
        let { name, state, isMahe } = req.body;
        let college = new College({
            name,
            state,
            isMahe,
        });
        await college.save();
        return res.status(200).send({ success: true, msg: 'College Added' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = {
    addDelegateCard,
    deleteDelegateCard,
    viewAllDelegateCards,
    addCategories,
    addRole,
    registerAdmin,
    addCollege,
};
