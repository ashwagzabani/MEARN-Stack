const { body } = require("express-validator/check")

exports.isEmail = body("email")
    .isEmail()
    .withMessage("Email field must contain a correct email");

exports.hasPassword = body("password")
    .exists()
    .withMessage("Password cannot be empty")

exports.hasName = body("name")
    .isLength({
        min: 5
    })
    .withMessage("Name is required. Min Length 5 characters.")