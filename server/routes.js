const express				= require('express');
const Patient 			= require('./patient');
const Drug 					= require('./drug');
const Prescription 	= require('./prescription');
const multer 				= require('multer')();

let medoneRouter = () => {
    const router				= express.Router();
    const patient 			= new Patient();
    const drug					= new Drug();
		const prescription 	= new Prescription();

		const patientRouter = express.Router();
		const drugRouter		= express.Router();
		const prescriptionRouter = express.Router();

		patientRouter
			.get('/', (req, res) => {
				patient.get().then( rows => {
					res.json(rows);
				});
			})
			.get('/:id', (req, res) => {
				patient.get(req.params.id).then( rows => {
					res.json(rows);
				});
			})
			.put('/:id', multer.array(), (req, res) => {
				patient.update(req.body).then( row => {
					res.json(row);
				});
			});

		drugRouter
			.get('/', (req, res) => {
				drug.getAll(req.query.denominationOrIngredient).then( rows => {
					res.json(rows);
				});
			})
			.get('/:id', (req, res) => {
				drug.get(req.params.id).then( rows => {
					res.json(rows);
				});
			});

	prescriptionRouter
		.get('/', (req, res) => {
			prescription.getAll(req.query.patientId).then( rows => {
				res.json(rows);
			});
		})
		.get('/:id', (req, res) => {
			prescription.get(req.params.id).then( rows => {
				res.json(rows);
			});
		});


		router.use('/drug', drugRouter);
		router.use('/patient', patientRouter);
		router.use('/prescription', prescriptionRouter);

    return router;
};

module.exports = medoneRouter;