'use strict';
module.exports = {
    async getAllUsers() {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM tb_usuarios', function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async getUserByid(id) {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM tb_usuarios WHERE id = ?', [id], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async getUserbyOffset(limit, offset) {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM tb_usuarios LIMIT ? OFFSET ?', [limit, offset], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async newUser(login, password, email) {
        return new Promise(function (resolve, reject) {
            db.query('INSERT INTO tb_usuarios (login,senha,email) VALUES (?,?,?)', [login, password, email], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async editUser(login, senha, email, id) {
        return new Promise(function (resolve, reject) {
            db.query('UPDATE tb_usuarios SET login = ?, senha = ?, email = ? WHERE id = ?', [login, senha, email, id], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async deleteUser(id) {
        return new Promise(function (resolve, reject) {
            db.query('DELETE FROM tb_usuarios WHERE ID = ?', [id], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
}