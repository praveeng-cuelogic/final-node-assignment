const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//mongoose.set('useCreateIndex', true);
const usersActivitySchema = new Schema({
  ip: {
    type: 'String',
    required: true,
    trim: true
  },
  userAgent: {
    type: 'String',
    required: true,
    trim: true
  },
  user: {
    type:Schema.Types.ObjectId,
    ref:"userModel"
  },
  loggedInDate: {
    type: Date,
    //required: true,
    default: Date.now
  },
});


module.exports = mongoose.model('usersActivity', usersActivitySchema);