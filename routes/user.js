module.exports = {
        getAllUsers: async (req,res) =>{
            if(req.session.loggedin){
                let pagina =  parseInt(req.query.pagina) || 1
                let limit = parseInt(req.query.limit) || 5;
                let offset = (pagina - 1) * 5;
                db.query('SELECT * FROM accounts LIMIT ? OFFSET ?',[limit,offset], 
                function(err, result){
                    res.render('admin/user',{
                        users: result,
                        activePage: "users",
                        pageName: "Usuários",
                        limit: limit,
                        offset: offset,
                        pagina: pagina
                    });
                    if(err){
                        throw err;
                    }
                }); 

            }else{
                res.send('faça login para ver a página');
            }
        },
        getPageCreateUser: async (req,res)=>{
            if(req.session.loggedin){
                res.render('admin/user/createuser',{
                    activePage: "users",
                    pageName: "Novo Usuário"
                });
            }
        },
        createUser: async (req, res) =>{
            if(req.session.loggedin){
                let name = req.body.login;
                let password = req.body.senha;
                let email = req.body.email;
                let query = db.query('INSERT INTO accounts (username,password,email) VALUES (?,?,?)',[name,password,email],
                    function(err,result){
                        if(err){
                            throw err;
                        }
                        res.render('admin/user/createuser',{
                            newUser: "Usuário cadastrado com sucesso!",
                            activePage: "users",
                            pageName: "Novo Usuário"
                        });
                    }
                )
            }
        }

}