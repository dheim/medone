const config = require('../config');
const sqlite = require('sqlite3');
const path = require('path');

const db = new sqlite.Database(path.join(__dirname, config.dbPrescriptions));

db.serialize(function () {
        db.run('DROP TABLE IF EXISTS prescriptions');

        db.run(`CREATE TABLE prescriptions (
        id INTEGER PRIMARY KEY,
        patient_id INTEGER UNIQUE,
        prescriptionsJson TEXT
    )`);

        db.run(`INSERT INTO prescriptions (patient_id, prescriptionsJson) VALUES (
            50014, 
            '[{
                "id": 60111,
                "drugDocId": 10206,
                "drugName": "Aspirin Tabletten",
                "dosageScheme": "MorningNoonEveningNight",
                "dosageSet": {
                  "morning": 1,
                  "noon": 0,
                  "evening": 1,
                  "night": 1
                }
            },
            {
                "id": 60112,
                "drugDocId": 11146,
                "drugName": "Inderal 40 mg, Tabletten",
                "dosageScheme": "MorningNoonEveningNight",
                "dosageSet": {
                  "morning": 0,
                  "noon": 2,
                  "evening": 0,
                  "night": 2
                }
            }]'
        )`);
    }
);