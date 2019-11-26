'use strict';
const productDao = require('../dao/product');
const unityDao = require('../dao/unity');
const categoryDao = require('../dao/category');
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
            res.redirect('/');
        }
    },
    createProductPage: async (req, res) => {
        let produtos = await productDao.getAllProducts();
        let unidades = await unityDao.getAllUnities();
        let categorias = await categoryDao.getAllCategories();
        if (req.session.loggedin) {
            res.render('admin/product/createproduct', {
                activePage: "products",
                dados: req.session,
                produtos: produtos,
                unidades: unidades,
                categorias: categorias,
                pageName: "Novo Produto"
            });
        } else {
            res.redirect('/');
        }
    },
    createProduct: async (req, res) => {
        if (req.session.loggedin) {
            let nome = req.body.nome_produto;
            let qty = req.body.quantidade_produto;
            let unidade = req.body.unidade_produto;
            let categoria = req.body.categoria_produto;
            await productDao.newProduct(nome, qty, categoria, unidade);
            req.session.success_msg = {
                success_msg: "Produto cadastrado com sucesso!"
            }
            res.redirect('/produto');
        } else {
            res.redirect('/');
        }
    },
    editProductPage: async (req, res) => {
        if (req.session.loggedin) {
            let id_produto = req.params.id;
            let unidades = await unityDao.getAllUnities();
            let categorias = await categoryDao.getAllCategories();
            let result = await productDao.getProductByid(id_produto);
            res.render('admin/product/editproduct', {
                activePage: "products",
                pageName: "Editar Produto",
                dados: req.session,
                unidades: unidades,
                categorias: categorias,
                product: result
            })
        } else {
            res.redirect('/');
        }
    },
    editProduct: async (req, res) => {
        if (req.session.loggedin) {
            let id = req.params.id;
            let nome = req.body.nome_produto;
            let qty = req.body.quantidade_produto;
            let unidade = req.body.unidade_produto;
            let categoria = req.body.categoria_produto;
            await productDao.editProduct(id, nome, qty, categoria, unidade);
            req.session.success_msg = {
                success_msg: "Produto editado com sucesso!"
            }
            res.redirect('/produto');
        } else {
            res.redirect('/');
        }
    },
    deleteProduct: async (req, res) => {
        let id = req.params.id;
        let product = await productDao.getProductByid(id) || undefined;
        if (product != undefined && req.session.loggedin) {
            await productDao.deleteProduct(id);
            res.send('Produto deletado com sucesso!');
        } else {
            res.send();
        }
    },
    withdrawProduct: async (req, res) => {
        let id = req.body.id_produto;
        let qty = req.body.qty;
        let product = await productDao.getProductByid(id) || undefined;
        if (qty > 0 && product != undefined && req.session.loggedin && product[0].qty >= qty) {
            await productDao.withdrawProduct(id, qty);
            req.session.success_msg = {
                success_msg: "Quantidade retirada com sucesso!"
            }
            res.redirect('/painel');
        } else if (qty > 0 && product != undefined && req.session.loggedin && product[0].qty < qty) {
            //erro não tem produto suficiente
            req.session.error_msg = {
                error_msg: "Quantidade de produto insuficiente."
            }
            res.redirect('/painel');
        } else if (qty > 0 && product == undefined && req.session.loggedin) {
            //erro produto não existe
            req.session.error_msg = {
                error_msg: "Produto inexistente."
            }
            res.redirect('/painel');
        } else if (qty < 0 && req.session.loggedin || qty == 0) {
            req.session.error_msg = {
                error_msg: "Quantidade invalida."
            }
            res.redirect('/painel');
        } else if (!req.session.loggedin) {
            //erro não está logado
            res.redirect('/');
        }
    },
    insertProduct: async (req, res) => {
        let id = req.body.id_produto;
        let qty = req.body.qty;
        let product = await productDao.getProductByid(id) || undefined;
        if (qty > 0 && product != undefined && req.session.loggedin) {
            await productDao.insertProduct(id, qty);
            req.session.success_msg = {
                success_msg: "Quantidade adicionada com sucesso!"
            }
            res.redirect('/painel');
        } else if (qty > 0 && product == undefined && req.session.loggedin) {
            //erro produto não existe
            req.session.error_msg = {
                error_msg: "Produto inexistente."
            }
            res.redirect('/painel');
        } else if (qty < 0 && req.session.loggedin || qty == 0) {
            req.session.error_msg = {
                error_msg: "Quantidade invalida."
            }
            res.redirect('/painel');
        } else if (!req.session.loggedin) {
            //erro não está logado
            res.redirect('/');
        }
    }
}