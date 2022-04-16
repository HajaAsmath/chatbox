var express = require('express'),
  app = express(),
  port = 3000;

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

var routes = require('./routes/routes'); //importing route
routes(app, express);