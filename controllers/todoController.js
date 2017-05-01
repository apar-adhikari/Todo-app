var bodyParser = require('body-parser');

var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test@ds127531.mlab.com:27531/todo32402');

//Create a schema - this is like a blueprint
var todoSchema = mongoose.Schema({
    item : String
});

//Create a model
var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item:'Get milk'},{item:'Have Tea'},{item:'Code Code Code'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
    
    app.get('/todo', function(req,res){
        //Get data from mongo db and pass it to the view
        Todo.find({}, function(err,data){
            if (err) throw err;
            res.render('todo', {todos: data});         
        });
    });
    
    app.post('/todo',urlencodedParser,function(req,res){
        //Get data from the view and add it to mongo db
        var newTodo = Todo(req.body).save(function(err,data){
           if (err) throw err;
            res.json(data);
        });
    });
    
    app.delete('/todo/:item', function(req,res){
        //Delete the requested item from mongo db
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });
    
}