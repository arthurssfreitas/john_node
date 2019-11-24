'use strict';
module.exports = {
    async getAllUnities() {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM tb_unidade_medida', function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
}