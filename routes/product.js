'use strict';
const productDao = require('../dao/product');
module.exports = {
    getAllProducts: async (req, res) => {
        if (req.session.loggedin) {
            let pagina = parseInt(req.query.pagina) || 1;
            let limit = parseInt(req.query.limit) || 10;
            let offset = (pagina - 1) * limit;
            let result = await productDao.getProductbyOffset(limit, offset);
            res.render('admin/product', {
                products: result,
                activePage: "products",
                pageName: "Produtos",
                limit: limit,
                offset: offset,
                dados: req.session,
                pagina: pagina
            });
        } else {
            res.send('faça login para ver a página');
        }
    },
    createProductPage: async (req, res) => {
        if (req.session.loggedin) {
            res.render('admin/product/createproduct', {
                activePage: "products",
                pageName: "Novo Produto"
            });
        }
    },
    createProduct: async (req, res) => {
        if (req.session.loggedin) {
            let nome = req.body.nome;
            let qty = req.body.qty;
            await productDao.newProduct(nome, qty);
            res.render('admin/product/createproduct', {
                newProduct: "Produto cadastrado com sucesso!",
                activePage: "products",
                pageName: "Novo Produto"
            });
        }
    },
    editProductPage: async (req, res) => {
        if (req.session.loggedin) {
            let id_produto = req.params.id_produto;
            let result = await productDao.getProductByid(id_produto);
            res.render('admin/product/editproduct', {
                activePage: "products",
                pageName: "Editar Produto",
                products: result
            });
        }
    },
    deleteProduct: async (req, res) => {
        let product = await productDao.getProductByid(req.session.id) || undefined;
        if (product != undefined && req.session.loggedin) {
            let id = req.params.id;
            res.send('Produto deletado com sucesso!');
            await productDao.deleteProduct(id);
        }
    }
}