var express = require("express");
var app = express(); //handle http request and responses, cause continual running
var mongojs = require("mongojs");
var db = mongojs('todolist', ['todolist']);
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//get all data
app.get('/todolist', function(req, res){
	console.log("I received a GET request, sending data");
		
		db.todolist.find(function(err, docs){
			console.log(docs);
			res.json(docs);//response data in json
		});	
});


app.post('/todolist', function(req, res){//get puts in parameters, post is good for adding info to forms
	console.log(req.body);
	db.todolist.save({title: req.body.title, description: req.body.description, duedate: req.body.duedate, status : "incomplete"}, function(err, docs){//save to update
		res.json(docs);
	});
	
});

app.delete('/todolist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.todolist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

//get id of data to update
app.get('/todolist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.todolist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

//input data to be updated
app.put('/todolist/:id', function(req, res){
	var id = req.params.id;
	db.todolist.findAndModify(
	{query: {_id: mongojs.ObjectId(id)},
		update: {$set: {title: req.body.title, description: req.body.description, duedate: req.body.duedate}},
		new: true
	}, function(err, doc){
		res.json(doc);
	});
});

app.post('/todolist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.todolist.update({_id: mongojs.ObjectId(id)}, {$set: {status: "complete!"}},  function(err, doc){
		res.json(doc);
	});
});
	
	
//if id.status == false, db.todolist.update({})



app.listen(3000);
console.log("Server running on port 3000");