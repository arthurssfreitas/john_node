'use strict';
const userDao = require('../dao/user');
const produtoDao = require('../dao/product');

module.exports = {
    getDashboard: async (req, res) => {
        if (req.session.loggedin) {
            let dados = req.session;
            let produtos = await produtoDao.getAllProducts();
            res.render('admin/dashboard.ejs', {
                title: "Painel de controle | John of the fish",
                activePage: "painel",
                dados: dados,
                pageName: "Painel de controle",
                produtos: produtos
            });

        } else {
            res.redirect('/');
        }
        res.end();
    },
    login: async (req, res) => {
        let login = req.body.login;
        let senha = md5(req.body.senha);
        let results = await userDao.getUserByLoginAndPass(login, senha);
        if (login && senha) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.login = login;
                req.session.email = results[0].email;
                req.session.userid = results[0].id;
                await userDao.getUserByLoginAndPass(login, senha);
                await res.redirect('/painel');
            } else {
                req.session.error_msg = {
                    error_msg: "Usuário ou senha estão incorretos!"
                }
                res.redirect('/');
            }
            res.end();
        } else {
            req.session.error_msg = {
                error_msg: "Preencha os dados de acesso!"
            }
            res.redirect('/');
            res.end();
        }
    },
    logout: async (req, res) => {
        if (req.session.loggedin) {
            req.session.destroy();
            res.redirect('/');
        }
    },
    getProfilePage: async (req, res) => {
        if (req.session.loggedin) {
            let id = req.params.id;
            let dados = await userDao.getUserByid(id);
            res.render('admin/user/profile', {
                activePage: "",
                pageName: "Meu perfil",
                dados: dados
            });
        }
    },
    editProfile: async (req, res) => {
        if (req.session.loggedin) {
            let id = req.params.id;
            let login = req.body.login;
            let senha = md5(req.body.senha);
            let confirm_password = md5(req.body.confirmar_senha);
            let email = req.body.email;
            if (senha == confirm_password) {
                await userDao.editUser(login, senha, email, id);
                req.session.success_msg = {
                    success_msg: "Perfil editado com sucesso!"
                }
                res.redirect('/perfil/' + id);
            } else {
                req.session.error_msg = {
                    error_msg: "As senhas não são iguais!"
                }
                res.redirect('/perfil/' + id);
            }
        }
    }
};