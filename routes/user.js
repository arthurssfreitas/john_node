'use strict';
const userDao = require('../dao/user');
module.exports = {
    getAllUsers: async (req, res) => {
        if (req.session.loggedin) {
            let pagina = parseInt(req.query.pagina) || 1;
            let limit = parseInt(req.query.limit) || 10;
            let offset = (pagina - 1) * limit;
            let all = await userDao.getAllUsers();
            let result = await userDao.getUserbyOffset(limit, offset);
            res.render('admin/user', {
                users: result,
                activePage: "users",
                pageName: "Usuários",
                limit: limit,
                all: all,
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
                res.render('admin/user/createuser', {
                    newUser: "Usuário cadastrado com sucesso!",
                    activePage: "users",
                    pageName: "Novo Usuário"
                });
            } else {
                res.render('admin/user/createuser', {
                    errorPass: "As senhas não são iguais!",
                    activePage: "users",
                    pageName: "Novo Usuário"
                });
            }
        }
    },
    editUser: async (req, res) => {
        if (req.session.loggedin) {
            let id = req.params.id;
            let login = req.body.login;
            let senha = md5(req.body.senha);
            let confirm_password = md5(req.body.confirmar_senha);
            let email = req.body.email;
            
            if(senha == confirm_password){
            await userDao.editUser(login, senha, email, id);
            }else{
                res.status(204).send();
            }
        }
    },
    deleteUser: async (req, res) => {
        let user = await userDao.getUserByid(req.session.id) || undefined;
        if (user != undefined && req.session.loggedin) {
            let id = req.params.id;
            res.send('Usuário deletado com sucesso!');
            await userDao.deleteUser(id);
        }
    }
}