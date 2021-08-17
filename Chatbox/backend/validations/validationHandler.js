const { validationResult } = require("express-validator/check")

module.exports = req => {
    const validatorErrors = validationResult(req);
    if (!validatorErrors.isEmpty()) {
        const error = new Error("Validation Failed");
        error.statusCode = 422;
        error.validation = validatorErrors.array();
        throw error;
    }
}
