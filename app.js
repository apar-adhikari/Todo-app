var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//set up new template engine
app.set('view engine', 'ejs');

//to fire controllers
todoController(app);

//static files 
app.use(express.static('./public'));

//listen to port
app.listen(3000);
console.log('You are listening to port number 3000');