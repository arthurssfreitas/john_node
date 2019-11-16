module.exports = {
    getLoginPage:(req, res) =>{
        res.render('login.ejs', {
            title: "Página de login | Projeto Integrador",
            session: req.session
        });
    }
}
    
