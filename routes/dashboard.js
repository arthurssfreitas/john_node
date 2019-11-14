module.exports = {
    getDashboard: (req, res) =>{
        if(req.session.loggedin){
            res.render('admin/dashboard.ejs',{
                title: "Painel de controle | John of the fish"
                }); 
            
        }else{
            res.send('faça login para ver a página')
        }
        res.end();
    }
};