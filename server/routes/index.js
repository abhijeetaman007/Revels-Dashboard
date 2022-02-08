const express = require('express');
const router = express.Router();
const { userRegister, userLogin, userLogout } = require('./user');

//Routes:

router.post('/user/register', userRegister);
router.post('/user/login', userLogin);
router.get('/user/logout', userLogout);

module.exports = router;
