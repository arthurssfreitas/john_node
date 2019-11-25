'use strict';
module.exports = {
    async getAllProducts() {
        return new Promise(function (resolve, reject) {
            db.query(`SELECT 
            a.id_produto, 
            a.nome, 
            a.qty,
            a.fk_categoria, 
            a.fk_unidade, 
            b.nome as unidade, 
            c.nome as categoria 
            FROM tb_produtos a 
            INNER JOIN tb_unidade_medida b 
            on a.fk_unidade = b.id_unidade 
            INNER JOIN tb_categorias c 
            on a.fk_categoria = c.id_categoria`, function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async getProductsbyCategory(fk_categoria) {
        return new Promise(function (resolve, reject) {
            db.query(`SELECT 
            a.id_produto, 
            a.nome, 
            a.qty, 
            a.fk_categoria, 
            a.fk_unidade, 
            b.nome as unidade, 
            c.nome as categoria 
            FROM tb_produtos a 
            INNER JOIN tb_unidade_medida b 
            on a.fk_unidade = b.id_unidade 
            INNER JOIN tb_categorias c 
            on a.fk_categoria = c.id_categoria 
            WHERE fk_categoria = ?`,
                [fk_categoria],
                function (err, result) {
                    if (err) return reject(err);
                    return resolve(result);
                });
        });
    },
    async getProductsByUnity(fk_unidade) {
        return new Promise(function (resolve, reject) {
            db.query(`SELECT 
            a.id_produto, 
            a.nome, 
            a.qty, 
            a.fk_categoria, 
            a.fk_unidade, 
            b.nome as unidade, 
            c.nome as categoria 
            FROM tb_produtos a 
            INNER JOIN tb_unidade_medida b 
            on a.fk_unidade = b.id_unidade 
            INNER JOIN tb_categorias c 
            on a.fk_categoria = c.id_categoria 
            WHERE fk_unidade = ?`,
                [fk_unidade],
                function (err, result) {
                    if (err) return reject(err);
                    return resolve(result);
                });
        });
    },
    async getProductByid(id_produto) {
        return new Promise(function (resolve, reject) {
            db.query(`SELECT 
            a.id_produto, 
            a.nome, 
            a.qty, 
            a.fk_categoria, 
            a.fk_unidade, 
            b.nome as unidade, 
            c.nome as categoria 
            FROM tb_produtos a 
            INNER JOIN tb_unidade_medida b 
            on a.fk_unidade = b.id_unidade 
            INNER JOIN tb_categorias c 
            on a.fk_categoria = c.id_categoria 
            WHERE id_produto = ?`,
                [id_produto],
                function (err, result) {
                    if (err) return reject(err);
                    return resolve(result);
                });
        });
    },
    async getProductbyOffset(limit, offset) {
        return new Promise(function (resolve, reject) {
            db.query(`SELECT 
            a.id_produto, 
            a.nome, 
            a.qty,
            a.fk_categoria, 
            a.fk_unidade, 
            b.nome as unidade, 
            c.nome as categoria 
            FROM tb_produtos a 
            INNER JOIN tb_unidade_medida b 
            on a.fk_unidade = b.id_unidade 
            INNER JOIN tb_categorias c 
            on a.fk_categoria = c.id_categoria 
            LIMIT ? 
            OFFSET ?`,
                [limit, offset],
                function (err, result) {
                    if (err) return reject(err);
                    return resolve(result);
                });
        });
    },
    async newProduct(nome, qty, fk_categoria, fk_unidade) {
        return new Promise(function (resolve, reject) {
            db.query(`INSERT INTO tb_produtos (nome,qty,fk_categoria,fk_unidade) VALUES (?,?,?,?)`, [nome, qty, fk_categoria, fk_unidade], function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    },
    async editProduct(id_produto, nome, qty, fk_categoria, fk_unidade) {
        return new Promise(function (resolve, reject) {
            db.query(`UPDATE tb_produtos SET nome = ?, qty = ?, fk_categoria = ?, fk_unidade = ? WHERE id_produto = ?`, [nome, qty, fk_categoria, fk_unidade, id_produto], function (err, result) {
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