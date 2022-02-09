const Category = require('../../models/Category');
const data = require('../../utils/categories');

const registerCategory = async (req, res) => {
    try {
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
const loginCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            categoryId: req.body.categoryId,
        });
        if (!category)
            return res.status(401).json({ message: 'Invalid category' });

        const isValid = req.body.password == category.password;
        if (!isValid)
            return res.status(401).json({ message: 'Invalid password' });

        let token = jwt.sign(category, process.env.JWT_SECRET, {
            expiresIn: 12 * 60 * 60,
        });
        category.token = token;
        await category.save();
        return res.status(200).json({
            msg: 'Category Signed in Successfully ',
            success: true,
        });
    } catch (err) {
        return res.status(500).json({ message: error.toString() });
    }
};

module.exports = { registerCategory };
