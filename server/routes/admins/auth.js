const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
const data = require('../../utils/categories');
const { mailer } = require('../../utils/mailer');

//Private Route -- Only for SysAdmin
// const adminRegister = async (req, res) => {
//     try {
//         let { admins } = req.body;
//         admins.forEach(async (admin) => {
//             try {
//                 const result = Math.random().toString(36).substring(1, 9);
//                 const pass = result;
//                 const newAdmin = new Admin({
//                     name: admin.name,
//                     email: admin.email,
//                     password: pass,
//                     token: '',
//                     role: admin.role,
//                 });
//                 await newAdmin.save();
//                 let message = `You are registered as Admin, please keep the credentials safely for using Revels Dashboard  <br/> <b>ID: ${admin.email}</b> \n <br/> <b>Password: ${pass}</b>`;
//                 mailer(
//                     admin.email,
//                     "Registered to OM portal - REVELS '22",
//                     message
//                 );

//             } catch (err) {
//                 console.log(err);
//             }
//         });
//         return res.send({ success: true, msg: 'Admins Registered' });
//     } catch (err) {
//         console.log(err);
//         return res
//             .status(500)
//             .send({ success: false, msg: 'Internal Server Error' });
//     }
// };

//Private Route -- Only for SysAdmin
// const categoryRegister = async (req, res) => {
//     try {
//       console.log("Register Category Route");

//       data.categories.forEach(async (cat) => {
//         try {
//           const result = Math.random().toString(36).substring(1, 9);
//           const pass = result;
//           const newCategory = new Admin({
//             name: cat.name,
//             email: cat.email,
//             password: pass,
//             token: "",
//             role:'CATEGORY',
//           });
//           await newCategory.save();
//         //   TODO: Email Credentials with email as ID and password

//         } catch (err) {
//           console.log(err);
//           return res.status(500).send({
//             success: false,
//             msg: "Internal Server Error",
//           });
//         }
//       });
//       return res.send({ success: true, msg: "Categories Registered" });
//     } catch (err) {
//       console.log(err);
//       return res
//         .status(500)
//         .send({ success: false, msg: "Internal Server Error" });
//     }
//   };

const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        const admin = await Admin.findOne({ email }, { email: 1, password: 1 });
        if (!admin)
            return res
                .status(401)
                .json({ success: false, msg: 'Invalid Admin Email' });

        if (!password == admin.password)
            return res
                .status(401)
                .json({ success: false, msg: 'Invalid password' });
        let payload = {
            admin_Id: admin._id,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60 * 60,
        });
        await Admin.updateOne({ _id: admin._id }, { token });
        return res.status(200).json({
            msg: 'Admin Signed in Successfully ',
            success: true,
            data: token,
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, msg: 'Internal Server Error' });
    }
};

const adminLogout = async (req, res) => {
    try {
        let token = req.headers['authorization'];
        let admin = await Admin.exists({ token });
        if (admin) {
            await Admin.updateOne(
                { _id: admin._id },
                {
                    $set: {
                        token: null,
                    },
                }
            );
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

const getAdminFromToken = async (token) => {
    try {
        let admin = await Admin.findOne(token);
        return admin;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    // adminRegister,
    // categoryRegister,
    adminLogin,
    adminLogout,
    getAdminFromToken,
};
