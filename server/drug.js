const config  = require('./config');
const sqlite  = require('sqlite3');
const path    = require('path');
const db      = new sqlite.Database(path.join(__dirname, `db`, config.db));


class Drug {

    get(id = null) {
        return new Promise( (resolve, reject) => {
            if (id > 0) {
                db.get('SELECT * FROM drugs WHERE id = ?', id, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                });
            } else {
                db.all('SELECT * FROM drugs', (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                });
            }
        });
    }
}

module.exports = Drug;