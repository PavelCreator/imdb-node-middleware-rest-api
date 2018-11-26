const express = require('express');
const router = express.Router();
const imdb = require('./../imdb-parser');

router.get('/:name/:quantity', function (request, response) {

  var name = request.params.name.trim().toLowerCase();

  if (!name) {
    response.status(404).json("Error: specify genre name. For example: /comedy");
    return;
  }

  var quantity = request.params.quantity || 250;

  imdb.getTrendingGenre(name, [quantity])
    .then(function (films) {
      console.log('films =', films);
      response.status(200).json(films.trending);
    })
    .catch(function (error) {
      response.status(404).json("Error: imdb.getTrendingGenre failed. Details: " + error);
    });

});

module.exports = router;