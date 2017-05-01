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

//Save the data
var itemOne = Todo({item : 'Prepare food'}).save(function(err){
    if (err) throw err;
    console.log('Item saved');
});

var data = [{item:'Get milk'},{item:'Have Tea'},{item:'Code Code Code'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
    
    app.get('/todo', function(req,res){
        res.render('todo', {todos: data});
    });
    
    app.post('/todo',urlencodedParser,function(req,res){
        data.push(req.body);
        res.json(data);
    });
    
    app.delete('/todo/:item', function(req,res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
    
}