var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})

///////////// WEB ROUTES

// Add hook to make it easier to get all visited URLS.
app.use(function(req, res, next) 
{
	console.log(req.method, req.url);

	// ... INSERT HERE.
	client.lpush('queue',req.protocol + "://" + req.hostname + req.url);

	next(); // Passing the request to the next handler in the stack.
});

client.set("key", "value");
client.get("key", function(err,value){ console.log(value)});

 app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){

    console.log(req.body) // form fields
    console.log(req.files) // form files

    if( req.files.image )
    {
 	   fs.readFile( req.files.image.path, function (err, data) {
 	  		if (err) throw err;
 	  		var img = new Buffer(data).toString('base64');
			client.lpush('imgqueue', img);
 	  		console.log("Image uploaded successfully");
 		});
 	}

    res.status(204).end()
 }]);

 app.get('/meow', function(req, res) {
 	{
		console.log("Meow invoked");
 		res.writeHead(200, {'content-type':'text/html'});

		//Remove the recently pushed element from the imgqueue
		client.rpop('imgqueue', function(err, imagedata){
			res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
			res.end();
			});
		
 	}
 })

// HTTP SERVER
 var server = app.listen(3000, function () {

   var host = server.address().address
   var port = server.address().port

   console.log('Example app listening at http://%s:%s', host, port)
 })


app.get('/', function(req, res) {
  res.send('From port 3000\nhello world')
})


app.get('/set', function(req, res) {
  client.set("newkey1","This message will self destruct in 10 seconds")
  client.expire("newkey1",10)
  res.send("From port 3000\nnewkey1")
})

app.get('/get', function(req, res) {
  client.get("newkey1",function(err,value){res.send('From port 3000\n'+value)});
})


app.get('/recent', function(req, res) {
  client.lrange("queue",0,4, function(err,value){res.send('From port 3000\n'+value)});
})

