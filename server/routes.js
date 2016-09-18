const express = require('express');
const Patient = require('./patient');
const Drug = require('./drug');

let medoneRouter = () => {
    const router = express.Router();
    const patient = new Patient();
    const drug = new Drug();

    router
        .get('/patient', (req, res) => {
            patient.get().then((rows) => {
                res.json(rows);
            });
        })
        .get('/patient/:id', (req, res) => {
            patient.get(req.params.id).then((rows) => {
                res.json(rows);
            });
        })
        .get('/drug', (req, res) => {
            drug.getAll(req.query.denominationOrIngredient).then((rows) => {
                res.json(rows);
            });
        })
        .get('/drug/:id', (req, res) => {
            drug.get(req.params.id).then((rows) => {
                res.json(rows);
            });
        });

    return router;
};

module.exports = medoneRouter;