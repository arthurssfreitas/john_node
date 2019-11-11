const express = require('express');
const mysql = require('mysql');
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

module.exports = app;