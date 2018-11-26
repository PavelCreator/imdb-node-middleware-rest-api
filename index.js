var express = require('express');
var imdb = require('imdb-scrapper');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/trend-films/:quantity', function(request, response){

  var quantity = request.params.quantity || 250;

  imdb.getTrending([quantity])
    .then(function (films) {
      response.status(200).json(films.trending);
    })
    .catch(function (error) {
      response.status(404).json("Error: imdb.getTrending failed. Details: " + error);
    });

});

app.get('/film/:id', function(request, response){

  var filmId = request.params.id;

  if (!filmId){
    response.status(404).json("Error: specify film id. For example: /film/tt1825683");
  }

  imdb.scrapper(filmId)
    .then(function (filmData) {
      console.log('filmData =', filmData);
      response.status(200).json(filmData);
    })
    .catch(function (error) {
      response.status(404).json("Error: imdb.scrapper failed. Details: " + error);
      console.log("Error: imdb.scrapper failed. Details: " + error);
    });

});

app.listen(3002, function(){
  console.log("Listening on port 3002");
});
