const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  dni: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);