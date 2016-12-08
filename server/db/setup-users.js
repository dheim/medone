const User = require('../models/User.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/medone');

var doctor = new User({
    username: 'house',
    lastName: 'House',
    firstName: 'Gregory',
    password: '1234',
    role: 'DOCTOR'
});

saveUser(doctor);

function saveUser(user) {
    user.save(function (err, savedUser) {
        if (err) {
            var errorMessage = 'saving of user ' + user.lastName + ' to mongodb failed: ' + err;
            console.error(errorMessage);
            return;
        }
        console.log('user ' + user.lastName + ' successfully saved');
    });
}

