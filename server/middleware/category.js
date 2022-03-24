// Category Type Middleware: (All Portals)
// - isCategory -- check admin type(checks individual or Category) (No need to create Individual as a Category)

const Category = require("../models/Category");

// Category Middleware :
// - isSysAdmin -- check admin -> role-> category SysAdmin (For All Portals)
// - isSC --  check admin -> role-> category SC (For All Portals)
// - isCulturalCategory -- check admin -> role-> category type Cultural
// - isOperation -- check admin -> role-> category operation (For Main Dashboard)
// - isVigilance -- check admin -> role-> category vigilance (For Main Dashboard)
// - isJudge (For Judges Portal)
// - isOM (For OM Portal)
// - isINF (For InfoDesk Portal)
// - isCNF (For CNF Portal)
const isSystemAdminCC = (user,category) =>{
    return (user.role.accessLevel>=4 && category.categoryId=="SYS")
}

const isCategory = async (req, res, next) => {
  try {
      let admin = req.requestAdmin;
      console.log("Admin ",admin.role.type)
      if (admin.role.type != 1) {
          return res
              .status(400)
              .send({ msg: 'Not a category', success: false });
      }
      next();
  } catch (err) {
      console.log(err);
      return res.status(500).send({ msg: '' });
  }
};

const isOM = async (req, res, next) => {
  try {
      let admin = req.requestAdmin;
      console.log('Category ', admin);
      let category = await Category.findOne(
          { _id: admin.role.categoryId },
          { type: 1, categoryId: 1 }
      );
      console.log('category is ', category);
      if(isSystemAdminCC(admin,category))
      {
          next()
          return; 
      }
      if (!(category.type == 'SUPPORTING' && category.categoryId == 'OM')) {
          return res
              .status(403)
              .send({ msg: 'Access Denied', success: false });
      }
      next();
  } catch (err) {
      console.log(err);
      return res
          .status(500)
          .send({ msg: 'Internal Server Error', success: false });
  }
};

const isVigilance = async (req, res, next) => {
  try {
      let admin = req.requestAdmin;
      console.log('Category ', admin);
      let category = await Category.findOne(
          { _id: admin.role.categoryId },
          { type: 1, categoryId: 1 }
      );
      console.log('category is ', category);
      if(isSystemAdminCC(admin,category))
      {
          next()
          return; 
      }
      if (!(category.type == 'SUPPORTING' && category.categoryId == 'VIG')) {
          return res
              .status(403)
              .send({ msg: 'Access Denied', success: false });
      }
      next();
  } catch (err) {
      console.log(err);
      return res
          .status(500)
          .send({ msg: 'Internal Server Error', success: false });
  }
};

const isOperation = async (req, res, next) => {
  try {
      let admin = req.requestAdmin;
      console.log('Category ', admin);
      let category = await Category.findOne(
          { _id: admin.role.categoryId },
          { type: 1, categoryId: 1 }
      );
      console.log('category is ', category);
      if(isSystemAdminCC(admin,category))
      {
          next()
          return; 
      }
      if (!(category.type == 'SUPPORTING' && category.categoryId == 'OPR')) {
          return res
              .status(403)
              .send({ msg: 'Access Denied', success: false });
      }
      next();
  } catch (err) {
      console.log(err);
      return res
          .status(500)
          .send({ msg: 'Internal Server Error', success: false });
  }
};

const isSysAdmin = async (req, res, next) => {
  try {
      let admin = req.requestAdmin;
      console.log('Category ', admin);
      let category = await Category.findOne(
          { _id: admin.role.categoryId },
          { type: 1, categoryId: 1 }
      );
      console.log('category is ', category);
      if(isSystemAdminCC(admin,category))
      {
          next()
          return; 
      }
      if (!(category.type == 'SUPPORTING' && category.categoryId == 'SYS')) {
          return res
              .status(403)
              .send({ msg: 'Access Denied', success: false });
      }
      next();
  } catch (err) {
      console.log(err);
      return res
          .status(500)
          .send({ msg: 'Internal Server Error', success: false });
  }
};

const isCulturalCategory = async (req, res, next) => {
  try {
      let admin = req.requestAdmin;
      console.log('Category ', admin);
      let category = await Category.findOne(
          { _id: admin.role.categoryId },
          { type: 1, categoryId: 1 }
      );
      console.log('category is ', category);
      if(isSystemAdminCC(admin,category))
      {
          next()
          return; 
      }
      if (!(category.type == 'CULTURAL' )) {
          return res
              .status(403)
              .send({ msg: 'Access Denied', success: false });
      }
      next();
  } catch (err) {
      console.log(err);
      return res
          .status(500)
          .send({ msg: 'Internal Server Error', success: false });
  }
};

module.exports = {
  isCategory,
  isOM,
  isVigilance,
  isOperation,
  isSysAdmin,
  isCulturalCategory,
};