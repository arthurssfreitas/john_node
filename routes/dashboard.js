module.exports = {
    getDashboard: (req, res) => {
        if (req.session.loggedin) {
            res.render('admin/dashboard.ejs', {
                title: "Painel de controle | John of the fish",
                activePage: "painel",
                pageName: "Painel de controle"
            });

        } else {
            res.send('faça login para ver a página')
        }
        res.end();
    },
    login: (req, res) => {
        let login = req.body.login;
        let senha = md5(req.body.senha);
        if (login && senha) {
            db.query('SELECT * FROM tb_usuarios WHERE login = ? AND senha = ?', [login, senha], function (error, results, fields) {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.id = results[0].id;
                    req.session.login = login;
                    req.session.email = results[0].email;
                    res.redirect('/painel');
                } else {
                    res.send('Incorrect login and/or senha!');
                }
                res.end();
            });
        } else {
            res.send('Please enter login and senha!');
            res.end();
        }
    },
    logout: (req, res) => {
        if (req.session.loggedin) {
            req.session.destroy();
            res.redirect('/');
        }
    }
};