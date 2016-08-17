const express = require('express');
const Patient = require('./patient');
const Drug = require('./drug');

let medoneRouter = () => {
    const router = express.Router();
    const patient = new Patient();
    const drug = new Drug();

    router
        .get('/patients', (req, res) => {
            patient.get().then((rows) => {
                res.json(rows);
            });
        })
        .get('/patients/:id', (req, res) => {
            patient.get(req.params.id).then((rows) => {
                res.json(rows);
            });
        })
        .get('/drugs', (req, res) => {
            drug.get().then((rows) => {
                res.json(rows);
            });
        })
        .get('/drugs/:id', (req, res) => {
            drug.get(req.params.id).then((rows) => {
                res.json(rows);
            });
        });

    return router;
};

module.exports = medoneRouter;