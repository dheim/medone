const express = require('express');
const Patient = require('./patient');
const Drug = require('./drug');
const Prescription = require('./models/Prescription.js');
const User = require('./models/User');
const multer = require('multer')();
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');

let medoneRouter = () => {
    const router = express.Router();
    const patient = new Patient();
    const drug = new Drug();

    const authenticationRouter = express.Router();
    const patientRouter = express.Router();
    const drugRouter = express.Router();

    mongoose.connect('mongodb://localhost/medone');

    authenticationRouter
        .post('/', (req, res) => {
            User.findOne({
                username: req.body.username
            }, function (err, user) {
                if (err) throw err;

                if (!user) {
                    res.json({success: false, message: 'Authentication failed. User not found.'});
                    return;
                }

                if (user.password != req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                    return;
                }

                var token = jwt.sign(user, config.secret, {
                    expiresIn: '1h'
                });

                res.json({
                    success: true,
                    message: 'Welcome to medone!',
                    token: token
                });
            })
        });

    patientRouter
        .get('/', (req, res) => {
            patient.get().then(rows => {
                res.json(rows);
            });
        })
        .get('/:id', (req, res) => {
            patient.get(req.params.id).then(rows => {
                res.json(rows);
            });
        })
        .put('/:id', multer.array(), (req, res) => {
            patient.update(req.body).then(row => {
                res.json(row);
            });
        });

    drugRouter
        .get('/', (req, res) => {
            drug.getAll(req.query.denominationOrIngredient).then(rows => {
                res.json(rows);
            });
        })
        .get('/:id', (req, res) => {
            drug.get(req.params.id).then(rows => {
                res.json(rows);
            });
        });

    patientRouter
        .get('/:patientId/prescriptions', (req, res) => {
            Prescription.find({
                patientId: req.params.patientId
            }, (err, results) => {
                res.json({data: results});
            });

        })

        .post('/:patientId/prescriptions', (req, res, next) => {
            let prescription = new Prescription(req.body);
            prescription.patientId = req.params.patientId;
            prescription.save(function (err, savedPrescription) {
                if (err) {
                    var errorMessage = 'saving to mongodb failed: ' + err;
                    console.error(errorMessage);
                    res.statusCode = 500;
                    res.json({error: errorMessage});
                    return;
                }
                console.log('prescription successfully saved');
                res.json(prescription.toObject());
            });
        });


    router.use('/authentication', authenticationRouter);
    router.use('/drug', drugRouter);
    router.use('/patient', patientRouter);

    return router;
};

module.exports = medoneRouter;