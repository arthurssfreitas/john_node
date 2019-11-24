'use strict';
module.exports = {
    async getAllCategories() {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM tb_categorias', function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async getQtyProductsByCategory(id_categoria){
        return new Promise(function(resolve,reject){
            db.query('SELECT * FROM tb_produtos where fk_categoria = ?',[id_categoria], function(err,result){
                if(err) return reject(err);
                return resolve(result);
            });
        });
    },  
    async getCategoryById(id_categoria) {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM tb_categorias WHERE id_categoria = ?', [id_categoria], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },  
    async getCategorybyOffset(limit, offset) {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM tb_categorias LIMIT ? OFFSET ?', [limit, offset], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async newCategory(nome) {
        return new Promise(function (resolve, reject) {
            db.query('INSERT INTO tb_categorias (nome) VALUES (?)', [nome], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async editCategory(id_categoria,nome) {
        return new Promise(function (resolve, reject) {
            db.query('UPDATE tb_categorias SET nome = ? WHERE id_categoria = ?', [nome, id_categoria], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async deleteCategory(id_categoria) {
        return new Promise(function (resolve, reject) {
            db.query('DELETE FROM tb_categorias WHERE id_categoria = ?', [id_categoria], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
}