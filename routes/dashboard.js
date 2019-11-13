module.exports = {
    getDashboard: (req, res) =>{
        res.render('examples/dashboard.ejs', {
            title: "Painel de controle | John of the fish"
        });
    }
};