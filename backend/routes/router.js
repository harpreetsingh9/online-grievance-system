const router = require('express').Router();

//auth
router.use('/auth', require('./auth.route'));


module.exports = router;