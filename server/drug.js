const config = require('./config');
const sqlite = require('sqlite3');
const path = require('path');
const db = new sqlite.Database(path.join(__dirname, `db`, config.dbMasterData));

class Drug {

    get(id = null) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM drugs WHERE docid = ?', id, (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    getAll(denominationOrIngredient = null) {
        return new Promise((resolve, reject) => {
            if (denominationOrIngredient) {
                let match = `preparation_denomination:*${denominationOrIngredient}* OR active_ingredients:*${denominationOrIngredient}*`;
                db.all(`SELECT * FROM drugs WHERE drugs MATCH ?`, match, (err, row) => {
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