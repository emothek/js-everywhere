var express = require('express');
var sqlite = require('sqlite3');

var path = require('path');
var fs = require('fs');

var db = new sqlite.Database('example.sqlite');
db.run('CREATE TABLE "messages" ("id" INTEGER UNIQUE, "objet" VARCHAR, "email" VARCHAR, "message" TEXT)', [], function(err){
	if(err){
		console.log(err)
		return false; 
	}
});




db.all('SELECT * FROM "messages"', [], function(err, res){
	if(err){
		return console.log(err.message)
	}

	console.log(res)
})


db.close()

var app = express();

app.get('/', function(req, res){
	res.sendFile( path.join(__dirname + '/index.html') )
})



app.get('/form', function(res){
	console.log(res.query);
	// insertion dans la table MESSAGE des données recupu
	if(res.query.objet !== ''){
		
	}
	db.run('INSERT INTO "messages" VALUES(NULL, ?, ?, ?)', ['salutation', 'ahmed@gmail.com', 'bonjour monsieur'], function(err){
		if(err){
			return console.log(err.message)
		}
		console.log('un message a ete inséré');
	})

})



app.get('/contact', function(req, res){
	res.sendFile( path.join(__dirname + '/contact.html') )
})
	
// lecture d'un fichier externe E/S 
// module FS : file system 
app.get('/read', function(req, res){
	var data = fs.readFileSync('./package.json');
	res.send('contenu de fichier : ' + data);
})

app.listen(3007, function(){
	console.log('Server running on 3007');
})