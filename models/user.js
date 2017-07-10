const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  password: String
});

userSchema.pre('save', function(next){
  // if the password hasn't been modified we don't need to (re)hash it
  if (!this.isModified('password')) {
    return next();
  }
  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
