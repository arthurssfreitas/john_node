const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'db_john',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('DB connection succeded');
    }else{
        console.log('DB connection failed \n Error:' + JSON.stringify(err,undefined,2));
    }
});

app.listen(3000,()=>console.log('Express server is running at port no : 3000'));

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