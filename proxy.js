var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})
var httpProxy = require('http-proxy')
var http = require('http')


var proxy = httpProxy.createProxyServer({});

var toggle = 0;
var string1 = 'http://127.0.0.1:3000';
var string2 = 'http://127.0.0.1:3001';

client.lpush('serverqueue',string1);
client.lpush('serverqueue',string2);

var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  client.rpoplpush('serverqueue','serverqueue', function(err, value) {
	proxy.web(req, res, { target: value });
	});
});

console.log("listening on port 3002")
server.listen(3002);
