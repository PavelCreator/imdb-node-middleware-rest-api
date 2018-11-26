const express = require('express');
const router = express.Router();
const imdb = require('./../imdb-parser');

router.get('/:quantity/:type/:sort/:dir', function (request, response) {

  var quantity = request.params.quantity || 250;
  var type = request.params.type || `most_popular_movies`;
  var sort = request.params.sort || `rating`;
  var dir = request.params.dir || `desc`;

  imdb.getTrending(quantity, type, sort, dir)
    .then(function (films) {
      response.status(200).json(films.trending);
    })
    .catch(function (error) {
      response.status(404).json("Error: imdb.getTrending failed. Details: " + error);
    });

});

module.exports = router;