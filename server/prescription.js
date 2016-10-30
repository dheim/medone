const config = require('./config');
const sqlite = require('sqlite3');
const path = require('path');
const db = new sqlite.Database(path.join(__dirname, `db`, config.dbPrescriptions));

class Prescription {

    get(id = null) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM prescriptions WHERE id = ?', id, (err, row) => {
                if (err) reject(err);

                if (row) {
                    let prescriptions = JSON.parse(row.prescriptionsJson);
                    let data = {patientId: row.patient_id, prescriptions};
                    resolve({data});
                } else {
                    resolve()
                }
            });

        });
    }

    getAll(patientId) {
        if (patientId) {
            return new Promise((resolve, reject) => {
                db.get('SELECT * FROM prescriptions WHERE patient_id = ?', patientId, (err, row) => {
                    if (err) reject(err);

                    let prescriptions = row ? JSON.parse(row.prescriptionsJson) : [];
                    let data = {patientId, prescriptions};
                    resolve({data});
                });

            });
        } else {
            return new Promise((resolve, reject) => {
                db.all('SELECT * FROM prescriptions', (err, rows) => {
                    if (err) reject(err);
                    var data = rows.map(row => {
                        let prescriptions = JSON.parse(row.prescriptionsJson);
                        return {patientId: row.patient_id, prescriptions};
                    });
                    resolve({data});
                });

            });
        }
    }
}

module.exports = Prescription;