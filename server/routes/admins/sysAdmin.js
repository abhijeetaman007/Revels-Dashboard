const { nanoid, customAlphabet } = require("nanoid");
const DelCard = require("../../models/DelegateCard");
const Role = require("../../models/Role");
const Category = require("../../models/Category");
const Admin = require("../../models/Admin");
const College = require("../../models/College");
const { sendEmailNotif, sendENotif } = require("../../utils/ses");
const { emailTemplate } = require("../../utils/template");
const { mailer } = require("../../utils/mailer");
const User = require("../../models/User");

const addDelegateCard = async (req, res) => {
  try {
    let { name, type, mitPrice, mahePrice, nonMahePrice, description } =
      req.body;
    console.log(
      "Delegate Card Added: ",
      name,
      type,
      mitPrice,
      mahePrice,
      nonMahePrice,
      description
    );
    if (
      !name ||
      !mahePrice ||
      !nonMahePrice ||
      !description ||
      !type ||
      !mitPrice
    )
      return res
        .status(400)
        .send({ success: false, msg: "Please fill all the fields" });

    let card = await DelCard.exists({ name });
    console.log("Card ", card);
    if (card)
      return res.status(400).send({
        success: false,
        msg: "Delegate with same name exists",
      });

    let cardID;
    while (true) {
      const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);
      cardID = nanoid();
      let card = await DelCard.findOne({ cardID });
      if (!card) break;
    }
    let delegateCard = new DelCard({
      cardID,
      name,
      type,
      mitPrice,
      mahePrice,
      nonMahePrice,
      nonMahePrice,
      description,
    });
    delegateCard = await delegateCard.save();
    return res.status(200).send({
      success: true,
      msg: "New DelegateCard/ProShow Added",
      data: delegateCard,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const deleteDelegateCard = async (req, res) => {
  try {
    let { cardID } = req.body;
    let card = await DelCard.findOneAndDelete({ cardID });
    if (!card)
      return res.status(400).send({
        success: false,
        msg: "No Delegate-Card/ProShow exists",
      });
    return res.status(200).send({
      success: true,
      msg: "Delegate-Card/ProShow deleted",
      data: card,
    });
  } catch (err) {
    console.log(err);
    return res.send(500).send({ success: false, msg: "Internal Server Error" });
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
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const addRole = async (req, res) => {
  try {
    console.log(" Adding Role");
    let { accessLevel, categoryId, type } = req.body;
    let category;
    if (categoryId) {
      category = await Category.findOne({ _id: categoryId }, { _id: 1 });
      if (!category)
        return res
          .status(400)
          .send({ msg: "Category Not Found", success: false });
    }
    categoryId = categoryId == null ? null : category._id;
    let newRole = await new Role({
      accessLevel,
      categoryId,
      isActive: true,
      type,
    });
    await newRole.save();
    return res
      .status(200)
      .send({ success: true, data: newRole, msg: "New Role Added" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const addCategories = async (req, res) => {
  try {
    let categories = req.body;
    let flag = false;
    for (let i = 0; i < categories.length; i++) {
      let { categoryId, category, description, type } = categories[i];
      let newCategory = new Category({
        categoryId,
        category,
        description,
        type,
      });
      await newCategory.save();
      console.log(newCategory.category, " added to db");
    }
    return res.status(200).send({ success: true, msg: "Categories Added" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const registerAdmin = async (req, res) => {
  try {
    let { name, type, accessLevel, categoryId, email, phoneNo } = req.body;
    let category = await Category.findOne({ categoryId });
    if (!category)
      return res
        .status(400)
        .send({ success: false, msg: "Category does not exists" });
    console.log(category);

    console.log("Category _ID", category._id);
    let role = await Role.findOne({
      type,
      accessLevel,
      categoryId: category._id,
    }).populate("categoryId");
    if (!role)
      return res
        .status(400)
        .send({ success: false, msg: "Role does not exists" });

    const nanoid = customAlphabet(
      "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      8
    );
    const pass = nanoid();
    let newAdmin = new Admin({
      name,
      password: pass,
      role: role._id,
      email,
      phoneNo,
    });
    console.log("New Role ", role);
    console.log("New Admin ", newAdmin);
    await newAdmin.save();

    // let html = emailTemplate(
    //     newAdmin.name,
    //     `Please use following credentials for your category related portal.<div><b>Email</b> : ${newAdmin.email} \n <b>Password : </b> ${newAdmin.password}</div>`,
    //     `https://outstation.revelsmit.in/`,
    //     'OM Portal'
    // );
    let html = emailTemplate(
      newAdmin.name,
      `Please use following credentials for your category related portal.<div><b>Email</b> : ${newAdmin.email} \n <b>Password : </b> ${newAdmin.password}</div>`,
      `https://revelsmit.in/admin`,
      "Category portal"
    );

    // SES
    // let message = `You are registered as Admin you can access your category portal with following credentials \n <b>Email : </b> ${newAdmin.email} \n <b>Password : ${newAdmin.pass}</b>\nRegards,\nSystem Admin - Aagaz | Revels '22`;
    // await sendENotif(newAdmin.email, "Admin Credentials Revels'22", message);
    // await sendEmailNotif(
    //     newAdmin.email,
    //     'Email Verification Revels',
    //     html,
    //     message
    // );

    // Node Mailer
    // await mailer(newAdmin.email,"Admin Credentials Revels'22 ",html)
    // await mailer("","Admin Credentials Revels'22 ",html)

<<<<<<< HEAD
        // let html = emailTemplate(
        //     newAdmin.name,
        //     `Please use following credentials for your category related portal.<div><b>Email</b> : ${newAdmin.email} \n <b>Password : </b> ${newAdmin.password}</div>`,
        //     `https://outstation.revelsmit.in/`,
        //     'OM Portal'
        // );
        // let html = emailTemplate(
        //         newAdmin.name,
        //         `Please use following credentials for your category related portal.<div><b>Email</b> : ${newAdmin.email} \n <b>Password : </b> ${newAdmin.password}</div>`,
        //         `https://revelsmit.in/admin`,
        //         'Category portal'
        //     );

        
        // SES
        // let message = `You are registered as Admin you can access your category portal with following credentials \n <b>Email : </b> ${newAdmin.email} \n <b>Password : ${newAdmin.pass}</b>\nRegards,\nSystem Admin - Aagaz | Revels '22`;
        // await sendENotif(newAdmin.email, "Admin Credentials Revels'22", message);
        // await sendEmailNotif(
        //     newAdmin.email,
        //     'Email Verification Revels',
        //     html,
        //     message
        // );
        
        // Node Mailer
        // await mailer(newAdmin.email,"Admin Credentials Revels'22 ",html)
        // await mailer("","Admin Credentials Revels'22 ",html)

        return res
            .status(200)
            .send({ success: true, msg: 'New Admin Registered',data:newAdmin });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
=======
    return res
      .status(200)
      .send({ success: true, msg: "New Admin Registered", data: newAdmin });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
>>>>>>> 8dcd5800e9531a1fd2d2f0e0afdb6e0b90e7dcc0
};

// For Multiple Registration from same category
const registerMultipleAdmins = async (req, res) => {
  try {
    let { admins, type, accessLevel, categoryId } = req.body;
    let category = await Category.findOne({ categoryId });
    if (!category)
      return res
        .status(400)
        .send({ success: false, msg: "Category does not exists" });
    console.log(category);

    console.log("Category _ID", category._id);
    let role = await Role.findOne({
      type,
      accessLevel,
      categoryId: category._id,
    }).populate("categoryId");
    if (!role)
      return res
        .status(400)
        .send({ success: false, msg: "Role does not exists" });

    for (let i = 0; i < admins.length; i++) {
      const nanoid = customAlphabet(
        "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        8
      );
      const pass = nanoid();
      let newAdmin = new Admin({
        name: admins[i].name,
        password: pass,
        role: role._id,
        email: admins[i].email,
        phoneNo: admins[i].phoneNo,
      });
      await newAdmin.save();
      // console.log("New Role ",role)
      console.log("New Admin ", i + 1, " : ", newAdmin);
    }
    return res.send({ success: true, msg: "New Admins Registered" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ sucess: false, msg: "Internal Server Error" });
  }
};

const getAllRoles = async (req, res) => {
  try {
    console.log("Roles");
    let roles = await Role.find({}).populate("categoryId");
    return res.status(500).send({ success: true, data: roles });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const addCollege = async (req, res) => {
  try {
    let { name, state, isMahe } = req.body;
    let collegeName = name.toUpperCase();
    let college = new College({
      name: collegeName,
      state,
      isMahe,
    });
    await college.save();
    return res.status(200).send({ success: true, msg: "College Added" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const sendEmail = async (req, res) => {
  try {
    let { email } = req.body;
    let admin = await Admin.findOne({ email });
    if (!admin) return res.send({ msg: "No Admin Found" });

    console.log("Admin ", admin);
    // console.log("Total ",admins.length);
    // for(let i=1;i<admins.length;i++)
    // {
    let subject = "Admin Credentials for INF Portal";
    let name = admin.name;
    let message = `Please use following credentials for your category related portal.<div><b>Email</b> : ${admin.email} \n <b>Password : </b> ${admin.password}</div>`;
    let url = `https://revelsmit.in/admin`;
    let buttonText = "INF Portal";
    let html = emailTemplate(name, message, url, buttonText);
    // NodeMailer
    await mailer(email, subject, html);
    // }
    return res.send({ msg: "Email Sent", success: true });
  } catch (err) {
    console.log(err);
    return res.send({ msg: "Internal Server Error", success: false });
  }
};

const updateSysUser = async (req, res) => {
  try {
    let { email, password, userID, mobileNumber, userEmail, userCollege } =
      req.body;
    let college = {};
    const isAdmin = await Admin.exists({
      email,
      password,
      role: "62517feec3512d9a4052b9f7",
    });
    if (userEmail == "" || !userEmail) userEmail = null;
    if (userCollege == "" || !userCollege) userCollege = null;
    if (!isAdmin) return res.status(403).json({ msg: "Unauthorized Access" });
    const oldUser = await User.findOne({ userID, mobileNumber });
    if (!oldUser)
      return res
        .status(400)
        .json({ msg: "No User Exists with the given userID" });
    userEmail = userEmail ? userEmail : oldUser.email;
    userCollege = userCollege ? userCollege : oldUser.college;
    if (userCollege) {
      college = await College.findOne({ name: userCollege });
      if (!college) return res.status(400).json({ msg: "No Such College" });
    }
    const user = await User.findOneAndUpdate(
      { userID },
      {
        $set: {
          email: userEmail,
          college: college.name,
          isMahe: college.isMahe,
        },
      },
      { new: true }
    ).select("name email college mobileNumber userID");
    return res
      .status(200)
      .send({ success: true, msg: "User Profile Updated", user: user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
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
  sendEmail,
  getAllRoles,
  registerMultipleAdmins,
  updateSysUser,
};

// const fixbug = (req,res) =>{
//     try
//     {
//         await College.findOneAndUpdate({isMahe:1},{
//             isMahe:2,
//         });
//         await College.findOneAndUpdate({name:"MANIPAL INSTITUTE OF TECHNOLOGY"},{
//             isMahe:1
//         })
//       return res.send("DONE")
//     }
//     catch(err)
//     {
//         console.log(err);
//         return res.status(500)
//     }
// }
