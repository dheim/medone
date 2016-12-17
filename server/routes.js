const express = require('express');
const Patient = require('./patient');
const Drug = require('./drug');
const Prescription = require('./models/Prescription.js');
const User = require('./models/User');
const multer = require('multer')();
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');
const bcrypt = require('bcrypt');

let medoneRouter = () => {
    const router = express.Router();
    const patient = new Patient();
    const drug = new Drug();

    const authenticationRouter = express.Router();
    const patientRouter = express.Router();
    patientRouter.use(checkTokenMiddleware);
    const drugRouter = express.Router();
    drugRouter.use(checkTokenMiddleware);
    const userRouter = express.Router();
    userRouter.use(checkTokenMiddleware);

    mongoose.connect('mongodb://localhost/medone');

    function checkTokenMiddleware(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) {
            return res.status(403).json({
                success: false,
                message: 'No token provided.'
            });
        }

        jwt.verify(token, config.secret, function (err, decodedToken) {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid token.'
                });
            } else {
                // save to request for use in other routes
                req.decodedToken = decodedToken;
                next();
            }
        });
    }

    function checkAccess(req, res, next) {
        if (req.decodedToken.role !== this.role) {
            return res.status(403).send({
                success: false,
                message: 'Permission denied'
            });
        } else {
            next();
        }
    }

    authenticationRouter
        .post('/', (req, res) => {
            User.findOne({
                username: req.body.username
            }, function (err, user) {
                if (
                    err
                    || !user
                    || !bcrypt.compareSync(req.body.password, user.password)
                ) {
                    return res.status(403).json({
                        success: false,
                        message: 'Authentiation failed'
                    });
                }

                var token = jwt.sign({username: user.username, role: user.role}, config.secret, {
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
            patient.get(req.param.pid, req.query
            ).then(rows => {
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

        .post('/:patientId/prescriptions', checkAccess.bind({role: 'DOCTOR'}), (req, res, next) => {
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

    userRouter
        .get('/', checkAccess.bind({role: 'ADMIN'}), (req, res) => {
            User.find({}, (err, all) => {
                if (err) {
                    const errorMessage = 'getting users failed';
                    res.statusCode = 500;
                    res.json({error: errorMessage});
                    return;
                }
                res.json(all);
            });
        })
        .post('/', checkAccess.bind({role: 'ADMIN'}), (req, res) => {
            let user = new User(req.body);
            user.save( (err, newUser) => {
                if (err) {
                    res.statusCode = 500;
                    return
                }
                res.json(newUser.toObject());
            });
        });

    router.use('/authentication', authenticationRouter);
    router.use('/drug', drugRouter);
    router.use('/patient', patientRouter);
    router.use('/user', userRouter);

    return router;
};

module.exports = medoneRouter;