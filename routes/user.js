module.exports = {
    // getAllUsers: (req, res) =>{
    //     var users = db.query('SELECT * from accounts',
    //     function(err, rows){
    //         if(err){
    //             console.log(err);
    //             return;
    //         }
    //         rows.forEach((result)=>{
    //             res.render('admin/user.ejs',{
    //                 user: result,
    //                 activePage: "users"
    //             });
    //             // console.log(result.id,result.username,result.email);
    //         });
    //     }
    //     )},
        getTables: (req,res) =>{
            if(req.session.loggedin){
                db.query('SELECT * FROM accounts', function(err, result){
                    res.render('admin/tables',{
                        users: result,
                        activePage: "tables",
                        pageName: "Usuários"
                    });
                });
            }else{
                res.send('faça login para ver a página');
            }
        }
}