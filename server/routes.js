const express = require('express');
const Patient = require('./patient');
const Drug = require('./drug');
const Prescription = require('./models/Prescription.js');
const multer = require('multer')();
var mongoose = require('mongoose');

let medoneRouter = () => {
    const router = express.Router();
    const patient = new Patient();
    const drug = new Drug();

    const patientRouter = express.Router();
    const drugRouter = express.Router();
    const prescriptionRouter = express.Router();

    mongoose.connect('mongodb://localhost/medone');

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

    prescriptionRouter
        .post('/', (req, res, next) => {
            let prescription = new Prescription(req.body);
            prescription.save(function(err, savedPrescription) {
                if (err) {
                    var errorMessage = 'saving to mongodb failed: ' + err;
                    console.error(errorMessage);
                    res.statusCode = 500;
                    res.json({error: errorMessage});
                }
                console.log('prescription successfully saved');
                res.json(prescription.toObject());
            });
        });


    router.use('/drug', drugRouter);
    router.use('/patient', patientRouter);
    router.use('/prescription', prescriptionRouter);

    return router;
};

module.exports = medoneRouter;