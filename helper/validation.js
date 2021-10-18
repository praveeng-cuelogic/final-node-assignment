const Joi = require('joi');

const authSchema = Joi.object({
    userEmail: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required()
})


module.exports = {
    authSchema,
}