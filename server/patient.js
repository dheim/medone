const config  = require('./config');
const sqlite  = require('sqlite3');
const path    = require('path');
const db      = new sqlite.Database(path.join(__dirname, `db`, config.db));


class Patient {

    get(id = null) {
        return new Promise( (resolve, reject) => {
            if (id > 0) {
                db.get('SELECT * FROM patients WHERE id = ?', id, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                });
            } else {
                db.all('SELECT * FROM patients', (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                });
            }
        });
    }
}

module.exports = Patient;