'use strict';
const categoryDao = require('../dao/category');
module.exports = {
    getAllCategories: async (req, res) => {
        if (req.session.loggedin) {
            let pagina = parseInt(req.query.pagina) || 1;
            let limit = parseInt(req.query.limit) || 10;
            let offset = (pagina - 1) * limit;
            let result = await categoryDao.getCategorybyOffset(limit, offset);
            let qty = await categoryDao.getQtyProductsByCategory(1);
            res.render('admin/category', {
                categories: result,
                activePage: "categories",
                pageName: "Categorias",
                limit: limit,
                quantidade: qty,
                offset: offset,
                dados: req.session,
                pagina: pagina
            });
        } else {
            res.send('faça login para ver a página');
        }
    },
    createCategoryPage: async (req, res) => {
        if (req.session.loggedin) {
            res.render('admin/category/createcategory', {
                activePage: "categories",
                dados: req.session,
                pageName: "Nova Categoria"
            });
        }
    },
    createCategory: async (req, res) => {
        if (req.session.loggedin) {
            let nome = req.body.nome_categoria;
            console.log(nome);
            await categoryDao.newCategory(nome);
            res.render('admin/category/createcategory', {
                newCategory: "Categoria cadastrada com sucesso!",
                activePage: "categories",
                dados: req.session,
                pageName: "Nova Categoria",
            });
        }
    },
    editCategoryPage: async (req, res) => {
        if (req.session.loggedin) {
            let id_Categoria = req.params.id_Categoria;
            let result = await categoryDao.getCategoryById(id_Categoria);
            res.render('admin/category/editcategory', {
                activePage: "categories",
                pageName: "Editar Categoria",
                categories: result
            });
        }
    },
    deleteCategory: async (req, res) => {
        let category = await categoryDao.getCategoryById(req.session.id) || undefined;
        if (category != undefined && req.session.loggedin) {
            let id = req.params.id;
            res.send('Categoria deletado com sucesso!');
            await categoryDao.deleteCategory(id);
        }
    }
}