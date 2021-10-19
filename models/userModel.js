const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const Schema = mongoose.Schema;
//mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
  username: {
    type: 'String',
    required: true,
    trim: true
  },
  password: {
    type: 'String',
    required: true,
    trim: true
  },
  firstName: {
    type: 'String',
    required: true,
    trim: true
  },
  lastName: {
    type: 'String',
    required: true,
    trim: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  }

});

userSchema.methods.joiValidate = function(obj) {
	var schema = {
		username: Joi.String().email().required(),
		password: Joi.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),		
		firstName: Joi.String().required(),
		lastName: Joi.String().required()
	}
	return Joi.validate(obj, schema);
}

/* userSchema.pre('save', function (next) {
  const user = this;
  if (!this.isModified || !this.isNew) {
    next();
  } else {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        //console.log('Error hashing password for user', user.name);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
}); */

/* UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
}; */

module.exports = mongoose.model('users', userSchema);

//https://devdactic.com/restful-api-user-authentication-1/