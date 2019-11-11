let app = require('./config/server');


//Get all products
app.get('/products',(req,res)=>{
    mysqlConnection.query('SELECT * FROM products',(err, rows, fields)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err);
        }
    })
});

//Get an product
app.get('/products/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM products WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err);
        }
    })
});

//Delete an product
app.delete('/products/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM products WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send('Deleted successfully.')
        }else{
            console.log(err);
        }
    })
});

//Insert an product
app.post('/products',(req,res)=>{

    var product_name = req.body.product_name;
    var product_qty = req.body.product_qty;
    var sql  = 'INSERT INTO products(product_name,product_qty) VALUES (?,?)';

    mysqlConnection.query(sql,[product_name,product_qty],(err, rows, fields)=>{
        if(!err){
            res.send('Product created successfully.')
        }else{
            console.log(err);
        }
    })
});

//Update an product
app.put('/products',(req,res)=>{
    var product_id = req.body.id;
    var product_name = req.body.product_name;
    var product_qty = req.body.product_qty;
    var sql  = 'UPDATE products SET product_name = ?, product_qty = ? WHERE id = ?';

    mysqlConnection.query(sql,[product_name,product_qty,product_id],(err, rows, fields)=>{
        if(!err){
            res.send('Product updated successfully.')
        }else{
            console.log(err);
        }
    })
});

module.exports = app;