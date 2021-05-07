let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: [true, "Campo obrigatório"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String, 
    required: [true, "Campo obrigatório"]
  }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);