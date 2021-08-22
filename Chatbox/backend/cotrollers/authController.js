const User = require('../models/user');
const validationHandler = require("../validations/validationHandler")

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email, password }).select("+password");

        if (!user) {
            // const error = new Error("wrang credentials");
            // error.statusCode = 401;
            // throw error;
            return res.status(401).send("wrang credentials")
        }

        return res.send({ user })
    }
    catch (err) {
        next(err);
    }
}

exports.signup = async (req, res, next) => {
    try {
        validationHandler(req);

        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            const error = new Error("Email already used");
            error.statusCode = 403;
            throw error;
        }

        let user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        user.name = req.body.name;
        user = await user.save();


        return res.send({ user })
    }
    catch (err) {
        next(err);
    }
}


