var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var jenkins = require('./jenkins.js');

app.use('/lib', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/static'));

var connections = 0;
var pollInterval = 2000;
var dashboard = {};


io.on('connection', function(socket) {
  connections++;
});

io.on('disconnect', function() {
  connections--;
});

app.get('/api/dashboard', function(req, res) {
  jenkins.getDashboard(function(dashboard) {
    res.json(dashboard);
  });
});

server.listen(3333, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

function pollDashboard() {
  
  if (connections == 0) {
    setTimeout(pollDashboard, pollInterval); 
    return;
  }
  
  var startTime = new Date().getTime();
  jenkins.getDashboard(function(dashboard) {
    var endTime = new Date().getTime();

    io.emit('dashboard', dashboard);
    setTimeout(pollDashboard, Math.max(0, pollInterval - (endTime - startTime)));
  });
  

}

pollDashboard();