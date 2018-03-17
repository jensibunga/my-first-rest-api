const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api'); //current directory and the folder  and the file route
//set up express app
const app = express();

//connect to mongodb

const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/ninjago');
mongoose.connect("mongodb://46234623646732764627:kX80XuhZI5omxvY5HY5CwZOcJnB4hX@ds119028.mlab.com:19028/my-first-rest-api");

mongoose.Promise = global.Promise;
//middleware for the front end
app.use(express.static("public"));

app.use(bodyParser.json());
//initialize routes//route handler
app.use('/api', routes);
//error handling middleware
app.use(function( err, req, res, next){
//console.log(err);
res.status(422).send({error:err.message});
});



//listen for requests
app.listen( process.env.port || 4000, function(){
//app.listen(8080, function(){ for google cloud 
console.log('now listening for requests');

});


