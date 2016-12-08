var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    lastName: String,
    firstName: String,
    password: String,
    role: String
});

module.exports = mongoose.model('User', userSchema);