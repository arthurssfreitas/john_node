'use strict';
const userDao = require('../dao/user');
module.exports = {
    getAllUsers: async (req, res) => {
        if (req.session.loggedin) {
            let pagina = parseInt(req.query.pagina) || 1;
            let limit = parseInt(req.query.limit) || 10;
            let offset = (pagina - 1) * limit;
            let result = await userDao.getUserbyOffset(limit, offset);
            res.render('admin/user', {
                users: result,
                activePage: "users",
                pageName: "Usuários",
                limit: limit,
                offset: offset,
                dados: req.session,
                pagina: pagina
            });
        } else {
            res.redirect('/');
        }
    },
    createUserPage: async (req, res) => {
        if (req.session.loggedin) {
            res.render('admin/user/createuser', {
                activePage: "users",
                dados: req.session,
                pageName: "Novo Usuário"
            });
        }
    },
    createUser: async (req, res) => {
        if (req.session.loggedin) {
            let login = req.body.login;
            let password = md5(req.body.senha);
            let confirm_password = md5(req.body.confirmar_senha);
            let email = req.body.email;
            if (password == confirm_password) {
                await userDao.newUser(login, password, email);
                req.session.success_msg = {
                    success_msg: "Usuário cadastrado com sucesso!"
                }
                res.redirect('/usuario');
            } else {
                res.render('admin/user/createuser', {
                    errorPass: "As senhas não são iguais!",
                    activePage: "users",
                    pageName: "Novo Usuário"
                });
            }
        }
    },
    editUserPage: async (req, res) => {
        let id = req.params.id;
        let result = await userDao.getUserByid(id);
        if (req.session.loggedin) {
            res.render('admin/user/edituser', {
                activePage: "users",
                users: result,
                dados: req.session,
                pageName: "Editar Usuário"
            });
        }
    },
    editUser: async (req, res) => {
        if (req.session.loggedin) {
            let id = req.params.id;
            let login = req.body.login;
            let senha = md5(req.body.senha);
            let confirm_password = md5(req.body.confirmar_senha);
            let email = req.body.email;
            let result = await userDao.getUserByid(id);
            if (senha == confirm_password) {
                await userDao.editUser(login, senha, email, id);
                req.session.success_msg = {
                    success_msg: "Usuário editado com sucesso!"
                }
                res.redirect('/usuario');
            } else {
                res.render('admin/user/edituser', {
                    errorPass: "As senhas não são iguais!",
                    activePage: "users",
                    users: result,
                    pageName: "Editar Usuário"
                });
            }
        }
    },
    deleteUser: async (req, res) => {
        let user = await userDao.getUserByid(req.session.id) || undefined;
        let id = req.params.id;
        if (user != undefined && req.session.loggedin && id != req.session.userid) {
            res.send('Usuário deletado com sucesso!');
            await userDao.deleteUser(id);
        } else {
            res.send();
        }
    }
}