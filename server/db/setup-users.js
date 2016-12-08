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

var nurse = new User({
    username: 'nurse',
    lastName: 'Meyer',
    firstName: 'Andrea',
    password: '1234',
    role: 'NURSE'
});

saveUsers([doctor, nurse]);


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

