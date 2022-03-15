// Category Type Middleware: (All Portals)
// - isCategory -- check admin type(checks individual or Category) (No need to create Individual as a Category)

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

const isCategory = async (req, res) => {
  try {
    let user = req.reqeustUser;
    if (user.role.type == 0) next();
    return res.status(400).send({ msg: 'Not a category', success: false });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: '' });
  }
};

const isCulturalCategory = async (req, res) => {
  try {
    let user = req.reqeustUser;
    if (user.categoryId.type == 'CULTURAL') next();
    return res.status(403).send({ msg: 'Access Denied', success: false });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: '' });
  }
};

const isSysAdmin = async (req, res) => {
  try {
    let user = req.reqeustUser;
    if (
      user.categoryId.type == 'SUPPORTING' &&
      user.categoryId.category == 'SYSADMIN'
    )
      next();
    return res.status(403).send({ msg: 'Access Denied', success: false });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: '' });
  }
};

const isOperation = async (req, res) => {
  try {
    let user = req.reqeustUser;
    if (
      user.categoryId.type == 'SUPPORTING' &&
      user.categoryId.category == 'OPERATION'
    )
      next();
    return res.status(403).send({ msg: 'Access Denied', success: false });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ msg: 'Internal Server Error', success: false });
  }
};

const isVigilance = async (req, res) => {
  try {
    let user = req.reqeustUser;
    if (
      user.categoryId.type == 'SUPPORTING' &&
      user.categoryId.category == 'VIGILANCE'
    )
      next();
    return res.status(403).send({ msg: 'Access Denied', success: false });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ msg: 'Internal Server Error', success: false });
  }
};
