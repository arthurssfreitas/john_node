const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getLoginPage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const {getDashboard,login, logout} = require('./routes/dashboard');
const {getAllUsers,getTables} = require('./routes/user');
const port = 3000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'socka'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getLoginPage);
app.get('/login', getDashboard);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
app.get('/painel', getDashboard);
app.post('/auth', login);
app.get('/logout', logout);
app.get('/usuario', getAllUsers);
app.get('/tables', getTables);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});