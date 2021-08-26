const express = require('express');
const router = express.Router();

const authController = require('../cotrollers/authController')
const { isEmail, hasPassword, hasName } = require("../validations/validators")

router.post('/login', authController.login)
router.post('/signup', [isEmail, hasPassword, hasName], authController.signup)
router.get('/user/:email', authController.findUserByEmail)
router.get('/user/:id', authController.userDetails)

module.exports = router;
