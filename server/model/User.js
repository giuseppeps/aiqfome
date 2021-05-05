let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  email: {type: String, required: [true, "Campo obrigatório"]},
  pass: String,
}, {timestamps: true});

mongoose.model('User', UserSchema);