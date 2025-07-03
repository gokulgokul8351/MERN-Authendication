const router = require('express').Router();
const { userCheck, userLogin } = require('../controller/user.controller');


// Register user route
router.post('/users', userCheck )

// Longin user route
router.post('/auth', userLogin)


module.exports = router;