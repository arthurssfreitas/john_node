module.exports = {
    getAllUsers: (req, res) =>{
        db.query('SELECT * FROM tb_usuarios',
        function (err,result){
            if(err){
                throw err;
            }
            res.send();
        })
    },
    getUserByid: (req,res) =>{
        db.query('SELECT * FROM tb_usuarios WHERE id = ?',[id],{
            function(err,result){
                if(err){
                    throw err;
                }
                res.send();
            }
        })
    }
}
module.exports = getUserByid;