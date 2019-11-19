module.exports = {
    getAllUsers: async (req, res) => {
        if (req.session.loggedin) {
            let pagina = parseInt(req.query.pagina) || 1;
            let limit = parseInt(req.query.limit) || 5;
            let offset = (pagina - 1) * limit;
            db.query('SELECT * FROM tb_usuarios LIMIT ? OFFSET ?', [limit, offset],
                function (err, result) {
                    res.render('admin/user', {
                        users: result,
                        activePage: "users",
                        pageName: "Usuários",
                        limit: limit,
                        offset: offset,
                        dados: req.session,
                        pagina: pagina
                    });
                    if (err) {
                        throw err;
                    }
                });
        } else {
            res.send('faça login para ver a página');
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
            let name = req.body.login;
            let password = md5(req.body.senha);
            let confirm_password = md5(req.body.confirmar_senha);
            let email = req.body.email;
            if (password == confirm_password) {
                let query = db.query('INSERT INTO tb_usuarios (login,senha,email) VALUES (?,?,?)', [name, password, email],
                    function (err, result) {
                        if (err) {
                            throw err;
                        }
                        res.render('admin/user/createuser', {
                            newUser: "Usuário cadastrado com sucesso!",
                            activePage: "users",
                            pageName: "Novo Usuário"
                        });
                    }
                )
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
        if (req.session.loggedin) {
            let id = req.params.id;
            let query = db.query('SELECT * FROM tb_usuarios WHERE id = ?', [id],
                function (err, result) {
                    if (err) {
                        throw err;
                    }
                    res.render('admin/user/edituser', {
                        activePage: "users",
                        pageName: "Editar Usuário",
                        users: result[0]
                    });
                });
        }
    },
    editUser: async (req, res) => {
        if (req.session.loggedin) {
            let id = req.params.id;
            let name = req.body.login;
            let password = md5(req.body.senha);
            let email = req.body.email;
            let query = db.query('UPDATE tb_usuarios SET login = ?, senha = ?, email = ? WHERE id = ?', [name, password, email, id],
            function (err, result) {
                if (err) {
                    throw err;
                }
                res.render('admin/user/edituser', {
                    editUser: "Usuário editado com sucesso!",
                    activePage: "users",
                    users: result,
                    pageName: "Editar Usuário"
                });
            }
        )
    } else {
        res.render('admin/user/edituser', {
            errorPass: "As senhas não são iguais!",
            activePage: "users",
            pageName: "Editar Usuário"
        });
    }
},
    deleteUser: async (req, res) => {
        if (req.session.loggedin) {
            let id = req.params.id;
            let query = db.query('DELETE FROM tb_usuarios WHERE id = ?', [id],
                function (err, result) {
                    if (err) {
                        throw err;
                    }
                    res.redirect('/usuario');
                });
        }
    }
}