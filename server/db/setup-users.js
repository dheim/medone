const User = require('../models/User.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/medone');

var admin = new User({
    username: 'admin',
    lastName: 'Min',
    firstName: 'Ad',
    password: bcrypt.hashSync('1234', 10),
    role: 'ADMIN'
});

var doctor = new User({
    username: 'house',
    lastName: 'House',
    firstName: 'Gregory',
    password: bcrypt.hashSync('1234', 10),
    role: 'DOCTOR'
});

var nurse = new User({
    username: 'nurse',
    lastName: 'Meyer',
    firstName: 'Andrea',
    password: bcrypt.hashSync('1234', 10),
    role: 'NURSE'
});

saveUsers([admin, doctor, nurse]);

User.remove().exec();

function saveUsers(users) {
    let processed = 0;
    users.forEach((user) => {
        user.save(function (err, savedUser) {
            if (err) {
                var errorMessage = 'saving of user ' + user.lastName + ' to mongodb failed: ' + err;
                console.error(errorMessage);
                return;
            } else {
                console.log('user ' + user.lastName + ' successfully saved');
            }

            processed++;
            if (processed == users.length) {
                mongoose.disconnect();
            }
        });
    })
}

