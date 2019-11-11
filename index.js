"use strict";

let app = require('./config/server');

app.listen(3000,()=>console.log('Express server is running at port no : 3000'));

app.get('/', (req,res) => {
    res.send("Server running!");
});