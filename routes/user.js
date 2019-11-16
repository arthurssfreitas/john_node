module.exports = {
    getAllUsers: (req, res) =>{
        var users = db.query('SELECT * from accounts',
        function(err, rows){
            if(err){
                console.log(err);
                return;
            }
            rows.forEach((result)=>{
                res.render('admin/user.ejs',{
                    user: result,
                    activePage: "users"
                });
                // console.log(result.id,result.username,result.email);
            });
        }
        )},
        getTables: (req,res) =>{
            res.render('admin/tables.ejs',{
                activePage: "tables"
            });
        }
}