module.exports = {
    getDashboard: (req, res) =>{
        if(req.session.loggedin){
            res.render('admin/dashboard.ejs',{
                title: "Painel de controle | John of the fish",
                activePage: "painel"
                }); 
            
        }else{
            res.send('faça login para ver a página')
        }
        res.end();
    },
    login:(request, response)=> {
        var username = request.body.username;
        var password = request.body.password;
        if (username && password) {
            db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/painel');
                } else {
                    response.send('Incorrect Username and/or Password!');
                }			
                response.end();
            });
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }
    },
    logout: (req, res) =>{
        if(req.session.loggedin){
            req.session.destroy();
            res.redirect('/');
        }
    }
};