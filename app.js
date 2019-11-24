const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const flash = require('connect-flash');
const md5 = require('md5');
const app = express();


const {
    getLoginPage
} = require('./routes/index');

const {
    getDashboard,
    login,
    logout,
    getProfilePage,
    editProfile
} = require('./routes/dashboard');

const {
    getAllUsers,
    createUser,
    createUserPage,
    editUser,
    editUserPage,
    deleteUser
} = require('./routes/user');

const {
    getAllCategories,
    createCategoryPage,
    createCategory
} = require('./routes/category');

const port = 3000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_john'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;
global.md5 = md5;


app.use(session({
    secret: 'secret',
    resave: true,
    writable: true,
    saveUninitialized: true
}));
app.use(flash());


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use((req,res,next) =>{
    res.locals.success_msg = req.session.success_msg;
    res.locals.error_msg = req.session.error_msg;
    delete req.session.success_msg;
    delete req.session.error_msg;
    next()
});

// routes for the app

//painel
app.get('/', getLoginPage);
app.get('/painel', getDashboard);
app.post('/auth', login);
app.get('/logout', logout);
//usuario
app.get('/usuario', getAllUsers);
app.get('/usuario/novo', createUserPage);
app.post('/usuario/novo', createUser);
app.get('/editar/:id', editUserPage);
app.post('/editar/:id', editUser);
app.get('/deletar/:id', deleteUser);
//perfil
app.get('/perfil/:id', getProfilePage);
app.post('/perfil/:id', editProfile);
//categorias
app.get('/categoria/', getAllCategories);
app.get('/categoria/nova', createCategoryPage);
app.post('/categoria/nova', createCategory);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});