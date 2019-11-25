'use strict';
const categoryDao = require('../dao/category');
module.exports = {
    getAllCategories: async (req, res) => {
        if (req.session.loggedin) {
            let pagina = parseInt(req.query.pagina) || 1;
            let limit = parseInt(req.query.limit) || 10;
            let offset = (pagina - 1) * limit;
            let result = await categoryDao.getCategorybyOffset(limit, offset);
            for (let i = 0; i < result.length; i++) {
                result[i].qty = (await categoryDao.getQtyProductsByCategory(result[i].id_categoria))[0].qty;
            }
            res.render('admin/category', {
                categories: result,
                activePage: "categories",
                pageName: "Categorias",
                limit: limit,
                offset: offset,
                dados: req.session,
                pagina: pagina
            });
        } else {
            res.redirect('/');
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
            await categoryDao.newCategory(nome);
            req.session.success_msg = {
                success_msg: "Categoria cadastrada com sucesso!"
            }
            res.redirect('/categoria');

        }
    },
    editCategoryPage: async (req, res) => {
        if (req.session.loggedin) {
            let id = req.params.id;
            let result = await categoryDao.getCategoryById(id);
            res.render('admin/category/editcategory', {
                activePage: "categories",
                dados: req.session,
                categories: result[0],
                pageName: "Editar Categoria"
            });
        }
    },
    editCategory: async (req, res) => {
        if (req.session.loggedin) {
            let id = req.params.id;
            let nome = req.body.nome_categoria;
            await categoryDao.editCategory(id, nome)
            req.session.success_msg = {
                success_msg: "Categoria editada com sucesso!"
            }
            res.redirect('/categoria');
        }
    },
    deleteCategory: async (req, res) => {
        let id = req.params.id;
        let category = await categoryDao.getCategoryById(id) || undefined;
        if (category != undefined && req.session.loggedin && id != 1) {
            await categoryDao.deleteCategory(id);
            res.send('Categoria deletada com sucesso!');            
        } else {
            res.send();
        }
    }
}