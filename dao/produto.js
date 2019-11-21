'use strict';
module.exports = {
    async getAllProducts() {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM tb_produtos', function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async getProductsbyCategory(fk_categoria) {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM tb_produtos where fk_categoria = ?', [fk_categoria], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async getProductByid(id_produto) {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM tb_produtos WHERE id_produto = ?', [id_produto], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async getProductbyOffset(limit, offset) {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM tb_produtos LIMIT ? OFFSET ?', [limit, offset], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async newProduct(fk_categoria, nome, qty) {
        return new Promise(function (resolve, reject) {
            db.query('INSERT INTO tb_produtos (fk_categoria,nome,qty) VALUES (?,?,?)', [fk_categoria, nome, qty], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async editProduct(fk_categoria, nome, qty, id_produto) {
        return new Promise(function (resolve, reject) {
            db.query('UPDATE tb_produtos SET fk_categoria = ?, nome = ?, qty = ? WHERE id_produto = ?', [fk_categoria, nome, qty, id_produto], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async deleteProduct(id_produto) {
        return new Promise(function (resolve, reject) {
            db.query('DELETE FROM tb_produtos WHERE id_produto = ?', [id_produto], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
}