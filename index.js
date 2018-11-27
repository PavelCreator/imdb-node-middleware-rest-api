var express = require('express');

var app = express();
var filmRoutes = require('./api/routes/film')
var chartsRoutes = require('./api/routes/charts')
var actorRoutes = require('./api/routes/actor')
var genreRoutes = require('./api/routes/genre')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/film', filmRoutes);
app.use('/charts', chartsRoutes);
app.use('/actor', actorRoutes);
app.use('/genre', genreRoutes);

app.listen(3002, function(){
  console.log("Listening on port 3002");
});

