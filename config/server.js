const express = require('express');
const bodyparser = require('body-parser');
const session = require("express-session");

let app = express();

app.set("view engine", "ejs");
app.set("views","./app/views");
app.use(express.static("public"));
app.use(express.static(__dirname + "../app/views"));
//seta o modulo de sessão no Express
app.use(session({
    "secret": "fishisgreatforyourhealth",
    resave: true,
    proxy: true,
    saveUninitialized: true
}));
//seta o body-parser para pegar os dados de formularios
app.use(bodyparser.urlencoded({ extended: true }));

module.exports = app;