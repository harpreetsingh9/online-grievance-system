const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.signUpUser);
router.post('/signin', authController.signInUser);
router.post('/verify', authController.verifyEmail);

module.exports = router;