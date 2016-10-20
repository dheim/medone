const config = require('../config');
const sqlite = require('sqlite3');
const path = require('path');

const db = new sqlite.Database(path.join(__dirname, config.dbPrescriptions));

db.serialize(function () {
        db.run('DROP TABLE IF EXISTS prescriptions');

        db.run(`CREATE TABLE prescriptions (
        id INTEGER PRIMARY KEY,
        patient_id INTEGER UNIQUE,
        prescription TEXT
    )`);

        db.run(`INSERT INTO prescriptions (patient_id, prescription) VALUES (
            50014, 
            '[
              {
                "drugDocId": 3250,
                "drugName": "Panadol, Brausetabletten",
                "dosageScheme": "MorningNoonEveningNight",
                "dosageSet": {
                  "morning": 1,
                  "noon": 0,
                  "evening": 1,
                  "night": 1
                }
              }
            ]'
        )`)
    }
);