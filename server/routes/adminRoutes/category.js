const Category = require('../../models/Category');
const data = require('../../utils/categories');
const jwt = require('jsonwebtoken');

//Private Route -- Only for SysAdmin
const categoryRegister = async (req, res) => {
    try {
        let secretKey = req.headers['authorization'];
        //For Protection
        if (secretKey != 'sysadminisbest')
            return res.status(403).send({
                success: false,
                msg: 'Not Authorized,Contact System Admin Team',
            });
        console.log(data.categories);
        data.categories.forEach(async (cat) => {
            try {
                const result = Math.random().toString(36).substring(2, 7);
                const pass = cat.id + '_' + result;
                const newCategory = new Category({
                    categoryId: cat.id,
                    name: cat.name,
                    email: cat.email,
                    password: pass,
                    token: '',
                });
                await newCategory.save();
            } catch (err) {
                console.log(err);
                return res.status(500).send({
                    success: false,
                    msg: 'Internal Server Error',
                });
            }
        });
        return res.send({ success: true, msg: 'Categories Registered' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};
const categoryLogin = async (req, res) => {
    try {
        const category = await Category.findOne({
            categoryId: req.body.categoryId,
        });
        if (!category) return res.status(401).json({ msg: 'Invalid category' });

        const isValid = req.body.password == category.password;
        if (!isValid) return res.status(401).json({ msg: 'Invalid password' });

        let payload = {
            category_Id: category._id,
            categoryId: category.categoryId,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60 * 60,
        });
        category.token = token;
        await category.save();
        return res.status(200).json({
            msg: 'Category Signed in Successfully ',
            success: true,
            data: category,
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
};

const categoryLogout = async (req, res) => {
    try {
        let token = req.headers['authorization'];
        let category = await Category.findOne({ token });
        if (category) {
            category.token = '';
            await category.save();
            return res.status(200).send({
                success: true,
                msg: 'Logged Out Successfully',
            });
        } else {
            return res
                .status(400)
                .send({ success: false, msg: 'Not Logged In' });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { categoryRegister, categoryLogin, categoryLogout };
