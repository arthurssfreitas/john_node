module.exports = {
    getLoginPage: async (req, res) => {
        if (!req.session.loggedin) {
            res.render('login.ejs', {
                title: "Página de login | Projeto Integrador",
                session: req.session
            });
        } else {
            res.redirect('/painel');
        }
    }
}