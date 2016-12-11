const config = require('./config');
const sqlite = require('sqlite3');
const path = require('path');
const sqlBuilder = require('sql-query');
const db = new sqlite.Database(path.join(__dirname, `db`, config.dbMasterData));

class Patient {

    get(id, queryParams = {}) {
        return new Promise((resolve, reject) => {
            if (id > 0) {
                db.get('SELECT * FROM patients WHERE id = ?', id, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                    return;
                });
            }

            if (queryParams.search) {
                const query = `SELECT * FROM patients WHERE id = ?
                OR (
                    givenname || ' '|| surname LIKE ?
                    OR
                    surname || ' ' || givenname LIKE ?
                )`;
                db.all(query, [parseInt(queryParams.search), `%${queryParams.search}%`, `%${queryParams.search}%`], (err, rows) => {
                    if (err) reject(err);
                    if (rows) rows = rows.slice(0, 50);
                    resolve(rows);
                });
            } else {
                var namedSqlParameters = this.createNamedSqlParameters(queryParams);

                let sqlSelect = sqlBuilder.Query().select();
                let sql = sqlSelect
                    .from('patients')
                    .where(namedSqlParameters)
                    .build();
                db.all(sql, (err, rows) => {
                    if (err) reject(err);
                    if (rows) rows = rows.slice(0, 50);
                    resolve(rows);
                });
            }
        });
    }

    createNamedSqlParameters(queryParams) {
        let namedSqlParameters = {};

        if (queryParams.pid) namedSqlParameters.id              = queryParams.pid;
        if (queryParams.surname) namedSqlParameters.surname     = queryParams.surname;
        if (queryParams.givenName) namedSqlParameters.givenname = queryParams.givenName;
        if (queryParams.birthday) namedSqlParameters.birthday   = queryParams.birthday;
        if (queryParams.gender) namedSqlParameters.gender       = queryParams.gender;
        return namedSqlParameters;
    }

    update(patient) {
        return new Promise((resolve, reject) => {
            const updObj = {
                $id: patient.id,
                $givenname: patient.givenname,
                $surname: patient.surname,
                $birthday: patient.birthday,
                $streetaddress: patient.streetaddress,
                $zipcode: patient.zipcode,
                $city: patient.city,
                $country: patient.country,
                $telephonenumber: patient.telephonenumber,
                $emailaddress: patient.emailaddress,
                $bloodtype: patient.bloodtype,
                $occupation: patient.occupation,
                $gender: patient.gender
            };

            let stmt = db.prepare(`UPDATE patients
					SET givenname =  $givenname,
						surname =  $surname,
						birthday =  $birthday,
						streetaddress =  $streetaddress,
						zipcode =  $zipcode,
						city =  $city,
						country =  $country,
						telephonenumber =  $telephonenumber,
						emailaddress =  $emailaddress,
						bloodtype =  $bloodtype,
						occupation =  $occupation,
						gender =  $gender
				WHERE id = $id`, updObj);

            stmt.run((err) => {
                if (err) reject(err);
                db.get('SELECT * FROM patients WHERE id = ?', patient.id, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                });
            });
        });
    }
}

module.exports = Patient;